<template>
  <div class='sensitive-statistics'>
    <span class='title'>敏感内容分类统计</span>
    <div id='pie'>
    </div>
    <div id='description'>
      <p><span class='totalNum'>{{this.total}}</span><br/><span class='totalText'>敏感内容总数</span></p>
    </div>
    <div id='legend'>
      <div v-for='(item, index) in seriesData' :key='index' class='item'>
        <div class='square' :style='{background:item.color}'></div><span class='legendText'>{{item.name}}</span><span class='legendNum'>{{item.percentage}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getTypeStatistic } from '@/api/dealHome'
import { toThousands } from '@/utils/index'
import echarts from 'echarts'

export default {
  components: {
  },
  data () {
    return {
      pieData: null,
      total: null,
      colorArr: [
        '#FFD166',
        '#06D6A0',
        '#0024D2',
        '#A34CF8',
        '#5CBAFF',
        '#EF476F'
      ],
      seriesData: [],
      zeroColor: '#CDCDCD'
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this.getTypeStatist()
  },
  mounted () {
  },
  methods: {
    // 获取敏感内容分类统计的数据
    async getTypeStatist () {
      let { data } = await getTypeStatistic()
      this.pieData = data.data
      this.total = toThousands(this.pieData.total)

      // 格式化数据
      let index = 0
      for (let key in this.pieData.typeData) {
        let obj = {}
        obj.name = key
        obj.value = this.pieData.typeData[key]
        if (this.pieData.total) {
          obj.percentage = Math.floor((this.pieData.typeData[key] / this.pieData.total).toFixed(2) * 100) + '%'
          obj.itemStyle = { normal: { color: this.colorArr[index % 6] } }
        } else {
          obj.percentage = '0%'
          obj.itemStyle = { normal: { color: this.zeroColor } }
        }
        obj.color = this.colorArr[index % 6]
        index++

        this.seriesData.push(obj)
      }

      // 绘图
      this.drawPie()
    },
    drawPie () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('pie'))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '敏感内容',
            type: 'pie',
            radius: [70, 100],
            center: ['50%', '50%'],
            label: {
              show: false
            },
            roseType: 'radius',
            data: this.seriesData
          }
        ]
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .sensitive-statistics {
    position: relative;
    width:285px;
    height:519px;
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
    #pie{
      width:285px;
      height:235px;
    }
    #description{
      position: absolute;
      width:285px;
      height:50px;
      top:125px;
      left: 0px;
      text-align: center;
      line-height: 22px;
      .totalNum{
        font-size:16px;
        font-family:Arial-BoldMT,Arial;
        font-weight:normal;
        color:rgba(51,51,51,1);
        line-height:22px;
      }
      .totalText{
        font-size:16px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
      }
    }
    #legend{
      width:285px;
      height:239px;
      .item{
        width: 285px;
        height: 22px;
        padding: 16px 10px;
        .square{
          width:14px;
          height:14px;
          border-radius:2px;
          display: inline-block;margin:0px 4px
        }
        .legendText{
          font-size:16px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:22px;
        }
        .legendNum{
          float: right;
          font-size:16px;
          font-family:Arial-BoldMT,Arial;
          font-weight:normal;
          color:rgba(51,51,51,1);
          line-height:22px;
        }
      }
    }
  }
</style>
