<template>
  <div class="table">
    <el-table
      ref="tableData"
      :data="tableData"
      stripe
      border
      highlight-current-row
      v-loading="loading"
      height="auto"
      style="font-size: 14px;overflow: auto;"
      :header-cell-style="{
      'padding': '0',
      'background': '#eef1f6',
      'color': '#666',
      'height': '48px',
      'line-height': '48px'
    }"
      :row-style="{
      'height': '30px',
      'line-height': '30px'
    }"
    >
      <el-table-column
        fixed="left"
        label="标签"
        :width="80"
        header-align="center"
        align="center"
        v-if="tag"
      >
        <template slot-scope="scope">
          <el-tag
          :type="scope.row.tagType"
          disable-transitions>{{ scope.row.tag }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
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
        :width="menus && menus.length > 1 && menus.length < 4 ? menus.length * 100 : ''"
        label="操作"
        header-align="center"
        align="center"
        v-if="menus && menus.length"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-for="item of menus"
            :key="item.type"
            :type="item.type"
            v-show="item.visible ? scope.row[item.visible] : true"
            @click="handle(item.event, scope.$index, scope.row)"
          >{{item.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="!pages.hidden"
      small
      background
      layout="prev, pager, next, jumper, total, sizes"
      :total="pages.totalRow"
      :page-size="pages.pageSize"
      :page-count="pages.totalPage"
      :current-page="pages.pageNumber"
      @size-change="pages.handleSizeChange"
      @current-change="pages.handleCurrentChange"
      style="margin: 10px 0;"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      loadingTimer: null,
      pageState: false
    }
  },
  props: {
    theads: Array,
    tableData: Array,
    menus: Array,
    tag: Boolean,
    pages: {
      type: Object,
      default: () => {
        return {
          hidden: true,
          totalRow: 0,//记录总数
          totalPage: 1,//总页数
          pageSize: 20, //每页条数
          pageNumber: 1, //当前页码
          handleSizeChange:val => {
          },
          //@current-change
          handleCurrentChange:val => {
            
          }
        }
      }
    }
  },
  watch: {
    tableData(a, b) {
      if (!a.length) {
        this.loading = true
      }
      if (a.length) {
        this.loading = false
      } else {
        window.clearTimeout(this.loadingTimer)
        this.loadingTimer = setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if(this.tableData.length) {
        this.loading = false
      }
      this.pageState = true;
    });
  },
  methods: {
    handle(event, index, row) {
      this.$emit(event, index, row);
    },
    flexColumnWidth(str) {
      let flexWidth = 0;
      for (const char of str) {
        if ((char >= "A" && char <= "Z") || (char >= "a" && char <= "z")) {
          // 如果是英文字符，为字符分配8个单位宽度
          flexWidth += 8;
        } else if (char >= "\u4e00" && char <= "\u9fa5") {
          // 如果是中文字符，为字符分配20个单位宽度
          flexWidth += 20;
        } else {
          // 其他种类字符，为字符分配5个单位宽度
          flexWidth += 5;
        }
      }
      if (flexWidth < 50) {
        // 设置最小宽度
        flexWidth = 200;
      }
      if (flexWidth > 250) {
        // 设置最大宽度
        flexWidth = 250;
      }
      return flexWidth + "px";
    },
  }
};
</script>

<style lang="scss">
.table {
  flex: 1;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  width: 100%;
  .el-table .warning-row {
    background: oldlace;
  }
  .el-table .success-row {
    background: #f0f9eb;
  }
}
</style>
