<template>
  <div class="center">
    <a-row type="flex" justify="space-between">
      <a-col :span="6">
        <a-button type="primary">会员信息</a-button>
      </a-col>
      <a-col :span="2">
        <p class="center-invoice">申请发票</p>
      </a-col>
    </a-row>

    <a-row type="flex" :style="{ marginTop: '24px' }">
      <a-col :span="2">
        <Upload :userImage="userInfo.userImage" @propsFile="propsFile" />
      </a-col>
      <a-col :span="5" class="members-user-phone">
        <p>
          <span>{{ userInfo.nickname || userInfo.phone }}</span>
          <span>{{ userInfo.userType === 0 ? '免费版会员' : userInfo.userType === 1 ? '高级版会员' : userInfo.userType === 2 ? '专业版会员' : '企业版会员' }}</span>
        </p>
        <p v-if="userInfo.userType === 1 && maturityTime">
          <span>会员到期时间：{{ maturityTime }}</span>
          <span></span>
        </p>
      </a-col>

      <a-col :span="24">
        <p style="float: right; margin-bottom: 12px;">
          <a href="javascript:;" @click="changePwd">修改密码</a>
        </p>
        <a-divider />
      </a-col>

      <a-col :span="24" class="members-phone">
        <div class="members-phone-left">
          <p>{{ `手机号码:&nbsp;&nbsp;${userInfo.phone}` }}</p>
          <p>{{ `微信昵称:&nbsp;&nbsp;${thirdAccountInfo && thirdAccountInfo.nickname}` }}</p>
        </div>
        <div class="members-phone-right">
          <a href="javascript:;" @click="onChangePhone">{{ isOldPassword ? '更换号码' :'绑定号码' }}</a>
          <a href="javascript:;" @click="onChangeWechart">{{ !thirdAccountInfo ? '绑定微信' : '更换微信' }}</a>
        </div>
      </a-col>

      <a-col :span="24">
        <a-divider />
      </a-col>

      <a-col :span="24">
        <CenterTable />
      </a-col>
    </a-row>

    <!-- Modal -->
    <a-modal
      :destroyOnClose="true"
      width="400px"
      :title="false"
      :visible="visible"
      @cancel="handleCancel"
      :footer="null"
    >
      <component
        :is="userTemplate"
        :isOldPassword="isOldPassword"
        :thirdAccountInfo="thirdAccountInfo"
        :userId="userId"
      ></component>

      <a-divider>欢迎使用火烧云数据</a-divider>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Upload from '@/components/Upload/Upload.vue'
import { userInfo, setCoverImage } from '@/api/user'
import { Mutation, namespace } from 'vuex-class'
import Wecahrt from './pages/Wechart.vue'
import Retrieve from './pages/Retrieve.vue'
import Phone from './pages/Phone.vue'
import CenterTable from '@/components/Table/CenterTable.vue'

const user = namespace('user')

@Component({
  components: {
    Upload,
    Wecahrt,
    Retrieve,
    Phone,
    CenterTable
  }
})
export default class Center extends Vue {
  @user.Mutation SET_LOGIN!: (params: any) => void

  private visible: boolean = false
  private userTemplate: string = ''
  private userInfo: object = {}
  private maturityTime?: string = ''
  private isOldPassword: boolean = false
  private thirdAccountInfo?: string = ''
  private userId?: string = ''

  private mounted() {
    // 初始化用户信息
    userInfo().then((res: any) => {
      if (res.code === 200) {
        this.isOldPassword = res.isOldPassword
        this.thirdAccountInfo = res.thirdAccountInfo
        this.maturityTime = res.maturityTime
        this.userInfo = res.userInfoMap
        this.userId = res.userInfoMap.id
      }
    })
  }

  // upload
  private propsFile(val: string) {
    console.log(val)
    setCoverImage({
      imageUrl: val
    }).then((res: any) => {
      if (res.code === 200) {
        this.$message.success(res.message)
        this.SET_LOGIN(res.userInfoMap)
      } else {
        this.$message.error(res.message)
      }
    })
  }

  // Modal cancel
  private handleCancel() {
    this.visible = false
  }

  // 修改密码
  private changePwd(): void {
    this.visible = true
    this.userTemplate = 'Retrieve'
  }

  // 更换手机号
  onChangePhone() {
    this.visible = true
    this.userTemplate = 'Phone'
  }

  // 绑定微信
  onChangeWechart() {
    this.visible = true
    this.userTemplate = 'Wecahrt'
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.center {
  .basicWidth();
  padding: 48px 0;

  .center-invoice {
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    color: #999;
  }

  .members-user-phone {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;

    p {
      height: 24px;
      line-height: 24px;
      display: flex;
      align-items: center;

      &:nth-child(1) {
        span:nth-child(1) {
          font-size: 20px;
          margin-right: 10px;
          font-weight: 500;
        }

        span:nth-child(2) {
          font-size: 12px;
          margin-right: 10px;
          height: 16px;
          line-height: 16px;
          display: inline-block;
          background: @active;
          color: #fff;
          border-radius: 3px;
          padding: 0 5px;
        }
      }

      &:nth-child(2) {
        color: #999;
        font-size: 12px;
      }
    }
  }

  .members-phone {
    display: flex;
    justify-content: space-between;

    .members-phone-left {
      display: flex;
      flex-direction: column;

      p {
        line-height: 24px;
        font-weight: 500;
      }
    }
    .members-phone-right {
      display: flex;
      flex-direction: column;

      a {
        line-height: 24px;
      }
    }
  }
}
</style>
