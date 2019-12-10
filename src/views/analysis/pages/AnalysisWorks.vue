<template>
  <div class="analysiswork">
    <a-row :gutter="16">
      <a-col :span="24" class="analysiswork-title">
        <h4>作品类型分布</h4>
      </a-col>
      <a-col :span="24" :style="{ marginBottom: '12px' }">
        <strong>TA发布作品总量 (112)</strong>
      </a-col>
      <a-col :span="12">
        <PieChart />
      </a-col>
      <a-col :span="12">
        <PieChart />
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
      </a-col>
      <a-col :span="24" class="analysiswork-title">
        <BarChart />
      </a-col>

      <a-col :span="24" class="analysiswork-title">
        <h4>作品数据详情</h4>
      </a-col>
      <a-col :span="24" :style="{ marginTop: '12px' }">
        <strong>最多播放 TOP 3</strong>
        <ListItem />
      </a-col>
      <a-col :span="24" :style="{ marginTop: '12px' }">
        <strong>最多收藏 TOP 3</strong>
        <ListItem />
      </a-col>
      <a-col :span="24" :style="{ marginTop: '12px' }">
        <strong>最低播放 LOW 3</strong>
        <ListItem />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PieChart from '@/components/Echart/PieChart.vue'
import BarChart from '@/components/Echart/BarChart.vue'
import ListItem from '@/components/List/ListItem.vue'

@Component({
  components: {
    PieChart,
    BarChart,
    ListItem
  }
})
export default class Analysiswork extends Vue {}
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
