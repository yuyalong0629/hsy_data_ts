<template>
  <div class="analysisFans">
    <PieChart />
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
