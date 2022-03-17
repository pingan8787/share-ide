// https://router.vuejs.org/zh/guide/#javascript

import { createRouter, createWebHashHistory } from 'vue-router'

import IndexPage from '@/pages/index.vue';
import SchemaPage from '@/pages/schema.vue';

const routes = [
    { path: '/', component: IndexPage },
    { path: '/schema', component: SchemaPage },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
