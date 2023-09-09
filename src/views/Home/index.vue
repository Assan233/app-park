<template>
    <Layout>
        <!-- 头部导航 -->
        <LayoutHeader class="header">
            <div class="logo" />
            <Menu
                v-model:selectedKeys="selectedKeys1"
                mode="horizontal"
                :style="{ lineHeight: '64px' }"
            >
                <MenuItem key="3">nav 1</MenuItem>
            </Menu>
        </LayoutHeader>

        <!-- 内容模块 -->
        <Layout class="body">
            <router-view></router-view>
        </Layout>
    </Layout>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import {
    Layout,
    LayoutHeader,
    LayoutSider,
    LayoutContent,
    MenuItem,
    SubMenu,
    Menu,
    // BreadcrumbItem,
    // Breadcrumb,
} from "ant-design-vue";
import { UserOutlined, LaptopOutlined } from "@ant-design/icons-vue";

const selectedKeys1 = ref<string[]>(["2"]);
const selectedKeys2 = ref<string[]>(["1"]);
const openKeys = ref<string[]>(["sub1"]);
</script>

<style scoped lang="less" src="./index.less"></style>
