import puppeteer from 'puppeteer';

(async()=>{
    const browser = await puppeteer.launch({
        // permet de voir la lactiviter du script dans le navigateur afin de mieu debuger
        headless:false,
        // aggrandi le navigateur au size de lecran 
        defaultViewport:false,
        // dossir qui contien les donnee utilisateur 
        userDataDir: './myData'
    });
    const page = await browser.newPage();
    await page.goto('https://www.amazon.com/');

    // parcourir le div parent qui contien linfo rechercher 
    const handleProducts = await page.$$('.a-section .a-spacing-none .gw-card-layout')

    for (const handleProduct of handleProducts) {

        const productHeader = await page.evaluate(el=>el.querySelector("div>.a-cardui-header>h2").textContent,handleProduct);
        console.log(productHeader);
    }




    // await page.screenshot({path:'cfetogo.png'})
    // await browser.close(); 
})();
