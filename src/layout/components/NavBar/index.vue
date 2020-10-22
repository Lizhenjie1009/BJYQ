<template>
  <div class="nav-bar">
    <div class="logo">
      <img src="../../../assets/logo.png" alt="">
    </div>
    <div class="title">
      <span>内容审核系统</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'nav-bar',
  components: {

  },
  data () {
    return {

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

  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  height: 70px;
  box-sizing: border-box;
}
.logo {
  padding: 12px 15px;
  img {
    display: inline-block;
    width: 46px;
    height: 46px;
  }
}
.title {
  span {
    font-size: 22px;
    font-weight: 400;
    line-height: 70px;
  }
}
</style>
