<template>
  <div id="pieChart" style="width: 100%; height: 400px;" ref="pieChart"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'

@Component
export default class BarChart extends Vue {
  @Ref() private pieChart: any

  private $echarts: any

  private legend: string[] = [
    '直接访问',
    '邮件营销',
    '联盟广告',
    '视频广告',
    '搜索引擎'
  ]

  private series: object[] = [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['50%', '70%'],
      avoidLabelOverlap: false,
      label: {
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '20',
            fontWeight: '600'
          }
        }
      },
      data: [
        { value: 335, name: '直接访问' },
        { value: 310, name: '邮件营销' },
        { value: 234, name: '联盟广告' },
        { value: 135, name: '视频广告' },
        { value: 1548, name: '搜索引擎' }
      ]
    }
  ]

  private mounted() {
    this.drawChart()
  }

  private drawChart() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = this.$echarts.init(this.pieChart)
    // 指定图表的配置项和数据
    const options = {
      backgroundColor: '#FFF',
      title: false,
      tooltip: {
        trigger: 'axis',
        axisPointer: {
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
      series: this.series
    }
    myChart.setOption(options)
  }
}
</script>

<style lang="less" scoped>
</style>
