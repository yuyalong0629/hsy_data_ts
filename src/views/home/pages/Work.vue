<template>
  <div class="work">
    <h3 class="home-work-title">你可以做什么？</h3>
    <ul class="home-work-container">
      <li class="home-work-list">
        <div class="home-list-title">
          <div class="home-list-title-img"></div>
          <p>快速找号</p>
        </div>
        <div class="home-list-line">
          <p></p>
        </div>
        <div class="home-list-vertical"></div>
        <div class="home-list-content">
          <p>你想要的自媒体主一 应俱全，你想找的账 号秒速呈现。</p>
        </div>
        <div class="home-list-num">
          <h4>
            <countTo ref="lookNum" :startVal="0" :endVal="getUserData.helpUser" :duration="3000"></countTo>
            <span style="font-size: 12px; font-weight: 500;">位</span>
          </h4>
          <p>帮助用户</p>
        </div>
      </li>
      <li class="home-work-list">
        <div class="home-list-title">
          <div class="home-list-title-img"></div>
          <p>辨别水军</p>
        </div>
        <div class="home-list-line">
          <p></p>
        </div>
        <div class="home-list-vertical"></div>
        <div class="home-list-content">
          <p>你想看的媒体主数据 一览无余，真假粉丝、刷量掺水、虚拟交易 等清晰可辨。</p>
        </div>
        <div class="home-list-num">
          <h4>
            <countTo
              ref="waterNum"
              :startVal="0"
              :endVal="getUserData.successLaunch"
              :duration="3000"
            ></countTo>
            <span style="font-size: 12px; font-weight: 500;">个</span>
          </h4>
          <p>成功投放账号</p>
        </div>
      </li>
      <li class="home-work-list">
        <div class="home-list-title">
          <div class="home-list-title-img"></div>
          <p>智能选号</p>
        </div>
        <div class="home-list-line">
          <p></p>
        </div>
        <div class="home-list-vertical"></div>
        <div class="home-list-content">
          <p>你疲于找号,无力辨号,但只要输入投放商品或广告需求,高匹配账号一个不漏。</p>
        </div>
        <div class="home-list-num">
          <h4>
            <countTo ref="smartNum" :startVal="0" :endVal="getUserData.saveTime" :duration="3000"></countTo>
            <span style="font-size: 12px; font-weight: 500;">小时</span>
          </h4>
          <p>为用户节约时间</p>
        </div>
      </li>
      <li class="home-work-list">
        <div class="home-list-title">
          <div class="home-list-title-img"></div>
          <p>精准投号</p>
        </div>
        <div class="home-list-line">
          <p></p>
        </div>
        <div class="home-list-vertical"></div>
        <div class="home-list-content">
          <p>竞品广告全网查询,数据效果一目了然,知彼知己屡投不爽。</p>
        </div>
        <div class="home-list-num">
          <h4>
            <countTo
              ref="accurateNum"
              :startVal="0"
              :endVal="getUserData.helpMedia"
              :duration="3000"
            ></countTo>
            <span style="font-size: 12px; font-weight: 500;">位</span>
          </h4>
          <p>帮助媒体主</p>
        </div>
      </li>
      <li class="home-work-list">
        <div class="home-list-title">
          <div class="home-list-title-img"></div>
          <p>数据监测</p>
        </div>
        <div class="home-list-line">
          <p></p>
        </div>
        <div class="home-list-vertical"></div>
        <div class="home-list-content">
          <p>钱在耗广告效果不知道?&nbsp;&nbsp;有数据监测,助你高枕无忧高瞻远瞩。</p>
        </div>
        <div class="home-list-num">
          <h4>
            <countTo ref="adsNum" :startVal="0" :endVal="getUserData.signAdver" :duration="3000"></countTo>
            <span style="font-size: 12px; font-weight: 500;">个</span>
          </h4>
          <p>签约广告数</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import countTo from 'vue-count-to'

@Component({
  components: {
    countTo
  }
})
export default class Work extends Vue {
  @Prop({ type: Object, default: {} })
  private helpUserData!: object

  @Prop({ default: false })
  private autoplay!: boolean

  private get getUserData(): object {
    return this.helpUserData
  }

