<template>
  <div class="classroom">
    <h2 class="banner-h2-title">火烧云课堂</h2>
    <div class="classroom-content">
      <a-card
        hoverable
        style="width: 240px"
        v-for="(item, index) in  newsContentInfoList"
        :key="index"
        @click="handleDetail(item.id, item.type)"
      >
        <template slot="cover">
          <div class="ant-card-actions">
            <img class="classroom-content-img" alt="example" v-lazy="item.coverImage" />
            <div class="classroom-content-hot">最热</div>
          </div>
        </template>
        <a-card-meta :title="item.title">
          <template slot="description">{{ item.summary }}</template>
        </a-card-meta>
      </a-card>
    </div>
    <div class="now">
      <a-button size="large" type="primary" style="background: #ff5847;">
        <router-link :to="{path: '/mine', query: {index: 0}}">查看更多内容</router-link>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Classroom extends Vue {
  @Prop({ default: [] })
  private newsContentInfoList!: object[]

  // 查看详情
  private handleDetail(index: number, type: string): void {
    ;(this.$router as any).push({
      path: '/mine/detail',
      query: { id: index, type: type }
    })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.classroom {
  .basicWidth();
  padding: 0 0 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  .now {
    padding: 48px 0 0;
    text-align: center;
  }
  .banner-h2-title {
    font-size: 24px;
    line-height: 100px;
    text-align: center;
  }
  .classroom-content {
    display: flex;
    justify-content: space-around;
    .ant-card-actions {
      position: relative;
      .classroom-content-img {
        height: 160px;
        width: 100%;
      }
      .classroom-content-hot {
        right: 8px;
        bottom: 8px;
        position: absolute;
        background: #d21306;
        width: 60px;
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color: #fff;
        text-align: center;
      }
    }
  }

  /deep/ .ant-card-meta-detail {
    .ant-card-meta-title {
      .ellipsisMore();
    }
    .ant-card-meta-description {
      .ellipsisMore();
    }
  }
}
</style>
