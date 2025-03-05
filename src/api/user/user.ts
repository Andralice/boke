import { http_Get,http_Post,http_PostUp } from '@/util/request';
// 登录
export const login = (data) => http_Post('/User/login', data); // 登录接口[3,7](@ref)
// 创建用户
export const createUser = (data) => http_Post('/User/createUser', data);
// 修改用户
export const updateUser = (data) => http_Post('/User/updateUser', data);
// 删除用户
export const deleteUser = (data) => http_Post('/User/deleteUser', data);