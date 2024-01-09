import fashionApi from "./api/fashionApi";

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

        console.log(data.product);
    } catch (error) {
        console.log(error);
    }
})();