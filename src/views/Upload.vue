<template>
  <div class="upload">
    <el-upload
      class="upload-demo"
      drag
      ref="uploadpic"
      action="/attPerson/uploadImage"
      :headers='uploadHeaders'
      :http-request='httpUpload'>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    </el-upload>
  </div>
</template>

<script>
import { uploadFile } from '@/api/upload'

export default {
  name: 'upload',
  components: {

  },
  data () {
    return {
      uploadHeaders: {
        'Content-Type': 'multipart/form-data'
      }
    }
  },
  computed: {

  },
  watch: {

  },
  created () {

  },
  mounted () {

  },
  methods: {
    // 图片上传
    httpUpload (context) {
      let formData = new FormData()
      formData.append('file', context.file)
      uploadFile(formData).then(({ data }) => {
        if (data.status === 200) {
          console.log(data)
          // this.addSampleItem.paths = data.data
          // console.log(this.images)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-demo {
  width: 360px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  /deep/.el-upload-list {
    width: 358px;
  }
}
</style>
