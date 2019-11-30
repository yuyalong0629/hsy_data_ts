<template>
  <a-alert message="权限不足" type="warning" showIcon>
    <p slot="description">
      {{ alert }}，我要立即
      <a href="javascript:;">升级会员版本</a> 查看更多信息
    </p>
  </a-alert>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Permissions extends Vue {
  @Prop({ default: '' }) private alert!: string
}
</script>

<style lang="less" scoped>
</style>
