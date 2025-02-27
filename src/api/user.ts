import axios from "axios";

// 创建一个axios实例，并配置基础URL和可能的全局headers
const apiInstance = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const registerService = async (data: any) => {
    return apiInstance.post('/public/register/newUser',data);
};

export const loginService = async (data:any) =>{
    return apiInstance.post('/auth/login',data)
}