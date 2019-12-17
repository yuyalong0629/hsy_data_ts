<template>
  <div class="analysisFans">
    <a-spin :spinning="spinning">
      <a-row :gutter="16" v-if="seriesGender.length">
        <a-col :span="12">
          <strong>粉丝性别分布</strong>
          <PieChart :title="titleGender" :legend="legendGender" :series="seriesGender" />
        </a-col>
        <a-col :span="12">
          <strong>粉丝年龄分布</strong>
          <PieChart
            v-if="seriesAge.length"
            :title="titleAge"
            :legend="legendAge"
            :series="seriesAge"
          />
        </a-col>
      </a-row>

      <a-row :gutter="16" v-if="seriesGender.length">
        <a-col :span="24">
          <strong>粉丝星座分布</strong>
          <BarChart :xAis="constellationX" :legend="legendConstellation" :series="constellationY" />
        </a-col>
        <a-col :span="24" :style="{ marginTop: '12px' }">
          <strong>粉丝地域分布</strong>
          <BarChart :xAis="areaX" :legend="legendArea" :series="areaY" />
        </a-col>
        <a-col :span="24" :style="{ marginTop: '12px' }">
          <strong>粉丝等级分布</strong>
          <BarChart :xAis="gradeX" :legend="legendGrade" :series="gradeY" />
        </a-col>
      </a-row>

      <a-empty v-else />
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PieChart from '@/components/Echart/PieChart.vue'
import BarChart from '@/components/Echart/BarChart.vue'
import { fansPortrait } from '@/api/analysis'
import { vipNotice } from '@/utils/util'

@Component({
  components: {
    PieChart,
    BarChart
  }
})
export default class AnalysisFans extends Vue {
  private spinning: boolean = false
  // 性别
  private titleGender: boolean = false
  private legendGender: object = {}
  private seriesGender: any = []

  // 性别
  private titleAge: boolean = false
  private legendAge: object = {}
  private seriesAge: any = []

  // 星座分布 柱状图
  private constellationX: any[] = []
  private legendConstellation: any[] = ['星座分布']
  private constellationY: any[] = []

  // 地域分布 柱状图
  private areaX: any[] = []
  private legendArea: any[] = ['地域分布']
  private areaY: any[] = []

  // 等级分布 柱状图
  private gradeX: any[] = []
  private legendGrade: any[] = ['地域分布']
  private gradeY: any[] = []

  private mounted() {
    this.getFansPortrait({
      kolId:
        (this.$route.query as any).kolId || (this.$route.query as any).videoId
    })
  }

  // Echart Function
  private getFansPortrait(params?: { kolId: string }): any {
    this.spinning = true
    return fansPortrait(params)
      .then((res: any) => {
        console.log(res.fansPortraitDataMap)
        if (res.code === 200) {
          // 性别
          const genderPortrait = JSON.parse(
            res.fansPortraitDataMap.genderPortrait
          )

          const legendGender = genderPortrait.map((item: any) => {
            return Object.values(item)
          })

          this.legendGender = {
            orient: 'vertical',
            x: 'left',
            y: '4%',
            data: legendGender.map((item: any, index: number) => {
              return item[0]
            })
          }

          this.seriesGender = [
            {
              name: '作品数量',
              type: 'pie',
              minAngle: '5',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              label: {
                formatter: '{b}：{c}',
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: '600'
                  }
                }
              },
              data: legendGender.map((item: any, index: number) => {
                return {
                  name: item[0],
                  value: item[1]
                }
              })
            }
          ]

          // 年龄
          const agePortrait = JSON.parse(res.fansPortraitDataMap.agePortrait)

          const legendAge = agePortrait.map((item: any) => {
            return Object.values(item)
          })

          this.legendAge = {
            orient: 'vertical',
            x: 'left',
            y: '4%',
            data: legendAge.map((item: any, index: number) => {
              return item[0]
            })
          }

          this.seriesAge = [
            {
              name: '作品数量',
              type: 'pie',
              minAngle: '5',
              radius: ['30%', '50%'],
              avoidLabelOverlap: false,
              label: {
                formatter: '{b}：{c}',
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '20',
                    fontWeight: '600'
                  }
                }
              },
              data: legendAge.map((item: any, index: number) => {
                return {
                  name: item[0],
                  value: item[1]
                }
              })
            }
          ]

          // 星座分布
          const constellationPortrait = JSON.parse(
            res.fansPortraitDataMap.constellationPortrait
          )

          const legenConstellation = constellationPortrait.map((item: any) => {
            return Object.values(item)
          })

          this.constellationX = legenConstellation.map(
            (item: any, index: number) => {
              return item[0]
            }
          )

          this.constellationY = [
            {
              name: '星座分布',
              type: 'bar',
              smooth: true,
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: legenConstellation.map((item: any, index: number) => {
                return item[1]
              })
            }
          ]

          // 地域分布
          const areaPortrait = JSON.parse(res.fansPortraitDataMap.areaPortrait)

          const legenArea = areaPortrait.map((item: any) => {
            return Object.values(item)
          })

          this.areaX = legenArea.map((item: any, index: number) => {
            return item[0]
          })

          this.areaY = [
            {
              name: '地域分布',
              type: 'bar',
              smooth: true,
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: legenArea.map((item: any, index: number) => {
                return item[1]
              })
            }
          ]

          // 等级分布
          const gradePortrait = JSON.parse(
            res.fansPortraitDataMap.gradePortrait
          )

          const legenGrade = gradePortrait.map((item: any) => {
            return Object.values(item)
          })

          this.gradeX = legenGrade.map((item: any, index: number) => {
            return item[0]
          })

          this.gradeY = [
            {
              name: '等级分布',
              type: 'bar',
              smooth: true,
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data: legenGrade.map((item: any, index: number) => {
                return item[1]
              })
            }
          ]
        }

        // 非会员无权限访问
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {})
        }
      })
      .catch((err: any) => console.log(err))
      .finally(() => (this.spinning = false))
  }
}
</script>

<style lang="less" scoped>
</style>
