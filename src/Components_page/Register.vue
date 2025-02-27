<script setup lang="ts">
import {useRouter} from "vue-router";
import Bottom from "@/Components_single/Bottom.vue";
import {registerService} from "@/api/user";
import type {IRegisterData} from "@/Types/IRegisterData";

const router = useRouter()

const toPage = (url:string)=>{
  router.push(url)
}

//定义数据模型
const registerData = ref<IRegisterData>({
  code:'',
  name:'',
  password:'',
  repassword:'',
  user_sex:''
})

//校验密码
const errors = ref({ repasswordError: '' })

const checkRepassword = () => {
  if (registerData.value.repassword === '') {
    errors.value.repasswordError = '请再次确认密码'
  } else if (registerData.value.repassword !== registerData.value.password) {
    errors.value.repasswordError = '两次输入密码不一致'
  } else {
    errors.value.repasswordError = ''
  }
}

// 立即监听registerData中password和repassword的变化
watch(() => registerData.value.password, checkRepassword)
watch(() => registerData.value.repassword, checkRepassword)

// 注册函数
const register = async () => {
  // 进行提交前的最终验证
  checkRepassword()
  // 如果有错误，则停止注册流程
  if (errors.value.repasswordError) {
    return
  }
  console.log(registerData.value)
  // 实际的注册逻辑
  try {
    const data = {
      code:registerData.value.code,
      name:registerData.value.name,
      password:registerData.value.password,
      user_sex:registerData.value.user_sex
    }
    let response = await registerService(data);
    const statuscode = response.status;
    if (statuscode == 200){
      ElMessage.success('注册成功')
      toPage('/');
    }else {
      ElMessage.error('注册失败')
    }
  } catch (error) {
    console.error(error); // 如果请求失败，打印错误信息
  }
}

</script>

<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>饿了么 用户注册</title>
  </head>

  <div class="w-full h-full">
    <!--header部分-->
    <header class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p class="">用户注册</p>
    </header>

    <!--表单部分-->
    <div class="mt-18 w-full text-xl">
      <div class="box-border py-2 px-4 flex items-center text-xl">
        <div class="flex-shrink-0 flex-grow-0 font-bold text-[#666666FF]">手机号码：</div>
        <input v-model="registerData.code" class="border-none outline-none w-full h-8 ml-4" type="text" placeholder="手机号码">
      </div>

      <div class="box-border py-2 px-4 flex items-center text-xl">
        <div class="flex-shrink-0 flex-grow-0 font-bold text-[#666666FF]">密码：</div>
        <input v-model="registerData.password" class="border-none outline-none w-full h-8 ml-4" type="text" placeholder="密码">
      </div>
      <div class="box-border py-2 px-4 flex items-center text-xl">
        <div class="flex-shrink-0 flex-grow-0 font-bold text-[#666666FF]">确认密码：</div>
        <input v-model="registerData.repassword" class="border-none outline-none w-full h-8 ml-4" type="text" placeholder="确认密码">
      </div>
      <div class="box-border py-2 px-4 flex items-center text-xl">
        <div class="flex-shrink-0 flex-grow-0 font-bold text-[#666666FF]">用户姓名：</div>
        <input v-model="registerData.name" class="border-none outline-none w-full h-8 ml-4" type="text" placeholder="用户姓名">
      </div>
      <div class="box-border py-2 px-4 flex items-center text-xl">
        <div class="flex-shrink-0 flex-grow-0 font-bold text-[#666666FF]">性别：</div>
        <div class="flex items-center text-sm">
          <input v-model="registerData.user_sex" class="ml-10" type="radio" name="sex" value="0">男
          <input v-model="registerData.user_sex" class="ml-16" type="radio" name="sex" value="1">女
        </div>
      </div>
    </div>
    <div class="w-full flex-col h-20 flex box-border py-[4vw] px-[3vw] justify-center items-center mt-2 media-height">
      <button class="w-full h-full text-2xl font-bold text-white bg-[#38CA73FF] rounded-[4px]" @click="register">注册</button>
    </div>

    <!--底部菜单部分-->
    <Bottom></Bottom>

  </div>
</template>

<style scoped>
@media (min-width: 570px) {
  .media-height {
    height: 18%;
  }
}
</style>