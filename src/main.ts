import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import draggable from 'vuedraggable';
import hljsVuePlugin from '@highlightjs/vue-plugin';

import router from '@/router';
import App from './App.vue';
import { globalRegisterComponent, globalRegisterIcon, globalRegisterConfig } from '@/utils/globalRegister';
import { registerSchema } from '@/utils/registerSchema';
import axios from '@/request/axios.config';
import eventBus from "@/event/eventBus";

import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/lib/common';

let app = createApp(App);
app.config.globalProperties.$api = axios;
app.config.globalProperties.$eventBus = eventBus;

app.use(router);
app.use(createPinia());
app.use(ElementPlus);
app.use(hljsVuePlugin);

app.config.errorHandler = (err, vm, info) => {
    console.log('[全局异常]', err, vm, info)
}

app.component("draggable", draggable);
app = globalRegisterComponent(app);
// app = globalRegisterConfig(app); // 暂时不需要，每个类型组件直接引用配置文件即可
app = globalRegisterIcon(app);
app = registerSchema(app);

app.mount('#app');
