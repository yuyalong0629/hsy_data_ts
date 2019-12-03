<template>
  <a-tabs :forceRender="true" defaultActiveKey="1" :tabBarStyle="{'text-align': 'center'}">
    <a-tab-pane key="1">
      <span slot="tab">
        <icon-font type="icon-wangjimima1" style="font-size: 16px;" />修改密码
      </span>

      <a-form class="user-layout-login" :form="form" @submit="handleSubmit">
        <a-form-item>
          <a-input
            size="large"
            v-decorator="['oldPassword', {rules: [{ required: true, message: '密码不能为空' }], validateTrigger: 'blur' }]"
            type="password"
            placeholder="请输入旧密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0, 0, 0, 0.25)" />
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input
            size="large"
            v-decorator="['newPassword', {rules: [{ required: true, message: '密码不能为空' }], validateTrigger: 'blur' }]"
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
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import { updatepwd } from '@/api/user'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont') // 在 iconfont.cn 上生成
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Retrieve extends Vue {
  private form!: any
  private loading: boolean = false

  private beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  // 验证密码
  validatePassword(rule: any, values: any, callback: Function) {
    const password = this.form.getFieldValue('newPassword')
    if (values && password && values.trim() !== password.trim()) {
      callback(new Error('两次密码不一致'))
    }
    callback()
  }

  // 用户注册信息提交
  private handleSubmit(e: any): void {
    e.preventDefault()
    this.loading = true

    this.form.validateFields((err: any, values: any) => {
      if (!err) {
        updatepwd({ ...values })
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
          })
        return
      }
      this.loading = false
    })
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
