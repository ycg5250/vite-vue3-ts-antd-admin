import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import 'ant-design-vue/dist/antd.css';



import { getAuthHeader } from './global'

// createApp(App).mount('#app')

const app = createApp(App)

// 挂载全局访问属方法获取
app.config.globalProperties.$getAuthheader = getAuthHeader()

app.use(Antd);

app.use(router)

app.mount('#app')
