<template>
  <div class="table">
    <el-table
      v-if="height"
      ref="table"
      v-loading="loading"
      :data="tableData"
      :height="height"
      style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        fixed
        v-for="item of theads"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :sortable="item.sort"
        align="center"
        header-align="center"
        :show-overflow-tooltip="true"
      ></el-table-column>
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
    <el-table
      v-else
      ref="table"
      v-loading="loading"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <template  v-for="item of theads">
        <el-table-column
          v-if="item.prop !== 'xq'"
          fixed
          :key="item.prop"
          :prop="item.prop"
          :label="item.label"
          :sortable="item.sort"
          align="center"
          header-align="center"
          :show-overflow-tooltip="true"
        ></el-table-column>
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
            <div>
              <img class="table-img" :src="scope.row.xq" alt="">
              <span>{{scope.row.name}}</span>
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
  </div>
</template>

<script>

export default {
  props: {
    height: String,
    theads: Array,
    menus: Array,
    tableData: Array
  },
  components: {

  },
  data () {
    return {
      loading: true,
      loadingTimer: null
    }
  },
  watch: {
    tableData (val) {
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
          }, 2000)
        }
      }
    }
  },
  created () {

  },
  mounted () {
    if (this.tableData.length) {
      this.loading = false
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

.table-img {
  display: inline-block;
  width: 80px;
  height: 40px;
}
</style>
