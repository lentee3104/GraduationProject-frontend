<script setup lang="ts">
import router from "@/router";
import { useRoute } from 'vue-router';
import { foodList } from "@/api/cartItem";
import type { ICartItem } from "@/Types/ICartItem";


let itemList = ref([])
let orderCost =ref(0)
let orderQuantity =ref(0)
localStorage.setItem("daId", JSON.stringify(0))

const cartItems: ICartItem[] = reactive([
  // { foodId: 1, foodName: '纯肉鲜肉（水饺）', quantity: 0, foodPrice: 15, foodImg: '/src/assets/img/sp01.png' }
  // ... 可以添加更多的item
]);

const route = useRoute();
onMounted(() => {
  const businessId = route.query.businessId;
  if (businessId) {
    console.log(businessId);
    findFoodListByBusinessId(businessId);
  } else {
    console.log("businessId is undefined");
  }
});


async function findFoodListByBusinessId(businessId) {
  try {
    let response = await foodList(businessId);
    if(response.data.length != 0){
      console.log("查询商家售卖的商品列表成功")
      console.log(response.data)
      itemList.value = response.data.map((item: ICartItem) => ({
        ...item,
        quantity: 0 // 设置默认的 quantity 值，根据您的需求进行调整
      }));
      console.log("更改后的itemList为")
      console.log(itemList.value)
    }
  } catch (error) { console.log(error) }
}

/*减少数量*/
const decreaseQuantity = (itemId: number, itemPrice:number) =>{
  const matchingObject = itemList.value.findIndex((item: ICartItem) => item.foodId === itemId);
  if (matchingObject!=-1 && itemList.value[matchingObject]['quantity'] != 0) {
    itemList.value[matchingObject].quantity = itemList.value[matchingObject]['quantity']-1;
    orderQuantity.value = orderQuantity.value-1;
    orderCost.value = orderCost.value - itemPrice
  }
}

/*增加数量*/
const increaseQuantity = (itemId: number, itemPrice:number) =>{
  const matchingObject = itemList.value.findIndex((item: ICartItem) => item.foodId === itemId);
  itemList.value[matchingObject].quantity = itemList.value[matchingObject]['quantity']+1;
  orderQuantity.value = orderQuantity.value+1;
  orderCost.value = orderCost.value + itemPrice
}

//items是商品列表的响应式数据
function updateQuantity(itemId: number, delta: number) {
  const item = cartItems.find((item: ICartItem) => item.foodId === itemId);
  if (item) {
    let newQuantity = item['quantity'] + delta;
    if (newQuantity < 0) {
      newQuantity = 0;
    }
    item['quantity'] = newQuantity;
  }
}

const add = (itemId: number) => {
  updateQuantity(itemId, 1);
};

const del = (itemId: number) => {
  updateQuantity(itemId, -1);
};

const cartInfo = computed(() => {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (const item of cartItems) {
    totalQuantity += item['quantity'];
    totalPrice += item['quantity'] * item['foodPrice'];
  }

  return {
    cartQuantity: totalQuantity,
    cartTotalPrice: totalPrice.toFixed(2), // 价格保留两位小数
  };
});


const toPage = (url: string) => {
  router.push(url);
};

const checkout = () => {
  // 使用 cartInfo.cartTotalPrice 来验证
  if (orderCost.value >= 20) {
    localStorage.setItem("itemList", JSON.stringify(itemList.value))
    localStorage.setItem("orderCost", JSON.stringify(orderCost.value))
    router.push({
      name:"Order",
    })
  } else {
    alert('您至少需要消费20元！');
  }
};

</script>

<template>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>饿了么 商家信息</title>
  </head>
  <div class="container mx-auto max-w-2xl">
    <!--herder部分-->
    <header class="w-full h-14 bg-[#0097FFFF] text-white text-3xl fixed left-0 top-0 z-50 font-bold
    flex justify-center items-center">
      <p>商家信息</p>
    </header>

    <!--商家图片部分-->
    <div class="w-full h-full mt-18 flex justify-center items-center text-base">
      <img class="w-40 h-40 rounded" src="/src/assets/img/sp01.png">
    </div>

    <!--商家信息部分-->
    <div class="w-full h-32 flex flex-col justify-center items-center text-2xl">
      <h1 class="text-2xl font-semibold ">万家饺子（软件园E18店）</h1>
      <p class="text-xl font-medium text-gray-500 mt-px">&#165;15起送 &#165;3配送</p>
      <p class="text-xl font-medium text-gray-500 mt-px">各种饺子炒菜</p>
    </div>

    <!--食品列表部分-->
    <div v-for="item in itemList" :key="item['foodId']" class="w-full box-border px-1 py-2 select-none flex justify-between items-center">
      <div class="flex box-content items-center">
        <img class="w-18 h-auto" :src="item['foodImg']">
        <div class="ml-2 ">
          <h3 class="text-sm font-semibold text-gray-600">{{ item['foodName'] }}</h3>
          <p class="text-xs leading-loose font-normal text-gray-500 ">{{item['foodExplain']}}</p>
          <p class="text-xs text-gray-500 font-normal " >&#165;{{ item['foodPrice'] }}</p>
        </div>
      </div>
      <div class="w-auto flex items-center">
        <button @click="decreaseQuantity(item['foodId'], item['foodPrice'])">
          <i class="fa fa-minus-circle fa-2x mx-3 text-5xl i-ion-remove-circle-outline cursor-pointer">-</i>
        </button>
        <p class="text-s text-gray-600 mx-3">{{　item['quantity'] }}</p>
        <button @click="increaseQuantity(item['foodId'], item['foodPrice'])">
          <i class="fa fa-minus-circle fa-2x mx-3 text-3xl i-ion-add-circle-outline cursor-pointer">+</i>
        </button>
      </div>
    </div>

    <!--购物车部分-->
    <div class="w-full h-18 fixed left-0 bottom-0 flex text-base">
      <div class=" bg-gray-700 basis-2/3 flex">
        <div class="w-20 h-20 box-border border-solid border-8 border-gray-700 rounded-full  bg-blue-500  text-white flex  justify-center items-center -mt-2 -ml-1 relative">
          <i class="fa fa-shopping-cart fa-2x"></i>
          <div class="w-5 h-5 rounded-full bg-red-600 text-white text-xs flex justify-center items-center absolute -right-1 -top-1">{{ orderQuantity }}</div>
        </div>
        <div class="flex-col items-center p-2">
          <p class="text-2xl text-white ">&#165;{{ orderCost }}</p>
          <p class="text-xs text-gray-500">另需配送费3元</p>
        </div>
      </div>
      <div class="basis-1/3">
        <button class="w-full h-full bg-green-500 text-white text-2xl font-bold select-none cursor-pointer flex justify-center items-center"
                @click="checkout">去结算
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>