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
    "https://www.amazon.fr/s?i=computers&rh=n%3A429879031&s=popularity-rank&fs=true&page=9&qid=1742893355&xpid=h1bL3vKKnwIjW&ref=sr_pg_1",
    {
      waitUntil: "load",
    }
  );

  const isDisabled =
    (await page.$(".s-pagination-disabled")) !== null;
  console.log(isDisabled);

  await browser.close();
})();
