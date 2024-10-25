import axios from 'axios';

class CategoryService {
    static BASE_URL = 'http://localhost:8080/category';

    // Get all categories
    static async getAllCategories(token) {
        try {
            const response = await axios.get(`${CategoryService.BASE_URL}/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get category by ID
    static async getCategoryById(categoryId, token) {
        try {
            const response = await axios.get(`${CategoryService.BASE_URL}/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Create a new category
    static async createCategory(categoryData, token) {
        try {
            const response = await axios.post(`${CategoryService.BASE_URL}/addCategory`, categoryData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Update category by ID
    static async updateCategory(categoryId, categoryData, token) {
        try {
            const response = await axios.put(`${CategoryService.BASE_URL}/${categoryId}`, categoryData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Delete category by ID
    static async deleteCategory(categoryId, token) {
        try {
            const response = await axios.delete(`${CategoryService.BASE_URL}/${categoryId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default CategoryService;
