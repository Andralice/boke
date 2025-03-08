import { Get,Post,http_PostUp } from '@/util/request';

export const createSuppliers = (data) => Post('/S/createStash', data);
export const updateStash = (data) => Post('/Stash/updateStash', data);
export const deleteStash = (id:number) => Post(`/Stash/deleteStash/${id}`);
export const selectStashById = (id:number) => Post(`/Stash/selectStashById/${id}`);