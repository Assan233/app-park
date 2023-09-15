<template>
    <Row align="middle">
        <Col :span="18">
            <TypographyTitle>观众</TypographyTitle>
        </Col>
        <Col :span="6">
            <Button
                size="large"
                type="primary"
                @click="startWatchLive(roomId, video)"
                >连接直播间</Button
            >
        </Col>
    </Row>
    <video class="rtc__video" ref="video" autoplay></video>
</template>

<script setup lang="ts">
import { Row, Col, Button, TypographyTitle } from "ant-design-vue";
import { useAnswer } from "./index";
import { ref } from "vue";
const roomId = "assan-live-room";

const video = ref<HTMLVideoElement>(null!);
const { startWatchLive } = useAnswer();
</script>
<style scoped lang="less">
.rtc {
    &__video {
        width: 1800px;
        margin: 24px;
        border-radius: 8px;
        border: 2px dashed rgba(0, 0, 0, 0.122);
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
            0 3px 6px -4px rgba(0, 0, 0, 0.12),
            0 9px 28px 8px rgba(0, 0, 0, 0.05);
    }
}
</style>
.
