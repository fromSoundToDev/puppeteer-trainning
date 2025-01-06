import puppeteer from 'puppeteer';

(async()=>{
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:false,
        userDataDir: './myData'
    });
    const page = await browser.newPage();
    await page.goto('https://www.cfetogo.tg/');


    
    // await page.screenshot({path:'cfetogo.png'})
    // await browser.close(); 
})();
