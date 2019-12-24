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
              v-if="!GET_STORAGE"
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
import { Mutation, Getter, namespace } from 'vuex-class'

const user = namespace('user')

@Component
export default class More extends Vue {
  @user.Mutation REGISTER_MODAL!: (modal: boolean) => void
  @user.Getter GET_STORAGE!: () => any

  private isActiveMore: number = 0
  private moreList: object[] = [
    { index: 0, text: `相似账号` },
    { index: 1, text: `号内搜索` },
    { index: 2, text: `商品广告分析` },
    { index: 3, text: `作品 / 粉丝` },
    { index: 4, text: `收藏账号` }
  ]
  private moreTextList: object[] = [
    {
      index: 0,
      title: '相似账号',
      text:
        '1个UP主，可以帮你找到1000个相似UP主；应用大数据技术你只需花千分之一时间，就可以做别人到千倍效果。'
    },
    {
      index: 1,
      title: '号内搜索',
      text:
        '通过标题、简介、标签、评论四大维度对媒体主历史作品全面的解析搜索，让硬广暴露无遗，让软广无处可藏。 '
    },
    {
      index: 2,
      title: '商品广告分析',
      text:
        '采用云计算透视UP主商品广告关联数据，展示商品分类、应用分类、游戏分类，作品标题/简介/标签/评论商品高频词云图。'
    },
    {
      index: 3,
      title: '作品/粉丝画像',
      text:
        '视频 / 相簿作品内容高频关键词云图，准确判断UP主调性；粉丝年龄/性别/地域/星座/等级分布，精准匹配你的商品消费人群。'
    },
    {
      index: 4,
      title: '收藏账号',
      text:
        '快速收藏有价值的账号，你可以自定义分组，分类管理意向账号，方便二次查看对比。'
    }
  ]

  // 鼠标 enter
  private handleMore(index: number): void {
    this.isActiveMore = index
  }

  // 免费注册体验
  private handelExperience(): void {
    this.REGISTER_MODAL(true)
  }
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
