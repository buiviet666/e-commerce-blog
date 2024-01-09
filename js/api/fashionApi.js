import axiosClientFashion from "./axiosClientFashion";

const fashionApi = {

    getAll(params) {
        const url = '/products/list';
        return axiosClientFashion.get(url, {
            params
        })
    },

    getDetail(id) {
        const url = `/products/detail?${id}`;
        return axiosClientFashion.get(url);
    }
}

export default fashionApi;