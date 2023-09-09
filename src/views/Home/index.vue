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
                <template v-for="item in routes">
                    <MenuItem v-if="item?.meta" :key="item.path">
                        {{ item.meta?.pageName }}
                    </MenuItem>
                </template>
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
import { Layout, LayoutHeader, MenuItem, Menu } from "ant-design-vue";
import { routes } from "@/routes";

const selectedKeys1 = ref<string[]>(["2"]);
</script>

<style scoped lang="less" src="./index.less"></style>
