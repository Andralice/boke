import { Post } from '@/util/request';


// 查询仓库
export const selectInventoryById = (id:number) => Post(`/Inventory/selectInventoryById/${id}`);

// 查询全部仓库
export const selectAllInventory = (data) => Post('/Inventory/selectAllInventory', data);
// 创建仓库
export const createInventory = (data) => Post('/Inventory/createInventory', data);
// 修改仓库
export const updateInventory = (data) => Post('/Inventory/updateInventory', data);
// 删除仓库
export const deleteInventoryById = (id:number) => Post(`/Inventory/deleteInventoryById/${id}`);