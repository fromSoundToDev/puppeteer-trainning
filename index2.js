import puppeteer from "puppeteer";

(async()=>{
    const browser = await puppeteer.launch({
        defaultViewport:false,
        headless:false,
        userDataDir:'./myData'
    })
    const page = await browser.newPage();
    await page.goto('https://')
})