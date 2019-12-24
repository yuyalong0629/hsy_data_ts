<template>
  <div class="detail" ref="anchor">
    <div class="detail-left">
      <DetailUserInfo :kolInfo="kolInfo" :isCollect="isCollect" />
    </div>

    <div class="detail-right">
      <!-- 粉丝数 | 作品数 ... -->
      <DetailNumber :kolTotalData="kolTotalData" />

      <div :style="{ margin: '16px 0' }">
        <a-radio-group defaultValue="0" buttonStyle="solid">
          <a-radio-button value="0" @click="onChangeRadio('0')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>统计和展现UP主视频作品详情以及数据情况</span>
              </template>
              视频作品统计
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="1" @click="onChangeRadio('1')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>统计和展现UP主图文动态详情以及数据情况</span>
              </template>
              图文动态统计
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="2" @click="onChangeRadio('2')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>统计UP主6大维度数据分析周增量、总量趋势变化</span>
              </template>
              UP主数据趋势
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="3" @click="onChangeRadio('3')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>监测UP主下次发文，查看最新数据动态</span>
              </template>
              监测UP主新作
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="4" @click="onChangeRadio('4')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>根据UP主单作品数据趋势、粉丝画像、作品画像确定投放方案</span>
              </template>
              投前分析
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="5" @click="onChangeRadio('5')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>分析UP主商品/产品广告信息量及品牌云图和排名</span>
              </template>
              商品广告报告
            </a-tooltip>
          </a-radio-button>
          <a-radio-button value="6" @click="onChangeRadio('6')">
            <a-tooltip placement="top" :mouseEnterDelay="0.5">
              <template slot="title">
                <span>查询竞品及相似品牌投放，更准确甄别UP主价值</span>
              </template>
              竞品投放查询
            </a-tooltip>
          </a-radio-button>
        </a-radio-group>
      </div>

      <a-row :style="{ marginTop: '12px' }">
        <a-col :span="24">
          <a-spin :spinning="spinning">
            <component
              :is="componentId"
              :videoInfo="pageInfo"
              :detailType="detailType"
              :updateTime="updateTime"
              :videoNum="kolTotalData.videoNum"
              @videoChangePage="videoChangePage"
              @videoSearch="videoSearch"
              @changeSearch="changeSearch"
            ></component>
          </a-spin>
        </a-col>
      </a-row>

      <a-row v-if="!GET_STORAGE || GET_STORAGE.userType === 0" :style="{ margin: '12px 0' }">
        <a-col :span="24">
          <Permissions alert="免费版暂不可查看更多信息" />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import { details, insearch } from '@/api/rank'
import DetailUserInfo from '@/components/UserInfo/UserInfo.vue'
import DetailNumber from '@/components/UserInfo/UserNumber.vue'
import VideoStatistics from './VideoStatistics.vue'
import UpDataTrend from './UpDataTrend.vue'
import Advertisements from './Advertisements.vue'
import CompetingGoods from './CompetingGoods.vue'
import Permissions from '@/components/Permissions/Permissions.vue'
import { vipNotice } from '@/utils/util'

interface Params {
  [key: string]: number | string
}

const user = namespace('user')

@Component({
  components: {
    DetailUserInfo,
    DetailNumber,
    VideoStatistics,
    UpDataTrend,
    Advertisements,
    CompetingGoods,
    Permissions
  }
})
export default class Detail extends Vue {
  @user.Getter GET_STORAGE!: () => any

  @Ref() readonly anchor?: any

  private spinning: boolean = false
  private componentId: string = 'VideoStatistics'
  private kolInfo?: object
  private kolTotalData?: object
  private pageInfo?: object
  private isCollect: boolean = false
  private updateTime?: string = ''
  // 视频 |图文 默认 type
  private detailType?: string

  private data() {
    return {
      kolInfo: {},
      kolTotalData: {},
      pageInfo: {},
      isCollect: false,
      updateTime: '',
      detailType: '1'
    }
  }

  private created() {
    if (this.detailType === '1') {
      this.getDetails({
        kolId: (this.$route.query as any).kolId,
        type: this.detailType,
        pageNo: 0
      })
    }
  }

