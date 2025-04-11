<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import router from "@/router";
import LoginPage from "@/Components_page/LoginPage.vue";

const token = ref('');
const username = ref('');
const isLoggedIn = ref(false);
const isVisible = ref(true);
const scrollThreshold = 50; // 滚动阈值

const updateVisibility = () => {
  const currentScroll = window.scrollY;
  isVisible.value = currentScroll < scrollThreshold;
};

onMounted(() => {
  window.addEventListener('scroll', updateVisibility);

  // 在组件挂载时检查localStorage中是否有username
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    username.value = storedUsername;
    isLoggedIn.value = true;
  }
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility);
});

const navigateTo = (page: string) => {
  console.log(`Navigating to ${page}`);
  router.push(`/${page}`);
};

const logout = () => {
  // 清除localStorage中的用户信息
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  username.value = '';
  // 可选：跳转到首页或其他页面
  router.push('/');
};

const headerClasses = computed(() => {
  return isVisible.value ? 'opacity-100' : 'opacity-0';
});

const headerStyle = {
  background: 'linear-gradient(to bottom, white, transparent)',
};
</script>

<template>
  <header
      :class="headerClasses"
      class="flex items-center w-full h-20 transition-opacity duration-300 border-1 py-4 px-8"
      :style="headerStyle"
  >
    <div class="flex w-full h-full items-center justify-between ml-[150px] ">
      <div class="flex items-center">
        <h1 class="text-xl font-bold">My Header</h1>
      </div>
      <div class="flex items-center justify-between bg-white border-1 rounded-36 py-2 px-4 text-sm">
        <template v-if="isLoggedIn">
          <span class="text-gray-700 mr-2">你好，{{ username }}</span>
          <button class="text-red-500 hover:underline ml-2" @click="logout">退出</button>
        </template>
        <template v-else>
          <button href="#" class="text-blue-600 hover:underline" @click="navigateTo('Login')">点此登录</button>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>