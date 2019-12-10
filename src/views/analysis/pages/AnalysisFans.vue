<template>
  <div class="analysisFans">
    <a-row :gutter="16">
      <a-col :span="12">
        <strong>粉丝性别分布</strong>
        <PieChart />
      </a-col>
      <a-col :span="12">
        <strong>粉丝性别分布</strong>
        <PieChart />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PieChart from '@/components/Echart/PieChart.vue'

@Component({
  components: {
    PieChart
  }
})
export default class AnalysisFans extends Vue {}
</script>

<style lang="less" scoped>
</style>
