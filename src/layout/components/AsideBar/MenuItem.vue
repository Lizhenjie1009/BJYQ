<template>
  <div class="menu-item">
    <!-- 没有子路由 -->
    <!-- <template v-if="hasOneShowingChild(item)">
        <el-menu-item :index="item.children ? item.children[0].path : item.path">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.meta && item.meta.title}}</span>
        </el-menu-item>
    </template> -->
    <!-- 有子路由 -->
    <el-submenu  ref="subMenu" :index="item.path">
      <template slot="title">
        <i :class="'iconfont icon-' + item.meta.icon"></i>
        <!-- <span slot="title" @click="$router.push(item.path)">{{item.meta.title}}</span> -->
        <span slot="title">{{item.meta.title}}</span>
      </template>
      <el-menu-item v-if="item.path !== '/match' && item.path !== '/sample'" :index="item.children ? item.children[0].path : item.path">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">{{item.children[0].meta && item.children[0].meta.title}}</span>
      </el-menu-item>
      <template
      v-else
      v-for="route in item.children"
      >
        <el-menu-item
        :key="route.path"
        :index="route.path">
        <!-- <i class="el-icon-menu"></i> -->
        <span slot="title">{{route.meta && route.meta.title}}</span>
        </el-menu-item>
      </template>

      <!-- <menu-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        class="nest-menu"
      /> -->
    </el-submenu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'menu-item',
  props: ['item'],
  components: {

  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  watch: {

  },
  crea () {

  },
  mounted () {

  },
  methods: {
    hasOneShowingChild (item) {
      if (item.children && item.children.length === 1) {
        return true
      } else if (!item.children) {
        return true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
/*隐藏文字*/
  .el-menu--collapse  .el-submenu__title span{
    display: none;
  }
  /*隐藏 > */
  /deep/.el-icon-arrow-right:before {
    display: none !important;
  }
  // /deep/.el-submenu.is-opened .el-submenu__tite,
  /deep/.el-submenu.is-active .el-submenu__title {
    color: #fff !important;
    background-color: #026FFE !important;
    i {
      color: #fff !important;
    }
  }
  /deep/.el-submenu.is-opened>.el-submenu__title .el-submenu__icon-arrow {
    transform: rotateZ(0deg);
  }
  /deep/.el-submenu.is-active.is-opened>.el-submenu__title .el-submenu__icon-arrow {
    // background-color: #fff;
    // color: #fff;
    // transform: rotateZ(90deg);
    background-image: url('../../../assets/img/you1show.png');
  }
  /deep/.el-submenu>.el-submenu__title .el-submenu__icon-arrow {
    // background-color: #fff;
    // color: #fff;
    // transform: rotateZ(90deg);
    background-image: url('../../../assets/img/you1.png');
  }
  /deep/.el-submenu__icon-arrow {
    width: 14px;
    height: 14px;
    margin-top: -4px;
  }
  /deep/.el-submenu__title i.el-submenu__icon-arrow:before {
    content: '';
    position: absolute;
    width: 14px;
    height: 14px;
    // background-image: url('../../../assets/img/you1.png');
  }
</style>
