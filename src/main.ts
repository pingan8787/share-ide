import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import draggable from 'vuedraggable';

import router from '@/router';
import App from './App.vue';
import { globalRegisterComponent, globalRegisterIcon, globalRegisterConfig } from '@/utils/globalRegister';
import { registerSchema } from '@/utils/registerSchema';

let app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(ElementPlus);

app.component("draggable", draggable);
app = globalRegisterComponent(app);
// app = globalRegisterConfig(app); // 暂时不需要，每个类型组件直接引用配置文件即可
app = globalRegisterIcon(app);
app = registerSchema(app);

app.mount('#app');