  // 初始化账号详情 Function
  private async getDetails(params?: Params) {
    this.spinning = true
    return details(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.kolInfo = {
            ...res.kolInfo,
            fansNum: res.kolTotalData.fansNum,
            playNum: res.kolTotalData.playNum,
            chargingNum: res.kolTotalData.chargingNum,
            indexNum: res.kolTotalData.indexNum
          }
          this.kolTotalData = res.kolTotalData

          this.pageInfo = {
            ...res.page,
            type: 0
          }

          this.updateTime = res.kolTotalData.updateTime
          this.isCollect = res.isCollect
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

  // 初始页 Radio 导航
  private onChangeRadio(key: string): void {
    // 视频作品
    if (key === '0') {
      this.detailType = '1'
      const params = {
        kolId: (this.$route.query as any).kolId,
        type: this.detailType,
        pageNo: 0
      }
      this.getDetails(params)
      this.componentId = 'VideoStatistics'
    }

    // 图文作品
    if (key === '1') {
      this.detailType = '2'
      const params = {
        kolId: (this.$route.query as any).kolId,
        type: this.detailType,
        pageNo: 0
      }
      this.getDetails(params)
      this.componentId = 'VideoStatistics'
    }

    // UP主数据趋势
    if (key === '2') {
      this.componentId = 'UpDataTrend'
    }

    // UP主数监测新作
    if (key === '3') {
      const { href } = this.$router.resolve({
        path: '/monitoring',
        query: {
          kolId: (this.$route.query as any).kolId,
          name: (this.kolInfo as any).kolName
        }
      })
      window.open(href, '_blank')
    }

    // 投前分析
    if (key === '4') {
      const { href } = this.$router.resolve({
        path: '/analysis',
        query: {
          kolId: this.$route.query.kolId
        }
      })
      window.open(href, '_blank')
    }

    // 商品广告报告
    if (key === '5') {
      this.componentId = 'Advertisements'
    }

    // 竞品投放
    if (key === '6') {
      this.componentId = 'CompetingGoods'
    }
  }

  // 视频作品统计 分页
  private videoChangePage(pageInfo: any, pageNumber: string): void {
    if (this.detailType === '1') {
      // 初始化分页
      if (pageInfo.type === 0) {
        this.getDetails({
          kolId: (this.$route.query as any).kolId,
          type: '1',
          pageNo: +pageNumber - 1
        })
      }

      // 号内搜分页
      if (pageInfo.type !== 0) {
        this.insearchData({
          kolId: this.$route.query.kolId,
          pageNo: +pageNumber - 1,
          keyword: encodeURI(encodeURI(pageInfo.keyword)),
          type: pageInfo.type,
          searchType: '1'
        })
      }
    }

    if (this.detailType === '2') {
      // 初始化分页
      if (pageInfo.type === 0) {
        this.getDetails({
          kolId: (this.$route.query as any).kolId,
          type: '2',
          pageNo: +pageNumber - 1
        })
      }
      // 号内搜分页
      if (pageInfo.type !== 0) {
        this.insearchData({
          kolId: this.$route.query.kolId,
          pageNo: +pageNumber - 1,
          keyword: encodeURI(encodeURI(pageInfo.keyword)),
          type: '0',
          searchType: '2'
        })
      }
    }

    // 锚点
    ;(this.anchor as any).scrollIntoView(true)
  }

  // 视频作品统计 搜索 Function
  private insearchData(params: any) {
    this.spinning = true
    return insearch(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.pageInfo = {
            ...res.page,
            type: params.type,
            keyword: params.keyword
          }
        }
        // 非会员无权限访问
        if (res.code === -1) {
          vipNotice.call(this, res.message, () => {})
        }
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
  }

  // 清空输入框时 初始化数据
  private changeSearch(e: any): void {
    if (!e.target.value) {
      if (this.detailType === '1') {
        this.getDetails({
          kolId: (this.$route.query as any).kolId,
          type: this.detailType,
          pageNo: 0
        })
      }

      if (this.detailType === '2') {
        this.getDetails({
          kolId: (this.$route.query as any).kolId,
          type: this.detailType,
          pageNo: 0
        })
      }
    }
  }

  // 视频作品统计 搜索
  private videoSearch(type: number, value: string): void {
    if (!value) {
      this.$message.warning('关键词不能为空')
      return
    }

    if (this.detailType === '1') {
      this.insearchData({
        kolId: this.$route.query.kolId,
        pageNo: 0,
        keyword: encodeURI(encodeURI(value)),
        searchType: '1',
        type: type
      })
    }

    if (this.detailType === '2') {
      this.insearchData({
        kolId: this.$route.query.kolId,
        pageNo: 0,
        keyword: encodeURI(encodeURI(value)),
        searchType: '2',
        type: '0'
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.detail {
  .basicWidth();
  display: flex;
  padding: 24px 0;
  // position: relative;

  .detail-left {
    // position: absolute;
    width: 280px;
  }

  .detail-right {
    width: 900px;
    margin-left: 20px;

    .ant-radio-group {
      display: flex;

      .ant-radio-button-wrapper {
        flex: 1;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
