<template>
  <div id="wordcloud" style="width: 100%; height: 340px;" ref="wordcloud"></div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'

@Component
export default class Wordcloud extends Vue {
  @Ref() private wordcloud: any

  private $echarts: any
  private words: any[] = [
    {
      name: '考研',
      value: 10000
    },
    {
      name: '兼职',
      value: 6181
    },
    {
      name: '食堂',
      value: 4386
    },
    {
      name: '家教',
      value: 4055
    },
    {
      name: '大四',
      value: 2467
    },
    {
      name: '研友',
      value: 2244
    },
    {
      name: '食堂',
      value: 4386
    },
    {
      name: '家教',
      value: 4055
    },
    {
      name: '大四',
      value: 2467
    },
    {
      name: '研友',
      value: 2244
    }
  ]

  private mounted() {
    this.$nextTick(() => {
      this.initEchart()
    })
  }

  private initEchart() {
    const myChart = this.$echarts.init(this.wordcloud)

    let option = {
      tooltip: {
        show: true
      },
      series: [
        {
          name: '',
          shape: 'circle',
          type: 'wordCloud',
          // size: ['95%', '95%'],
          sizeRange: [12, 60],
          textPadding: 0,
          gridSize: 40, // 间隔
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
          data: this.words
        }
      ]
    }

    // 设置图表的参数
    myChart.setOption(option)
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
