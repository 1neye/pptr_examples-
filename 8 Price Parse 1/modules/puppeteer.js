const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const AdblockerPlugin = require('puppeteer-extra-plugin-adblocker');
const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha');


puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin());
puppeteer.use(
        RecaptchaPlugin({
            provider: {
                id: '2captcha',
                token: 'xxx' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
            },
            visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
        })
    )
// usage await page.solveRecaptchas() 

module.exports = puppeteer;