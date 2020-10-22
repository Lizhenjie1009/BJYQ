import service from '@/utils/request'
import qs from 'qs'

// 获取定向车列表
export function getCarList (data) {
  return service({
    url: '/attVehicle/getList',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 修改定向车列表
export function editCar (data) {
  return service({
    url: '/attVehicle/update',
    method: 'put',
    data
  })
}

// 添加定向车列表
export function addCar (data) {
  return service({
    url: '/attVehicle/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

// 删除定向车列表
export function deleteCar (id) {
  return service({
    url: `/attVehicle/delete/${id}`,
    method: 'delete',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
