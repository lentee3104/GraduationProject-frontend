import axios from "axios";

// 创建一个axios实例，并配置基础URL和可能的全局headers
const apiInstance = axios.create({
    baseURL: 'http://localhost:8080/api/address',
    headers: {
        'Content-Type': 'application/json',
    }
});

export const getAddressService = async (token,code) => {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return apiInstance.post(`FindByUserEntityCode?user_code=${code}`);
};

export const deleteAddress = async (token,daId) => {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return apiInstance.delete(`deliveryAddress/deleteByDaId/${daId}`);
};

export const saveAddress = async (token,address) => {
    apiInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return apiInstance.post(`SaveAddress?da_id=${address.da_id}&contact_name=${address.contact_name}&contact_sex=${address.contact_sex}&contact_tel=${address.contact_tel}&address=${address.address}&user_code=${address.user_code}`);
};
