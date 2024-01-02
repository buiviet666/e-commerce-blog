
import postApi from "./api/postApi";

function createPostElement(post) {
    if (!post) return;

    const mainBlogBox = document.createElement('div');
    mainBlogBox.classList.add('blog-box');

    const blogImg = document.createElement('div');
    blogImg.classList.add('blog-img');

    const img = document.createElement('img');
    img.classList.add('blog_imgpost');
    img.src = post.urlToImage;
    img.alt = 'blog img';
    img.style.objectFit = 'cover';

    blogImg.appendChild(img);


    const blogDetail = document.createElement('div');
    blogDetail.classList.add('blog-details');

    const h4 = document.createElement('h4');
    h4.textContent = post.title;

    const p = document.createElement('p');
    p.textContent = post.description;

    const a = document.createElement('a');
    a.href = post.url;
    a.textContent = 'Continue reading';
    a.target = '_blank'

    const h1 = document.createElement('h1');
    h1.textContent = post.publishedAt.slice(5, 10);

    blogDetail.appendChild(h4);
    blogDetail.appendChild(p);
    blogDetail.appendChild(a);
    blogDetail.appendChild(h1);

    mainBlogBox.appendChild(blogImg);
    mainBlogBox.appendChild(blogDetail);

    return mainBlogBox;
}

function rederPostList(postList) {
    if (!Array.isArray(postList) || postList.length === 0) return;

    const ulElement = document.getElementById('blog');
    if (!ulElement) return;

    ulElement.textContent = '';

    postList.forEach((post, idx) => {
        const postDiv = createPostElement(post);
        ulElement.appendChild(postDiv);
    })
}

function rederPagination(pagination) {
    const divPagination = document.getElementById('pagination');
    const urlParams = new URLSearchParams(window.location.search);

    if (!pagination || !divPagination) return;

    const totalPages = Math.ceil(pagination / 5);
    const getPage = urlParams.get('page');

    divPagination.dataset.totalPages = totalPages;
    divPagination.dataset.page = getPage;

    if (getPage <= 1) divPagination.firstElementChild?.classList.add('disabled');
    else divPagination.firstElementChild?.classList.remove('disabled');

    if (getPage >= totalPages) divPagination.lastElementChild?.classList.add('disabled');
    else divPagination.lastElementChild?.classList.remove('disabled');
}

async function handleFilterChange(filterName, filterValue) {
    const url = new URL(window.location);
    url.searchParams.set(filterName, filterValue);
    history.pushState({}, '', url);

    const data = await postApi.getAll(url.searchParams);
    rederPagination(data.totalResults);
    rederPostList(data.articles);
}

function handlePrevClick(e) {
    e.preventDefault();
    const divPagination = document.getElementById('pagination');
    if (!divPagination) return;

    const page = divPagination.dataset.page;
    if (page <= 1) return;

    handleFilterChange('page', Number.parseInt(page) - 1);
}

function handleNextClick(e) {
    e.preventDefault();
    const divPagination = document.getElementById('pagination');
    if (!divPagination) return;

    const page = divPagination.dataset.page;
    const totalPages = divPagination.dataset.totalPages
    if (page >= totalPages) return;

    handleFilterChange('page', Number.parseInt(page) + 1);
}

function init() {
    const divPagination = document.getElementById('pagination');
    if (!divPagination) return;

    const prevLink = divPagination.firstElementChild;
    if (prevLink) {
        prevLink.addEventListener('click', handlePrevClick);
    }

    const nextLink = divPagination.lastElementChild;
    if (nextLink) {
        nextLink.addEventListener('click', handleNextClick);
    }
}

function initURL() {
    const url = new URL(window.location);

    if (!url.searchParams.get('q')) url.searchParams.set('q', 'keyword');
    if (!url.searchParams.get('pageSize')) url.searchParams.set('pageSize', 5);
    if (!url.searchParams.get('page')) url.searchParams.set('page', 1);
    if (!url.searchParams.get('apiKey')) url.searchParams.set('apiKey', '779bf1a2f20e44d5910ca012800910b2');

    history.pushState({}, '', url);
}

(async () => {
    try {
        init();
        initURL();

        // const queryParams = {
        //     q: 'keyword',
        //     pageSize: 5,
        //     page: 1,
        // }

        const queryParams = new URLSearchParams(window.location.search);

        const data = await postApi.getAll(queryParams);

        rederPostList(data.articles);
        rederPagination(data.totalResults);

    } catch (error) {
        console.log(error);
    }
})();