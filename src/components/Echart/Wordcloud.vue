<template>
  <div id="wordcloud" style="width: 100%; height: 340px;" ref="wordcloud"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref, Prop, Watch } from 'vue-property-decorator'

@Component
export default class Wordcloud extends Vue {
  @Ref() private wordcloud: any

  @Prop({ default: () => [] }) private words!: any
  @Prop({ default: () => [] }) private title!: any

  private $echarts: any
  private setWords: any = []
  private setTitle: object = {}

  private initEchart() {
    const myChart = this.$echarts.init(this.wordcloud)

    const option = {
      title: this.setTitle,
      tooltip: {
        show: true
      },
      toolbox: {
        show: true,
        feature: {
          saveAsImage: {}
        }
      },
      series: [
        {
          name: '',
          shape: 'circle',
          type: 'wordCloud',
          // size: ['95%', '95%'],
          sizeRange: [12, 60],
          textPadding: 0,
          gridSize: 12, // 间隔
          autoSize: {
            enable: true,
            minSize: 14
          },
          textStyle: {
            normal: {
              fontFamily: 'sans-serif',
              fontWeight: 'bold',
              color: function() {
                return (
                  'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ')'
                )
              }
            }
          },
          data: this.setWords
        }
      ]
    }
    // 设置图表的参数
    myChart.setOption(option)
  }

  // 设置标题
  @Watch('title', { immediate: true, deep: true })
  private watchTitle(val: object) {
    this.setTitle = {}
    if (val) {
      this.$nextTick(() => {
        this.setTitle = val
        this.initEchart()
      })
    }
  }

  @Watch('words', { immediate: true, deep: true })
  private watchWords(val: any): void {
    this.setWords = []
    if (val.length) {
      this.$nextTick(() => {
        this.setWords = val
        this.initEchart()
      })
    }
  }
}
</script>

<style lang="less" scoped>
#wordcloud {
  border: 1px solid #ececec;
  margin: 12px 12px 12px 0;
  border-radius: 4px;
}
</style>
