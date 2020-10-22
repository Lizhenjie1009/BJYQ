<template>
  <div class="search-picture">
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="3">
          <el-upload
            class="avatar-uploader"
            action="/attPerson/uploadImage"
            :headers='uploadHeaders'
            :http-request='httpUpload'
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="$src(imageUrl)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-col>
        <!-- <el-col :span="8" class="tit-center">
          <el-col :span="5" class="tit">
            <span>类型</span>
          </el-col>
          <el-col :span="18">
            <el-select v-model="queryParams.type" placeholder="请选择">
              <el-option label="图片" value="image"></el-option>
              <el-option label="人脸" value="face"></el-option>
            </el-select>
          </el-col>
        </el-col> -->
        <el-col :span="6" :push="1" class="tit-center">
          <el-button>重置</el-button>
          <el-button type="primary" @click="submitQuery">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="info">
      <!-- <div class="info-title">
        结果
      </div> -->
      <div class="info-table">
        <!-- <template v-if="searchData.length > 0">
          <div class="info-face">
            <div class="info-face-title">
              <span>图片检索结果</span>
            </div>
            <el-card
              v-for="item in searchData"
              :key="item.id"
              :body-style="{ padding: '0px' }">
              <img :src="$src(item.filePath)" class="image">
              <div style="padding: 5px 14px;">
                <el-tooltip class="item" effect="dark" :content="item.fileIntro" placement="bottom-start">
                  <span class="text-elis">简介:{{item.fileIntro}}</span>
                </el-tooltip>
                <div class="bottom clearfix">
                  <time class="time">{{ item.insertTime }}</time>
                  <router-link v-show="item.msgId" class="info-detail" :to="'/list/detail/' + item.msgId">
                    <el-button type="text" class="button">详情</el-button>
                  </router-link>
                </div>
              </div>
            </el-card>
          </div>
        </template> -->
        <template>
          <div v-show="!search" class="info-face-title">检索结果</div>
          <div v-show="search && !attFaceData.length && !detectFaceData.length" class="info-face-title">无结果</div>
          <div class="info-face" v-if="attFaceData.length > 0">
            <div class="info-face-title">
              <span>人脸信息检索结果</span>
            </div>
            <el-card
              v-for="item in attFaceData"
              :key="item.id"
              :body-style="{ padding: '0px' }">
              <img :src="$src(item.imagePath)" class="image">
              <div style="padding: 5px 14px;">
                <span>{{item.name}}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <div class="bottom clearfix">
                  <el-button type="text" class="button">相似度：{{item.score}}</el-button>
                </div>
              </div>
            </el-card>
          </div>
          <div class="info-detect" v-if="detectFaceData.length > 0">
            <div class="info-face-title">
              <span>消息信息检索结果</span>
            </div>
            <el-card
              v-for="item in detectFaceData"
              :key="item.id"
              :body-style="{ padding: '0px' }">
              <img :src="$src(item.faceImage)" class="image">
              <div style="padding: 5px 14px;">
                <span>相似度：{{item.score}}</span>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <div class="bottom clearfix">
                  <router-link :to="'/list/detail/' + item.msgId">
                    <el-button type="text" class="button">详情</el-button>
                  </router-link>
                </div>
              </div>
            </el-card>
            <!-- <el-scrollbar style="weight: 100%;" :native='false' :noresize='true' tag="div">
              <ul class="info-detect-ul" :style="'width:' + 255 *  (detectFaceData.length - 1) + 'px; overflow:hidden'">
                <li v-for="item in detectFaceData" :key="item.id">
                  <el-card
                    :body-style="{ padding: '0px' }">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image">
                    <div style="padding: 5px 14px;">
                      <span>{{item.name}}</span>
                      <span>&nbsp;&nbsp;&nbsp;</span>
                      <div class="bottom clearfix">
                        <el-button type="text" class="button">相似度：{{item.score}}</el-button>
                      </div>
                    </div>
                  </el-card>
                </li>
              </ul>
            </el-scrollbar> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { getPicList } from '@/api/sample-components/search-picture'
import { uploadFile } from '@/api/sample-components/sample-library'

export default {
  name: 'face-picture',
  components: {

  },
  data () {
    return {
      uploadHeaders: {
        'Content-Type': 'multipart/form-data'
      },
      imageUrl: '',
      queryParams: {
        type: 'face'
      },
      search: false,
      searchData: [],
      attFaceData: [],
      detectFaceData: [],
      pages: {
        totalRow: 100, // 记录总数
        totalPage: 0, // 总页数
        pageSize: 15, // 每页条数
        pageNumber: 0 // 当前页码
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {
    console.log(this.attFaceData, this.detectFaceData.length)
  },
  methods: {
    handleAvatarSuccess () {

    },
    // 图片上传
    httpUpload (context) {
      let formData = new FormData()
      formData.append('file', context.file)
      uploadFile(formData).then(({ data }) => {
        if (data.status === 200) {
          this.imageUrl = data.data
        }
      })
    },
    async submitQuery () {
      this.queryParams.filePath = this.imageUrl
      console.log(this.queryParams)
      let { data } = await getPicList(this.queryParams)
      if (data.status === 200) {
        this.search = true
        this.searchData = data.data
        this.attFaceData = data.data.attFace
        this.detectFaceData = data.data.detectFace
        console.log(data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bottom,.clearfix {
  height: 40px;
  line-height: 40px;
}
.info-detail {
  font-size: 17px;
  padding-left: 10px;
}
.text-elis {
  display: inline-block;
  width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
.info-detect-ul {
  height: 254px;
  li {
    float: left;
  }
}
.el-scrollbar .el-scrollbar__wrap .el-scrollbar__view{
  white-space: nowrap;
}
.info-table {
  padding: 0 10px;
  height: 100%;
  overflow-y: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.info-face-title {
  width: 100%;
  height: 41px;
  line-height: 41px;
  font-size: 18px;
  font-weight: 500;
  padding-left: 10px;
}
/deep/.el-card {
  float: left;
  width: 235px;
  margin: 0 11px 20px;
  overflow: hidden;
  img {
    width: 233px;
    height: 180px;
  }
}
.info-detect {
  width: 100%;
}
.search-picture {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.tit-center {
  padding-top: 40px;
}
.query {
  width: 100%;
  // height: 80px;
  background-color: #fff;
  border-radius:6px;
  margin-bottom: 20px;
  .tit {
    text-align: end;
    line-height: 40px;
  }
  .el-row {
    padding: 20px 0 20px 20px;
  }
}

.info {
  width:100%;
  height: 100%;
  background:rgba(255,255,255,1);
  border-radius:6px;
}
.info-title {
  height: 41px;
  line-height: 41px;
  padding-left: 30px;
  position: relative;
  .create-table {
    position: absolute;
    top: 4px;
    right: 55px;
  }
  img {
    display: inline-block;
    border-radius: 6px;
    width: 20px;
    height: 20px;
    position: relative;
    top: 5px;
  }
  span {
    padding-left: 10px;
    font-size:14px;
    font-weight:400;
    color:rgba(74,153,255,1);
  }
}

.page {
  position: relative;
  width: 100%;
  height: 35px;
  .el-pagination {
    position: absolute;
    right: 10px;
  }
}
.avatar-uploader .el-upload {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  border: 1px dashed #696868;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
  border-radius: 6px;
}
</style>
