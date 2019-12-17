<template>
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '400px' }"
  >
    <template slot="content">
      <a-spin :spinning="loadding">
        <a-tabs :tabBarStyle="{'text-align': 'center'}">
          <a-tab-pane tab="全部通知" key="1">暂无通知</a-tab-pane>
          <a-tab-pane tab="未读通知" key="2">暂无消息</a-tab-pane>
          <a-tab-pane tab="已读通知" key="3">暂无待办</a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <span @click="fetchNotice" class="header-notice">
      <a-badge dot>
        <a-icon style="font-size: 16px;" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Notice extends Vue {
  private loadding: boolean = false
  private visible: boolean = false

  public fetchNotice(): void {
    if (!this.visible) {
      this.loadding = true

      const timer = setTimeout(() => {
        this.loadding = false
        window.clearTimeout(timer)
      }, 1000)
    } else {
      this.loadding = false
    }

    this.visible = !this.visible
  }
}
</script>

<style lang="less" scoped>
.header-notice {
  display: inline-block;
  transition: all 0.3s;
  height: 80px;
  display: flex;
  align-items: center;
  span {
    vertical-align: initial;
  }
}
</style>
