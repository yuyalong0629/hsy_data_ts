<template>
  <div class="more">
    <h3 class="more-title">更多实用功能邀你体验</h3>
    <div class="more-content">
      <ul class="more-content-left">
        <li
          v-for="item of moreList"
          :key="item.index"
          :class="{ activeMore: isActiveMore === item.index }"
          @mouseenter="handleMore(item.index)"
        >
          <span>{{ `0${item.index + 1}` }}</span>
          <span>{{ `${item.text}` }}</span>
        </li>
      </ul>
      <ul class="more-content-right">
        <template v-for="item of moreTextList">
          <li v-if="isActiveMore === item.index" :key="item.index">
            <h3>{{ item.title }}</h3>
            <p>{{ item.text }}</p>
            <a-button
              type="primary"
              size="large"
              style="width: 140px; height: 42px; background: #ff5847;"
              @click="handelExperience"
            >免费注册体验</a-button>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class More extends Vue {
  private isActiveMore: number = 0
  private moreList: object[] = [
    { index: 0, text: `相似账号` },
    { index: 1, text: `号内搜索` },
    { index: 2, text: `商品广告搜索` },
    { index: 3, text: `收藏账号` },
    { index: 4, text: `云指数` }
  ]
  private moreTextList: object[] = [
    {
      index: 0,
      title: '相似号查找',
      text:
        '通过意向账号的为你快速推荐相似账号，提高账号查找效率，节约时间成本。'
    },
    {
      index: 1,
      title: '号内搜索',
      text:
        '通过标题、简介、标签、评论四大维度对媒体主历史作品全面的解析搜索，让软广硬广无处可藏。'
    },
    {
      index: 2,
      title: '商品广告搜索',
      text: '4大维度全网解析商品广告投放历史，细化到每个账号的广告数据。'
    },
    {
      index: 3,
      title: '收藏账号',
      text:
        '快速收藏有价值的账号，你可以自定义分组，分类管理意向账号，方便二次查看对比。'
    },
    {
      index: 4,
      title: '云指数',
      text:
        '云指数综合评出高质量高价值账号总榜、周/月涨粉掉粉榜数据即时更新，账号横向纵向排名对比：清晰、直观'
    }
  ]

  // 鼠标 enter
  private handleMore(index: number): void {
    this.isActiveMore = index
  }

  // 免费注册体验
  private handelExperience(): void {}
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.more {
  min-height: 600px;
  background: url('~@/assets/images/banner2.png') no-repeat center;
  background-size: cover;

  .more-title {
    font-size: 24px;
    text-align: center;
    padding: 48px 0;
    color: #fff;
  }
  .more-content {
    display: flex;
    .basicWidth();

    .more-content-left {
      margin: 0 120px 0 240px;
      display: flex;
      flex-direction: column;
      align-items: center;
      li {
        width: 230px;
        height: 70px;
        background: #ffffff;
        margin: 8px 0;
        text-align: center;
        font-size: 16px;
        line-height: 70px;
        font-weight: 500;
        border-radius: 2px;
        cursor: pointer;
        display: flex;
        justify-content: center;
        span:first-child {
          width: 80px;
        }
        span:last-child {
          width: 100px;
          text-align: left;
        }
      }
      .activeMore {
        background: #ff5847;
        box-shadow: 0px 0px 15px 0px rgba(235, 38, 18, 0.16);
        border-radius: 2px;
        color: #fff;
      }
    }
    .more-content-right {
      flex: 1;
      li {
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 0 48px;
        width: 450px;
        h3 {
          font-size: 24px;
          color: #fff;
        }
        p {
          font-size: 18px;
          color: #fff;
          font-weight: 500;
          line-height: 32px;
          margin: 24px 0;
        }
      }
    }
  }
}
</style>
