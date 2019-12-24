<template>
  <div class="home-rote">
    <h3 class="home-rote-title">火烧云数据价值</h3>
    <div class="home-core-container">
      <div class="home-core-bigRote"></div>
      <div class="home-core-smallRote"></div>
      <ul class="home-core-content">
        <li>
          <img v-lazy="require('@/assets/images/tu1.png')" alt />
          <p>聚合新媒体数据</p>
          <div class="home-core-content-list">
            <p>
              运用大数据聚合并分析200多万个媒体主，
              包括B站up主、小红书KOL、短视频达人等数据。
            </p>
          </div>
        </li>
        <li>
          <img v-lazy="require('@/assets/images/tu2.png')" alt />
          <p>智能推荐高精准账号</p>
          <div class="home-core-content-list">
            <p>根据投放商品和广告需求，结合历史投放偏好及分析关联商品广告数据，为你智能匹配账号。</p>
          </div>
        </li>
        <li>
          <img v-lazy="require('@/assets/images/tu3.png')" alt />
          <p>分析账号广告价值</p>
          <div class="home-core-content-list">
            <p>10大维度分析账号广告价值且图表呈现：作品数据、互动数据、粉丝画像、投前分析等等。</p>
          </div>
        </li>
        <li>
          <img v-lazy="require('@/assets/images/tu4.png')" alt />
          <p>跟踪监测广告投放数据</p>
          <div class="home-core-content-list">
            <p>
              分钟级监测目标账号作品数据，
              实时跟进广告投放效果并输出报告。
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Rote extends Vue {}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';

.home-rote {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;

  .home-rote-title {
    font-size: 24px;
    padding: 24px 0;
  }

  .home-core-container {
    height: 360px;
    background: url('~@/assets/images/hexingongneng.png') no-repeat center;
    background-size: contain;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .home-core-bigRote {
      height: 340px;
      width: 340px;
      border-radius: 50%;
      border: 5px dotted #e2e2e2;
      position: absolute;
      -webkit-animation: bigRote 20s linear infinite;
      animation: bigRote 20s linear infinite;
    }

    @-webkit-keyframes bigRote {
      0% {
        -webkit-transform: rotate(0deg);
      }
      50% {
        -webkit-transform: rotate(180deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    @keyframes bigRote {
      0% {
        -webkit-transform: rotate(0deg);
      }
      50% {
        -webkit-transform: rotate(180deg);
      }
      100% {
        -webkit-transform: rotate(360deg);
      }
    }

    .home-core-smallRote {
      position: absolute;
      height: 270px;
      width: 270px;
      border-radius: 50%;
      border: 4px dotted #848fb8;
      -webkit-animation: smallRote 20s linear infinite;
      animation: smallRote 20s linear infinite;
    }

    @-webkit-keyframes smallRote {
      from {
        -webkit-transform: rotate(360deg);
      }
      to {
        -webkit-transform: rotate(0deg);
      }
    }

    @keyframes smallRote {
      from {
        transform: rotate(360deg);
      }
      to {
        transform: rotate(0deg);
      }
    }
  }

  .home-core-content {
    position: absolute;
    padding: 12px 0;
    background: #fff;
    box-shadow: 0px 3px 25px 0px rgba(250, 211, 206, 0.27);
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
      width: 240px;
      height: 200px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      border-right: 1px solid #eeeeee;
      position: relative;
      cursor: pointer;

      img {
        height: 70px;
        width: 66px;
      }

      p {
        color: #555555;
        line-height: 48px;
        font-size: 14px;
        font-weight: 500;
      }

      .home-core-content-list {
        position: absolute;
        top: -30px;
        left: 0;
        right: 0;
        bottom: -30px;
        z-index: 1;
        opacity: 0;
        background: #fff;
        box-shadow: 0 0 5px rgba(145, 141, 141, 0.6);
        display: flex;
        align-items: center;
        padding: 12px;

        p {
          color: #fff;
          line-height: 20px;
          text-indent: 20px;
        }
      }

      &:last-child {
        border-right: none;
      }

      &:hover {
        .home-core-content-list {
          opacity: 1;
          transition: 0.5s;
        }

        &:nth-child(1) {
          .home-core-content-list {
            background: linear-gradient(
              135deg,
              rgba(255, 154, 58, 1),
              rgba(255, 204, 45, 1)
            );
          }
        }

        &:nth-child(2) {
          .home-core-content-list {
            background: linear-gradient(
              135deg,
              rgba(20, 205, 189, 1),
              rgba(0, 191, 118, 1)
            );
          }
        }

        &:nth-child(3) {
          .home-core-content-list {
            background: linear-gradient(
              -55deg,
              rgba(122, 65, 216, 1),
              rgba(97, 81, 251, 1)
            );
          }
        }

        &:nth-child(4) {
          .home-core-content-list {
            background: linear-gradient(
              135deg,
              rgba(255, 23, 95, 1),
              rgba(245, 89, 59, 1)
            );
          }
        }
      }
    }
  }
}
</style>
