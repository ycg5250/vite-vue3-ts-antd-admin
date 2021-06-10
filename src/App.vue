<template>
  <!-- <Home /> -->
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { Button } from "ant-design-vue";
import Home from "./views/home/Home.vue";

export default defineComponent({
  name: "App",
  components: {
    // Button,
    Home,
  },
});
</script>

<style>
</style>
