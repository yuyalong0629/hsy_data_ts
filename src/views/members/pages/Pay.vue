<template>
  <div class="pay">
    <a-row>
      <a-col :span="24" class="pay-level">
        <strong>选择会员等级：</strong>
        <ul class="pay-level-list">
          <li
            v-for="item of level"
            :class="{ activeIndex: isLevel === item.id }"
            :key="item.id"
            @click="item.isClick && handleLevel(item)"
          >
            <img v-if="isLevel === item.id" v-lazy="require('@/assets/images/gouzi.png')" alt />
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </a-col>

      <a-col :span="24" class="pay-interval">
        <strong>选择会员套餐：</strong>
        <ul class="pay-interval-list">
          <li
            v-for="(item, index) of monthlyPriceInfos"
            :class="{ activeIndex: isInterval === index }"
            :key="item.id"
            @click="handleInterval(item, index)"
          >
            <img v-if="isInterval === index" v-lazy="require('@/assets/images/gouzi.png')" alt />
            <span class="pay-interval-list-time">{{ `${item.monthNum}个月` }}</span>
            <span class="pay-interval-list-price">
              <strong>{{ item.unitPrice }}</strong>
              元/月
            </span>
            <del class="pay-interval-list-save">立省{{ item.saveMoney }}</del>
          </li>
        </ul>
      </a-col>

      <a-col :span="24" class="pay-way">
        <strong>选择支付方式付款：</strong>
        <ul class="pay-way-list">
          <li
            v-for="item of way"
            :class="{ activeIndex: isWay === item.id }"
            :key="item.id"
            @click="handleWay(item)"
          >
            <img
              class="pay-way-list-position"
              v-if="isWay === item.id"
              v-lazy="require('@/assets/images/gouzi.png')"
              alt
            />
            <img class="pay-way-list-img" :src="item.src" alt />
          </li>
        </ul>
      </a-col>

      <a-col :span="24" class="pay-amount">
        <strong>支付金额：</strong>
        <div class="pay-amount-wrapper">
          <p class="pay-amount-wrapper-price">
            <span>{{ price.price }}</span> 元(原价
            <del>{{ price.originalPrice }}</del>元，节省
            <span>{{ price.saveMoney }}</span>元)
          </p>
          <a-popover placement="topLeft" :title="false">
            <template slot="content">
              <p>
                账户名称: 杭州羽联信息科技有限公司
                <br />账户号码: 571909759410506
                <br />开户银行: 招商银行股份有限公司杭州武林支行
                <br />支付完成后联系客服：15067158565
              </p>
            </template>
            企业对公转账
            <a-icon type="question-circle" />
          </a-popover>
        </div>
      </a-col>

      <a-col :span="24" class="pay-timeLimit">
        <span>会员有限期至：2019年05月20日</span>
      </a-col>

      <a-col :span="24" class="pay-agreement">
        <p>
          点击"立即支付"表示您已阅读并接受
          <router-link to="/agreement">《用户授权许可协议》</router-link>
        </p>
        <p>
          在线支付成功后重新登录即可自动生效，如需发票请支付后到会员中心申请；如遇付款问题或需要纸质合同请
          <a-tooltip placement="top">
            <template slot="title">
              <span>联系客服：15067158565</span>
            </template>
            <a href="javscript:;">联系客服</a> .
          </a-tooltip>
        </p>
      </a-col>

      <a-col :span="24" class="pay-submit">
        <a-button type="primary" size="large" @click="handlePayment">立即支付</a-button>
      </a-col>

      <!-- Modal -->
      <a-col :span="24">
        <a-modal
          :destroyOnClose="true"
          width="400px"
          title="微信扫码支付"
          :visible="visible"
          @cancel="handleCancel"
          :footer="null"
        >
          <div class="wechart">
            <img v-if="applyImg" class="wechart-img" :src="applyImg" alt="微信支付" />
          </div>
          <a-divider>请使用微信扫码支付，支付完成后关闭窗口</a-divider>
        </a-modal>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { buyPrice, confirmPay, alipayReturn, payQuery } from '@/api/pay'
import { userInfo } from '@/api/user'
import { Mutation, namespace } from 'vuex-class'

const user = namespace('user')

@Component
export default class Pay extends Vue {
  @user.Mutation SET_LOGIN!: (params: any) => void

