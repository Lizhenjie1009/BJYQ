<template>
  <div class='sensitive-list'>
    <span class="title">敏感内容列表</span>
    <div class="content">
      <table-module
        :load='loading'
        height='915'
        :tableData='tableData'
        :theads='theads'
        :menus='menus'
        @detail='detail'
      ></table-module>
    </div>
  </div>
</template>

<script>
import { getSenseList } from '@/api/dealHome'
import TableModule from '@/components/common/TableModule'

export default {
  components: {
    TableModule
  },
  data () {
    return {
      loading: false,
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
    this.getSensitiveList()
  },
  mounted () {

  },
  methods: {
    // 取敏感内容列表
    async getSensitiveList () {
      let { data } = await getSenseList()
      if (data.status === 200) {
        this.loading = true
        this.tableData = data.data || []
      }
    },
    detail (idx, data) {
      this.$router.push('/list/detail/' + data.id)
    }
  }
}
</script>

<style lang="scss" scoped>
// /deep/.el-table th>.cell {
//   width: 103% !important;
// }
.sensitive-list {
  // width:503px;
  height:970px;
  background:rgba(255,255,255,1);
  border-radius:6px;
  padding-top: 20px;
  overflow: hidden;
  .title {
    padding: 0 0 10px 20px;
    font-size:18px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:25px;
  }
  .content {
    margin-top: 15px;
  }
}
/deep/.el-table__row td:nth-child(2) div {
  width: 151px !important;
}
// /deep/.el-table_4_column_16 div {
//   width: 151px !important;
// }
/deep/.el-table__row td:nth-child(3)>div {
  width: 160px !important;
}
</style>
