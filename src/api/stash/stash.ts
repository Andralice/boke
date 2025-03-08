import { Get,Post,http_PostUp } from '@/util/request';
import axios from 'axios';

// 查询仓库
export const getStash = (data) => Post('/Stash/selectStash', data);

// 查询全部仓库
export const selectAllStash = (data) => Post('/Stash/selectAllStash', data);
// 创建仓库
export const createStash = (data) => Post('/Stash/createStash', data);
// 修改仓库
export const updateStash = (data) => Post('/Stash/updateStash', data);
// 删除仓库
export const deleteStash = (data) => Post('/Stash/deleteStash', data);
//供应商分页
export const selectSuppliersPage = (data)=>axios.post('/Suppliers/getSuppliers',data);

