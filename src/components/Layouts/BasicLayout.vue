<template>
  <div class="layout-view">
    <hsy-header />
    <div class="router-view">
      <router-view />
    </div>
    <hsy-backTop />
    <hsy-footer />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '../Header/Header.vue'
import BackTop from '@/components/BackTop/BackTop.vue'
import Footer from '../Footer/Footer.vue'

@Component({
  components: {
    'hsy-header': Header,
    'hsy-footer': Footer,
    'hsy-backTop': BackTop
  }
})
export default class BasicLayout extends Vue {}
</script>

<style lang="less" scoped>
.layout-view {
  display: flex;
  flex-direction: column;
  height: 100%;
  .router-view {
    flex: 1;
  }
}
</style>
