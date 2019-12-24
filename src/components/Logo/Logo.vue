<template>
  <router-link to="/index">
    <img class="logo" :src="logo" alt="logo" />
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {
  private logo: string = require('@/assets/images/huoshaoyun.png')
}
</script>

<style lang="less" scoped>
.logo {
  height: 80px;
  width: 160px;
}
</style>
