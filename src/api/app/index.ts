import request from '@/api/request';
import { MenuItem } from '@/stores/menu';
import { BaseResponse } from '@/interface/index';

const appService = {
  // 获取菜单数据
  getMenuAll: () => request.get<BaseResponse<MenuItem[]>>('/api/menu/all'),
  // 获取菜单树
  getMenuTree: () => request.get<BaseResponse<MenuItem[]>>('/api/menu/tree'),
  // 获取菜单详情
  getMenuDetail: (id: number) => request.get<BaseResponse<MenuItem>>(`/api/menu/${id}`),
  // 新增菜单
  addMenu: (data: MenuItem) => request.post<BaseResponse<any>>('/api/menu', data),
  // 修改菜单
  updateMenu: (data: MenuItem) => request.put<BaseResponse<any>>('/api/menu', data),
  // 删除菜单
  delMenu: (id: number) => request.delete<BaseResponse<any>>(`/api/menu/${id}`),
};

export default appService;