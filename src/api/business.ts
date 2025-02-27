import axios from "axios";

// 创建一个axios实例，并配置基础URL和可能的全局headers
const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/api/business',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const businessService = async (token) => {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return apiInstance.post('ListAllBusiness');
};

// export const businessTypeService = async (orderTypeId) => {
//     return apiInstance.get(`/findByOrderTypeId/${orderTypeId}`);
// };