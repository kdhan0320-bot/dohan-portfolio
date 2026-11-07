import { PRODUCT_TYPES, PROBLEM_LABELS } from "./data.js?v=20261108b";

// Only known list filters travel between pages; URLs never become arbitrary return destinations.
export function normalizeFilters(value = "") {
  const source = new URLSearchParams(value);
  const result = new URLSearchParams();
  const query = (source.get("q") || "").trim().slice(0, 120);
  if (query) result.set("q", query);
  if (Object.hasOwn(PRODUCT_TYPES, source.get("type"))) result.set("type", source.get("type"));
  for (const value of new Set(source.getAll("problem"))) {
    if (Object.hasOwn(PROBLEM_LABELS, value)) result.append("problem", value);
  }
  if (["basic", "multiple", "precision"].includes(source.get("level"))) result.set("level", source.get("level"));
  for (const value of new Set(source.getAll("connection"))) {
    if (["built-in", "external-light", "ethernet", "data"].includes(value)) result.append("connection", value);
  }
  return result.toString();
}

export function currentFilters() {
  return normalizeFilters(document.body.dataset.page === "products"
    ? location.search : new URLSearchParams(location.search).get("filters") || "");
}

export function contextHref(href, filters = currentFilters()) {
  const [path, hash] = href.split("#");
  const [file, query = ""] = path.split("?");
  if (!["index.html", "products.html", "product.html", "compare.html", "inquiry.html", "notice.html"].includes(file)) return href;
  const params = new URLSearchParams(query);
  if (file === "products.html") {
    if (!query) return file + (filters ? "?" + filters : "") + (hash ? "#" + hash : "");
  } else {
    if (filters) params.set("filters", filters);
    else params.delete("filters");
    if (file === "product.html" && (document.body.dataset.page === "compare" || new URLSearchParams(location.search).get("via") === "compare")) params.set("via", "compare");
  }
  return file + (params.size ? "?" + params : "") + (hash ? "#" + hash : "");
}

export function updateContextLinks(root = document) {
  root.querySelectorAll("a[href]").forEach((link) => {
    const href = link.dataset.contextHref ?? link.getAttribute("href");
    if (!/^(index|products|product|compare|inquiry|notice)\.html(?:[?#]|$)/.test(href)) return;
    link.dataset.contextHref = href;
    link.setAttribute("href", contextHref(href));
  });
}
