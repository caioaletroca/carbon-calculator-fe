import axios from "./axios"

const CategoryService = {
    async get() {
        return (await axios.get(`/v1/api/categories`))?.data;
    },

    async getUsages(category_id: number) {
        return (await axios.get(`/v1/api/categories/${category_id}/usages`))?.data;
    }
}

export { CategoryService }