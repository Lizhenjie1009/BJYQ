import service from '@/utils/request'

// 获取内容列表
export function getMsgInfo (data) {
  return service({
    url: '/msgInfo/getList',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 详情
export function getDetail (id) {
  return service({
    url: `/msgInfo/view/${id}`,
    method: 'get'
  })
}

// 详情 -- 上下文
export function getContextList (id) {
  return service({
    url: `/msgInfo/getMsgContext?id=${id}`,
    method: 'get'
  })
}

// 详情 -- 传播关系
export function getSpread (id) {
  return service({
    url: `/msgInfo/getBroadcast?id=${id}`,
    method: 'get'
  })
}
