<template>
  <div class="rank" ref="anchor">
    <a-row>
      <a-col :span="24">
        <Tabs :tagInfos="platformInfos" @onChangeTag="onChangeTagP" tagName="支持平台" />
        <Tabs :tagInfos="themeInfos" @onChangeTag="onChangeTagT" tagName="行业分类" />
        <Tabs :tagInfos="sorts" @onChangeTag="onChangeTagS" tagName="排序方式" />
      </a-col>
    </a-row>

    <a-row :style="{ marginTop: '12px' }">
      <a-col :span="12">
        <a-radio-group defaultValue="0" buttonStyle="solid" @change="onChangeRadio">
          <a-radio-button value="0">
            <a-icon type="bar-chart" />总榜
          </a-radio-button>
          <a-radio-button value="1">月涨 / 掉粉榜</a-radio-button>
          <a-radio-button value="2">周涨 / 掉粉榜</a-radio-button>
          <a-radio-button value="3">日涨 / 掉粉榜</a-radio-button>
        </a-radio-group>
      </a-col>
      <a-col :span="12"></a-col>
    </a-row>

    <a-row :style="{ marginTop: '12px' }">
      <a-col :span="24">
        <a-spin :spinning="spinning">
          <component :is="componentId" :dataSource="dataSource"></component>
        </a-spin>
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

    <a-row v-if="GET_STORAGE && GET_STORAGE.userType !== 1" :style="{ margin: '12px 0' }">
      <a-col :span="24">
        <Permissions alert="免费版仅可查看100个结果" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import Tabs from '@/components/Tabs/Tabs.vue'
import RankTable from '@/components/Table/RankTable.vue'
import OtherTable from '@/components/Table/OtherTable.vue'
import Permissions from '@/components/Permissions/Permissions.vue'
import { navFilter } from '@/api/index'
import { ranklist } from '@/api/rank'

interface Params {
  [key: string]: number | string
}

const user = namespace('user')

@Component({
  components: {
    Tabs,
    RankTable,
    OtherTable,
    Permissions
  }
})
export default class Rank extends Vue {
  @user.Getter GET_STORAGE!: () => any

  @Ref() readonly anchor?: any

  private platformInfos: object[] = [] // 支持平台 Tag
  private themeInfos: object[] = [] // 行业分类 Tag
  private sorts: object[] = [] // 排序方式 Tag
  private spinning: boolean = false
  private componentId: string = 'RankTable'
  private params: Params[] = [
    {
      pid: 1, // 平台ID
      tId: 0, // 题材ID
      flag: 0, // 标识：0总榜；1周榜；2月榜
      pageNo: 0, // 分页
      sort: 0, // 排序 0默认排序（指数）；1粉丝数；2浏览数；3视频数
      sortord: '', // 1 升序 2 降序
      dateNum: 0 // 时间选项序号
    }
  ]
  private dataSource: object = {}
  // 分页
  private total: number = 100
  private current: number = 1
  private pageSize: number = 20

  private mounted() {
    // 初始化请求 Tag 分类列表
    navFilter({ type: 0 }).then((res: any) => {
      if (res.code === 200) {
        this.platformInfos = res.platformInfos || []
        this.themeInfos = res.themeInfos || []
        this.sorts = res.sorts || []
      }
    })

    this.tableData(...this.params)
  }

  // Tag 平台筛选
  private onChangeTagP(val: any): void {
    const { params } = this
    const target = params.map((item: any) => {
      return {
        ...item,
        pid: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.tableData(...target)
  }

  // Tag 行业分类
  private onChangeTagT(val: any) {
    const { params } = this
    const target = params.map((item: any) => {
      return {
        ...item,
        tId: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.tableData(...target)
  }

  // Tag 排序方式
  private onChangeTagS(val: any) {
    const { params } = this
    const target = params.map((item: any) => {
      return {
        ...item,
        sort: val.sortId,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.tableData(...target)
  }

  // 榜单 Table 切换
  private onChangeRadio(e: any): void {
    if (e.target.value !== '0') {
      this.componentId = 'OtherTable'
      return
    }
    this.componentId = 'RankTable'
  }

  // Table data function
  private tableData(params?: Params): any {
    this.spinning = true
    return ranklist(params)
      .then((res: any) => {
        if (res.code === 200) {
          const target =
            res.page &&
            res.page.result.map((item: any, index: number) => {
              return {
                ...item,
                top: +res.page.index * 20 + (index + 1),
                media: {
                  kolImg: item.kolImg,
                  kolName: item.kolName
                }
              }
            })
          this.dataSource = {
            ...res.page,
            result: target
          }
          this.total = res.page && res.page.count
          this.current = res.page && res.page.index + 1
        }
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
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
    this.tableData(...target)
    // 锚点
    ;(this.anchor as any).scrollIntoView(true)
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.rank {
  .basicWidth();
  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
