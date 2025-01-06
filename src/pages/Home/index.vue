<template>
  <div class="container">
    <div class="row_left">
      <div class="row_top">
        <DataStatistics />
        <QuickAccess />
      </div>
      <div class="row_bottom">
        <ReportStatistics />
      </div>
    </div>
    <div class="row_right">
      <Notifications />
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
  height: 100%;
  display: flex;
}
.row_left {
  flex: 0.8;
  flex-direction: column;
  padding-right: 20px;
  
}
.row_right {
  flex: 0.2;
}
.row_top {
  display: flex;
  height: 30%; /* 设置高度为260px */
  padding-top: 20px;
  padding-bottom: 40px;

}
.row_bottom {
  flex:70%; /* 占据剩余空间 */
}



</style>