<script setup lang="ts">
import { ref, computed } from 'vue';
import Sidebar from '@/Components_single/Sidebar.vue';
import Header from "@/Components_single/Header.vue";
import axios from "axios";

// 用于存储返回的列表数据
let usageData = ref([])


onMounted(async () => {
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  console.log('userId'+userId);
  console.log('userName'+userName);
  try {
    const response = await axios.post('http://localhost:8080/api/getStatisticsByUserId', null,{
      params: { userId: String(userId) },
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    usageData.value = response.data
    console.log(usageData);
  } catch (error) {
    console.error('get list failed:', error);
    // 这里可以显示登录失败的提示信息
  }
})

// // 假设你的数据如下，展示一些有用的统计数据
// const usageData = ref([
//   { id: 1, daily_count: 5, usage_data: '2025-04-01', user_id: 101 },
//   { id: 2, daily_count: 10, usage_data: '2025-04-02', user_id: 102 },
//   { id: 3, daily_count: 15, usage_data: '2025-04-05', user_id: 103 },
//   { id: 4, daily_count: 8, usage_data: '2025-04-10', user_id: 104 },
//   { id: 5, daily_count: 20, usage_data: '2025-04-12', user_id: 105 },
// ]);

// 获取当前日期并设置为选中的日期
const currentDate = new Date();
const selectedDate = ref(currentDate);

// 获取当前月份的日期
const generateDaysOfMonth = (date: Date) => {
  const days = [];
  const month = date.getMonth();
  const year = date.getFullYear();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // 生成当前月份的所有日期
  for (let day = 1; day <= lastDay.getDate(); day++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    days.push({ day, fullDate });
  }
  return days;
};

// 根据 daily_count 设定颜色
const getColor = (count: number) => {
  if (count > 10) return '#FF6347';  // 红色
  if (count > 5) return '#FFD700';  // 黄色
  return '#32CD32';  // 绿色
};

// 获取某一天是否有使用数据
const hasUsageData = (date: string) => {
  return usageData.value.some(item => item.usageDate === date);
};

// 获取该日期的使用次数
const getUsageCount = (date: string) => {
  const usageItem = usageData.value.find(item => item.usageDate === date);
  return usageItem ? usageItem.dailyCount : 0;
};
</script>

<template>
  <div class="top-0 w-full h-full bg-gradient-to-t from-[#9c98c5] to-transparent overflow-x-hidden pb-10">
    <Sidebar class="absolute top-0 left-0"></Sidebar>
    <Header class="absolute top-0"></Header>
    <main class="w-full h-auto px-4">
      <div class=" mt-20 ml-[150px]">
<!--        <div class="justify-center items-center text-2xl">InstrumentPanel</div>-->
        <div class="flex px-16 py-5">
          <div class="flex-1 px-4 py-4 space-y-8">
            <div class="bg-white p-4 rounded-md border-1">
              <!-- 星期行 -->
              <div class="grid grid-cols-7 gap-2 text-center mb-2">
                <div>周一</div>
                <div>周二</div>
                <div>周三</div>
                <div>周四</div>
                <div>周五</div>
                <div>周六</div>
                <div>周日</div>
              </div>
              <!-- 日历展示 -->
              <div class="mt-4 grid grid-cols-7 gap-2">
                <!-- 用当前日期的月份和 usageData 来动态渲染日历 -->
                <div v-for="date in generateDaysOfMonth(selectedDate)" :key="date.fullDate" class="flex flex-col items-center">
                  <div class="text-sm">{{ date.day }}</div>
                  <!-- 如果该日期有使用数据，则渲染使用次数并设定颜色 -->
                  <div v-if="hasUsageData(date.fullDate)"
                       :style="{ backgroundColor: getColor(getUsageCount(date.fullDate)) }"
                       class="w-8 h-8 rounded-full flex items-center justify-center text-white group relative">
                    <!-- 鼠标悬停时显示使用次数 -->
                    {{ getUsageCount(date.fullDate) }}
                  </div>
                  <!-- 如果没有使用数据，则显示为空的日期 -->
                  <div v-else class="w-8 h-8 rounded-full bg-gray-300"></div>
                </div>
              </div>
              </div>
            <div class="h-70 bg-white p-4  rounded-md border-1">站内公告</div>
            <div class="h-50 bg-white p-4  rounded-md border-1">网站介绍</div>
          </div>
          <div class="flex-1 px-4 py-4 space-y-8">
            <div class="h-100 bg-white p-4  rounded-md border-1">使用指南</div>
            <div class="h-40 bg-white p-4  rounded-md border-1">交流社群</div>
          </div>
        </div>
      </div>
    </main>
  </div>

</template>

<style scoped>
.container {
  max-width: 1200px;
}
</style>