<template>
  <div class="table">
    <!-- 需要滚动条 -->
    <el-table
      v-if="height"
      ref="table"
      v-loading="loading"
      :data="tableData"
      :height="height"
      style="width: 100%">
      <template  v-for="item of theads">
        <el-table-column
          v-if="item.prop !==  'filePath' && item.prop !==  'imagePath'"
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
          v-else-if="item.prop === 'filePath'"
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
            <div class="dashboard-content">
              <div
                class="video-file"
                v-if="scope.row.fileType === 'video'">
                <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594361469283&di=908b4d6749c294c2a9cc0972b2d24eb9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170927%2F0d8ed6c955a54eecacd4b338c3fb00e8.jpeg" alt=""> -->
                <!-- <img :src="scope.row.framePath | dealPath()" alt=""> -->
                <img :src="$src(scope.row.showImage)" alt="">
                <span class="video-img"></span>
              </div>

              <div
                class="image-file"
                v-else-if="scope.row.fileType === 'image'">
                <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594360266010&di=2b3f94f72077fdeddee02540460c330f&imgtype=0&src=http%3A%2F%2Fa0.att.hudong.com%2F64%2F76%2F20300001349415131407760417677.jpg" alt=""> -->
                <!-- <img :src="scope.row.filePath | dealPath()" alt=""> -->
                <img :src="$src(scope.row.filePath)" alt="">
              </div>

              <div
                v-else
                class="text-file">
                {{scope.row.context}}
              </div>
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

    <!-- 不需要滚动条 -->
    <el-table
      v-else
      ref="table"
      height="auto"
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <template  v-for="item of theads">
        <!-- 不需要展示图片 -->
        <el-table-column
          v-if="item.prop !== 'filePath' && item.prop !== 'imagePath'"
          fixed
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          align="center"
          header-align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
        <!-- 展示图片 -->
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
            <div class="dashboard-content">
              <!-- <div
                class="video-file"
                v-if="scope.row.fileType === 'video'">
                <img :src="scope.row.framePath | dealPath()" alt="">
                <span :class="contextStyle === 'contextStyle' ? 'dealcss' : 'video-img'"></span>
              </div>
              <div
                class="image-file"
                v-else-if="scope.row.fileType === 'image'">
                <img :src="scope.row.filePath | dealPath()" alt="">
              </div>
              <div
                v-else
                class="text-file">
                {{scope.row.context}}
              </div> -->
              <!-- 关注人图像 -->
              <div
                class="image-file"
                v-if="scope.row.filePath">
                <!-- <img @click="showImg(dealImgPath(scope.row.filePath), scope.row.fileType)" v-if='scope.row.fileType === "image"' :src="scope.row.filePath | dealPath()" alt="">
                <video @click="showImg(dealImgPath(scope.row.filePath), scope.row.fileType)" v-else :src="scope.row.filePath | dealPath()" alt=""></video> -->
                <img @click="showImg($src(scope.row.filePath), scope.row.fileType)" v-if='scope.row.fileType === "image"' :src="$src(scope.row.filePath)" alt="">
                <video @click="showImg($src(scope.row.filePath), scope.row.fileType)" v-else :src="scope.row.filePath | dealPath()" alt=""></video>
              </div>
              <div
                class="image-file"
                v-else-if="scope.row.imagePath">
                <!-- <img @click="showImg(dealImgPath(scope.row.imagePath), scope.row.fileType)" v-if='scope.row.fileType === "image"' :src="scope.row.imagePath | dealPath()" alt="">
                <video @click="showImg(dealImgPath(scope.row.imagePath), scope.row.fileType)" v-else :src="scope.row.imagePath | dealPath()" alt=""></video> -->
                <img @click="showImg($src(scope.row.imagePath), scope.row.fileType)" v-if='scope.row.fileType === "image"' :src="$src(scope.row.imagePath)" alt="">
                <video @click="showImg($src(scope.row.imagePath), scope.row.fileType)" v-else :src="scope.row.imagePath | dealPath()" alt=""></video>
              </div>
            </div>
          </template>
        </el-table-column>
      </template>
      <!-- 处理数据 -->
      <el-table-column
          fixed
          v-for="item in dealTheads"
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          align="center"
          header-align="center"
          :show-overflow-tooltip="true"
        >
        <template slot-scope="scope">
          <div v-if="item.prop === 'isSense'">
            <span>{{scope.row.isSense === 1 ? '是' : '否'}}</span>
          </div>
          <div v-else class="sense-type">
            {{scope.row.senseTypes | dealSenseType(senseType)}}
          </div>
        </template>
      </el-table-column>
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
    <!-- title="提示" -->

    <el-dialog
      :visible.sync="dialogVisible"
      width="30%">
      <img v-if="dialogType === 'image'" class="dialogImg" :src="dialogSrc" alt="">
      <video v-else ref="video" class="dialogVideo" controls :src="dialogSrc"></video>
    </el-dialog>
    <!-- <dialog-img :src='dialogSrc' :show.sync='dialogVisible'></dialog-img> -->
  </div>
