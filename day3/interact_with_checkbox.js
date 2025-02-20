import { launch } from 'puppeteer';

(async () => {
  // Lancement du navigateur
  const browser = await launch({ headless: false }); // headless: false pour voir le navigateur
  const page = await browser.newPage();

  page.setDefaultTimeout(240000)
  // Navigation vers la page des checkboxes
  await page.goto('https://demoqa.com/checkbox');

  // Attendre que le bouton pour développer l'arborescence soit visible
  await page.waitForSelector('.rct-collapse-btn');

  // Cliquer sur le bouton pour développer l'arborescence
  await page.click('.rct-collapse-btn');

  // Attendre que les checkboxes soient visibles
  await page.waitForSelector('.rct-checkbox');

  // Cochez une checkbox spécifique (par exemple, "Desktop")
  const checkboxSelector = 'label[for="tree-node-desktop"]';
  await page.waitForSelector(checkboxSelector);
  await page.click(checkboxSelector);

  // Vérifiez si la checkbox est cochée
  const isChecked = await page.evaluate((selector) => {
    const checkbox = document.querySelector(selector);
    return checkbox.checked;
  }, 'input[id="tree-node-desktop"]');

  console.log('La checkbox est-elle cochée ?', isChecked);

  // Prendre une capture d'écran pour vérifier
  await page.screenshot({ path: 'checkbox.png' });

  // Fermer le navigateur
  await browser.close();
})();