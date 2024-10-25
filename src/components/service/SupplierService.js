// SupplierService.js
import axios from 'axios';

class SupplierService {
    static BASE_URL = 'http://localhost:8080/suppliers';

    // Fetch all suppliers
    static async getAllSuppliers(token) {
        try {
            const response = await axios.get(`${SupplierService.BASE_URL}/all`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // Ensure it returns a list of suppliers
        } catch (error) {
            throw error;
        }
    }

    // Fetch supplier by ID
    static async getSupplierById(supplierId, token) {
        try {
            const response = await axios.get(`${SupplierService.BASE_URL}/${supplierId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // Return supplier details
        } catch (error) {
            throw error;
        }
    }

    // Create a new supplier
    static async createSupplier(supplierData, token) {
        try {
            const response = await axios.post(`${SupplierService.BASE_URL}/add`, supplierData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // Return created supplier
        } catch (error) {
            throw error;
        }
    }

    // Update supplier by ID
    static async updateSupplier(supplierId, supplierData, token) {
        try {
            const response = await axios.put(`${SupplierService.BASE_URL}/${supplierId}`, supplierData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return response.data; // Return updated supplier
        } catch (error) {
            throw error;
        }
    }

    // Delete supplier by ID
    static async deleteSupplier(supplierId, token) {
        try {
            await axios.delete(`${SupplierService.BASE_URL}/${supplierId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            // No need to return anything, just handle success/failure in the calling function
        } catch (error) {
            throw error;
        }
    }
}

export default SupplierService;
