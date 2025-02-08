import puppeteer from "puppeteer";

(async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ['--start-fullscreen'] // Ouvre Chromium en plein écran
    });

    const page = await browser.newPage();
    await page.goto('https://demoqa.com/', { timeout: 240000 });

    // 1️⃣ Attendre et cliquer sur la carte "Elements"
    await page.waitForSelector('.card.mt-4.top-card', { visible: true });
    await page.click('.card.mt-4.top-card:nth-child(1)');

    // 2️⃣ Attendre et cliquer sur "Check Box"
    await page.waitForSelector('.btn.btn-light', { visible: true });
    await page.click('li#item-1');

    // 3️⃣ Déplier le menu principal (Home)
    await page.waitForSelector('.rct-collapse.rct-collapse-btn', { visible: true });
    await page.click('.rct-collapse.rct-collapse-btn');

    // 4️⃣ Attendre que le menu "Documents" apparaisse et le déplier
    await page.waitForSelector('li:nth-child(2) > .rct-node > .rct-collapse', { visible: true });
    await page.click('li:nth-child(2) > .rct-node > .rct-collapse');

    // 5️⃣ Attendre que "Office" apparaisse et le déplier
    await page.waitForSelector('li:nth-child(2) > ol > li:nth-child(2) > .rct-node > .rct-collapse', { visible: true });
    await page.click('li:nth-child(2) > ol > li:nth-child(2) > .rct-node > .rct-collapse');

    // 6️⃣ Attendre et cliquer sur "Classified"
    await page.waitForSelector('#tree-node-classified', { visible: true });
    await page.click('label[for="tree-node-classified"]');

    console.log("✅ 'Classified' est coché avec succès !");
    
    await browser.close();
})();
