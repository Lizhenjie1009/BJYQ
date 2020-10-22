<template>
  <div class="plant-ocr">
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="7" class="tit">
            <span>检索车牌</span>
          </el-col>
          <el-col :span="17">
            <el-input v-model="queryParams.plate" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="tit">
            <span>车牌颜色</span>
          </el-col>
          <el-col :span="17">
            <el-select :popper-append-to-body="false" v-model="queryParams.plateColor" placeholder="请选择">
              <el-option
                v-for="item in plateColorType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="tit">
            <span>车牌分类</span>
          </el-col>
          <el-col :span="17">
            <el-select :popper-append-to-body="false" v-model="queryParams.plateClass" placeholder="请选择">
              <el-option
                v-for="item in plateType"
                :key="item.value"
                :label="item.itemName"
                :value="item.codes">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6" :push="1">
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="submitQuery">查询</el-button>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="7" class="tit">
            <span>检索车牌</span>
          </el-col>
          <el-col :span="17">
            <el-input v-model="queryParams.plate" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="tit">
            <span>车牌颜色</span>
          </el-col>
          <el-col :span="17">
            <el-select :popper-append-to-body="false" v-model="queryParams.plateColor" placeholder="请选择">
              <el-option
                v-for="item in plateColorType"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="7" class="tit">
            <span>车牌分类</span>
          </el-col>
          <el-col :span="17">
            <el-select :popper-append-to-body="false" v-model="queryParams.plateClass" placeholder="请选择">
              <el-option
                v-for="item in plateType"
                :key="item.value"
                :label="item.itemName"
                :value="item.codes">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6" :push="1">
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="submitQuery">查询</el-button>
        </el-col>
      </el-row> -->
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
import { getPlateList } from '@/api/sample-components/plate-ocr'
import { getDictionaryType } from '@/api/dealDictionary'
import TableModule from '@/components/common/CarTableModule'

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
      queryParams: {},
      pages: {
        totalRow: 100, // 记录总数
        totalPage: 0, // 总页数
        pageSize: 15, // 每页条数
        pageNumber: 1 // 当前页码
      },
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
          label: '群昵称'
        },
        {
          prop: 'plates',
          label: '车牌号'
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
          prop: 'msgTime',
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
    async dealDictionary (params) {
      let { data } = await getDictionaryType(params)
      console.log(data)
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
      let { data } = await getPlateList(params)
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
      this.getCarPlateList({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize
      })
    },
    submitQuery () {
      this.getCarPlateList({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize,
        ...this.queryParams
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
  background-color: #fff;
  border-radius:6px;
  margin-bottom: 20px;
  padding-bottom: 20px;
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
