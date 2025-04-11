<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import Sidebar from '@/Components_single/Sidebar.vue';
import Header from "@/Components_single/Header.vue";

// 图片上传和输入参数
const file = ref<File | null>(null);
const imageUrl = ref<string | null>(null);  // 用于存储生成的图片URL
const param1 = ref<number | null>(null);
const param2 = ref<number | null>(null);
const param3 = ref<number | null>(null);
const param4 = ref<number | null>(null);
const param5 = ref<number | null>(null);

// 预测结果
let predictionResult = ref('');

// 选择图片的处理函数
const onImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input?.files && input.files.length > 0) {
    file.value = input.files[0];
    imageUrl.value = URL.createObjectURL(file.value);  // 生成临时URL并赋值
  }
};

// 提交按钮的点击事件
const onSubmit = async () => {
  console.log(param1, param2, param3, param4, param5);
  console.log(file.value)
  if (file.value && !file.value.type.startsWith('image/')) {
    alert('请选择有效的图片文件');
    return;
  }
  if (!param1.value === null || !param2.value === null || !param3.value === null || !param4.value === null || !param5.value === null) {
    alert('请确保填写所有参数！');
    return;
  }

  const params = [param1.value, param2.value, param3.value, param4.value, param5.value];
  const formData = new FormData();
  formData.append('file', file.value);
  formData.append('params', params.join(','));
  // formData.append('params', JSON.stringify([param1.value, param2.value, param3.value, param4.value, param5.value]));
  // formData.append('param1', param1.value.toString());
  // formData.append('param2', param2.value.toString());
  // formData.append('param3', param3.value.toString());
  // formData.append('param4', param4.value.toString());
  // formData.append('param5', param5.value.toString());

  const token = localStorage.getItem('token');
  try {
    const response = await axios.post('http://localhost:8080/api/prediction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`
      },
    });

    // 假设后端返回的预测结果在 response.data.predicted_class
    console.log(response.data);
    // 检查response.data的类型
    console.log('response.data的类型:', typeof response.data);

    let predictionResult;

    // 如果response.data是字符串并且包含"Flask response:"
    if (typeof response.data === 'string' && response.data.includes('Flask response:')) {
      // 提取JSON部分并解析
      const jsonStr = response.data.substring(response.data.indexOf('{'), response.data.lastIndexOf('}') + 1);
      const parsedData = JSON.parse(jsonStr);
      predictionResult = parsedData.predicted_class;
    }
    // 如果response.data已经是一个对象
    else if (typeof response.data === 'object' && response.data !== null) {
      predictionResult = response.data.predicted_class;
    }

    console.log('预测结果:', predictionResult);

    if (predictionResult === 0) {
      alert('预测结果为0');
      // 处理结果为0的情况
    } else if (predictionResult === 1) {
      alert('预测结果为1');
      // 处理结果为1的情况
    } else if (predictionResult === 2) {
      alert('预测结果为2');
      // 处理结果为2的情况
    } else {
      alert('无效的预测结果:', predictionResult);
    }
  } catch (error) {
    console.error('请求失败：', error);
    alert('请求失败，请稍后再试');
  }
}

</script>

<template>
  <div class="top-0 w-full h-full bg-gradient-to-t from-[#9c98c5] to-transparent overflow-x-hidden">
    <Sidebar class="absolute top-0 left-0"></Sidebar>
    <Header class="absolute top-0"></Header>
    <main class="w-full h-full px-4">
      <div class="flex-col items-center justify-center mt-20 ml-[150px] w-[1200px]">
        <div class="w-full justify-center items-center text-2xl">PredictionPage</div>
        <div class="h-screen w-full justify-center items-center mt-10">
          <div class="w-full flex-col items-center justify-center"> <!--这里是图片-->
            <div v-if="imageUrl" class=" flex justify-center items-center">
              <img :src="imageUrl" alt="Selected Image" class="max-w-full h-auto rounded shadow-lg" />
            </div>
            <div class="flex w-full items-center justify-center ">
              <label for="imageUpload" class="">上传图片 (tif 或其他格式)</label>
              <input
                  type="file"
                  id="imageUpload"
                  accept=".tif, .png, .jpg, .jpeg, .tiff"
                  @change="onImageUpload"
                  class=" w-auto ml-2"
              />
            </div>
          </div>

          <div class="flex gap-4 w-full justify-center"><!--这里是参数-->
            <div class="mb-4 flex justify-center items-center mt-10">
              <label for="param1" class="block">参数 1</label>
              <input
                  type="number"
                  id="param1"
                  v-model="param1"
                  class="block w-[150px] p-2 border border-gray-300 rounded"
                  placeholder="请输入参数 1"
              />
            </div>

            <div class="mb-4 flex justify-center items-center mt-10">
              <label for="param2" class="block ">参数 2</label>
              <input
                  type="number"
                  id="param2"
                  v-model="param2"
                  class="block w-[150px] p-2 border border-gray-300 rounded"
                  placeholder="请输入参数 2"
              />
            </div>

            <div class="mb-4 flex justify-center items-center mt-10">
              <label for="param3" class="block ">参数 3</label>
              <input
                  type="number"
                  id="param3"
                  v-model="param3"
                  class="block w-[150px] p-2 border border-gray-300 rounded"
                  placeholder="请输入参数 3"
              />
            </div>

            <div class="mb-4 flex justify-center items-center mt-10">
              <label for="param4" class="block ">参数 4</label>
              <input
                  type="number"
                  id="param4"
                  v-model="param4"
                  class="block w-[150px] p-2 border border-gray-300 rounded"
                  placeholder="请输入参数 4"
              />
            </div>

            <div class="mb-4 flex justify-center items-center mt-10">
              <label for="param5" class="block ">参数 5</label>
              <input
                  type="number"
                  id="param5"
                  v-model="param5"
                  class="block w-[150px] p-2 border border-gray-300 rounded"
                  placeholder="请输入参数 5"
              />
            </div>
          </div>

          <div><!--提交按钮-->
            <div class="flex justify-center items-center mt-10">
              <button
                  @click="onSubmit"
                  class="px-6 py-2 bg-white text-black rounded hover:bg-[#CFB8E8FF]"
              >
                提交
              </button>
            </div>
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