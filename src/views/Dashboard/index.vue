<template>
  <div class="home">
    <div class="center">
      <div class="center-top">
        <content-statistics></content-statistics>
        <all-statistics></all-statistics>
      </div>
      <div class="center-bottom">
        <sensitive-statistics></sensitive-statistics>
        <directed-content></directed-content>
      </div>
    </div>
    <div class="right">
      <sensitive-list />
    </div>
  </div>
</template>

<script>
import ContentStatistics from '@/components/content/Dashboard/ContentStatistics'
import AllStatistics from '@/components/content/Dashboard/AllStatistics'
import SensitiveStatistics from '@/components/content/Dashboard/SensitiveStatistics'
import DirectedContent from '@/components/content/Dashboard/DirectedContent'
import SensitiveList from '@/components/content/Dashboard/SensitiveList'

export default {
  name: 'home',
  components: {
    ContentStatistics,
    AllStatistics,
    SensitiveStatistics,
    DirectedContent,
    SensitiveList
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
.home {
  overflow: hidden;
  display: flex;
  justify-content: space-between;
}
.center {
  width: 1057px;
  .center-top {
    display: flex;
    margin-bottom: 20px;
    justify-content: space-between;
  }
  .center-bottom{
    display: flex;
    justify-content: space-between;
  }
}
.right {
  // width:503px;
  flex: 1;
  height:970px;
  margin-left: 20px;
}
</style>
