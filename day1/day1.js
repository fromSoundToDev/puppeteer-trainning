import puppeteer from 'puppeteer'

(async()=>{
    const browser = await  puppeteer.launch({
        headless : false ,
        defaultViewport:false ,
        userDataDir:'./tp1'
    })
    const page = await browser.newPage();
    await page.goto('https://wikipedia.org')
    await page.screenshot({path:'screenshot.png'})
    console.log("screenshot done with success");
    browser.close()
})()