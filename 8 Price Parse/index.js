const puppeteer = require(`${__dirname}/modules/puppeteer`);
const UserAgent = require(`${__dirname}/modules/userAgent`);
const prompt = require(`${__dirname}/modules/prompt`);


// Array.from(document.querySelectorAll('.ui-price__current span[itemprop="price"]'), el => el.innerText)
// document.querySelectorAll('.card-product-content__title') 

    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const userAgent = new UserAgent();
        await page.setUserAgent(userAgent.toString())
        await page.goto('https://europa-market.ru/catalog/bulochnaya-konditerskaya-119?page=7');
        await page.waitForTimeout(3000)
        
        let title = await page.evaluate(() => {
            let t = Array.from(document.querySelectorAll('.card-product-content__title'), el => el.innerText )
            return t
        })

        console.log(title)

        let price = await page.evaluate(() => {
            let p = Array.from(document.querySelectorAll('.ui-price__current span[itemprop="price"]'), el => el.innerText)
            return p 
        })
        console.log(price)
        // await browser.close();
    })();

