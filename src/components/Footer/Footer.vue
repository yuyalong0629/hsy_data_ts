<template>
  <div class="footer">
    <div class="footer-container">
      <ul class="footer-top">
        <li>
          <img v-lazy="require('@/assets/images/logof.png')" alt />
        </li>
        <li>
          <p>火烧云数据是B站广告投放权威的大数据分析平台，聚合280万个UP主数据，分析挖掘其广告价值；助你快速查找优质UP主资源，洞察竞品投放情报，挖掘高匹配UP主，监测广告投放效果等，是你投B站广告的专业数据工具。</p>
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
      <div class="footer-bottom">Copyright©2019 火烧云数据 | 杭州羽联信息科技有限公司 浙ICP备16045182号-3</div>
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
        flex: 0 0 285px;

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
