import fashionApi from "./api/fashionApi";

function createProductElement(product) {
    if (!product) return;

    const cartProduct = document.createElement('div');
    cartProduct.classList.add('pro');

    const img = document.createElement('img');
    img.src = product.images[0].url;

    const des = document.createElement('div');
    des.classList.add('des');

    const span = document.createElement('span');
    span.textContent = product.brandName;

    const nameProduct = document.createElement('a');
    nameProduct.href = 'single_product.html';
    nameProduct.textContent = product.name;

    const rateProduct = document.createElement('div');
    rateProduct.classList.add('start');

    for (let j = 0; j < 5; j++) {
        const rateStars = document.createElement('i');
        rateStars.classList.add('fas');
        rateStars.classList.add('fa-star');

        rateProduct.appendChild(rateStars);
    }

    const price = document.createElement('h4');
    price.textContent = product.price.formattedValue;



    des.appendChild(span);
    des.appendChild(nameProduct);
    des.appendChild(rateProduct);
    des.appendChild(price);

    const a = document.createElement('a');
    a.href = 'cart.html';

    const i = document.createElement('i');
    i.classList.add('cart');
    i.classList.add('fa-solid');
    i.classList.add('fa-cart-shopping');

    a.appendChild(i);

    cartProduct.appendChild(img);
    cartProduct.appendChild(des);
    cartProduct.appendChild(a);

    return cartProduct;
}

function renderProducts(productsList) {
    if (!Array.isArray(productsList)) return;

    const divProducts = document.getElementById('product1');
    if (!divProducts) return;

    divProducts.textContent = '';

    const containerProduct = document.createElement('div');
    containerProduct.classList.add('pro-container');

    divProducts.appendChild(containerProduct);

    productsList.forEach((product, idx) => {
        const divChildProduct = createProductElement(product);

        containerProduct.appendChild(divChildProduct);
    })
}

function rederPagination(pagination) {
    const divPagination = document.getElementById('pagination');
    const urlParams = new URLSearchParams(window.location.search);

    if (!divPagination || !urlParams) return;

    const totalPages = pagination.numberOfPages;
    const getPage = urlParams.get('currentpage') || 0;

    divPagination.dataset.totalPages = totalPages;
    divPagination.dataset.page = getPage;

    if (getPage <= 0) divPagination.firstElementChild?.classList.add('disabled');
    else divPagination.firstElementChild?.classList.remove('disabled');

    if (getPage >= totalPages) divPagination.lastElementChild?.classList.add('disabled');
    else divPagination.lastElementChild?.classList.remove('disabled');
}

async function handleFilterChange(filterName, filterValue) {
    const urlParams = new URL(window.location);

    console.log(urlParams);

    urlParams.searchParams.set(filterName, filterValue);
    history.pushState({}, '', urlParams);

    const data = await fashionApi.getAll(urlParams.searchParams);
    renderProducts(data.results);
    rederPagination(data.pagination);
}

function handlePrevClick(e) {
    e.preventDefault();
    const divPagination = document.getElementById('pagination');
    if (!divPagination) return;

    const page = Number.parseInt(divPagination.dataset.page) || 0;
    console.log(page);
    if (page <= 0) return;

    handleFilterChange('currentpage', page - 1);
    window.location.reload();
}

function handleNextClick(e) {
    e.preventDefault();
    const divPagination = document.getElementById('pagination');
    if (!divPagination) return;

    const page = Number.parseInt(divPagination.dataset.page) || 0;
    const totalPages = divPagination.dataset.totalPages;

    if (page >= totalPages) return;

    handleFilterChange('currentpage', page + 1);
    window.location.reload();
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
        url.searchParams.set('pagesize', 16);

    if (!url.searchParams.get('rapidapi-key'))
        url.searchParams.set('rapidapi-key', '7e326de06fmsh2e148619e500f91p1104b7jsn5ac2bf1b0413');

    history.pushState({}, '', url);
}

function initPagination() {
    const divPagination = document.getElementById('pagination');
    if (!divPagination) return;

    const prevLink = divPagination.firstElementChild;
    if (prevLink) {
        prevLink.addEventListener('click', handlePrevClick);
    }

    const nextLick = divPagination.lastElementChild;
    if (nextLick) {
        nextLick.addEventListener('click', handleNextClick);
    }
}

(async () => {
    try {
        initURL();
        initPagination();

        const queryParams = new URLSearchParams(window.location.search);
        const data = await fashionApi.getAll(queryParams);

        renderProducts(data.results);
        rederPagination(data.pagination);
    } catch (error) {
        console.log(error);
    }
})();