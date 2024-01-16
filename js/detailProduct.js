import fashionApi from "./api/fashionApi";

// function renderProduct(productsList) {

//     const mainImg = document.getElementById('main-img');
//     mainImg.src = productsList.articlesList[0].galleryDetails[0].baseUrl;

//     const smallImg = document.getElementById('smallImg');

//     for (let i = 0; i < productsList.articlesList[0].galleryDetails.length; i++) {
//         smallImg.children[i].firstElementChild.src = productsList.articlesList[0].galleryDetails[i].baseUrl;
//     }
// }

function renderProduct(productsList) {

    const productDetails = document.getElementById('prodetails');
    if (!productDetails) return;

    productDetails.textContent = '';

    const containerImg = document.createElement('div');
    containerImg.classList.add('single-pro-image');


    const img = document.createElement('img');
    img.src = productsList.articlesList[0].galleryDetails[0].baseUrl;
    img.alt = 'img product';
    img.style.width = '100%';


    const smallImg = document.createElement('div');
    smallImg.classList.add('small-img-group');

    for (let i = 0; i < productsList.articlesList[0].galleryDetails.length; i++) {
        const childImgS = document.createElement('div');
        childImgS.classList.add('small-img-col');

        const imgShow = document.createElement('img');
        imgShow.src = productsList.articlesList[0].galleryDetails[i].baseUrl;
        imgShow.style.width = '100%';
        imgShow.classList.add('small-img');

        childImgS.appendChild(imgShow);

        smallImg.appendChild(childImgS);
    }


    const containerDetails = document.createElement('div');
    containerDetails.classList.add('single-pro-details');

    const bread = document.createElement('h6');
    bread.textContent = 'Shop/ ' + productsList.assortmentTypeKey;

    const nameProduct = document.createElement('h4');
    nameProduct.textContent = productsList.name;

    const priceProduct = document.createElement('h2');
    priceProduct.textContent = productsList.whitePrice.price + ' $';

    const size = document.createElement('select');
    for (let i = 0; i < productsList.measurements.length; i++) {
        const optionSize = document.createElement('option');
        optionSize.textContent = productsList.measurements[i];

        size.appendChild(optionSize);
    }

    const inputQuantity = document.createElement('input');
    inputQuantity.type = 'number';
    inputQuantity.value = 1;

    const addCart = document.createElement('button');
    addCart.classList.add('normal');
    addCart.textContent = 'Add to cart';

    const backShop = document.createElement('button');
    backShop.classList.add('normal');
    backShop.textContent = 'Back to shop';

    const titleDes = document.createElement('h4');
    titleDes.textContent = 'Product details';

    const des = document.createElement('span');
    des.textContent = productsList.description;

    containerDetails.appendChild(bread);
    containerDetails.appendChild(nameProduct);
    containerDetails.appendChild(priceProduct);
    containerDetails.appendChild(size);
    containerDetails.appendChild(inputQuantity);
    containerDetails.appendChild(addCart);
    containerDetails.appendChild(backShop);
    containerDetails.appendChild(titleDes);
    containerDetails.appendChild(des);


    containerImg.appendChild(img);
    containerImg.appendChild(smallImg);


    productDetails.appendChild(containerImg);
    productDetails.appendChild(containerDetails);

    // const mainImg = document.getElementById('main-img');
    // const smallImg = document.getElementById('smallImg');

    // if (productsList && productsList.articlesList && productsList.articlesList.length > 0) {
    //     const galleryDetails = productsList.articlesList[0].galleryDetails;

    //     if (galleryDetails && galleryDetails.length > 0) {
    //         mainImg.src = galleryDetails[0].baseUrl;
    //     }

    //     for (let i = 0; i < smallImg.children.length && i < galleryDetails.length; i++) {
    //         const smallImgChild = smallImg.children[i].firstElementChild;
    //         if (smallImgChild) {
    //             smallImgChild.src = galleryDetails[i].baseUrl;
    //         }
    //     }
    // }
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