<template>
  <div class="person-list">
    <div class="title">
      <match-bread-crumb newbar='关注人列表'></match-bread-crumb>
    </div>
    <div class="find">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6">姓名</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.name" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">身份证号</el-col>
          <el-col :span="19">
            <el-input v-model="queryCriteria.idcard" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="6">民族</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.nation" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6">性别</el-col>
          <el-col :span="18">
            <el-select :popper-append-to-body="false" v-model="queryCriteria.gender" placeholder="请选择">
              <el-option label="全部" value=""></el-option>
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="2"></el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="8">
          <el-col :span="5">生日</el-col>
          <el-col :span="19">
            <el-date-picker
              v-model="queryCriteria.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="6">地址</el-col>
          <el-col :span="18">
            <el-input v-model="queryCriteria.address" suffix-icon="el-icon-search" placeholder="请输入"></el-input>
          </el-col>
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
          @edit='editPerson'
          @delete='deletePerson'
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
      title="新建关注人"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <h1>基本信息</h1>
      <span slot="footer" class="dialog-footer">
        <el-form :model="infoForm" :rules="rules" ref="infoForm" label-width="100px" class="infoForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="infoForm.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号" >
            <el-input v-model="infoForm.idcard"></el-input>
          </el-form-item>
          <el-form-item label="民族" >
            <el-input v-model="infoForm.nation"></el-input>
          </el-form-item>
          <el-form-item label="性别" >
            <el-input v-model="infoForm.gender"></el-input>
          </el-form-item>
          <el-form-item label="生日" >
            <el-input v-model="infoForm.birthday"></el-input>
          </el-form-item>
          <el-form-item label="地址" >
            <el-input v-model="infoForm.address"></el-input>
          </el-form-item>
          <el-form-item label="关注人图像" ref='uploadImg' prop='upload'>
            <el-upload
              class="upload-demo"
              drag
              ref="uploadpic"
              action="/attPerson/uploadImage"
              :headers='uploadHeaders'
              :http-request='httpUpload'
              :on-change="imageChange"
              :on-remove="imageRemove"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('infoForm')">重置</el-button>
            <el-button type="primary" @click="submitForm('infoForm')">立即创建</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
      </span>
    </el-dialog>

    <!-- 编辑基本信息 -->
    <el-dialog
      title="编辑关注人"
      :visible.sync="dialogVisibleEdit"
      width="40%"
      :before-close="handleCloseEdit">
      <h1>基本信息</h1>
      <span slot="footer" class="dialog-footer">
        <el-form :model="editFrom" :rules="rules" ref="editFrom" label-width="100px" class="editFrom">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="editFrom.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="editFrom.idcard"></el-input>
          </el-form-item>
          <el-form-item label="民族">
            <el-input v-model="editFrom.nation"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="editFrom.gender"></el-input>
          </el-form-item>
          <el-form-item label="生日">
            <el-input v-model="editFrom.birthday"></el-input>
          </el-form-item>
          <el-form-item label="地址">
            <el-input v-model="editFrom.address"></el-input>
          </el-form-item>
          <el-form-item label="关注人图像" ref='uploadEditImg' prop='upload'>
            <el-upload
              class="upload-demo"
              drag
              ref="uploadEditpic"
              action="/attPerson/uploadImage"
              :headers='uploadHeaders'
              :http-request='httpUploadEdit'
              :on-change="imageChangeEdit"
              :on-remove="imageRemoveEdit"
              multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitFormEdit('editFrom')">提交</el-button>
          </el-form-item>
        </el-form>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImg, getPersonList, editPerson, addPerson, deletePerson } from '@/api/dealNewPerson'

import MatchBreadCrumb from '@/components/common/MatchBreadCrumb'
import TableModule from '@/components/common/TableModule'

