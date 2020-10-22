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
          v-if="item.prop !==  'context' && item.prop !== 'vivien' && item.prop !== 'imagePath'"
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
          v-else-if="item.prop === 'vivien'"
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
          <div class="vivien">
            <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594361469283&di=908b4d6749c294c2a9cc0972b2d24eb9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170927%2F0d8ed6c955a54eecacd4b338c3fb00e8.jpeg" alt=""> -->
            <!-- <img :src="scope.row.targetImage | dealPath()" alt=""> -->
            <img :src="$src(scope.row.faceImage)" alt="">
          </div>
        </template>
        </el-table-column>
        <el-table-column
          v-else-if="item.prop === 'imagePath'"
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
          <div class="vivien">
            <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594361469283&di=908b4d6749c294c2a9cc0972b2d24eb9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170927%2F0d8ed6c955a54eecacd4b338c3fb00e8.jpeg" alt=""> -->
            <!-- <img :src="scope.row.targetImage | dealPath()" alt=""> -->
            <img :src="$src(scope.row.imagePath)" alt="">
          </div>
        </template>
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
            style="padding: 0 5px"
            v-for="(item,idx) of menus"
            :key="idx"
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
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <template  v-for="item of theads">
        <!-- 不需要展示图片 -->
        <el-table-column
          v-if="item.prop !== 'context'"
          fixed
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          align="center"
          header-align="center"
          show-overflow-tooltip
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
        >
          <template slot-scope="scope">
            <div class="dashboard-content">
              <div
                class="video-file"
                v-if="scope.row.fileType === 'video'">
                <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594361469283&di=908b4d6749c294c2a9cc0972b2d24eb9&imgtype=0&src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20170927%2F0d8ed6c955a54eecacd4b338c3fb00e8.jpeg" alt=""> -->
                <!-- <img :src="scope.row.framePath | dealPath()" alt=""> -->
                <img :src="$src(scope.row.showImage)" alt="">
                <span :class="contextStyle === 'contextStyle' ? 'dealcss' : 'video-img'"></span>
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
              <!-- 关注人图像 -->
              <div
                class="image-file"
                v-if="scope.row.imagePath">
                <!-- <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1601347025,2037458518&fm=26&gp=0.jpg" alt=""> -->
                <!-- <img :src="scope.row.imagePath | dealPath()" alt=""> -->
                <img :src="$src(scope.row.imagePath)" alt="">
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
            style="padding: 0 5px"
            size="mini"
            v-for="(item,idx) of menus"
            :key="idx"
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
    toggle: String, // 是否切换
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
      return path.replace(/F:\\data\\nginx\\webroot/, (match, $1) => {
        return 'http://3.7.63.158:8888'
      })
    }
  },
  components: {

  },
  data () {
    return {
      loading: true,
      loadingTimer: null,
      status: false
    }
  },
  watch: {
    // 切换改变状态，开启loading
    toggle (val) {
      this.status = false
      // console.log(val)
    },
    // 数据请求成功，改变状态，关闭loading
    load (val) {
      if (val) {
        this.status = true
        this.loading = false
      }
    },
    // 判断数据和请求是否都ok，关闭loading
    tableData (val) {
      if (this.loading || this.status) {
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
    if (this.tableData.length) {
      this.loading = false
    } else {
      window.clearTimeout(this.loadingTimer)
      this.loadingTimer = setTimeout(() => {
        this.loading = false
      }, 20000)
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
