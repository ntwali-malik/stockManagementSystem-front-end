import axios from 'axios';

class SalesService {
    static BASE_URL = 'http://localhost:8080/sales';

    // Get all sales
    static async getAllSales(token) {
        try {
            const response = await axios.get(`${SalesService.BASE_URL}/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get sale by ID
    static async getSaleById(saleId, token) {
        try {
            const response = await axios.get(`${SalesService.BASE_URL}/${saleId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Create a new sale
    static async createSale(saleData, token) {
        try {
            const response = await axios.post(`${SalesService.BASE_URL}/add`, saleData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Update sale by ID
    static async updateSale(saleId, saleData, token) {
        try {
            const response = await axios.put(`${SalesService.BASE_URL}/${saleId}`, saleData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Delete sale by ID
    static async deleteSale(saleId, token) {
        try {
            const response = await axios.delete(`${SalesService.BASE_URL}/${saleId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get total number of sales
    static async getTotalSales(token) {
        try {
            const response = await axios.get(`${SalesService.BASE_URL}/totalSales`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }

    // Filter sales by customer name and date
    static async filterSales(customerName, salesDate, token) {
        try {
            const response = await axios.get(`${SalesService.BASE_URL}/filter`, {
                headers: { Authorization: `Bearer ${token}` },
                params: {
                    customerName,
                    salesDate
                }
            });
            return response.data;
        } catch (error) {
            throw error.response ? error.response.data : error.message;
        }
    }
}

export default SalesService;
