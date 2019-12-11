<template>
  <div class="analysisFans">
    <a-spin :spinning="spinning">
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
    </a-spin>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PieChart from '@/components/Echart/PieChart.vue'
import { fansPortrait } from '@/api/analysis'

@Component({
  components: {
    PieChart
  }
})
export default class AnalysisFans extends Vue {
  private spinning: boolean = false

  private mounted() {
    this.getFansPortrait({ kolId: (this.$route.query as any).kolId })
  }

  // Echart Function
  private getFansPortrait(params?: { kolId: string }): any {
    this.spinning = true
    return fansPortrait(params)
      .then((res: any) => {
        console.log(res)
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
  }
}
</script>

<style lang="less" scoped>
</style>
