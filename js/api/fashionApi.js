import axiosClientFashion from "./axiosClientFashion";

const fashionApi = {
    getAll(params) {
        const url = '/products/list';
        return axiosClientFashion.get(url, {
            params
        })
    },

}

export default fashionApi;