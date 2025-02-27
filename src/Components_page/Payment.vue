<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import Bottom from "@/Components_single/Bottom.vue";
import router from "@/router";
import axios from "axios";
import {usercodeStore} from "@/store/usercode";
import {useAuthStore} from "@/store/token";

const route = useRoute()
let itemList = JSON.parse(<string>route.query.itemList)
const orderCost = route.query.orderCost
let isDisplay = ref(false)
const orderId = route.query.orderId

async function Payment(order_state: number){
  const response = await axios.post('http://localhost:8080/api/orderTable/SaveOrderTableEntity', null, {
    headers: {
      Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : `Bearer ${sessionStorage.getItem('token')}`
    },
    params: {
      order_id: orderId,
      order_state,
      order_total: orderCost,
      business_id: itemList[0].businessEntity.businessId,
      user_code: usercodeStore().usercode || sessionStorage.getItem('usercode'),
      da_id: route.query.daId
    }
  })
  console.log(response)
  if(response.data.orderId != 0){
    console.log("付款成功")
  }
  await router.push({
    name: 'OrderList',
  })
}

const chanDisplay = () => {
  isDisplay.value = !isDisplay.value
}

</script>

<template>
  <div class="w-full h-full">

    <!--header部分-->
    <header class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p class="">在线支付</p>
    </header>

    <!--订单信息部分-->
    <div class="w-full h-full">
      <p class="mt-[12vw] box-border pt-[4vw] px-[4vw] pb-0 text-xl font-light text-[#999999FF]">订单信息：</p>
      <div class="box-border p-[4vw] text-xl text-[#666666FF] flex flex-row justify-between items-center">
        <p class="flex flex-row justify-between items-center">
          {{ itemList[0].businessEntity.businessName }}
          <svg @click="chanDisplay" id="showBtn" class="flex" xmlns="http://www.w3.org/2000/svg" width="18" height="18"
               viewBox="0 0 32 32">
            <path fill="currentColor" d="m24 12l-8 10l-8-10z"/>
          </svg>
        </p>
        <p class="text-orange-600">&#165;{{ orderCost }}</p>
      </div>

      <!--订单明细部分-->
      <div v-if="isDisplay">
        <div v-for="item in itemList" :key="item.foodId" class="">
          <div v-if="item.quantity!==0" class="w-full box-border py-1 px-6 flex justify-between items-center">
            <div class="text-xl text-[#666666FF]"> {{ item.foodName }}</div>
            <div class="text-xl text-[#666666FF]">&#165; {{ item.foodPrice }} * {{ item.quantity }}</div>
          </div>
        </div>
      </div>

      <!--支付方式-->
      <ul class="w-full">
        <li class="w-full box-border p-[4vw] flex justify-between items-center">
          <img class="w-[33vw] h-[8.9vw]" src="../assets/img/alipay.png"/>
          <svg class="text-[#38CA73FF]" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
        </li>
        <li class="w-full box-border p-[4vw] flex justify-between items-center">
          <img class="w-[33vw] h-[8.9vw]" src="../assets/img/wechat.png"/>
        </li>
      </ul>
      <div class="w-full flex-col h-20 flex box-border py-[4vw] px-[3vw] justify-center items-center mt-2">
        <button class="w-full h-full text-2xl font-bold text-white bg-[#38CA73FF] rounded-[4px]" @click="Payment(1)">
          确认支付
        </button>
        <button class="w-full h-full text-2xl font-bold text-white bg-[#c9c9c9] rounded-[4px] m-2" @click="Payment(0)">
          取消支付
        </button>
      </div>
    </div>
    <!--底部菜单部分-->
    <Bottom></Bottom>

  </div>
</template>

<style scoped>

</style>