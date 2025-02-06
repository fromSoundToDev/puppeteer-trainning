import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-fullscreen"],
  });
  const page = await browser.newPage();
  await page.goto("https://www.saucedemo.com/v1/");
  const username = await page.$("input#user-name.form_input");
  const password = await page.$("input#password.form_input");
  if (!username || !password) {
    console.log("cant reach the form input");
  } else {
    await page.type("input#user-name.form_input", "problem_user", {
      delay: 100,
    });
    await page.type("input#password.form_input", "secret_sauce", {
      delay: 100,
    });
    await page.click('input[type="submit"]');
    await page.waitForSelector("div.product_label", { visible: true });
    const title = await page.$eval("div.product_label", (el) => el.innerText);
    console.log(title);
  }
  await browser.close();
})();
