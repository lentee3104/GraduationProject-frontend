<script setup lang="ts">
import {useRouter} from "vue-router";
import {useAddressStore} from "@/store/AddressList";
import router from "@/router";
import axios from "axios";
import {useAuthStore} from "@/store/token";
import {usercodeStore} from "@/store/usercode";


// const addressService = inject<IAddressService>('addressService')!

let addressList = ref([])
const route = useRouter()

const toPage = (url: string) => {
  router.push(url)
}

/*const addressStore = useAddressStore()
const addressList = addressStore.addressList*/

onMounted(() => {
  getAddressList()
  console.log(addressList)
})

async function getAddressList() {
  const response = await axios.post('http://localhost:8080/api/address/FindByUserEntityCode', null, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    },
    params: {
      user_code: usercodeStore().usercode
    }
  })
  if (response.data.orderId != 0) {
    console.log("查询地址成功")
    console.log(response.data)
    addressList.value = response.data
  }
}

function alterAddress(address:any){
  route.push({
    name:"EditUserAddress",
    query: {
      address: JSON.stringify(address)
    }
  })
}

function returnOrderPage(address:any){
  console.log("address")
  console.log(address)
  localStorage.setItem("daId", JSON.stringify(address))
  setTimeout(() => {
    router.push('/Order');
  }, 10);
}


</script>

<template>
  <div class="w-full h-full flex-col">

    <!--header部分-->
    <div class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p>地址管理</p>
    </div>
    <div class="mt-14">
      <!--     展示已有地址-->
      <div v-for="address in addressList" :key="address.daId"
           class="w-full p-2 select-none flex items-center cursor-pointer border-solid border-b border-gray-300">
        <div class="w-full box-border p-[2vw] text-black">
          <div class="w-full flex justify-between items-center font-bold select-none cursor-pointer my-1 mx-0">
            <p class="w-[90%] text-xl" @click="returnOrderPage(address)">配送地址:{{ address.address }}</p>
            <svg @click="alterAddress(address)" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path fill="currentColor"
                    d="M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47Z"/>
            </svg>
          </div>
          <p class="text2xl">姓名:{{ address.contactName }} 电话:{{ address.contactTel }}</p>
        </div>
      </div>

      <!--新增地址-->
      <div class="w-full flex-col h-20 flex box-border py-[4vw] px-[3vw] justify-center items-center mt-2">
        <button class="w-full h-full text-2xl font-bold text-white bg-[#38CA73FF] rounded-[4px]"
                @click="toPage('/AddUserAddress')">新增收货地址
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>