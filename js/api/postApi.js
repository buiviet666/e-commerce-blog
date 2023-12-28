import axiosClient from "./axiosClient";

const postApi = {
    getAll(params) {
        const url = '/everything';
        return axiosClient.get(url, {
            params
        })
    }
}

export default postApi;