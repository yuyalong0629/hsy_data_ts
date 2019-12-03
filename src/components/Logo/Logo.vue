<template>
  <router-link to="/index">
    <img class="logo" :src="logo" @click.stop="handleHot(0)" alt="logo" />
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {
  private logo: string = require('../../assets/images/logo.png')

  // 重定向
  private handleHot(key: number): void {}
}
</script>

<style lang="less" scoped>
.logo {
  height: 80px;
  width: 144px;
}
</style>
