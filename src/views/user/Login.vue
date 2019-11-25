<template>
  <a-tabs defaultActiveKey="1" @change="changeTab" :tabBarStyle="{'text-align': 'center'}">
    <a-tab-pane key="1">
      <span slot="tab">
        <icon-font type="icon-weixin" />扫码登录
      </span>
      <!-- wechart -->
      <div id="login_container"></div>
    </a-tab-pane>

    <a-tab-pane key="2">
      <span slot="tab">
        <icon-font type="icon-dengluren" />账号登录
      </span>
      <!-- 账号密码登录 -->
      <a-form class="user-layout-login" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            type="text"
            placeholder="请输入绑定的手机号码"
            v-decorator="[
                'loginname',
                {rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}
              ]"
          >
            <a-icon slot="prefix" type="mobile" :style="{ color: 'rgba(0, 0, 0, 0.25)' }" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            size="large"
            type="password"
            autocomplete="false"
            placeholder="请输入登录密码"
            v-decorator="[
                'loginpwd',
                {rules: [{ required: true, message: '登录密码错误' }], validateTrigger: 'blur'}
              ]"
          >
            <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0, 0, 0, 0.25)' }" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a href="javascript:;" @click="handleForgot">忘记密码?</a>
          <span class="login-form-forgot">
            尚未注册?
            <a href="javascript:;" @click="handleRegister">立即注册</a>
          </span>
          <a-button
            size="large"
            type="primary"
            class="login-form-button"
            :loading="loginBtn"
            :disabled="loginBtn"
            html-type="submit"
          >立即登录</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'
import { Mutation, namespace } from 'vuex-class'
import { Icon } from 'ant-design-vue'
import { wxLogin } from '@/utils/util'
import { login } from '@/api/user'

interface Values {
  loginname: string
  loginpwd: string
}

const user = namespace('user')
const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Login extends Vue {
  @user.Mutation SET_LOGIN!: (params: any) => void

  private form!: any
  private loginBtn: boolean = false

  private beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  private mounted() {
    wxLogin()
  }

  // changTab
  private changeTab(key: string): void {}

  // 忘记密码
  @Emit('changeComponent')
  private handleForgot(): string {
    return 'Forgot'
  }

  // 跳转注册
  @Emit('changeComponent')
  private handleRegister(): string {
    return 'Register'
  }

  // submit
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.loginBtn = true

    this.form.validateFields({ force: true }, (err: any, values: Values) => {
      if (!err) {
        const loginParams = { ...values }

        login(loginParams)
          .then((res: any): void => {
            if (res.code === 200) {
              // commit info
              this.SET_LOGIN(res.userInfoMap)
              this.$router.replace({ path: '/rank' })
              this.$message.success(res.message)
              window.location.reload()
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(err => this.$message.error(err))
          .finally(() => (this.loginBtn = false))
      } else {
        setTimeout(() => {
          this.loginBtn = false
        }, 600)
      }
    })
  }
}
</script>

<style lang="less" scoped>
#login_container {
  text-align: center;
  padding-top: 12px;
  height: 332px;
}

.user-layout-login {
  padding-top: 24px;

  .login-form-forgot {
    float: right;
  }

  .login-form-button {
    width: 100%;
  }
}
</style>
