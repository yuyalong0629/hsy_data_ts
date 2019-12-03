<template>
  <a-tabs defaultActiveKey="1" :tabBarStyle="{'text-align': 'center'}">
    <a-tab-pane key="1">
      <span slot="tab">
        <icon-font type="icon-zhuce" />
        {{ isOld ? '验证原手机号码' : '绑定手机号码' }}
      </span>

      <a-form class="user-layout-login" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['phone', {rules: [{ required: true, pattern: /^1[3456789]\d{9}$/, message: '请输入正确的手机号' }], validateTrigger: 'change'}]"
            :placeholder="isOld ? '请输入原手机号码' : '请输入要绑定的手机号码'"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0, 0, 0, .25)" />
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
          <a-button
            size="large"
            type="primary"
            class="login-form-button"
            :loading="loading"
            html-type="submit"
          >确认</a-button>
        </a-form-item>
      </a-form>
    </a-tab-pane>
  </a-tabs>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import {
  verificationCode,
  verifyCode,
  updatePhone,
  verifyOldPhone
} from '@/api/user'

interface State {
  time: number
  smsSendBtn: boolean
}

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Phone extends Vue {
  @Prop({ default: false }) private isOldPassword!: boolean

  private form!: any
  private processImgSrc: string = ''
  private loading: boolean = false
  private interval?: any = null
  private isOld: boolean = true
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

          this.interval = window.setInterval(() => {
            if (this.state.time-- <= 0) {
              this.state.time = 60
              this.state.smsSendBtn = false
              window.clearInterval(this.interval)
            }
          }, 1000)

          // 6 验证原手机号 | 4 新手机号
          const type = this.isOld ? 6 : 4

          verifyCode({ ...values, type: type })
            .then((res: any) => {
              if (res.code === 200) {
                this.$message.success(res.message)
                return false
              }
              this.$message.error(res.message)
            })
            .catch(() => {
              window.clearInterval(this.interval)
              this.state.time = 60
              this.state.smsSendBtn = false
            })
        }
      }
    )
  }

  // 用户信息提交
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.loading = true

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        if (this.isOld) {
          verifyOldPhone({ ...values })
            .then((res: any) => {
              if (res.code === 200) {
                this.isOld = false

                this.$message.success(res.message)

                window.clearInterval(this.interval)
                this.state.time = 60
                this.state.smsSendBtn = false

                this.form.resetFields()
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
        updatePhone({ ...values })
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
      }
      this.loading = false
    })
  }

  @Watch('isOldPassword', { immediate: true })
  private function(val: boolean): void {
    this.isOld = val
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  padding: 24px 0 0;

  .login-form-button {
    width: 100%;
  }
}
</style>