</template>

<script>
import DialogImg from '@/components/common/DialogImg'

export default {
  props: {
    load: Boolean, // loading状态
    height: String, // 是否滚动高度
    contextStyle: String, // 上下文样式
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
      // 1111111111111
      // return path.replace(/\/data\/nginx\/webroot/, (match, $1) => {
      //   return 'http://3.7.63.158:8888'
      // })
      if (/^F:/.test(path)) {
        return path.replace(/F:\\data\\nginx\\webroot/, (match, $1) => {
          // return 'http://192.168.1.148:8888'
          return 'http://3.7.63.158:8888'
        })
      } else {
        return path.replace(/\/data\/nginx\/webroot/, (match, $1) => {
          // return 'http://192.168.1.148:8888'
          return 'http://3.7.63.158:8888'
        })
      }
    }
  },
  components: {
    DialogImg
  },
  data () {
    return {
      loading: true,
      loadingTimer: null,
      dialogSrc: '',
      dialogType: '',
      dialogVisible: false
    }
  },
  watch: {
    dialogVisible (val) {
      this.$nextTick(_ => {
        this.$refs.video && this.$refs.video.pause()
        // if (!val) {
        //   this.$refs.video.pause()
        // }
      })
    },
    load (val) {
      if (val) {
        this.loading = false
      }
    },
    tableData (val) {
      if (this.load) {
        this.loading = false
        return
      }
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
          }, 20000)
        }
      } else {
        window.clearTimeout(this.loadingTimer)
        this.loadingTimer = setTimeout(() => {
          this.loading = false
        }, 20000)
      }
    }
  },
  created () {

  },
  mounted () {
    if (this.tableData && this.tableData.length) {
      this.loading = false
    } else {
      window.clearTimeout(this.loadingTimer)
      this.loadingTimer = setTimeout(() => {
        this.loading = false
      }, 20000)
    }
  },
  methods: {
    showImg (src, type) {
      console.log(src, type)
      this.dialogType = type
      this.dialogSrc = src
      this.dialogVisible = true
    },
    dealImgPath (path) {
      if (!path) {
        return
      }
      // let str = '/data/nginx/webroot/image/test.jpg'
      // 1111111111111
      // return path.replace(/\/data\/nginx\/webroot/, (match, $1) => {
      //   return 'http://3.7.63.158:8888'
      // })
      if (/^F:/.test(path)) {
        return path.replace(/F:\\data\\nginx\\webroot/, (match, $1) => {
          // return 'http://192.168.1.148:8888'
          return 'http://3.7.63.158:8888'
        })
      } else {
        return path.replace(/\/data\/nginx\/webroot/, (match, $1) => {
          // return 'http://192.168.1.148:8888'
          return 'http://3.7.63.158:8888'
        })
      }
    },
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
.dialogVideo {
  display: block;
  width: 100%;
  height: 600px;
}
// .el-dialog {
//   display: block;
//   width: 30%;
//   height: 50%;
// }
.dialogImg {
  display: block;
  width: 100%;
  height: 100%;
}
/deep/.el-dialog__headerbtn {
  font-size: 30px;
  z-index: 10;
}
/deep/.el-dialog__body, /deep/.el-dialog__header {
  padding: 0;
}
.table {
  flex: 1;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}
/deep/.el-table td, /deep/.el-table th {
  padding: 8px 0;
}
.image-file {
  img {
    vertical-align: middle;
    display: inline-block;
    width: 80px;
    height: 40px;
  }
  video {
    vertical-align: middle;
    display: inline-block;
    object-fit: fill;
    width: 80px;
    height: 40px;
  }
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
.vivien {
  img {
    display: inline-block;
    width: 80px;
    height: 40px;
  }
}
.dashboard-content {
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
.dealcss {
  display: block;
  position: absolute;
  top: 45%;
  left: 13%;
  transform: translate(-50%, -50%);
  width: 22px;
  height: 22px;
  background: url('../../assets/img/play.png');
}
</style>
