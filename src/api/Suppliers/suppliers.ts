import { Get,Post,http_PostUp } from '@/util/request';

// 查询仓库
export const selectSuppliersById = (id:number) => Post(`/Suppliers/selectSuppliersById/${id}`);

// 查询全部仓库
export const selectAllSuppliers = (data) => Post('/Suppliers/selectAllSuppliers', data);
// 创建仓库
export const createSuppliers = (data) => Post('/Suppliers/createSuppliers', data);
// 修改仓库
export const updateSuppliers = (data) => Post('/Suppliers/updateSuppliers', data);
// 删除仓库
export const deleteSuppliersById = (id:number) => Post(`/Suppliers/deleteSuppliersById/${id}`);