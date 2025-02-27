<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/store/token";
import { usercodeStore } from "@/store/usercode";
import { getAddressService } from "@/api/address";
import { useAddressStore } from "@/store/AddressList";
import axios from 'axios';
import router from "@/router";
import { resolveDirective } from "vue";
import { saveOrder } from "@/api/orderTable";
import { orderDetail } from "@/api/orderDetail";


const route = useRoute()
let itemList = JSON.parse(<string>localStorage.getItem("itemList"))
const orderCost = JSON.parse(<string>localStorage.getItem("orderCost"))+ 3
let da = JSON.parse(<string>localStorage.getItem("daId"))
let orderId = 0
let orderTable = ref('')

console.log(itemList, orderCost, da)

async function saveOrderTable() {
  const response = await axios.post('http://localhost:8080/api/orderTable/SaveOrderTableEntity', null, {
    headers: {
      Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : `Bearer ${sessionStorage.getItem('token')}`
    },
    params: {
      order_id: 0,
      order_state: 0,
      order_total: orderCost,
      business_id: itemList[0].businessEntity.businessId,
      user_code: usercodeStore().usercode || sessionStorage.getItem('usercode'),
      da_id: 1
    }
  })
  console.log(response)
  if (response.data.orderId != 0) {
    console.log("订单保存成功")
    console.log(response.data)
    // console.log(response.data.orderTotal)
    await nextTick()
    orderId = response.data
    await nextTick()
    console.log("orderId在存储后的值为")
    console.log(orderId)
  } else {
    console.log("订单保存失败")
  }
}

async function saveOrderList() {
  for (const item of itemList) {
    if (item.quantity !== 0) {
      const response = await axios.post('http://localhost:8080/api/orderDetail/SaveOrderDetailEntity', null, {
        headers: {
          Authorization: useAuthStore().token ? `Bearer ${useAuthStore().token}` : `Bearer ${sessionStorage.getItem('token')}`
        },
        params: {
          order_id: orderId,
          od_id: 0,
          quantity: item.quantity,
          food_id: item.foodId,
        }
      })
      console.log('11111----', response, response.data.slice(8, 10))

      if (response.data.slice(8, 10) != 0) { //odId
        console.log("插入orderList成功")
      }
    }
  }
}

async function toPayment() {
  saveOrderTable().then(() => {
    saveOrderList().then(() => {
      router.push({
        name: "Payment",
        query: {
          orderId: orderId,
          itemList: JSON.stringify(itemList),
          orderCost: orderCost,
          businessId: itemList[0].businessEntity.businessId,
          userCode: usercodeStore().usercode,
          daId: 1
        }
      })
    })
  })
}




function getAddressId(deliveryAddressId: number) {
  daId.value = String(deliveryAddressId)
}

const toAddress = () => {
  router.push({
    name: "UserAddress",
    query: {
      itemList: JSON.stringify(itemList),
      orderCost: orderCost
    }
  })
}

const getAddressList = async () => {
  const tokenStore = useAuthStore()
  const token = tokenStore.token || sessionStorage.getItem('token')
  const usercode = usercodeStore().usercode || sessionStorage.getItem('usercode')
  let response = await getAddressService(token, usercode)
  console.log(response.data)
  const statuscode = response.status
  if (statuscode == 200) {
    // 使用 Pinia store
    const addressStore = useAddressStore()
    // 更新地址列表数据
    addressStore.setAddressList(response.data)
    // console.log(businessStore.);
    toAddress()
  } else {
    console.log("查询失败")
  }
}


</script>

<template>
  <div class="w-full h-full">

    <!--header部分-->
    <header class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p>确认订单</p>
    </header>

    <!--订单信息部分-->
    <div v-if="da === 0">
      <div class="w-full mt-14 bg-[#0097FFFF] box-border p-[2vw] text-white">
        <p class="text-xl font-light">订单配送至：</p>
        <div class="w-full flex justify-between items-center font-bold select-none cursor-pointer my-1 mx-0"
             @click="getAddressList">
          <p class="w-[90%] text-xl">地址未选择</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47Z" />
          </svg>
        </div>
        <p class="text2xl">姓名 电话</p>
      </div>
    </div>
    <div v-else>
      <div class="w-full mt-14 bg-[#0097FFFF] box-border p-[2vw] text-white">
        <p class="text-xl font-light">订单配送至：</p>
        <div class="w-full flex justify-between items-center font-bold select-none cursor-pointer my-1 mx-0"
             @click="getAddressList">
          <p class="w-[90%] text-xl"> {{ da.address }} </p>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="currentColor"
                  d="M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47Z" />
          </svg>
        </div>
        <p class="text2xl">{{ da.contactName }} {{ da.contactTel }}</p>
      </div>
    </div>


    <p class="box-border p-[3vw] text-xl font-bold text-[#666666FF] border-solid border-b-[1px] border-b-[#DDDDDDFF]">
      {{ itemList[0].businessEntity.businessName }}</p>

    <!--订单明细部分-->
    <div v-for="item in itemList" :key="item.foodId">
      <div v-if="item.quantity !== 0" class="w-full box-border px-1 py-2 select-none flex justify-between items-center">
        <div class="flex box-content items-center">
          <img class="w-18 h-auto" :src="item.foodImg">
          <div class="ml-2 ">
            <h3 class="text-sm font-semibold text-gray-600">{{ item.foodName }}</h3>
            <p class="text-xs leading-loose font-normal text-gray-500 ">{{ item.foodExplain }}</p>
            <p class="text-xs text-gray-500 font-normal ">&#165;{{ item.foodPrice }}</p>
          </div>
        </div>
        <div class="w-auto flex items-center">
          <p class="text-s text-gray-600 mx-3">{{ item.quantity }}</p>
        </div>
      </div>
    </div>
    <div class="w-full box-border px-1 py-2 select-none flex justify-between items-center">
      <div class="flex box-content items-center">
        <div class="ml-2 ">
          <h3 class="text-sm font-semibold text-gray-600">配送费</h3>
          <p class="text-xs text-gray-500 font-normal ">&#165;3</p>
        </div>
      </div>
    </div>
    <!--合计部分-->
    <div class="w-full h-18 fixed left-0 bottom-0 flex">
      <div class="flex basis-2/3 bg-[#505051FF] text-white text-2xl font-bold select-none justify-center items-center">
        &#165;{{ orderCost }}
      </div>
      <div
          class="flex basis-1/3 bg-[#38CA73FF] text-white text-2xl font-bold select-none cursor-pointer justify-center items-center"
          @click="toPayment()">去支付
      </div>
    </div>
  </div>
</template>

<style scoped></style>