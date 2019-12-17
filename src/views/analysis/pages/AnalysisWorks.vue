<template>
  <div class="analysiswork">
    <a-spin :spinning="spinning">
      <a-row :gutter="16">
        <a-col :span="24" class="analysiswork-title">
          <h4>作品类型分布</h4>
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24" :style="{ marginBottom: '12px' }">
          <strong>TA发布作品总量 (112)</strong>
        </a-col>
        <a-col :span="12" v-if="legendAllOne.data.length">
          <PieChart :title="titleAllOne" :legend="legendAllOne" :series="seriesAllOne" />
        </a-col>
        <a-col :span="12" v-if="legendAllTwo.data.length">
          <PieChart :title="titleAllTwo" :legend="legendAllTwo" :series="seriesAllTwo" />
        </a-col>
        <a-col :span="24">
          <a-empty v-if="!legendAllOne.data.length && !legendAllTwo.data.length" />
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24" :style="{ marginBottom: '12px' }">
          <strong>作品高频关键词分布</strong>
        </a-col>
        <a-col :span="12">
          <Wordcloud v-if="seriesAllWorks.length" :title="titleAllWorks" :words="seriesAllWorks" />
        </a-col>
        <a-col :span="12">
          <Wordcloud v-if="seriesAllLabel.length" :title="titleAllLabel" :words="seriesAllLabel" />
        </a-col>
        <a-col :span="24">
          <a-empty v-if="!seriesAllLabel.length && !seriesAllWorks.length" />
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24" :style="{ marginBottom: '12px' }">
          <strong>作品简介 前20</strong>
        </a-col>
        <a-col :span="12">
          <Wordcloud
            v-if="seriesAllExpress.length"
            :title="titleAllExpress"
            :words="seriesAllExpress"
          />
        </a-col>
        <a-col :span="12">
          <Wordcloud
            v-if="seriesAllComments.length"
            :title="titleAllComments"
            :words="seriesAllComments"
          />
        </a-col>
        <a-col :span="24">
          <a-empty v-if="!seriesAllExpress.length && !seriesAllComments.length" />
        </a-col>
      </a-row>

      <a-row :gutter="16">
        <a-col :span="24" class="analysiswork-title">
          <h4>作品发布时间分布</h4>
          <div :style="{ marginTop: '16px' }">
            <a-radio-group v-model="barTimeValue" size="small" @change="onChangeBarTime">
              <a-radio-button value="1">全部</a-radio-button>
              <a-radio-button value="2">30天</a-radio-button>
              <a-radio-button value="3">90天</a-radio-button>
            </a-radio-group>
          </div>
        </a-col>

        <a-col :span="24" class="analysiswork-barChart">
          <BarChart
            v-if="dataMapListX.length"
            :xAis="dataMapListX"
            :legend="legend"
            :series="dataMapListY"
          />
          <a-empty v-else />
        </a-col>

        <a-col :span="24" class="analysiswork-title">
          <h4>作品数据详情</h4>
        </a-col>
        <a-col :span="24">
          <strong :style="{ margin: '12px 0' }">最多播放 TOP3</strong>
          <ListItem :dataList="bilibiliKolVideoInfoMostPlayList" />
        </a-col>
        <a-col :span="24" :style="{ marginTop: '24px' }">
          <strong :style="{ margin: '12px 0' }">最多收藏 TOP3</strong>
          <ListItem :dataList="bilibiliKolVideoInfoMostCollectList" />
        </a-col>
        <a-col :span="24" :style="{ marginTop: '24px' }">
          <strong :style="{ margin: '12px 0' }">最低播放 LOW3</strong>
          <ListItem :dataList="bilibiliKolVideoInfoLowPlayList" />
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PieChart from '@/components/Echart/PieChart.vue'
import Wordcloud from '@/components/Echart/Wordcloud.vue'
import BarChart from '@/components/Echart/BarChart.vue'
import ListItem from '@/components/List/ListItem.vue'
import { workDataAnalysis } from '@/api/analysis'
import { vipNotice } from '@/utils/util'

interface Params {
  kolId: string
  type: string
}

@Component({
  components: {
    PieChart,
    Wordcloud,
    BarChart,
    ListItem
  }
})
export default class Analysiswork extends Vue {
  private spinning: boolean = false
  private barTimeValue: string = '1'
  private bilibiliKolVideoInfoMostPlayList: any[] = []
  private bilibiliKolVideoInfoMostCollectList: any[] = []
  private bilibiliKolVideoInfoLowPlayList: any[] = []

  // 柱状图
  private dataMapListX: any[] = []
  private dataMapListY: any[] = []
  private legend: string[] = ['作品发布条数']

  // 饼状图 => 一级分类
  private titleAllOne: object = {
    subtext: '一级分类',
    x: 'center'
  }
  private legendAllOne: any = {
    orient: 'vertical',
    x: 'left',
    data: []
  }
  private seriesAllOne: any = []

  // 饼状图 => 二级分类
  private titleAllTwo: object = {
    subtext: '二级分类',
    x: 'center'
  }
  private legendAllTwo: any = {
    orient: 'vertical',
    x: 'left',
    data: []
  }
  private seriesAllTwo: any = []

  // 饼状图 => 作品标题
  private titleAllWorks: any = {
    subtext: '作品标题',
    x: 'center'
  }
  private seriesAllWorks: any = []

  // 饼状图 => 作品标签
  private titleAllLabel: any = {
    subtext: '作品标签',
    x: 'center'
  }
  private seriesAllLabel: any = []

  // 饼状图 => 作品简介
  private titleAllExpress: object = {
    subtext: '作品简介',
    x: 'center'
  }
  private seriesAllExpress: any = []

