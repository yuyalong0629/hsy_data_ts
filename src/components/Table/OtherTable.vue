<template>
  <div class="othen-table">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-table
          :columns="rankRose"
          :rowKey="record => record.kolId"
          :dataSource="dataSource"
          :pagination="false"
          :customRow="rowClick"
        >
          <template slot="media" slot-scope="text">
            <img v-lazy="text.kolImg" alt />
            <p>{{ text.kolName }}</p>
          </template>
          <template slot="kolId" slot-scope="text">
            <router-link
              tag="a"
              target="_blank"
              :to="{ path: '/rank/detail', query: { kolId: text } }"
            >查看详情</router-link>
          </template>
        </a-table>
      </a-col>

      <a-col :span="12">
        <a-table
          :columns="rankOff"
          :rowKey="record => record.kolId"
          :dataSource="dataSource"
          :pagination="false"
        >
          <template slot="media" slot-scope="text">
            <img v-lazy="text.kolImg" alt />
            <p>{{ text.kolName }}</p>
          </template>
          <template slot="kolId" slot-scope="text">
            <router-link
              tag="a"
              target="_blank"
              :to="{ path: '/rank/detail', query: { kolId: text } }"
            >查看详情</router-link>
          </template>
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { rankRose, rankOff } from './index'

@Component
export default class OtherTable extends Vue {
  private dataSource: any = []
  private rankRose: any[] = rankRose
  private rankOff: any[] = rankOff

  private data() {
    return {
      rowClick: (record: any) => ({
        on: {
          click: () => {
            console.log(record, 'record')
          }
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
