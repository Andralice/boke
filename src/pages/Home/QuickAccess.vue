<template>
  <div class="region region2">
    <div class="header">
      <img src="@/assets/images/QuickAccess.png" alt="" class="icon">
      <h3>快捷入口</h3>
    </div>
    <div class="box-container">
      <div class="small-box">
        <div class="box-title">入库申请</div>
        <img src="@/assets/images/PutStorage.png" alt="Image 1" class="box-image">
      </div>
      <div class="small-box">
        <div class="box-title">出库申请</div>
        <img src="@/assets/images/DelStorage.png" alt="Image 2" class="box-image">
      </div>
      <div class="small-box">
        <div class="box-title">我的任务</div>
        <img src="@/assets/images/Task.png" alt="Image 3" class="box-image">
      </div>
      <div class="small-box">
        <div class="box-title">库存列表</div>
        <img src="@/assets/images/storage.png" alt="Image 4" class="box-image">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 必要的脚本部分
</script>

<style scoped>
.region.region2 {
  flex: 0.6;
  height: 260px;
  background-color: #dee2e6;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid #ddd;
  padding: 20px;
}

.region.region2 .header {
  align-self: flex-start;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.region.region2 .header .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.region.region2 .header h3 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.region.region2 .box-container {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 10px;
}

.region.region2 .small-box {
  width: 150px;
  height: 180px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.region.region2 .small-box .box-title {
  font-size: 1.2em;
  margin-bottom: 5px;
  color: #333;
}

.region.region2 .small-box .box-image {
  width: 80px;
  height: 80px;
}
</style>