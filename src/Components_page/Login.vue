<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import router from "@/router";

// 用户名和密码的响应式引用
const username = ref('');
const password = ref('');

// 路由跳转
const navigateTo = (page: string) => {
  console.log(`Navigating to ${page}`);
  router.push(`/${page}`);
};

// 登录函数
const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8080/api/auth/signin', {
      username: username.value,
      password: password.value
    });

    // 假设返回的响应中有 token 或其他用户信息，可以在这里处理
    console.log('Login successful:', response.data);

    // 在成功登录后可以跳转到主页或其他页面
    router.push('/home');  // 修改为你希望跳转的页面

  } catch (error) {
    console.error('Login failed:', error);
    // 这里可以显示登录失败的提示信息
  }
};
</script>

<template>
  <main class="flex w-screen h-screen bg-[#f7f9ff] justify-center items-center">
    <div class="flex-col w-[450px] h-[500px] bg-white rounded-md shadow-gray shadow-sm">
      <div class="flex border-b-1 w-full h-[140px] items-center justify-center">
        这里是logo
      </div>
      <div class="flex-col px-14 py-2 space-y-5">
        <div class="flex w-full h-[40px] items-center border-b-1 border-[#F5F6F7FF]">
          <button class="flex items-center w-auto h-[40px] border-b-2 border-[#235BE5FF] text-[#235BE5FF] text-sm hover:font-bold">密码登录</button>
        </div>
        <div class="flex w-full h-[45px] items-center bg-[#f4f5f6] rounded-md px-3 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-[#235BE5FF] text-sm text-black"  width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0-2q.65 0 1.075-.425T13.5 9.5t-.425-1.075T12 8t-1.075.425T10.5 9.5t.425 1.075T12 11m0-6.875l-6 2.25V11.1q0 1.35.375 2.625t1.025 2.4q1.05-.525 2.2-.825T12 15t2.4.3t2.2.825q.65-1.125 1.025-2.4T18 11.1V6.375zM12 17q-.9 0-1.75.2t-1.625.55q.725.75 1.575 1.3t1.8.85q.95-.3 1.8-.85t1.575-1.3q-.775-.35-1.625-.55T12 17m0 4.9q-.175 0-.325-.025t-.3-.075Q8 20.675 6 17.637T4 11.1V6.375q0-.625.363-1.125t.937-.725l6-2.25q.35-.125.7-.125t.7.125l6 2.25q.575.225.938.725T20 6.375V11.1q0 3.5-2 6.538T12.625 21.8q-.15.05-.3.075T12 21.9"/></svg>
          <input v-model="username" class="w-full px-2 bg-[#f4f5f6] text-sm text-black"
                 placeholder="请输入用户名"
                 id="username"
                 aria-required="true"
                 type="text"
                 aria-invalid="true"
          >
        </div>
        <div class="flex w-full h-[45px] items-center bg-[#f4f5f6] rounded-md px-3 text-black">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-[#235BE5FF] text-sm text-black"  width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"/></svg>
          <input v-model="password" class="w-full px-2 bg-[#f4f5f6] text-sm text-black"
                 placeholder="请输入密码"
                 id="password"
                 aria-required="true"
                 type="password"
                 aria-invalid="true"
          >
        </div>
        <button @click="handleLogin" class="flex items-center justify-center w-full h-[45px] items-center bg-[#9d29b1ff] rounded-md text-white hover:font-bold">
          登 录
        </button>
        <div class="flex w-full h-[20px] items-center bg-white justify-between text-light text-sm">
          <button class="text-[#235BE5FF] items-center hover:font-bold">
            忘记密码
          </button>
          <button class="text-[#235BE5FF] items-center hover:font-bold" @click="navigateTo('Register')">
            注册用户
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* 你可以根据需要在这里添加样式 */
</style>
