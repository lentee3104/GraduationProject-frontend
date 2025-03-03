<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import router from "@/router";
import LoginPage from "@/Components_page/LoginPage.vue";

const token = ref('')
const isVisible = ref(true);
const scrollThreshold = 50; // 滚动阈值

const updateVisibility = () => {
  const currentScroll = window.scrollY;
  isVisible.value = currentScroll < scrollThreshold;
};

onMounted(() => {
  window.addEventListener('scroll', updateVisibility);
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateVisibility);
});

const navigateTo = (page: string) => {
  console.log(`Navigating to ${page}`);
  router.push(`/${page}`);
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
<!--        <span class="text-gray-700 cursor-pointer hover:underline">继续</span>-->
<!--        <span class="text-gray-600">本时段用量 3/30</span>-->
        <button href="#" class="text-blue-600 hover:underline" @click="navigateTo('Login')">点此登录</button>
      </div>
    </div>

  </header>
</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>