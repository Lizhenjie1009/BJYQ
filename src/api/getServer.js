import service from '@/utils/request'
import qs from 'qs'

export function getServerList () {
  return service({
    url: '/server/getList',
    method: 'get'
  })
}

export function getServerAll () {
  return service({
    url: '/server/getApiList',
    method: 'get'
  })
}

export function subImgInfo (data, params) {
  return service({
    url: '/server/show',
    method: 'post',
    data: qs.stringify(data),
    params
  })
}

export function getGpuInfo () {
  return service({
    url: '/server/getGPUInfo',
    method: 'get'
  })
}
