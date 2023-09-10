<template>
    <Layout>
        <!-- 头部导航 -->
        <LayoutHeader class="header">
            <div class="logo" />
            <Menu
                mode="horizontal"
                :items="MenuData"
                :style="{ lineHeight: '64px' }"
            >
            </Menu>
        </LayoutHeader>

        <!-- 内容模块 -->
        <Layout class="body">
            <router-view></router-view>
        </Layout>
    </Layout>
</template>
<script lang="ts" setup>
// import { ref } from "vue";
import { Layout, LayoutHeader, Menu } from "ant-design-vue";
import { MenuData } from "./const";
</script>

<style scoped lang="less" src="./index.less"></style>
