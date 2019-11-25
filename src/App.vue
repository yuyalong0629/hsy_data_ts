<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'

@Component
export default class App extends Vue {
  private locale: any = zhCN
}
</script>

<style lang="less">
@import '~@/assets/styles/reset';

#app {
  width: 100%;
  height: 100%;
}
</style>
