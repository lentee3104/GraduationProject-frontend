import axios from "axios";
import { useAuthStore } from "@/store/token";

// 创建一个axios实例，并配置基础URL和可能的全局headers
const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/api/orderTable',
});
const useAuth = useAuthStore();
apiInstance.defaults.headers.common['Authorization'] =  useAuth.token ? `Bearer ${useAuth.token}` : `Bearer ${sessionStorage.getItem('token')}` ;

export const orderList = async () => {
    return apiInstance.post(`/FindByUserEntityCodeAndBusinessEntity_BusinessIdAndOrderState`);
};

export const saveOrder =  async (params: any) => {
    return apiInstance.post(`/SaveOrderTableEntity`, params);
};
