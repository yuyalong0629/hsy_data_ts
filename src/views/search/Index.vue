<template>
  <div class="search" ref="anchor">
    <!-- search -->
    <a-row>
      <a-col :span="18">
        <a-input-search
          placeholder="请输入账号名称 , 达人名等关键词搜索"
          v-model="seachValue"
          @search="onSearch"
          size="large"
        >
          <a-button type="primary" slot="enterButton">搜索</a-button>
        </a-input-search>
      </a-col>

      <a-col :span="24" :style="{ margin: '6px 0' }">
        <strong :style="{ marginRight: 8 }">搜索记录:&nbsp;</strong>
        <template v-for=" tag in tags">
          <a-checkable-tag :key="tag.id" @change="handleChangeTag(tag)">{{ tag.word }}</a-checkable-tag>
        </template>
      </a-col>

      <a-col :span="24">
        <Tabs
          v-if="platformInfos.length"
          :tagInfos="platformInfos"
          @onChangeTag="onChangeTagP"
          tagName="支持平台"
        />
        <Tabs
          v-if="themeInfos.length"
          :tagInfos="themeInfos"
          @onChangeTag="onChangeTagT"
          tagName="行业分类"
        />
        <Tabs
          v-if="themeInfosTwo.length"
          :tagInfos="themeInfosTwo"
          @onChangeTag="onChangeTagTTwo"
          tagName="二级分类"
        />
        <Tabs
          v-if="fansBasicDatas.length"
          :tagInfos="fansBasicDatas"
          @onChangeTag="onChangeTagS"
          tagName="粉丝数量"
        />
      </a-col>
    </a-row>

    <a-spin :spinning="spinning">
      <a-divider>{{ `关键词 '${keyword}' 共计 ${pageInfo.num || 0} 条结果` }}</a-divider>
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

    <a-row :style="{ margin: '12px 0' }">
      <a-col :span="24">
        <Permissions v-if="GET_STORAGE && GET_STORAGE.userType === 0" alert="想搜索意向账号" />
        <Permissions v-if="GET_STORAGE && GET_STORAGE.userType === 1" alert="高级版会员可查看100个账号" />
        <Permissions v-if="GET_STORAGE && GET_STORAGE.userType === 2" alert="专业版会员可查看500个账号" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import { navFilter, twoSortFlag } from '@/api/index'
import { searchKeyword, searchKol } from '@/api/search'
import { vipNotice } from '@/utils/util'
import Tabs from '@/components/Tabs/Tabs.vue'
import List from '@/components/List/List.vue'
import Permissions from '@/components/Permissions/Permissions.vue'

const user = namespace('user')

interface Params {
  [key: string]: string | number
}

@Component({
  components: {
    Tabs,
    List,
    Permissions
  }
})
export default class Search extends Vue {
  @user.Getter GET_STORAGE!: () => any

  @Ref() readonly anchor?: any

  private tags: any[] = []
  private platformInfos: object[] = [] // 支持平台 Tag
  private themeInfos: object[] = [] // 行业分类 Tag
  private fansBasicDatas: object[] = [] // 粉丝数量 Tag
  private spinning: boolean = false
  private keyword: string = ''
  private themeInfosTwo: object[] = [] // 行业分类 Tag 二级分类
  private seachValue: string = '' // 输入框值

  // 分页
  private total: number = 0
  private current: number = 1
  private pageSize: number = 20

  private pageInfo?: object = {}

  private params: Params[] = [
    {
      keyword: '', // 关键词
      pId: '1', // 平台Id
      tId: '0', // 题材Id
      ttId: '0', // 行业分类 二级
      fansNum: '', // 粉丝数据区间
      grade: '', // 会员等级
      playNum: '', // 播放数
      praiseNum: '', // 点赞数
      pageNo: 0
    }
  ]

  private mounted() {
    // 初始化请求 Tag 分类列表
    navFilter({ type: 1 }).then((res: any) => {
      if (res.code === 200) {
        this.platformInfos = res.platformInfos || []
        this.themeInfos = res.themeInfos || []
        this.fansBasicDatas = res.fansBasicDatas.map((item: any) => {
          return {
            id: item.dataFlag,
            name: item.dataName
          }
        })
      }
    })

    // 搜索记录
    searchKeyword({ type: 1 }).then((res: any) => {
      this.tags = res.searchKeywords
    })
  }

  // 搜索框
  private onSearch(value: string): void {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        keyword: encodeURI(encodeURI(value)),
        pageNo: 0
      }
    })

    this.params = [...target]

    if (value) {
      this.searchInfo(...target)
    } else {
      this.$message.warning('关键词不能为空')
    }
  }

  // 搜索记录
  private handleChangeTag(tag: { id: string; word: string }): void {
    this.seachValue = tag.word

    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        keyword: encodeURI(encodeURI(tag.word)),
        pageNo: 0
      }
    })

    this.params = [...target]
    this.searchInfo(...target)
  }

  // Tag 平台筛选
  private onChangeTagP(val: any): void {}

  // Tag 行业分类
  private onChangeTagT(val: any) {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        tId: val.id,
        ttId: '0',
        pageNo: 0
      }
    })

    this.params = [...target]
    this.searchInfo(...target)

    // 二级分类查询
    twoSortFlag({ pId: target[0].pId, tId: target[0].tId }).then((res: any) => {
      if (res.code === 200) {
        this.themeInfosTwo = res.themeInfos
      }
    })
  }

  // Tag 行业分类 二级分类查询
  private onChangeTagTTwo(val: any) {
    const { params } = this
    const target = params.map((item: any) => {
      return {
        ...item,
        ttId: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.searchInfo(...target)
  }

  // Tag 粉丝数量
  private onChangeTagS(val: any) {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        fansNum: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]

    if (target[0].keyword) {
      this.searchInfo(...target)
      return
    }
    this.$message.warning('关键词不能为空')
  }

  // 搜索 Function
  private searchInfo(params?: Params[]): any {
    this.spinning = true
    return searchKol(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.pageInfo = { ...res.page, keyword: res.keyword, num: res.count }
          this.keyword = res.keyword
          this.total = res.page.count
          this.current = +res.page.index + 1
        }
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {})
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

    this.searchInfo(...target)
    // 锚点
    ;(this.anchor as any).scrollIntoView(true)
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.search {
  padding: 24px 0;
  .basicWidth();

  .ant-empty {
    padding: 24px 0;
  }

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
