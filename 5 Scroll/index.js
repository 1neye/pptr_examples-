const puppeteer = require(`${__dirname}/modules/puppeteer`);
const UserAgent = require(`${__dirname}/modules/userAgent`);
const prompt = require(`${__dirname}/modules/prompt`);
const fs = require('fs');
const path = require('path');

let autoScroll = async (page) => {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            var totalHeight = 0;
            var distance = 100;
            var timer = setInterval(() => {
                var scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if(totalHeight >= scrollHeight - window.innerHeight){
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}

    (async () => {
        const browser = await puppeteer.launch({
            headless: false,
        });
        const page = await browser.newPage();
        const userAgent = new UserAgent();
        await page.setUserAgent(userAgent.toString())
        let cookie = JSON.parse(fs.readFileSync(path.join(__dirname, `../c.json`), 'utf8'))
        await page.setCookie(...cookie);
        await page.goto('https://2ch.hk/de/', { waitUntil: 'networkidle2' });
        
        

        
        let current = 0
        while(true) {
            await autoScroll(page)
            let idx = await page.evaluate(() => {
                return document.querySelectorAll('.post').length
            })
            if(current >= idx) {
                break
            }
            current = current + idx
           
        }

    })();