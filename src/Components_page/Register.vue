<script setup lang="ts">
import Sidebar from '@/Components_single/Sidebar.vue';
import Header from "@/Components_single/Header.vue";
import router from "@/router";
import axios from "axios";

const username = ref('');
const password = ref('');
const email = ref('');
const verificationCode = ref('');
const role = ref(3); /* 3是ROLE_USER; 4是ROLE_ADMIN */
const isLoading = ref(false);
const isSendingCode = ref(false);
const countdown = ref(0);
const countdownTimer = ref(null);

// 设置消息提示
const showMessage = (message:any
    , type = 'error') => {
  // 这里可以使用你的消息提示组件，比如Element UI的Message
  // 如果没有引入UI组件库，可以使用alert作为临时方案
  alert(message);
};

// 获取验证码
const getVerificationCode = async () => {
  // 邮箱格式验证
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.value || !emailRegex.test(email.value)) {
    showMessage('请输入有效的邮箱地址');
    return;
  }

  try {
    isSendingCode.value = true;
    // 使用URL参数而不是请求体发送email
    const response = await fetch(`http://localhost:8080/api/auth/send-verification-code?email=${encodeURIComponent(email.value)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const data = await response;

    if (response.status === 200) {
      showMessage('验证码已发送，请查收邮箱', 'success');
      // 开始倒计时
      startCountdown();
    } else {
      showMessage(data.data || '验证码发送失败，请稍后再试');
    }
  } catch (error) {
    console.error('获取验证码出错:', error);
    showMessage('网络错误，请检查网络连接后重试');
  } finally {
    isSendingCode.value = false;
  }
};

// 倒计时功能
const startCountdown = () => {
  countdown.value = 60;

  if (countdownTimer.value) {
    clearInterval(countdownTimer.value);
  }

  countdownTimer.value = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value--;
    } else {
      clearInterval(countdownTimer.value);
    }
  }, 1000);
};

// 注册
const register = async () => {
  // 验证所有必填字段
  if (!username.value) {
    showMessage('请输入用户名');
    return;
  }
  if (!password.value) {
    showMessage('请输入密码');
    return;
  }
  if (!email.value) {
    showMessage('请输入邮箱');
    return;
  }
  if (!verificationCode.value) {
    showMessage('请输入验证码');
    return;
  }

  try {
    isLoading.value = true;

    const response = await fetch('http://localhost:8080/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
        verificationCode: verificationCode.value,
        roles: ["admin"] // 默认为普通用户
      }),
    });


    if (response.status === 200) {
      showMessage('注册成功，即将跳转到登录页', 'success');
      // 注册成功后延迟跳转到登录页
      setTimeout(() => {
        router.push('/Login');
      }, 1500);
    } else {
      showMessage(response.body || '注册失败，请检查填写的信息是否正确');
    }
  } catch (error) {
    console.error('注册出错:', error);
    showMessage('网络错误，请检查网络连接后重试');
  } finally {
    isLoading.value = false;
  }
};

const navigateTo = (page: string) => {
  console.log(`Navigating to ${page}`);
  router.push(`/${page}`);
};

</script>

<template>
  <main class="flex w-screen h-screen bg-[#f7f9ff] justify-center items-center">
    <div class="flex-col w-[450px] h-[550px] bg-white rounded-md shadow-gray shadow-sm">
      <div class="flex border-b-1 w-full h-[100px] items-center justify-center">
        这里是logo
      </div>
      <div class="flex-col px-14 py-2 space-y-3 text-xs">
        <div class="flex w-full h-[40px] items-center border-b-1 border-[#F5F6F7FF]">
          <button class="flex items-center w-auto h-[40px] border-b-2 border-[#235BE5FF] text-[#235BE5FF] text-sm hover:font-bold">邮箱注册</button>
        </div>
        <div class="flex w-full h-[45px] items-center bg-[#f4f5f6] rounded-md px-3 ">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-[#235BE5FF] "  width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0-2q.65 0 1.075-.425T13.5 9.5t-.425-1.075T12 8t-1.075.425T10.5 9.5t.425 1.075T12 11m0-6.875l-6 2.25V11.1q0 1.35.375 2.625t1.025 2.4q1.05-.525 2.2-.825T12 15t2.4.3t2.2.825q.65-1.125 1.025-2.4T18 11.1V6.375zM12 17q-.9 0-1.75.2t-1.625.55q.725.75 1.575 1.3t1.8.85q.95-.3 1.8-.85t1.575-1.3q-.775-.35-1.625-.55T12 17m0 4.9q-.175 0-.325-.025t-.3-.075Q8 20.675 6 17.637T4 11.1V6.375q0-.625.363-1.125t.937-.725l6-2.25q.35-.125.7-.125t.7.125l6 2.25q.575.225.938.725T20 6.375V11.1q0 3.5-2 6.538T12.625 21.8q-.15.05-.3.075T12 21.9"/></svg>
          <input class="w-full px-2 bg-[#f4f5f6]  "
                 placeholder="请输入用户名"
                 id="username"
                 v-model="username"
                 aria-required="true"
                 type="text"
                 aria-invalid="true"
          >
        </div>
        <div class="flex w-full h-[45px] items-center bg-[#f4f5f6] rounded-md px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-[#235BE5FF] "  width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm0-2h12V10H6zm6-3q.825 0 1.413-.587T14 15t-.587-1.412T12 13t-1.412.588T10 15t.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3t-2.125.875T9 6zM6 20V10z"/></svg>
          <input class="w-full px-2 bg-[#f4f5f6]  "
                 placeholder="请输入密码"
                 id="password"
                 v-model="password"
                 aria-required="true"
                 type="password"
                 aria-invalid="true"
          >
        </div>
        <div class="flex w-full h-[45px] items-center">
          <div class="flex w-full h-[45px] items-center bg-[#f4f5f6] rounded-md px-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="text-[#235BE5FF] " width="22" height="22" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zM20 8l-7.475 4.675q-.125.075-.262.113t-.263.037t-.262-.037t-.263-.113L4 8v10h16zm-8 3l8-5H4zM4 8v.25v-1.475v.025V6v.8v-.012V8.25z"/></svg>
            <input class="w-full px-2 bg-[#f4f5f6]  "
                   placeholder="请输入邮箱"
                   id="email"
                   v-model="email"
                   aria-required="true"
                   type="email"
                   aria-invalid="true"
            >
          </div>
          <button
              class="ml-4 flex w-[120px] h-[40px] items-center justify-center bg-white rounded-md px-1 text-xs border-1 border-gray hover:text-[#235BE5FF] hover:border-[#235BE5FF]"
              :disabled="countdown > 0 || isSendingCode"
              @click="getVerificationCode"
          >
            {{ countdown > 0 ? `${countdown}秒后重试` : '获取验证码' }}
          </button>
        </div>

        <div class="flex w-full h-[45px] items-center bg-[#f4f5f6] rounded-md px-3">
          <svg xmlns="http://www.w3.org/2000/svg" class="text-[#235BE5FF] "  width="22" height="32" viewBox="0 0 24 24"><g fill="none"><path d="M0 0h24v24H0z"/><path fill="currentColor" d="M14.486 3.143a1 1 0 0 1 .692 1.233l-4.43 15.788a1 1 0 0 1-1.926-.54l4.43-15.788a1 1 0 0 1 1.234-.693M7.207 7.05a1 1 0 0 1 0 1.414L3.672 12l3.535 3.535a1 1 0 1 1-1.414 1.415L1.55 12.707a1 1 0 0 1 0-1.414L5.793 7.05a1 1 0 0 1 1.414 0m9.586 1.414a1 1 0 1 1 1.414-1.414l4.243 4.243a1 1 0 0 1 0 1.414l-4.243 4.243a1 1 0 0 1-1.414-1.415L20.328 12z"/></g></svg>
          <input class="w-full px-2 bg-[#f4f5f6]  "
                 placeholder="请输入验证码"
                 id="verificationCode"
                 v-model="verificationCode"
                 aria-required="true"
                 type="text"
                 aria-invalid="true"
          >
        </div>
        <button
            class="flex items-center justify-center w-full h-[45px] items-center bg-[#9d29b1ff] text-sm rounded-md text-white hover:font-bold"
            :disabled="isLoading"
            @click="register"
        >
          {{ isLoading ? '注册中...' : '注 册' }}
        </button>
        <div class="flex w-full h-[20px] items-center bg-white justify-between text-light text-sm">
          <button class="text-[#235BE5FF] items-center hover:font-bold">
            忘记密码
          </button>
          <button class="text-[#235BE5FF] items-center hover:font-bold"
                  @click="navigateTo('Login')">
            已有账号？继续登录
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>