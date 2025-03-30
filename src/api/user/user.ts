import { Post } from '@/util/request';

// 登录
export const login = (data) => Post('/User/login', data); // 登录接口[3,7](@ref)
// 创建用户
export const createUser = (data) => Post('/User/createUser', data);
// 修改用户
export const updateUser = (data) => Post('/User/updateUser', data);
// 删除用户
export const deleteUser = (data) => Post('/User/deleteUser', data);
// 查找用户
export const findUser = (userName: string) => Post('/User/findUser', userName);


export const selectUserById = (id: number) => Post(`/User/selectUserById/${id}`);
// 查询全部用户
export const selectAllUser = (data) => Post('/User/selectAllUser', data);
// 删除用户
export const deleteUserById = (id: number) => Post(`/User/deleteUserById/${id}`);