import { defineComponent, computed } from 'vue';

// menuItems.ts
export const getMenuData = (role: string) => {
    switch (role) {
        case 'Admin':
            return [
                {
                    "label": "商品管理",
                    "subItems": [
                        { "label": "添加商品", "route": "/add-product" },
                        { "label": "编辑商品", "route": "/edit-product" },
                        { "label": "删除商品", "route": "/delete-product" }
                    ]
                },
                {
                    "label": "仓库管理",
                    "subItems": [
                        { "label": "添加仓库", "route": "/add-warehouse" },
                        { "label": "编辑仓库", "route": "/edit-warehouse" },
                        { "label": "删除仓库", "route": "/delete-warehouse" }
                    ]
                },
                {
                    "label": "供应商管理",
                    "subItems": [
                        { "label": "添加供应商", "route": "/add-supplier" },
                        { "label": "编辑供应商", "route": "/edit-supplier" },
                        { "label": "删除供应商", "route": "/delete-supplier" }
                    ]
                },
                {
                    "label": "库存管理",
                    "subItems": [
                        { "label": "查看库存", "route": "/view-inventory" },
                        { "label": "调整库存", "route": "/adjust-inventory" },
                        { "label": "库存报告", "route": "/inventory-report" }
                    ]
                }
            ];
        case 'user':
            return [
                {
                    "label": "商品管理",
                    "subItems": [
                        { "label": "查看商品", "route": "/view-products" }
                    ]
                },
                {
                    "label": "仓库管理",
                    "subItems": [
                        { "label": "查看仓库", "route": "/view-warehouses" }
                    ]
                },
                {
                    "label": "供应商管理",
                    "subItems": [
                        { "label": "查看供应商", "route": "/view-suppliers" }
                    ]
                },
                {
                    "label": "库存管理",
                    "subItems": [
                        { "label": "查看库存", "route": "/view-inventory" }
                    ]
                }
            ];
        default:
            return [];
    }
  };