<template>
  <div class='container'>
    <div :id=this.id class="chart">
    </div>
    <div id='text'>
      <div class='sensitive'><div class='square' :style='{background:allColor}'></div><span class='leftText'>{{this.chartData.sensitive.name}} {{sensitiveCount}}</span><span class='rightText'>{{sensitivePercentage}}</span></div>
      <div class='nonSensitive'><span class='square' :style='{background:sensitiveColor}'></span><span class='leftText'>非{{this.chartData.sensitive.name}} {{nonSensitiveCount}}</span><span class='rightText'>{{nonSensitivePercentage}}</span></div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  data () {
    return {
      width: 368,
      height: 128,
      allColor: 'rgba(74,153,255,1)',
      sensitiveColor: 'rgba(205,205,205,1)',
      allCount: 0,
      sensitiveCount: 0,
      nonSensitiveCount: 0,
      sensitivePercentage: 0,
      nonSensitivePercentage: 0,
      id: ''
    }
  },
  props: {
    chartData: Object,
    idIndex: Number
  },
  watch: {
  },
  created () {
    this.id = `pieChart${this.idIndex}`
  },
  mounted () {
    this.drawChart()
  },
  methods: {
    drawChart () {
      // 处理数据
      this.allCount = this.chartData.all.total
      this.sensitiveCount = this.chartData.sensitive.total
      this.nonSensitiveCount = this.chartData.all.total - this.chartData.sensitive.total
      this.sensitivePercentage = this.allCount === 0 ? '0%' : Math.floor((this.sensitiveCount / this.chartData.all.total).toFixed(2) * 100) + '%'
      this.nonSensitivePercentage = this.allCount === 0 ? '0%' : Math.floor((this.nonSensitiveCount / this.chartData.all.total).toFixed(2) * 100) + '%'

      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(this.id))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      // 绘制图表
      myChart.setOption({
        title: [{
          show: true,
          text: '{count|' + this.allCount + '}\n{name|' + this.chartData.all.name + '}',
          top: 'center',
          left: 'center',
          textStyle: {
            rich: {
              count: {
                fontWeight: 'normal',
                color: '#333333',
                fontFamily: 'Arial-BoldMT,Arial',
                fontSize: '18',
                lineHeight: '20'
              },
              name: {
                fontWeight: '400',
                color: '#333333',
                fontFamily: 'PingFangSC-Regular,PingFang SC',
                fontSize: '14',
                lineHeight: '20'
              }
            }
          }
        }],
        color: ['#CDCDCD'],
        legend: {
          show: false,
          itemGap: 12,
          data: []
        },

        series: [{
          name: 'Line 1',
          type: 'pie',
          clockWise: true,
          center: ['50%', '50%'],
          radius: ['70%', '90%'],
          itemStyle: {
            normal: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          },
          hoverAnimation: false,
          data: [{
            value: this.sensitiveCount,
            name: '01',
            itemStyle: {
              normal: {
                color: { // 完成的圆环的颜色
                  colorStops: [{
                    offset: 0,
                    color: '#4A99FF' // 0% 处的颜色
                  }, {
                    offset: 1,
                    color: '#4A99FF' // 100% 处的颜色
                  }]
                },
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            }
          }, {
            name: '02',
            value: this.allCount === 0 ? 1 : this.nonSensitiveCount
          }]
        }]
      })
    }
  }
}
</script>

<style lang='scss' scoped>
  .container{
    position: relative;
    width: 368px;
    height: 128px;
    .chart{
      position: absolute;
      top:0px;
      left: 0px;
      width: 128px;
      height: 128px;
      display: inline-block;
      padding-left: 15px;
    }
    #text{
      position: absolute;
      top:0px;
      right: 0px;
      width: 240px;
      height: 128px;
      display: inline-block;
      .sensitive{
        position: absolute;
        width: 200px;
        top:45px;
        left: 17px;
        height: 20px;
      }
      .nonSensitive{
        position: absolute;
        width: 200px;
        top:77px;
        left: 17px;
        height: 20px;
      }
      .square{
        width:14px;
        height:14px;
        border-radius:2px;
        display: inline-block;
        margin: 3px 3px
      }
      .leftText{
        position: absolute;
        line-height:20px;
        font-size:14px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
      }
      .rightText{
        position: absolute;
        line-height:20px;
        left: 158px;
        font-size:16px;
        font-family:Arial-BoldMT,Arial;
        font-weight:normal;
        color:rgba(51,51,51,1);
      }
    }
  }
</style>
