<template>
  <div class="container">
    <div class="sidebar">
      <h2>导航菜单</h2>
      <ul>
        <li><a href="#overview">概览</a></li>
        <li><a href="#inventory">库存管理</a></li>
        <li><a href="#orders">订单管理</a></li>
        <li><a href="#suppliers">供应商管理</a></li>
        <li><a href="#reports">报表分析</a></li>
      </ul>
    </div>
    <div class="content">
      <div class="main-content">
        <div class="row row1">
          <div class="region region1">
            <h3>数据统计</h3>
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
          <div class="region region2">
            <!-- 区域2 -->
            区域2内容
          </div>
        </div>
        <div class="row row2">
          <div class="region region3">
            <!-- 区域3 -->
            区域3内容
          </div>
          <div class="region region4">
            <!-- 区域4 -->
            区域4内容
          </div>
        </div>
      </div>
      <aside class="notifications">
        <h3>通知消息</h3>
        <ul>
          <li>通知1</li>
          <li>通知2</li>
          <li>通知3</li>
          <!-- 更多通知消息 -->
        </ul>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup name='home'>
import { ref } from 'vue';

const badgeTexts = ref({
  blue: '实时',
  cyan: '实时',
  green: '实时',
  lightGreen: '实时'
});
</script>

<style scoped>
.container {
  padding-top: 70px;
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #f4f4f4;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 820px;
}

.sidebar h2 {
  margin-top: 0;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

.sidebar li {
  margin: 10px 0;
}

.sidebar a {
  text-decoration: none;
  color: #333;
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

.notifications {
  width: 300px;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: 820px;
}

.notifications h3 {
  margin-top: 0;
}

.notifications ul {
  list-style-type: none;
  padding: 0;
  flex-grow: 1;
}

.notifications li {
  margin: 10px 0;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.region {
  padding: 20px;
  border: 1px solid #ddd;
}

.row1 .region1 {
  flex: 0.5;
  height: 260px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
}

.row1 .region1 h3 {
  margin-top: 0;
  align-self: flex-start;
}

.row1 .region1 .data-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.row1 .region1 .data-box {
  position: relative;
  flex: 0.48;
  height: 80px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* 左对齐 */
  align-items: flex-start; /* 左对齐 */
  padding: 10px; /* 添加内边距以便内容不贴边 */
}

.row1 .region1 .data-box .box-title,
.row1 .region1 .data-box .box-number,
.row1 .region1 .data-box .box-description {
  text-align: center;
  padding: 3px;
  font-size: 18px;
}

.row1 .region1 .data-box::before {
  content: attr(data-badge);
  position: absolute;
  top: 10px;
  right: 10px;
  width: 40px;
  height: 20px;
  background-color: inherit;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  line-height: 15px;
  text-align: center;
}

.row1 .region1 .data-box.blue {
  background-color: #fff;
}

.row1 .region1 .data-box.blue::before {
  background-color: blue;
}

.row1 .region1 .data-box.cyan {
  background-color: #fff;
}

.row1 .region1 .data-box.cyan::before {
  background-color: cyan;
}

.row1 .region1 .data-box.green {
  background-color: #fff;
}

.row1 .region1 .data-box.green::before {
  background-color: green;
}

.row1 .region1 .data-box.light-green {
  background-color: #fff;
}

.row1 .region1 .data-box.light-green::before {
  background-color: lightgreen;
}

.row1 .region2 {
  flex: 0.6;
  height: 260px;
  background-color: #dee2e6;
}

.row2 .region3 {
  flex: 0.6;
  height: 500px;
  flex-grow: 1;
  background-color: #ced4da;
}

.row2 .region4 {
  flex: 0.4;
  height: 500px;
  flex-grow: 1;
  background-color: #adb5bd;
}
</style>



