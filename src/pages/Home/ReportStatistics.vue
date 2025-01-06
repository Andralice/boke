<template>
  <div class="region region3">
    <div class="header">
      <img src="@/assets/images/StatementStatistics.png" alt="" class="icon">
      <h3>报表统计</h3>
    </div>
    <div class="checkbox-container">
      <label>
        <input type="checkbox" v-model="showWarehouseStocks" @change="updateChart"> 仓库库存
      </label>
      <label>
        <input type="checkbox" v-model="showProductStocks" @change="updateChart"> 商品库存
      </label>
      <label>
        <input type="checkbox" v-model="showCategoryStocks" @change="updateChart"> 种类库存
      </label>
      <label>
        <input type="checkbox" v-model="showOutboundQuantity" @change="updateChart"> 出库数量
      </label>
      <label>
        <input type="checkbox" v-model="showInboundQuantity" @change="updateChart"> 入库数量
      </label>
    </div>
    <div class="chart-container">
      <canvas id="reportChart" width="1000" height="400"></canvas>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Chart from 'chart.js/auto';

const showWarehouseStocks = ref(true); // 默认勾选仓库库存
const showProductStocks = ref(true); // 默认勾选商品库存
const showCategoryStocks = ref(true); // 默认勾选种类库存
const showOutboundQuantity = ref(true); // 默认勾选出库数量
const showInboundQuantity = ref(true); // 默认勾选入库数量

let chartInstance: Chart;

onMounted(() => {
  updateChart();
});

function updateChart() {
  const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
  const labels = getProductNames(); // 获取商品名称
  const datasets = [];

  if (showWarehouseStocks.value) {
    datasets.push({
      label: '仓库库存',
      data: getWarehouseStocks(), // 获取仓库库存数据
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    });
  }

  if (showProductStocks.value) {
    datasets.push({
      label: '商品库存',
      data: getProductStocks(), // 获取商品库存数据
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1
    });
  }

  if (showCategoryStocks.value) {
    datasets.push({
      label: '种类库存',
      data: getCategoryStocks(), // 获取种类库存数据
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1
    });
  }

  if (showOutboundQuantity.value) {
    datasets.push({
      label: '出库数量',
      data: getOutboundQuantities(), // 获取出库数量数据
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1
    });
  }

  if (showInboundQuantity.value) {
    datasets.push({
      label: '入库数量',
      data: getInboundQuantities(), // 获取入库数量数据
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    });
  }

  if (chartInstance) {
    chartInstance.data.datasets = datasets;
    chartInstance.update();
  } else {
    chartInstance = new Chart(ctx, {
      type: 'bar', // 修改图表类型为柱状图
      data: {
        labels: labels,
        datasets: datasets
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
  }
}

function getProductNames(): string[] {
  // 假设我们有以下商品名称
  return ['商品A', '商品B', '商品C', '商品D', '商品E', '商品F'];
}

function getWarehouseStocks(): number[] {
  // 假设我们有以下仓库库存数据
  return [1500, 2000, 2500, 1800, 2200, 2100];
}

function getProductStocks(): number[] {
  // 假设我们有以下商品库存数据
  return [500, 1000, 1500, 1200, 1800, 1600];
}

function getCategoryStocks(): number[] {
  // 假设我们有以下种类库存数据
  return [300, 600, 900, 700, 1100, 1000];
}

function getOutboundQuantities(): number[] {
  // 假设我们有以下出库数量数据
  return [200, 400, 600, 500, 700, 600];
}

function getInboundQuantities(): number[] {
  // 假设我们有以下入库数量数据
  return [700, 1400, 2100, 1700, 2100, 2000];
}
</script>

<style scoped>
.region.region3 {
  height: 100%;
  flex-grow: 1;
  background-color: #ced4da;
  border: 1px solid #ddd;
  padding: 20px;
}

.region.region3 .header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.region.region3 .header .icon {
  margin-right: 10px;
  width: 24px;
  height: 24px;
}

.region.region3 .header h3 {
  margin: 0;
  font-size: 1.2em;
  color: #333;
}

.chart-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 450px;
}

.checkbox-container {
  margin-bottom: 10px;
}

.checkbox-container label {
  margin-right: 10px;
}
</style>