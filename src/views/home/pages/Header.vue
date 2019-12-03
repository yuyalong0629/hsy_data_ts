<template>
  <div class="header" v-if="fansInfo.length">
    <div class="header-left animated bounceInLeft">
      <div class="left-img">
        <a-avatar :src="fansInfo[0].kolImg" />
        <h4>{{fansInfo[0].kolName}}</h4>
        <p class="fans">
          粉丝数：
          <countTo
            class="fansNum"
            :startVal="0"
            :autoplay="true"
            :endVal="fansInfo[0].fansNum"
            :duration="3000"
            separator=","
          ></countTo>
        </p>
      </div>
    </div>
    <div class="header-middle">
      <img v-lazy="require('../../../assets/images/pkbanner2.png')" alt />
    </div>
    <div class="header-right animated bounceInRight">
      <div class="right-img">
        <a-avatar :src="fansInfo[1].kolImg" />
        <h4>{{fansInfo[1].kolName}}</h4>
        <p class="fans">
          粉丝数：
          <countTo
            class="fansNum"
            :startVal="0"
            :autoplay="true"
            :endVal="fansInfo[1].fansNum"
            :duration="3000"
            separator=","
          ></countTo>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import countTo from 'vue-count-to'

@Component({
  components: {
    countTo
  }
})
export default class Header extends Vue {
  @Prop({ default: [], required: true })
  fansInfo!: any[]
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.header {
  background: url('~@/assets/images/pkbanner1.png') no-repeat center;
  background-size: cover;
  height: 540px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  .header-left {
    display: flex;
    justify-content: center;
    flex: 1;

    .left-img {
      display: flex;
      flex-direction: column;
      align-items: center;

      .ant-avatar {
        width: 120px;
        height: 120px;
        box-shadow: 0px 0px 20px rgb(114, 112, 112);
      }

      h4 {
        line-height: 24px;
        font-size: 18px;
        margin: 32px 0 6px;
        font-weight: bold;
        color: #fff;
      }

      .fans {
        line-height: 24px;
        font-weight: bold;
        color: #fff;
      }

      .fansNum {
        line-height: 24px;
        color: @active;
        font-weight: 600;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
      }
    }
  }

  .header-middle {
    flex: 0 0 400px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: -80px;

    img {
      width: 320px;
      height: 300px;
    }
  }

  .header-right {
    display: flex;
    flex: 1;
    justify-content: center;

    .right-img {
      display: flex;
      flex-direction: column;
      align-items: center;

      .ant-avatar {
        width: 120px;
        height: 120px;
        box-shadow: 0px 0px 20px rgb(114, 112, 112);
      }

      h4 {
        line-height: 24px;
        font-size: 18px;
        margin: 32px 0 6px;
        font-weight: bold;
        color: #fff;
      }

      .fans {
        line-height: 24px;
        font-weight: bold;
        color: #fff;
      }

      .fansNum {
        line-height: 24px;
        color: @active;
        font-weight: 600;
        font-size: 18px;
        font-family: Microsoft YaHei;
        font-weight: bold;
      }
    }
  }
}
</style>
