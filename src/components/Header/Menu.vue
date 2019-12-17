<template>
  <div class="menu">
    <ul class="menu-nav">
      <li class="nav-list" v-if="!GET_STORAGE">
        <router-link tag="span" to="/index">首页</router-link>
      </li>
      <li class="nav-renewal" v-if="GET_STORAGE">
        <router-link tag="span" to="/members/pay">
          <img v-lazy="require('@/assets/images/VIPup.png')" alt />
        </router-link>
      </li>
      <li class="nav-list" v-if="GET_STORAGE">
        <router-link tag="span" to="/hot">火热榜</router-link>
      </li>
      <li class="nav-list">
        <router-link tag="span" to="/rank">排行榜单</router-link>
      </li>
      <li class="nav-list">
        <router-link tag="span" to="/search">账号搜索</router-link>
      </li>
      <li class="nav-list">
        <router-link tag="span" to="/contentquery">内容查询</router-link>
      </li>
      <li class="nav-list">
        <router-link tag="span" to="/monitoring">数据监测</router-link>
      </li>
      <li class="nav-list nav-login" v-if="!GET_STORAGE">
        <div class="logon-btn" @click="loginBtn">登录</div>
        <div class="register-btn" @click="registerBtn">注册</div>
      </li>
      <li class="nav-notice" v-if="GET_STORAGE">
        <Notice />
      </li>
      <li class="nav-list nav-user" v-if="GET_STORAGE">
        <a-dropdown @visibleChange="visibleChange">
          <div class="nav-user-icon">
            <a-avatar :size="42" :src="GET_STORAGE.userImage" icon="user" />
            <div class="nav-user-icon-userinfo">
              <p class="nav-user-icon-name">{{ GET_STORAGE.username }}</p>
              <p
                class="nav-user-icon-vip"
              >{{ GET_STORAGE.userType === 0 ? '免费版会员' : GET_STORAGE.userType === 1 ? '高级版会员' : GET_STORAGE.userType === 2 ? '专业版会员' : '企业版会员' }}</p>
            </div>
            <a-icon :type="iconType" />
          </div>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper" style="marginTop: 24px;">
            <a-menu-item key="0">
              <router-link to="/center">
                <a-icon type="user" style="marginRight: 4px;" />
                <span>个人中心</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="1">
              <router-link to="/collection">
                <a-icon type="star" style="marginRight: 4px;" />
                <span>我的收藏</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <router-link to="/members">
                <a-icon type="crown" style="marginRight: 4px;" />
                <span>购买升级</span>
              </router-link>
            </a-menu-item>
            <!-- <a-menu-item key="4">
              <router-link to="/helper">
                <a-icon type="question-circle" style="marginRight: 4px;" />
                <span>帮助中心</span>
              </router-link>
            </a-menu-item>-->
            <a-menu-divider />
            <a-menu-item key="5">
              <a href="javascript:;" @click="handleLogout">
                <a-icon type="logout" style="marginRight: 4px;" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </li>
    </ul>

    <!-- 登录 | 注册 Model -->
    <a-modal
      :destroyOnClose="true"
      width="400px"
      :title="false"
      :visible="visible"
      @cancel="handleCancel"
      :footer="null"
    >
      <component :is="componentId" :taId="taId" @changeComponent="changeComponent"></component>
      <a-divider>欢迎使用火烧云数据</a-divider>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation, namespace } from 'vuex-class'
import { logout, weixinLogin, weixinBinding } from '@/api/user'
import Login from '@/views/user/Login.vue'
import Register from '@/views/user/Register.vue'
import Attention from '@/views/user/Attention.vue'
import Forgot from '@/views/user/Forgot.vue'
import Notice from './Notice.vue'

interface Params {
  id?: string | (string | null)[]
  code: string | (string | null)[]
}

const user = namespace('user')

@Component({
  components: {
    Login,
    Register,
    Notice,
    Forgot,
    Attention
  }
})
export default class Menu extends Vue {
  @user.Getter GET_STORAGE!: () => any
  @user.State loginModal!: boolean
  @user.State registerModal!: boolean
  @user.Mutation SET_LOGIN!: (info: any) => void
  @user.Mutation LOGIN_MODAL!: (modal: boolean) => void
  @user.Mutation REGISTER_MODAL!: (modal: boolean) => void

  private iconType: string = 'caret-down'
  private visible: boolean = false
  private componentId: string = 'Login'
  private taId?: string

  private data() {
    return {
      taId: ''
    }
  }

  private created() {
    // 判断url是否存在code，存在则微信登录
    if (this.$route.query.code) {
      const state = this.$route.query.state
      // 微信绑定
      if (state !== 'ef311ed88cf1e31323097f4369a74537') {
        this.wxBind({
          id: this.$route.query.state,
          code: this.$route.query.code
        }).then(() => {
          setTimeout(() => {
            // 关注公众号
            const attention = this.$ls.get('attention')
            if (attention !== null && attention === false) {
              this.visible = true
              this.componentId = 'Attention'
            }
          }, 1500)
        })
        return
      }
      // 判断是否微信登录
      this.wxlogin({ code: this.$route.query.code }).then(() => {
        const timer = setTimeout(() => {
          // 关注公众号
          const attention = this.$ls.get('attention')
          if (attention !== null && attention === false) {
            this.visible = true
            this.componentId = 'Attention'
          }
          clearTimeout(timer)
        }, 1500)
      })
    }
  }

