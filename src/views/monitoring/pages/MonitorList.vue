<template>
  <div class="monitor-list">
    <div class="monitor-list-title">
      <p>监控历史</p>
      <a-popover placement="top">
        <template slot="content">
          <img width="120" height="120" v-lazy="require('@/assets/images/wechart.png')" alt />
        </template>
        <p :style="{ cursor: 'pointer' }">关注公众号获得监控通知</p>
      </a-popover>
    </div>
    <a-divider />
    <div class="monitor-list-content">
      <a-list
        v-if="Object.keys(monitorInfo).length && monitorInfo.result.length"
        itemLayout="vertical"
        size="large"
        :pagination="false"
        :dataSource="monitorInfo.result"
      >
        <a-list-item slot="renderItem" slot-scope="item" key="item.title">
          <template slot="actions">
            <div class="monitor-list-item">
              <p>{{ item.monitorStartTime }}</p>
              <h4
                @click="clickAnalysis(item.monitorStatus, item.monitorType, item.id, item.kolId)"
              >{{ item.monitorType === 1 ? (item.title || item.monitorContent) : item.kolInfoMap.kolName }}</h4>
              <p>
                <a-tag v-for="(item, index) of item.tags" :key="index">{{ item }}</a-tag>
              </p>
            </div>
          </template>
          <a-tooltip slot="extra" placement="bottom">
            <template v-if="item.monitorStatus === 2" slot="title">
              <span>{{ item.remark }}</span>
            </template>
            <a-button
              @click="item.monitorStatus === 3 && clickAnalysis(item.monitorStatus, item.monitorType, item.id, item.kolId)"
            >{{ item.monitorStatus === 1 ? '监控中' : (item.monitorStatus === 2 ? '监控失败' : (item.monitorStatus === 0 ? '等待监控' : '监控完成')) }}</a-button>
          </a-tooltip>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class MonitorList extends Vue {
  @Prop({ default: {} }) private monitorInfo!: object

  private clickAnalysis(
    status: number,
    type: number,
    id: string,
    kolId: string
  ) {
    if (type === 1 && (status === 1 || status === 3)) {
      const { href } = this.$router.resolve({
        path: '/analysis',
        query: {
          videoId: id,
          kolId: kolId
        }
      })
      window.open(href, '_blank')
    }
  }
}
</script>

<style lang="less" scope>
.monitor-list {
  .ant-divider,
  .ant-divider-vertical {
    position: relative;
  }

  .monitor-list-title {
    display: flex;
    justify-content: space-between;

    p:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
    }

    p:nth-child(2) {
      font-size: 14px;
      color: #999;
    }
  }

  .monitor-list-content {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    min-height: 300px;
    margin-bottom: 24px;

    .monitor-list-item {
      p {
        text-align: left;
      }

      h4 {
        text-align: left;
        line-height: 48px;
      }
    }
  }
}
</style>
