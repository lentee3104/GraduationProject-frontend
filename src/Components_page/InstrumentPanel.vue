<script setup lang="ts">
import {ref, computed} from 'vue';
import Sidebar from '@/Components_single/Sidebar.vue';
import Header from "@/Components_single/Header.vue";
import axios from "axios";

// 用于存储返回的列表数据
let usageData = ref([])


onMounted(async () => {
  const userId = localStorage.getItem("userId")
  const token = localStorage.getItem('token');
  const userName = localStorage.getItem('userName');
  console.log('userId' + userId);
  console.log('userName' + userName);
  try {
    const response = await axios.post('http://localhost:8080/api/getStatisticsByUserId', null, {
      params: {userId: String(userId)},
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
    days.push({day, fullDate});
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

interface Announcement {
  tag: string;
  version: string;
  date: string;
  title: string;
  description: string;
}

const announcements: Announcement[] = [
  {
    tag: 'NEW',
    version: 'V2.1.0',
    date: '2025-4-13',
    title: '多模态分析功能上线',
    description: '新增图像与参数联合预测模式，优化了深度学习模型准确率（提升12.7%）'
  },
  {
    tag: 'UPDATE',
    version: 'V1.2.0',
    date: '2025-3-6',
    title: '参数输入优化',
    description: '重构参数输入界面，增加单位自动换算功能，支持科学计数法输入'
  },
  {
    tag: 'UPDATE',
    version: 'V1.1.1',
    date: '2025-2-20',
    title: '稳定性修复',
    description: '修复了TIFF文件解析的内存泄漏问题，优化了大文件上传的稳定性'
  },
  {
    tag: 'UPDATE',
    version: 'V1.1.0',
    date: '2025-2-8',
    title: '首次功能更新',
    description: '新增用户历史记录功能，支持预测结果导出为CSV格式'
  }
];

const showDetail = ref(false);
const detailContent = ref({
  title: '',
  description: ''
});

const showDetails = (index: number) => {
  detailContent.value = {
    title: `${announcements[index].version} ${announcements[index].title}`,
    description: announcements[index].description
  };
  showDetail.value = true;
};

const closeDetails = () => {
  showDetail.value = false;
};

const parameters = [
  "细胞形状 (0三角；1圆形；2正方形；3矩形)",
  "细胞种类 (0 Hela；1 3T3)",
  "超声参数 (cycle)",
  "超声参数 (pulse)",
  "超声参数 (press)"
];

const copyQQ = () => {
  navigator.clipboard.writeText('12345678')
      .then(() => {
        alert('QQ群号已复制到剪贴板');
      })
      .catch(err => {
        console.error('复制失败:', err);
      });
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
                <div v-for="date in generateDaysOfMonth(selectedDate)" :key="date.fullDate"
                     class="flex flex-col items-center">
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
            <div class="h-70 bg-white p-6  rounded-md border-1 text-lg">站内公告
              <ul class="space-y-2 mt-6 px-6 text-xs">
                <li v-for="(item, index) in announcements" :key="index"
                    class="announcement-item group flex items-start">
        <span class="update-badge bg-purple-100 text-purple-800 text-xs font-semibold px-2 py-1 rounded mr-3">
          {{ item.tag }}
        </span>
                  <div class="flex-1">
                    <p class="text-sm font-medium text-gray-800">{{ item.version }}</p>
                    <p class="text-xs text-gray-500">{{ item.date }}</p>
                  </div>
                  <button @click="showDetails(index)"
                          class="text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
                         stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                    </svg>
                  </button>
                </li>
              </ul>
              <!--              &lt;!&ndash; 详情对话框 &ndash;&gt;-->
              <!--              <div v-if="showDetail" class="mt-4 p-3 bg-gray-50 rounded border border-gray-200">-->
              <!--                <h4 class="font-bold text-purple-700 mb-2">{{ detailContent.title }}</h4>-->
              <!--                <p class="text-sm text-gray-700">{{ detailContent.description }}</p>-->
              <!--                <button @click="closeDetails" class="mt-2 text-xs text-purple-600 hover:text-purple-800">-->
              <!--                  关闭详情-->
              <!--                </button>-->
              <!--              </div>-->

            </div>
            <div class="h-auto bg-white p-4  rounded-md border-1">网站介绍</div>
          </div>
          <div class="flex-1 px-4 py-4 space-y-8">
            <div class="usage-guide h-auto bg-white p-6  rounded-md border-1 text-lg">使用指南
              <div class="flex-col items-center text-xs">
                <div>
                  <h4 class="font-semibold text-lg mb-1 text-blue-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                         fill="currentColor">
                      <path fill-rule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clip-rule="evenodd"/>
                    </svg>
                    数据上传
                  </h4>
                  <ul class="space-y-2 pl-1 flex-col items-center text-sm">
                    <li class="flex items-center">
            <span class="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-0.5 items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"/>
              </svg>
            </span>
                      <span class="text-base">支持格式：<span class="font-medium">.tif/.png/.jpg</span>（推荐16位TIFF格式保留原始数据）</span>
                    </li>
                    <li class="flex items-start">
            <span class="inline-block bg-blue-100 text-blue-800 rounded-full p-1 mr-2 mt-0.5">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clip-rule="evenodd"/>
              </svg>
            </span>
                      <span class="text-base">图像大小限制：<span class="font-medium">单张≤50MB</span>（超尺寸可联系管理员）</span>
                    </li>
                  </ul>
                </div>

                <!-- 参数设置部分 -->
                <div class="guide-section bg-white rounded-lg mt-4">
                  <h4 class="font-semibold text-lg mb-1 text-purple-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" viewBox="0 0 20 20"
                         fill="currentColor">
                      <path fill-rule="evenodd"
                            d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                            clip-rule="evenodd"/>
                    </svg>
                    参数设置
                  </h4>
                  <p class="text-base mb-2 font-medium">必填5项核心参数：</p>
                  <ol class="space-y-2 pl-1">
                    <li class="flex items-start" v-for="(param, index) in parameters" :key="index">
            <span
                class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-100 text-purple-800 font-medium mr-2 flex-shrink-0">
              {{ index + 1 }}
            </span>
                      <span class="text-base leading-relaxed">{{ param }}</span>
                    </li>
                  </ol>
                </div>
              </div>

            </div>

            <div class=" h-auto bg-white p-6  rounded-md border-1 text-lg">
              <div class="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <h3 class="text-xl font-bold text-purple-800 ml-2">交流社群</h3>
              </div>
              <!-- QQ群信息 -->
              <div class="flex w-full items-start justify-center">
                <div class="w-full flex-col justify-center">
                  <p class="font-medium text-gray-800 mt-1">官方QQ交流群</p>
                  <p class="text-2xl font-bold text-purple-600 mt-1">12345678</p>
                  <div class="flex space-x-2 mt-2">
                    <button @click="copyQQ" class="text-xs bg-purple-100 hover:bg-purple-200 text-purple-800 px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                      </svg>
                      复制群号
                    </button>
                    <a href="https://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=KEY&authKey=AUTHKEY&noverify=0&group_code=12345678"
                       target="_blank"
                       class="text-xs bg-blue-100 hover:bg-blue-200 text-blue-800 px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      立即加入
                    </a>
                  </div>
                </div>
              </div>
            </div>
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

.usage-guide h3 {
  color: #6b46c1;
}

.usage-guide h4 {
  color: #805ad5;
}

.community-card {
  max-width: 400px;
}

.social-icon {
  @apply p-2 rounded-full transition-colors duration-200;
}

/* 动画效果 */
.community-card:hover {
  transform: translateY(-3px);
}

/* 响应式调整 */
@media (max-width: 640px) {
  .community-card {
    width: 100%;
    max-width: none;
  }
}
</style>