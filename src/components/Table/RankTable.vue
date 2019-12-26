<template>
  <a-table
    class="rank-table"
    :columns="columns"
    :rowKey="record => record.kolId"
    :dataSource="dataSource.result"
    :pagination="false"
    :customRow="rowClick"
  >
    <template slot="fansTitle">粉丝数</template>
    <template slot="cloudsTitle">
      <a-popover placement="bottomLeft" :title="false">
        <template slot="content">
          <p style="width: 200px;">云指数是系统基于账号粉丝活跃度、作品原创度、作品内容质量、作品完播度以及平均评论和点赞量等数据分析得出的综合评分</p>
        </template>
        云指数
        <a-icon type="question-circle" />
      </a-popover>
    </template>
    <template slot="media" slot-scope="text">
      <img v-lazy="text.kolImg" alt />
      <p>{{ text.kolName }}</p>
    </template>
    <template slot="kolId">
      <a>查看详情</a>
    </template>
  </a-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { rankColumns } from './index'

@Component
export default class RankTable extends Vue {
  @Prop() private dataSource!: object

  private columns: object[] = rankColumns

  private data() {
    return {
      rowClick: (record: any) => ({
        on: {
          click: () => {
            const { href } = this.$router.resolve({
              path: '/rank/detail',
              query: {
                kolId: record.kolId
              }
            })
            window.open(href, '_blank')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.rank-table /deep/ .ant-table-tbody > tr {
  cursor: pointer;
}

.rank-tab-media {
  height: 42px;

  div {
    padding-left: 12px;
  }

  img {
    border: 0;
    margin-right: 8px;
    height: 42px;
    float: left;
    border-radius: 50%;
  }

  p {
    display: inline-block;
    height: 42px;
    line-height: 42px;
  }
}
</style>
