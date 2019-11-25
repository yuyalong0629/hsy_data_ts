<template>
  <router-link to="/index">
    <img class="logo" :src="logo" alt="logo" />
  </router-link>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Logo extends Vue {
  private logo: string = require('../../assets/images/logo.png')
}
</script>

<style lang="less" scoped>
.logo {
  height: 80px;
  width: 144px;
}
</style>
