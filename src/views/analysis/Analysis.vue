<template>
  <div class="analysis">
    <div class="analysis-left">
      <UserInfo :kolInfo="kolInfo" />
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
          <component :is="componentId"></component>
        </a-spin>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
  private kolInfo: object = {}
  private kolTotalData: object = {}
  private componentId: string = 'AnalysisInfo'

  // Radio
  private onChangeRadio(e: any): void {
    e.preventDefault()
    if (e.target.value === '0') {
      this.componentId = 'AnalysisInfo'
    }
    if (e.target.value === '1') {
      this.componentId = 'AnalysisWork'
    }
    if (e.target.value === '2') {
      this.componentId = 'AnalysisFans'
    }
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
