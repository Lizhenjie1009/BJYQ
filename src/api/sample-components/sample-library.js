import service from '@/utils/request'
import qs from 'qs'

// 获取列表
export function getSampleList (params) {
  return service({
    url: `/sampleFile/getList`,
    method: 'get',
    params
  })
}
// 创建
export function addSampleList (data) {
  return service({
    url: `/sampleFile/add`,
    method: 'post',
    data: qs.stringify(data)
  })
}
// 删除
export function deleteSampleList (id) {
  return service({
    url: `/sampleFile/delete/${id}`,
    method: 'delete'
  })
}
// 图片上传
export function uploadFile (data) {
  return service({
    url: '/sampleFile/uploadFile',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
