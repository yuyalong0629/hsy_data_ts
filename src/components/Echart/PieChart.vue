<template>
  <div id="pieChart" style="width: 100%; height: 400px;" ref="pieChart"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop, Watch } from 'vue-property-decorator'

@Component
export default class BarChart extends Vue {
  @Ref() private pieChart: any

  @Prop({ default: () => {} }) private title!: object
  @Prop({ default: () => {} }) private legend!: object
  @Prop({ default: () => [] }) private series!: any[]

  private $echarts: any

  private setTitle: object = {}
  private setLegend: object = {}

  private setSeries: object[] = []

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
      title: this.setTitle,
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}'
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      legend: this.setLegend,
      grid: {
        left: '6%',
        right: '4%',
        bottom: '6%',
        containLabel: false
      },
      series: this.setSeries
    }
    myChart.setOption(options)
  }

  // 设置标题
  @Watch('title', { immediate: true, deep: true })
  private watchTitle(val: object) {
    this.setTitle = {}
    if (val) {
      this.$nextTick(() => {
        this.setTitle = val
        this.drawChart()
      })
    }
  }

  // 设置 Label
  @Watch('legend', { immediate: true, deep: true })
  private watchLegend(val: object) {
    this.setLegend = {}
    if (val) {
      this.$nextTick(() => {
        this.setLegend = val
        console.log(this.setLegend)
        this.drawChart()
      })
    }
  }

  // 设置 Value
  @Watch('series', { immediate: true, deep: true })
  private watchSeries(val: any[]) {
    this.setSeries = []
    if (val.length) {
      this.$nextTick(() => {
        this.setSeries = val
        console.log(this.setSeries)
        this.drawChart()
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
