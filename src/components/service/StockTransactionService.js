import axios from 'axios';

class StockTransactionService {
    static BASE_URL = 'http://localhost:8080/transaction'; // Update with your actual API URL if needed

    // Get all transactions
    static async getAllTransactions(token) {
        try {
            const response = await axios.get(`${StockTransactionService.BASE_URL}/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get transaction by ID
    static async getTransactionById(transactionId, token) {
        try {
            const response = await axios.get(`${StockTransactionService.BASE_URL}/${transactionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Create a new transaction
    static async createTransaction(transactionData, token) {
        try {
            const response = await axios.post(`${StockTransactionService.BASE_URL}/addTransaction`, transactionData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Update an existing transaction by ID
    static async updateTransaction(transactionId, transactionData, token) {
        try {
            const response = await axios.put(`${StockTransactionService.BASE_URL}/${transactionId}`, transactionData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Delete transaction by ID
    static async deleteTransaction(transactionId, token) {
        try {
            const response = await axios.delete(`${StockTransactionService.BASE_URL}/${transactionId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Get stock levels over time
    static async getStockLevelsOverTime(token) {
        try {
            const response = await axios.get(`${StockTransactionService.BASE_URL}/stockLevelsOverTime`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export default StockTransactionService;
