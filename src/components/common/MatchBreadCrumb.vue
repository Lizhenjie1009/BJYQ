<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/list' }">关注信息</el-breadcrumb-item>
      <el-breadcrumb-item v-if="newbar">{{newbar}}</el-breadcrumb-item>
      <el-breadcrumb-item v-else>关注车牌列表</el-breadcrumb-item>
    </el-breadcrumb>
    <span class='text' v-if="newbar">{{newbar}}</span>
    <span class='text' v-else>关注车牌列表</span>
  </div>
</template>

<script>
export default {
  props: ['newbar'],
  watch: {
    $route (val) {
      console.log(val)
    }
  }

}
</script>

<style lang="scss" scoped>
  .el-breadcrumb {
    font-size: 18px;
    padding-bottom: 15px;
  }
  .bread-crumb {
    padding: 15px 0 0 30px;
  }
  .text {
    font-size:22px;
    font-weight:500;
    color:rgba(51,51,51,1);
    line-height:30px;
  }
</style>
