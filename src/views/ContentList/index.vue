<template>
  <div class="content-list">
    <!-- <div class="title">
      <bread-crumb></bread-crumb>
    </div> -->
    <div class="find" :style="coll ? 'height:235px' : 'height:80px;'">
      <el-row :gutter="20" class="no-padding">
        <el-col :span="6">
          <el-col :span="6">发送者ID</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.senderId" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">发送者昵称</el-col>
          <el-col :span="19">
            <el-input v-model="queryCriteria.senderName" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="6">是否为敏感</el-col>
          <el-col :span="18">
            <el-select :popper-append-to-body="false" class="is-sense" v-model="queryCriteria.isSense" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6">群昵称</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.groupName" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">查询时间</el-col>
          <el-col :span="19">
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
        <el-col :span="6">
          <el-col :span="6">内容属性</el-col>
          <el-col :span="18">
            <el-select :popper-append-to-body="false" v-model="queryCriteria.attr" placeholder="请选择">
              <el-option
                v-for="item in contentValue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="8">敏感内容分类</el-col>
          <el-col :span="16">
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
      </el-row>

      <!-- 定位 -->
      <div :class="['btns', coll ? '' : 'isColl']">
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click='submitQuery'>查询</el-button>
          <!-- <el-link @click='coll = !coll' style="margin-left: 10px" type="primary">
            <span v-if="coll">收起</span>
            <span v-else>展开</span>
          </el-link> -->
      </div>
    </div>
    <div class="info">
      <div class="info-title">
        <img src="../../assets/img/warning.png" alt="">
        <span>已检索{{pages.totalRow}}项</span>
      </div>
      <div class="info-table">
          <!-- :load='loading' -->
        <table-module
          :theads='theads'
          :dealTheads='dealTheads'
          :senseType='senseType'
          :tableData='tableData'
          :menus='menus'
          @detail='detail'
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
import { getMsgInfo } from '@/api/dealContent'
import { getDictionary } from '@/api/dealDictionary'

import BreadCrumb from '@/components/common/BreadCrumb'
import TableModule from '@/components/common/TableModule'

export default {
  name: 'content-list',
  props: ['newbar'],
  components: {
    BreadCrumb,
    TableModule
  },
  data () {
    return {
      loading: false,
      pages: {
        totalRow: 100, // 记录总数
        totalPage: 0, // 总页数
        pageSize: 15, // 每页条数
        pageNumber: 0 // 当前页码
      },
      coll: true, // 是否折叠
      queryCriteria: {
        isSense: '',
        attr: ''
      },
      contentValue: [
        {
          value: '',
          label: '全部'
        },
        {
          value: 'text',
          label: '文本'
        },
        {
          value: 'file',
          label: '图片/视频'
        }
      ],
      senseType: [],
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
          prop: 'msgTime',
          label: '时间'
        },
        {
          prop: 'context',
          label: '内容详情'
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
      tableData: [],
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
    this.dealGetMsgInfo()
    this.dealDictionary()
  },
  mounted () {

  },
  methods: {
    // 获取字典
    async dealDictionary () {
      let { data } = await getDictionary()
      this.senseType = data.data
      this.senseType.unshift({
        itemName: '全部'
      })
      console.log(this.senseType)
    },
    // 获取内容列表
    async dealGetMsgInfo (params) {
      this.loading = false
      let { data } = await getMsgInfo(params)
      if (data.status === 200) {
        this.loading = true
        let res = data.data
        this.pages.totalRow = res.total
        this.tableData = res.records || []
      }
    },
    resetQuery () {
      this.queryCriteria = {}
      this.dealGetMsgInfo()
    },
    submitQuery () {
      if (this.queryCriteria.date) {
        this.queryCriteria.beginTime = this.queryCriteria.date[0]
        this.queryCriteria.endTime = this.queryCriteria.date[1]
        delete this.queryCriteria.date
        this.dealGetMsgInfo(this.queryCriteria)
        return
      }
      this.dealGetMsgInfo(this.queryCriteria)
    },
    detail (idx, data) {
      this.$router.push('/list/detail/' + data.id)
    },
    // 分页 @size-change
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.pages.pageNumber = 1
      if (this.queryCriteria.date) {
        this.queryCriteria.beginTime = this.queryCriteria.date[0]
        this.queryCriteria.endTime = this.queryCriteria.date[1]
        delete this.queryCriteria.date
      }
      this.dealGetMsgInfo({
        pageNum: 1,
        pageSize: val,
        ...this.queryCriteria
      })
    },
    // @current-change
    handleCurrentChange (val) {
      this.pages.pageNumber = val
      if (this.queryCriteria.date) {
        this.queryCriteria.beginTime = this.queryCriteria.date[0]
        this.queryCriteria.endTime = this.queryCriteria.date[1]
        delete this.queryCriteria.date
      }
      this.dealGetMsgInfo({
        pageNum: val,
        pageSize: this.pages.pageSize,
        ...this.queryCriteria
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-list {
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: hidden !important;
}
.title {
  width: 100%;
  height: 90px;
  background-color: #fff;
  border-radius:6px;
  margin-bottom: 20px;
}
.no-padding {
  padding-top: 0 !important;
}
.find {
  // overflow: hidden;
  position: relative;
  width: 100%;
  height: 245px;
  background:rgba(255,255,255,1);
  border-radius:6px;
  padding: 10px 0 10px 30px;
  margin-bottom: 20px;
  .el-row {
    padding: 5px 0 !important;
  }
  /deep/.el-input {
    width: 85%;
  }
}
.btns {
  position: absolute;
  top: 180px;
  right: 60px;
}
.isColl {
  position: absolute;
  top: 20px;
  right: 60px;
}
.info {
  width:100%;
  background:rgba(255,255,255,1);
  border-radius:6px;
}
.info-title {
  height: 41px;
  line-height: 41px;
  padding-left: 30px;
  img {
    display: inline-block;
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
  /deep/ .el-select .el-input {
    width: 45% !important;
  }
  .el-pagination {
    position: absolute;
    right: -80px;
  }
}
// .is-sense {
//   /deep/.el-select-dropdown__list {
//     text-align: center;
//   }
// }
/deep/.el-col {
  height: 55px;
  padding: 10px 0;
  padding: 0 !important;
}
/deep/.el-row {
  line-height: 55px;
  padding: 10px 0;
  margin: 0 !important;
}
/deep/.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner {
  width: 85%;
}
/deep/.el-select .el-input {
  width: 100% !important;
}
</style>
