<template>
  <div class="footer">
    <div class="footer-container">
      <ul class="footer-top">
        <li>
          <img v-lazy="require('@/assets/images/logof.png')" alt />
        </li>
        <li>
          <p>
            火烧云数据依托专业的数据挖掘和大数据分析
            能力，为广告主提供500多万个媒体账号作品
            内容分析、粉丝分析、广告价值评估和投前投
            后检测，让新媒体广告投放更快、更准、更稳，广告效果看得见。
          </p>
          <p>地址: 杭州市拱墅区浙大网新·智慧立方C座402</p>
        </li>
        <li>
          <router-link
            style="cursor: pointer;"
            tag="p"
            :to="{path: '/mine', query: {index: 1}}"
          >关于我们</router-link>
          <router-link
            style="cursor: pointer;"
            tag="p"
            :to="{path: '/mine', query: {index: 2}}"
          >联系我们</router-link>
          <p>客服中心：0571-8256 5101</p>
          <p>简历投递邮箱：sunjuanjuan@dameicm.cn</p>
        </li>
        <li>
          <icon-font class="footer-icon" type="icon-xuexi1" />
          <router-link
            style="cursor: pointer;"
            tag="p"
            :to="{path: '/mine', query: {index: 0}}"
          >火烧云课堂</router-link>
        </li>
        <li>
          <img v-lazy="require('../../assets/images/wechart.png')" alt />
          <p>关注公众号服务更贴心</p>
        </li>
      </ul>
      <div class="footer-bottom">Copyright © 2019-2019 火烧云数据 | 杭州羽联信息科技有限公司 浙ICP备00000000号-0</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Footer extends Vue {}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';

.footer {
  flex: 0 0 180px;
  background: #091514;
  width: 100%;

  .footer-container {
    .basicWidth();
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 24px 0;

    .footer-top {
      flex: 1;
      display: flex;
      justify-content: space-around;

      li:nth-child(1) {
        flex: 0 0 80px;
        display: flex;
        align-items: center;

        img {
          width: 80px;
          height: 60px;
        }
      }

      li:nth-child(2) {
        flex: 0 0 280px;

        p {
          color: #e3e3e3;
          font-weight: 400;
          line-height: 22px;
          margin-bottom: 12px;
        }
      }

      li:nth-child(3) {
        p {
          color: #e3e3e3;
          font-weight: 400;
          line-height: 22px;
          margin-bottom: 6px;
        }
      }

      li:nth-child(4) {
        display: flex;
        align-items: center;
        .footer-icon {
          font-size: 24px;
          color: #e3e3e3;
          margin-right: 4px;
        }

        p {
          color: #e3e3e3;
          font-weight: 400;
          line-height: 22px;
          font-size: 18px;
        }
      }

      li:nth-child(5) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        img {
          width: 104px;
          height: 104px;
          margin-bottom: 6px;
        }

        p {
          color: #e3e3e3;
          font-weight: 400;
          line-height: 22px;
        }
      }
    }

    .footer-bottom {
      margin-top: 12px;
      text-align: center;
      color: #c4c4c4;
    }
  }
}
</style>
