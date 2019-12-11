<template>
  <div id="funnel" style="width: 100%; height: 400px;" ref="funnel"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'

@Component
export default class Funnel extends Vue {
  @Ref() private funnel: any

  private $echarts: any

  private mounted() {
    this.$nextTick(() => {
      this.drawChart()
    })
  }

  private drawChart() {
    const myChart = this.$echarts.init(this.funnel)

    // 指定图表的配置项和数据
    const options = {
      title: false,
      tooltip: {
        trigger: 'item'
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      legend: false,
      series: [
        {
          name: '数量',
          type: 'funnel',
          left: '30%',
          width: '50%',
          label: {
            normal: {
              position: 'left',
              formatter: '{b}'
            },
            emphasis: {
              position: 'left',
              formatter: '{b}: {c}'
            }
          },
          labelLine: {
            normal: {
              show: true
            }
          },
          itemStyle: {
            normal: {
              opacity: 0.7,
              borderColor: '#fff',
              borderWidth: 2
            }
          },
          data: [
            { value: 60, name: '曝光量' },
            { value: 40, name: '互动量' },
            { value: 20, name: '传播量' },
            { value: 80, name: '转化数据' }
          ]
        }
      ]
    }
    myChart.setOption(options)
  }
}
</script>

<style lang="less" scoped>
</style>
