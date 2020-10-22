<template>
  <div class="text-ocr">
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="7" class="tit">
            <span>检索内容</span>
          </el-col>
          <el-col :span="17">
            <el-input v-model="queryParams.content" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6" :push="1">
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
import { getCheckList } from '@/api/sample-components/text-ocr'
import TableModule from '@/components/common/NewTableModule'

export default {
  name: 'text-ocr',
  components: {
    TableModule
  },
  data () {
    return {
      queryParams: {},
      tableData: [],
      pages: {
        totalRow: 100, // 记录总数
        totalPage: 0, // 总页数
        pageSize: 15, // 每页条数
        pageNumber: 1 // 当前页码
      },
      theads: [
        {
          prop: 'ocrContent',
          label: '内容详情'
        },
        {
          prop: 'fileTypeNew',
          label: '文件类型'
        },
        {
          prop: 'imagePath',
          label: '图片'
        },
        {
          prop: 'insertTime',
          label: '时间'
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
    this.getCheckListData({
      pageNum: this.pages.pageNumber,
      pageSize: this.pages.pageSize,
      type: '1'
    })
  },
  mounted () {

  },
  methods: {
    async getCheckListData (params) {
      this.load = false
      let { data } = await getCheckList(params)
      if (data.status === 200) {
        this.load = true
        this.pages.totalRow = data.data.total
        this.pages.totalPage = data.data.pages
        this.pages.pageSize = data.data.size
        this.pages.pageNumber = data.data.current
        this.tableData = data.data.records.map(item => {
          if (item.fileType) {
            item.fileTypeNew = this.dealFileType(item.fileType)
          }
          return item
        })
      }
      console.log(data)
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
      this.queryParams = {}
      this.getCheckListData({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize,
        type: '1'
      })
    },
    submitQuery () {
      this.getCheckListData({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize,
        type: '1',
        ...this.queryParams
      })
    },
    detailInfo (idx, data) {
      this.$router.push('/list/detail/' + data.msgId)
    },
    // @size-change
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.pages.pageNumber = 1
      this.getCheckListData({
        pageNum: 1,
        pageSize: val,
        type: '1'
      })
    },
    // @current-change
    handleCurrentChange (val) {
      this.pages.pageNumber = val
      this.getCheckListData({
        pageNum: val,
        pageSize: this.pages.pageSize,
        type: '1'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-table__fixed-right::before, /deep/.el-table__fixed::before {
  height: 0;
}
.text-ocr {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.query {
  width: 100%;
  height: 80px;
  background-color: #fff;
  border-radius:6px;
  margin-bottom: 20px;
  .tit {
    text-align: end;
    line-height: 40px;
  }
  .el-row {
    padding: 20px 0 0 10px;
  }
}

.info {
  width:100%;
  height: calc(100% - 80px);
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
