<template>
  <div id="barChart" style="width: 100%; height: 400px;" ref="barChart"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'

@Component
export default class BarChart extends Vue {
  @Ref() private barChart: any

  private $echarts: any

  private legend: string[] = [
    '邮件营销',
    '联盟广告',
    '视频广告',
    '直接访问',
    '搜索引擎'
  ]

  private xAis: string[] = [
    '周一',
    '周二',
    '周三',
    '周四',
    '周五',
    '周六',
    '周日'
  ]

  private series: object[] = [
    {
      name: '邮件营销',
      type: 'bar',
      smooth: true,
      stack: '总量',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: '联盟广告',
      type: 'bar',
      smooth: true,
      stack: '总量',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: '视频广告',
      type: 'bar',
      smooth: true,
      stack: '总量',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: '直接访问',
      type: 'bar',
      smooth: true,
      stack: '总量',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: '搜索引擎',
      type: 'bar',
      smooth: true,
      stack: '总量',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]

  private mounted() {
    this.$nextTick(() => {
      this.drawChart()
    })
  }

  private drawChart() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = this.$echarts.init(this.barChart)
    // 指定图表的配置项和数据
    const options = {
      backgroundColor: '#FFF',
      title: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          lineStyle: {
            color: '#57617B'
          }
        }
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      legend: {
        data: this.legend
      },
      grid: {
        left: '6%',
        right: '4%',
        bottom: '6%',
        containLabel: false
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: this.xAis
      },
      yAxis: {},
      series: this.series
    }
    myChart.setOption(options)
  }
}
</script>

<style lang="less" scoped>
</style>
