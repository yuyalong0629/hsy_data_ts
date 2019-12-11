<template>
  <div class="analysiswork">
    <a-spin :spinning="spinning">
      <a-row :gutter="16">
        <a-col :span="24" class="analysiswork-title">
          <h4>作品类型分布</h4>
        </a-col>
        <a-col :span="24" :style="{ marginBottom: '12px' }">
          <strong>TA发布作品总量 (112)</strong>
        </a-col>
        <a-col :span="12">
          <PieChart :title="titleAllOne" :legend="legendAllOne" :series="seriesAllOne" />
        </a-col>
        <a-col :span="12">
          <PieChart :title="titleAllTwo" />
        </a-col>

        <a-col :span="24" :style="{ marginBottom: '12px' }">
          <strong>作品关键词分布</strong>
        </a-col>
        <a-col :span="12">
          <PieChart />
        </a-col>
        <a-col :span="12">
          <PieChart />
        </a-col>

        <a-col :span="24" :style="{ marginBottom: '12px' }">
          <strong>作品简介 前20</strong>
        </a-col>
        <a-col :span="12">
          <PieChart />
        </a-col>
        <a-col :span="12">
          <PieChart />
        </a-col>

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
          <BarChart :xAis="dataMapListX" :legend="legend" :series="dataMapListY" />
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
import BarChart from '@/components/Echart/BarChart.vue'
import ListItem from '@/components/List/ListItem.vue'
import { workDataAnalysis } from '@/api/analysis'

interface Params {
  kolId: string
  type: string
}

@Component({
  components: {
    PieChart,
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

  // 饼状图
  private titleAllOne: object = {
    subtext: '一级分类',
    x: 'center'
  }

  private legendAllOne: object = {}

  private seriesAllOne: any = []

  private titleAllTwo: object = {
    subtext: '二级分类',
    x: 'center'
  }

  private mounted() {
    this.getWorkDataAnalysis({
      kolId: (this.$route.query as any).kolId,
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

          this.legendAllOne = {
            orient: 'vertical',
            x: 'left',
            data: legendAllOne
          }

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
        }
      })
      .catch((err: any) => {
        console.log(err)
        this.$message.error('请求超时')
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
