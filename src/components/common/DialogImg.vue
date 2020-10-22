<template>
  <div class="dialog-img">
    <el-dialog
      :visible.sync="dialogVisible"
      width="30%"
      @close="cbDialogClose">
      <img class="dialogImg" :src="src" alt="">
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'dialog-img',
  props: ['src', 'show'],
  components: {

  },
  data () {
    return {
      dialogVisible: false
    }
  },
  computed: {

  },
  watch: {
    show (val) {
      if (val) {
        this.dialogVisible = true
      }
    }
  },
  created () {

  },
  mounted () {

  },
  methods: {
    cbDialogClose () {
      this.$emit('update:show', false)
    }
  }
}
</script>

<style lang="scss" scoped>
.dialogImg {
  display: block;
  width: 100%;
  height: 100%;
}
/deep/.el-dialog__headerbtn {
  font-size: 30px;
}
/deep/.el-dialog__body, /deep/.el-dialog__header {
  padding: 0;
}
</style>
