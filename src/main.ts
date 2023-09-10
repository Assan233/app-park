import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import { createPinia } from 'pinia'

import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';

import "./style.css";
import App from "./App.vue";
import { routes } from "./routes";

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
});

const app = createApp(App);

app.use(router);
app.use(Antd);
app.use(createPinia())

app.mount("#app");
