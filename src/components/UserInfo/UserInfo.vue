<template>
  <div class="userInfo">
    <h3 class="userInfo-cloud">{{ kolInfo.indexNum }}</h3>

    <a-popover placement="bottomLeft" :title="false">
      <template slot="content">
        <p style="width: 200px;">云指数是系统基于账号粉丝活跃度、作品原创度、作品内容质量、作品完播度以及平均评论和点赞量等数据分析得出的综合评分</p>
      </template>
      <span :style="{ color: '#fff' }">云指数</span>
      <a-icon type="question-circle" :style="{ color: '#fff' }" />
    </a-popover>

    <a-avatar :size="80" :style="{ margin: '12px 0' }" :src="kolInfo.kolImg" icon="user" />

    <p class="userinfo-name">{{ kolInfo.kolName }}</p>

    <p class="userinfo-text">{{ `认证信息：${kolInfo.isApprove}, ${kolInfo.approveDescription}` }}</p>

    <p class="userinfo-text">{{ `账户简介：${kolInfo.kolSummary}` }}</p>

    <p class="userinfo-text">公众号：小宅酱的后花园</p>

    <ul class="userInfo-level">
      <li>{{ `LV${kolInfo.platformGrade}` }}</li>
      <li>{{ kolInfo.isVip }}</li>
      <li v-if="kolInfo.isFansBadge">粉</li>
    </ul>

    <ul class="userInfo-number">
      <li>
        <h4>88.8万</h4>
        <p>粉丝数</p>
      </li>
      <li>
        <h4>88.8万</h4>
        <p>播放数</p>
      </li>
      <li>
        <h4>88.8万</h4>
        <a-popover
          placement="bottomLeft"
          :style="{ color: '#c6c6c6', fontSize: '12px',  fontWeight: '400', lineHeight: '23px' }"
          :title="false"
        >
          <template slot="content">
            <p style="width: 200px;">充电数充电数充电数充电数充电数充电数</p>
          </template>
          <span>充电数</span>
          <a-icon type="question-circle" />
        </a-popover>
      </li>
    </ul>

    <ul class="userInfo-class">
      <li v-for="item of kolInfo.sortFlag" :key="item.id">{{ item.name }}</li>
    </ul>

    <ul class="userInfo-operation">
      <li>
        <a-tooltip
          placement="bottom"
          :style="{ color: '#DA5054', fontSize: '36px',  fontWeight: '400', lineHeight: '23px' }"
        >
          <template slot="title">
            <span>查看相似号</span>
          </template>
          <a-icon type="team" />
        </a-tooltip>
      </li>
      <li>
        <a-tooltip
          placement="bottom"
          :style="{ color: '#c6c6c6', fontSize: '34px',  fontWeight: '400', lineHeight: '23px' }"
        >
          <template slot="title">
            <span>收藏账号</span>
          </template>
          <a-icon type="star" />
        </a-tooltip>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class UserInfo extends Vue {
  @Prop({ default: {} }) private kolInfo!: object
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 12px;
  background: #008fd9;
  width: 100%;

  .userInfo-cloud {
    color: #ffffff;
    font-size: 26px;
    font-weight: bold;
    line-height: 30px;
  }

  .userinfo-name {
    color: #3c3c3c;
    font-size: 16px;
    font-weight: 400;
    line-height: 50px;
  }

  .userinfo-text {
    font-size: 12px;
    font-weight: 400;
    color: #c6c6c6;
    line-height: 20px;
  }

  .userInfo-level {
    display: flex;
    justify-content: space-around;

    li:nth-child(1) {
      height: 16px;
      border-radius: 4px;
      background: #eb000e;
      color: #ffffff;
      font-size: 12px;
      padding: 0 4px;
      line-height: 14px;
      margin: 12px 6px;
    }

    li:nth-child(2) {
      height: 16px;
      border-radius: 4px;
      background: #e24f86;
      color: #ffffff;
      font-size: 12px;
      padding: 0 4px;
      line-height: 14px;
      margin: 12px 6px;
    }

    li:nth-child(3) {
      height: 16px;
      border-radius: 4px;
      background: #fff;
      color: #ef73a9;
      font-size: 12px;
      padding: 0 4px;
      line-height: 14px;
      margin: 12px 6px;
      border: 1px solid #ef73a9;
    }
  }

  .userInfo-number {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f4f4f4;

    li:nth-child(1) {
      font-size: 12px;
      padding: 0 4px;
      margin: 12px 0;
      border-right: 1px solid #f4f4f4;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        color: #303133;
        font-size: 18px;
        font-weight: bold;
        line-height: 33px;
      }

      p {
        color: #c6c6c6;
        font-size: 12px;
        font-weight: 400;
        line-height: 23px;
      }
    }

    li:nth-child(2) {
      font-size: 12px;
      padding: 0 4px;
      margin: 12px 0;
      border-right: 1px solid #f4f4f4;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        color: #303133;
        font-size: 18px;
        font-weight: bold;
        line-height: 33px;
      }

      p {
        color: #c6c6c6;
        font-size: 12px;
        font-weight: 400;
        line-height: 23px;
      }
    }

    li:nth-child(3) {
      flex: 1;
      font-size: 12px;
      padding: 0 4px;
      margin: 12px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        color: #303133;
        font-size: 18px;
        font-weight: bold;
        line-height: 33px;
      }
    }
  }

  .userInfo-class {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    width: 100%;

    li {
      min-width: 30%;
      text-align: center;
      margin: 6px 0;
      font-size: 12px;
    }
  }

  .userInfo-operation {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 12px 0;

    li {
      display: flex;
      align-items: center;
    }
  }
}
</style>
