import {createRouter, createWebHashHistory} from "vue-router";

import type{RouteRecord, RouteRecordRaw} from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        component:()=>import('@/Components_page/Login.vue')
    },
    {
        path:"/Register",
        component:()=>import('@/Components_page/Register.vue')
    },
    {
        name:"BusinessInfo",
        path:"/BusinessInfo",
        component:()=>import('@/Components_page/BusinessInfo.vue')
    },
    {
        name:"BusinessList",
        path:"/BusinessList",
        component:()=>import('@/Components_page/BusinessList.vue')
    },
    {
        path:"/Index",
        component:()=>import('@/Components_page/Index.vue')
    },
    {
        name:"Order",
        path:"/Order",
        component:()=>import('@/Components_page/Order.vue')
    },
    {
        name:"OrderList",
        path:"/OrderList",
        component:()=>import('@/Components_page/OrderList.vue')
    },
    {
        name:"Payment",
        path:"/Payment",
        component:()=>import('@/Components_page/Payment.vue')
    },
    {
        name:"UserAddress",
        path:"/UserAddress",
        component:()=>import('@/Components_page/UserAddress.vue')
    },
    {
        name:"AddUserAddress",
        path:"/AddUserAddress",
        component:()=>import('@/Components_page/AddUserAddress.vue')
    },
    {
        name:"EditUserAddress",
        path:"/EditUserAddress",
        component:()=>import('@/Components_page/EditUserAddress.vue')
    },

]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router