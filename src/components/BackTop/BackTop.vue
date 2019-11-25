<template>
  <div id="components-back-top-demo-custom">
    <a-back-top :visibilityHeight="visibilityHeight">
      <div class="ant-back-top-service">
        <a-tooltip placement="left">
          <template slot="title">
            <span>点我咨询</span>
          </template>
          <a target="_blank" href="http://wpa.qq.com/msgrd?v=3&uin=3189427318&site=qq&menu=yes">
            <img border="0" src="http://wpa.qq.com/pa?p=2:3189427318:52" alt="点击这里给我发消息" title />
          </a>
        </a-tooltip>
      </div>
      <div class="ant-back-top-inner">
        <a-icon type="arrow-up" style="color: #b8b3b3;" />
      </div>
    </a-back-top>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Name extends Vue {
  private buttonWidth: number = 40
  private visibilityHeight: number = -100
}
</script>

<style lang="less" scoped>
#components-back-top-demo-custom {
  .ant-back-top {
    bottom: 360px;
    right: 40px;
  }

  .ant-back-top-service {
    width: 50px;
    height: 50px;
    background-color: #fff;
    text-align: center;
    padding: 12px 0;
    border-radius: 4px 4px 0 0;
    border: 1px solid #f1f1f1;
    border-bottom: none;
  }

  .ant-back-top-inner {
    height: 50px;
    width: 50px;
    line-height: 50px;
    border-radius: 0 0 4px 4px;
    background-color: #fff;
    border: 1px solid #f1f1f1;
    text-align: center;
    font-size: 20px;
  }
}
</style>
