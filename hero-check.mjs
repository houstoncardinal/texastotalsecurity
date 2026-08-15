import { chromium } from "@playwright/test";

const viewports = [
  { name: "375", width: 375, height: 1900 },
  { name: "1024-tablet-landscape", width: 1024, height: 1600 },
  { name: "1440-desktop", width: 1440, height: 1600 },
  { name: "1920-wide", width: 1920, height: 1600 },
];

const browser = await chromium.launch();
const errors = [];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  page.on("pageerror", (e) => errors.push(`${vp.name}: ${String(e)}`));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(`${vp.name} console: ${msg.text()}`); });
  await page.goto("http://localhost:8080/", { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-cardinal-Desktop-texastotalsecurity/46c31b1c-b6fb-497f-acf6-1e0d33817649/scratchpad/v4-${vp.name}.png` });
  await page.close();
}

console.log("ERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
