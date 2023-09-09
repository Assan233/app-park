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
            <!-- 侧边导航 -->
            <LayoutSider width="200" class="body__side">
                <Menu
                    v-model:selectedKeys="selectedKeys2"
                    v-model:openKeys="openKeys"
                    mode="inline"
                    :style="{ height: '100%', borderRight: 0 }"
                >
                    <SubMenu key="sub1">
                        <template #title>
                            <span> <user-outlined /> subnav 1 </span>
                        </template>
                        <MenuItem key="1">option1</MenuItem>
                    </SubMenu>
                    <SubMenu key="sub2">
                        <template #title>
                            <span> <laptop-outlined /> subnav 2 </span>
                        </template>
                        <MenuItem key="5">option5</MenuItem>
                    </SubMenu>
                </Menu>
            </LayoutSider>

            <!-- 内容 -->
            <Layout class="body__content">
                <!-- <Breadcrumb style="margin: 16px 0">
                    <BreadcrumbItem>Home</BreadcrumbItem>
                    <BreadcrumbItem>List</BreadcrumbItem>
                    <BreadcrumbItem>App</BreadcrumbItem>
                </Breadcrumb> -->
                <LayoutContent class="body__content__page">
                    Content
                </LayoutContent>
            </Layout>
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
<style scoped lang="less">
.header {
    .logo {
        float: left;
        width: 64px;
        height: 64px;
        background-image: url("@/assets/Assan.png");
        background-repeat: no-repeat;
        background-size: contain;
        margin-right: 24px;
    }
}
.body {
    &__side {
        background: #fff;
    }
    &__content {
        padding: 0 24px 24px;
        &__page {
            background: #fff;
            padding: 24px;
            margin: 0;
            min-height: 280px;
        }
    }
}
</style>
