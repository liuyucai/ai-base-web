import { createApp } from 'vue'
import App from './App.vue'

import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import ElementPlus from 'element-plus'
import locale from 'element-plus/dist/locale/zh-cn'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import './assets/iconfont/iconfont.css'
import router from './router/index.ts';


const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, { locale });
app.use(router);
app.mount('#app')
