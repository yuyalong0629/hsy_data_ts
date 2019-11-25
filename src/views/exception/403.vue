<template>
  <exception-page type="403" />
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ExceptionPage from './ExceptionPage.vue'

@Component({
  components: {
    'exception-page': ExceptionPage
  }
})
export default class Exception403 extends Vue {}
</script>

<style lang="less" scoped>
</style>
