<template>
  <a-spin :spinning="spinning">
    <a-list
      itemLayout="vertical"
      size="large"
      :pagination="pagination"
      :dataSource="contentList.result"
    >
      <a-list-item
        slot="renderItem"
        slot-scope="item"
        key="item.title"
        @click="handleDetail(item.id)"
      >
        <span>发布时间：{{ item.publishTime }}</span>
        <icon-font
          class="mine-breadcrumb-icon"
          style="margin: 0 4px 0 24px; font-size: 16px;"
          type="icon-changyongtubiao-mianxing-"
        />
        <span>{{ item.readNum }}</span>
        <img slot="extra" width="196" height="120" alt="logo" :src="item.coverImage" />
        <a-list-item-meta :description="item.summary">
          <a slot="title" href="javascript:;">{{item.title}}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
  </a-spin>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { newsContentInfoList } from '@/api/index'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont') // 在 iconfont.cn 上生成
})

interface Page {
  onChange: (page: any) => void
  pageSize: number
  total: number
  hideOnSinglePage: boolean
}

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class List extends Vue {
  private isActiveClassroom: number = 0
  private pagination!: Page
  private data() {
    return {
      pagination: {
        onChange: (page: any) => {
          const type = this.$route.query.type
          this.contentInfoList({ oType: type, type: '1', pageNo: page - 1 })
        },
        pageSize: 5,
        total: 0,
        hideOnSinglePage: true
      }
    }
  }
  private contentList: object = {}
  private spinning: boolean = false

  // 初始化请求分页数据
  private mounted() {
    this.contentInfoList({ oType: this.$route.query.type || 1, type: '1' })
  }

  private contentInfoList(params: any) {
    this.spinning = true
    return newsContentInfoList(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.contentList = res.page
          this.pagination.total = res.page.total
          this.spinning = false
        } else {
          this.spinning = false
        }
      })
      .finally(() => (this.spinning = false))
  }

  private handleDetail(id: string) {
    console.log(id)
    this.$router.push({ path: '/mine/detail', query: { id: id } })
  }

  @Watch('$route')
  private function(to: any, from: any) {
    this.contentInfoList({ oType: to.query.type, type: '1' })
  }
}
</script>

<style lang="less" scoped>
</style>
