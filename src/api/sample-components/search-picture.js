import service from '@/utils/request'
import qs from 'qs'

// 获取列表
export function getPicList (params) {
  return service({
    url: `/sampleFile/fileSearch`,
    method: 'get',
    params
  })
}

// 分页 查询检测到的人脸列表接口， 同时返回了消息的基本信息
export function getFaceList (params) {
  return service({
    url: `/detectFace/getList`,
    method: 'get',
    params
  })
}
