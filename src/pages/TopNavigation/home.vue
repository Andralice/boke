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
        </div>
        <div class="row row2">
          <div class="region region3">
            <div class="header">
              <img src="@/assets/images/StatementStatistics.png" alt="" class="icon">
              <h3>报表统计</h3>
            </div>
            <div class="chart-container">
              <canvas id="reportChart" width="1000" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
      <aside class="notifications">
        <h3>通知消息</h3>
        <ul>
          <li>
            <img src="@/assets/images/Notification.png" alt="Notification Icon" class="notification-icon">
            通知1
          </li>
          <li>
            <img src="@/assets/images/Notification.png" alt="Notification Icon" class="notification-icon">
            通知2
          </li>
          <li>
            <img src="@/assets/images/Notification.png" alt="Notification Icon" class="notification-icon">
            通知3
          </li>
          <!-- 更多通知消息 -->
        </ul>
      </aside>
    </div>
  </div>
</template>

<script lang="ts" setup name='home'>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const badgeTexts = ref({
  blue: '实时',
  cyan: '实时',
  green: '实时',
  lightGreen: '实时'
});

let reportChartInstance: any;

onMounted(() => {
  const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
  
  // 获取最近七天的日期
  const labels = getRecentDates(7);

  // 示例数据
  const data = [500, 1000, 1500, 1200, 1800, 1600, 1900];

  reportChartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: '库存量',
        data: data,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 2000,
          ticks: {
            stepSize: 500
          }
        }
      }
    }
  });
});

function getRecentDates(days: number): string[] {
  const dates: string[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dates.push(date.toLocaleDateString());
  }
  return dates;
}
</script>

<style scoped>
.container {
  background-color: skyblue;
  padding-top: 70px;
  display: flex;
  height: 830px;
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
  display: flex;
  align-items: center;
}

.notification-icon {
  width: 20px;
  height: 20px;
  margin-right: 10px;
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
  flex: 0.4;
  height: 260px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
}

.row1 .region1 .header,
.row1 .region2 .header,
.row2 .region3 .header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.row1 .region1 .header .icon,
.row1 .region2 .header .icon,
.row2 .region3 .header .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.row1 .region1 .header h3,
.row1 .region2 .header h3,
.row2 .region3 .header h3 {
  margin: 0;
}

.row1 .region1 .data-rows {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 50px); /* 减去header的高度 */
}

.row1 .region1 .data-row {
  display: flex;
  justify-content: space-between;
}

.row1 .region1 .data-box {
  position: relative;
  flex: 0.48;
  height: 80px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中 */
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
  display: flex;
  flex-direction: column;
  align-items: flex-start; /* 调整为左对齐 */
}

.row1 .region2 .header {
  align-self: flex-start; /* 确保标题在左上角 */
}

.row1 .region2 .box-container {
  display: flex;
  gap: 15px; /* 设置间距为15px */
  justify-content: center; /* 水平居中 */
  margin-top: 10px;
}

.row1 .region2 .small-box {
  width: 150px;
  height: 180px;
  background-color: #fff;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.row1 .region2 .small-box .box-title {
  font-size: 24px;
  margin-bottom: 5px;
}

.row1 .region2 .small-box .box-image {
  width: 80px;
  height: 80px;
}

.row2 .region3 {
  flex: 0.6;
  height: 445px;
  flex-grow: 1;
  background-color: #ced4da;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 350px; /* 设置容器高度为350px */
}

.icon {
  width: 24px;
  height: 24px;
}
</style>



