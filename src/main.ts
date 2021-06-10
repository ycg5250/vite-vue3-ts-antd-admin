import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';

// createApp(App).mount('#app')

const app = createApp(App)

app.use(Antd);

app.use(router)

app.mount('#app')
