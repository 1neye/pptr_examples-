const puppeteer = require(`${__dirname}/modules/puppeteer`);
const UserAgent = require(`${__dirname}/modules/userAgent`);
const prompt = require(`${__dirname}/modules/prompt`);


    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const userAgent = new UserAgent();
        await page.setUserAgent(userAgent.toString())
        await page.goto('https://europa-market.ru/catalog/bulochnaya-konditerskaya-119?page=7');
        await page.waitForTimeout(3000)
        
        let blockArr = await page.evaluate(() => {

            let arr = []


            let blockHtmlArr = Array.from(document.querySelectorAll('.card-product-block'), el => el.outerHTML) 
            blockHtmlArr.map(el => {
                let html = document.createElement( 'html' );
                html.innerHTML = el


                let tittle = html.querySelector('.card-product-content__title').innerText;
                tittle = tittle.replace(/(\r\n|\n|\r)/gm," ").trim();
                let price = html.querySelector('span[itemprop="price"]').innerText;

                let obj = {
                    tittle: tittle,
                    price: price
                }

                arr.push(obj)
            })
            return arr

        })

        console.log(blockArr)
    })();
