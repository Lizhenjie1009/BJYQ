import service from '@/utils/request'

// 定向内容
export function getAttList (data) {
  return service({
    url: '/home/getAttList/v2',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 敏感内容列表
export function getSenseList (data) {
  return service({
    url: '/home/getSenseList',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 内容数据统计
export function getStatistic (data) {
  return service({
    url: '/home/msgStatistic',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 敏感内容分类统计
export function getTypeStatistic (data) {
  return service({
    url: '/home/typeStatistic',
    method: 'get',
    params: {
      ...data
    }
  })
}

// 全部数据统计
export function getAllStatistic (data) {
  return service({
    url: '/home/dataStatistic',
    method: 'get',
    params: {
      ...data
    }
  })
}
