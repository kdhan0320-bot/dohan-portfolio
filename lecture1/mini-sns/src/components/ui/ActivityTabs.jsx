import { useRef } from "react";

export default function ActivityTabs({
  id,
  label,
  items,
  value,
  onChange,
  className = "",
  tools,
  children,
}) {
  const refs = useRef([]);
  const options = items.map((item) =>
    typeof item === "string" ? { value: item, label: item } : item,
  );
  const active = Math.max(
    0,
    options.findIndex((item) => item.value === value),
  );
  const select = (index) => {
    onChange(options[index].value);
    refs.current[index]?.focus();
  };
  return (
    <>
      <div className={`tab-controls ${className}`}>
        <div className="filter-tabs" role="tablist" aria-label={label}>
          {options.map((item, index) => (
            <button
              key={item.value}
              ref={(el) => {
                refs.current[index] = el;
              }}
              id={`${id}-tab-${index}`}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-controls={`${id}-panel`}
              tabIndex={index === active ? 0 : -1}
              className={index === active ? "selected" : ""}
              onClick={() => onChange(item.value)}
              onKeyDown={(event) => {
                let next;
                if (event.key === "ArrowRight")
                  next = (index + 1) % options.length;
                if (event.key === "ArrowLeft")
                  next = (index - 1 + options.length) % options.length;
                if (event.key === "Home") next = 0;
                if (event.key === "End") next = options.length - 1;
                if (next !== undefined) {
                  event.preventDefault();
                  select(next);
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        {tools}
      </div>
      <section
        className="activity-panel"
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        {children}
      </section>
    </>
  );
}
