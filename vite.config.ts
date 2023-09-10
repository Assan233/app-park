import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "node:path";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        // 启动 https ，需要配合插件 vite-plugin-mkcert 启动
        https: true,
        port: 3000,
    },

    resolve: {
        alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
    },
    plugins: [
        vue(),
        // 通过 unplugin-vue-components 做antd组件按需加载
        Components({
            resolvers: [
                AntDesignVueResolver({
                    importStyle: false, // css in js
                }),
            ],
        }),
        // 生成 启动https本地服务 所需的证书
        basicSsl(),
    ],
});
