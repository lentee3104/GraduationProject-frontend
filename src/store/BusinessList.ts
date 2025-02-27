import { defineStore } from 'pinia';
import type { IBusiness } from "@/types/IBusiness"; // 确保类型导入路径正确

// 使用业务商店
export const useBusinessStore = defineStore('businessList', () => {
    // 1. 定义描述 businessList 的响应式数组
    const businessList: Ref<IBusiness[]> = ref([]);

    // 2. 定义修改 businessList 的方法
    const setBusinessList = (businessData: IBusiness[]) =>{
        businessList.value = businessData;
    };

    return {
        businessList,
        setBusinessList
    };
})