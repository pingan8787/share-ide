import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router';
import App from './App.vue';
import { globalRegister } from '@/utils/globalRegister';
import { registerSchema } from '@/utils/registerSchema';

let app = createApp(App);

app.use(router);
app.use(createPinia());
app.use(ElementPlus);

app = await globalRegister(app);
app = await registerSchema(app);

app.mount('#app');
