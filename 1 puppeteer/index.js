const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
    });
    const page = await browser.newPage();
    await page.goto('https://bot.sannysoft.com/');
    await page.waitForTimeout(3000)
    await page.screenshot({ path: 'example2.png' });
    await browser.close();
})();