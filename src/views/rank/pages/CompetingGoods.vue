<template>
  <div class="competingGoods">
    <a-row :gutter="16">
      <a-col :span="24" class="competingGoods-title">
        <h4>竞品投放解析</h4>
      </a-col>
      <a-col :span="12">
        <a-radio-group @change="onChangeRadio" v-model="timeStatus">
          <a-radio :value="1">30天内</a-radio>
          <a-radio :value="2">60天内</a-radio>
          <a-radio :value="3">90天内</a-radio>
          <a-radio :value="4">180天内</a-radio>
        </a-radio-group>
      </a-col>
      <a-col :span="12">
        <a-input-search placeholder="号内搜 请输入关键词、商品名称、品牌名" @search="onSearch" enterButton />
      </a-col>
      <a-col :span="24" class="competingGoods-express">
        <p>报告包含：1.商品植入作品详情，2.商品广告曝光数据，3.作品互动数据，4.转化漏斗数据等</p>
      </a-col>
    </a-row>

    <a-row :gutter="16">
      <a-col :span="24" class="competingGoods-title">
        <h4>竞品投放报告（3）</h4>
      </a-col>
      <a-col :span="24" class="competingGoods-report">
        <span class="competingGoods-report-name">
          <p>竞品名称：</p>
          <p>风残月sadfsdfsfsfaasdf读</p>
        </span>
        <span class="competingGoods-report-time">
          <p>查询时间：6个月-2019年11月08日-5月07日</p>
        </span>
        <span class="competingGoods-report-change">
          <a href="javascript:;">上一篇</a>
          <a href="javascript:;">下一篇</a>
        </span>
      </a-col>

      <a-col :span="24" class="competingGoods-progress">
        <span>
          <strong>关联作品</strong>
          <a-progress
            :percent="15/20 * 100"
            :strokeWidth="12"
            strokeColor="#00a1d6"
            :showInfo="false"
          />
        </span>
        <span>
          <p>15部</p>
          <p>20部（发布总数）</p>
        </span>
      </a-col>

      <a-col :span="24" class="competingGoods-steps">
        <strong>关联作品</strong>
        <a-timeline mode="left">
          <a-timeline-item>2015-09-01</a-timeline-item>
          <a-timeline-item>2015-09-01</a-timeline-item>
          <a-timeline-item>2015-09-01</a-timeline-item>
          <a-timeline-item>2015-09-01</a-timeline-item>
          <a-timeline-item>2015-09-01</a-timeline-item>
        </a-timeline>
      </a-col>

      <a-col :span="24" class="competingGoods-zone">
        <strong>商品广告作品发布时区</strong>
        <BarChart />
      </a-col>

      <a-col :span="24" class="competingGoods-exposure">
        <strong>曝光数据</strong>
        <PieChart />
      </a-col>
      <!-- <a-col :span="24" class="competingGoods-conversion">
        <strong>转化数据</strong>
        <FunnelChart />
      </a-col>-->
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BarChart from '@/components/Echart/BarChart.vue'
import FunnelChart from '@/components/Echart/FunnelChart.vue'
import PieChart from '@/components/Echart/PieChart.vue'

@Component({
  components: {
    BarChart,
    FunnelChart,
    PieChart
  }
})
export default class CompetingGoods extends Vue {
  private timeStatus: number = 1

  // 竞品投放解析 Radio
  private onChangeRadio(e: any): void {
    console.log(e)
  }

  // 竞品投放解析 Search
  private onSearch(value: string, e: any): void {
    e.preventDefault()
    console.log(value)
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.competingGoods {
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 12px;

  .ant-radio-group {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    height: 32px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .competingGoods-title {
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

  .competingGoods-report {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;

    .competingGoods-report-name {
      display: flex;
      align-items: center;

      p:nth-child(2) {
        color: #00a1d6;
        font-weight: 400;
      }
    }

    .competingGoods-report-time {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #c7c7c7;
    }

    .competingGoods-report-change {
      display: flex;
      justify-content: flex-end;
      width: 160px;

      a {
        margin-left: 12px;
      }
    }
  }

  .competingGoods-progress {
    display: flex;
    flex-direction: column;

    span:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 0;

      strong {
        flex: 0 0 80px;
        padding-top: 2px;
      }
    }

    span:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 86px;
    }
  }

  .competingGoods-steps {
    display: flex;
    padding: 24px 0 12px;
    align-items: flex-start;
    max-height: 400px;
    overflow: auto;

    strong {
      flex: 0 0 80px;
    }
  }

  .competingGoods-exposure {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
  }

  .competingGoods-express {
    color: #c7c7c7;
    line-height: 28px;
    margin-top: 12px;
  }
}
</style>
