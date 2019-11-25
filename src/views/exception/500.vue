<template>
  <exception-page type="500" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ExceptionPage from './ExceptionPage.vue'

@Component({
  components: {
    'exception-page': ExceptionPage
  }
})
export default class Exception500 extends Vue {}
</script>

<style lang="less" scoped>
</style>
