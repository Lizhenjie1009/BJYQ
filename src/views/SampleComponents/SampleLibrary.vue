<template>
  <div class="sample-library">
    <div class="query">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-col :span="6" class="tit">
            <span>敏感分类</span>
          </el-col>
          <el-col :span="18">
            <el-select :popper-append-to-body="false" v-model="queryParams.fileClass" placeholder="请选择">
              <el-option
                v-for="item in senseType"
                :key="item.id"
                :label="item.itemName"
                :value="item.codes">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6">
          <el-col :span="6" class="tit">
            <span>文件类型</span>
          </el-col>
          <el-col :span="18">
            <el-select :popper-append-to-body="false" v-model="queryParams.fileType" placeholder="请选择">
              <el-option
                v-for="item in contentValue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
        </el-col>
        <el-col :span="6" :push="1">
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="primary" @click="queryData">查询</el-button>
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
          @click="dialogVisible = true">+ 添加</el-button>
      </div>
      <div class="info-table">
        <table-module
          :load='load'
          :theads='theads'
          :tableData='tableData'
          :menus='menus'
          @delete='deleteInfo'
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

    <el-dialog
      title="新建样本"
      :visible.sync="dialogVisible"
      width="35%"
      :before-close="handleClose">
        <el-form :model="addSampleItem" :rules="rules" ref="addSampleItem" label-width="100px" class="addSampleItem">
          <el-form-item label="文件上传" ref='uploadImg' prop='upload'>
            <el-upload
              class="upload-demo"
              drag
              ref="uploadpic"
              action="/attPerson/uploadImage"
              :headers='uploadHeaders'
              :http-request='httpUpload'
              :on-change="imageChange"
              :on-remove="imageRemove">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            </el-upload>
          </el-form-item>
          <el-form-item label="文件类型" prop="fileType">
            <el-select :popper-append-to-body="false" v-model="addSampleItem.fileType" placeholder="请选择">
              <el-option
                v-for="item in createContentValue"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="敏感分类" prop="fileClass">
            <el-select :popper-append-to-body="false" v-model="addSampleItem.fileClass" placeholder="请选择">
              <el-option
                v-for="item in createSenseType"
                :key="item.id"
                :label="item.itemName"
                :value="item.codes">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="简介">
            <el-input v-model="addSampleItem.fileIntro" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetFormData('addSampleItem')">重置</el-button>
            <el-button type="primary" @click="submitForm('addSampleItem')">立即添加</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getSampleList, addSampleList, uploadFile, deleteSampleList } from '@/api/sample-components/sample-library'
import { getDictionaryType } from '@/api/dealDictionary'
import TableModule from '@/components/common/ShowImgTableModule'

