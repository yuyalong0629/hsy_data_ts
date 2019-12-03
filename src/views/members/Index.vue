<template>
  <div class="members">
    <a-row>
      <a-col :span="24">
        <h3 class="members-title">会员版本特权对比</h3>
      </a-col>

      <a-col :span="24">
        <a-table
          class="members-table"
          bordered
          :columns="columns"
          :dataSource="data"
          :pagination="false"
        >
          <template slot="privilegelTitle">
            <div class="members-privilege">
              <p>&nbsp;</p>
              <h4>会员特权</h4>
            </div>
          </template>

          <template slot="seniorlTitle">
            <div class="members-senior">
              <div class="members-senior-head">
                <p>高级版会员</p>
                <p>
                  399
                  <span>元/月</span>
                </p>
              </div>
              <div class="members-senior-btn">
                <a-button>立即升级</a-button>
              </div>
            </div>
          </template>

          <template slot="professionalTitle">
            <div class="members-professiona">
              <div class="members-professiona-head">
                <p>专业版会员</p>
                <p>
                  799
                  <span>元/月</span>
                </p>
              </div>
              <div class="members-professiona-btn">
                <a-button>立即升级</a-button>
              </div>
            </div>
          </template>

          <template slot="enterpriseTitle">
            <div class="members-enterprise">
              <div class="members-enterprise-head">
                <p>企业版会员</p>
                <p>
                  2599
                  <span>元/月</span>
                </p>
              </div>
              <div class="members-enterprise-btn">
                <a-button>立即升级</a-button>
              </div>
            </div>
          </template>

          <template slot="senior" slot-scope="text">
            <div>
              <a-icon v-if="text === '0'" type="close" />
              <span v-else>{{ text }}</span>
            </div>
          </template>

          <template slot="professional" slot-scope="text">
            <div>
              <a-icon v-if="text === '1'" type="check" />
              <span v-else>{{ text }}</span>
            </div>
          </template>

          <template slot="enterprise" slot-scope="text">
            <div>
              <a-icon v-if="text === '1'" type="check" />
              <span v-else>{{ text }}</span>
            </div>
          </template>
        </a-table>
      </a-col>
      <a-col :span="24">
        <div class="members-more">更多功能体验，敬请期待</div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter, namespace } from 'vuex-class'
import { columns, data } from './index'

const user = namespace('user')

@Component
export default class Members extends Vue {
  @user.Getter GET_STORAGE!: () => any

  private data() {
    return {
      columns,
      data
    }
  }

  // 购买升级
  private onClickPay(): void {}
}
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

  .members-table {
    /deep/ .ant-table-thead > tr > th:nth-child(1) {
      background: #fff;
    }

    /deep/ .ant-table-thead > tr > th:nth-child(2) {
      background: url('../../assets/images/gao3.png') no-repeat center;
      background-size: cover;
    }

    /deep/ .ant-table-thead > tr > th:nth-child(3) {
      background: url('../../assets/images/gao2.png') no-repeat top;
      background-size: cover;
    }

    /deep/ .ant-table-thead > tr > th:nth-child(4) {
      background: url('../../assets/images/gao1.png') no-repeat center;
      background-size: cover;
    }

    .members-privilege {
      display: flex;
      align-items: center;
      align-content: space-between;
      justify-content: center;
      position: relative;

      h4 {
        position: absolute;
        top: 45px;
        font-size: 22px;
        font-weight: 600;
        color: #65430b;
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
