<template>
  <div class="region region1">
    <div class="header">
      <img src="@/assets/images/Data.png" alt="" class="icon">
      <h3>数据统计</h3>
    </div>
    <div class="data-rows">
      <div class="data-row">
        <div class="data-box blue" @mouseenter="showBadge('blue')" @mouseleave="hideBadge('blue')">
          <div class="box-title">仓库数量</div>
          <div class="box-number">4</div>
          <div class="box-description">当前分类记录数</div>
          <div class="badge" v-if="badgeVisibility.blue">{{ badgeTexts.blue }}</div>
        </div>
        <div class="data-box cyan" @mouseenter="showBadge('cyan')" @mouseleave="hideBadge('cyan')">
          <div class="box-title">库存金额统计</div>
          <div class="box-number">12003</div>
          <div class="box-description">当前分类记录数</div>
          <div class="badge" v-if="badgeVisibility.cyan">{{ badgeTexts.cyan }}</div>
        </div>
      </div>
      <div class="data-row">
        <div class="data-box green" @mouseenter="showBadge('green')" @mouseleave="hideBadge('green')">
          <div class="box-title">记录数</div>
          <div class="box-number">7</div>
          <div class="box-description">当前分类记录数</div>
          <div class="badge" v-if="badgeVisibility.green">{{ badgeTexts.green }}</div>
        </div>
        <div class="data-box light-green" @mouseenter="showBadge('lightGreen')" @mouseleave="hideBadge('lightGreen')">
          <div class="box-title">仓库流水</div>
          <div class="box-number">12</div>
          <div class="box-description">当前分类记录数</div>
          <div class="badge" v-if="badgeVisibility.lightGreen">{{ badgeTexts.lightGreen }}</div>
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

const badgeVisibility = ref({
  blue: false,
  cyan: false,
  green: false,
  lightGreen: false
});

function showBadge(color: string) {
  badgeVisibility.value[color] = true;
}

function hideBadge(color: string) {
  badgeVisibility.value[color] = false;
}
</script>

<style scoped>
.region.region1 {
  width: 100%;
  max-width: 800px;
  margin: auto;
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  padding: 20px;
}

.region.region1 .header {
  display: flex;
  align-items: center;
  padding-bottom: 15px;
  border-bottom: 1px solid #e0e0e0;
}

.region.region1 .header .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.region.region1 .header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
  font-weight: bold;
}

.region.region1 .data-rows {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-top: 20px;
}

.region.region1 .data-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
}

.region.region1 .data-box {
  flex: 1;
  min-height: 100px;
  padding: 15px;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.region.region1 .data-box:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.region.region1 .data-box .badge {
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
  text-align: center;
  color: white;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.6);
}

.region.region1 .data-box.blue {
  background: linear-gradient(135deg, #1e90ff, #00bfff);
}

.region.region1 .data-box.cyan {
  background: linear-gradient(135deg, #00ced1, #20b2aa);
}

.region.region1 .data-box.green {
  background: linear-gradient(135deg, #32cd32, #7cfc00);
}

.region.region1 .data-box.light-green {
  background: linear-gradient(135deg, #7cfc00, #32cd32);
}

.region.region1 .data-box .box-title {
  font-size: 1.1em;
  color: white;
  font-weight: bold;
  margin-bottom: 5px;
}

.region.region1 .data-box .box-number {
  font-size: 2em;
  font-weight: bold;
  color: white;
  margin-bottom: 5px;
}

.region.region1 .data-box .box-description {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.7);
}
</style>