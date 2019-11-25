<template>
  <div class="about">
    <ul class="about-left">
      <li
        class="about-left-list"
        v-for="item of about"
        :key="item.index"
        :class="{ activeabout: isActiveabout === item.index }"
        @click="handleabout(item.index)"
      >
        <span>{{ item.text }}</span>
        <a-icon :type="item.icon" />
      </li>
    </ul>
    <div class="about-right">
      <div class="about-right-introduce" v-if="isActiveabout === 0">
        <div class="about-right-introduce-text">
          <div class="about-right-introduce-text-left">
            <h4>
              <i></i>火烧云数据
            </h4>
            <p>火烧云数据隶属于杭州羽联信息科技有限公司，是短视频领域权威的数据分析平台。火烧云数据平台依托专业的数据挖掘和大数据分析能力，提供B站数据、小红书数据等，为广告主提供媒体主作品内容数据分析、粉丝数据分析、广告价值评估和投前投后检测等。致力于用技术赋能广告行业，开启新媒体广告投放数据化、智能化新纪元，实现广告主新媒体广告投放更快、更准、更稳、更有效。</p>
            <h4>
              <i></i>公司简介
            </h4>
            <p>杭州羽联信息科技有限公司是国内领先的新媒体广告服商，作为国内领先的大型新媒体营销服务商，大美新媒体汇集海量优质资源，涵盖小红书、微信公众号、微博、直播等各大媒体平台及博主达人。我们致力于为企业构建更高效、更精准的新媒体时代全新的营销生态，为国内外合作伙伴提供专业化的广告投放、品牌曝光、产品推广等一站式智能投放服务，帮助企业快速实现品牌价值提升，商品曝光转好提升。</p>
          </div>
          <div class="about-right-introduce-text-img">
            <img src="../../assets/images/about1.png" alt />
          </div>
        </div>
        <div class="about-right-introduce-bottom">
          <img v-lazy="require('@/assets/images/about2.png')" alt />
          <img v-lazy="require('@/assets/images/about3.png')" alt />
          <img v-lazy="require('@/assets/images/about4.png')" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class About extends Vue {
  private about: object[] = [{ index: 0, icon: 'right', text: '公司简介' }]
  private isActiveabout: number = 0

  private handleabout(index: number): void {
    this.isActiveabout = index
  }
}
</script>

<style lang="less" scoped>
.about {
  display: flex;

  .about-left {
    flex: 0 0 210px;

    .about-left-list {
      border: 1px solid #dddddd;
      height: 50px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        margin-right: 18px;
        width: 108px;
      }
    }

    .activeabout {
      color: #d92b30;
    }
  }

  .about-right {
    flex: 1;
    margin-left: 24px;
    min-height: 500px;

    .about-right-introduce {
      display: flex;
      flex-direction: column;

      .about-right-introduce-text {
        display: flex;
        justify-content: space-around;

        .about-right-introduce-text-left {
          flex: 1;

          h4 {
            font-size: 20px;
            line-height: 28px;
            height: 28px;
            margin: 8px 0;
            font-weight: 500;
            display: flex;
            align-content: center;
            box-sizing: border-box;

            i {
              border-left: 8px solid #da5054;
              padding-left: 12px;
              height: 20px;
              display: inline-block;
              margin-top: 4px;
            }
          }

          p {
            font-size: 14px;
            line-height: 24px;
            margin-bottom: 50px;
            font-weight: 500;
          }
        }

        .about-right-introduce-text-img {
          display: 0 0 200px;

          img {
            width: 240px;
            height: 240px;
          }
        }
      }

      .about-right-introduce-bottom {
        display: flex;
        justify-content: space-between;
        width: 100%;

        img {
          width: 300px;
          height: 200px;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
