import service from '@/utils/request'
import qs from 'qs'

// 图片上传
export function uploadFile (data) {
  return service({
    url: '/demo/addData',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
