<template>
  <div class="similar" ref="anchor">
    <div class="similar-left">
      <UserInfo :kolInfo="kolInfo" :isCollect="isCollect" />
    </div>
    <div class="similar-right">
      <a-spin :spinning="spinning">
        <a-divider>{{ `共查找到 ${pageInfo.count || 0} 个, '${kolInfo.kolName}'的相似号` }}</a-divider>
        <a-empty v-if="!pageInfo.result" />
        <List v-else :pageInfo="pageInfo" />

        <a-row>
          <a-col :span="24" :style="{ margin: '12px 0' }">
            <a-pagination
              showQuickJumper
              :current="current"
              :pageSize="pageSize"
              :total="total"
              :hideOnSinglePage="true"
              @change="onChangePage"
            />
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import UserInfo from '@/components/UserInfo/UserInfo.vue'
import Tabs from '@/components/Tabs/Tabs.vue'
import List from '@/components/List/List.vue'
import { similarKolList } from '@/api/similar'
import { vipNotice } from '@/utils/util'

@Component({
  components: {
    UserInfo,
    Tabs,
    List
  }
})
export default class Similar extends Vue {
  @Ref() readonly anchor?: any

  private isCollect: boolean = false
  private kolInfo: object = {}
  private spinning: boolean = false
  // 分页
  private total: number = 0
  private current: number = 1
  private pageSize: number = 20

  private pageInfo?: object = {}

  private mounted() {
    this.similarKolList({ kolId: this.$route.query.kolId, pageNo: 0 })
  }

  // 相似号 Function
  private similarKolList(params: any): any {
    this.spinning = true
    return similarKolList(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.kolInfo = {
            ...res.kolInfo,
            fansNum: res.kolTotalData.fansNum,
            playNum: res.kolTotalData.playNum,
            chargingNum: res.kolTotalData.chargingNum,
            indexNum: res.kolTotalData.indexNum
          }

          // 收藏
          this.isCollect = res.isCollect

          // List
          this.pageInfo = res.page

          this.total = res.page.count
          this.current = +res.page.index + 1
        }

        // 非会员无权限访问
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {
            window.close()
          })
        }
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
  }

  // 分页
  private onChangePage(pageNumber: string): void {
    this.similarKolList({
      kolId: this.$route.query.kolId,
      pageNo: +pageNumber - 1
    })

    // 锚点
    ;(this.anchor as any).scrollIntoView(true)
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.similar {
  padding: 24px 0;
  .basicWidth();
  position: relative;

  .similar-left {
    position: absolute;
    width: 280px;
  }

  .similar-right {
    width: 900px;
    margin-left: 300px;
  }

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
