// token.ts
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('token', () => {
    // 1. 定义描述 token 的响应式变量
    const token = ref('');

    // 2. 定义修改 token 的方法
    const setToken = (newToken: string) => {
        token.value = newToken;
    };

    // 3. 定义移除 token 的方法
    const removeToken = () => {
        token.value = '';
    };

    return {
        token,
        setToken,
        removeToken
    };
});