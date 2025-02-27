import {defineStore} from "pinia";
import {ref} from "vue";

export const usercodeStore = defineStore('usercode', () => {
    // 1. 定义描述 token 的响应式变量
    const usercode = ref('');

    // 2. 定义修改 Usercode 的方法
    const setUsercode = (newUsercode: string) => {
        usercode.value = newUsercode;
    };

    // 3. 定义移除 Usercode 的方法
    const removeUsercode = () => {
        usercode.value = '';
    };

    return {
        usercode,
        setUsercode,
        removeUsercode
    };
});