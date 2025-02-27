<script setup lang="ts">
import {useRouter} from "vue-router";
import {IAddressItem} from "@/Types/IAddressItem";
import {useAuthStore} from "@/store/token";
import {saveAddress} from "@/api/address";
import {usercodeStore} from "@/store/usercode";
import axios from "axios";

const router = useRouter()

const toPage = (url:string)=>{
  router.push(url)
}

//定义数据模型
const addressData = ref<IAddressItem>({
  daID:'',
  name: '',
  sex: 0,
  number: '',
  address: ''
})



const newAddress = async () => {
  const da_id = Number(addressData.value.daID);
  const usercode = usercodeStore().usercode
  // 实际的增加逻辑
  try {
    const data = {
      da_id:da_id,
      contact_name:addressData.value.name,
      contact_sex:addressData.value.sex,
      contact_tel:addressData.value.number,
      address:addressData.value.address,
      user_code:usercode
    }
    const tokenStore = useAuthStore()
    const token = tokenStore.token
    console.log(data);
    let response = await saveAddress(token,data);
    const statuscode = response.status;
    if (statuscode == 200){
      ElMessage.success('新增成功')
    }else {
      ElMessage.error('新增失败')
    }
  } catch (error) {
    console.error(error); // 如果请求失败，打印错误信息
  }
}

async function addAddress(){
  const response = await axios.post('http://localhost:8080/api/address/SaveAddress', null, {
    headers: {
      Authorization: `Bearer ${useAuthStore().token}`
    },
    params: {
      da_id: 0,
      contact_name: addressData.value.name,
      contact_sex: addressData.value.sex,
      contact_tel: addressData.value.number,
      address: addressData.value.address,
      user_code: usercodeStore().usercode
    }
  })
  if(response.data.daId != 0){
    await router.push("/UserAddress")
  }
}



</script>

<template>
  <div class="w-full h-full">
    <div class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p>新增送货地址</p>
    </div>

    <div class="w-full h-full flex-col mt-20 px-4 text-xl ">
      <div class="w-full flex items-center py-2">
        <div class="w-28">联系人：</div>
        <el-input class="w-full" type="text" v-model="addressData.name" placeholder="联系人姓名"></el-input>
      </div>
      <div class="flex items-center py-2">
        <div class="w-38">联系方式：</div>
        <el-input type="number" v-model="addressData.number" placeholder="联系方式"></el-input>
      </div>
      <div class="flex items-center py-2">
        <div class="w-20">性别：</div>
        <div class="flex items-center text-sm">
          <input v-model="addressData.sex" class="ml-10" type="radio" name="sex" value="0">男
          <input v-model="addressData.sex" class="ml-16" type="radio" name="sex" value="1">女
        </div>
      </div>
      <div class="flex items-center py-2">
        <div class="w-38">收货地址：</div>
        <el-input type="text" v-model="addressData.address" placeholder="收货地址"></el-input>
      </div>

      <div class="w-full flex-col h-20 flex box-border py-[4vw] px-[3vw] justify-center items-center mt-2">
        <button class="w-full h-full text-2xl font-bold text-white bg-[#38CA73FF] rounded-[4px]"
                @click="addAddress">保存</button>
      </div>

    </div>
  </div>

</template>

<style scoped>

</style>