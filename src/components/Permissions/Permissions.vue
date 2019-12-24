<template>
  <a-alert message="权限不足" type="warning" showIcon>
    <p slot="description">
      {{ alert }}，我要立即
      <a v-if="isLogin" @click="handleLogin" :style="{ fontSize: '16px' }">立即登录</a>
      <router-link
        target="_blank"
        to="/members/pay"
        v-if="!isLogin"
        :style="{ fontSize: '16px' }"
      >升级会员版本</router-link>&nbsp;查看更多信息
    </p>
  </a-alert>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Mutation, namespace } from 'vuex-class'

const user = namespace('user')

@Component
export default class Permissions extends Vue {
  @user.Mutation LOGIN_MODAL!: (modal: boolean) => void

  @Prop({ default: '' }) private alert!: string
  @Prop({ default: false }) private isLogin!: boolean

  private handleLogin(): void {
    this.LOGIN_MODAL(true)
  }
}
</script>

<style lang="less" scoped>
.ant-alert-with-description /deep/ .ant-alert-message {
  text-align: center;
}
p {
  text-align: center;
}
.ant-alert-with-description /deep/ .ant-alert-icon {
  left: 50%;
  margin-left: -42px;
}
</style>
