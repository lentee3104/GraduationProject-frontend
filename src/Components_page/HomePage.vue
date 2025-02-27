<script setup lang="ts">
import Sidebar from '@/Components_single/Sidebar.vue';
import Header from "@/Components_single/Header.vue";
</script>

<template>
  <div class="top-0 w-full h-full bg-gradient-to-t from-[#9c98c5] to-transparent overflow-x-hidden">
    <Sidebar class="absolute top-0 left-0"></Sidebar>
    <Header class="absolute top-0"></Header>
    <main class="w-full h-full px-4">
      <div class=" mt-20 ml-[150px]">
        <div class="justify-center items-center text-2xl">HomePage</div>
        <div class="h-screen ">
          <h2 class="text-center pt-20">Scroll Down</h2>
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