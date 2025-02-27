<script setup lang="ts">

import {inject, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import type {IAddressService} from "@/Types/IAddressService";
import router from "@/router";
import axios from "axios";
import {useAuthStore} from "@/store/token";
import {usercodeStore} from "@/store/usercode";
/*let addressService: IAddressService;
addressService = inject<IAddressService>('addressService')!;*/

const route = useRoute()
let address = ref(JSON.parse(<string>route.query.address))

console.log(address)

async function onOK(){
  const response = await axios.post('http://localhost:8080/api/address/SaveAddress', null, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    },
    params: {
      da_id: address.value.daId,
      contact_name: address.value.contactName,
      contact_sex: address.value.contactSex,
      contact_tel: address.value.contactTel,
      address: address.value.address,
      user_code: usercodeStore().usercode
    }
  })
  if(response.data.daId != 0){
    alert("修改成功")
    await router.push("/UserAddress")
  }
}

/*const toPage = (url:string)=>{
  router.push(url)
}*/
</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p>更新送货地址</p>
    </div>

    <div class="w-full h-full flex-col mt-20 px-4 text-xl ">
      <div class="w-full flex items-center py-2">
        <div class="w-28">联系人：</div>
        <el-input class="w-full" type="text" v-model="address.contactName" placeholder="联系人姓名"></el-input>
      </div>
      <div class="flex items-center py-2">
        <div class="w-38">联系方式：</div>
        <el-input type="number" v-model="address.contactTel" placeholder="联系方式"></el-input>
      </div>
      <div class="flex items-center py-2">
        <div class="w-20">性别：</div>
        <el-radio-group v-model="address.contactSex">
          <el-radio :label="1" size="large">男</el-radio>
          <el-radio :label="0" size="large">女</el-radio>
        </el-radio-group>
      </div>
      <div class="flex items-center py-2">
        <div class="w-38">收货地址：</div>
        <el-input type="text" v-model="address.address" placeholder="收货地址"></el-input>
      </div>

      <div class="w-full flex-col h-20 flex box-border py-[4vw] px-[3vw] justify-center items-center mt-2">
        <button class="w-full h-full text-2xl font-bold text-white bg-[#38CA73FF] rounded-[4px]"
                @click="onOK()">保存</button>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>