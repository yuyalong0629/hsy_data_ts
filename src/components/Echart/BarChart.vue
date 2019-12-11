<template>
  <div id="barChart" style="width: 100%; height: 400px;" ref="barChart"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop, Watch } from 'vue-property-decorator'

@Component
export default class BarChart extends Vue {
  @Ref() private barChart: any

  @Prop({ default: () => [] }) private xAis?: any[]
  @Prop({ default: () => [] }) private series?: any[]
  @Prop({ default: () => [] }) private legend?: any[]

  private xAisData: any[] = []
  private seriesData: any[] = []
  private legendData: any[] = []

  private $echarts: any

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
        data: this.legendData
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
        data: this.xAisData
      },
      yAxis: {},
      series: this.seriesData
    }
    myChart.setOption(options)
  }

  @Watch('xAis', { immediate: true, deep: true })
  private getXAis(val: any[]): void {
    this.xAisData = []
    if (val.length) {
      this.$nextTick(() => {
        this.xAisData = val
        this.drawChart()
      })
    }
  }

  @Watch('series', { immediate: true, deep: true })
  private getSeries(val: any[]): void {
    this.seriesData = []
    if (val.length) {
      this.$nextTick(() => {
        this.seriesData = val
        this.drawChart()
      })
    }
  }

  @Watch('legend', { immediate: true, deep: true })
  private getLegend(val: any[]): void {
    this.legendData = []
    if (val.length) {
      this.$nextTick(() => {
        this.legendData = val
        this.drawChart()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
