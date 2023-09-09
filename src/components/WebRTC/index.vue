<template>
    <Row>
        <Col :span="24">
            <Button size="large" type="primary" @click="injectMedia(video)">开始投屏</Button>
        </Col>
    </Row>
    <video ref="video" autoplay></video>
</template>

<script setup lang="ts">
import { Row, Col, Button } from "ant-design-vue";
import { useMedia } from "./media.ts";
import { ref, onMounted } from "vue";

const { injectMedia } = useMedia();
const video = ref(null);
</script>
<style scoped lang="less"></style>
