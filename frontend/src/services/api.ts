import api from '../lib/axios';

// AUTH SERVICE
export const authService = {
    login: async (email: any, password: any) => {
        const res = await api.post('/auth/login', { email, password });
        if (res.data.token) localStorage.setItem('token', res.data.token);
        return res.data;
    },
    register: async (name: any, email: any, password: any) => {
        const res = await api.post('/auth/register', { name, email, password });
        if (res.data.token) localStorage.setItem('token', res.data.token);
        return res.data;
    },
    logout: () => localStorage.removeItem('token')
};

// PRODUCT SERVICE
export const productService = {
    getAll: async () => {
        const res = await api.get('/products');
        return res.data;
    },
    create: async (data: any) => {
        const res = await api.post('/products', data);
        return res.data;
    }
};

// ORDER SERVICE
export const orderService = {
    create: async (data: any) => {
        const res = await api.post('/orders', data);
        return res.data;
    },
    getMyOrders: async (userId: any) => {
        const res = await api.get(`/orders/${userId}`);
        return res.data;
    },
    track: async (orderCode: any) => {
        const res = await api.get(`/orders/track/${orderCode}`);
        return res.data;
    }
};
