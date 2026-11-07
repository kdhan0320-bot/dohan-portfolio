import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const {
  chromium,
  expect,
} = require("../../../tools/site-audit-kit/node_modules/@playwright/test");
const base = process.env.MINI_SNS_URL || "http://127.0.0.1:5174/";
const output = fileURLToPath(
  new URL("../../../review/mini-sns/", import.meta.url),
);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.setDefaultTimeout(10000);
const errors = [];
const checks = [];
page.on("pageerror", (e) => errors.push(e.message));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
const go = async (route) => {
  await page.goto(`${base}#${route}`);
  await expect(page.locator("main")).toHaveAttribute(
    "data-route",
    route.split("?")[0],
  );
  await page.evaluate(() => document.fonts.ready);
};
const checkLayout = async (label, width) => {
  const dimensions = await page.evaluate(() => ({
    width: innerWidth,
    scroll: document.documentElement.scrollWidth,
    h1: [...document.querySelectorAll("h1")].filter(
      (el) => el.getBoundingClientRect().width > 0,
    ).length,
    overflow: [...document.querySelectorAll("main *")]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const s = getComputedStyle(el);
        return (
          r.width > 0 &&
          s.position !== "fixed" &&
          (r.left < -1 || r.right > innerWidth + 1)
        );
      })
      .slice(0, 5)
      .map((el) => ({ tag: el.tagName, cls: el.className })),
  }));
  assert.ok(
    dimensions.scroll <= width + 1,
    `${label} ${width}: horizontal overflow ${JSON.stringify(dimensions)}`,
  );
  assert.deepEqual(
    dimensions.overflow,
    [],
    `${label} ${width}: overflowing content`,
  );
  assert.equal(dimensions.h1, 1, `${label} ${width}: visible h1 count`);
  checks.push(`${label} ${width}`);
};
try {
  await page.goto(base);
  await expect(
    page.getByRole("button", { name: "작업실 둘러보기" }),
  ).toBeVisible();
  await page.screenshot({ path: `${output}/login-desktop.png` });
  const uploadPng = await page.locator(".landing-sheet > img").screenshot();
  const uploadJpg = await page
    .locator(".landing-sheet > img")
    .screenshot({ type: "jpeg", quality: 80 });
  const uploadWebp = Buffer.from(
    await page.evaluate(async (png) => {
      const img = new Image();
      img.src = `data:image/png;base64,${png}`;
      await img.decode();
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
      return canvas.toDataURL("image/webp", 0.8).split(",")[1];
    }, uploadPng.toString("base64")),
    "base64",
  );
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    await checkLayout("login", width);
    if (width === 390)
      await page.screenshot({ path: `${output}/login-mobile.png` });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByRole("button", { name: "작업실 둘러보기" }).click();
  await expect(page.locator("h1")).toHaveText("작은 기록, 새로운 영감");
  // The browser receives real file payloads through its normal file input.
  await go("/create");
  await page.getByLabel("제목", { exact: true }).fill("이미지 첨부 검수");
  await page
    .locator("#post-caption")
    .fill("실제 파일 첨부와 새로고침 후 복원을 확인하는 임시 기록입니다.");
  await page.locator("#media-options > summary").click();
  const input = page.getByLabel("내 이미지 첨부", { exact: true });
  await input.setInputFiles({
    name: "invalid.txt",
    mimeType: "text/plain",
    buffer: Buffer.from("not an image"),
  });
  await expect(page.getByRole("alert")).toContainText("JPG, PNG, WebP");
  await input.setInputFiles({
    name: "oversize.png",
    mimeType: "image/png",
    buffer: Buffer.alloc(1600000),
  });
  await expect(page.getByRole("alert")).toContainText("1.5MB 이하");
  await input.setInputFiles({
    name: "broken.png",
    mimeType: "image/png",
    buffer: Buffer.from("broken image"),
  });
  await expect(page.getByRole("alert")).toContainText("이미지를 읽지 못했어요");
  await input.setInputFiles({
    name: "work-sample.jpg",
    mimeType: "image/jpeg",
    buffer: uploadJpg,
  });
  await expect(page.getByAltText("선택한 이미지 미리보기")).toHaveAttribute(
    "src",
    /^data:image\/jpeg/,
  );
  await expect(page.getByRole("alert")).toHaveCount(0);
  await input.setInputFiles({
    name: "work-sample.webp",
    mimeType: "image/webp",
    buffer: uploadWebp,
  });
  await expect(page.getByAltText("선택한 이미지 미리보기")).toHaveAttribute(
    "src",
    /^data:image\/webp/,
  );
  await input.setInputFiles({
    name: "work-sample.png",
    mimeType: "image/png",
    buffer: uploadPng,
  });
  await expect(page.getByAltText("선택한 이미지 미리보기")).toHaveAttribute(
    "src",
    /^data:image\/png/,
  );
  await page.reload();
  await expect(page.getByLabel("제목", { exact: true })).toHaveValue(
    "이미지 첨부 검수",
  );
  await expect(page.getByAltText("선택한 이미지 미리보기")).toHaveAttribute(
    "src",
    /^data:image\/png/,
  );
  await page.getByRole("button", { name: "기록 남기기", exact: true }).click();
  await expect(page.locator(".post-card h2")).toHaveText("이미지 첨부 검수");
  await page.reload();
  await expect(page.locator(".post-image")).toHaveAttribute(
    "src",
    /^data:image\/png/,
  );
  assert.ok(
    await page
      .locator(".post-image")
      .evaluate((img) => img.complete && img.naturalWidth > 0),
  );
  await page
    .getByRole("button", { name: "이미지 첨부 검수 이미지 확대" })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await page.getByRole("button", { name: "게시물 메뉴" }).click();
  await page.getByRole("menuitem", { name: "기록 수정" }).click();
  await page.getByRole("button", { name: "이미지 빼기" }).click();
  await expect(page.getByAltText("선택한 이미지 미리보기")).toHaveCount(0);
  await page.getByRole("button", { name: "수정 완료", exact: true }).click();
  await expect(page.locator(".post-image")).toHaveCount(0);
  await page.getByRole("button", { name: "게시물 메뉴" }).click();
  await page.getByRole("menuitem", { name: "기록 삭제" }).click();
  await page.getByRole("button", { name: "삭제하기", exact: true }).click();
  await expect(page.locator("h1")).toHaveText("작은 기록, 새로운 영감");
  await expect(
    page.getByRole("link", { name: "이미지 첨부 검수", exact: true }),
  ).toHaveCount(0);
  console.log(
    "PASS image type/size/decode validation, JPEG/PNG/WebP, draft restoration, persisted post image, removal, deletion → feed",
  );
  const routes = [
    ["feed", "/"],
    ["meetup", "/meetup"],
    ["chat", "/chat"],
    ["conversation", "/chat/react-worklog"],
    ["profile", "/profile"],
    ["notifications", "/notifications"],
    ["create", "/create"],
    ["detail", "/post/guest-1"],
  ];
  for (const width of [320, 390, 430, 767, 768, 1024, 1151, 1440, 1920]) {
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    for (const [label, route] of routes) {
      await go(route);
      await checkLayout(label, width);
      if (width < 768) {
        const smallInputs = await page
          .locator("input:not([type=file]), textarea")
          .evaluateAll((elements) =>
            elements
              .filter(
                (el) =>
                  el.getBoundingClientRect().width > 0 &&
                  parseFloat(getComputedStyle(el).fontSize) < 16,
              )
              .map((el) => el.id || el.getAttribute("aria-label")),
          );
        assert.deepEqual(
          smallInputs,
          [],
          `${label}: mobile input font too small`,
        );
      }
      if (label === "conversation") {
        const box = await page.locator(".chat-form").boundingBox();
        assert.ok(
          box && box.y + box.height <= (width < 768 ? 844 : 1000) + 1,
          `chat composer off screen at ${width}`,
        );
      }
      if (
        [390, 768, 1440].includes(width) &&
        ["feed", "meetup", "conversation", "create", "profile"].includes(label)
      ) {
        await page.screenshot({
          path: `${output}/${label}-${width}.png`,
          fullPage: label === "create",
        });
      }
    }
    console.log(`PASS responsive ${width}px: ${routes.length} pages`);
  }
  await page.setViewportSize({ width: 320, height: 740 });
  await go("/post/guest-1");
  await page.getByRole("button", { name: "댓글 보기" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const dialog = await page.getByRole("dialog").boundingBox();
  assert.ok(
    dialog.x >= 0 && dialog.x + dialog.width <= 321,
    "comment modal width",
  );
  await page.screenshot({ path: `${output}/comments-320.png` });
  await page.keyboard.press("Escape");
  await go("/meetup?group=portfolio-club");
  const group = await page.locator("#group-portfolio-club").boundingBox();
  assert.ok(
    group.y >= 62 && group.y < 400,
    `linked meetup should be visible below header: ${JSON.stringify(group)}`,
  );
  await go("/chat/react-worklog");
  await page
    .getByRole("textbox", { name: "메시지 입력" })
    .fill("좁은 화면 대화 입력 검수");
  await page.getByRole("textbox", { name: "메시지 입력" }).press("Enter");
  await expect(
    page
      .getByRole("log")
      .getByText("좁은 화면 대화 입력 검수", { exact: true }),
  ).toBeVisible();
  assert.deepEqual(errors, [], "browser errors");
  await writeFile(
    `${output}/verification.json`,
    JSON.stringify(
      {
        url: base,
        responsive: checks,
        upload: [
          "invalid-type",
          "oversize",
          "invalid-decode",
          "jpeg",
          "png",
          "webp",
          "draft-reload",
          "post-reload",
          "image-remove",
          "delete-redirect",
        ],
        browserErrors: errors,
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS ${checks.length} responsive checks, 320px comment dialog / linked meetup / chat input, no browser errors`,
  );
} catch (error) {
  await page.screenshot({ path: `${output}/failure.png`, fullPage: true });
  throw error;
} finally {
  await browser.close();
}
