import request from '@/config/axios'

// 分类 VO
export interface CategoryVO {
  id: number // 编号
  name: string // 名字
  parentId: number // 父级编号
}

// 分类 API
export const CategoryApi = {
  // 查询分类列表
  getCategoryList: async (params) => {
    return await request.get({ url: `/system/category/list`, params })
  },

  // 查询分类详情
  getCategory: async (id: number) => {
    return await request.get({ url: `/system/category/get?id=` + id })
  },

  // 新增分类
  createCategory: async (data: CategoryVO) => {
    return await request.post({ url: `/system/category/create`, data })
  },

  // 修改分类
  updateCategory: async (data: CategoryVO) => {
    return await request.put({ url: `/system/category/update`, data })
  },

  // 删除分类
  deleteCategory: async (id: number) => {
    return await request.delete({ url: `/system/category/delete?id=` + id })
  },

  // 导出分类 Excel
  exportCategory: async (params) => {
    return await request.download({ url: `/system/category/export-excel`, params })
  },
}