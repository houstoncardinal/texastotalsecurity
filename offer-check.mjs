import { chromium } from "@playwright/test";

const browser = await chromium.launch();
const errors = [];

const viewports = [
  { name: "375", width: 375, height: 3200 },
  { name: "1440", width: 1440, height: 2400 },
];

for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
  page.on("pageerror", (e) => errors.push(`${vp.name}: ${String(e)}`));
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(`${vp.name} console: ${msg.text()}`); });
  await page.goto("http://localhost:8080/honeywell-keypad-offer", { waitUntil: "networkidle" });
  console.log(vp.name, "URL after nav:", page.url());
  console.log(vp.name, "H1:", await page.locator("h1").first().innerText().catch(() => "(none)"));
  await page.waitForTimeout(600);
  await page.screenshot({ path: `/private/tmp/claude-501/-Users-cardinal-Desktop-texastotalsecurity/46c31b1c-b6fb-497f-acf6-1e0d33817649/scratchpad/offer-${vp.name}.png`, fullPage: true });
  await page.close();
}

console.log("ERRORS:", JSON.stringify(errors, null, 2));
await browser.close();
