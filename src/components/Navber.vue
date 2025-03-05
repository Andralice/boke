<template>
  <div class="NavBer">
    <router-link to="/"></router-link>
  </div>
  <router-view></router-view>
</template>

<script lang="ts" name="NavBer" setup >
import { RouterLink,RouterView} from 'vue-router';
</script>

<style scoped>

</style>



