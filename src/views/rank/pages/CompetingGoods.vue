<template>
  <div class="competingGoods">
    <div v-if="permission" class="competingGoods-permisson">
      <img v-lazy="require('@/assets/images/jingpingtf.png')" alt />
    </div>

    <div v-else>
      <a-row :gutter="16">
        <a-col :span="24" class="competingGoods-title">
          <h4>竞品投放解析</h4>
        </a-col>
        <a-col :span="12">
          <a-radio-group @change="onChangeRadio" v-model="type">
            <a-radio :value="30">30天内</a-radio>
            <a-radio :value="60">60天内</a-radio>
            <a-radio :value="90">90天内</a-radio>
            <a-radio :value="180">180天内</a-radio>
          </a-radio-group>
        </a-col>
        <a-col :span="12">
          <a-input-search placeholder="号内搜 请输入关键词、商品名称、品牌名" @search="onSearch" enterButton />
        </a-col>
        <a-col :span="24" class="competingGoods-express">
          <p>报告包含：1.商品植入作品详情，2.商品广告曝光数据，3.作品互动数据</p>
        </a-col>
      </a-row>

      <a-spin :spinning="spinning">
        <a-row :gutter="16" v-if="dataNum !== 0">
          <a-col :span="24" class="competingGoods-title">
            <h4>竞品投放报告（{{ dataNum }}）</h4>
          </a-col>
          <a-col :span="24" class="competingGoods-report">
            <span class="competingGoods-report-name">
              <p>竞品名称：</p>
              <p>{{ keyword }}</p>
            </span>
            <span class="competingGoods-report-time">
              <p>查询时间：{{ `${publishTimeStart} - ${publishTimeEnd}` }}</p>
            </span>
          </a-col>

          <a-col :span="24" class="competingGoods-progress">
            <span>
              <strong>关联作品</strong>
              <a-progress
                :percent="percent"
                :strokeWidth="12"
                strokeColor="#00a1d6"
                :showInfo="false"
              />
            </span>
            <span>
              <p>{{ dataNum }}部</p>
              <p>{{ videoNum }}部（发布总数）</p>
            </span>
          </a-col>

          <a-col :span="24" class="competingGoods-steps">
            <strong>关联作品</strong>
            <a-timeline mode="left">
              <a-timeline-item v-for="(item, index) of datasPublish" :key="index">{{ item.name }}</a-timeline-item>
            </a-timeline>
          </a-col>

          <a-col :span="24" class="competingGoods-zone">
            <strong>商品广告作品发布时区</strong>
            <BarChart :xAis="dataMapListX" :legend="legend" :series="dataMapListY" />
          </a-col>
        </a-row>

        <a-row v-if="dataNum !== 0" :gutter="16" type="flex" justify="space-between" align="middle">
          <a-col :span="24" class="competingGoods-exposure">
            <strong>曝光数据</strong>
            <!-- <PieChart :title="titleExposure" :legend="legendExposure" :series="seriesExposure" /> -->
          </a-col>
          <a-col :span="6">
            <AnimateHover
              :setStyle="{ color: '#4f71ef', height: '180px', width: '180px', text: '品牌曝光量', num: seriesExposure.playNum }"
            />
          </a-col>
          <a-col :span="6">
            <AnimateHover
              :setStyle="{ color: '#ffce2c', height: '140px', width: '140px', text: '获得弹幕量', num: seriesExposure.barrageNum }"
            />
            <AnimateHover
              :setStyle="{ color: 'pink', height: '140px', width: '140px', text: '获得收藏量', num: seriesExposure.collectNum }"
            />
          </a-col>
          <a-col :span="6">
            <AnimateHover
              :setStyle="{ color: '#01c5d2', height: '140px', width: '140px', text: '获得评论量', num: seriesExposure.commentNum }"
            />
            <AnimateHover
              :setStyle="{ color: '#ff812d', height: '140px', width: '140px', text: '获得分享量', num: seriesExposure.shareNum }"
            />
          </a-col>
          <a-col :span="6">
            <AnimateHover
              :setStyle="{ color: 'orange', height: '140px', width: '140px', text: '获得点赞量', num: seriesExposure.praiseNum }"
            />
            <AnimateHover
              :setStyle="{ color: '#87d068', height: '140px', width: '140px', text: '获得投币量', num: seriesExposure.castCurrencyNum }"
            />
          </a-col>
        </a-row>

        <a-empty v-else />
      </a-spin>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import { boutiqueAnalysis } from '@/api/rank'
