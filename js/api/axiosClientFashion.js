import axios from "axios";

const rapidAPI_KEY = "7e326de06fmsh2e148619e500f91p1104b7jsn5ac2bf1b0413";

const axiosClientFashion = axios.create({
    baseURL: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products",
    timeout: 6000,
    headers: {
        "Content-Type": 'application/json',
    },
    params: {
        rapidapiKey: rapidAPI_KEY,
    }
})

// Add a request interceptor
axiosClientFashion.interceptors.request.use(function (config) {
    // Do something before request is sent

    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClientFashion.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClientFashion;