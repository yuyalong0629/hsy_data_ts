<template>
  <div class="members">
    <a-row>
      <a-col :span="24">
        <h3 class="members-title">会员版本特权对比</h3>
      </a-col>

      <a-col :span="24">
        <PermissionTabale />
      </a-col>
      <a-col :span="24">
        <div class="members-more">更多功能体验，敬请期待</div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PermissionTabale from '@/components/Table/PermissonTable.vue'

@Component({
  components: {
    PermissionTabale
  }
})
export default class Members extends Vue {}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.members {
  .basicWidth();

  .members-title {
    font-size: 30px;
    font-weight: 400;
    color: #313131;
    text-align: center;
    margin: 70px 0 60px;
  }

  .members-more {
    height: 24px;
    font-size: 24px;
    font-weight: 400;
    color: #cecccc;
    margin: 48px 0;
    text-align: center;
  }
}
</style>
