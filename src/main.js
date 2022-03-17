import { createApp } from 'vue';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import router from '@/router';
import App from './App.vue';
import { globalRegister } from '@/utils/globalRegister';

let app = createApp(App);

app.use(router);
app.use(ElementPlus);

app = await globalRegister(app);

app.mount('#app');
