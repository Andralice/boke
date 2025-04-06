<template>
  <div class="region region3">
    <div class="container">
      <div class="header">
        <span class="icon report-statistics-icon"></span>
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
      <div class="pagination-container">
        <button @click="prevPage" :disabled="currentPage === 0">上一页</button>
        <span>{{ currentPage + 1 }} / {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages - 1">下一页</button>
      </div>
      <div class="chart-container">
        <canvas id="reportChart" width="800" height="300"></canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { PanelAllData } from '@/api/Data/allData';

// 注册所有Chart.js插件
Chart.register(...registerables);

const showWarehouseStocks = ref(true); // 默认勾选仓库库存
const showProductStocks = ref(true); // 默认勾选商品库存
const showCategoryStocks = ref(true); // 默认勾选种类库存
const showOutboundQuantity = ref(true); // 默认勾选出库数量
const showInboundQuantity = ref(true); // 默认勾选入库数量

let chartInstance: any;
const products = ref([]);
const currentPage = ref(0);
const pageSize = 5;

onMounted(async () => {
  await loadData();
  updateChart();
});

async function loadData() {
  try {
    const response = await PanelAllData(); // 假设这是你的API调用函数
    console.log(response);
    products.value = response.product.productList.slice(0, 50); // 假设最多展示前50个商品
  } catch (error) {
    console.error('加载数据失败:', error);
  }
}

function updateChart() {
  const ctx = document.getElementById('reportChart') as HTMLCanvasElement;
  const labels = getProductNames(); // 获取当前页面的商品名称
  const datasets = [];

  if (showWarehouseStocks.value) {
    datasets.push({
      label: '仓库库存',
      data: getWarehouseStocks(), // 获取仓库库存数据
      backgroundColor: 'rgba(75, 192, 192, 0.8)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    });
  }

  if (showProductStocks.value) {
    datasets.push({
      label: '商品库存',
      data: getProductStocks(), // 获取商品库存数据
      backgroundColor: 'rgba(153, 102, 255, 0.8)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    });
  }

  if (showCategoryStocks.value) {
    datasets.push({
      label: '种类库存',
      data: getCategoryStocks(), // 获取种类库存数据
      backgroundColor: 'rgba(255, 159, 64, 0.8)',
      borderColor: 'rgba(255, 159, 64, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    });
  }

  if (showOutboundQuantity.value) {
    datasets.push({
      label: '出库数量',
      data: getOutboundQuantities(), // 获取出库数量数据
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
      borderColor: 'rgba(255, 99, 132, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    });
  }

  if (showInboundQuantity.value) {
    datasets.push({
      label: '入库数量',
      data: getInboundQuantities(), // 获取入库数量数据
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1,
      barPercentage: 0.6,
      categoryPercentage: 0.6,
    });
  }

  if (chartInstance) {
    chartInstance.data.labels = labels;
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
        responsive: true,
        scales: {
          x: {
            grid: {
              color: '#e0e0e0',
              drawBorder: false,
            },
            ticks: {
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#333'
            }
          },
          y: {
            beginAtZero: true,
            max: 2000,
            ticks: {
              stepSize: 500,
              font: {
                size: 12,
                family: 'Arial',
              },
              color: '#333'
            },
            grid: {
              color: '#e0e0e0',
              drawBorder: false,
            }
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: 'Arial',
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: 10,
              boxHeight: 10,
              color: '#333'
            }
          },
          tooltip: {
            enabled: true,
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ${context.raw}`;
              }
            },
            bodyFont: {
              size: 14,
              family: 'Arial',
            },
            titleFont: {
              size: 14,
              family: 'Arial',
            },
            displayColors: false,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderColor: '#ddd',
            borderWidth: 1,
            cornerRadius: 4,
            padding: 10
          }
        }
      }
    });
  }
}

function getProductNames(): string[] {
  return currentProducts.value.map(product => product.productName);
}

function getWarehouseStocks(): number[] {
  return currentProducts.value.map(product => product.quantity);
}

function getProductStocks(): number[] {
  return currentProducts.value.map(product => product.addNum);
}

function getCategoryStocks(): number[] {
  return currentProducts.value.map(product => product.subNum);
}

function getOutboundQuantities(): number[] {
  return currentProducts.value.map(product => product.subNum);
}

function getInboundQuantities(): number[] {
  return currentProducts.value.map(product => product.addNum);
}

const currentProducts = computed(() => {
  const start = currentPage.value * pageSize;
  const end = start + pageSize;
  return products.value.slice(start, end);
});

const totalPages = computed(() => Math.ceil(products.value.length / pageSize));

function nextPage() {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    updateChart();
  }
}

function prevPage() {
  if (currentPage.value > 0) {
    currentPage.value--;
    updateChart();
  }
}
</script>

<style scoped>
.region.region3 {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}

.region.region3 .container {
  width: 100%;
  max-width: 1200px;
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  overflow: hidden;
}

.region.region3 .container:hover {
  transform: scale(1.02);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.region.region3 .header {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #e9ecef;
  border-bottom: 1px solid #ddd;
}

.region.region3 .header .icon.report-statistics-icon {
  display: inline-block;
  width: 32px;
  height: 32px;
  background-color: #1e90ff;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-right: 10px;
}

.region.region3 .header h3 {
  margin: 0;
  font-size: 1.5em;
  color: #333;
  font-weight: bold;
}

.checkbox-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.checkbox-container label {
  display: flex;
  align-items: center;
  font-size: 1em;
  color: #333;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 5px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
}

.pagination-container button {
  margin: 0 10px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
}

.pagination-container button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.chart-container {
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px; /* 减少高度 */
}

.chart-container canvas {
  width: 800px; /* 调整宽度 */
  height: 350px; /* 调整高度 */
}
</style>



