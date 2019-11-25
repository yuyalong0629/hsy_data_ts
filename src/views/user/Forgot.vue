<template>
  <a-tabs :forceRender="true" defaultActiveKey="1" :tabBarStyle="{'text-align': 'center'}">
    <a-tab-pane key="1">
      <span slot="tab">
        <icon-font type="icon-wangjimima1" style="font-size: 16px;" />忘记密码
      </span>
      <!-- 用户信息 -->
      <a-form class="user-layout-login" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['phone', {rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
            placeholder="请输入要绑定的手机号码"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>

        <a-row :gutter="8">
          <a-col class="gutter-row" :span="16">
            <a-form-item>
              <a-input
                size="large"
                v-decorator="['checkCode', {rules: [{ required: true, message: '图形验证码不能为空'}], validateTrigger: 'blur' }]"
                placeholder="请输入图形验证码"
              >
                <icon-font
                  slot="prefix"
                  type="icon-tupianyanzhengma"
                  style="color:rgba(0,0,0,.25)"
                />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <img
              height="40"
              width="112"
              :style="{ 'border-radius': '4px' }"
              @click="changeImgCode"
              :src="processImgSrc"
              alt
            />
          </a-col>
        </a-row>

        <a-row :gutter="8">
          <a-col class="gutter-row" :span="16">
            <a-form-item>
              <a-input
                size="large"
                type="text"
                placeholder="请输入短信验证码"
                v-decorator="['verifyCode', {rules: [{ required: true, message: '短信验证码不能为空' }], validateTrigger: 'blur'}]"
              >
                <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0, 0, 0, 0.25)' }" />
              </a-input>
            </a-form-item>
          </a-col>
          <a-col class="gutter-row" :span="8">
            <a-button
              :style="{ width: '100%' }"
              size="large"
              type="primary"
              :disabled="state.smsSendBtn"
              @click.stop.prevent="getCaptcha"
              v-text="!state.smsSendBtn && '获取验证码'||(state.time+' s')"
            ></a-button>
          </a-col>
        </a-row>

        <a-form-item>
          <a-input
            size="large"
            v-decorator="['password', {rules: [{ required: true, message: '密码不能为空' }], validateTrigger: 'blur' }]"
            type="password"
            placeholder="请设置新登录密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            placeholder="请确认新登录密码"
            type="password"
            size="large"
            v-decorator="['rePassword', {rules: [{ required: true, message: '密码不能为空' }, { validator: validatePassword }], validateTrigger: ['blur']}]"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <span class="login-form-forgot">
            <a href="javascript:;" @click="handleLogin">马上登录</a>
          </span>
          <a-button
            size="large"
            type="primary"
            class="login-form-button"
            :loading="loading"
            html-type="submit"
          >确认修改</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { verificationCode, verifyCode, forgetpwd } from '@/api/user'
import { Icon } from 'ant-design-vue'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont') // 在 iconfont.cn 上生成
})

interface State {
  time: number
  smsSendBtn: boolean
}

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Name extends Vue {
  private form!: any
  private processImgSrc: string = ''
  private loading: boolean = false
  private state: State = {
    time: 60,
    smsSendBtn: false
  }

  private beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  private mounted() {
    this.gteImgUrl()
  }

  // 图片验证码
  private gteImgUrl(): any {
    return verificationCode()
      .then(res => {
        // 二十二进制图片流转base64
        this.processImgSrc =
          'data:image/png;base64,' +
          btoa(
            new Uint8Array(res as any).reduce(
              (data: any, byte: any) => data + String.fromCharCode(byte),
              ''
            )
          )
      })
      .catch(() => {
        this.$message.error('请求超时')
      })
  }

  // 切换图片验证码
  private changeImgCode(): void {
    this.gteImgUrl()
  }

  // 短信验证码
  private getCaptcha(e: any): void {
    e.preventDefault()
    this.form.validateFields(
      ['phone', 'checkCode'],
      { force: true },
      (err: any, values: any) => {
        if (!err) {
          this.state.smsSendBtn = true

          const interval = window.setInterval(() => {
            if (this.state.time-- <= 0) {
              this.state.time = 60
              this.state.smsSendBtn = false
              window.clearInterval(interval)
            }
          }, 1000)

          verifyCode({ ...values, type: 2 })
            .then((res: any) => {
              if (res.code === 200) {
                this.$message.success(res.message)
                return false
              }
              this.$message.error(res.message)
            })
            .catch(() => {
              clearInterval(interval)
              this.state.time = 60
              this.state.smsSendBtn = false
            })
        }
      }
    )
  }

  // 验证密码
  validatePassword(rule: any, values: any, callback: Function) {
    const password = this.form.getFieldValue('password')
    if (values && password && values.trim() !== password.trim()) {
      callback(new Error('两次密码不一致'))
    }
    callback()
  }

  // 马上登录
  @Emit('changeComponent')
  private handleLogin(): string {
    return 'Login'
  }

  // 用户注册信息提交
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.loading = true

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        forgetpwd({ ...values })
          .then((res: any) => {
            if (res.code === 200) {
              this.$message.success(res.message)
              return
            }
            this.$message.error(res.message)
          })
          .catch(() => this.$message.error('请求超时'))
          .finally(() => {
            this.loading = false
            this.gteImgUrl()
          })
        return
      }
      this.loading = false
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

.login-form-forgot {
  float: right;
}

.login-form-button {
  width: 100%;
}
</style>
