<template>
    <Layout>
        <!-- 头部导航 -->
        <LayoutHeader class="header">
            <div class="logo" />
            <Menu
                v-model:active-key="activeKey"
                mode="horizontal"
                :items="MenuData"
                :style="{ lineHeight: '64px' }"
                @click="onJump"
            >
            </Menu>
        </LayoutHeader>

        <!-- 内容模块 -->
        <Layout class="body">
            <slot>
                <router-view></router-view>
            </slot>
        </Layout>
    </Layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { Layout, LayoutHeader, Menu } from "ant-design-vue";
import type { MenuInfo } from "ant-design-vue/es/menu/src/interface.d.ts";

import { MenuData } from "./const";

const router = useRouter();
const activeKey = ref<string[]>(null!);

/**
 * 跳转
 * @param {string} info:{key:string}
 */
function onJump(info: MenuInfo) {
    router.push({ path: info.key as string });
}
</script>

<style scoped lang="less" src="./index.less"></style>
