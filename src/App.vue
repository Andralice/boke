<template>
<div class="boke">
  <navber/>
    <router-view></router-view>
</div>
</template>
<script setup lang="ts" name="boke">
import Navber from './components/Navber.vue';
import {RouterLink,RouterView}from 'vue-router'
</script>

<style scoped>

</style>
