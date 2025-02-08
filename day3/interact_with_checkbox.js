import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-fullscreen']
    });

    const page = await browser.newPage();
    await page.goto('https://demoqa.com/', { timeout: 240000 });

    // Wait for the main cards to load
    await page.waitForSelector('.category-cards', { visible: true });

    // Click on "Elements" card (first card)
    await page.click('.card.mt-4.top-card:nth-child(1)');

    // Wait for the sidebar buttons to load
    await page.waitForSelector('.btn.btn-light', { visible: true });

    // Click on "Check Box" in the sidebar
    await page.click('.btn.btn-light:nth-child(2)');

    // Expand the first collapsible button
    await page.waitForSelector('.rct-collapse.rct-collapse-btn', { visible: true });
    await page.click('.rct-collapse.rct-collapse-btn');

    // Expand the second collapsible button under "Office"
    await page.waitForSelector('div#tree-node ol li:nth-child(2) button.rct-collapse.rct-collapse-btn', { visible: true });
    await page.click('div#tree-node ol li:nth-child(2) button.rct-collapse.rct-collapse-btn');

    
  

    console.log("✅ 'Classified' checkbox selected!");

    // Optional: Wait a few seconds before closing
   

    
})();
