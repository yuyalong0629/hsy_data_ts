<template>
  <div class="analysisInfo">
    <div class="analysisInfo-content-title">
      <h4>{{ `历史作品数据统计` }}</h4>
      <a-button-group size="small">
        <a-button
          type="primary"
          :disabled="!kolVideoInfoMap.prev"
          @click="clickPrev(kolVideoInfoMap.pageNo)"
        >
          <a-icon type="left" />上一页
        </a-button>
        <a-button
          type="primary"
          :disabled="!kolVideoInfoMap.next"
          @click="clickNext(kolVideoInfoMap.pageNo)"
        >
          下一页
          <a-icon type="right" />
        </a-button>
      </a-button-group>
    </div>

    <a-card hoverable style="margin: 20px 0; background: #f1f5f6;">
      <div class="analysisInfo-list">
        <a href="JavaScript:;" target="_blank" style="color: #00a1d6;">
          <div class="analysisInfo-list-title">{{ kolVideoInfoMap.title }}</div>
        </a>
        <p class="analysisInfo-list-content">{{ kolVideoInfoMap.summary }}</p>
        <div class="analysisInfo-list-label">
          <a-tag
            class="list-info-tag"
            color="pink"
            v-for="(item, index) of kolVideoInfoMap.tags"
            :key="index"
          >{{ item }}</a-tag>
        </div>
        <div class="analysisInfo-list-footer">
          <p class="list-info-time">{{`发布时间：${ kolVideoInfoMap.publishTime }`}}</p>
          <div class="list-info-actions-icon">
            <span style="margin-right: 12px">
              <a-icon type="youtube" theme="filled" />
              {{ kolVideoInfoMap.playNum }}
            </span>
            <span style="margin-right: 12px">
              <a-icon type="star" theme="filled" />
              {{ kolVideoInfoMap.collectNum }}
            </span>
            <span style="margin-right: 12px">
              <a-icon type="like" theme="filled" />
              {{ kolVideoInfoMap.praiseNum }}
            </span>
            <span style="margin-right: 12px">
              <a-icon type="message" theme="filled" />
              {{ kolVideoInfoMap.commentNum }}
            </span>
          </div>
        </div>
      </div>
    </a-card>

    <a-row v-if="dataAddseries.length">
      <a-col :span="24">
        <h4 class="analysisInfo-echart-title">数据趋势</h4>
      </a-col>

      <a-col :span="12"></a-col>

      <a-col :span="12" class="analysisInfo-time">
        <a-radio-group
          defaultValue="24"
          size="small"
          @change="onChangeRadioTime"
          :style="{ margin: '12px 0', float: 'right' }"
        >
          <a-radio-button value="24">24H</a-radio-button>
          <a-radio-button value="48">48H</a-radio-button>
          <a-radio-button value="72">72H</a-radio-button>
        </a-radio-group>
      </a-col>

      <a-col :span="24">
        <LineChart :xAis="dataAddxAis" :series="dataAddseries" :legend="dataAddList" />
      </a-col>

      <a-col :span="24" :style="{ margin: '24px 0' }">
        <LineChart :xAis="playAddxAis" :series="playAddseries" :legend="playAddList" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import LineChart from '@/components/Echart/LineChart.vue'
import { videoDayData } from '@/api/analysis'

interface Params {
  videoId: string
  num: number
}

@Component({
  components: {
    LineChart
  }
})
export default class AnalysisInfo extends Vue {
  @Prop({ default: () => {} }) private kolVideoInfoMap!: object
  @Prop({ default: () => {} }) private dayDataMap!: object

  // 增量 平均数
  private dataAddxAis?: any[] = []
  private dataAddseries?: any[] = []
  private dataAddList: string[] = ['弹幕数', '收藏数', '点赞数', '评论数']

  // 增量 播放数
  private playAddxAis?: any[] = []
  private playAddseries?: any[] = []
  private playAddList: string[] = ['播放数']

  // 上一页
  @Emit('handlePageNo')
  private clickPrev(num: number) {
    return num
  }

  // 下一页
  @Emit('handlePageNo')
  private clickNext(num: number) {
    return num
  }

  // 日期切换
  private onChangeRadioTime(e: any) {
    console.log((this.kolVideoInfoMap as any).id)
    this.getVideoDayData({
      videoId: (this.kolVideoInfoMap as any).id,
      num: e.target.value
    })
  }

