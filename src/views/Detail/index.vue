<template>
  <div class="detail">
    <div class="title">
      <bread-crumb :newbar='newbar'></bread-crumb>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="详情" name="first">
        <div class="basic-info">
          <span class="basic-title">基本信息</span>
          <div class="basic-content">
            <el-row :gutter="20">
              <el-col :span="6">
                <span class="tit">发送者ID：</span>
                <span>{{msgInfo.senderId}}</span>
              </el-col>
              <el-col :span="6">
                <span class="tit"> 发送者昵称：</span>
                <span>{{msgInfo.senderName}}</span>
              </el-col>
              <el-col :span="6">
                <span class="tit">群昵称：</span>
                <span>{{msgInfo.groupName}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="6">
                <span class="tit">内容类型：</span>
                <span>{{dealFileType}}</span>
              </el-col>
              <el-col :span="6">
                <span class="tit"> 发送时间：</span>
                <span>{{msgInfo.msgTime}}</span>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="2" class="content-detail content-detail-text">
                <span class="tit con-detail"> 内容详情：</span>
              </el-col>
              <el-col :span="18" class="content-detail-all">
                <div
                  class="video-box"
                  @click='playVideo($src(msgInfo.filePath))'
                  v-if="msgInfo.fileType === 'video'">
                    <!-- <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1601347025,2037458518&fm=26&gp=0.jpg" alt=""> -->
                    <!-- <img :src="msgInfo.framePath | dealPath()" alt=""> -->
                    <img :src="$src(msgInfo.showImage)" alt="">
                    <span class="video-play"></span>
                </div>
                <span v-else-if="msgInfo.fileType === 'image'" class="tit-detail">
                <el-image
                  style="width: 100px; height: 60px"
                  :src="$src(msgInfo.filePath)"
                  :preview-src-list="[$src(msgInfo.filePath)]">
                </el-image>
                  <!-- <img :src="sense.framePath | dealPath()" alt=""> -->
                </span>
                <span v-else>{{msgInfo.context}}</span>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="comparison-info" v-if="(detectInfo.detectFace && detectInfo.detectFace.length > 0) || (detectInfo.detectOcr && detectInfo.detectOcr.length > 0) || (detectInfo.detectPlate && detectInfo.detectPlate.length > 0)">
          <div class="basic-title">
            <span>内容检测</span>
          </div>
          <div
            class="comparison-data"
            >
            <!-- v-for="(item,idx) in detectInfo"
            :key="idx" -->
            <template>
              <div class="face" v-if="detectInfo.detectFace.length > 0">
                <div class="comparison-tit">
                  <span>人脸检测结果：</span>
                </div>
                <div class="comparison-item comparison-item-face">
                  <el-image
                    v-for="res in detectInfo.detectFace" :key="res.id"
                    style="width: 100px; height: 60px; paddingRight: 15px"
                    :src="$src(res.faceImage)"
                    :preview-src-list="[$src(res.faceImage)]">
                  </el-image>
                </div>
              </div>
              <div class="ocr" v-else-if='detectInfo.detectOcr.length > 0'>
                <el-row :gutter="10" v-for="res in detectInfo.detectOcr" :key="res.id">
                  <div class="comparison-item">
                    <el-col :span="6">
                      <el-col :span="6" class="comparison-tit comparison-ocr">
                        <span>原始图片:</span>
                      </el-col>
                      <el-col :span="12">
                        <el-image
                          style="width: 100px; height: 60px"
                          :src="$src(res.imagePath)"
                          :preview-src-list="[$src(res.imagePath)]">
                        </el-image>
                      </el-col>
                    </el-col>
                    <el-col :span="18">
                      <el-col :span="1" v-show="res.ocrType === 1" class="comparsion-width">中英文检测结果:</el-col>
                      <el-col :span="1" v-show="res.ocrType === 2"  class="comparsion-width">繁体检测结果:</el-col>
                      <el-col :span="1" v-show="res.ocrType === 3"  class="comparsion-width">维文检测结果:</el-col>
                      <el-col :span="20">{{res.ocrContent}}</el-col>
                    </el-col>
                  </div>
                </el-row>
              </div>
              <div class="plate" v-show='detectInfo.detectPlate.length > 0'>
                <div class="comparison-tit">
                  <span>车牌检测结果：</span>
                </div>
                <div class="comparison-item comparison-plates" v-for="res in detectInfo.detectPlate" :key="res.id">
                  <el-image
                    style="width: 115px; height: 60px; paddingLeft: 15px"
                    :src="$src(res.imagePath)"
                    :preview-src-list="[$src(res.imagePath)]">
                  </el-image>
                  <span>车牌号：{{res.plates}}</span>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="sense-info" v-if="senseInfo !== undefined">
          <div
            class="sense"
            v-for="(item, index) in senseInfo"
            :key="index">
            <span class="sense-title">{{item[0].detectRemark}}</span>
            <div
              class="sense-item"
              v-for="sense in item"
              :key="sense.id">
              <!-- 关注人敏感信息 -->
              <div
                class="sense-face"
                v-if="sense.detectType === 3">
                <el-row :gutter="20">
                  <el-col :span="4" class="sense-show">
                    <span class="tit">关键帧展示：</span>
                    <!-- <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1601347025,2037458518&fm=26&gp=0.jpg" alt=""> -->
                    <!-- <img :src="sense.framePath | dealPath()" alt=""> -->
                    <el-image
                      style="width: 100px; height: 60px"
                      :src="$src(sense.framePath)"
                      :preview-src-list="[$src(sense.framePath)]">
                    </el-image>
                    <span style="marginLeft: 30px" v-if="sense.seconds">(关键帧位置：{{sense.seconds}})</span>
                  </el-col>
                  <el-col :span="3">
                    <div class="tit-item" style="textAlign: end">定向检测结果：</div>
                  </el-col>
                  <el-col :span="16" class="sense-result">
                    <div
                      class="result"
                      v-for="res in JSON.parse(sense.targetContent)"
                      :key="res.id">
                      <p>
                        <!-- <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1601347025,2037458518&fm=26&gp=0.jpg" alt=""> -->
                        <!-- <img :src="res.imagePath | dealPath()" alt=""> -->
                        <el-image
                          style="width: 100px; height: 60px"
                          :src="$src(res.imagePath)"
                          :preview-src-list="[$src(res.imagePath)]">
                        </el-image>
                      </p>
                      <p class="text-color">姓名：{{res.name}}</p>
                      <p class="text-color">相似度：{{res.score}}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 关注车牌敏感信息 -->
              <div
                class="sense-face"
                v-else-if="sense.detectType === 4">
                <el-row :gutter="20">
                  <el-col :span="8" class="sense-show">
                    <span class="tit">关键帧展示：</span>
                    <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1594360904323&di=dedcde5466889819f46a7fb0f5871661&imgtype=0&src=http%3A%2F%2Fimg.mp.itc.cn%2Fupload%2F20161128%2Fea117315ba6e4f5da9b8a20ac357f8b8_th.jpeg" alt=""> -->
                    <!-- <img :src="sense.originalImage | dealPath()" alt=""> -->
                    <el-image
                      style="width: 100px; height: 60px"
                      :src="$src(sense.originalImage)"
                      :preview-src-list="[$src(sense.originalImage)]">
                    </el-image>
                    <span style="marginLeft: 30px" v-if="sense.seconds">(关键帧位置：{{sense.seconds}})</span>
                  </el-col>
                  <el-col :span="16" class="sense-result">
                    <span class="tit">定向检测结果：</span>
                    <div
                      class="result"
                      v-for="res in JSON.parse(sense.targetContent)"
                      :key="res.id">
                      <!-- <p>
                        <img :src="res.imagePath | dealPath()" alt="">
                      </p> -->
                      <p>{{res.target}}</p>
                      <p class="car-text">匹配个数:{{res.number}}</p>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!-- 关注其他敏感信息 -->
              <div
                v-else
                class="sense-other">
                <el-row :gutter="20">
                  <el-col :span="24" class="sense-show">
                    <span class="tit">结果展示：</span>
                    <span v-if="sense.targetImage">
                      <!-- <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3984473917,238095211&fm=26&gp=0.jpg" alt=""> -->
                      <!-- <img :src="sense.targetImage | dealPath()" alt=""> -->
                      <el-image
                        style="width: 100px; height: 60px"
                        :src="$src(sense.targetImage)"
                        :preview-src-list="[$src(sense.targetImage)]">
                      </el-image>
                    </span>
                    <span v-else>{{sense.detectResult}}</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="msgInfo.isSense === 1" label="上下文" name="second">
        <div class="context">
          <div class="context-title">上下文</div>
          <div class="context-info">
            <table-module
              :theads='theads'
              :tableData='tableData'
              contextStyle='contextStyle'
            ></table-module>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane v-if="msgInfo.isSense === 1" label="传播关系" name="third">
        <div class="relationship"  v-if="state">
          <div class="relationship-title">传播关系</div>
          <spread-relation
            class="relationship-info"
          ></spread-relation>
        </div>
      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="视频播放"
      :visible.sync="dialogVisibleVideo"
      width="30%">
      <span>
        <video ref="video" controls :src="videoSrc"></video>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import BreadCrumb from '@/components/common/BreadCrumb'
import TableModule from '@/components/common/TableModule'
import SpreadRelation from '@/components/content/Dashboard/SpreadRelation'

import { getDetail, getContextList } from '@/api/dealContent'

export default {
  name: 'detail',
  components: {
    BreadCrumb,
    TableModule,
    SpreadRelation
  },
  data () {
    return {
      videoSrc: '',
      dialogVisibleVideo: false,
      dataInfo: {},
      activeName: 'first',
      newbar: '人列表（详情）',
      theads: [
        {
          prop: 'senderId',
          label: '发送者ID'
        },
        {
          prop: 'senderName',
          label: '发送者昵称'
        },
        {
          prop: 'msgTime',
          label: '时间'
        },
        {
          prop: 'context',
          label: '内容详情'
        }
      ],
      tableData: [],
      msgInfo: {}, // 基本信息
      detectInfo: {}, // 对比信息
      senseInfo: {}, // 敏感信息
      chartWidth: 0,
      chartHeight: 0,
      state: false // 内容列表（传播关系）,是否显示的状态
    }
  },
  filters: {
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
  watch: {
    // 关闭对话框视频暂停
    dialogVisibleVideo (val) {
      this.$nextTick(_ => {
        if (!val) {
          this.$refs.video.pause()
        }
      })
    }
  },
  computed: {
    // 处理路径
    dealImgSrc () {
      let src = this.msgInfo.filePath
      if (!src) {
        return
      }
      // let str = '/data/nginx/webroot/image/test.jpg'
      // 1111111111111111111111
      // return src.replace(/\/data\/nginx\/webroot/, (match, $1) => {
      //   return 'http://3.7.63.158:8888'
      // })
      return src.replace(/F:\\data\\nginx\\webroot/, (match, $1) => {
        return 'http://3.7.63.158:8888'
      })
    },
    dealFileType () {
      let type = ''
      console.log(this.msgInfo)

      switch (this.msgInfo.fileType) {
        case 'video':
          type = '视频'
          break
        case 'image':
          type = '图片'
          break
        case undefined:
          type = ''
          break
        default:
          type = '文本'
      }
      return type
    }
  },
  created () {
    this.getDetailInfo(this.$route.params.id)
    this.getContextInfo(this.$route.params.id)
  },
  mounted () {
  },
  methods: {
    dealSrc (src) {
      if (!src) {
        return
      }
      // /((\/|:)?|[a-zA-Z]*)+\/webroot/s

      if (/^(F:|\\)/.test(src)) {
        return src.replace(/(F:\\|\\)data\\nginx\\webroot/, (match, $1) => {
          return 'http://3.7.63.158:8888'
        })
      } else {
        return src.replace(/[a-zA-Z]*\/webroot/, (match, $1) => {
          return 'http://3.7.63.158:8888'
        })
      }

      // let str = '/data/nginx/webroot/image/test.jpg'
      // 111111111111111
      // return src.replace(/\/data\/nginx\/webroot/, (match, $1) => {
      // return 'http://3.7.63.158:8888'
      // })
    },
    // 获取详情
    async getDetailInfo (id) {
      let { data } = await getDetail(id)
      if (data.status === 200) {
        this.msgInfo = data.data.msgInfo
        this.detectInfo = data.data.detectInfo
        let senseList = data.data.senseInfo
        // 排序
        this.senseInfo = this.dealSenseInfo(senseList)
        console.log(data, this.msgInfo, senseList, this.detectInfo.detectPlate.length)
      }
    },
    // 敏感信息排序
    dealSenseInfo (arr) {
      let result = []
      for (let i in arr) {
        // 敏感车和人
        if (arr[i][0].detectType === 3 || arr[i][0].detectType === 4) {
          result.unshift(arr[i])
        } else {
          result.push(arr[i])
        }
      }
      return result
    },
    // 获取上下文
    async getContextInfo (id) {
      let { data } = await getContextList(id)
      this.tableData = data.data
    },
    handleClick (tab, event) {
      switch (+tab.index) {
        case 0:
          this.newbar = '人列表（详情）'
          break
        case 1:
          this.newbar = '内容列表（上下文）'
          break
        case 2:
          this.newbar = '内容列表（传播关系）'
          // 选中传播关系之后，再渲染图标
          this.state = !this.state
          break
      }
    },
    playVideo (src) {
      this.dialogVisibleVideo = true
      this.videoSrc = src
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-row {
  width: 100%;
}
.face, .plate {
  display: flex;
  padding-bottom: 20px;
}
.face, .ocr, .plate {
  margin-top: 20px;
}
.comparison-item {
  width: 100%;
}
.comparison-item-face {
  flex: 1;
  display: flex;
}
.comparsion-width {
  width: 130px !important;
  line-height: 18px !important;
}
.comparison-plates {
  width: 200px;
  height: 104px;
  display: flex;
  flex-wrap: wrap;
  span {
    height: 17px;
    padding-left: -20px;
  }
}
.comparison-ocr {
  width: 100px;
}
.comparison-tit {
  width: 130px !important;
  padding: 0 !important;
  height: 60px;
  line-height: 60px;
}
.text-color {
  font-size: 16px;
  color: #4a99ff;
}
.car-text {
  font-size: 14px;
  color: #4a99ff;
}
.title {
  width: 100%;
  height: 78px;
  background-color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
}
.comparison-info {
  width: 100%;
  background:rgba(255,255,255,1);
  border-radius:6px;
  padding: 20px 20px 0 30px;
  margin-bottom: 20px;
  .basic-title {
    font-size:22px;
    font-weight:500;
    padding-bottom: 20px;
  }
}
.basic-info {
  width: 100%;
  background:rgba(255,255,255,1);
  border-radius:6px;
  padding: 20px 0 30px 30px;
  margin-bottom: 20px;
  .basic-title {
    font-size:22px;
    font-weight:500;
  }
  .content-detail-text {
    padding-right: 0 !important;
    width: 95px;
  }
  .content-detail-all {
    padding: 0 !important;
    .video-box {
      width: 100px;
      height: 70px;
      img {
        display: block;
        width: 100%;
        height: 100%;
      }
    }
    // height: 200px;
    // overflow-y: scroll;
  }
  .basic-content {
    .el-row {
      padding-top: 20px;
    }
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .tit-detail {
      // width: 278px;
    }
    span.tit {
      font-size:18px;
      color:#666666;
    }
  }
}
.sense-face {
  .el-row {
    // height: 100px;
  }
}
.sense {
  width: 100%;
  padding: 20px 30px;
  background:rgba(255,255,255,1);
  border-radius:6px;
  margin-bottom: 20px;
  img,.el-image {
    display: inline-block;
    width: 100px;
    height: 60px;
    vertical-align: middle;
  }
}
.con-detail {
  line-height: 64px;
}
.sense-item {
  .sense-title {
    font-size:18px;
    font-weight:500;
  }
}
.sense-show, .sense-result {
  span {
    line-height: 100px;
  }
}
.tit-item {
  height: 100px;
  line-height: 100px;
  padding-right: 10px;
}
.sense-result {
  display: flex;
  align-items:enter;

  .result {
    padding-top: 8px;
    padding-right: 50px;
  }
  p {
    text-align: center;
  }
}
.sensitive-info {
  width: 100%;
  height:350px;
  background:rgba(255,255,255,1);
  border-radius:6px;
  padding: 20px 0 0 30px;
  .sensitive-title {
    font-size:18px;
    font-weight:500;
  }
  .sensitive-content {
    margin-top: 20px;
    height: 265px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span.tit {
      font-size:18px;
      color:#666666;
    }
  }
}

.context {
  width: 100%;
  background-color: #fff;
  border-radius: 6px;
  padding: 20px 30px 0;
  .context-title {
    font-size: 18px;
    font-weight: 500;
  }
  .context-info {
    margin-top: 20px;
    /deep/.el-table td.is-center, /deep/.el-table th.is-center {
      text-align: left;
    }
  }
}
.relationship {
  width: 100%;
  height:810px;
  background:rgba(255,255,255,1);
  border-radius:6px;
  padding: 20px 0 0 30px;
  .relationship-title {
    font-size:22px;
    font-weight:500;
  }
  .relationship-info{
    width: 100%;
    height:calc(100% - 50px);
  }
}
.content-detail {
  display: flex;
  position: relative;
  img,.el-image {
    position: absolute;
    top: -100%;
    display: block;
    width: 100px;
    height: 60px;
  }
  .video-play {
    position: absolute;
    left: 35%;
    width: 30px;
    height: 30px;
    background-image: url('../../assets/img/play.png');
    background-size: 30px 30px;
  }
}
// /deep/.dashboard-content {
//   width: 125px;
// }
/deep/.el-tabs__nav-scroll {
  padding-left: 30px;
  background-color: #fff;
}
/deep/.el-tabs__active-bar {
  height: 3px;
  background-color: #4a99ff;
}
/deep/.el-tabs__header {
  margin: 0 0 20px;
}
/deep/.el-tabs__item {
  padding: 0 30px;
  font-size: 16px;
  font-weight: 500;
}
/deep/.el-dialog {
  /deep/.el-dialog__body {
    padding: 0 1px;
  }
  video {
    width: 100%;
    height: 600px;
  }
}
</style>
