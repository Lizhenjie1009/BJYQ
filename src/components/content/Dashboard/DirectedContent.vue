<template>
  <div class='directed-centent'>
    <span class="title">定向内容</span>
    <div class="content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="人脸检测" name="first">
          <el-scrollbar style="height:100%">
            <table-module
              :toggle='activeName'
              :load='loading'
              height='410'
              :tableData='tableData'
              :theads='theads'
              :menus='menus'
              @detail='detail'
              @more='more'
            ></table-module>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="车牌识别" name="second">
          <el-scrollbar style="height:100%">
            <table-module
              :toggle='activeName'
              :load='loading'
              height='410'
              :tableData='tableData'
              :theads='theadsTwo'
              :menus='menus'
              @detail='detail'
              @more='more'
            ></table-module>
          </el-scrollbar>
        </el-tab-pane>
        <el-tab-pane label="维文识别" name="third">
          <el-scrollbar style="height:100%">
            <table-module
              :toggle='activeName'
              :load='loading'
              height='410'
              :tableData='tableData'
              :theads='theadsThird'
              :menus='menus'
              @detail='detail'
              @more='more'
            ></table-module>
          </el-scrollbar>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { getAttList } from '@/api/dealHome'
import { getFaceList } from '@/api/sample-components/search-picture'
import { getPlateList } from '@/api/sample-components/plate-ocr'
import { getCheckList } from '@/api/sample-components/text-ocr'
import TableModule from '@/components/common/TableModule'

export default {
  components: {
    TableModule
  },
  data () {
    return {
      loading: false,
      activeName: 'first',
      tableData: [],
      theads: [
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
          label: '内容简介'
        },
        {
          prop: 'vivien',
          label: '人脸'
        }
      ],
      theadsTwo: [
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
          label: '内容简介'
        },
        {
          prop: 'plates',
          label: '车牌号'
        }
      ],
      theadsThird: [
        {
          prop: 'ocrContent',
          label: '内容详情'
        },
        {
          prop: 'insertTime',
          label: '时间'
        },
        {
          prop: 'imagePath',
          label: '内容简介'
        }

      ],
      menus: [
        {
          event: 'detail',
          type: 'primary',
          name: '详情'
        },
        {
          event: 'more',
          type: 'primary',
          name: '更多'
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    // this.getPersonFace({ type: 3 })
    this.getFaceList()
  },
  mounted () {

  },
  methods: {
    // 人脸列表
    async getFaceList () {
      this.load = false
      let { data } = await getFaceList({
        pageNum: 1,
        pageSize: 999
      })
      if (data.status === 200) {
        console.log(data)
        this.load = true
        this.tableData = data.data.records || []
        // this.tableData = data.data.records.map(item => {
        //   if (item.fileType) {
        //     item.fileTypeNew = this.dealFileType(item.fileType)
        //   }
        //   return item
        // })
      }
    },
    // 车牌列表
    async getCarList () {
      this.load = false
      let { data } = await getPlateList({
        pageNum: 1,
        pageSize: 999
      })
      if (data.status === 200) {
        this.load = true
        this.tableData = data.data.records || []
      }
      console.log(data)
    },
    // 维文列表
    async getOcrList () {
      this.load = false
      let { data } = await getCheckList({
        pageNum: 1,
        pageSize: 999,
        type: '1'
      })
      if (data.status === 200) {
        this.load = true
        this.tableData = data.data.records || []
      }
      console.log(data)
    },
    // 获取定向内容
    async getPersonFace (type) {
      let { data } = await getAttList(type)
      console.log(data)
      if (data.status === 200) {
        this.loading = true
        this.tableData = data.data || []
      }
      console.log(this.tableData)
    },
    handleClick (tab, event) {
      this.loading = false
      let type = 0
      this.tableData = []
      switch (tab.label) {
        case '人脸检测':
          type = 3
          this.getFaceList()
          break
        case '车牌识别':
          type = 4
          this.getCarList()
          break
        case '维文识别':
          type = 6
          this.getOcrList()
          break
      }
      // this.getPersonFace({ type })
    },
    detail (idx, data) {
      if (this.activeName === 'third') {
        this.$router.push('/list/detail/' + data.msgId)
      } else {
        this.$router.push('/list/detail/' + data.id)
      }
    },
    more (idx, row) {
      // console.log(row, this.activeName)
      if (this.activeName === 'first') {
        this.$router.push('/sample/face-picture-list')
      } else if (this.activeName === 'second') {
        this.$router.push('/sample/plant-ocr')
      } else if (this.activeName === 'third') {
        this.$router.push('/sample/text-key-ocr')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.directed-centent {
  width:752px;
  height:519px;
  overflow: hidden;
  background:rgba(255,255,255,1);
  border-radius:6px;
  box-sizing: border-box;
  padding-top: 20px;
}
.title {
  padding-left: 20px;
  font-size:18px;
  font-weight:500;
  color:rgba(51,51,51,1);
  line-height:25px;
}
.content {
  padding-top: 5px;
}
/deep/.el-table__fixed-right::before, /deep/.el-table__fixed::before, /deep/.el-table::before {
  height: 0;
}
/deep/.el-tabs__nav-wrap::after {
  content:'';
  background-color: #fff;
}
/deep/.el-tabs__item {
  padding: 0 37.5px;
  font-size: 16px;
  font-weight: 500;
}
/deep/.el-tabs__active-bar {
  height: 3px;
  background-color: #4a99ff;
}
/deep/.el-tabs__header {
  margin: 0;
  padding-left: 20px;
}
/deep/.el-table_1_column_2 div {
  width: 155px !important;
}
</style>
