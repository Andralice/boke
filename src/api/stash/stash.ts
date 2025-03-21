import { Post } from '@/util/request';


// 查询仓库
export const selectStashById = (id:number) => Post(`/Stash/selectStashById/${id}`);

// 查询全部仓库
export const selectAllStash = (data) => Post('/Stash/selectAllStash', data);
// 创建仓库
export const createStash = (data) => Post('/Stash/createStash', data);
// 修改仓库
export const updateStash = (data) => Post('/Stash/updateStash', data);
// 删除仓库
export const deleteStash = (id:number) => Post(`/Stash/deleteStash/${id}`);

