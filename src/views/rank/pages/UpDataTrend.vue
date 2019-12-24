<template>
  <div class="trend">
    <div v-if="permission" class="trend-permission">
      <img v-lazy="require('@/assets/images/jiashuju.png')" alt />
    </div>

    <a-spin v-else :spinning="spinning">
      <div class="trend-content-title">
        <h4>{{ `UP主数据趋势统计` }}</h4>
        <!-- <p>数据更新时间：2019-11-18 15:05</p> -->
      </div>

      <a-row>
        <a-col :span="24">
          <a-radio-group
            :value="activeNum"
            size="small"
            @change="onChangeRadio"
            :style="{ margin: '12px 0' }"
          >
            <a-radio-button value="0">周增量</a-radio-button>
            <a-radio-button value="1">周总量</a-radio-button>
          </a-radio-group>
        </a-col>

        <a-col :span="24">
          <LineChart
            v-if="weekAddseries.length"
            :xAis="weekAddxAis"
            :series="weekAddseries"
            :legend="weekAddList"
          />
        </a-col>

        <a-col :span="24" :style="{ margin: '24px 0' }">
          <LineChart
            v-if="weekAllseries.length"
            :xAis="weekAllxAis"
            :series="weekAllseries"
            :legend="weekAllList"
          />
        </a-col>
      </a-row>
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { histordatas } from '@/api/rank'
import LineChart from '@/components/Echart/LineChart.vue'
import { vipNotice } from '@/utils/util'

interface Params {
  [key: string]: string
}

@Component({
  components: {
    LineChart
  }
})
export default class UPTrend extends Vue {
  private spinning: boolean = false
  private activeNum: string = '0'
  private permission: boolean = false

  // 周增量
  private weekAddxAis?: any[] = []
  private weekAddseries?: any[] = []
  private weekAddList: string[] = [
    '弹幕数',
    '点赞数',
    '收藏数',
    '评论数',
    '粉丝数'
  ]

  // 周增量 播放数
  private weekAllxAis?: any[] = []
  private weekAllseries?: any[] = []
  private weekAllList: string[] = ['播放数']

  private created() {
    // 初始化图表数据
    this.getHistordatas({ kolId: (this.$route.query as any).kolId })
  }

  //  Chart
  public getHistordatas(params?: Params): any {
    this.spinning = true
    return histordatas(params)
      .then((res: any) => {
        if (res.code === 200) {
          if (this.activeNum === '0') {
            // 周增量 X 轴
            this.weekAddxAis = res.increaseDataMapList.map((item: any) => {
              return item.dateTime
            })

            // 周增量 Y 轴  弹幕数
            const barrageNum = res.increaseDataMapList.map((item: any) => {
              return item.barrageNum
            })

            // 周增量 Y 轴 点赞数
            const praiseNum = res.increaseDataMapList.map((item: any) => {
              return item.praiseNum
            })

            // 周增量 Y 轴 收藏数
            const collectNum = res.increaseDataMapList.map((item: any) => {
              return item.collectNum
            })

            // 周增量 Y 轴 评论数
            const commentNum = res.increaseDataMapList.map((item: any) => {
              return item.commentNum
            })

            // 周增量 Y 轴 粉丝数
            const fansNum = res.increaseDataMapList.map((item: any) => {
              return item.fansNum
            })

            const weekAllseries = [
              barrageNum,
              praiseNum,
              collectNum,
              commentNum,
              fansNum
            ]

            this.weekAddseries = weekAllseries.map(
              (item: any, index: number) => {
                return {
                  name: this.weekAddList[index],
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: item
                }
              }
            )

            // 周增量 X 轴 播放数
            this.weekAllxAis = res.increasePlayDataMaplist.map((item: any) => {
              return item.dateTime
            })

            // 周增量 Y 轴  播放数
            const playNum = res.increasePlayDataMaplist.map((item: any) => {
              return item.playNum
            })

            this.weekAllseries = [playNum].map((item: any, index: number) => {
              return {
                name: this.weekAllList[index],
                type: 'line',
                smooth: true,
                stack: '总量',
                data: item
              }
            })
          }

          if (this.activeNum === '1') {
            // 周增量 X 轴
            this.weekAddxAis = res.weekDataMapList.map((item: any) => {
              return item.dateTime
            })

            // 周增量 Y 轴  弹幕数
            const barrageNum = res.weekDataMapList.map((item: any) => {
              return item.barrageNum
            })

            // 周增量 Y 轴 点赞数
            const praiseNum = res.weekDataMapList.map((item: any) => {
              return item.praiseNum
            })

            // 周增量 Y 轴 收藏数
            const collectNum = res.weekDataMapList.map((item: any) => {
              return item.collectNum
            })

            // 周增量 Y 轴 评论数
            const commentNum = res.weekDataMapList.map((item: any) => {
              return item.commentNum
            })

            // 周增量 Y 轴 粉丝数
            const fansNum = res.weekDataMapList.map((item: any) => {
              return item.fansNum
            })

            const weekAllseries = [
              barrageNum,
              praiseNum,
              collectNum,
              commentNum,
              fansNum
            ]

            this.weekAddseries = weekAllseries.map(
              (item: any, index: number) => {
                return {
                  name: this.weekAddList[index],
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: item
                }
              }
            )

            // 周增量 X 轴 播放数
            this.weekAllxAis = res.weekPlayDataMaplist.map((item: any) => {
              return item.dateTime
            })

            // 周增量 Y 轴  播放数
            const playNum = res.weekPlayDataMaplist.map((item: any) => {
              return item.playNum
            })

            this.weekAllseries = [playNum].map((item: any, index: number) => {
              return {
                name: this.weekAllList[index],
                type: 'line',
                smooth: true,
                stack: '总量',
                data: item
              }
            })
          }
        }
        // 非会员无权限访问
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {})
          this.permission = true
        }
      })
      .finally(() => (this.spinning = false))
  }

  // Radio
  private onChangeRadio(e: any) {
    this.activeNum = e.target.value
    this.getHistordatas({ kolId: (this.$route.query as any).kolId })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.trend {
  display: flex;
  flex-direction: column;
  border: 1px solid #d9d9d9;
  padding: 12px;
  border-radius: 4px;

  .trend-permission {
    img {
      width: 100%;
      height: 100%;
    }
  }

  .trend-content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;

    h4 {
      border-left: 5px solid @active;
      padding-left: 6px;
      font-size: 16px;
      font-weight: 400;
    }

    p {
      font-size: 12px;
      font-weight: 400;
      color: #505050;
    }
  }
}
</style>
