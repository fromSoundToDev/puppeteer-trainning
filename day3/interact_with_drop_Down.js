import puppeteer from "puppeteer";

(async ()=>{
    const browser = await puppeteer.launch({
        headless:false,
        defaultViewport:null,
        args:['--start-fullscreen']
       
    });
    const page = await browser.newPage();
    await page.goto('https://demoqa.com/',{timeout:240000});
    await page.waitForSelector('.category-cards',{visible:true});
    await page.click('.card.mt-4.top-card:nth-child(1)');
    await page.waitForSelector('.btn.btn-light',{visible:true});
    await page.click('.btn.btn-light:nth-child(1)');
    await page.type('#userName','jeune',{delay:100})
    await page.type('#userEmail','jeune@exemple.com')
    await page.type('#currentAddress','lome',{delay:100})
    await page.type('#permanentAddress','agoe',{delay:100})

    await page.click('button#submit')
 

    console.log('form submited successfully');
    
    await browser.close(); 

})()