<template>
  <div class="car-list">
    <div class="title">
      <match-bread-crumb></match-bread-crumb>
    </div>
    <div class="find">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6">车牌号</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.plate" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">姓名</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.name" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="5">身份证号</el-col>
          <el-col :span="19">
            <el-input v-model="queryCriteria.idcard" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6">车辆类型</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.type" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">车辆颜色</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.color" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="5">车辆品牌</el-col>
          <el-col :span="19">
            <el-input v-model="queryCriteria.brand" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6">车辆型号</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.model" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="8">

        </el-col>
        <el-col :span="6">

        </el-col>
        <el-col :span="4">
          <!-- 定位 -->
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click='submitQuery'>查询</el-button>
        </el-col>
      </el-row>
    </div>
    <div class="info">
      <div class="info-title">
        <img src="../../assets/img/warning.png" alt="">
        <span>已检索{{pages.totalRow}}项</span>
        <el-button
          class="create-table"
          type="warning"
          size="small"
          @click="dialogVisible = true">+ 新建</el-button>
      </div>
      <div class="info-table">
        <table-module
          :theads='theads'
          :tableData='tableData'
          :menus='menus'
          @edit='editCarInfo'
          @delete='deleteCarInfo'
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

    <!-- 新建基本信息 -->
    <el-dialog
      title="新建关注车"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <h1>基本信息</h1>
      <span slot="footer" class="dialog-footer">
        <el-form :model="infoCarForm" :rules="rules" ref="infoCarForm" label-width="100px" class="infoCarForm">
          <el-form-item label="车牌号" prop="plate">
            <el-input v-model="infoCarForm.plate"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="infoCarForm.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input v-model="infoCarForm.idcard"></el-input>
          </el-form-item>
          <el-form-item label="车辆类型" prop="type">
            <el-input v-model="infoCarForm.type"></el-input>
          </el-form-item>
          <el-form-item label="颜色" prop="color">
            <el-input v-model="infoCarForm.color"></el-input>
          </el-form-item>
          <el-form-item label="车辆品牌" prop="brand">
            <el-input v-model="infoCarForm.brand"></el-input>
          </el-form-item>
          <el-form-item label="车辆型号" prop="model">
            <el-input v-model="infoCarForm.model"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="resetForm('infoCarForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('infoCarForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <!-- 编辑基本信息 -->
    <el-dialog
      title="编辑关注车"
      :visible.sync="dialogVisibleEdit"
      width="40%"
      :before-close="handleCloseEdit">
      <h1>基本信息</h1>
      <span slot="footer" class="dialog-footer">
        <el-form :model="editCarFrom" :rules="rules" ref="editCarFrom" label-width="100px" class="editCarFrom">
          <el-form-item label="车牌号" prop="name">
            <el-input v-model="editCarFrom.plate"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editCarFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="name">
            <el-input v-model="editCarFrom.idcard"></el-input>
          </el-form-item>
          <el-form-item label="车辆类型" prop="name">
            <el-input v-model="editCarFrom.type"></el-input>
          </el-form-item>
          <el-form-item label="颜色" prop="name">
            <el-input v-model="editCarFrom.color"></el-input>
          </el-form-item>
          <el-form-item label="车辆品牌" prop="name">
            <el-input v-model="editCarFrom.brand"></el-input>
          </el-form-item>
          <el-form-item label="车辆型号" prop="name">
            <el-input v-model="editCarFrom.model"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormEdit('editCarFrom')">提交</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCarList, editCar, addCar, deleteCar } from '@/api/dealNewCar'

import MatchBreadCrumb from '@/components/common/MatchBreadCrumb'
import TableModule from '@/components/common/TableModule'

export default {
  name: 'car-list',
  props: ['newbar'],
  components: {
    MatchBreadCrumb,
    TableModule
  },
  data () {
    return {
      infoCarForm: {},
      editCarFrom: {},
      rules: {
        plate: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        color: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        brand: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        model: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      pages: {
        totalRow: 100, // 记录总数
        totalPage: 0, // 总页数
        pageSize: 15, // 每页条数
        pageNumber: 0 // 当前页码
      },
      dialogVisible: false,
      dialogVisibleEdit: false,
      queryCriteria: {},
      theads: [
        {
          prop: 'plate',
          label: '车牌号'
        },
        {
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'idcard',
          label: '身份证号'
        },
        {
          prop: 'type',
          label: '车辆类型'
        },
        {
          prop: 'color',
          label: '颜色'
        },
        {
          prop: 'brand',
          label: '车辆品牌'
        },
        {
          prop: 'model',
          label: '车辆型号'
        }
      ],
      tableData: [],
      menus: [
        {
          event: 'edit',
          type: 'primary',
          name: '修改'
        },
        {
          event: 'delete',
          type: 'danger',
          name: '删除'
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  async created () {
    this.dealCarList()
  },
  mounted () {

  },
  methods: {
    // 获取车列表
    async dealCarList (page) {
      let { data } = await getCarList(page)
      this.pages.totalRow = data.data.total
      this.pages.pageSize = data.data.size
      this.tableData = data.data.records || []
    },
    // 查询
    resetQuery () {
      this.queryCriteria = {}
      this.dealCarList()
    },
    submitQuery () {
      this.dealCarList(this.queryCriteria)
    },
    // @size-change
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.pages.pageNumber = 1
      this.dealCarList({
        pageNum: 1,
        pageSize: val
      })
    },
    // @current-change
    handleCurrentChange (val) {
      this.dealCarList({
        pageNum: val,
        pageSize: this.pages.pageSize
      })
    },
    handleClose (done) {
      this.infoCarForm = {}
      this.$refs.infoCarForm.clearValidate()
      done()
    },
    handleCloseEdit (done) {
      this.editCarFrom = {}
      this.$refs.editCarFrom.clearValidate()
      done()
    },
    // 新增车
    submitForm (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let data = await addCar(this.infoCarForm)
          // console.log(data)
          if (data.status === 200) {
            this.dialogVisible = false
            this.infoCarForm = {}
            this.$refs.infoCarForm.clearValidate()
            this.dealCarList()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 编辑车信息
    editCarInfo (index, data) {
      this.dialogVisibleEdit = true
      this.editCarFrom = data
    },
    submitFormEdit (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          let { data } = await editCar(this.editCarFrom)
          if (data.status === 200) {
            this.dialogVisibleEdit = false
            this.$refs.editCarFrom.clearValidate()
            this.$message({
              message: '修改成功',
              type: 'success'
            })
          }
        } else {
          return false
        }
      })
    },
    // 删除车
    async deleteCarInfo (index, res) {
      let result = await deleteCar(res.id)
      if (result.status === 200) {
        this.dealCarList()
        this.$message({
          message: '删除成功',
          type: 'danger'
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.car-list {
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
.find {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 245px;
  background:rgba(255,255,255,1);
  border-radius:6px;
  padding: 10px 0 10px 30px;
  margin-bottom: 20px;
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
  position: relative;
  .create-table {
    position: absolute;
    top: 4px;
    right: 55px;
  }
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
  .el-pagination {
    position: absolute;
    right: 10px;
  }
}

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
/deep/.el-dialog {
  border-radius: 6px;
  padding-bottom: 10px;
}
/deep/.el-dialog__body {
  padding: 0 100px;
}
/deep/.el-dialog__footer {
  padding: 0 100px;
}
/deep/.el-link.el-link--danger {
  padding: 0 10px;
}
</style>
