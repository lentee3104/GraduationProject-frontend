<script setup lang="ts">

import { useRouter } from "vue-router";
import Bottom from "@/Components_single/Bottom.vue";
import axios from 'axios';
import { useAuthStore } from "@/store/token";
import { usercodeStore } from "@/store/usercode";

type TOrderList = {
  businessId: number,
  businessName: string,
  deliveryAddressRo?: object,
  orderDetailRos?: { foodId: number, foodName: string, orderId: number, quantity: number }[],
  orderId: number,
  orderState: number,
  orderTotal: number,
  userCode: string,
  isDisplay: boolean
}

const router = useRouter()

const toPage = (url: string) => {
  router.push(url)
}

let noOrderList: TOrderList[] = reactive([])
let yesOrderList: TOrderList[] = reactive([])
let isDisplay = ref(false)

onMounted(() => {
  getOrderList();
})
const getOrderList = async () => {
  const response = await axios.post('http://localhost:8080/api/orderDetail/FindOrderByUserCode', null, {
    headers: {
      Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : `Bearer ${sessionStorage.getItem('token')}`
    },
    params: {
      user_code: usercodeStore().usercode || sessionStorage.getItem('usercode'),
    }
  })
  console.log(response.data)
  response.data.forEach(ele => {
    ele.isDisplay = false;
    !ele.orderState && noOrderList.push(ele)
    ele.orderState && yesOrderList.push(ele)
  })
  console.log(noOrderList, yesOrderList)
}

const showFoodList = (item) => {
  item.isDisplay = !item.isDisplay
}

const toPay = (item) => {
  toPage('/Payment')
}
</script>

<template>
  <div class="w-full h-full">

    <!--header部分-->
    <header class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p class="">我的订单</p>
    </header>

    <!--订单列表部分-->
    <h3 class=" mt-24 box-border p-[4vw] text-xl font-light text-[#999999FF]">已支付订单信息：</h3>
    <ul class="w-full">
      <li class="w-full text-3xl" v-for="item in yesOrderList" :key="item.orderId">
        <div class="box-border py-[2vw] px-[4vw]  text-[#666666FF] flex justify-between items-center text-lg">
          <p class="flex flex-row justify-between items-center">
            {{ item.businessName }}
            <svg  @click="showFoodList(item)" v-if="item.orderDetailRos.length > 0" class="fa-caret-down" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 32 32"><path fill="currentColor" d="m24 12l-8 10l-8-10z"/></svg>
          </p>
          <div class="flex">
            <p class="">&#165;{{ item.orderTotal }}</p>
          </div>
        </div>
        <div v-if="item.isDisplay">
          <span class="w-full  text-[#666666FF] text-xl p-1" style="font-size: 14px; color: #46a9ee; padding-left: 10px;">订单信息</span>
          <ul class="w-full order-detailet text-xl" v-if="item.orderDetailRos.length > 0">
            <li v-for="food in item.orderDetailRos"
                class="w-full box-border py-[1vw] px-[4vw] text-[#666666FF] text-xl flex justify-between items-center">
              <p class="">{{ food.foodName }}x{{ food.quantity }}</p>
              <p class="">&#165;15</p>
            </li>
            <li class="w-full box-border py-[1vw] px-[4vw] text-[#666666FF] text-xl flex justify-between items-center">
              <p class="">配送费</p>
              <p class="">&#165;3</p>
            </li>
          </ul>
        </div>
      </li>

    </ul>

    <h3 class=" mt-18 box-border p-[4vw] text-xl font-light text-[#999999FF]">未支付订单信息：</h3>
    <ul class="w-full">
      <li class="w-full text-2xl" v-for="item in noOrderList" :key="item.orderId">
        <div class="box-border py-[2vw] px-[4vw] text-[#666666FF] flex justify-between items-center text-lg">
          <p class="flex flex-row justify-between items-center ">
            {{ item.businessName }}
            <svg @click="showFoodList(item)" v-if="item.orderDetailRos.length > 0" class="fa-caret-down" xmlns="http://www.w3.org/2000/svg"
                 width="20" height="20" viewBox="0 0 32 32">
              <path fill="currentColor" d="m24 12l-8 10l-8-10z" />
            </svg>
          </p>
          <div class="flex">
            <p class="">&#165;{{ item.orderTotal }}</p>
            <button class="bg-[#FF9900FF] text-white rounded-[3px] ml-4 select-none cursor-pointer"
                    @click="toPay(item)">去支付</button>
          </div>
        </div>
        <div v-if="item.isDisplay">
          <span class="w-full  text-[#666666FF] text-xl p-1" style="font-size: 14px; color: #46a9ee; padding-left: 10px;">订单信息</span>
          <ul class="w-full order-detailet text-xl" v-if="item.orderDetailRos.length > 0">
            <li v-for="food in item.orderDetailRos"
                class="w-full box-border py-[1vw] px-[4vw] text-[#666666FF] text-xl flex justify-between items-center">
              <p class="">{{ food.foodName }}x{{ food.quantity }}</p>
              <p class="">&#165;15</p>
            </li>
            <li class="w-full box-border py-[1vw] px-[4vw] text-[#666666FF] text-xl flex justify-between items-center">
              <p class="">配送费</p>
              <p class="">&#165;3</p>
            </li>
          </ul>
        </div>
      </li>
    </ul>



    <!--底部菜单部分-->
    <Bottom></Bottom>

  </div>
</template>

<style scoped>
</style>