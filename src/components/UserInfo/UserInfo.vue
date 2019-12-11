<template>
  <div class="userInfo">
    <h3 class="userInfo-cloud">{{ kolInfo.indexNum }}</h3>

    <a-popover placement="bottomLeft" :title="false">
      <template slot="content">
        <p style="width: 200px;">云指数是系统基于账号粉丝活跃度、作品原创度、作品内容质量、作品完播度以及平均评论和点赞量等数据分析得出的综合评分</p>
      </template>
      <span :style="{ color: '#fff' }">云指数</span>
      <a-icon type="question-circle" :style="{ color: '#fff' }" />
    </a-popover>

    <a href="javascript:;" class="userInfo-avatar">
      <a-avatar :size="80" :src="kolInfo.kolImg" icon="user" />
    </a>

    <p class="userinfo-name">{{ kolInfo.kolName }}</p>

    <p class="userinfo-text">{{ `认证信息：${kolInfo.isApprove}, ${kolInfo.approveDescription}` }}</p>

    <p class="userinfo-text">{{ `账户简介：${kolInfo.kolSummary}` }}</p>

    <ul class="userInfo-level">
      <li>{{ `LV${kolInfo.platformGrade}` }}</li>
      <li>{{ kolInfo.isVip }}</li>
      <li v-if="kolInfo.isFansBadge">粉</li>
    </ul>

    <ul class="userInfo-number">
      <li>
        <h4>{{ kolInfo.fansNum }}</h4>
        <p>粉丝数</p>
      </li>
      <li>
        <h4>{{ kolInfo.playNum }}</h4>
        <p>播放数</p>
      </li>
      <li>
        <h4>{{ kolInfo.chargingNum }}</h4>
        <a-popover
          placement="bottomLeft"
          :style="{ color: '#c6c6c6', fontSize: '12px',  fontWeight: '400', lineHeight: '23px' }"
          :title="false"
        >
          <template slot="content">
            <p style="width: 200px;">充电数是粉丝对喜欢的UP主进行的一种赞赏数据，UP主可以拿到粉丝给的充电电池数量按照一定的比例兑换成现金，然后申请提现。</p>
          </template>
          <span>充电数</span>
          <a-icon type="question-circle" />
        </a-popover>
      </li>
    </ul>

    <ul class="userInfo-class">
      <li v-for="item of kolInfo.sortFlag" :key="item.id">{{ item.name }}</li>
    </ul>

    <ul class="userInfo-operation">
      <li>
        <a-tooltip
          placement="bottom"
          :style="{ color: '#DA5054', fontSize: '36px',  fontWeight: '400', lineHeight: '23px' }"
        >
          <template slot="title">
            <span>查看相似号</span>
          </template>
          <a-icon
            class="hoverStar"
            :style="{ cursor: 'pointer' }"
            type="team"
            @click="onChangeSimilar(kolInfo.kolId)"
          />
        </a-tooltip>
      </li>
      <li>
        <a-tooltip placement="bottom">
          <template slot="title">
            <span>收藏账号</span>
          </template>
          <a-icon
            type="star"
            :theme="collect ? 'filled' : 'outlined'"
            :style="{ fontSize: '36px', color: '#FFBE31' }"
            class="hoverStar"
            @click="onChangeStart(kolInfo.kolId)"
          />
        </a-tooltip>
      </li>
    </ul>

    <!-- 收藏账号 -->
    <a-modal
      title="添加收藏分组"
      :visible="visible"
      :destroyOnClose="true"
      width="420px"
      :footer="null"
      @cancel="handleCancel"
    >
      <Collect :kolId="kolId" @lightUp="lightUp" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import Collect from '@/components/Collect/Collect.vue'

@Component({
  components: {
    Collect
  }
})
export default class UserInfo extends Vue {
  @Prop({ default: {} }) private kolInfo!: object
  @Prop({ default: false }) private isCollect!: boolean

  private visible: boolean = false
  private kolId?: string = ''
  private collect?: boolean = false

  // Modal
  private handleCancel(): void {
    this.visible = false
  }

