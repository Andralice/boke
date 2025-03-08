import { Get,Post,http_PostUp } from '@/util/request';

// 查询仓库
export const selectProductById = (id:number) => Post(`/Product/selectProductById/${id}`);

// 查询全部仓库
export const selectAllProduct = (data) => Post('/Product/selectAllProduct', data);
// 创建仓库
export const createProduct = (data) => Post('/Product/createProduct', data);
// 修改仓库
export const updateProduct = (data) => Post('/Product/updateProduct', data);
// 删除仓库
export const deleteProductById = (id:number) => Post(`/Product/deleteProductById/${id}`);