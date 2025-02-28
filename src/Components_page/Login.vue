<script setup lang="ts">
import Sidebar from '@/Components_single/Sidebar.vue';
import Header from "@/Components_single/Header.vue";
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
            <div class="h-60 bg-white p-4  rounded-md border-1">使用统计</div>
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