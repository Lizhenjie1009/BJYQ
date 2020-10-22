import service from '@/utils/request'
import qs from 'qs'

// 图片上传
export function uploadImg (data) {
  return service({
    url: '/attPerson/uploadImage/',
    method: 'post',
    'Content-Type': 'multipart/form-data',
    data
  })
}

// 获取定向人列表
export function getPersonList (data) {
  return service({
    url: '/attPerson/getList',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 修改定向人列表
export function editPerson (data) {
  return service({
    url: '/attPerson/update',
    method: 'put',
    data
  })
}

// 添加定向人列表
export function addPerson (data) {
  return service({
    url: '/attPerson/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 删除定向人列表
export function deletePerson (id) {
  return service({
    url: `/attPerson/delete/${id}`,
    method: 'delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'

    }
  })
}
