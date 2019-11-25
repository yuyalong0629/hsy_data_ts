<template>
  <ul class="contact">
    <li>
      <img v-lazy="require('@/assets/images/contact1.png')" alt />
      <div class="contact-text">
        <p>MCN&nbsp;/&nbsp;达人合作</p>
        <p>联系电话:&nbsp;187&nbsp;0562&nbsp;9702</p>
        <p>邮箱地址:&nbsp;media@dameicm.cn</p>
      </div>
    </li>
    <li>
      <img v-lazy="require('@/assets/images/contact2.png')" alt />
      <div class="contact-text">
        <p>商务&nbsp;/&nbsp;广告合作</p>
        <p>联系电话:&nbsp;186&nbsp;5810&nbsp;2053</p>
        <p>邮箱地址:&nbsp;marketing@damei.cn</p>
      </div>
    </li>
    <li>
      <img v-lazy="require('@/assets/images/contact3.png')" alt />
      <div class="contact-text">
        <p>产品&nbsp;/&nbsp;运营</p>
        <p>联系电话:&nbsp;150&nbsp;6715&nbsp;8565&nbsp;</p>
        <p>邮箱地址:&nbsp;kaifan@dameicm.cn</p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Name extends Vue {}
</script>

<style lang="less" scoped>
.contact {
  display: flex;
  justify-content: space-around;
  padding: 0 48px;
  height: 100%;
  align-items: center;
  li {
    width: 320px;
    min-height: 312px;
    display: flex;
    flex-direction: column;
    align-content: space-between;
    justify-content: space-between;
    padding: 12px;
    .contact-text {
      text-align: center;
    }
    img {
      width: 100%;
      height: 200px;
    }
    p {
      line-height: 22px;
      &:first-child {
        font-weight: 600;
        font-size: 16px;
        margin-bottom: 2px;
      }
    }
  }
}
</style>
