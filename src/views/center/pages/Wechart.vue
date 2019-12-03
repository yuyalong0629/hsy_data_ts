<template>
  <a-tabs :forceRender="true" defaultActiveKey="1" :tabBarStyle="{'text-align': 'center'}">
    <a-tab-pane key="1">
      <span slot="tab">
        <icon-font type="icon-weixin" />
        {{ thirdAccountInfo.nickname ? '更换微信' : '绑定微信'}}
      </span>
      <div id="login_container"></div>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { wxLogin } from '@/utils/util'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Wecahrt extends Vue {
  @Prop({ default: '' }) private thirdAccountInfo!: any
  @Prop({ default: '' }) private userId!: string

  private mounted() {
    wxLogin(this.userId)
  }
}
</script>

<style lang="less" scoped>
.ant-tabs .ant-tabs-top-content.ant-tabs-content-animated,
.ant-tabs .ant-tabs-bottom-content.ant-tabs-content-animated {
  padding-top: 40px;
}

.ant-divider,
.ant-divider-vertical {
  position: static;
}

#login_container {
  text-align: center;
  padding-top: 12px;
  height: 332px;

  iframe {
    height: 300px;
    .wrp_code .impowerBox .qrcode {
      margin-top: 10px;
    }
  }
}
</style>
