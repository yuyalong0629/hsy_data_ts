<template>
  <div class="advertisements">
    <div v-if="permission" class="advertisements-permission">
      <img v-lazy="require('@/assets/images/jiashuju.png')" alt />
    </div>
    <div v-else>
      <a-spin :spinning="spinning">
        <a-row>
          <a-col :span="24" class="advertisements-content-title">
            <h4>商品分类报告</h4>
          </a-col>

          <a-col v-if="goodsBrandMapList.length" :span="24" class="advertisements-class">
            <strong :style="{ marginRight: 8 }">商品分类:&nbsp;</strong>
            <div>
              <template v-for="(tag, index) in goodsBrandMapList">
                <a-checkable-tag :key="index">{{ `${tag.brandName}-${tag.countNum}` }}</a-checkable-tag>
              </template>
            </div>
          </a-col>

          <a-col v-if="appBrandMapList.length" :span="24" class="advertisements-class">
            <strong :style="{ marginRight: 8 }">APP分类:&nbsp;</strong>
            <div>
              <template v-for="(tag, index) in appBrandMapList">
                <a-checkable-tag :key="index">{{ `${tag.brandName}-${tag.countNum}` }}</a-checkable-tag>
              </template>
            </div>
          </a-col>

          <a-col v-if="gameBrandMapList.length" :span="24" class="advertisements-class">
            <strong :style="{ marginRight: 8 }">游戏分类:&nbsp;</strong>
            <div>
              <template v-for="(tag, index) in gameBrandMapList">
                <a-checkable-tag :key="index">{{ `${tag.brandName}-${tag.countNum}` }}</a-checkable-tag>
              </template>
            </div>
          </a-col>
        </a-row>

        <a-row :gutter="16" class="advertisements-word-cloud">
          <a-col :span="24" class="advertisements-content-title">
            <h4>商品关键词云图</h4>
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <h5>作品标题-简介商品关键词云图</h5>
            <Wordcloud
              v-if="kolBrandKeywordsStatisticsMapList1.length"
              :title="kolBrandKeywordsStatisticsMapList1Title"
              :words="kolBrandKeywordsStatisticsMapList1"
            />
          </a-col>
          <a-col :span="11" :offset="1">
            <h5>品牌关键词榜单</h5>
            <WordRank
              v-if="kolBrandKeywordsStatisticsMapList1Word.length"
              :word="kolBrandKeywordsStatisticsMapList1Word"
            />
          </a-col>
          <a-col :span="24">
            <a-empty v-if="!kolBrandKeywordsStatisticsMapList1.length" />
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <h5>作品标签-评论商品关键词云图</h5>
            <Wordcloud
              v-if="kolBrandKeywordsStatisticsMapList2.length"
              :title="kolBrandKeywordsStatisticsMapList2Title"
              :words="kolBrandKeywordsStatisticsMapList2"
            />
          </a-col>
          <a-col :span="11" :offset="1">
            <h5>品牌关键词榜单</h5>
            <WordRank
              v-if="kolBrandKeywordsStatisticsMapList2Word.length"
              :word="kolBrandKeywordsStatisticsMapList2Word"
            />
          </a-col>
          <a-col :span="24">
            <a-empty v-if="!kolBrandKeywordsStatisticsMapList2.length" />
          </a-col>
        </a-row>

        <a-row :gutter="16">
          <a-col :span="12">
            <h5>图文动态-关键词云图</h5>
            <Wordcloud
              v-if="kolBrandKeywordsStatisticsMapList0.length"
              :title="kolBrandKeywordsStatisticsMapList0Title"
              :words="kolBrandKeywordsStatisticsMapList0"
            />
          </a-col>
          <a-col :span="11" :offset="1">
            <h5>品牌关键词榜单</h5>
            <WordRank
              v-if="kolBrandKeywordsStatisticsMapList0Word.length"
              :word="kolBrandKeywordsStatisticsMapList0Word"
            />
          </a-col>
          <a-col :span="24">
            <a-empty v-if="!kolBrandKeywordsStatisticsMapList0.length" />
          </a-col>
        </a-row>
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { brandKeyword } from '@/api/rank'
import Tabs from '@/components/Tabs/Tabs.vue'
import Wordcloud from '@/components/Echart/Wordcloud.vue'
import WordRank from '@/components/Echart/WordRank.vue'
import { vipNotice, objectSort } from '@/utils/util'

@Component({
  components: {
    Tabs,
    Wordcloud,
    WordRank
  }
})
export default class Advertisements extends Vue {
  private spinning: boolean = false
  private permission: boolean = false
  private classification: any[] = []
  private classificationTwo: any[] = []

