<template>
  <div class="plant-ocr">
    <div class="query">
      <el-row :gutter="30">
        <el-col :span="7">
          <el-col :span="5" class="tit">发送者ID</el-col>
          <el-col :span="19">
            <el-input v-model="queryCriteria.senderId" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="7">
          <el-col :span="6" class="tit">发送者昵称</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.senderName" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="7">
          <el-col :span="6" class="tit">是否为敏感</el-col>
          <el-col :span="18">
            <el-select :popper-append-to-body="false" class="is-sense" v-model="queryCriteria.isSense" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="7">
          <el-col :span="5" class="tit">群昵称</el-col>
          <el-col :span="19">
            <el-input v-model="queryCriteria.groupName" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="7">
          <el-col :span="6" class="tit">查询时间</el-col>
          <el-col :span="18">
            <el-date-picker
              v-model="queryCriteria.date"
              type="daterange"
              range-separator="至"
              value-format='yyyy-MM-dd'
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
        </el-col>
        <el-col :span="7">
          <el-col :span="6" class="tit">敏感内容分类</el-col>
          <el-col :span="18">
            <el-select :popper-append-to-body="false" v-model="queryCriteria.sort" placeholder="请选择">
              <el-option
                v-for="item in senseType"
                :key="item.id"
                :label="item.itemName"
                :value="item.codes">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="3">
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="submitQuery">查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="info">
      <div class="info-title">
        <img src="../../assets/img/warning.png" alt="">
        <span>已检索{{pages.totalRow}}项</span>
      </div>
      <div class="info-table">
        <table-module
          :load='load'
          :dealTheads='dealTheads'
          :senseType='senseType'
          :theads='theads'
          :tableData='tableData'
          :menus='menus'
          @detail='detailInfo'
        ></table-module>
      </div>
      <div class="page">
        <el-pagination
          v-show="tableData.length > 0"
          small
          background
          layout="prev, pager, next, jumper, total, sizes"
          :total="pages.totalRow"
          :page-sizes="[15,30,45]"
          :page-count="pages.totalPage"
          :current-page="pages.pageNumber"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          style="margin: 5px 0;"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getFaceList } from '@/api/sample-components/search-picture'
import {
  getDictionary,
  getDictionaryType
} from '@/api/dealDictionary'
import TableModule from '@/components/common/NewTableModule'

export default {
  name: 'plant-ocr',
  components: {
    TableModule
  },
  data () {
    return {
      load: false,
      plateType: [],
      plateColorType: [
        {
          label: '全部'
        },
        {
          label: '蓝色',
          value: '蓝'
        },
        {
          label: '绿色',
          value: '绿'
        },
        {
          label: '黄色',
          value: '黄'
        },
        {
          label: '黑色',
          value: '黑'
        },
        {
          label: '白色',
          value: '白'
        }
      ],
      queryCriteria: {},
      pages: {
        totalRow: 100, // 记录总数
        totalPage: 0, // 总页数
        pageSize: 15, // 每页条数
        pageNumber: 1 // 当前页码
      },
      senseType: [],
      tableData: [],
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
          prop: 'groupName',
          label: '群名称'
        },
        {
          prop: 'faceImage',
          label: '人脸图片'
        },
        {
          prop: 'msgTime',
          label: '消息时间'
        }
      ],
      dealTheads: [
        {
          prop: 'isSense',
          label: '是否为敏感'
        },
        {
          prop: 'senseTypes',
          label: '敏感内容分类'
        }
      ],
      menus: [
        {
          event: 'detail',
          type: 'primary',
          name: '详情'
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.dealDictionarySense()
    this.dealDictionary({
      dictId: 'PLATE_CLASS'
    })
    this.getCarPlateList({
      pageNum: this.pages.pageNumber,
      pageSize: this.pages.pageSize
    })
  },
  mounted () {

  },
  methods: {
    // 获取字典
    async dealDictionarySense () {
      let { data } = await getDictionary()
      this.senseType = data.data
      this.senseType.unshift({
        itemName: '全部'
      })
      console.log(this.senseType)
    },
    // 获取字典
    async dealDictionary (params) {
      let { data } = await getDictionaryType(params)
      if (data.status === 200) {
        this.plateType = data.data
        this.plateType.unshift({
          itemName: '全部'
        })
      }
    },
    // 列表
    async getCarPlateList (params) {
      this.load = false
      let { data } = await getFaceList(params)
      if (data.status === 200) {
        console.log(data)
        this.load = true
        this.pages.totalRow = data.data.total
        this.pages.totalPage = data.data.pages
        this.pages.pageSize = data.data.size
        this.pages.pageNumber = data.data.current
        this.tableData = data.data.records || []
        // this.tableData = data.data.records.map(item => {
        //   if (item.fileType) {
        //     item.fileTypeNew = this.dealFileType(item.fileType)
        //   }
        //   return item
        // })
      }
    },
    dealFileType (type) {
      let str = ''
      if (type === 'image') {
        str = '图片'
      } else if (type === 'video') {
        str = '视频'
      } else {
        str = type
      }
      return str
    },
    resetQuery () {
      this.queryCriteria = {}
      this.getCarPlateList({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize
      })
    },
    submitQuery () {
      if (this.queryCriteria.date) {
        this.queryCriteria.beginTime = this.queryCriteria.date[0]
        this.queryCriteria.endTime = this.queryCriteria.date[1]
        delete this.queryCriteria.date
        this.getCarPlateList({
          pageNum: this.pages.pageNumber,
          pageSize: this.pages.pageSize,
          ...this.queryCriteria
        })
        return
      }
      this.getCarPlateList({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize,
        ...this.queryCriteria
      })
    },
    detailInfo (idx, data) {
      this.$router.push('/list/detail/' + data.id)
    },
    // @size-change
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.pages.pageNumber = 1
      this.getCarPlateList({
        pageNum: 1,
        pageSize: val
      })
    },
    // @current-change
    handleCurrentChange (val) {
      this.pages.pageNumber = val
      this.getCarPlateList({
        pageNum: val,
        pageSize: this.pages.pageSize
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-table__fixed-right::before, /deep/.el-table__fixed::before {
  height: 0;
}
.plant-ocr {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.query {
  width: 100%;
  // height: 80px;
  padding: 10px 0;
  background-color: #fff;
  border-radius:6px;
  margin-bottom: 20px;
  vertical-align: middle;
  /deep/.el-input {
    width: 90%;
  }
  /deep/.el-date-editor {
    width: 90%;
  }
  /deep/.el-select {
    width: 90%;
  }
  .tit {
    text-align: end;
    line-height: 40px;
  }
  .el-row {
    padding: 10px 0 10px 10px;
    .el-col {
      padding-right: 0 !important;
    }
  }
}

.info {
  width:100%;
  height: 100%;
  background:rgba(255,255,255,1);
  border-radius:6px;
  .info-table {
    height: calc(100% - 41px - 45px);
  }
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
</style>
