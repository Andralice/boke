import { defineComponent, computed } from 'vue';

// menuItems.ts
export const getMenuData = (role: string) => {
    switch (role) {
        case 'Admin':
            return [
                {
                   "label": "面板", "route": "/"
                },
                {
                    "label": "商品管理",
                    "subItems": [
                        { "label": "添加商品", "route": "/createProduct" },
                        { "label": "商品列表", "route": "/showALLProduct" }
                        // { "label": "编辑商品", "route": "/edit-product" },
                        // { "label": "删除商品", "route": "/delete-product" }
                    ]
                },
                {
                    "label": "仓库管理",
                    "subItems": [
                        { "label": "添加仓库", "route": "/createStash" },
                        { "label": "仓库列表", "route": "/showALLStash" }
                        // { "label": "删除仓库", "route": "/delete-warehouse" }
                    ]
                },
                {
                    "label": "供应商管理",
                    "subItems": [
                        { "label": "添加供应商", "route": "/createSuppliers" },
                        { "label": "供应商列表", "route": "/showALLSuppliers" }
                        // { "label": "编辑供应商", "route": "/showALLSuppliers" },
                        // { "label": "删除供应商", "route": "/delete-supplier" }
                    ]
                },
                {
                    "label": "库存管理",
                    "subItems": [
                        { "label": "库存申请", "route": "/createInventory" },
                        { "label": "库存列表", "route": "/showALLInventory" },
                        { "label": "库存记录", "route": "/showAllInventoryLog"},
                        {"label": "库存审核","route": "/showAllExamine"}

                        // { "label": "库存报告", "route": "/inventory-report" }
                    ]
                },
                {
                    "label": "任务管理",
                    "subItems": [
                        { "label": "添加任务", "route": "/createTask" },
                        { "label": "任务列表", "route": "/showALLTask" }
                        // { "label": "订单报告", "route": "/order-report" }
                    ]
                },
                {
                    "label": "用户管理",
                    "subItems": [
                        { "label": "添加用户", "route": "/createUser" },
                        { "label": "用户列表", "route": "/showALLUser" }
                        // { "label": "编辑用户", "route": "/edit-user" },
                        // { "label": "删除用户", "route": "/delete-user" }
                    ]
                }
            ];
        case 'User':
            return [
                {
                    "label": "面板", "route": "/"
                 },
                {
                    "label": "商品管理",
                    "subItems": [
                        { "label": "添加商品", "route": "/createProduct" },
                        { "label": "商品列表", "route": "/showALLProduct" }
                        // { "label": "编辑商品", "route": "/edit-product" },
                        // { "label": "删除商品", "route": "/delete-product" }
                    ]
                },
                {
                    "label": "仓库管理",
                    "subItems": [
                        { "label": "添加仓库", "route": "/createStash" },
                        { "label": "仓库列表", "route": "/showALLStash" }
                        // { "label": "删除仓库", "route": "/delete-warehouse" }
                    ]
                },
                {
                    "label": "供应商管理",
                    "subItems": [
                        { "label": "添加供应商", "route": "/createSuppliers" },
                        { "label": "供应商列表", "route": "/showALLSuppliers" }
                        // { "label": "编辑供应商", "route": "/showALLSuppliers" },
                        // { "label": "删除供应商", "route": "/delete-supplier" }
                    ]
                },
                {
                    "label": "库存管理",
                    "subItems": [
                        { "label": "库存申请", "route": "/createInventory" },
                        { "label": "库存列表", "route": "/showALLInventory" },
                        { "label": "库存记录", "route": "/showAllInventoryLog"}
                        // { "label": "库存报告", "route": "/inventory-report" }
                    ]
                },
                {
                    "label": "任务管理",
                    "subItems": [
                        { "label": "任务列表", "route": "/showALLOrder" }
                        // { "label": "订单报告", "route": "/order-report" }
                    ]
                },
            ];
        default:
            return [];
    }
  };