  // 查看相似号
  private onChangeSimilar(kolId: string) {
    const { href } = this.$router.resolve({
      path: '/similar',
      query: {
        kolId: kolId
      }
    })
    window.open(href, '_blank')
  }

  // 收藏
  private onChangeStart(kolId: string) {
    if (!this.collect) {
      this.visible = true
      this.kolId = kolId
    } else {
      this.visible = false
      this.$message.warning('该账户已收藏')
    }
  }

  private lightUp(star: boolean, id: string) {
    if (star) {
      this.collect = true
    }
  }

  @Watch('isCollect')
  private function(val: boolean) {
    this.collect = val
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.userInfo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  padding: 12px;
  background: url('../../assets/images/detail1.png') no-repeat top left;
  width: 100%;
  border: 1px solid #ececec;
  border-color: rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  transition: all 0.3s;

  .userInfo-avatar {
    padding: 8px;
    background: #fff;
    border-radius: 50%;
    margin: 12px 0;

    .ant-avatar {
      border: 1px solid #ececec;
    }
  }

  &:hover {
    border-color: rgba(0, 0, 0, 0.09);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
  }

  .userInfo-cloud {
    color: #ffffff;
    font-size: 26px;
    font-weight: bold;
    line-height: 32px;
  }

  .userinfo-name {
    color: #3c3c3c;
    font-size: 16px;
    font-weight: 400;
    line-height: 50px;
  }

  .userinfo-text {
    font-size: 12px;
    font-weight: 400;
    color: #c6c6c6;
    line-height: 20px;
  }

  .userInfo-level {
    display: flex;
    justify-content: space-around;

    li:nth-child(1) {
      height: 16px;
      border-radius: 4px;
      background: #eb000e;
      color: #ffffff;
      font-size: 12px;
      padding: 0 4px;
      line-height: 14px;
      margin: 12px 6px;
    }

    li:nth-child(2) {
      height: 16px;
      border-radius: 4px;
      background: #e24f86;
      color: #ffffff;
      font-size: 12px;
      padding: 0 4px;
      line-height: 14px;
      margin: 12px 6px;
    }

    li:nth-child(3) {
      height: 16px;
      border-radius: 4px;
      background: #fff;
      color: #ef73a9;
      font-size: 12px;
      padding: 0 4px;
      line-height: 14px;
      margin: 12px 6px;
      border: 1px solid #ef73a9;
    }
  }

  .userInfo-number {
    width: 100%;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px solid #f4f4f4;

    li:nth-child(1) {
      font-size: 12px;
      padding: 0 4px;
      margin: 12px 0;
      border-right: 1px solid #f4f4f4;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        color: #303133;
        font-size: 18px;
        font-weight: bold;
        line-height: 33px;
      }

      p {
        color: #c6c6c6;
        font-size: 12px;
        font-weight: 400;
        line-height: 23px;
      }
    }

    li:nth-child(2) {
      font-size: 12px;
      padding: 0 4px;
      margin: 12px 0;
      border-right: 1px solid #f4f4f4;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        color: #303133;
        font-size: 18px;
        font-weight: bold;
        line-height: 33px;
      }

      p {
        color: #c6c6c6;
        font-size: 12px;
        font-weight: 400;
        line-height: 23px;
      }
    }

    li:nth-child(3) {
      flex: 1;
      font-size: 12px;
      padding: 0 4px;
      margin: 12px 0;
      display: flex;
      flex-direction: column;
      align-items: center;

      h4 {
        color: #303133;
        font-size: 18px;
        font-weight: bold;
        line-height: 33px;
      }
    }
  }

  .userInfo-class {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin-top: 12px;
    width: 100%;

    li {
      min-width: 30%;
      text-align: center;
      margin: 6px 0;
      font-size: 12px;
    }
  }

  .userInfo-operation {
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 12px 0;

    li {
      display: flex;
      align-items: center;
    }
  }
}

.hoverStar {
  transition: all 0.3s;
}

.hoverStar:hover {
  transform: scale(1.1);
}
</style>
