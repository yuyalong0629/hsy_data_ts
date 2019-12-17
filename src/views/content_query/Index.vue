<template>
  <div class="content-query" ref="anchor">
    <!-- search -->
    <a-row>
      <a-col :span="24" :style="{ marginBottom: '12px' }">
        <a-radio-group name="radioGroup" :defaultValue="0" @change="changeRadio">
          <a-radio :value="0">全部视频</a-radio>
          <a-radio :value="1">作品标题+简介</a-radio>
          <a-radio :value="2">作品标签+评论</a-radio>
          <a-radio :value="3">纯评论内容</a-radio>
          <a-radio :value="4">相簿动态</a-radio>
        </a-radio-group>
      </a-col>

      <a-col :span="18">
        <a-input-search placeholder="请输入账号名称,达人名等关键词搜索" @search="onSearch" size="large">
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
          @onChangeTag="onChangeTagPlat"
          tagName="支持平台"
        />
        <Tabs
          v-if="themeInfos.length"
          :tagInfos="themeInfos"
          @onChangeTag="onChangeTagTheme"
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
          @onChangeTag="onChangeTagFans"
          tagName="粉丝数量"
        />
        <Tabs
          v-if="playBasicDatas.length"
          :tagInfos="playBasicDatas"
          @onChangeTag="onChangeTagPlay"
          tagName="浏览数量"
        />
        <Tabs
          v-if="praiseBasicDatas.length"
          :tagInfos="praiseBasicDatas"
          @onChangeTag="onChangeTagPraise"
          tagName="点赞数量"
        />
        <Tabs
          v-if="publishTimeBasicDatas.length"
          :tagInfos="publishTimeBasicDatas"
          @onChangeTag="onChangeTagTime"
          tagName="发布时间"
        />
      </a-col>
    </a-row>

    <a-spin :spinning="spinning">
      <a-divider>{{ `关键词 '${keyword}' 共计 ${pageInfo.count || 0} 条结果` }}</a-divider>
      <a-empty v-if="!pageInfo.result" />

      <ContentList v-else :pageInfo="pageInfo" />

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
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import ContentList from '@/components/List/ContentList.vue'
import { navFilter, twoSortFlag } from '@/api/index'
import { searchKeyword, searchContent } from '@/api/search'
import { vipNotice } from '@/utils/util'

interface Params {
  [key: string]: string | number
}

@Component({
  components: {
    Tabs,
    ContentList
  }
})
export default class ContentQuery extends Vue {
  @Ref() readonly anchor?: any

  private tags: any[] = []
  private platformInfos: object[] = [] // 支持平台 Tag
  private themeInfos: object[] = [] // 行业分类 Tag
  private fansBasicDatas: object[] = [] // 粉丝数量 Tag
  private playBasicDatas: object[] = [] // 播放数
  private praiseBasicDatas: object[] = [] // 点赞数量
  private publishTimeBasicDatas: object[] = [] // 发布时间
  private spinning: boolean = false
  private keyword: string = ''
  private themeInfosTwo: object[] = [] // 行业分类 Tag 二级分类

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
      publishTime: '', // 发布时间
      cType: '1', // 标签
      type: '1', // 标签
      pageNo: 0
    }
  ]

  private mounted() {
    // 初始化请求 Tag 分类列表
    navFilter({ type: 2 }).then((res: any) => {
      if (res.code === 200) {
        this.platformInfos = res.platformInfos || []

        this.themeInfos = res.themeInfos || []

        this.fansBasicDatas = res.fansBasicDatas.map((item: any) => {
          return {
            id: item.dataFlag,
            name: item.dataName
          }
        })

        this.playBasicDatas = res.playBasicDatas.map((item: any) => {
          return {
            id: item.dataFlag,
            name: item.dataName
          }
        })

        this.praiseBasicDatas = res.praiseBasicDatas.map((item: any) => {
          return {
            id: item.dataFlag,
            name: item.dataName
          }
        })

        this.publishTimeBasicDatas = res.publishTimeBasicDatas.map(
          (item: any) => {
            return {
              id: item.dataFlag,
              name: item.dataName
            }
          }
        )
      }
    })

    // 搜索记录
    searchKeyword({ type: 2 }).then((res: any) => {
      this.tags = res.searchKeywords
    })
  }

  // Radio
  private changeRadio(e: any): void {
    const { params } = this

    if (e.target.value === 4) {
      const target = params.map((item: any) => {
        return {
          ...item,
          cType: e.target.value,
          type: '2',
          pageNo: 0
        }
      })

      this.params = [...target]
      return
    }

    const target = params.map((item: any) => {
      return {
        ...item,
        cType: e.target.value,
        type: '1',
        pageNo: 0
      }
    })

    this.params = [...target]
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
  private onChangeTagPlat(val: any): void {}

  // Tag 行业分类
  private onChangeTagTheme(val: any) {
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
  private onChangeTagFans(val: any) {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        fansNum: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.searchInfo(...target)
  }

  // 播放数
  private onChangeTagPlay(val: any) {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        playNum: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.searchInfo(...target)
  }

  // 点赞数
  private onChangeTagPraise(val: any) {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        praiseNum: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.searchInfo(...target)
  }

  // 发布时间
  private onChangeTagTime(val: any) {
    const { params } = this
    const target: any[] = params.map((item: any) => {
      return {
        ...item,
        publishTime: val.id,
        pageNo: 0
      }
    })

    this.params = [...target]
    this.searchInfo(...target)
  }

  // 搜索 Function
  private searchInfo(params?: Params[]): any {
    this.spinning = true
    return searchContent(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.pageInfo = { ...res.page, keyword: res.keyword }
          this.keyword = res.keyword
          this.total = res.page.count
          this.current = +res.page.index + 1
        }
        // 非会员无权限访问
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

.content-query {
  padding: 24px 0;
  .basicWidth();

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
