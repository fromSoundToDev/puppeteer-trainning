import puppeteer from "puppeteer";

(async ()=>{
  const browser = await   puppeteer.launch({
    headless:false ,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  await page.goto('https://fr.wikipedia.org/wiki/Web_scraping')
  const all_H2 = await page.evaluate(()=>{
   return Array.from(document.querySelectorAll('h2')).map(el=>el.innerText)
  });

  console.log('titre des section :', all_H2);
})()