import puppeteer from "puppeteer";

const browser = await puppeteer.launch({
    headless:false,
    defaultViewport:null
})

const page = await browser.newPage()



await page.goto('https://demoqa.com/',{timeout:240000});
await page.waitForSelector('.home-body .category-cards')
await page.click('.card.mt-4.top-card:nth-child(1)')

await page.waitForSelector('.left-pannel .accordion .element-group:nth-child(1) .group-header')
await page.click('.element-group:nth-child(1) .element-list.collapse  ')
await page.waitForSelector('#item-1',{visible:true})
await page.click('ul #item-1.btn.btn-light')
await page.waitForSelector('#tree-node',{visible:true})
await page.click('#tree-node .rct-node.rct-node-parent.rct-node-collapsed .rct-collapse.rct-collapse-btn')

