<template>
  <div class="analysis">
    <div class="analysis-left">
      <UserInfo :kolInfo="kolInfo" :isCollect="isCollect" />
    </div>
    <div class="analysis-right">
      <UserNumber :kolTotalData="kolTotalData" />

      <div :style="{ margin: '16px 0' }">
        <a-radio-group defaultValue="0" buttonStyle="solid" @change="onChangeRadio">
          <a-radio-button value="0">作品数据趋势</a-radio-button>
          <a-radio-button value="1">作品画像分析</a-radio-button>
          <a-radio-button value="2">粉丝画像分析</a-radio-button>
        </a-radio-group>
      </div>

      <div class="analysis-container">
        <a-spin :spinning="spinning">
          <component
            :is="componentId"
            :kolVideoInfoMap="kolVideoInfoMap"
            :dayDataMap="dayDataMap"
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

  private mounted() {
    // 默认 =>
    if (this.$route.query.kolId) {
      this.getVideoData({
        kolId: this.$route.query.kolId || (this.$route.query as any).videoId,
        pageNo: 0
      })
    }

    // 监控 =>
    if (this.$route.query.videoId) {
      this.getVideoData({
        type: '1',
        videoId: this.$route.query.videoId
      })
    }
  }

  // Radio
  private onChangeRadio(e: any): void {
    e.preventDefault()
    if (e.target.value === '0') {
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
    if (e.target.value === '1') {
      this.componentId = 'AnalysisWork'
    }
    if (e.target.value === '2') {
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

          this.kolVideoInfoMap = res.kolVideoInfoMap || {}
          this.dayDataMap = res.dayDataMap || {}

          this.isCollect = res.isCollect

          this.kolTotalData = res.kolTotalDataMap
        }
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
  }

  // @Emit
  private handlePageNo(val: number): void {
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
