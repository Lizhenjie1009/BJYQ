const install = (Vue, opts = {}) => {
  Vue.prototype.$src = (path) => {
    if (!path) {
      return
    }
    console.log()
    if (/^F:/.test(path)) {
      return path.replace(/F:\\data\\nginx\\webroot/, (match, $1) => {
        // return 'http://3.7.63.158:8888'
        return 'http://192.168.1.119:8888'
      })
    } else if (/\\data\\nginx\\webroot/.test(path)) {
      return path.replace(/\\data\\nginx\\webroot/, (match, $1) => {
        // return 'http://3.7.63.158:8888'
        return 'http://192.168.1.119:8888'
      })
    } else {
      return path.replace(/\/data\/nginx\/webroot/, (match, $1) => {
        // return 'http://3.7.63.158:8888'
        return 'http://192.168.1.119:8888'
      })
    }
    // return path.replace(/\/data\/nginx\/webroot/, (match, $1) => {
    //   // return 'http://3.7.63.158:8888'
    //   return 'http://192.168.1.119:8888'
    // })
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default install
