<template>
    <Home>
        <Answer v-if="route.params.roomType === 'answer'"></Answer>
        <Offer v-else></Offer>
    </Home>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";

import Answer from "./answer/index.vue";
import Offer from "./offer/index.vue";
import Home from "@/views/home/index.vue";

const route = useRoute();
</script>
