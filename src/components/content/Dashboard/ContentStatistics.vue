<template>
  <div class='content-statistics'>
    <span class='title'>内容数统计</span>
    <div class="legend">
      <span >近两周</span>
      <span class="legendSensitive"><span class="circleSensitive"></span><span>敏感内容</span></span>
      <span class="legendAll"><span class="circleAll"></span><span>全部内容</span></span>
    </div>
    <div id='all'>
    </div>
    <div id='sensitive'>
    </div>
  </div>
</template>

<script>
import { getStatistic } from '@/api/dealHome'
import echarts from 'echarts'

export default {
  components: {
  },
  data () {
    return {
      lineData: null
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
      let { data } = await getStatistic()
      this.lineData = data.data
      // 反转数据
      this.lineData.all.reverse()
      this.lineData.sensitive.reverse()
      this.lineData.date.reverse()

      this.drawLine('all')
      this.drawLine('sensitive')
    },
    drawLine (dom) {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById(dom))
      window.addEventListener('resize', function () {
        myChart.resize()
      })
      let data = []
      let borderColor = ''
      let startColor = ''
      let endColor = ''
      let axisLabelShow = true
      if (dom === 'all') {
        data = this.lineData.all
        borderColor = '#026FFE'
        startColor = 'rgba(238, 238, 238,0.35)'
        endColor = 'rgba(2, 111, 254,0.55)'
        axisLabelShow = false
      } else {
        data = this.lineData.sensitive
        borderColor = '#06D6A0'
        startColor = 'rgba(238, 238, 238,0.35)'
        endColor = 'rgba(6, 214, 160,0.55)'
        axisLabelShow = true
      }
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '5%',
          top: '5%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          // 坐标轴两边留白
          boundaryGap: false,
          data: this.lineData.date,
          // 坐标轴刻度标签的相关设置。
          axisLabel: {
            show: axisLabelShow,
            // 设置为 1，表示『隔一个标签显示一个标签』
            interval: 1,
            margin: 22,
            textStyle: {
              color: 'rgba(102,102,102,1)',
              fontStyle: 'normal',
              fontFamily: 'PingFangSC-Regular,PingFang SC',
              fontSize: 16,
              lineHeight: 22
            },
            formatter: function (params) {
              // 格式化日期
              params = params.substring(5)
              let newParamsName = ''
              let paramsNameNumber = params.length
              // 一行显示几个字
              let provideNumber = 8
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                  let tempStr = ''
                  let start = p * provideNumber
                  let end = start + provideNumber
                  if (p === rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
            // rotate:50,
          },
          // 坐标轴刻度相关设置。
          axisTick: {
            show: false
          },
          // 坐标轴轴线相关设置
          axisLine: {
            lineStyle: {
              color: '#EEEEEE'
              // opacity:0.2
            }
          },
          // 坐标轴在 grid 区域中的分隔线。
          splitLine: {
            show: true,
            lineStyle: {
              color: '#EEEEEE'
              // opacity:0.1
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            splitNumber: 3,
            axisLabel: {
              textStyle: {
                color: 'rgba(102,102,102,1)',
                fontStyle: 'normal',
                fontFamily: 'PingFangSC-Regular,PingFang SC',
                fontSize: 14
              }
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#EEEEEE'
                // opacity:0.1
              }
            }

          }
        ],
        series: [
          {
            // name: '2018',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: borderColor,
                lineStyle: {
                  color: borderColor,
                  width: 2
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{
                    offset: 0,
                    color: startColor
                  }, {
                    offset: 1,
                    color: endColor
                  }])
                }
              }
            },
            data: data
          }
        ]
      })
    },
    drawLegend () {

    }

  }
}
</script>

<style lang='scss' scoped>
  .content-statistics {
    position: relative;
    width:669px;
    height:431px;
    background:rgba(255,255,255,1);
    border-radius:6px;
    box-sizing: border-box;
    padding-top: 20px;
    .title {
      padding: 0 0 10px 20px;
      font-size:18px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:25px;
    }
    .legend{
      position: absolute;
      width:669px;
      height:20px;
      top:45px;
      left: 0px;
      padding: 10px 29px 10px 30px;
      .legendSensitive{
        float: right;
      }
      .legendAll{
        float: right;
        margin-right: 15px;
      }
      .circleAll{
        display: inline-block;
        width:12px;
        height:12px;
        background:linear-gradient(176deg,rgba(238,238,238,0.2) 0%,rgba(2,111,254,1) 100%);
        border:1px solid rgba(2,111,254,1);
        border-radius:6px;
        margin-right: 5px;
      }
      .circleSensitive{
        display: inline-block;
        width:12px;
        height:12px;
        background:linear-gradient(176deg,rgba(6,214,160,0) 0%,rgba(6,214,160,1) 100%);
        border:1px solid rgba(6,214,160,1);
        border-radius:6px;
        margin-right: 5px;
      }
    }
    #all{
      position: absolute;
      width:669px;
      height:150px;
      top:85px;
      left: 0px;
      padding: 0 40px 10px 30px;
      /*background:rgba(255,25,25,0.1);*/
    }
    #sensitive{
      position: absolute;
      width:669px;
      height:200px;
      top:240px;
      left: 0px;
      padding: 0 40px 20px 30px;
      /*background:rgba(25,25,225,0.1);*/
    }
  }
</style>
