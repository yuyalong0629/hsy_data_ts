<template>
  <a-table
    class="rank-tab"
    :columns="columns"
    :rowKey="record => record.id"
    :dataSource="pageInfo"
    :pagination="false"
  >
    <template slot="media" slot-scope="text">
      <img v-lazy="text.kolImg" alt />
      <p>{{ text.kolName }}</p>
    </template>

    <template slot="kolId" slot-scope="text">
      <router-link target="_blank" :to="{ path: '/rank/detail', query: { kolId: text } }">查看详情</router-link>
    </template>

    <template slot="id" slot-scope="text">
      <a href="javascript:;" style="padding: 0 12px;">
        <a-icon type="delete" @click="remove(text)" />
      </a>
    </template>
  </a-table>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { collection } from './index'

@Component
export default class CollectTable extends Vue {
  @Prop({ default: [] }) private pageInfo!: any

  private columns?: any[]
  private data() {
    return {
      columns: collection
    }
  }

  // 移除
  @Emit()
  private remove(id: any): void {
    return id
  }
}
</script>

<style lang="less" scoped>
.rank-tab {
  margin: 20px 0;

  img {
    border: 0;
    margin-right: 8px;
    height: 42px;
    float: left;
  }

  p {
    display: inline-block;
    height: 42px;
    line-height: 42px;
  }
}
</style>
