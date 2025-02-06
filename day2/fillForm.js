import puppeteer from "puppeteer";

(async ()=>{
   const  browser = await puppeteer.launch({
    headless:false,
    defaultViewport:null,
    args: ['--start-fullscreen'] 
   })
   const page = await browser.newPage()
   await page.goto('https://fr.wikipedia.org/wiki/Wikip%C3%A9dia:Accueil_principal')
   await page.evaluate(() => {
    document.documentElement.requestFullscreen();
});
   const searchInput = await page.$('input.cdx-text-input__input')
   const searchBtn = await page.$('button.cdx-search-input__end-button')
   if (!searchBtn && !searchInput) {
    console.log('element not found ');
   } else {
    await page.type('input.cdx-text-input__input','faure gnasingbe',{delay:100})
    await page.waitForSelector('.cdx-menu',{visible:true})
    await page.click('.cdx-menu-item a')
    await page.screenshot({path:'result.png'})
   
   }
   await browser.close()
})()