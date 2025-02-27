import axios from "axios";
import type { ICartItem } from "@/Types/ICartItem";
import {useAuthStore} from "@/store/token";

// 创建一个axios实例，并配置基础URL和可能的全局headers
const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/api/orderDetail',
    headers: {
        'Content-Type': 'application/json',
    }
});
const useAuth = useAuthStore();
apiInstance.defaults.headers.common['Authorization'] =  useAuth.token ? `Bearer ${useAuth.token}` : `Bearer ${sessionStorage.getItem('token')}` ;

export const orderDetail = async (orderId: number) => {
    return apiInstance.post(`/FindOrderDetailByOrderTableEntityOrderId?order_id=${orderId}`);
};

export const submitOrder = async (params: ICartItem[]) => {
    return apiInstance.post(`/SaveOrderDetailEntity`, { params });
};