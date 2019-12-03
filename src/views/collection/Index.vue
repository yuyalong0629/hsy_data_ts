<template>
  <div class="collection" ref="anchor">
    <a-spin :spinning="spinning">
      <a-row>
        <a-col :span="24">
          <Tabs :tagInfos="userThemeInfos" @onChangeTag="onChangeTagName" tagName="我的分组" />
        </a-col>
      </a-row>

      <a-row>
        <a-col :span="24">
          <strong>我的收藏：</strong>
        </a-col>

        <a-col :span="24">
          <Table :pageInfo="pageInfo" @remove="remove" />
        </a-col>

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
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import Table from '@/components/Table/CollectTable.vue'
import { myCollect, myCollectDelete } from '@/api/collection'

interface Params {
  [key: string]: number | string
}

@Component({
  components: {
    Tabs,
    Table
  }
})
export default class Collection extends Vue {
  @Ref() readonly anchor?: any

  private userThemeInfos: object[] = []
  private pageInfo: any[] = []
  private spinning: boolean = false

  private params: Params[] = [
    {
      themeId: '',
      pageNo: 0
    }
  ]

  // 分页
  private total: number = 0
  private current: number = 1
  private pageSize: number = 20

  private mounted() {
    this.getCollect({ themeId: '', pageNo: 0 })
  }

  public getCollect(params?: Params): any {
    this.spinning = true
    return myCollect(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.userThemeInfos = res.userThemeInfos.map((item: any) => {
            return {
              ...item,
              name: item.themeName
            }
          })

          this.pageInfo = res.page.result.map((item: any) => {
            return {
              ...item,
              media: {
                kolImg: item.kolImg,
                kolName: item.kolName
              }
            }
          })

          this.total = res.page && res.page.count
          this.current = res.page && res.page.index + 1
        }
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
  }

  // 我的分组
  private onChangeTagName(val: any): void {
    console.log(val)
    const { params } = this
    const target = params.map((item: any) => {
      return {
        themeId: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.getCollect(...target)
  }

  // 移除分组
  private remove(val: string): void {
    const that = this

    this.$confirm({
      title: '您是否要删除此收藏?',
      content: '',
      okText: '确定',
      cancelText: '取消',
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(resolve, 1000)
        })
          .then(() => {
            // 删除收藏
            myCollectDelete({
              userCollectKolInfoId: val
            }).then((res: any) => {
              if (res.code === 200) {
                that.$message.success(res.message)
                that.getCollect({ themeId: '', pageNo: 0 })
              } else {
                that.$message.error(res.message)
              }
            })
          })
          .catch(() => console.log('Oops errors!'))
      },
      onCancel() {}
    })
  }

  // 分页
  private onChangePage(pageNumber: string): void {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        pageNo: +pageNumber - 1
      }
    })

    this.params = [...target]
    this.getCollect(...target)
    // 锚点
    ;(this.anchor as any).scrollIntoView(true)
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.collection {
  .basicWidth();
  padding: 24px 0;

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
