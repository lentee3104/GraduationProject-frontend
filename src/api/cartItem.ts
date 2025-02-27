import axios from "axios";
import {useAuthStore} from "@/store/token";

// 创建一个axios实例，并配置基础URL和可能的全局headers
const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/api/food',
    headers: {
        'Content-Type': 'application/json',
    }
});
const useAuth = useAuthStore();
apiInstance.defaults.headers.common['Authorization'] =  useAuth.token ? `Bearer ${useAuth.token}` : `Bearer ${sessionStorage.getItem('token')}` ;

export const foodList = async (businessId: number) => {
    return apiInstance.post(`/FindFoodListByBusinessId?business_id=${businessId}`);
};
