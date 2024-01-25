const puppeteer = require(`${__dirname}/modules/puppeteer`);
const UserAgent = require(`${__dirname}/modules/userAgent`);
const prompt = require(`${__dirname}/modules/prompt`);

const getPrices = require(`${__dirname}/getPrices`);


    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const userAgent = new UserAgent();
        await page.setUserAgent(userAgent.toString())
        await page.goto('https://europa-market.ru/catalog/bulochnaya-konditerskaya-119?page=7');
        await page.waitForTimeout(3000)
        
        let data = await getPrices(page)
        console.log(data)

        await page.waitForTimeout(3000)
        await page.click('.next')

        // JSON to FILE
        // PAGINATION CYCLE
    })();