  private level: any[] = [
    { id: 0, isClick: true, name: '高级版会员' },
    { id: 1, isClick: true, name: '专业版会员' },
    { id: 2, isClick: true, name: '企业版会员' }
  ]
  private way: any[] = [
    { id: 0, src: require('@/assets/images/weixin.png') },
    { id: 1, src: require('@/assets/images/zhifubao.png') }
  ]

  private isLevel: number = 1
  private isInterval: number = 0
  private isWay: number = 0
  private monthlyPriceInfos: any[] = []
  private price: any = {}
  private visible: boolean = false
  private applyImg: string = ''

  public userType: number = 2

  private mounted() {
    if (this.$route.query.priceType) {
      // 初始化价格列表
      this.getPrice({ type: (this.$route.query as any).priceType })
      this.isLevel = +(this.$route.query as any).priceType - 1
    } else {
      this.getPrice({ type: '2' })
    }

    // 支付订单回调
    if (this.$route.query.out_trade_no && this.$route.query.trade_no) {
      this.alipyBack({
        out_trade_no: this.$route.query.out_trade_no,
        trade_no: this.$route.query.trade_no
      })
    }
  }

  // 获取价格列表
  private async getPrice(params?: { type: string }) {
    return buyPrice(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.monthlyPriceInfos = res.monthlyPriceInfos

          // 会员套餐默认值
          this.isInterval = res.monthlyPriceInfos.findIndex((item: any) => {
            return item.isDefault === 1
          })

          // 支付金额
          this.price = res.monthlyPriceInfos.filter(
            (item: any) => item.isDefault === 1
          )[0]

          // 判断续费
          this.userType = res.userType
        }
      })
      .then(() => {
        // 新用户购买 ||  高级版会员
        if (this.userType === 0 || this.userType === 1) {
          this.level = [
            { id: 0, isClick: true, name: '高级版会员' },
            { id: 1, isClick: true, name: '专业版会员' },
            { id: 2, isClick: true, name: '企业版会员' }
          ]
        }
        // 专业版续费
        if (this.userType === 2) {
          this.level = [
            { id: 0, isClick: false, name: '高级版会员' },
            { id: 1, isClick: true, name: '专业版会员' },
            { id: 2, isClick: true, name: '企业版会员' }
          ]
        }
        // 企业版续费
        if (this.userType === 3) {
          this.level = [
            { id: 0, isClick: false, name: '高级版会员' },
            { id: 1, isClick: false, name: '专业版会员' },
            { id: 2, isClick: true, name: '企业版会员' }
          ]
        }
      })
      .catch(() => this.$message.error('请求超时'))
  }

  // 支付订单回调
  private alipyBack(params: any) {
    return alipayReturn(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.$message.success('支付成功')
          return
        }
        if (res.code === 303) {
          this.$message.warn('订单取消')
          return
        }
        this.$message.error('支付失败')
      })
      .finally(() => {
        // 更新会员信息
        userInfo().then((res: any) => {
          if (res.code === 200) {
            this.SET_LOGIN(res.userInfoMap)
          }
        })
      })
  }

  // 会员等级
  private handleLevel(item: any): void {
    this.isLevel = item.id
    this.getPrice({ type: +item.id + 1 + '' })
  }

  // 会员套餐
  private handleInterval(item: any, index: number): void {
    this.isInterval = index
    this.price = item
  }

  // 支付方式
  private handleWay(item: any): void {
    this.isWay = item.id
  }

  // 支付
  private handlePayment(): void {
    confirmPay({
      type: 1,
      priceId: this.price.id,
      payType: this.isWay === 0 ? '2' : '1'
    }).then((res: any) => {
      if (res.code === 200) {
        // 支付宝
        if (this.isWay !== 0) {
          const routerData = this.$router.resolve({
            path: '/apply',
            query: { htmls: res.payResult }
          })
          // 打开新页面
          window.open(routerData.href, '_ blank')
        } else {
          // 微信
          this.visible = true
          if (res.imgStr) {
            this.applyImg = `data:image/png;base64,${res.imgStr}`
          }
        }
      } else {
        this.$message.error(res.message)
      }
    })
  }

  // cancel
  private handleCancel(): void {
    this.visible = false
    // 微信支付关闭回调
    payQuery()
      .then((res: any) => {
        if (res.code === 200) {
          this.$message.success('支付成功', 3)
          // this.$router.push('/buyMembers')
          return
        }
        this.$message.error('支付失败', 3)
      })
      .finally(() => {
        // 更新会员信息
        userInfo().then((res: any) => {
          if (res.code === 200) {
            this.SET_LOGIN(res.userInfoMap)
          }
        })
      })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.pay {
  .basicWidth();
  padding: 24px 0;

  .pay-level {
    display: flex;
    flex-direction: column;

    .pay-level-list {
      display: flex;
      padding: 24px 0;

      li {
        width: 160px;
        height: 68px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-right: 24px;
        transition: all 0.3s;
        color: #323232;
        font-size: 16px;
        font-weight: 400;
        position: relative;

        img {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 30px;
        }

        &:hover {
          border-color: rgba(0, 0, 0, 0.09);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        }

        &.activeIndex {
          border-color: #bd8e4f;
          border-width: 1px;
          box-shadow: 0 2px 10px 0 #db8e4f;
        }

        &:nth-child(1) {
          background: url('~@/assets/images/gao3-anniu.png') no-repeat top right;
          background-size: cover;
        }

        &:nth-child(2) {
          background: url('~@/assets/images/gao-anniu.png') no-repeat top right;
          background-size: cover;
        }

        &:nth-child(3) {
          background: url('~@/assets/images/gao1-anniu.png') no-repeat top right;
          background-size: cover;
        }
      }
    }
  }

  .pay-interval {
    display: flex;
    flex-direction: column;

    .pay-interval-list {
      padding: 24px 0;
      display: flex;

      li {
        width: 200px;
        height: 140px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 24px;
        transition: all 0.3s;
        color: #323232;
        font-size: 16px;
        font-weight: 400;
        position: relative;

        .pay-interval-list-time {
          color: #909090;
          font-size: 16px;
          font-weight: 400;
        }

        .pay-interval-list-price {
          font-size: 14px;
          font-weight: 400;
          color: #909090;
          margin: 12px 0;

          strong {
            font-size: 24px;
            font-weight: 600;
          }
        }

        .pay-interval-list-save {
          color: #909090;
          font-size: 14px;
          font-weight: 400;
        }

        img {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 30px;
        }

        &:nth-child(1) {
          background: url('~@/assets/images/liuzhe.png') no-repeat 16px 0;
          background-size: 16%;
        }

        &:nth-child(2) {
          background: url('~@/assets/images/qizhe.png') no-repeat 16px 0;
          background-size: 16%;
        }

        &:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        }

        &.activeIndex {
          border-color: #bd8e4f;
          border-width: 1px;
          box-shadow: 0 2px 10px 0 #db8e4f;

          .pay-interval-list-price {
            color: #bd8e4f;
          }
        }
      }
    }
  }

  .pay-way {
    display: flex;
    flex-direction: column;

    .pay-way-list {
      padding: 24px 0;
      display: flex;

      li {
        width: 160px;
        height: 68px;
        border: 1px solid #e8e8e8;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-right: 24px;
        transition: all 0.3s;
        color: #323232;
        font-size: 16px;
        font-weight: 400;
        position: relative;

        .pay-way-list-position {
          position: absolute;
          right: 0;
          top: 0;
          width: 40px;
          height: 30px;
        }

        .pay-way-list-img {
          width: 168px;
          height: 60px;
        }

        &:hover {
          border-color: rgba(0, 0, 0, 0.09);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
        }

        &.activeIndex {
          border-color: #bd8e4f;
          border-width: 1px;
          box-shadow: 0 2px 10px 0 #db8e4f;
        }
      }
    }
  }

  .pay-amount {
    display: flex;
    flex-direction: column;

    .pay-amount-wrapper {
      padding: 24px 0;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .pay-amount-wrapper-price {
        line-height: 28px;
        text-align: center;
        font-size: 16px;
        color: #999;

        span {
          color: #bd8e4f;
          font-size: 24px;
          font-weight: 400;
        }

        del {
          color: #bd8e4f;
          font-size: 24px;
          font-weight: 400;
        }
      }
    }
  }

  .pay-agreement {
    padding: 24px 0;

    p {
      line-height: 24px;
    }
  }

  .pay-submit {
    display: flex;
    justify-content: center;

    .ant-btn-lg {
      padding: 0 48px;
    }
  }
}
</style>
