<template>
  <div class="video-content">
    <div class="video-content-wrapper" v-for="item of dataList" :key="item.id">
      <div class="video-content-img">
        <a target="_blank" :href="item.sourceUrl">
          <img v-lazy="item.coverImg" alt />
        </a>
        <a href="javascript:;" style="color: #888;" @click="copylink(item.sourceUrl)">
          <a-icon type="link" />复制作品链接
        </a>
      </div>
      <div class="video-content-info">
        <h3 class="video-content-info-title">
          <a :href="item.sourceUrl" target="_blank">{{ item.title }}</a>
        </h3>
        <p class="video-content-info-text">{{ item.summary }}</p>
        <a-tag
          color="pink"
          :style="{ marginBottom: '6px' }"
          v-for="(item, index) in JSON.parse(item.tags)"
          :key="index"
        >{{ item }}</a-tag>
        <div class="video-content-info-label">
          <p class="video-content-info-label-time">发布时间：{{ item.publishTime | formatDate }}</p>
          <ul class="video-content-info-label-num">
            <li :style="{ paddingLeft: '8px' }">
              <icon-font type="icon-danmu" />
              <span :style="{ paddingLeft: '4px' }">{{ item.barrageNum }}</span>
            </li>
            <li :style="{ paddingLeft: '8px' }">
              <a-icon type="youtube" theme="filled" />
              <span :style="{ paddingLeft: '4px' }">{{ item.playNum }}</span>
            </li>
            <li :style="{ paddingLeft: '8px' }">
              <a-icon type="like" theme="filled" />
              <span :style="{ paddingLeft: '4px' }">{{ item.praiseNum }}</span>
            </li>
            <li :style="{ paddingLeft: '8px' }">
              <a-icon type="star" theme="filled" />
              <span :style="{ paddingLeft: '4px' }">{{ item.collectNum }}</span>
            </li>
            <li :style="{ paddingLeft: '8px' }">
              <a-icon type="message" theme="filled" />
              <span :style="{ paddingLeft: '4px' }">{{ item.commentNum }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { heightLight } from '@/utils/util'
import { Icon } from 'ant-design-vue'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class ListItem extends Vue {
  @Prop({ default: () => [] }) private dataList!: any[]

  private data() {
    return {
      heightLight
    }
  }

  // copy
  private copylink(link: string) {
    this.$copyText(link).then(
      e => {
        this.$message.success('复制成功')
      },
      e => {
        this.$message.error('复制失败')
      }
    )
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.video-content {
  display: flex;
  flex-direction: column;

  .video-content-wrapper {
    display: flex;
    border-bottom: 1px solid #d9d9d9;
    min-height: 158px;
    align-items: center;
  }

  .video-content-img {
    flex: 0 0 180px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 12px;

    img {
      width: 100%;
      height: 118px;
    }

    a:nth-child(2) {
      margin: 12px 0;
    }
  }

  .video-content-info {
    flex: 1;
    padding: 12px 0;

    .video-content-info-title {
      width: 100%;
      a {
        display: inline-block;
        max-width: 680px;
        font-size: 16px;
        font-weight: bold;
        color: #00a1d6;
        line-height: 24px;
        .ellipsisOne();
      }
    }

    .video-content-info-text {
      font-weight: 400;
      line-height: 24px;
      color: #a1a1a2;
      margin: 12px 0;
      height: 48px;
      .ellipsisMore();
    }

    .video-content-info-label {
      display: flex;
      justify-content: space-between;
      margin-top: 12px;

      .video-content-info-label-num {
        display: flex;
        align-items: center;

        li {
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
</style>
