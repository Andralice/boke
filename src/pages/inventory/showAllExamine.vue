<template>
    <div class="showStore-body">
        <h1>审核管理</h1>
        <!-- 筛选表单 -->
        <div class="filters">
            <div class="filter-row">
                <div class="filter-group">
                    <label>审核名称</label>
                    <input type="text" v-model="formData.examineName">
                </div>
                <div class="filter-group">
                    <label>审核状态</label>
                    <select v-model="formData.examineStatus">
                        <option value="0">未完成</option>
                        <option value="1">已通过</option>
                        <option value="2">已拒绝</option>
                    </select>
                </div>
                <div class="filter-group">
                    <button class="search-btn" @click="loadData">搜索</button>
                </div>
            </div>
        </div>

        <!-- 数据表格 -->
        <div class="data-table">
            <table>
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>审核名称</th>
                        <th>审核数据</th>
                        <th>审核状态</th>
                        <th>审核类型</th>
                        <th>创建时间</th>
                        <th>更新时间</th>
                        <th v-if="hasUnreviewedItems">操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in paginatedData" :key="item.examineId">
                        <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>
                        <td>{{ item.examineName }}</td>
                        <td>{{ item.displayExamineData }}</td>
                        <td>{{ item.examineStatus === '0' ? '未完成' : item.examineStatus === '1' ? '已通过' : '已拒绝' }}</td>
                        <td>{{ item.examineType === "add" ? '入库申请' : '出库申请' }}</td>
                        <td>{{ formatDate(item.createTime) }}</td>
                        <td>{{ formatDate(item.updateTime) }}</td>
                        <td v-if="item.examineStatus === '0'" class="actions">
                            <button @click="updateExamineStatus(item, '1')">审核通过</button>
                            <button @click="updateExamineStatus(item, '2')">审核拒绝</button>
                        </td>
                    </tr>
                    <tr v-if="paginatedData.length === 0">
                        <td colspan="9" class="no-data">暂无数据</td>
                    </tr>
                </tbody>
            </table>

            <!-- 分页控件 -->
            <div class="pagination">
                <button @click="prevPage" :disabled="currentPage === 1">上一页</button>
                <span>第 {{ currentPage }} 页 / 共 {{ totalPages }} 页</span>
                <button @click="nextPage" :disabled="currentPage === totalPages">下一页</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup name="showAllExamine">
import { ref, computed, onMounted } from 'vue';
import { selectAllExamine, UpdateExamine } from '@/api/Examine/examine';

interface FormData {
    examineId?: number;
    examineName: string;
    examineData: string;
    examineStatus: string;
    examineType: string;
    createTime?: string;
    updateTime?: string;
}

const formData = ref<FormData>({
    examineId: undefined,
    examineName: "",
    examineData: "",
    examineStatus: "0", // 默认设置为空
    examineType: "",
    createTime: undefined,
    updateTime: undefined
});

// 分页相关
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(1);
const pageList = ref<FormData[]>([]);

// 计算属性
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value));
const paginatedData = computed(() => pageList.value.slice((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value));

// 是否有未审核项
const hasUnreviewedItems = computed(() => paginatedData.value.some(item => item.examineStatus === '0'));

// 初始化加载数据
onMounted(() => {
    loadData();
});

// 加载数据方法
const loadData = async () => {
    try {
        // 过滤掉空值字段
        const params = Object.fromEntries(
            Object.entries(formData.value).filter(([key, value]) => value !== '' && value !== null)
        );

        const response = await selectAllExamine(params);

        if (Array.isArray(response.result)) {
            const processedData = response.result.map(item => {
                let displayExamineData = '';

                if (item.examineData) {
                    try {
                        const examineDataJson = JSON.parse(item.examineData);
                        displayExamineData = `${examineDataJson.stashName}的${examineDataJson.productName}更新${examineDataJson.quantity}`;
                    } catch (error) {
                        console.error("Failed to parse JSON string:", item.examineData, error);
                    }
                }

                return {
                    ...item,
                    displayExamineData
                };
            });

            pageList.value = processedData;
            totalItems.value = response.result.length; // 设置总项目数
        } else {
            console.error("response.result is not an array:", response.result);
        }
    } catch (error) {
        console.error('加载数据失败:', error);
    }
};

// 分页操作
const prevPage = () => {
    if (currentPage.value > 1) {
        currentPage.value--;
        loadData();
    }
};

const nextPage = () => {
    if (currentPage.value < totalPages.value) {
        currentPage.value++;
        loadData();
    }
};

const updateExamineStatus = async (item: FormData, status: string) => {
    try {
        item.examineStatus = status;
        const response = await UpdateExamine(item);
        console.log(response);
        loadData(); // 刷新数据
    } catch (error) {
        console.error('审核失败:', error);
    }
};

// 工具方法
const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString();
};
</script>

<style scoped>
.showStore-body {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.filters {
    background: #f5f7fa;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.filter-row {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-group label {
    min-width: 80px;
}

select,
input {
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 200px;
}

.search-btn,
.add-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.search-btn {
    background: #409eff;
    color: white;
}

.add-btn {
    background: #67c23a;
    color: white;
    margin-left: auto;
}

.data-table {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 12px 15px;
    max-width: 150px;
    text-align: left;
    border-bottom: 1px solid #ebeef5;
}

th {
    background: #fafafa;
    font-weight: 600;
}

tr:hover {
    background: #f5f7fa;
}

.pagination {
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;
}

.pagination button {
    padding: 8px 16px;
    border: 1px solid #ddd;
    background: white;
    cursor: pointer;
}

.pagination button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.no-data {
    text-align: center;
    color: #909399;
    padding: 20px;
}

.actions button {
    margin-right: 5px;
}
</style>



