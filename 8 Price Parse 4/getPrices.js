let getPrices = async (page) => {

    let blockArr = await page.evaluate(() => {

        let arr = []


        let blockHtmlArr = Array.from(document.querySelectorAll('.card-product-block'), el => el.outerHTML) 
        blockHtmlArr.map(el => {
            let html = document.createElement( 'html' );
            html.innerHTML = el


            let tittle = html.querySelector('.card-product-content__title').innerText;
            tittle = tittle.replace(/(\r\n|\n|\r)/gm," ").trim();
            let price = html.querySelector('span[itemprop="price"]').innerText;
            let url = html.querySelector('.card-product-image  a').href;

            let obj = {
                tittle: tittle,
                price: price,
                url: url
            }

            arr.push(obj)
        })
        return arr

    })

    return blockArr
}

module.exports = getPrices