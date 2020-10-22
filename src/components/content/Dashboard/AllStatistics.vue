<template>
  <div class='all-statistics'>
    <span class='title'>全部数据统计</span>
    <div id='proportion'>
      <div v-for='(item, index) in proportionData' :key='index' class='proportion'>
        <pie-chart
          :chartData='item'
          :idIndex='index'
        >
        </pie-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllStatistic } from '@/api/dealHome'
import PieChart from '@/components/common/PieChart'

export default {
  components: {
    PieChart
  },
  data () {
    return {
      proportionData: [],
      zeroData: [
        {
          all: {
            name: "全部内容",
            total: 0
          },
          sensitive: {
            name: "敏感内容",
            total: 0
          }
        },
        {
          all: {
            name: "全部群",
            total: 0
          },
          sensitive: {
            name: "敏感群",
            total: 0
          }
        },
        {
          all: {
            name: "全部人员",
            total: 0
          },
          sensitive: {
            name: "敏感人员",
            total: 0
          }
        }
      ]
    }
  },
  computed: {

  },
  watch: {

  },
  created () {
    this.getAllInfo()
  },
  mounted () {
  },
  methods: {
    // 获取敏感内容分类统计的数据
    async getAllInfo () {
      let { data } = await getAllStatistic()
      if (data.data.length > 0) {
        this.proportionData = data.data
      } else {
        this.proportionData = this.zeroData
      }
    }
  }
}
</script>

<style lang='scss' scoped>
  .all-statistics {
    position: relative;
    width:368px;
    height:431px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    padding-top: 20px;
    .title {
      padding: 0 0 10px 20px;
      font-size:18px;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:25px;
    }
    #proportion{
      width:368px;
      height:386px;
      top:45px;
    }
    /*.proportion{
      width:368px;
      height:128px;
      position: relative;
      padding-top: 28px;
    }*/
  }
</style>
