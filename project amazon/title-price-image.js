import puppeteer from "puppeteer";
import fs from "fs";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./myUserDataDir",
    args: ["--start-maximized"],
  });

  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.fr/-/en/s?k=C%C3%A2bles&i=computers&rh=n%3A430265031%2Cp_123%3A234478%257C262640&dc&language=en_GB&c=ts&qid=1742969707&rnid=91049112031&ts_id=430265031&xpid=9846rzEyDQNIi&ref=sr_pg_1",
    { waitUntil: "load" }
  );

  let is_btn_disable = false;

  while (!is_btn_disable) {
    await page.waitForSelector(".s-main-slot.s-result-list", { visible: true });

    const handleProducts = await page.$$(
      "span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item"
    );

    for (const handleProduct of handleProducts) {
      let title = null;
      let price = null;
      let image = null;

      try {
        title = await handleProduct.$eval("a > h2 > span", (node) => node.innerText);
      } catch (error) {}

      try {
        price = await handleProduct.$eval("span.a-offscreen", (node) => node.innerText);
      } catch (error) {}

      try {
        image = await handleProduct.$eval("img.s-image", (node) => node.src);
      } catch (error) {}

      if (title !== null) {
        const line = `${title.replace(/,/g,'.')},${price},${image}\n`;
        fs.appendFileSync("result.csv", line, "utf8");
      }
    }

    await page.waitForSelector(".s-pagination-item", { visible: true });

    is_btn_disable = (await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled")) !== null;

    if (!is_btn_disable) {
      await Promise.all([
        page.click(".s-pagination-item.s-pagination-next"),
        page.waitForNavigation({ waitUntil: "load" }),
      ]);
    }
  }

  await browser.close();
})();
