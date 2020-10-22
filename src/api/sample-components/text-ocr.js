import service from '@/utils/request'
import qs from 'qs'

// 获取列表
export function getCheckList (params) {
  return service({
    url: `/sampleFile/contentSearch/v2`,
    method: 'get',
    params
  })
}