  // 饼状图 => 作品评论
  private titleAllComments: object = {
    subtext: '作品评论',
    x: 'center'
  }
  private seriesAllComments: any = []

  private mounted() {
    this.getWorkDataAnalysis({
      kolId:
        (this.$route.query as any).kolId || (this.$route.query as any).videoId,
      type: '1'
    })
  }

  // 作品粉丝画像分析 Function
  private getWorkDataAnalysis(params?: Params) {
    this.spinning = true
    return workDataAnalysis(params)
      .then((res: any) => {
        if (res.code === 200) {
          // 作品发布时间分布 柱状图
          if (this.barTimeValue === '1') {
            this.dataMapListX = Object.keys(res.dataMap).map((item: any) => {
              return `${item}: 00`
            })

            const dataMapListY = Object.values(res.dataMap).map((item: any) => {
              return item
            })

            this.dataMapListY = [
              {
                name: '作品发布条数',
                type: 'bar',
                smooth: true,
                stack: '总量',
                data: dataMapListY
              }
            ]
          }

          if (this.barTimeValue === '2') {
            this.dataMapListX = Object.keys(res.dataMap).map((item: any) => {
              return `${item}: 00`
            })

            const dataMapListY = Object.values(res.dataMap).map((item: any) => {
              return item
            })

            this.dataMapListY = [
              {
                name: '发布条数',
                type: 'bar',
                smooth: true,
                stack: '总量',
                data: dataMapListY
              }
            ]
          }

          if (this.barTimeValue === '3') {
            this.dataMapListX = Object.keys(res.dataMap).map((item: any) => {
              return `${item}: 00`
            })

            const dataMapListY = Object.values(res.dataMap).map((item: any) => {
              return item
            })

            this.dataMapListY = [
              {
                name: '发布条数',
                type: 'bar',
                smooth: true,
                stack: '总量',
                data: dataMapListY
              }
            ]
          }

          // 详情 => 最多播放
          this.bilibiliKolVideoInfoMostPlayList =
            res.bilibiliKolVideoInfoMostPlayList

          // 详情 => 最低播放
          this.bilibiliKolVideoInfoLowPlayList =
            res.bilibiliKolVideoInfoLowPlayList

          // 详情 => 最多收藏
          this.bilibiliKolVideoInfoMostCollectList =
            res.bilibiliKolVideoInfoMostCollectList

          // 发布作品总量 => 一级分类 饼状图
          const legendAllOne = res.kolThemeProportionInfoList.map(
            (item: any) => {
              return item.themeName
            }
          )

          this.legendAllOne.data = legendAllOne

          const seriesAllOne = res.kolThemeProportionInfoList.map(
            (item: any) => {
              return { value: item.videoNum, name: item.themeName }
            }
          )

          this.seriesAllOne = [
            {
              name: '作品数量',
              type: 'pie',
              minAngle: '5',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: '600'
                  }
                }
              },
              data: seriesAllOne
            }
          ]

          // 发布作品总量 => 二级分类 饼状图
          const legendAllTwo = res.kolTwoThemeProportionInfoList.map(
            (item: any) => {
              return item.themeName
            }
          )

          this.legendAllTwo.data = legendAllTwo

          const seriesAllTwo = res.kolTwoThemeProportionInfoList.map(
            (item: any) => {
              return { value: item.videoNum, name: item.themeName }
            }
          )

          this.seriesAllTwo = [
            {
              name: '作品数量',
              type: 'pie',
              minAngle: '5',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: '600'
                  }
                }
              },
              data: seriesAllTwo
            }
          ]

          // 发布高频关键词分布 => 作品标题 饼状图
          const videoTitleData = JSON.parse(res.videoTitleData)

          const seriesAllWorks = videoTitleData.map((item: any) => {
            const name = Object.keys(item).join('')
            const value = Object.values(item).join('')
            return { name: name, value: value }
          })

          this.seriesAllWorks = seriesAllWorks

          // 发布高频关键词分布 => 作品标签 饼状图
          const videoTagData = JSON.parse(res.videoTagData)

          const seriesAllLabel = videoTagData.map((item: any) => {
            const name = Object.keys(item).join('')
            const value = Object.values(item).join('')
            return { name: name, value: Number(value) }
          })

          this.seriesAllLabel = seriesAllLabel

          // 发布高频关键词分布 => 作品简介 饼状图
          const videoIntroData = JSON.parse(res.videoIntroData)

          const seriesAllExpress = videoIntroData.map((item: any) => {
            const name = Object.keys(item).join('')
            const value = Object.values(item).join('')
            return { name: name, value: Number(value) }
          })

          this.seriesAllExpress = seriesAllExpress

          // 发布高频关键词分布 => 作品简介 饼状图
          const videoCommentData = JSON.parse(res.videoCommentData)

          const seriesAllComments = videoCommentData.map((item: any) => {
            const name = Object.keys(item).join('')
            const value = Object.values(item).join('')
            return { name: name, value: Number(value) }
          })

          this.seriesAllComments = seriesAllComments
        }

        // 非会员无权限访问
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {})
        }
      })
      .catch((err: any) => {
        console.log(err)
      })
      .finally(() => (this.spinning = false))
  }

  // 柱状图时间选择
  private onChangeBarTime(e: any): void {
    this.barTimeValue = e.target.value

    this.getWorkDataAnalysis({
      kolId: (this.$route.query as any).kolId,
      type: e.target.value
    })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.analysiswork {
  .ant-empty {
    padding: 24px 0;
  }

  .analysiswork-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0 18px;

    h4 {
      border-left: 5px solid @active;
      padding-left: 6px;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>
