import service from '@/utils/request'

// 字典
export function getDictionary () {
  return service({
    url: `/dictItem/getItems?dictId=DETECT_TYPE`,
    method: 'get'
  })
}

// 字典类型
export function getDictionaryType (params) {
  return service({
    url: `/dictItem/getItems`,
    method: 'get',
    params
  })
}
