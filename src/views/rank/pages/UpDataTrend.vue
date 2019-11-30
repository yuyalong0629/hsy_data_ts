<template>
  <div class="trend">
    <div class="trend-content-title">
      <h4>{{ `UP主数据趋势统计` }}</h4>
      <p>数据更新时间：2019-11-18 15:05</p>
    </div>

    <a-row>
      <a-col :span="24">
        <a-radio-group
          defaultValue="0"
          size="small"
          @change="onChangeRadio"
          :style="{ margin: '12px 0' }"
        >
          <a-radio-button value="0">周增量</a-radio-button>
          <a-radio-button value="1">周总量</a-radio-button>
        </a-radio-group>
      </a-col>

      <a-col :span="24">
        <LineChart />
      </a-col>

      <a-col :span="24" :style="{ margin: '24px 0' }">
        <LineChart />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import LineChart from '@/components/Echart/LineChart.vue'

@Component({
  components: {
    LineChart
  }
})
export default class UPTrend extends Vue {
  // Radio
  private onChangeRadio(e: any) {
    console.log(`checked = ${e.target.value}`)
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
