import axiosClient from "./api/axiosClient";
import postApi from "./api/postApi";

async function main() {
    const queryParams = {
        q: 'keyword',
        pageSize: 8,
        page: 1,
    }

    try {
        const data = await postApi.getAll(queryParams);
        if (data) {
            console.log(data);
        } else {
            console.log("Không có dữ liệu được trả về từ API.");
        }
    } catch (error) {
        console.log(error);
    }
}

main();