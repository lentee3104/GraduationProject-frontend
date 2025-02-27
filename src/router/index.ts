import {createRouter, createWebHashHistory} from "vue-router";

import type{RouteRecord, RouteRecordRaw} from "vue-router";

const routes:Array<RouteRecordRaw> = [
    {
        path:"/",
        component:()=>import('@/Components_page/HomePage.vue')
    },
    {
        path:"/Login",
        component:()=>import('@/Components_page/Login.vue')
    },
    {
        path:"/Register",
        component:()=>import('@/Components_page/Register.vue')
    },
    {
        path:"/InstrumentPanel",
        component:()=>import('@/Components_page/InstrumentPanel.vue')
    },
    {
        path:"/PredictionPage",
        component:()=>import('@/Components_page/PredictionPage.vue')
    },
    {
        path:"/GuidePage",
        component:()=>import('@/Components_page/GuidePage.vue')
    },
    {
        path:"/ChatPage",
        component:()=>import('@/Components_page/ChatPage.vue')
    },
    {
        path:"/Login",
        component:()=>import('@/Components_page/Login.vue')
    },


]

const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router