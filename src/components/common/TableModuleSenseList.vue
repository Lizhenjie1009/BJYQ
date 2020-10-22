<template>
  <div class="table">
    <!-- 需要滚动条 -->
    <el-table
      ref="table"
      v-loading="loading"
      :data="tableData"
      :height="height"
      style="width: 100%">
      <template  v-for="item of theads">
        <el-table-column
          v-if="item.prop !==  'context'"
          fixed
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          align="center"
          header-align="center"
          :show-overflow-tooltip="true"
        >
        </el-table-column>
        <el-table-column
          v-else
          fixed
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          align="center"
          header-align="center"
          :show-overflow-tooltip="true"
        >
        <template slot-scope="scope">
            <div class="dashboard-contwnt">
              <div
                class="video-file"
                v-if="scope.row.fileType === 'video'">
                <!-- <img :src="scope.row.framePath | dealPath()" alt=""> -->
                <img :src="$src(scope.row.showImage)" alt="">
                <span class="video-img"></span>
              </div>

              <div
                class="image-file"
                v-else-if="scope.row.fileType === 'image'">
                <!-- <img :src="scope.row.filePath | dealPath()" alt=""> -->
                <img :src="$src(scope.row.filePath)" alt="">
              </div>

              <div
                v-else
                class="text-file">
                {{scope.row.context}}
              </div>
              <!-- <img class="table-img" :src="scope.row.imagePath | dealPath()" alt=""> -->
            </div>
        </template>
        </el-table-column>
      </template>

      <el-table-column
        fixed="right"
        label="操作"
        header-align="center"
        align="center"
        v-if="menus && menus.length"
      >
        <template slot-scope="scope">
          <el-link
            size="mini"
            v-for="item of menus"
            :key="item.type"
            :type="item.type"
            v-show="item.visible ? scope.row[item.visible] : true"
            @click="handle(item.event, scope.$index, scope.row)"
          >{{item.name}}</el-link>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>

export default {
  props: {
    height: String, // 是否滚动高度
    theads: Array, // 默认表头
    dealTheads: Array, // 需要处理数据的表头
    senseType: Array, // 敏感类型字典
    menus: Array, // 按钮
    tableData: Array // 数据
  },
  filters: {
    // 处理敏感类型
    dealSenseType (str, type) {
      if (str === null) {
        return '无'
      }
      let result = []
      type.forEach(item => {
        return str.split(',').forEach(item1 => {
          if (item.ranking === +item1) {
            result.push(item.itemName)
          }
        })
      })
      return result.join(', ')
    },
    dealPath (path) {
      if (!path) {
        return
      }

      // let str = '/data/nginx/webroot/image/test.jpg'
      return path.replace(/\/data\/nginx\/webroot/, (match, $1) => {
        return 'http://3.7.63.158:8888'
      })
    }
  },
  components: {

  },
  data () {
    return {
      loading: true,
      loadingTimer: null
    }
  },
  watch: {
    tableData (val) {
      if (val !== undefined) {
        if (!val.length) {
          this.loading = true
        }
        if (val.length) {
          this.loading = false
        } else {
          window.clearTimeout(this.loadingTimer)
          this.loadingTimer = setTimeout(() => {
            this.loading = false
          }, 2000)
        }
      }
    }
  },
  created () {

  },
  mounted () {
    if (this.tableData.length) {
      this.loading = false
    }
  },
  methods: {
    handle (event, index, row) {
      this.$emit(event, index, row)
    }
  }
}
</script>
<style lang="scss" scoped>
.video-file {
  position: relative;
}
/deep/.el-table__fixed-body-wrapper {
  top: 47px !important;
}

.el-table td, /deep/.el-table th.is-leaf {
  border-bottom: none;
  background-color: #EEF5FF;
  color: #4A99FF;
}
/deep/.el-table td, .el-table th.is-leaf {
  border: none;
}
// 滚动条的宽度
/deep/ .el-table__body-wrapper::-webkit-scrollbar {
  width: 6px; // 横向滚动条
  height: 6px; // 纵向滚动条 必写
}

/deep/.el-table__fixed-right-patch {
  height: 46px !important;
  background-color: #EEF5FF;
}
 // 滚动条的滑块
/deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
  background-color: #ddd; //#026FFE
  border-radius: 3px;
}
/deep/.el-table__fixed-header-wrapper thead tr,th {
  background-color: #f40;
}
.sense-type {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.table-img {
  display: inline-block;
  width: 80px;
  height: 40px;
}
.dashboard-contwnt {
  img {
    display: inline-block;
    width: 80px;
    height: 40px;
  }
}
.video-img {
  // position: relative;
  display: block;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  background: url('../../assets/img/play.png');
}
</style>
