import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    userDataDir: "./myUserDataDir",
    args: ["--start-maximized"],
  });
  const page = await browser.newPage();
  await page.goto(
    "https://www.amazon.fr/s?keywords=C%C3%A2bles&i=computers&rh=n%3A430265031%2Cp_123%3A234478%257C262640&dc&c=ts&qid=1742897656&rnid=91049112031&ts_id=430265031&ref=sr_nr_p_123_2&ds=v1%3AoTHScSMcVkvlTGs%2BXT8Ow284a0XdXpwcpgvRc9BcEI0"
  );

  const handleProducts = await page.$$(
    "span.rush-component.s-latency-cf-section > div.s-main-slot.s-result-list.s-search-results.sg-row > .s-result-item "
  );

  let item = [];

  let is_btn_disable = false;
  while (!is_btn_disable) {
  for (const handleProduct of handleProducts) {
      let title = null;
      let price = null;
      let image = null;
      try {
        title = await handleProduct.$eval(
          " a > h2 > span",
          (node) => node.innerText
        );
      } catch (error) {}

      try {
        price = await handleProduct.$eval(
          "span.a-price-whole",
          (node) => node.innerText
        );
      } catch (error) {}
      try {
        image = await handleProduct.$eval("img.s-image", (node) => node.src);
      } catch (error) {}

      if (title !== null) {
        item.push({ title, price, image });
      }
    }
      await page.waitForSelector(".a-list-item ", { visible: true });
      let next_btn =  (await page.$(".s-pagination-item.s-pagination-next.s-pagination-disabled")) !== null;
      console.log(next_btn);
       is_btn_disable = next_btn;
      if (!is_btn_disable) {
        await page.click(".s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-button-accessibility.s-pagination-separator");
       
      }
  }

  console.log(item.length);
  console.log(item);

  await browser.close();
})();
