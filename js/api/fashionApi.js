import axiosClientFashion from "./axiosClientFashion";

const fashionApi = {
    getAll(params) {
        const url = '/list';
        return axiosClientFashion.get(url, {
            params
        })
    }
}

export default fashionApi;