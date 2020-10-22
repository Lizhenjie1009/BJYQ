<template>
  <div id='chart' ref="abc"></div>
</template>

<script>
import * as d3 from 'd3'

import { getSpread } from '@/api/dealContent'
export default {
  data () {
    return {
      spreadInfo: {}
    }
  },
  props: {
  },
  watch: {
  },
  created () {
    this.getSpreadInfo(this.$route.params.id)
  },
  mounted () {
  },
  methods: {
    // 获取传播关系数据
    async getSpreadInfo (id) {
      let { data } = await getSpread(id)
      this.spreadInfo = data.data
      // 绘制传播关系图形
      this.drawRelation()
    },
    drawRelation () {
      let chartWidth = this.$refs.abc.offsetWidth
      let chartHeight = this.$refs.abc.offsetHeight - 50

      // 画布尺寸
      let margin = { top: 20, right: 150, bottom: 30, left: 90 }
      let width = chartWidth - margin.left - margin.right
      let height = chartHeight - margin.top - margin.bottom

      // 声明树布局并指定大小
      let treemap = d3.tree()
        .size([height, width])

      //  使用父子关系将数据分配给层次结构
      let nodes = d3.hierarchy(this.spreadInfo, function (d) {
        return d.next
      })

      // 将节点数据映射到树布局
      nodes = treemap(nodes)
      // 生成svg画布
      let svg = d3.select('#chart').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      let g = svg.append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      // 为每个节点添加连线
      g.selectAll('.link')
        .data(nodes.descendants().slice(1))
        .enter().append('path')
        .style('fill', 'none')
        .style('stroke', 'rgba(255, 142, 66,0.3)')
        .style('stroke-width', '3px')
        .attr('class', 'link')
        .attr('d', function (d) {
          return `M  ${d.y},${d.x}  L  ${d.parent.y},${d.parent.x}`
        })

      // 添加每个节点
      var node = g.selectAll('.node')
        .data(nodes.descendants())
        .enter().append('g')
        .attr('class', function (d) {
          return 'node' + (d.children ? ' node--internal' : ' node--leaf')
        })
        .attr('transform', function (d) {
          return 'translate(' + d.y + ',' + d.x + ')'
        })

      // 为节点添加白色蒙版
      node.append('svg:circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 60)
        .attr('stroke', 'none')
        .attr('fill', 'rgba(255, 255, 255,1)')

      // 为节点添加图片
      node.append('image')
        .attr('xlink:href', function (d) {
          return d.depth ? require('@/assets/img/children.png') : require('@/assets/img/parents.png')
        })
        .attr('x', function (d) { return d.children ? '-45px' : '-40px' })
        .attr('y', function (d) { return d.children ? '-45px' : '-40px' })
        .attr('width', function (d) { return d.children ? '90px' : '80px' })
        .attr('height', function (d) { return d.children ? '90px' : '80px' })

      // 为节点添加文字
      node.append('text')
        .attr('x', 0)
        .attr('y', 68)
        .style('text-anchor', 'middle')
        .style('font-size', '20px')
        .style('font-family', 'PingFangSC-Medium,PingFang SC')
        .style('font-weight', '500')
        .style('line-height', '28px')
        .style('color', 'rgba(51,51,51,1)')
        .style('text-anchor', 'middle')
        .text(function (d) { return d.data.name })
    }
  }
}
</script>

<style lang='scss' scoped>
  #chart{
    width: 100%;
    height: 100%;
  }
</style>
