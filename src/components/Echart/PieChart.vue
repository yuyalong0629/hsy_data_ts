<template>
  <div id="pieChart" style="width: 100%; height: 400px;" ref="pieChart"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'

@Component
export default class BarChart extends Vue {
  @Ref() private pieChart: any

  private $echarts: any

  private legend: string[] = ['男', '女']

  private series: object[] = [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['30%', '50%'],
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
      data: [{ value: 335, name: '男' }, { value: 310, name: '女' }]
    }
  ]

  private mounted() {
    this.$nextTick(() => {
      this.drawChart()
    })
  }

  private drawChart() {
    // 基于准备好的dom，初始化echarts实例
    const myChart = this.$echarts.init(this.pieChart)
    // 指定图表的配置项和数据
    const options = {
      backgroundColor: '#FFF',
      color: ['#008FD9', 'pink'],
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
        orient: 'vertical',
        x: 'left',
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