export default {
  name: 'sample-library',
  components: {
    TableModule
  },
  data () {
    return {
      load: false,
      editSampleItem: {},
      senseType: [],
      createSenseType: [],
      createContentValue: [
        {
          label: '图片',
          value: 'image'
        },
        {
          label: '视频',
          value: 'video'
        }
      ],
      contentValue: [
        {
          label: '全部'
        },
        {
          label: '图片',
          value: 'image'
        },
        {
          label: '视频',
          value: 'video'
        }
      ],
      addSampleItem: {
        paths: ''
      },
      tableData: [],
      queryParams: {},
      dialogVisible: false,
      dialogVisibleEdit: false,
      uploadHeaders: {
        'Content-Type': 'multipart/form-data'
      },
      images: [], // 图片存储
      haspic: false, // 默认没有传图片
      rules: {
        fileType: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        fileClass: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        upload: [
          { required: true, message: '请上传' }
        ]
      },
      pages: {
        totalRow: 100, // 记录总数
        totalPage: 0, // 总页数
        pageSize: 15, // 每页条数
        pageNumber: 1 // 当前页码
      },
      theads: [
        {
          prop: 'fileTypeNew',
          label: '文件类型'
        },
        {
          prop: 'fileClassNew',
          label: '分类'
        },
        {
          prop: 'filePath',
          label: '文件'
        },
        {
          prop: 'fileIntro',
          label: '简介'
        }
      ],
      menus: [
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
    this.dealDictionary({
      dictId: 'SAMPLE_FILE_CLASS'
    })
    this.getSampleFileList({
      pageNum: this.pages.pageNumber,
      pageSize: this.pages.pageSize
    })
  },
  mounted () {

  },
  methods: {
    // 查询
    queryData () {
      this.getSampleFileList({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize,
        ...this.queryParams
      })
    },
    // 查询
    resetQuery () {
      this.queryParams = {}
      this.getSampleFileList({
        pageNum: this.pages.pageNumber,
        pageSize: this.pages.pageSize
      })
    },
    // 获取字典
    async dealDictionary (params) {
      let { data } = await getDictionaryType(params)
      console.log(data)
      if (data.status === 200) {
        this.createSenseType = data.data.filter(v => v.itemName !== '全部')
        this.senseType = data.data
        this.senseType.unshift({
          itemName: '全部'
        })
        console.log(this.createSenseType)
      }
    },
    // 获取列表数据
    async getSampleFileList (params) {
      this.load = false
      let { data } = await getSampleList(params)
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
        }).map(v => {
          if (v.fileClass) {
            v.fileClassNew = this.dealFileClass(v.fileClass)
          }
          return v
        })
        console.log(this.tableData)
        // this.tableData = data.data.records
        // this.tableData = data.data.records.forEach(item => {
        //   item.fileType ? this.dealFileType(item.fileType) : item.fileType
        // })
      }
    },
    dealFileType (type) {
      let str = ''
      this.createContentValue.forEach(item => {
        item.value === type ? str = item.label : type
      })
      return str
    },
    dealFileClass (type) {
      let str = ''
      this.createSenseType && this.createSenseType.forEach(item => {
        item.codes === type ? str = item.itemName : type
      })
      return str
    },
    // 添加
    submitForm (formName) {
      if (this.haspic) {
        this.rules.upload = []
        this.$refs[formName].validate(async (valid) => {
          if (valid) {
            console.log(this.images)
            let data = await addSampleList(this.addSampleItem)
            console.log(data)
            if (data.status === 200) {
              this.haspic = false
              this.dialogVisible = false
              this.addSampleItem = {}
              // this.$refs.infoForm.clearValidate()
              // 清空上传
              this.$refs.uploadpic.clearFiles()
              // 重置表单
              this.$refs.addSampleItem.resetFields()
              // 恢复校验
              this.rules.upload = [{ required: true, message: '请上传' }]
              // 获取信息
              this.getSampleFileList()
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
        this.$refs.addSampleItem.validateField(['upload'])
      }
    },
    // 重置
    resetFormData (formName) {
      this.addSampleItem = {}
      this.$refs['uploadpic'].clearFiles()
      this.$refs[formName].resetFields()
    },
    handleClose () {
      this.$refs['uploadpic'].clearFiles()
      this.dialogVisible = false
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
      uploadFile(formData).then(({ data }) => {
        if (data.status === 200) {
          this.haspic = true
          this.$refs['uploadImg'].clearValidate()
          this.addSampleItem.paths = data.data
          console.log(this.images)
        }
      })
    },
    // 删除
    deleteInfo (idx, row) {
      this.$confirm('是否删除该文件?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        let { data } = await deleteSampleList(row.id)
        if (data.status === 200) {
          this.getSampleFileList({
            pageNum: this.pages.pageNumber,
            pageSize: this.pages.pageSize
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // @size-change
    handleSizeChange (val) {
      this.pages.pageSize = val
      this.pages.pageNumber = 1
      this.getSampleFileList({
        pageNum: 1,
        pageSize: val
      })
    },
    // @current-change
    handleCurrentChange (val) {
      this.pages.pageNumber = val
      this.getSampleFileList({
        pageNum: val,
        pageSize: this.pages.pageSize
      })
    }
  }
}
</script>

<style lang="scss" scoped>
/deep/.el-link.el-link--danger {
  padding: 0 10px;
}
/deep/.el-table__fixed-right::before, /deep/.el-table__fixed::before {
  height: 0;
}
.sample-library {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
/deep/.el-select {
  width: 100%;
}
.upload-demo {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /deep/.el-upload-list {
    width: 358px;
  }
}
.addSampleItem {
  width: 95%;
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
    height: calc(100% - 41px - 40px);
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
