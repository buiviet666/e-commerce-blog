// click navbar while small device
const bar = document.getElementById("bar");
const nav = document.getElementById("navbar");
const closebtn = document.getElementById("close");

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (closebtn) {
    closebtn.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// ==========================================================
// click small img to main img ("single product")
// let main_img = document.getElementById("main-img");
// let small_img = document.getElementsByClassName("small-img");

// small_img[0].onclick = function () {
//     main_img.src = small_img[0].src;
// }

// small_img[1].onclick = function () {
//     main_img.src = small_img[1].src;
// }

// small_img[2].onclick = function () {
//     main_img.src = small_img[2].src;
// }

// small_img[3].onclick = function () {
//     main_img.src = small_img[3].src;
// }