import BarChart from '@/components/Echart/BarChart.vue'
import FunnelChart from '@/components/Echart/FunnelChart.vue'
import PieChart from '@/components/Echart/PieChart.vue'
import AnimateHover from '@/components/Animation/Hover.vue'
import { vipNotice } from '@/utils/util'

const user = namespace('user')

@Component({
  components: {
    BarChart,
    FunnelChart,
    PieChart,
    AnimateHover
  }
})
export default class CompetingGoods extends Vue {
  @user.Getter GET_STORAGE!: () => any

  @Prop({ default: () => {} }) private pageInfo!: any
  @Prop({ default: 0 }) private videoNum!: number

  private type: number = 30
  private keyword: string = ''
  private spinning: boolean = false
  private permission: boolean = false
  private dataNum: number = 0
  private percent: number = 0
  private datasPublish: any[] = []
  private publishTimeStart: string = ''
  private publishTimeEnd: string = ''

  // 柱状图
  private dataMapListX: any[] = []
  private dataMapListY: any[] = []
  private legend: string[] = ['作品发布时区']

  private seriesExposure: object = {}

  private mounted() {
    // 非专业级会员以上禁止使用
    if ((this.GET_STORAGE as any).userType < 2) {
      vipNotice.call(
        this,
        '竞品投放查询是专业版及以上会员尊享，我要升级会员',
        () => {}
      )
      this.permission = true
    }
  }

  // 竞品投放 Function
  private getBoutiqueAnalysis(params?: any): any {
    this.spinning = true
    return boutiqueAnalysis(params)
      .then((res: any) => {
        if (res.code === 200) {
          // 竞品名称
          this.keyword = decodeURI(decodeURI(params.keyword))
          this.datasPublish = res.datasPublish

          this.dataNum = res.dataNum
          this.percent = (this.dataNum / this.videoNum) * 100
          this.publishTimeStart = res.publishTimeStart
          this.publishTimeEnd = res.publishTimeEnd
          // 柱状图
          this.dataMapListX = res.dataMap.map((item: any) => {
            return item.name
          })

          const dataMapListY = res.dataMap.map((item: any) => {
            return item.value
          })

          this.dataMapListY = [
            {
              name: '作品发布条数',
              type: 'bar',
              smooth: true,
              stack: '总量',
              data: dataMapListY
            }
          ]

          this.seriesExposure = {
            playNum: res.playNum,
            barrageNum: res.barrageNum,
            commentNum: res.commentNum,
            praiseNum: res.praiseNum,
            collectNum: res.collectNum,
            shareNum: res.shareNum,
            castCurrencyNum: res.castCurrencyNum
          }
        }
        // 非会员无权限访问
        // if (res.code === -1) {
        //   vipNotice.call(this, res.message, () => {})
        //   this.permission = true
        // }
      })
      .finally(() => (this.spinning = false))
  }

  // 竞品投放解析 Radio
  private onChangeRadio(e: any): void {
    console.log(e)
    this.type = e.target.value
  }

  // 竞品投放解析 Search
  private onSearch(value: string, e: any): void {
    e.preventDefault()
    this.getBoutiqueAnalysis({
      keyword: encodeURI(encodeURI(value)),
      kolId: (this.$route.query as any).kolId,
      type: this.type
    })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.competingGoods {
  .competingGoods-permisson {
    img {
      width: 100%;
    }
  }
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  padding: 12px;

  .ant-empty {
    padding: 24px 0;
  }

  .ant-radio-group {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    height: 32px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .competingGoods-title {
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

  .competingGoods-report {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;

    .competingGoods-report-name {
      display: flex;
      align-items: center;

      p:nth-child(2) {
        color: #00a1d6;
        font-weight: 400;
      }
    }

    .competingGoods-report-time {
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: #c7c7c7;
    }

    .competingGoods-report-change {
      display: flex;
      justify-content: flex-end;
      width: 160px;

      a {
        margin-left: 12px;
      }
    }
  }

  .competingGoods-progress {
    display: flex;
    flex-direction: column;

    span:nth-child(1) {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px 0;

      strong {
        flex: 0 0 80px;
        padding-top: 2px;
      }
    }

    span:nth-child(2) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-left: 86px;
    }
  }

  .competingGoods-steps {
    display: flex;
    margin: 24px 0 12px;
    align-items: flex-start;
    max-height: 400px;
    overflow: auto;

    strong {
      flex: 0 0 80px;
    }
  }

  .competingGoods-exposure {
    display: flex;
    flex-direction: column;
    padding: 12px 0;
  }

  .competingGoods-express {
    color: #c7c7c7;
    line-height: 28px;
    margin-top: 12px;
  }
}
</style>