  // 微信扫码登录
  private async wxlogin(params: Params) {
    return weixinLogin(params).then((res: any) => {
      if (res.code === 200) {
        // 弹出二维码 功能
        this.$ls.set('attention', res.isSubscribe)
        this.$ls.set('imgUrl', res.imgUrl)
        if (res.isBindingUser) {
          this.$message.success(res.message)
          this.SET_LOGIN(res.userInfoMap)
        } else {
          // 绑定账号
          this.taId = res.taId
          this.visible = true
          this.componentId = 'Register'
        }
        this.splitCodeUrl()
      } else {
        this.$message.error(res.message)
        this.splitCodeUrl()
      }
    })
  }

  // 微信绑定
  private wxBind(params: Params) {
    return weixinBinding(params).then((res: any) => {
      if (res.code === 200) {
        console.log(res)
        this.$message.success(res.message)
        this.SET_LOGIN(res.userInfoMap)
        this.splitCodeUrl()
        this.$router.push({
          path: '/members'
        })
      } else {
        this.$message.error(res.message)
        this.splitCodeUrl()
        this.$router.push({
          path: '/members'
        })
      }
    })
  }

  // 去除微信登录 query
  private splitCodeUrl() {
    const currentUrl = window.location.href
    const newUrl = currentUrl.split('?')[0]
    history.pushState('', '', newUrl)
  }

  // drop下拉菜单状态回调
  private visibleChange(visible: boolean): void {
    !visible ? (this.iconType = 'caret-down') : (this.iconType = 'caret-up')
  }

  // 登录 Model
  private loginBtn(): void {
    this.visible = true
    this.componentId = 'Login'
  }

  // 退出登录
  private handleLogout(): void {
    const that = this

    this.$confirm({
      title: '提示',
      content: '真的要退出登录吗 ?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        return new Promise((resolve, reject) => {
          logout().then((res: any) => {
            if (res.code === 200) {
              setTimeout(() => {
                that.$router.replace({ path: '/' })
                that.$message.success('退出成功', 1.5)
                // commit logout
                that.SET_LOGIN(null)
                resolve()
              }, 1000)
            }
          })
        }).catch(() => console.log('Oops errors!'))
      },
      onCancel() {}
    })
  }

  // 注册 Model
  private registerBtn(): void {
    this.visible = true
    this.componentId = 'Register'
  }

  // Model 取消回调
  private handleCancel(): void {
    this.visible = false
    this.LOGIN_MODAL(false)
    this.REGISTER_MODAL(false)
  }

  // emit
  private changeComponent(val: string) {
    console.log(val)
    this.componentId = val
  }

  @Watch('loginModal')
  private watchLogin(val: boolean): void {
    this.visible = val
    this.componentId = 'Login'
  }

  @Watch('registerModal')
  private watchRegister(val: boolean): void {
    this.visible = val
    this.componentId = 'Register'
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.ant-dropdown-menu-item > a,
.ant-dropdown-menu-submenu-title > a {
  text-align: center;
}

.menu {
  display: flex;
  height: 100%;

  .menu-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    margin-bottom: 0;

    .nav-list {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #f5f5f5;
      height: 100%;
      margin: 0 18px;
      border-bottom: 0px solid @active;
      position: relative;

      span {
        display: flex;
        align-items: center;
        padding: 0 18px;
        height: 100%;
        width: 100%;
      }

      .router-link-active {
        color: @active;
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: @active;
          transform: scale3d(1, 1, 1);
        }
      }

      & > span:hover {
        color: @active;
      }

      &::before {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: @active;
        transition: all 0.3s ease-in-out;
        transform: scale3d(0, 1, 1);
        transform-origin: 50% 0;
      }

      &:hover::before {
        transform: scale3d(1, 1, 1);
      }

      &:hover ~ &::before {
        left: 0;
      }
    }

    .nav-notice {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #f5f5f5;
      height: 100%;
    }

    .nav-renewal {
      cursor: pointer;
      display: flex;
      align-items: center;
      color: #f5f5f5;
      height: 100%;
      margin: 0 24px;

      img {
        height: 70px;
      }
    }

    .nav-login {
      padding: 0 6px;

      .logon-btn {
        color: #fff;
        line-height: 30px;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        background-image: none;
        white-space: nowrap;
        padding: 0 15px;
        font-size: 14px;
        height: 32px;
        margin: 0 5px;
        border: 1px solid #da5054;
        border-radius: 4px;
        background-color: #723334;
      }

      .register-btn {
        color: #fff;
        line-height: 30px;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        background-color: #da5054;
        white-space: nowrap;
        padding: 0 15px;
        font-size: 14px;
        height: 32px;
        margin: 0 5px;
        border: 1px solid #da5054;
        border-radius: 4px;
      }
    }

    .nav-user {
      .nav-user-icon {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .nav-user-icon-userinfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: 0 6px;

          .nav-user-icon-name {
            margin-bottom: 4px;
            max-width: 108px;
            .ellipsisOne();
          }

          .nav-user-icon-vip {
            margin-bottom: 0;
            display: inline-block;
            background: #da5054;
            border-radius: 4px;
            padding: 2px 6px;
            font-size: 12px;
          }
        }

        .ant-avatar-icon {
          height: 40px;
          padding: 0;
          display: flex;
          justify-content: center;
        }
      }
    }
  }
}
</style>
