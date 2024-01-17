import fashionApi from "./api/fashionApi";

function renderProduct(productsList) {
    const productDetails = document.getElementById('prodetails');
    if (!productDetails) return;

    productDetails.textContent = '';

    const containerImg = document.createElement('div');
    containerImg.classList.add('single-pro-image');

    const img = createImage(productsList.articlesList[0].galleryDetails[0].baseUrl);
    const smallImg = createSmallImageGroup(productsList.articlesList[0].galleryDetails);

    containerImg.appendChild(img);
    containerImg.appendChild(smallImg);

    const containerDetails = document.createElement('div');
    containerDetails.classList.add('single-pro-details');

    const bread = createHeader('h6', 'Shop/ ' + productsList.assortmentTypeKey);
    const nameProduct = createHeader('h4', productsList.name);
    const priceProduct = createHeader('h2', productsList.whitePrice.price + ' $');

    const size = createSelect(productsList.measurements);

    const inputQuantity = createInput('number', 1);

    const addCart = createButton('button', 'normal', 'Add to cart', null);
    const backShop = createButton('button', 'normal', 'Back to shop', null);

    const titleDes = createHeader('h4', 'Product details');
    const des = createSpan(productsList.description);

    containerDetails.append(
        bread, nameProduct, priceProduct, size, inputQuantity,
        addCart, backShop, titleDes, des
    );

    productDetails.append(containerImg, containerDetails);
}

function createImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.alt = 'img product';
    img.style.width = '100%';
    return img;
}

function createSmallImageGroup(images) {
    const smallImg = document.createElement('div');
    smallImg.classList.add('small-img-group');

    images.forEach(imageDetails => {
        const childImgS = document.createElement('div');
        childImgS.classList.add('small-img-col');

        const imgShow = createImage(imageDetails.baseUrl);
        imgShow.classList.add('small-img');

        childImgS.appendChild(imgShow);
        smallImg.appendChild(childImgS);
    });

    return smallImg;
}

function createHeader(tag, text) {
    const header = document.createElement(tag);
    header.textContent = text;
    return header;
}

function createSelect(options) {
    const select = document.createElement('select');

    if (options && options.length > 0) {
        options.forEach(option => {
            const optionSize = document.createElement('option');
            optionSize.textContent = option;
            select.appendChild(optionSize);
        });
    } else {
        // Handle the case when 'measurements' is undefined or empty
        const defaultOption = document.createElement('option');
        defaultOption.textContent = 'No size available';
        select.appendChild(defaultOption);
    }

    return select;
}

function createInput(type, value) {
    const input = document.createElement('input');
    input.type = type;
    input.value = value;
    return input;
}

function createButton(type, className, text, onClick) {
    const button = document.createElement(type);
    button.classList.add(className);
    button.textContent = text;
    if (onClick) button.addEventListener('click', onClick);
    return button;
}

function createSpan(text) {
    const span = document.createElement('span');
    span.textContent = text;
    return span;
}



function initURL() {
    const url = new URL(window.location);

    if (!url.searchParams.get('lang'))
        url.searchParams.set('lang', 'en');

    if (!url.searchParams.get('country'))
        url.searchParams.set('country', 'us');

    if (!url.searchParams.get('rapidapi-key'))
        url.searchParams.set('rapidapi-key', '7e326de06fmsh2e148619e500f91p1104b7jsn5ac2bf1b0413');

    history.pushState({}, '', url);
}

(async () => {
    try {
        initURL();

        const queryParams = new URLSearchParams(window.location.search);
        const data = await fashionApi.getDetail(queryParams);

        const idProduct = queryParams.get('productcode');

        renderProduct(data.product);

        console.log(data.product);
    } catch (error) {
        console.log(error);
    }
})();