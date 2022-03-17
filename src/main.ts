import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import draggable from 'vuedraggable'

import router from '@/router';
import App from './App.vue';
import { globalRegister, globalRegisterIcon } from '@/utils/globalRegister';
import { registerSchema } from '@/utils/registerSchema';

let app = createApp(App);


app.use(router);
app.use(createPinia());
app.use(ElementPlus);

app.component("draggable", draggable);
app = await globalRegister(app);
app = await globalRegisterIcon(app);
app = await registerSchema(app);

app.mount('#app');
