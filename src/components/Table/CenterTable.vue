<template>
  <a-spin :spinning="spinning">
    <a-table
      class="members-table"
      bordered
      :columns="permissionColumns"
      :dataSource="operateLimitInfos"
      :pagination="false"
    >
      <template slot="summaryTitle">
        <div class="members-privilege">
          <h4>会员特权</h4>
        </div>
      </template>

      <template slot="LV-1Title">
        <div class="members-privilege">
          <h4>未登录</h4>
        </div>
      </template>

      <template slot="LV0Title">
        <div class="members-privilege">
          <h4>普通用户</h4>
        </div>
      </template>

      <template slot="LV1Title">
        <div class="members-privilege">
          <h4>{{ monthlyPriceInfos.length && monthlyPriceInfos[0].title }}</h4>
        </div>
      </template>

      <template slot="LV2Title">
        <div class="members-privilege">
          <h4>{{ monthlyPriceInfos.length && monthlyPriceInfos[1].title }}</h4>
        </div>
      </template>

      <template slot="LV3Title">
        <div class="members-privilege">
          <h4>{{ monthlyPriceInfos.length && monthlyPriceInfos[2].title }}</h4>
        </div>
      </template>

      <template slot="LV-1" slot-scope="text">
        <div>
          <a-icon v-if="text === 'close'" :type="text" />
          <span v-else>{{ text }}</span>
        </div>
      </template>

      <template slot="LV0" slot-scope="text">
        <div>
          <a-icon v-if="text === 'close'" :type="text" />
          <span v-else>{{ text }}</span>
        </div>
      </template>

      <template slot="LV1" slot-scope="text">
        <div>
          <a-icon v-if="text === 'close'" :type="text" />
          <span v-else>{{ text }}</span>
        </div>
      </template>
    </a-table>
  </a-spin>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { permissionColumns } from './index'
import { Getter, namespace } from 'vuex-class'
import { operateLimitList } from '@/api/index'

const user = namespace('user')

@Component
export default class PermissionTable extends Vue {
  @user.Getter GET_STORAGE!: () => any

  private spinning: boolean = false
  private operateLimitInfos: any[] = []
  private monthlyPriceInfos: any[] = []

  private data() {
    return {
      permissionColumns
    }
  }

  private mounted() {
    this.spinning = true
    operateLimitList()
      .then((res: any) => {
        if (res.code === 200) {
          this.operateLimitInfos = res.operateLimitInfos.map(
            (item: any, index: number) => {
              return {
                ...item,
                key: index
              }
            }
          )
          this.monthlyPriceInfos = res.monthlyPriceInfos
        }
      })
      .finally(() => (this.spinning = false))
  }

  // 购买升级
  private handleUpgrade(key: string): void {
    this.$router.push({ path: '/members/pay', query: { priceType: key } })
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.members-table {
  border: 3px solid @active;

  /deep/ .ant-table-thead > tr > th {
    background: @active;
    color: #fff;
  }

  /deep/ .ant-table-tbody > tr:nth-child(even) {
    background: #fcefef;
  }

  .members-privilege {
    display: flex;
    align-items: center;
    align-content: space-between;
    justify-content: center;
    position: relative;

    h4 {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }
  }

  .members-senior {
    display: flex;
    flex-direction: column;

    .members-senior-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p:nth-child(1) {
        color: #212020;
        font-size: 16px;
        font-weight: 500;
      }

      p:nth-child(2) {
        color: #a46b0e;
        font-weight: 500;
        font-size: 24px;

        span {
          color: #b09f84;
          font-size: 14px;
        }
      }
    }

    .members-senior-btn {
      padding: 28px 0 6px;

      .ant-btn {
        background: linear-gradient(
          180deg,
          rgba(242, 222, 182, 1),
          rgba(221, 189, 138, 1)
        );
        color: #65430b;
        font-weight: 400;
      }
    }
  }

  .members-professiona {
    display: flex;
    flex-direction: column;

    .members-professiona-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p:nth-child(1) {
        color: #212020;
        font-size: 16px;
        font-weight: 500;
      }

      p:nth-child(2) {
        color: #a46b0e;
        font-weight: 500;
        font-size: 24px;

        span {
          color: #b09f84;
          font-size: 14px;
        }
      }
    }

    .members-professiona-btn {
      padding: 28px 0 6px;

      .ant-btn {
        background: linear-gradient(
          180deg,
          rgba(242, 222, 182, 1),
          rgba(221, 189, 138, 1)
        );
        color: #65430b;
        font-weight: 400;
      }
    }
  }

  .members-enterprise {
    display: flex;
    flex-direction: column;

    .members-enterprise-head {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      p:nth-child(1) {
        color: #212020;
        font-size: 16px;
        font-weight: 500;
      }

      p:nth-child(2) {
        color: #a46b0e;
        font-weight: 500;
        font-size: 24px;

        span {
          color: #b09f84;
          font-size: 14px;
        }
      }
    }

    .members-enterprise-btn {
      padding: 28px 0 6px;

      .ant-btn {
        background: linear-gradient(
          180deg,
          rgba(242, 222, 182, 1),
          rgba(221, 189, 138, 1)
        );
        color: #65430b;
        font-weight: 400;
      }
    }
  }
}
</style>
