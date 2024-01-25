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

        let pages = 3
        let idx = 0

        while(pages > idx) {
            let data = await getPrices(page)

            let read = JSON.parse(fs.readFileSync('./data.json'))
            read.push(...data)
            fs.writeFileSync('./data.json', JSON.stringify(read))


            await page.click('.next')
            await page.waitForTimeout(3000)
            idx = idx + 1
        }
        
        
        
        
        

        
        

        

        // https://www.convertcsv.com/json-to-csv.htm

    })();
