<template>
  <div class="region region1">
    <div class="header">
      <img src="@/assets/images/Data.png" alt="" class="icon">
      <h3>数据统计</h3>
    </div>
    <div class="data-rows">
      <div class="data-row">
        <div class="data-box blue" :data-badge="badgeTexts.blue">
          <div class="box-title">仓库数量</div>
          <div class="box-number">4</div>
          <div class="box-description">当前分类记录数</div>
        </div>
        <div class="data-box cyan" :data-badge="badgeTexts.cyan">
          <div class="box-title">库存金额统计</div>
          <div class="box-number">12003</div>
          <div class="box-description">当前分类记录数</div>
        </div>
      </div>
      <div class="data-row">
        <div class="data-box green" :data-badge="badgeTexts.green">
          <div class="box-title">记录数</div>
          <div class="box-number">7</div>
          <div class="box-description">当前分类记录数</div>
        </div>
        <div class="data-box light-green" :data-badge="badgeTexts.lightGreen">
          <div class="box-title">仓库流水</div>
          <div class="box-number">12</div>
          <div class="box-description">当前分类记录数</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const badgeTexts = ref({
  blue: '实时',
  cyan: '实时',
  green: '实时',
  lightGreen: '实时'
});
</script>

<style scoped>
.region.region1 {
  flex: 0.4;
  height: 260px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #ddd;
  padding: 20px;
}

.region.region1 .header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.region.region1 .header .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.region.region1 .header h3 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.region.region1 .data-rows {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 50px);
}

.region.region1 .data-row {
  display: flex;
  justify-content: space-between;
}

.region.region1 .data-box {
  position: relative;
  flex: 0.48;
  height: 80px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
}

.region.region1 .data-box .box-title,
.region.region1 .data-box .box-number,
.region.region1 .data-box .box-description {
  text-align: center;
  padding: 3px;
  font-size: 1em;
}

.region.region1 .data-box::before {
  content: attr(data-badge);
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 20px;
  background-color: inherit;
  border-radius: 4px;
  color: white;
  font-size: 0.9em;
  line-height: 15px;
  text-align: center;
}

.region.region1 .data-box.blue::before {
  background-color: blue;
}

.region.region1 .data-box.cyan::before {
  background-color: cyan;
}

.region.region1 .data-box.green::before {
  background-color: green;
}

.region.region1 .data-box.light-green::before {
  background-color: lightgreen;
}
</style>