<template>
  <div class="container">
    <div class="row_left">
      <div class="row_top">
        <DataStatistics />
        <!-- <QuickAccess /> -->
      </div>
      <div class="row_bottom">
        <ReportStatistics />
      </div>
    </div>
    <div class="row_right">
      <QuickAccess />
      <!-- <Notifications /> -->
    </div>
  </div>
</template>

<script lang="ts" setup name="home_index">
import DataStatistics from './DataStatistics.vue';
import QuickAccess from './QuickAccess.vue';
import ReportStatistics from './ReportStatistics.vue';
import Notifications from './Notifications.vue';
</script>

<style scoped>
.container {
  height: 80%;
  display: flex;/* 略微暗淡一些的白色 */
}

.row_left {
  flex: 0.85;
  flex-direction: column;
  padding-right: 20px;
}
.row_right{
  flex: 0.1;
}

.row_top {
  display: flex;
  height: 30%; /* 设置高度为30% */
}
.row_bottom {
  height: 70%; /* 设置高度为70% */
}

</style>