export default {
  name: 'person-list',
  props: ['newbar'],
  components: {
    MatchBreadCrumb,
    TableModule
  },
  data () {
    return {
      loading: false,
      uploadHeaders: {
        'Content-Type': 'multipart/form-data'
      },
      images: [], // 图片存储
      haspic: false, // 默认没有传图片
      infoForm: {},
      editFrom: {},
      rules: {
        name: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        idcard: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        gender: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        address: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        upload: [
          { required: true, message: '请上传' }
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
          prop: 'name',
          label: '姓名'
        },
        {
          prop: 'idcard',
          label: '身份证号'
        },
        {
          prop: 'groupId',
          label: '群ID'
        },
        {
          prop: 'nation',
          label: '民族'
        },
        {
          prop: 'gender',
          label: '性别'
        },
        {
          prop: 'birthday',
          label: '生日'
        },
        {
          prop: 'address',
          label: '地址'
        },
        {
          prop: 'context',
          label: '关注人图像'
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
  created () {
    this.dealPersonList()
  },
  mounted () {

  },
  methods: {
    // 获取人列表
    async dealPersonList (page) {
      this.loading = true
      let { data } = await getPersonList(page)
      this.pages.totalRow = data.data.total
      this.pages.pageSize = data.data.size
      this.tableData = data.data.records || []
      console.log(this.tableData)
    },
    // 查询
    resetQuery () {
      this.queryCriteria = {}
      this.dealPersonList()
    },
    submitQuery () {
      this.dealPersonList(this.queryCriteria)
    },
    // @size-change
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.pages.pageNumber = 1
      this.dealPersonList({
        pageNum: 1,
        pageSize: val
      })
      // this.searchPost2.pageNumber = 1;
      // this.searchPost2.pageSize = val;
      // this.getBlackListSp(this.searchPost2);
    },
    // @current-change
    handleCurrentChange (val) {
      this.dealPersonList({
        pageNum: val,
        pageSize: this.pages.pageSize
      })

      // this.searchPost2.pageNumber = val;
      // this.getBlackListSp(this.searchPost2);
    },
    handleClose (done) {
      this.images = []
      this.infoForm = {}
      this.$refs.infoForm.clearValidate()
      done()
    },
    handleCloseEdit (done) {
      this.images = []
      this.editFrom = {}
      this.$refs.editFrom.clearValidate()
      done()
    },
    // 新增
    submitForm (formName) {
      if (this.haspic) {
        this.rules.upload = []
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            let data = await addPerson(this.infoForm)
            console.log(data)
            if (data.status === 200) {
              this.haspic = false
              this.dialogVisible = false
              this.infoForm = {}
              this.images = []
              // this.$refs.infoForm.clearValidate()
              // 清空上传
              this.$refs.uploadpic.clearFiles()
              // 重置表单
              this.$refs.infoForm.resetFields()
              // 恢复校验
              this.rules.upload = [{ required: true, message: '请上传' }]
              // 获取信息
              this.dealPersonList()
              this.$message({
                message: '创建成功',
                type: 'success'
              })
            }
          } else {
            return false
          }
        })
      } else {
        this.$refs.infoForm.validateField(['name', 'upload'])
      }
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 图片改变
    imageChange (file, fileList, name) {
      // 存储照片
      this.images['file'] = fileList
      this.haspic = true
      // 如果上传了就不显示提示图片警告
      if (typeof this.images.file !== 'undefined') {
        if (this.images.file.length > 0) {
          this.$refs['uploadImg'].clearValidate()
        }
      }
    },
    // 图片移除
    imageRemove (file, fileList, name) {
      // 如果images为空了说明并没有提交图片所以需要显示警告
      if (typeof this.images.file !== 'undefined') {
        if (this.images.file.length > 0) {
          this.$refs['uploadImg'].clearValidate()
        } else {
          this.$refs['uploadImg'].validate()
          this.haspic = false
        }
      }
    },
    // 图片上传
    httpUpload (context) {
      let formData = new FormData()
      formData.append('file', context.file)
      uploadImg(formData).then(({ data }) => {
        if (data.status === 200) {
          this.haspic = true
          this.$refs['uploadImg'].clearValidate()
          this.infoForm.imagePath = data.data
          console.log(data)
        }
        // console.log(data)
      })
    },
    // 编辑人信息
    editPerson (index, data) {
      this.dialogVisibleEdit = true
      this.editFrom = data
    },
    submitFormEdit (formName) {
      if (this.haspic) {
        this.rules.upload = []
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.editFrom)
            this.haspic = false
            let { data } = await editPerson(this.editFrom)
            if (data.status === 200) {
              this.dialogVisibleEdit = false
              // 清空上传
              this.$refs.uploadEditpic.clearFiles()
              this.$refs.editFrom.clearValidate()
              // 恢复校验
              this.rules.upload = [{ required: true, message: '请上传' }]
              this.$message({
                message: '修改成功',
                type: 'success'
              })
            }
          } else {
            return false
          }
        })
      } else {
        this.$refs.editFrom.validateField(['name', 'upload'])
      }
    },
    // 删除
    async deletePerson (index, res) {
      let result = await deletePerson(res.id)
      if (result.status === 200) {
        this.dealPersonList()
        this.$message({
          message: '删除成功',
          type: 'danger'
        })
      }
    },
    // edit图片改变
    imageChangeEdit (file, fileList, name) {
      // 存储照片
      this.images['file'] = fileList
      this.haspic = true
      // 如果上传了就不显示提示图片警告
      if (typeof this.images.file !== 'undefined') {
        if (this.images.file.length > 0) {
          this.$refs['uploadEditImg'].clearValidate()
        }
      }
    },
    // edit图片移除
    imageRemoveEdit (file, fileList, name) {
      // 如果images为空了说明并没有提交图片所以需要显示警告
      if (typeof this.images.file !== 'undefined') {
        if (this.images.file.length > 0) {
          this.$refs['uploadEditImg'].clearValidate()
        } else {
          this.$refs['uploadEditImg'].validate()
          this.haspic = false
        }
      }
    },
    // edit图片上传
    httpUploadEdit (context) {
      let formData = new FormData()
      formData.append('file', context.file)
      uploadImg(formData).then(({ data }) => {
        if (data.status === 200) {
          this.haspic = true
          this.$refs['uploadEditImg'].clearValidate()
          this.editFrom.imagePath = data.data
        }
        // console.log(data)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-select {
  width: 100%;
}
.person-list {
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
  width: 100%;
  height: 170px;
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
.upload-demo {
  width: 360px;
  position: relative;
}
/deep/.el-link.el-link--danger {
  padding: 0 10px;
}
// .infoForm {
//   width: 70%;
//   margin: 0 auto;
// }
</style>
