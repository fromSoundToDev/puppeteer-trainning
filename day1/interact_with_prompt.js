import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await page.authenticate({
        username: "admin",
        password: "admin",
    });

    await page.goto("https://the-internet.herokuapp.com/basic_auth");

    await page.waitForSelector("p");

    const successMessage = await page.$eval("p", (el) => el.innerText);
    console.log(" Authentification réussie:", successMessage);

    await browser.close();s
})();
