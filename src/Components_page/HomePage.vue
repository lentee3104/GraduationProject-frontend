<script setup lang="ts">
import Sidebar from '@/Components_single/Sidebar.vue';
import Header from "@/Components_single/Header.vue";
</script>

<template>
  <div class="top-0 w-full h-full bg-gradient-to-t from-[#9c98c5] to-transparent overflow-x-hidden">
    <Sidebar class="absolute top-0 left-0"></Sidebar>
    <Header class="absolute top-0"></Header>

    <main class="w-full h-full px-4">
      <div class="mt-20 ml-[150px]">

<!--        &lt;!&ndash; 主页面内容 &ndash;&gt;-->
<!--        <div class="justify-center items-center text-2xl">HomePage</div>-->
        <div class="h-screen">
<!--          <h2 class="text-center pt-20">Scroll Down</h2>-->
          <!-- 系统介绍部分 -->
          <div class="text-left mb-12 px-6 py-10">
            <h1 class="text-5xl font-semibold flex justify-center items-center ">靶向药物递送预测系统</h1>
            <p class="mt-6 text-2xl text-gray-700 leading-relaxed">
              本系统通过结合人工智能与超声驱动微泡技术，帮助科研人员预测靶向药物递送实验的结果。通过图像处理、数据分析和多模态数据融合，您可以更加直观地了解微泡状态与实验参数对实验结果的影响，优化药物递送效果。
            </p>
          </div>

          <!-- 系统架构介绍 -->
          <div class="text-left mb-12 px-6">
            <h2 class="text-5xl font-semibold flex justify-center items-center">系统架构</h2>
            <p class="mt-6 text-2xl text-gray-700 leading-relaxed">
              系统架构由前后端分离的架构组成，前端采用Vue3框架进行界面设计，并使用Tailwind UI进行样式设计。后端则使用Spring框架进行服务设计和数据库操作，Spring通过调用Flask接口来进行机器学习模型的预测计算。前后端的数据交互采用Axios进行。
            </p>
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

.text-left {
  text-align: left;
}

.mt-20 {
  margin-top: 5rem;
}

.mb-12 {
  margin-bottom: 3rem;
}

.text-xl {
  font-size: 1.25rem;
}

.text-lg {
  font-size: 1.125rem;
}

.text-gray-700 {
  color: #4a4a4a;
}

.leading-relaxed {
  line-height: 1.8;
}

.px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}

h2 {
  margin-top: 3rem;
}

h3 {
  margin-bottom: 1rem;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-size: 1rem;
  background-color: #f7fafc;
  padding: 1.5rem;
  border-radius: 0.5rem;
  color: #2d3748;
}
</style>
