import { defineStore } from 'pinia';
import type { IAddressItem } from "@/types/IAddressItem"; // 确保类型导入路径正确

// 使用业务商店
export const useAddressStore = defineStore('addressList', () => {
    // 1. 定义描述 businessList 的响应式数组
    const addressList: Ref<IAddressItem[]> = ref([]);

    // 2. 定义修改 businessList 的方法
    const setAddressList = (businessData: IAddressItem[]) =>{
        addressList.value = businessData;
    };

    return {
        addressList,
        setAddressList
    };
})