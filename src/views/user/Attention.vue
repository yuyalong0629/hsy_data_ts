<template>
  <a-tabs :forceRender="true" defaultActivekey="1" :tabBarStyle="{'text-align': 'center'}">
    <a-tab-pane key="1">
      <span slot="tab">
        <icon-font type="icon-weixin" />关注公众号获得更多资讯和报告
      </span>
      <div class="attention-img">
        <img :src="getImgUrl" alt />
      </div>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Name extends Vue {
  get getImgUrl(): string {
    return this.$ls.get('imgUrl')
  }
}
</script>

<style lang="less" scoped>
.attention-img {
  img {
    width: 100%;
  }
}
</style>