  // 分类
  private goodsBrandMapList: any[] = []
  private appBrandMapList: any[] = []
  private gameBrandMapList: any[] = []

  // 作品标题
  private kolBrandKeywordsStatisticsMapList1: any[] = []
  private kolBrandKeywordsStatisticsMapList1Title: any = {
    subtext: false,
    x: 'center'
  }
  private kolBrandKeywordsStatisticsMapList1Word: any[] = []

  // 作品标签
  private kolBrandKeywordsStatisticsMapList2: any[] = []
  private kolBrandKeywordsStatisticsMapList2Title: any = {
    subtext: false,
    x: 'center'
  }
  private kolBrandKeywordsStatisticsMapList2Word: any[] = []

  // 作品标签
  private kolBrandKeywordsStatisticsMapList0: any[] = []
  private kolBrandKeywordsStatisticsMapList0Title: any = {
    subtext: false,
    x: 'center'
  }
  private kolBrandKeywordsStatisticsMapList0Word: any[] = []

  private mounted() {
    this.spinning = true
    brandKeyword({ kolId: (this.$route.query as any).kolId })
      .then((res: any) => {
        if (res.code === 200) {
          this.goodsBrandMapList =
            res.kolBrandKeywordsStatisticsList.length &&
            res.kolBrandKeywordsStatisticsList[0].goodsBrandMapList

          this.appBrandMapList =
            res.kolBrandKeywordsStatisticsList.length &&
            res.kolBrandKeywordsStatisticsList[1].appBrandMapList

          this.gameBrandMapList =
            res.kolBrandKeywordsStatisticsList.length &&
            res.kolBrandKeywordsStatisticsList[2].gameBrandMapList

          // 作品标题
          const kolBrandKeywordsStatisticsMapList1 =
            res.kolBrandKeywordsStatisticsList.length &&
            res.kolBrandKeywordsStatisticsList[3].kolBrandKeywordsStatisticsMapList1.map(
              (item: any) => {
                const name = Object.keys(item).join('')
                const value = Object.values(item).join('')
                return { name: name, value: +value }
              }
            )

          if (kolBrandKeywordsStatisticsMapList1.length) {
            this.kolBrandKeywordsStatisticsMapList1 = [
              ...kolBrandKeywordsStatisticsMapList1
            ]

            this.kolBrandKeywordsStatisticsMapList1Word = kolBrandKeywordsStatisticsMapList1
              .sort(objectSort('value'))
              .slice(0, 20)
          }

          // 作品标签
          const kolBrandKeywordsStatisticsMapList2 =
            res.kolBrandKeywordsStatisticsList.length &&
            res.kolBrandKeywordsStatisticsList[4].kolBrandKeywordsStatisticsMapList2.map(
              (item: any) => {
                const name = Object.keys(item).join('')
                const value = Object.values(item).join('')
                return { name: name, value: +value }
              }
            )

          if (kolBrandKeywordsStatisticsMapList2.length) {
            this.kolBrandKeywordsStatisticsMapList2 = [
              ...kolBrandKeywordsStatisticsMapList2
            ]

            this.kolBrandKeywordsStatisticsMapList2Word = kolBrandKeywordsStatisticsMapList2
              .sort(objectSort('value'))
              .slice(0, 20)
          }

          // 相册
          const kolBrandKeywordsStatisticsMapList0 =
            res.kolBrandKeywordsStatisticsList.length &&
            res.kolBrandKeywordsStatisticsList[5].kolBrandKeywordsStatisticsMapList0.map(
              (item: any) => {
                const name = Object.keys(item).join('')
                const value = Object.values(item).join('')
                return { name: name, value: +value }
              }
            )

          if (kolBrandKeywordsStatisticsMapList0.length) {
            this.kolBrandKeywordsStatisticsMapList0 = [
              ...kolBrandKeywordsStatisticsMapList0
            ]

            this.kolBrandKeywordsStatisticsMapList0Word = kolBrandKeywordsStatisticsMapList0
              .sort(objectSort('value'))
              .slice(0, 20)
          }
        }
        // 非会员无权限访问
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {})
          this.permission = true
        }
      })
      .finally(() => (this.spinning = false))
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.advertisements {
  .advertisements-permission {
    img {
      width: 100%;
      height: 100%;
    }
  }
  .advertisements-content-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;

    h4 {
      border-left: 5px solid @active;
      padding-left: 6px;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .advertisements-class {
    display: flex;
    margin: 6px 0;

    strong {
      flex: 0 0 60px;
      line-height: 22px;
    }
  }

  .advertisements-word-cloud {
    h4 {
      margin: 12px 0;
    }
  }

  .ant-empty {
    padding: 24px 0;
  }
}
</style>
