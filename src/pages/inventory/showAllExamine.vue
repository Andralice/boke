<template>
    <div class="showStore-body">
        <h1 class="inventory-audit-title">库存审核</h1>
        <!-- 筛选表单 -->
        <el-form :model="formData" label-width="100px" size="medium" inline>
            <el-form-item label="审核名称">
                <el-input v-model="formData.examineName" placeholder="请输入审核名称" class="form-input"></el-input>
            </el-form-item>
            <el-form-item label="审核状态">
                <el-select v-model="formData.examineStatus" clearable placeholder="请选择审核状态" class="form-input">
                    <el-option label="未完成" value="0"></el-option>
                    <el-option label="已通过" value="1"></el-option>
                    <el-option label="已拒绝" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="loadData">搜索</el-button>
            </el-form-item>
        </el-form>

        <!-- 数据表格 -->
        <el-table :data="paginatedData" style="width: 100%" border stripe>
            <el-table-column prop="index" label="序号" width="60" align="center">
                <template #default="{ $index }">
                    {{ (currentPage - 1) * pageSize + $index + 1 }}
                </template>
            </el-table-column>
            <el-table-column prop="examineName" label="审核名称" min-width="150"></el-table-column>
            <el-table-column prop="displayExamineData" label="审核数据" min-width="150"></el-table-column>
            <el-table-column prop="examineStatus" label="审核状态" width="100" align="center">
                <template #default="{ row }">
                    <el-tag :type="getStatusTag(row.examineStatus)">
                        {{ row.examineStatus === '0' ? '未完成' : row.examineStatus === '1' ? '已通过' : '已拒绝' }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="examineType" label="审核类型" width="100" align="center">
                <template #default="{ row }">
                    {{ row.examineType === "add" ? '入库申请' : '出库申请' }}
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150" align="center">
                <template #default="{ row }">
                    {{ formatDate(row.createTime) }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="更新时间" width="150" align="center">
                <template #default="{ row }">
                    {{ formatDate(row.updateTime) }}
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="hasUnreviewedItems" width="150" fixed="right" align="center">
                <template #default="{ row }">
                    <el-button size="mini" type="text" @click="updateExamineStatus(row, '1')" v-if="row.examineStatus === '0'">通过</el-button>
                    <el-button size="mini" type="text" @click="updateExamineStatus(row, '2')" v-if="row.examineStatus === '0'">拒绝</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页控件 -->
        <el-pagination
            background
            layout="prev, pager, next"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="totalItems"
            @current-change="handleCurrentChange"
            style="margin-top: 20px; display: flex; justify-content: center;"
        ></el-pagination>
    </div>
</template>

<script lang="ts" setup name="showAllExamine">
import { ref, computed, onMounted } from 'vue';
import { ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElPagination, ElTag } from 'element-plus';
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
    examineStatus: "", // 默认设置为空
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
const handleCurrentChange = (newPage: number) => {
    currentPage.value = newPage;
    loadData();
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

const getStatusTag = (status: string) => {
    switch (status) {
        case '0':
            return 'warning';
        case '1':
            return 'success';
        case '2':
            return 'danger';
        default:
            return '';
    }
};
</script>

<style scoped>
.showStore-body {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
.el-form-item {
    margin-right: 20px;
}
.el-table {
    margin-top: 20px;
}
.el-pagination {
    margin-top: 20px;
}
.form-input {
    width: 200px;
    height: 36px;
}
.inventory-audit-title {
    font-family: '微软雅黑 Light', 'Helvetica Neue', Arial, sans-serif;
    font-size: 28px; /* 或者更大一些如28px */
    color: #050505; /* 深灰色调 */
    font-weight: 500; /* 中等粗细 */
    letter-spacing: 1.5px; /* 字间距 */
    text-align: center; /* 文本居中 */
    margin-bottom: 20px; /* 下方留白 */
}
</style>



