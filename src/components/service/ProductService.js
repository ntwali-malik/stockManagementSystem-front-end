import axios from 'axios';

class ProductService {
    static BASE_URL = 'http://localhost:8080/Product';

    // Get all products
    static async getAllProducts(token) {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get product by ID
    static async getProductById(productId, token) {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Create a new product
    static async createProduct(productData, token) {
        try {
            const response = await axios.post(`${ProductService.BASE_URL}/addProduct`, productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Update product by ID
    static async updateProduct(productId, productData, token) {
        try {
            const response = await axios.put(`${ProductService.BASE_URL}/${productId}`, productData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Delete product by ID
    static async deleteProduct(productId, token) {
        try {
            const response = await axios.delete(`${ProductService.BASE_URL}/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get total number of products
    static async getTotalProducts(token) {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/totalProducts`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }

    // Calculate total selling price including tax
    static async calculateTotalSellingPrice(productId, token) {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/calculateSellingPrice/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Calculate profit or loss for a product
    static async calculateProfitOrLoss(productId, token) {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/calculateProfitOrLoss/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get profit or loss status for a product
    static async getProfitOrLossStatus(productId, token) {
        try {
            const response = await axios.get(`${ProductService.BASE_URL}/getProfitOrLossStatus/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default ProductService;
