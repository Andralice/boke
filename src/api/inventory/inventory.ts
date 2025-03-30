import { Post } from '@/util/request';

interface FormData {
    productName : string; 
    stashName: string; 
    supplierName: string; 
    type: string; 
    quantity?: number; 
    remark: string; 
  }

// 查询库存
export const selectInventoryById = (id:number) => Post(`/Inventory/selectInventoryById/${id}`);

// 查询全部库存
export const selectAllInventory = (data) => Post('/Inventory/selectAllInventory', data);
// 查询库存记录
export const selectAllInventoryLog = (data) => Post('/Inventory/selectAllInventoryLog', data);
// 创建库存
export const createInventory = (data: FormData) => Post('/Inventory/createInventory', data);
// 修改库存
export const updateInventory = (data: FormData) => Post('/Inventory/updateInventory', data);
// 删除库存
export const deleteInventoryById = (id:number) => Post(`/Inventory/deleteInventoryById/${id}`);