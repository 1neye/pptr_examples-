let getPrices = async (page) => {

    let blockArr = await page.evaluate(() => {

        let arr = []


        let blockHtmlArr = Array.from(document.querySelectorAll('.card-product-block'), el => el.outerHTML) 

        console.log(blockHtmlArr)
        blockHtmlArr.map(el => {

            let html = document.createElement( 'html' );
            html.innerHTML = el


            let tittle = html.querySelector('.card-product-content__title').innerText;
            tittle = tittle.replace(/(\r\n|\n|\r)/gm," ").trim();
            let price = html.querySelector('span[itemprop="price"]').innerText;
            let views = html.querySelector('.product-rating__count').innerText;
            views = views.replace(/(\r\n|\n|\r)/gm," ").trim();

            let obj = {
                tittle: tittle,
                price: price,
                views: views
            }

            arr.push(obj)
        })
        return arr

    })

    return blockArr
}

module.exports = getPrices