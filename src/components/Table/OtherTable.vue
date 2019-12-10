<template>
  <div class="other-table">
    <a-row :gutter="16">
      <a-col :span="12">
        <a-table
          :columns="rankRose"
          :rowKey="record => record.kolId"
          :dataSource="dataSource.result"
          :pagination="false"
          :customRow="rowClick"
        >
          <template slot="media" slot-scope="text">
            <img v-lazy="text.kolImg" alt />
            <p>{{ text.kolName }}</p>
          </template>
          <template slot="fansNum" slot-scope="text">
            <p class="other-table-fansNum" :style="{ color: '#3F8600' }">
              <span>{{ text }}</span>
              <a-icon type="arrow-up" />
            </p>
          </template>
          <!-- <template slot="kolId" slot-scope="text">
            <router-link
              tag="a"
              target="_blank"
              :to="{ path: '/rank/detail', query: { kolId: text } }"
            >查看详情</router-link>
          </template>-->
        </a-table>
      </a-col>

      <a-col :span="12">
        <a-table
          :columns="rankOff"
          :rowKey="record => record.kolId"
          :dataSource="dataSourceasc.result"
          :pagination="false"
          :customRow="rowClick"
        >
          <template slot="media" slot-scope="text">
            <img v-lazy="text.kolImg" alt />
            <p>{{ text.kolName }}</p>
          </template>
          <template slot="fansNum" slot-scope="text">
            <p class="other-table-fansNum" :style="{ color: '#CF1322' }">
              <span>{{ text }}</span>
              <a-icon type="arrow-down" />
            </p>
          </template>
          <!-- <template slot="kolId" slot-scope="text">
            <router-link
              tag="a"
              target="_blank"
              :to="{ path: '/rank/detail', query: { kolId: text } }"
            >查看详情</router-link>
          </template>-->
        </a-table>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { rankRose, rankOff } from './index'

@Component
export default class OtherTable extends Vue {
  @Prop({ default: {} }) private dataSource!: object
  @Prop({ default: {} }) private dataSourceasc!: object
  private rankRose: any[] = rankRose
  private rankOff: any[] = rankOff

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
.other-table {
  height: 42px;

  /deep/ .ant-table-tbody > tr {
    cursor: pointer;
  }

  .other-table-fansNum {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      width: 80px;
    }
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
