import puppeteer from "puppeteer";

(async()=>{
const browser = await puppeteer.launch({
    headless:false,
    defaultViewport:null,
    userDataDir:'./tp1'
})
const page = await browser.newPage();
await page.goto('https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal')
const title = await page.$eval('h1.mw-first-heading',el=>el.innerText)
console.log(`title: ${title}`);
await browser.close()
})()