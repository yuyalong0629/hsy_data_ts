<template>
  <div v-html="apply" @click="apply">{{apply}}</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { userInfo } from '@/api/user'

@Component
export default class Apply extends Vue {
  private apply?: string = ''

  private mounted() {
    let form: any = this.$route.query.htmls
    this.apply = form
    this.$nextTick(() => {
      ;(document.getElementsByName('punchout_form')[0] as any).submit()
    })
  }
}
</script>

<style lang="less" scoped>
</style>
