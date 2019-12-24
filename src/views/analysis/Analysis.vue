<template>
  <div class="analysis">
    <div class="analysis-left">
      <UserInfo :kolInfo="kolInfo" :isCollect="isCollect" />
    </div>
    <div class="analysis-right">
      <UserNumber :kolTotalData="kolTotalData" />

      <div :style="{ margin: '16px 0' }">
        <a-radio-group defaultValue="0" buttonStyle="solid">
          <a-radio-button value="0" @click="onChangeRadio('0')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>作品发布后72小时内分钟级数据趋势图</span>
              </template>
              作品数据趋势
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="2" @click="onChangeRadio('2')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>五大维度解析UP主粉丝属性，提高广告人群精准度</span>
              </template>
              粉丝画像分析
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="1" @click="onChangeRadio('1')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>大数据分析UP主视频作品高频词，准确定位UP主内容调性</span>
              </template>
              作品画像分析
            </a-tooltip>
          </a-radio-button>
        </a-radio-group>
      </div>

      <div class="analysis-container">
        <a-spin :spinning="spinning">
          <component
            :is="componentId"
            :kolVideoInfoMap="kolVideoInfoMap"
            :dayDataMap="dayDataMap"
            :videoNum="videoNum"
            :times="times"
            @handlePageNo="handlePageNo"
          ></component>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { videoData } from '@/api/analysis'
import UserInfo from '@/components/UserInfo/UserInfo.vue'
import UserNumber from '@/components/UserInfo/UserNumber.vue'
import AnalysisInfo from './pages/AnalysisInfo.vue'
import AnalysisWork from './pages/AnalysisWorks.vue'
import AnalysisFans from './pages/AnalysisFans.vue'
import { vipNotice } from '@/utils/util'

@Component({
  components: {
    UserInfo,
    UserNumber,
    AnalysisInfo,
    AnalysisWork,
    AnalysisFans
  }
})
export default class Analysis extends Vue {
  private spinning: boolean = false
  private isCollect: boolean = false
  private kolInfo: object = {}
  private kolTotalData: object = {}
  private componentId: string = 'AnalysisInfo'
  private kolVideoInfoMap: object = {}
  private dayDataMap: object = {}
  private videoNum?: number
  // 日期切换
  private times!: []

  private data() {
    return {
      videoNum: 0,
      times: []
    }
  }

  private mounted() {
    // 监控 =>
    if (this.$route.query.videoId) {
      this.getVideoData({
        type: '1',
        videoId: this.$route.query.videoId
      })
      return
    }
    // 默认 =>
    this.getVideoData({
      kolId: this.$route.query.kolId,
      pageNo: 0
    })
  }

  // Radio
  private onChangeRadio(key: string): void {
    if (key === '0') {
      this.componentId = 'AnalysisInfo'

      if (this.$route.query.videoId) {
        this.getVideoData({
          videoId: this.$route.query.videoId,
          type: '1'
        })
      } else {
        this.getVideoData({
          kolId: this.$route.query.kolId,
          pageNo: 0
        })
      }
    }
    if (key === '1') {
      this.componentId = 'AnalysisWork'
    }
    if (key === '2') {
      this.componentId = 'AnalysisFans'
    }
  }

  //  初始化 信息 Function
  public getVideoData(params: any): any {
    this.spinning = true
    return videoData(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.kolInfo = {
            ...res.kolInfoMap,
            fansNum: res.kolTotalDataMap.fansNum,
            playNum: res.kolTotalDataMap.playNum,
            chargingNum: res.kolTotalDataMap.chargingNum,
            indexNum: res.kolTotalDataMap.indexNum
          }

          this.kolVideoInfoMap = {
            ...res.kolVideoInfoMap,
            next: res.isNext,
            prev: res.isPrev,
            pageNo: res.pageNo
          }

          this.dayDataMap = res.dayDataMap || {}

          this.isCollect = res.isCollect

          this.kolTotalData = res.kolTotalDataMap

          this.times = res.times

          // 作品数
          this.videoNum = res.kolTotalDataMap.videoNum
        }

        // 非会员无权限访问
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {
            window.close()
          })
        }
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
  }

  // @Emit
  private handlePageNo(val: number): void {
    console.log(val)
    this.getVideoData({ kolId: this.$route.query.kolId, pageNo: val })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.analysis {
  .basicWidth();
  display: flex;
  padding: 48px 0 12px;
  height: 100%;

  .analysis-left {
    width: 280px;
  }

  .analysis-right {
    width: 900px;
    margin-left: 20px;
    display: flex;
    flex-direction: column;

    .analysis-container {
      border: 1px solid #ececec;
      padding: 12px;
      flex: 1;
    }
  }
}
</style>
