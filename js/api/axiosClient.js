import axios from "axios"

const API_KEY = "779bf1a2f20e44d5910ca012800910b2";

const axiosClient = axios.create({
    baseURL: "https://newsapi.org/v2/",
    timeout: 6000,
    headers: {
        "Content-Type": 'application/json',
        "Access-Control-Allow-Origin": "*",
    },
    params: {
        apiKey: API_KEY,
    }
})


// Add a request interceptor
axiosClient.interceptors.request.use(function (config) {
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
axiosClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});

export default axiosClient;