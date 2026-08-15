import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("http://localhost:8080/", { waitUntil: "networkidle" });
await page.waitForSelector("h1");
await page.waitForTimeout(800);
await page.screenshot({
  path: "/private/tmp/claude-501/-Users-cardinal-Desktop-texastotalsecurity/46c31b1c-b6fb-497f-acf6-1e0d33817649/scratchpad/zoom-texas-badge.png",
  clip: { x: 1210, y: 700, width: 130, height: 130 },
});
await browser.close();
