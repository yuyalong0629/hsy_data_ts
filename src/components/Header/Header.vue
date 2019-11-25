<template>
  <div class="header">
    <header class="header-wrapper">
      <Logo />
      <hsy-menu />
    </header>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Logo from '@/components/Logo/Logo.vue'
import Menu from './Menu.vue'

@Component({
  components: {
    Logo,
    'hsy-menu': Menu
  }
})
export default class Header extends Vue {}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable';

.header {
  flex: 0 0 80px;
  background: #091514;
  .header-wrapper {
    .basicWidth();
    height: 80px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
