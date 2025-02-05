import puppeteer from "puppeteer";

(async()=>{
const browser = await puppeteer.launch({
    headless:false,
    defaultViewport:false,
    userDataDir:'./tp1'
})
const page = await browser.newPage();
await page.goto('https://wikipedia.org')
const title = await page.$eval('firstHeading',el=>el.innerText)
console.log(`title: ${title}`);
browser.close()
})()