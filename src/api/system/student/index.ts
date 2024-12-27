import request from '@/config/axios'

// 学生 VO
export interface StudentVO {
  id: number // 编号
  name: string // 名字
  birthday: Date // 出生日期
  description: string // 简介
}

// 学生 API
export const StudentApi = {
  // 查询学生分页
  getStudentPage: async (params: any) => {
    return await request.get({ url: `/system/student/page`, params })
  },

  // 查询学生详情
  getStudent: async (id: number) => {
    return await request.get({ url: `/system/student/get?id=` + id })
  },

  // 新增学生
  createStudent: async (data: StudentVO) => {
    return await request.post({ url: `/system/student/create`, data })
  },

  // 修改学生
  updateStudent: async (data: StudentVO) => {
    return await request.put({ url: `/system/student/update`, data })
  },

  // 删除学生
  deleteStudent: async (id: number) => {
    return await request.delete({ url: `/system/student/delete?id=` + id })
  },

  // 导出学生 Excel
  exportStudent: async (params) => {
    return await request.download({ url: `/system/student/export-excel`, params })
  },

// ==================== 子表（学生课程） ====================

  // 获得学生课程列表
  getStudentCourseListByStudentId: async (studentId) => {
    return await request.get({ url: `/system/student/student-course/list-by-student-id?studentId=` + studentId })
  },

// ==================== 子表（学生班级） ====================

  // 获得学生班级
  getStudentGradeByStudentId: async (studentId) => {
    return await request.get({ url: `/system/student/student-grade/get-by-student-id?studentId=` + studentId })
  },
}