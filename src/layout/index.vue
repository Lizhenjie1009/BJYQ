<template>
  <div class="layout">
    <el-container style="height: 100%">
      <!-- 导航栏 -->
      <el-header>
        <nav-bar></nav-bar>
      </el-header>

      <!-- body -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside :width='!$store.getters.isCollapse ? "300px" : "64px"'>
          <aside-bar></aside-bar>
        </el-aside>

        <!-- 主体区域 -->
        <el-main>
          <!-- 导航标签 -->
          <!-- <tags-bar></tags-bar> -->
          <!-- 内容区域 -->
          <transition name="fade-transform" mode="out-in">
            <router-view></router-view>
          </transition>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideBar from './components/AsideBar'
// import CrumbsBar from './components/CrumbsBar'
import NavBar from './components/NavBar'
// import TagsBar from './components/TagsBar'

export default {
  components: {
    AsideBar,
    // CrumbsBar,
    NavBar
    // TagsBar
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
.el-container.is-vertical /deep/.el-header {
  height:70px !important;
}
.el-header /deep/ {
  width:1920px;
  background-color:rgba(255,255,255,1) !important;
  box-shadow:0px 4px 4px 0px rgba(0,0,0,0.06);
  padding: 0;
}
.layout {
  width: 100%;
  height: 100%;
}
aside {
  box-shadow: 0px -2px 4px 0px rgba(0,0,0,0.06);
  margin-bottom: 0;
  padding: 0;
  background: #fff;
  box-sizing: border-box;
}
.el-header {
  background-color: rgb(0, 53, 82);
  height: 60px !important;
}

.el-main {
  padding: 15px;
  background-color: #EDF0F5;
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all .5s;
}
.fade-transform-enter {
  opacity: 0;
  transform: translateX(-30px);
}
.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

</style>
