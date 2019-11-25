<template>
  <div class="rank">
    <Tabs :tagInfos="platformInfos" tagName="支持平台" />
    <Tabs :tagInfos="themeInfos" tagName="行业分类" />
    <Tabs :tagInfos="sorts" tagName="排序方式" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import { navFilter } from '@/api/index'

interface Params {
  pid: number // 平台ID
  tId: number // 题材ID
  flag: number // 标识：0总榜；1周榜；2月榜
  pageNo: number // 分页
  sort: number // 排序 0默认排序（指数）；1粉丝数；2浏览数；3视频数
  sortord?: string // 1 升序 2 降序
  dateNum: number // 时间选项序号
}

@Component({
  components: {
    Tabs
  }
})
export default class Rank extends Vue {
  private platformInfos: object[] = [] // 支持平台 Tag
  private themeInfos: object[] = [] // 行业分类 Tag
  private sorts: object[] = [] // 排序方式 Tag
  private params: Params[] = [
    {
      pid: 1,
      tId: 0,
      flag: 0,
      pageNo: 0,
      sort: 0,
      sortord: '',
      dateNum: 0
    }
  ]

  private mounted() {
    navFilter({ type: 0 }).then((res: any) => {
      if (res.code === 200) {
        this.platformInfos = res.platformInfos || []
        this.themeInfos = res.themeInfos || []
        this.sorts = res.sorts || []
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.rank {
  .basicWidth();
}
</style>
