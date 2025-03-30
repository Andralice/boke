import { Post } from '@/util/request';



// 查询审核
export const selectTaskById = (id:number) => Post(`/Task/selectTaskById/${id}`);

// 查询全部审核记录
export const selectAllTask = (data) => Post('/Task/selectAllTask', data);
export const createTask = (data) => Post('/Task/createTask', data);
// 更新审核记录
export const updateTask = (data) => Post('/Task/updateTask', data);
// 删除审核记录
export const deleteTaskById = (id:number) => Post(`/Task/deleteTaskById/${id}`);