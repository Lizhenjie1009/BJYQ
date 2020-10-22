<template>
  <div class="aside-bar">
    <el-menu
      class="el-menu-vertical-demo"
      router
      :collapse="isCollapse"
      :default-active="activeMenu"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      unique-opened
    >
      <menu-item
        v-for="route in dealRoutes"
        :key="route.path"
        :item="route"
      ></menu-item>
    </el-menu>
  </div>
</template>

<script>
import MenuItem from '@/layout/components/AsideBar/MenuItem'
import variables from '@/styles/variables.scss'
import { constRoutes } from '@/router'

import { mapGetters } from 'vuex'

export default {
  name: 'aside-bar',
  components: {
    MenuItem
  },
  data () {
    return {
      routes: constRoutes
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ]),
    dealRoutes () {
      return this.routes.filter(route => route.hidden !== true)
    },
    activeMenu () {
      // 转到内容
      if (this.$route.name === 'detail') {
        return '/list/content'
      }
      return this.$route.path
    },
    variables () {
      return variables
    }
  },
  watch: {

  },
  created () {

  },
  mounted () {
    // console.log(this.routesAll(this.routes))
  },
  methods: {
    routesAll (routes) {
      return routes.filter(route => {
        if (route.children) {
          this.routesAll(route.children)
        }
        return route.hidden !== true
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.aside-bar {
  padding-top: 20px;
  background-color: #fff;
}

/deep/.el-menu {
  border-right: none;
}
</style>
