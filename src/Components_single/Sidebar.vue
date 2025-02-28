<script setup lang="ts">
import { ref } from 'vue';
import router from "@/router";

const navigateTo = (page: string) => {
  console.log(`Navigating to ${page}`);
  router.push(`/${page}`);
  // 这里可以添加路由跳转逻辑，例如: router.push(`/${page}`);
};

// 定义选项
const options = ref([
  { id: 1, label: '首页介绍', page: ''},
  { id: 2, label: '仪表盘', page: 'InstrumentPanel'},
  { id: 3, label: '开始使用预测模型', page: 'PredictionPage'},
  { id: 4, label: '用户指南', page: 'GuidePage'},
  { id: 5, label: 'API 调用', page: 'ChatPage'},
]);

// 设置初始选中的选项为第一个
const selectedOption = ref(1);

// 选择按钮时更新选中状态
const selectOption = (id: any, page: string) => {
  selectedOption.value = id;
  navigateTo(page);
};

// 根据选中状态返回按钮的类名
const buttonClass = (id: any) => {
  return selectedOption.value === id ? 'shadow-inner' : 'shadow-md';
};
</script>

<template>
  <aside class="fixed w-[150px] h-screen bg-white shadow-lg px-4 py-6 items-center z-50">
    <div class="text-xl font-bold  text-center ">🐟的预测系统</div>
    <div class=" w-full mt-4 items-center space-y-4 border-t-1 py-2">
      <div class="w-full h-26 p-2 " v-for="option in options" :key="option.id">
        <button
            :class="buttonClass(option.id)"
            @click="selectOption(option.id, option.page)"
            class="w-full h-full p-4 bg-white rounded-md transition-all duration-300 hover:bg-gray-200 text-sm"
        >
          {{ option.label }}
        </button>
      </div>
    </div>
    <div class="absolute bottom-6 text-center text-sm">
      🐟的2025毕业设计
    </div>
  </aside>
</template>

<style scoped>
.shadow-inner {
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.1); /* 调整内阴影 */
}
.container {
  max-width: 1200px;
}
</style>