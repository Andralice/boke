<template>
  <div class="container">
    <Sidebar />
    <div class="content">
      <div class="main-content">
        <div class="row row1">
          <DataStatistics />
          <QuickAccess />
        </div>
        <div class="row row2">
          <ReportStatistics />
        </div>
      </div>
      <Notifications />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Sidebar from './Home/Sidebar.vue';
import DataStatistics from './Home/DataStatistics.vue';
import QuickAccess from './Home/QuickAccess.vue';
import ReportStatistics from './Home/ReportStatistics.vue';
import Notifications from './Home/Notifications.vue';
</script>

<style scoped>
.container {
  display: flex;
  height: 920px;
}

.content {
  display: flex;
  flex-grow: 1;
  height: 100%;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.row {
  display: flex;
  flex-wrap: wrap;
}
</style>