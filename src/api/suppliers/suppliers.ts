import { Get,Post,http_PostUp } from '@/util/request';
import axios from 'axios';
//分页
export const selectSuppliersPage = (data) => axios.post('/suppliers//getSuppliers', data);