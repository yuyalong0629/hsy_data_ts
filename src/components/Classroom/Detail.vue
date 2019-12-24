<template>
  <div class="detail">
    <h3 class="detail-title">{{ detailInfo.title }}</h3>
    <p class="detail-publishTime">
      <span>发布时间：{{ detailInfo.publishTime }}</span>
      <icon-font
        class="mine-breadcrumb-icon"
        style="margin: 0 4px 0 24px; font-size: 16px;"
        type="icon-changyongtubiao-mianxing-"
      />
      <span>{{ detailInfo.readNum }}</span>
    </p>
    <div class="detail-content" v-html="detailInfo.content"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { newsContentInfoDetail } from '@/api/index'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont') // 在 iconfont.cn 上生成
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Name extends Vue {
  private detailInfo: object = {}

  private mounted() {
    newsContentInfoDetail({ newsId: this.$route.query.id }).then(
      (res: any): void => {
        if (res.code === 200) {
          this.detailInfo = res.newsContentInfo
        }
      }
    )
  }
}
</script>

<style lang="less" scoped>
.detail {
  border: 1px solid #ececec;
  height: 100%;
  padding: 12px;

  .detail-title {
    font-size: 16px;
    font-weight: bold;
    color: #2c203b;
    line-height: 23px;
    display: flex;
    align-items: center;

    span {
      display: inline-block;
      padding: 0px 4px;
      background: #d84a3d;
      color: #fff;
      font-size: 12px;
      font-weight: 0;
      height: 16px;
      line-height: 16px;
      border-radius: 3px;
      margin-right: 6px;
    }
  }

  .detail-publishTime {
    display: flex;
    align-items: center;
    padding: 12px 0;
    font-size: 12px;
    color: #9199a3;
  }

  .detail-content {
    display: flex;
    flex-direction: column;
    /deep/ p {
      font-family: 'Chinese Quote', -apple-system, BlinkMacSystemFont,
        'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei',
        'Helvetica Neue', Helvetica, Arial, sans-serif, 'Apple Color Emoji',
        'Segoe UI Emoji', 'Segoe UI Symbol';
      line-height: 22px;

      span {
        font-size: 14px;
        color: #474646;
      }
    }

    /deep/ img {
      width: 100%;
    }
  }
}
</style>
