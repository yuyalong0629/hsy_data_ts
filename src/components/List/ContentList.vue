<template>
  <a-row>
    <a-col :span="24">
      <a-card hoverable style="margin: 20px 0;" v-for="item of pageInfo.result" :key="item.id">
        <div class="similar-content">
          <div class="similar-content-left">
            <div class="similar-content-left-info">
              <div class="similar-avatar">
                <div class="similar-userinfo">
                  <div class="similar-userinfo-title">
                    <a :href="item.sourceUrl" target="_blank" style="color: #333;">
                      <span v-html="item && heightLight(item.title, pageInfo.keyword)"></span>
                    </a>
                  </div>
                  <p
                    class="similar-userinfo-link"
                    v-html="item && heightLight(item.summary, pageInfo.keyword)"
                  ></p>
                </div>
              </div>

              <div class="similar-label">
                <a-tag v-for="item of item.sortFlag" :key="item.id" v-html="item.name"></a-tag>
              </div>

              <div class="similar-time">
                <p>发布时间:&nbsp;{{ item.publishTime | formatDate }}</p>
                <p>
                  <span style="margin: 0 12px 0 20px; font-weight: 600;">
                    <a-icon type="youtube" theme="filled" />
                    {{ numFixed(+item.playNum) }}
                  </span>
                  <span style="margin-right: 12px">
                    <a-icon type="like" theme="filled" />
                    {{item.praiseNum}}
                  </span>
                  <span style="margin-right: 12px">
                    <icon-font type="icon-danmu" />
                    {{item.barrageNum}}
                  </span>
                </p>
              </div>
            </div>
            <div class="similar-content-left-fans">
              <p>
                评论:
                <span
                  v-html="item.commentContentStr.length && heightLight(JSON.parse(item.commentContentStr)[0]['ct'], pageInfo.keyword)"
                >}</span>
              </p>
            </div>
          </div>
          <div class="similar-content-right">
            <router-link
              tag="a"
              target="_blank"
              :to="{path: '/rank/detail', query: {kolId: item.kolId}}"
            >
              <img :src="item.kolImg" alt />
            </router-link>
            <span>{{ item.kolName }}</span>
            <span>
              粉丝数:
              <i>{{ numFixed(+item.fansNum) }}</i>
            </span>
          </div>
        </div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { heightLight, numFixed } from '@/utils/util'
import { Icon } from 'ant-design-vue'
import moment from 'moment'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class ConentList extends Vue {
  @Prop({ default: {} }) private pageInfo!: object

  private data() {
    return {
      heightLight,
      numFixed
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.similar-content {
  display: flex;
  .similar-content-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    .similar-content-left-info {
      display: flex;
      flex-direction: column;
      .similar-avatar {
        display: flex;
        margin-bottom: 10px;
        .similar-userinfo {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-left: 0px;
          .similar-userinfo-title {
            height: auto;
            line-height: 22px;
            margin-bottom: 6px;
            span {
              font-weight: 700;
              font-size: 16px;
            }
          }
          .similar-userinfo-link {
            min-height: 20px;
            line-height: 20px;
          }
        }
        .similar-cloud {
          flex: 0 0 100px;
          text-align: center;
          h2 {
            width: 100%;
            line-height: 45px;
            color: @active;
            font-size: 26px;
            text-align: center;
          }
          .user-right-icon {
            width: 100%;
            text-align: center;
          }
        }
      }
      .similar-label {
        display: flex;
        margin: 12px 0;
        flex-wrap: wrap;
        .ant-tag {
          margin-bottom: 8px;
        }
      }
      .similar-time {
        display: flex;
        justify-content: space-between;
        padding-right: 12px;
        color: #999;
      }
    }
    .similar-content-left-fans {
      margin-top: 10px;
      padding: 10px 20px 0 0;
      border-top: 1px solid #d9d9d9;
      display: flex;
      justify-content: space-between;
      p {
        line-height: 24px;
        flex: 3;
        .ellipsisMore();
        -webkit-line-clamp: 3;
      }
      p:last-child {
        flex: 1;
        text-align: left;
      }
    }
  }
  .similar-content-right {
    flex: 0 0 150px;
    border-left: 1px solid #d9d9d9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-left: 18px;
    img {
      width: 102px;
      height: 102px;
      border-radius: 50%;
    }
    span {
      width: 100%;
      text-align: center;
      font-weight: 500;
      line-height: 28px;
    }
  }
}
</style>
