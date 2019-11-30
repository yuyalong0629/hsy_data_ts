<template>
  <div class="analysisInfo">
    <div class="analysisInfo-content-title">
      <h4>{{ `历史作品数据统计` }}</h4>
      <a-button-group size="small">
        <a-button type="primary" :disabled="false">
          <a-icon type="left" />上一页
        </a-button>
        <a-button type="primary" :disabled="false">
          下一页
          <a-icon type="right" />
        </a-button>
      </a-button-group>
    </div>

    <a-card hoverable style="margin: 20px 0; background: #f1f5f6;">
      <div class="analysisInfo-list">
        <a href="JavaScript:;" target="_blank" style="color: #000;">
          <div class="analysisInfo-list-title">{{ `kolVideoInfoMap.title` }}</div>
        </a>
        <p class="analysisInfo-list-content">{{ `kolVideoInfoMap.summary` }}</p>
        <div class="analysisInfo-list-label">
          <a-tag class="list-info-tag" v-for="(item, index) of 5" :key="index">{{ item }}</a-tag>
        </div>
        <div class="analysisInfo-list-footer">
          <p class="list-info-time">{{`发布时间：${`kolVideoInfoMap.publishTime`}`}}</p>
          <div class="list-info-actions-icon">
            <span style="margin-right: 12px">
              <a-icon type="youtube" theme="filled" />
              <!-- {{ kolVideoInfoMap.playNum }} -->
              888
            </span>
            <span style="margin-right: 12px">
              <a-icon type="star" theme="filled" />
              <!-- {{ kolVideoInfoMap.collectNum }} -->
              888
            </span>
            <span style="margin-right: 12px">
              <a-icon type="like" theme="filled" />
              <!-- {{ kolVideoInfoMap.praiseNum }} -->
              888
            </span>
            <span style="margin-right: 12px">
              <a-icon type="message" theme="filled" />
              <!-- {{ kolVideoInfoMap.commentNum }} -->
              888
            </span>
          </div>
        </div>
      </div>
    </a-card>

    <a-row>
      <a-col :span="24">
        <h4 class="analysisInfo-echart-title">数据趋势</h4>
      </a-col>

      <a-col :span="12">
        <a-radio-group
          defaultValue="0"
          size="small"
          @change="onChangeRadioNum"
          :style="{ margin: '12px 0' }"
        >
          <a-radio-button value="0">周增量</a-radio-button>
          <a-radio-button value="1">周总量</a-radio-button>
        </a-radio-group>
      </a-col>

      <a-col :span="12" class="analysisInfo-time">
        <a-radio-group
          defaultValue="0"
          size="small"
          @change="onChangeRadioTime"
          :style="{ margin: '12px 0', float: 'right' }"
        >
          <a-radio-button value="0">24H</a-radio-button>
          <a-radio-button value="1">48H</a-radio-button>
          <a-radio-button value="2">72H</a-radio-button>
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
export default class AnalysisInfo extends Vue {
  // 周量
  private onChangeRadioNum(e: any) {}

  // 日期切换
  private onChangeRadioTime(e: any) {}
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';

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
