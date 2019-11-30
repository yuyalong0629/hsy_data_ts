<template>
  <ul class="userInfo">
    <li>总数</li>
    <li>
      <h5>8888万</h5>
      <p>作品数</p>
    </li>
    <li>
      <h5>8888万</h5>
      <p>点赞数</p>
    </li>
    <li>
      <h5>{{ kolTotalData.collectNum }}</h5>
      <p>收藏数</p>
    </li>
    <li>
      <h5>8888万</h5>
      <p>分享数</p>
    </li>
    <li>平均</li>
    <li>
      <h5>8888万</h5>
      <p>播放数</p>
    </li>
    <li>
      <h5>8888万</h5>
      <p>点赞数</p>
    </li>
    <li>
      <h5>{{ kolTotalData.avgCollectNum }}</h5>
      <p>收藏数</p>
    </li>
    <li>
      <h5>{{ kolTotalData.avgCommentNum }}</h5>
      <p>评论数</p>
    </li>
    <li>
      <h5>{{ kolTotalData.avgBarrageNum }}</h5>
      <p>弹幕数</p>
    </li>
    <li>
      <h5>{{ kolTotalData.avgCastCurrencyNum }}</h5>
      <a-popover
        placement="bottomLeft"
        :style="{ color: '#C6C6C6', lineHeight: '28px' }"
        :title="false"
      >
        <template slot="content">
          <p style="width: 200px;">硬币数是粉丝对优秀的视频作品进行投币支持和认可的一种硬币化表示数；是对UP主的一种肯定，硬币还可用于修改昵称、购买标识、参与活动等</p>
        </template>
        <span>投币数</span>
        <a-icon type="question-circle" />
      </a-popover>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Number extends Vue {
  @Prop({ default: {} }) private kolTotalData!: object
}
</script>

<style lang="less" scoped>
.userInfo {
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
  display: flex;
  justify-content: space-around;
  padding: 24px 0;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;

    h5 {
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      color: #303133;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      color: #c6c6c6;
      line-height: 28px;
    }

    &:nth-child(1) {
      font-size: 14px;
      color: #303133;
      font-weight: 400;
    }

    &:nth-child(5) {
      border-right: 1px solid #ececec;
    }

    &:nth-child(6) {
      font-size: 14px;
      color: #303133;
      font-weight: 400;
    }
  }
}
</style>
