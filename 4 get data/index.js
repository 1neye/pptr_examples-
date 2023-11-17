const puppeteer = require(`${__dirname}/modules/puppeteer`);
const UserAgent = require(`${__dirname}/modules/userAgent`);
const prompt = require(`${__dirname}/modules/prompt`);
const fs = require('fs');
const path = require('path');



(async () => {
    const browser = await puppeteer.launch({
        headless: false,
    });
    const page = await browser.newPage();
    const userAgent = new UserAgent();
    await page.setUserAgent(userAgent.toString())

    let cookie = JSON.parse(fs.readFileSync(path.join(__dirname, `./c.json`), 'utf8'))
    await page.setCookie(...cookie);
    await page.goto('https://www.instagram.com/belle.delphine/followers/?hl=en', { waitUntil: 'networkidle2' })
    await page.waitForTimeout(6000)

    let subs = await page.evaluate(() => {
        return document.querySelector('[role="dialog"] a').href
    })

    console.log(subs)

    let allSubs = await page.evaluate(() => {
        let a = Array.from(document.querySelectorAll('[role="dialog"] a', el => el.href))
        let aToString = Array.from(a, el => el.href)
        return aToString

    })
    console.log(allSubs)



})();