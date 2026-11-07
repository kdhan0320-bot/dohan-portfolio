import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { chromium, expect } = require("../../../tools/site-audit-kit/node_modules/@playwright/test");
const base = process.env.MINI_SNS_URL || "http://127.0.0.1:5174/";
const output = fileURLToPath(new URL("../../../review/mini-sns/", import.meta.url));
const browser = await chromium.launch({ channel: "msedge", headless: true });
const errors = [];
try {
  for (const width of [320, 390, 430, 767, 768, 1440]) {
    const context = await browser.newContext({ viewport: { width, height: width < 768 ? 844 : 1000 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    page.on("pageerror", (error) => errors.push(error.message));
    const go = async (route) => {
      await page.goto(`${base}#${route}`);
      await expect(page.locator("main")).toHaveAttribute("data-route", route.split("?")[0]);
      await page.evaluate(() => document.fonts.ready);
    };
    const layout = async () => {
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow ${width}`);
    };
    await page.goto(base);
    await page.getByRole("button", { name: "작업실 둘러보기" }).click();
    await expect(page.locator("main")).toHaveAttribute("data-route", "/");
    const first = page.locator('[data-post-id="guest-1"]');
    if (width < 768) {
      await expect(first.locator(".record-read-more")).toBeVisible();
      await expect(first.locator(".record-reason")).not.toBeVisible();
      assert.ok((await first.boundingBox()).height < 680, `compact card ${width}`);
      await first.getByRole("button", { name: "의견 보태기", exact: true }).click();
      await expect(page.locator(".feedback-context")).toContainText("저장 버튼");
      await page.keyboard.press("Escape");
      await expect(first.getByRole("button", { name: "의견 보태기", exact: true })).toBeFocused();
      await first.locator(".record-read-more").click();
    } else {
      await expect(first.locator(".record-read-more")).not.toBeVisible();
      await expect(first.locator(".record-reason summary")).toBeVisible();
      await first.locator("h2 a").click();
    }
    await expect(page.locator("main")).toHaveAttribute("data-route", "/post/guest-1");
    await expect(page.locator(".record-reason > p")).toBeVisible();
    assert.equal(await page.locator(".record-attempt p").evaluate(el => getComputedStyle(el).webkitLineClamp), "none");
    await go("/create");
    const reflection = page.locator("#reflection-options");
    const media = page.locator("#media-options");
    await expect(reflection).not.toHaveAttribute("open", "");
    await expect(media).not.toHaveAttribute("open", "");
    await expect(page.locator("#post-reason")).not.toBeVisible();
    await expect(page.locator("#post-tags")).not.toBeVisible();
    await page.locator("#post-title").fill("가볍게 시작한 기록");
    await page.locator("#post-caption").fill("필수 내용만 먼저 적어봅니다.");
    const publish = page.getByRole("button", { name: "기록 남기기", exact: true });
    await expect(publish).toBeEnabled();
    await reflection.locator("summary").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("#post-reason")).toBeVisible();
    await page.keyboard.press("Tab");
    await expect(page.locator("#post-reason")).toBeFocused();
    await page.locator("#post-reason").fill("필요한 정보만 먼저 보여주기 위해서예요.");
    await page.locator("#post-question").fill("읽고 쓰는 흐름이 더 가벼운가요?");
    await reflection.locator("summary").click();
    await expect(reflection.locator("summary")).toContainText("2개 작성됨");
    await expect(page.locator("#post-reason")).not.toBeVisible();
    await reflection.locator("summary").focus();
    await page.keyboard.press("Space");
    await expect(page.locator("#post-reason")).toHaveValue("필요한 정보만 먼저 보여주기 위해서예요.");
    await media.locator("summary").click();
    await page.locator(".art-options button").first().click();
    await page.locator("#post-tags").fill("#작업기록 #선택항목");
    await expect(page.locator(".image-preview img")).toBeVisible();
    await layout();
    assert.ok(await page.locator(".record-editor").evaluate(form => {
      const edge = form.getBoundingClientRect();
      const padding = parseFloat(getComputedStyle(form).paddingRight);
      return [...form.querySelectorAll(".form-input")].every(input => input.getBoundingClientRect().right <= edge.right - padding);
    }), `expanded inputs stay inside form padding ${width}`);
    await reflection.locator("summary").click();
    await media.locator("summary").click();
    await expect(media.locator("summary")).toContainText("이미지 1장 · 태그");
    await page.reload();
    await expect(reflection).toHaveAttribute("open", "");
    await expect(media).toHaveAttribute("open", "");
    await expect(page.locator("#post-question")).toHaveValue("읽고 쓰는 흐름이 더 가벼운가요?");
    await expect(page.locator("#post-tags")).toHaveValue("#작업기록 #선택항목");
    await reflection.locator("summary").click();
    await media.locator("summary").click();
    await publish.click();
    await expect(page.locator(".post-card h2")).toHaveText("가볍게 시작한 기록");
    await expect(page.locator(".record-reason > p")).toContainText("필요한 정보");
    await expect(page.locator(".record-question > p")).toContainText("흐름이 더 가벼운가요");
    await expect(page.locator(".post-image")).toBeVisible();
    await page.getByRole("button", { name: "게시물 메뉴" }).click();
    await page.getByRole("menuitem", { name: "기록 수정" }).click();
    await expect(reflection).toHaveAttribute("open", "");
    await expect(media).toHaveAttribute("open", "");
    await go("/create");
    await expect(reflection).not.toHaveAttribute("open", "");
    await expect(media).not.toHaveAttribute("open", "");
    await page.locator("#post-title").fill("한 줄 기록");
    await page.locator("#post-caption").fill("선택 항목을 열지 않아도 남길 수 있어요.");
    await publish.click();
    await expect(page.locator(".post-card h2")).toHaveText("한 줄 기록");
    await expect(page.locator(".record-reason")).toHaveCount(0);
    await expect(page.locator(".record-question")).toHaveCount(0);
    await expect(page.locator(".post-image")).toHaveCount(0);
    await layout();
    if ([390, 1440].includes(width)) {
      await go("/create");
      await page.locator("main").focus();
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${output}/lighter-final-create-${width}.png`, fullPage: true });
      await reflection.locator("summary").click();
      await media.locator("summary").click();
      await page.locator("main").focus();
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `${output}/lighter-final-expanded-${width}.png`, fullPage: true });
    }
    await context.close();
    console.log(`PASS lighter feed, full detail, keyboard disclosure, closed-content submission, draft/edit restore, optional omission: ${width}`);
  }
  assert.deepEqual(errors, []);
} finally {
  await browser.close();
}
