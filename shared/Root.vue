<script setup>
import { defineAsyncComponent } from "vue";
const Component = defineAsyncComponent(() => import("./Async.vue"));
</script>

<template>
  <component :is="Component"/>
</template>