  @Watch('autoplay')
  private function(val: string) {
    if (val) {
      ;(this.$refs as any).lookNum.start()
      ;(this.$refs.waterNum as any).start()
      ;(this.$refs.smartNum as any).start()
      ;(this.$refs.accurateNum as any).start()
      ;(this.$refs.adsNum as any).start()
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';

.work {
  width: 100%;
  height: 580px;
  background: url('~@/assets/images/banner.png') no-repeat center;
  background-size: cover;

  .home-work-title {
    font-size: 24px;
    color: #fff;
    text-align: center;
    padding: 48px 0;
  }

  .home-work-container {
    margin: 0 auto;
    width: 960px;
    display: flex;
    justify-content: center;
    li {
      flex: 1;
      cursor: pointer;
    }
    .home-work-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      .home-list-title {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px 0 0;
        .home-list-title-img {
          width: 24px;
          height: 24px;
          margin-right: 4px;
        }
        p {
          font-weight: 500;
          color: #fff;
        }
      }
      .home-list-line {
        height: 2px;
        background: rgba(255, 255, 255, 0.5);
        width: 100%;
        margin: 16px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        p {
          width: 8px;
          height: 8px;
          background: #ff422f;
          border-radius: 50%;
        }
      }
      .home-list-vertical {
        width: 2px;
        height: 26px;
        background: rgba(255, 255, 255, 0.5);
      }
      .home-list-content {
        width: 180px;
        min-height: 168px;
        background: #fff;
        border-radius: 3px;
        padding: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        p {
          font-size: 14px;
          letter-spacing: 2px;
          line-height: 22px;
        }
      }
      .home-list-num {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 60px;
        h4 {
          width: 100%;
          text-align: center;
          font-weight: bold;
          color: #e7282d;
          line-height: 42px;
          font-size: 26px;
        }
        p {
          width: 100%;
          text-align: center;
          color: #fff;
          font-size: 14px;
        }
      }
    }

    .home-work-list:nth-child(1) {
      .home-list-title {
        .home-list-title-img {
          background: url('~@/assets/images/4_kuaiduzhaohao.png') no-repeat
            center;
          background-size: cover;
        }
      }
    }

    .home-work-list:nth-child(2) {
      .home-list-title {
        .home-list-title-img {
          background: url('~@/assets/images/4_shibieshuijun.png') no-repeat
            center;
          background-size: cover;
        }
      }
    }

    .home-work-list:nth-child(3) {
      .home-list-title {
        .home-list-title-img {
          background: url('~@/assets/images/4_zhinengxuanhao.png') no-repeat
            center;
          background-size: cover;
        }
      }
    }

    .home-work-list:nth-child(4) {
      .home-list-title {
        .home-list-title-img {
          background: url('~@/assets/images/4_jingzhuntouhao.png') no-repeat
            center;
          background-size: cover;
        }
      }
    }

    .home-work-list:nth-child(5) {
      .home-list-title {
        .home-list-title-img {
          background: url('~@/assets/images/4_shujujiance.png') no-repeat center;
          background-size: cover;
        }
      }
    }

    .home-work-list:hover {
      .home-list-title {
        p {
          color: #ff5847;
        }
      }

      .home-list-line {
        p {
          width: 12px;
          height: 12px;
          border: 1px solid rgba(235, 38, 18, 1);
          border-radius: 50%;
        }
      }

      .home-list-content {
        background: #ff5847;
        color: #fff;
        transform: scale(1.1);
        transition: all 0.2s linear;
      }

      &:nth-child(1) {
        .home-list-title {
          .home-list-title-img {
            background: url('~@/assets/images/3_kuaiduzhaohao.png') no-repeat
              center;
            background-size: cover;
          }
        }
      }

      &:nth-child(2) {
        .home-list-title {
          .home-list-title-img {
            background: url('~@/assets/images/3_shibieshuijun.png') no-repeat
              center;
            background-size: cover;
          }
        }
      }

      &:nth-child(3) {
        .home-list-title {
          .home-list-title-img {
            background: url('~@/assets/images/3_zhinengxuanhao.png') no-repeat
              center;
            background-size: cover;
          }
        }
      }

      &:nth-child(4) {
        .home-list-title {
          .home-list-title-img {
            background: url('~@/assets/images/3_jingzhuntouhao.png') no-repeat
              center;
            background-size: cover;
          }
        }
      }

      &:nth-child(5) {
        .home-list-title {
          .home-list-title-img {
            background: url('~@/assets/images/3_shujujiance.png') no-repeat
              center;
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
