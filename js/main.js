
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
    console.log({ postList });
    if (!Array.isArray(postList) || postList.length === 0) return;

    const ulElement = document.getElementById('blog');
    if (!ulElement) return;

    postList.forEach((post, idx) => {
        const postDiv = createPostElement(post);
        ulElement.appendChild(postDiv);
    })
}

(async () => {
    try {
        const queryParams = {
            q: 'keyword',
            pageSize: 5,
            page: 1,
        }

        const data = await postApi.getAll(queryParams);

        rederPostList(data.articles);

    } catch (error) {
        console.log(error);
    }
})();