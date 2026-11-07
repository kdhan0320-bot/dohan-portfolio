import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { writeFile } from "node:fs/promises";
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
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const page = await context.newPage();
page.setDefaultTimeout(10000);
const errors = [];
page.on("pageerror", (e) => errors.push(e.message));
const contrastResults = [];
const go = async (route) => {
  await page.goto(`${base}#${route}`);
  await expect(page.locator("main")).toHaveAttribute(
    "data-route",
    route.split("?")[0],
  );
  await page.evaluate(() => document.fonts.ready);
};
const contrast = async (label) => {
  const result = await page.evaluate(() => {
    const rgb = (c) => c.match(/[\d.]+/g)?.map(Number) || [0, 0, 0, 0];
    const blend = (fg, bg) =>
      fg
        .slice(0, 3)
        .map((x, i) => x * (fg[3] ?? 1) + bg[i] * (1 - (fg[3] ?? 1)));
    const lum = (c) =>
      c
        .map((v) => v / 255)
        .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
        .reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0);
    const failures = [];
    let inspected = 0;
    for (const el of document.querySelectorAll("body *")) {
      if (
        el.closest(
          'svg, .brand, [disabled], [aria-hidden="true"], .MuiBadge-badge',
        )
      )
        continue;
      if (
        ![...el.childNodes].some(
          (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
        )
      )
        continue;
      if (!el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }))
        continue;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) continue;
      const style = getComputedStyle(el),
        chain = [];
      for (let p = el; p; p = p.parentElement) chain.unshift(p);
      let bg = [255, 255, 255];
      for (const p of chain)
        bg = blend(rgb(getComputedStyle(p).backgroundColor), bg);
      const fg = blend(rgb(style.color), bg);
      const x = lum(fg),
        y = lum(bg);
      const ratio = (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
      const large =
        parseFloat(style.fontSize) >= 24 ||
        (parseFloat(style.fontSize) >= 18.667 &&
          Number(style.fontWeight) >= 700);
      inspected++;
      if (ratio < (large ? 3 : 4.5) || parseFloat(style.fontSize) < 12)
        failures.push({
          text: el.textContent.trim().slice(0, 65),
          selector: el.className,
          size: style.fontSize,
          color: style.color,
          bg,
          ratio: +ratio.toFixed(2),
        });
    }
    return { inspected, failures };
  });
  contrastResults.push({ label, ...result });
  console.log(
    `CONTRAST ${label}: ${result.inspected} texts, ${result.failures.length} findings`,
  );
  if (result.failures.length)
    console.log(JSON.stringify(result.failures.slice(0, 12)));
};
try {
  await page.goto(base);
  await expect(
    page.getByRole("button", { name: "작업실 둘러보기" }),
  ).toBeVisible();
  await contrast("login");
  await page.getByRole("button", { name: "작업실 둘러보기" }).click();
  await expect(page.locator("main")).toHaveAttribute("data-route", "/");
  assert.deepEqual(
    await page
      .locator(".bottom-nav > a")
      .evaluateAll((nodes) =>
        nodes.map((n) => n.getAttribute("aria-label") || n.textContent.trim()),
      ),
    ["피드", "모임", "새 기록 작성", "대화", "내 기록"],
  );
  for (const [route, label] of [
    ["/", "피드 분류"],
    ["/meetup", "모임 분류"],
    ["/profile", "내 활동"],
  ]) {
    await go(route);
    const tabs = page.getByRole("tablist", { name: label }).getByRole("tab");
    const count = await tabs.count();
    await tabs.first().focus();
    await page.keyboard.press("ArrowRight");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("End");
    await expect(tabs.last()).toBeFocused();
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
    await page.keyboard.press("ArrowRight");
    await expect(tabs.first()).toBeFocused();
    await page.keyboard.press("ArrowLeft");
    await expect(tabs.last()).toBeFocused();
    await page.keyboard.press("Home");
    await expect(tabs.first()).toBeFocused();
    const controls = await tabs.first().getAttribute("aria-controls");
    await expect(page.getByRole("tabpanel")).toHaveAttribute("id", controls);
    assert.equal(
      await tabs.evaluateAll(
        (nodes) => nodes.filter((n) => n.tabIndex === 0).length,
      ),
      1,
    );
    await page.keyboard.press("Tab");
    assert.equal(
      await page.evaluate(
        () => document.activeElement.getAttribute("role") === "tab",
      ),
      false,
    );
    console.log(`PASS keyboard tabs: ${label} (${count})`);
  }
  await go("/create");
  await page.locator("#post-title").fill("접근성과 기록 형식 검수");
  await page.locator("#post-caption").fill("버튼의 여백을 넓혔어요.");
  await page.locator("#reflection-options > summary").click();
  await page
    .locator("#post-reason")
    .fill("가까이 붙어 있어 잘못 누를 수 있다고 생각했어요.");
  await page
    .locator("#post-question")
    .fill("이 간격이면 한 손으로 누르기 편할까요?");
  await page.reload();
  await expect(page.locator("#post-reason")).toHaveValue(
    "가까이 붙어 있어 잘못 누를 수 있다고 생각했어요.",
  );
  await expect(page.locator("#post-question")).toHaveValue(
    "이 간격이면 한 손으로 누르기 편할까요?",
  );
  await page.getByRole("button", { name: "기록 남기기", exact: true }).click();
  await expect(page.locator(".post-card h2")).toHaveText(
    "접근성과 기록 형식 검수",
  );
  const detail = page.url().split("#")[1];
  await expect(page.locator(".record-reason > p")).toContainText(
    "잘못 누를 수",
  );
  await expect(page.locator(".record-question > p")).toHaveText(
    "이 간격이면 한 손으로 누르기 편할까요?",
  );
  await page.getByRole("button", { name: "의견 보태기" }).click();
  await expect(page.locator(".feedback-context p")).toHaveText(
    "이 간격이면 한 손으로 누르기 편할까요?",
  );
  await contrast("feedback-dialog");
  await page
    .getByRole("textbox", { name: "댓글 입력" })
    .fill("간격이 넓어져 구분하기 편해요.");
  await page.getByRole("button", { name: "댓글 보내기" }).click();
  await expect(
    page
      .getByRole("dialog")
      .getByText("간격이 넓어져 구분하기 편해요.", { exact: true }),
  ).toBeVisible();
  for (let i = 0; i < 4; i++) {
    await page
      .getByRole("textbox", { name: "댓글 입력" })
      .fill(`추가 피드백 ${i}: 댓글이 길어져도 새 의견과 입력창을 확인합니다.`);
    await page.getByRole("button", { name: "댓글 보내기" }).click();
  }
  await expect(
    page
      .getByRole("dialog")
      .getByText(
        "추가 피드백 3: 댓글이 길어져도 새 의견과 입력창을 확인합니다.",
      ),
  ).toBeInViewport();
  await page
    .getByRole("button", { name: "댓글 수정", exact: true })
    .last()
    .click();
  await page
    .getByRole("textbox", { name: "댓글 수정 내용" })
    .fill("의견을 조금 더 구체적으로 고쳤어요.");
  await page.getByRole("button", { name: "저장", exact: true }).click();
  await expect(page.getByRole("textbox", { name: "댓글 입력" })).toBeFocused();
  await expect(
    page
      .getByRole("dialog")
      .getByText("의견을 조금 더 구체적으로 고쳤어요.", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "댓글 삭제", exact: true })
    .last()
    .click();
  await expect(page.getByRole("textbox", { name: "댓글 입력" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: "의견 보태기" })).toBeFocused();
  await page.getByRole("button", { name: "게시물 메뉴" }).click();
  await page.getByRole("menuitem", { name: "기록 수정" }).click();
  await expect(page.locator("#post-question")).toHaveValue(
    "이 간격이면 한 손으로 누르기 편할까요?",
  );
  await page.locator("#post-reason").fill("이유를 고쳐 적었어요.");
  await page.getByRole("button", { name: "수정 완료", exact: true }).click();
  await page.reload();
  await expect(page.locator(".record-reason > p")).toHaveText(
    "이유를 고쳐 적었어요.",
  );
  await go("/");
  await page.getByLabel("작업 검색").fill("이유를 고쳐 적었어요");
  await expect(page.locator(".post-card")).toHaveCount(1);
  await expect(page.locator(".post-card h2")).toHaveText(
    "접근성과 기록 형식 검수",
  );
  await go(detail);
  await page.getByRole("button", { name: "게시물 메뉴" }).click();
  await page.getByRole("menuitem", { name: "기록 삭제" }).click();
  await contrast("delete-dialog");
  await page.getByRole("button", { name: "삭제하기", exact: true }).click();
  await expect(page.locator("main")).toHaveAttribute("data-route", "/");
  await go("/create");
  await page.locator("#post-title").fill("한 줄만 남기는 기록");
  await page.locator("#post-caption").fill("오늘은 색상 하나를 바꿨어요.");
  await page.getByRole("button", { name: "기록 남기기", exact: true }).click();
  await expect(page.locator(".post-card h2")).toHaveText("한 줄만 남기는 기록");
  await expect(page.locator(".record-question")).toHaveCount(0);
  await expect(page.locator(".record-reason")).toHaveCount(0);
  console.log(
    "PASS optional fields, draft/reload, create/edit, question-to-comment, search, delete, focus restoration",
  );
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const route of [
      "/",
      "/meetup",
      "/create",
      "/notifications",
      "/profile",
      "/chat/react-worklog",
    ]) {
      await go(route);
      await contrast(`${width} ${route}`);
      if (route === "/create") {
        await page.locator("#reflection-options > summary").click();
        await page.locator("#media-options > summary").click();
        await contrast(`${width} expanded editor`);
      }
      if (route === "/profile") {
        const cover = await page.locator(".profile-cover").evaluate((el) => {
          const label = el
            .querySelector(":scope > span")
            .getBoundingClientRect();
          const title = el
            .querySelector(":scope > strong")
            .getBoundingClientRect();
          return {
            labelBottom: label.bottom,
            titleTop: title.top,
            titleBottom: title.bottom,
            coverBottom: el.getBoundingClientRect().bottom,
          };
        });
        assert.ok(
          cover.labelBottom <= cover.titleTop &&
            cover.titleBottom <= cover.coverBottom,
          "profile cover text overlap",
        );
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await go("/");
  await go("/post/guest-1");
  const summary = page.locator('.post-card[data-post-id="guest-1"] summary');
  await summary.click();
  await summary.focus();
  await page.keyboard.press("Enter");
  await expect(
    page.locator('.post-card[data-post-id="guest-1"] details'),
  ).toHaveAttribute("open", "");
  await page.keyboard.press("Enter");
  await expect(
    page.locator('.post-card[data-post-id="guest-1"] details'),
  ).not.toHaveAttribute("open", "");
  await go("/profile");
  await page.getByRole("button", { name: "프로필 수정" }).click();
  await contrast("profile-dialog");
  await page.keyboard.press("Escape");
  await go("/meetup");
  await page
    .getByRole("article", { name: "작은 화면을 깊이 읽는 시간" })
    .getByRole("button", { name: "함께하기" })
    .click();
  await contrast("join-dialog");
  await page.keyboard.press("Escape");
  await go("/chat/react-worklog");
  await page.setViewportSize({ width: 390, height: 450 });
  const composer = await page.locator(".chat-form").boundingBox();
  assert.ok(composer.y + composer.height <= 450);
  console.log("PASS disclosure keyboard and 390x450 chat composer");
  await writeFile(
    `${output}/accessibility-records.json`,
    JSON.stringify({ url: base, contrastResults, errors }, null, 2),
  );
  assert.deepEqual(errors, []);
  assert.equal(
    contrastResults.reduce((sum, r) => sum + r.failures.length, 0),
    0,
    "text contrast / minimum size findings",
  );
  console.log("PASS accessible record workflows and sampled UI contrast");
} catch (e) {
  await page.screenshot({
    path: `${output}/accessibility-failure.png`,
    fullPage: true,
  });
  throw e;
} finally {
  await browser.close();
}
