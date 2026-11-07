import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const {
  chromium,
  expect,
} = require("../../../tools/site-audit-kit/node_modules/@playwright/test");
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
const output = fileURLToPath(
  new URL("../../../tools/site-audit-kit/audit-output/", import.meta.url),
);
const base = process.env.MINI_SNS_URL || "http://127.0.0.1:5174/";
(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  const results = [];
  try {
    for (const width of [1440, 390, 320]) {
      const context = await browser.newContext({
        viewport: { width, height: width < 768 ? 844 : 1000 },
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      const feed = () =>
        page
          .getByRole("heading", {
            name: "작은 기록, 새로운 영감",
            level: 1,
            exact: true,
          })
          .waitFor();
      await page.goto(base);
      await page.getByRole("button", { name: "작업실 둘러보기" }).click();
      await feed();
      await page.getByRole("tab", { name: "작업기록", exact: true }).click();
      await page.getByRole("searchbox", { name: "작업 검색" }).fill("여행");
      await expect(page.locator(".post-card")).toHaveCount(1);
      await expect(page).toHaveURL(/q=/);
      const filtered = page.url();
      await page.reload();
      await expect(
        page.getByRole("searchbox", { name: "작업 검색" }),
      ).toHaveValue("여행");
      await expect(
        page.getByRole("tab", { name: "작업기록", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await page.locator(".post-copy h2 a").first().click();
      await page
        .getByRole("heading", { level: 1, name: "작업 기록", exact: true })
        .waitFor();
      const detail = page.url();
      await page.reload();
      await page.getByRole("link", { name: "피드로", exact: true }).click();
      await feed();
      await expect(page).toHaveURL(filtered);
      await expect(
        page.getByRole("searchbox", { name: "작업 검색" }),
      ).toHaveValue("여행");
      await expect(page.locator(".post-card")).toHaveCount(1);
      await page.locator(".post-copy h2 a").first().click();
      await page
        .getByRole("heading", { level: 1, name: "작업 기록", exact: true })
        .waitFor();
      await page.goBack();
      await feed();
      await expect(
        page.getByRole("searchbox", { name: "작업 검색" }),
      ).toHaveValue("여행");
      await page.getByRole("tab", { name: "질문", exact: true }).click();
      await expect(
        page.getByRole("searchbox", { name: "작업 검색" }),
      ).toHaveValue("여행");
      await page
        .getByRole("button", { name: "전체 기록 보기", exact: true })
        .click();
      await expect(
        page.getByRole("searchbox", { name: "작업 검색" }),
      ).toHaveValue("");
      await expect(page.locator(".post-card")).toHaveCount(5);
      await page.goto(base + "#/create");
      await page
        .getByRole("heading", {
          level: 1,
          name: "오늘의 작은 기록",
          exact: true,
        })
        .waitFor();
      await page.locator("#post-title").fill("이어 쓰는 과정");
      await page.locator("#post-caption").fill("버튼 위치를 조정했습니다.");
      await page.locator("#reflection-options > summary").click();
      await page
        .locator("#post-reason")
        .fill("누르기 쉬운 위치를 찾기 위해서입니다.");
      await page
        .locator("#post-question")
        .fill("시선의 흐름이 자연스러운가요?");
      await page.getByRole("button", { name: "돌아가기", exact: true }).click();
      await expect(page.getByRole("dialog")).toContainText("초안");
      await expect(
        page.getByRole("button", { name: "초안 보관하고 나가기", exact: true }),
      ).toBeFocused();
      await page.screenshot({
        path: path.join(output, `mini-sns-draft-choice-${width}.png`),
      });
      await page
        .getByRole("button", { name: "초안 보관하고 나가기", exact: true })
        .click();
      await feed();
      await page.goto(base + "#/create");
      await expect(page.locator("#post-title")).toHaveValue("이어 쓰는 과정");
      await expect(page.locator("#post-reason")).toHaveValue(
        "누르기 쉬운 위치를 찾기 위해서입니다.",
      );
      await expect(page.locator("#post-question")).toHaveValue(
        "시선의 흐름이 자연스러운가요?",
      );
      await page.getByRole("button", { name: "돌아가기", exact: true }).click();
      await page
        .getByRole("button", { name: "초안 버리기", exact: true })
        .click();
      await feed();
      await page.goto(base + "#/create");
      await expect(page.locator("#post-title")).toHaveValue("");
      await expect(page.locator("#post-caption")).toHaveValue("");
      await expect(page.locator("#post-reason")).toHaveValue("");
      await expect(page.locator("#post-question")).toHaveValue("");
      await page.locator("#post-title").fill("실제 등록 확인");
      await page
        .locator("#post-caption")
        .fill("고민하던 버튼 위치를 바꿨어요.");
      await page.locator("#reflection-options > summary").click();
      await page
        .locator("#post-reason")
        .fill("스크롤 후에도 찾기 쉬운 위치예요.");
      await page.locator("#post-question").fill("손이 닿기 쉬운가요?");
      await page
        .locator("form")
        .getByRole("button", { name: "기록 남기기", exact: true })
        .click();
      await expect(page.locator(".post-copy h2")).toHaveText("실제 등록 확인");
      await page.reload();
      await expect(page.locator(".post-copy")).toContainText(
        "스크롤 후에도 찾기 쉬운 위치예요.",
      );
      await page
        .getByRole("button", { name: "댓글 보기", exact: true })
        .click();
      await expect(page.getByRole("dialog")).toContainText(
        "손이 닿기 쉬운가요?",
      );
      await page.getByRole("button", { name: "댓글 닫기" }).press("Escape");
      await page
        .getByRole("button", { name: "게시물 메뉴", exact: true })
        .click();
      await page
        .getByRole("menuitem", { name: "기록 수정", exact: true })
        .click();
      await page.locator("#post-title").fill("버릴 수정 초안");
      await page.getByRole("button", { name: "돌아가기", exact: true }).click();
      await page
        .getByRole("button", { name: "초안 버리기", exact: true })
        .click();
      await expect(page.locator(".post-copy h2")).toHaveText("실제 등록 확인");
      if (width === 390) {
        await page
          .getByRole("button", { name: "게시물 메뉴", exact: true })
          .click();
        await page
          .getByRole("menuitem", { name: "기록 수정", exact: true })
          .click();
        await page.locator("#post-title").waitFor();
        await page.evaluate(() => {
          window.miniOriginalSetItem = Storage.prototype.setItem;
          Storage.prototype.setItem = function (key, value) {
            if (key.startsWith("mini-sns-v2:draft-"))
              throw new DOMException("Blocked", "QuotaExceededError");
            return window.miniOriginalSetItem.call(this, key, value);
          };
        });
        await page.locator("#post-title").fill("보관 실패 후에도 남길 내용");
        await page
          .getByRole("button", { name: "돌아가기", exact: true })
          .click();
        await page
          .getByRole("button", { name: "초안 보관하고 나가기", exact: true })
          .click();
        await expect(page.getByRole("dialog")).toContainText(
          "초안을 보관하지 못했어요",
        );
        await page
          .getByRole("button", { name: "초안 버리기", exact: true })
          .click();
        await expect(page.getByRole("dialog")).toContainText(
          "초안을 지우지 못했어요",
        );
        await page.evaluate(() => {
          Storage.prototype.setItem = window.miniOriginalSetItem;
          delete window.miniOriginalSetItem;
        });
        await page
          .getByRole("button", { name: "초안 보관하고 나가기", exact: true })
          .click();
        await expect(page.locator(".post-copy h2")).toHaveText(
          "실제 등록 확인",
        );
        await page
          .getByRole("button", { name: "게시물 메뉴", exact: true })
          .click();
        await page
          .getByRole("menuitem", { name: "기록 수정", exact: true })
          .click();
        await expect(page.locator("#post-title")).toHaveValue(
          "보관 실패 후에도 남길 내용",
        );
      }
      results.push({
        width,
        searchReload: true,
        detailReturn: true,
        browserBack: true,
        categoryWithSearch: true,
        reset: true,
        draftKeep: true,
        draftDiscard: true,
        processRecord: true,
        questionInComments: true,
        detailURL: detail,
      });
      await context.close();
      console.log("PASS continuity " + width);
    }
    fs.writeFileSync(
      path.join(output, "mini-sns-continuity-results.json"),
      JSON.stringify(results, null, 2),
    );
  } finally {
    await browser.close();
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
