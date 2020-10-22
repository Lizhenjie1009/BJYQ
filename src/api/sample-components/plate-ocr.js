import service from '@/utils/request'
import qs from 'qs'

// 获取列表
export function getPlateList (params) {
  return service({
    url: `/detectPlate/getDetectPlateList`,
    method: 'get',
    params
  })
}
