import service from '@/utils/request'
import qs from 'qs'

export function addUpdateRecord (data) {
  return service({
    url: '/updateRecord/add',
    method: 'post',
    data: qs.stringify(data)
  })
}

export function getUpdateRecord () {
  return service({
    url: '/updateRecord/getList',
    method: 'get'
  })
}
