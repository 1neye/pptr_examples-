const puppeteer = require(`${__dirname}/modules/puppeteer`);
const UserAgent = require(`${__dirname}/modules/userAgent`);
const prompt = require(`${__dirname}/modules/prompt`);
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

    (async () => {
        console.log(`${process.env.SOME_PASS}`)
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const userAgent = new UserAgent();
        await page.setUserAgent(userAgent.toString())
        // Manual LOG IN
        await page.goto('https://www.instagram.com/');
        await page.waitForTimeout(3000)

        await page.type(`input[name="username"]`, 'illya.it ', {delay: 100});
        await page.waitForTimeout(3000)
        await page.type(`input[name="password"]`, `${process.env.SOME_PASS}`, {delay: 100})
        await page.waitForTimeout(3000)
        await Promise.all([await page.click('button[type="submit"]'), page.waitForNavigation({ waitUntil: 'networkidle2' })])
        await page.waitForTimeout(4000)

        //Save cookies
        let cookie = await page.cookies()
        fs.writeFileSync(path.join(__dirname,'./c.json'), JSON.stringify(cookie))


        // Cookies login
        // let cookie = JSON.parse(fs.readFileSync(path.join(__dirname, `./c.json`),  'utf8'))
        // await page.setCookie(...cookie);
        // await page.goto('https://www.instagram.com/');
    })();