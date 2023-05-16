<script setup>
import { defineAsyncComponent } from "vue";
const Component = defineAsyncComponent(() => import("./Async.vue"));
</script>

<template>
  <div>Hello from root!</div>
  <component :is="Component"/>
</template>