  // 日数据切换
  private getVideoDayData(params?: Params): any {
    return videoDayData(params)
      .then((res: any) => {
        if (res.code === 200) {
          // 平均
          if (res.dayDataMap.dataMapList) {
            // 增量 Y 轴
            this.dataAddxAis = res.dayDataMap.dataMapList.map((item: any) => {
              return item.dateTime
            })

            // 增量 Y 轴  弹幕数
            const barrageNum = res.dayDataMap.dataMapList.map((item: any) => {
              return item.barrageNum
            })

            // 增量 Y 轴 收藏数
            const collectNum = res.dayDataMap.dataMapList.map((item: any) => {
              return item.collectNum
            })

            // 增量 Y 轴 点赞数
            const praiseNum = res.dayDataMap.dataMapList.map((item: any) => {
              return item.praiseNum
            })

            // 增量 Y 轴 评论数
            const commentNum = res.dayDataMap.dataMapList.map((item: any) => {
              return item.commentNum
            })

            const dataAddseries = [
              barrageNum,
              praiseNum,
              collectNum,
              commentNum
            ]

            this.dataAddseries = dataAddseries.map(
              (item: any, index: number) => {
                return {
                  name: this.dataAddList[index],
                  type: 'line',
                  smooth: true,
                  stack: '总量',
                  data: item
                }
              }
            )
          }

          if (res.dayDataMap.playDataMaplist) {
            // 播放数 X 轴
            this.playAddxAis = res.dayDataMap.playDataMaplist.map(
              (item: any) => {
                return item.dateTime
              }
            )

            // 播放数 Y 轴 播放数
            const playNum = res.dayDataMap.playDataMaplist.map((item: any) => {
              return item.playNum
            })

            this.playAddseries = [playNum].map((item: any, index: number) => {
              return {
                name: this.playAddList[index],
                type: 'line',
                smooth: true,
                stack: '总量',
                data: item
              }
            })
          }
        }
      })
      .catch((err: any) => console.log(err))
  }

  @Watch('dayDataMap', { immediate: true })
  private watchDayDataMap(val: object): void {
    // 平均
    if ((val as any).dataMapList) {
      // 增量 Y 轴
      this.dataAddxAis = (val as any).dataMapList.map((item: any) => {
        return item.dateTime
      })

      // 增量 Y 轴  弹幕数
      const barrageNum = (val as any).dataMapList.map((item: any) => {
        return item.barrageNum
      })

      // 增量 Y 轴 收藏数
      const collectNum = (val as any).dataMapList.map((item: any) => {
        return item.collectNum
      })

      // 增量 Y 轴 点赞数
      const praiseNum = (val as any).dataMapList.map((item: any) => {
        return item.praiseNum
      })

      // 增量 Y 轴 评论数
      const commentNum = (val as any).dataMapList.map((item: any) => {
        return item.commentNum
      })

      const dataAddseries = [barrageNum, praiseNum, collectNum, commentNum]

      this.dataAddseries = dataAddseries.map((item: any, index: number) => {
        return {
          name: this.dataAddList[index],
          type: 'line',
          smooth: true,
          stack: '总量',
          data: item
        }
      })
    }

    if ((val as any).playDataMaplist) {
      // 播放数 X 轴
      this.playAddxAis = (val as any).playDataMaplist.map((item: any) => {
        return item.dateTime
      })

      // 播放数 Y 轴 播放数
      const playNum = (val as any).playDataMaplist.map((item: any) => {
        return item.playNum
      })

      this.playAddseries = [playNum].map((item: any, index: number) => {
        return {
          name: this.playAddList[index],
          type: 'line',
          smooth: true,
          stack: '总量',
          data: item
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.analysisInfo {
  .analysisInfo-content-title {
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
  }

  .analysisInfo-list {
    display: flex;
    flex-direction: column;

    .analysisInfo-list-title {
      line-height: 24px;
    }

    .analysisInfo-list-content {
      color: #999;
      line-height: 24px;
      .ellipsisMore();
    }

    .analysisInfo-list-label {
      margin: 12px 0;
    }

    .analysisInfo-list-footer {
      display: flex;
      justify-content: space-between;

      .list-info-time {
        flex: 1;
      }

      .list-info-actions-icon {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }

  .analysisInfo-echart-title {
    border-left: 5px solid @active;
    padding-left: 6px;
    font-size: 16px;
    font-weight: 400;
    margin-top: 12px;
  }
}
</style>
