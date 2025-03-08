import { Get,Post,http_PostUp } from '@/util/request';
import axios from 'axios';

// 查询仓库
export const selectStashById = (id:number) => Post(`/Stash/selectStashById/${id}`);

// 查询全部仓库
export const selectAllStash = (data) => Post('/Stash/selectAllStash', data);
// 创建仓库
export const createStash = (data) => Post('/Stash/createStash', data);
// 修改仓库
export const updateStash = (data) => Post('/Stash/updateStash', data);
//供应商分页
export const selectSuppliersPage = (data)=>axios.post('/Suppliers/getSuppliers',data);
export const deleteStash = (id:number) => Post(`/Stash/deleteStash/${id}`);

