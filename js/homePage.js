import fashionApi from "./api/fashionApi";

function createProductElement(product) {
    if (!product) return;

    const cartMain = document.createElement('div');
    cartMain.classList.add('pro');

    const img = document.createElement('img');
    img.src = product.images[0].url;


    const des = document.createElement('div');
    des.classList.add('des');

    const span = document.createElement('span');
    span.textContent = product.brandName;

    const nameProduct = document.createElement('h5');
    nameProduct.textContent = product.name;

    const starRate = document.createElement('div');
    starRate.classList.add('star');

    for (let i = 0; i <= 5; i++) {
        const starSmall = document.createElement('i');
        starSmall.className = 'fas fa-star';

        starRate.appendChild(starSmall);
    }

    const price = document.createElement('h4');
    price.textContent = product.price.formattedValue;

    des.appendChild(span);
    des.appendChild(nameProduct);
    des.appendChild(starRate);
    des.appendChild(price);


    const a = document.createElement('a');
    a.href = 'single_product.html';

    const iconBuy = document.createElement('i');
    iconBuy.className = 'cart fa-solid fa-cart-shopping';

    a.appendChild(iconBuy);

    cartMain.appendChild(img);
    cartMain.appendChild(des);
    cartMain.appendChild(a);

    return cartMain;
}

function renderProducts(productsList) {
    if (!Array.isArray(productsList)) return;

    const divProduct = document.getElementById('product1');
    if (!divProduct) return;
    divProduct.textContent = '';

    const titleMain = document.createElement('h2');
    titleMain.textContent = 'New arrivals';

    const descriptMain = document.createElement('p');
    descriptMain.textContent = 'summer collection new morden design';

    const containerMain = document.createElement('div');
    containerMain.classList.add('pro-container');

    divProduct.appendChild(titleMain);
    divProduct.appendChild(descriptMain);
    divProduct.appendChild(containerMain);

    productsList.forEach((product, idx) => {
        const divChildProduct = createProductElement(product);

        containerMain.appendChild(divChildProduct);
    })
}

function initURL() {
    const url = new URL(window.location);

    if (!url.searchParams.get('lang'))
        url.searchParams.set('lang', 'en');

    if (!url.searchParams.get('country'))
        url.searchParams.set('country', 'us');

    if (!url.searchParams.get('currentpage'))
        url.searchParams.set('currentpage', 0);

    if (!url.searchParams.get('pagesize'))
        url.searchParams.set('pagesize', 8);

    if (!url.searchParams.get('categories'))
        url.searchParams.set('categories', 'home_newarrivals_all');

    if (!url.searchParams.get('rapidapi-key'))
        url.searchParams.set('rapidapi-key', 'bb0633e143msh54a54cb016e13a1p18cdd7jsn9c91c23fc0a8');

    history.pushState({}, '', url);
}

(async () => {
    try {
        initURL();

        const queryParams = new URLSearchParams(window.location.search);
        const data = await fashionApi.getAll(queryParams);

        renderProducts(data.results);
    } catch (error) {
        console.log(error);
    }
})();