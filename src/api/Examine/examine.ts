import { Post } from '@/util/request';


// 查询审核
export const selectExamineById = (id:number) => Post(`/Examine/selectExamineById/${id}`);

// 查询全部审核记录
export const selectAllExamine = (data) => Post('/Examine/selectAllExamine', data);
export const selectListExamine = (data) => Post('/Examine/selectListExamine', data);
// 更新审核记录
export const UpdateExamine = (data) => Post('/Examine/UpdateExamine', data);