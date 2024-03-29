const puppeteer = require(`${__dirname}/modules/puppeteer`);
const UserAgent = require(`${__dirname}/modules/userAgent`);
const prompt = require(`${__dirname}/modules/prompt`);
const fs = require('fs')

const getPrices = require(`${__dirname}/getPrices`);


    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const userAgent = new UserAgent();
        await page.setUserAgent(userAgent.toString())
        try {
            await page.goto('https://europa-market.ru/catalog/bulochnaya-konditerskaya-119?page=7');
        } catch(e) {
            await page.evaluate(() => window.stop());
        }
        
        await page.waitForTimeout(4000)
        
        let data = await getPrices(page)
        console.log(data)

        await page.waitForTimeout(3000)
        await page.click('.next')

        let read = JSON.parse(fs.readFileSync('./data.json'))
        read.push(...data)
        fs.writeFileSync('./data.json', JSON.stringify(read))

        // https://www.convertcsv.com/json-to-csv.htm

    })();
