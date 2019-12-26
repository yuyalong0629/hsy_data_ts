<template>
  <div class="video">
    <a-row :gutter="16" v-if="detailType === '1'">
      <a-col :span="12">
        <a-radio-group @change="onChange" v-model="type">
          <a-radio :value="0">全部</a-radio>
          <a-radio :value="1">标题</a-radio>
          <a-radio :value="2">简介</a-radio>
          <a-radio :value="3">标签</a-radio>
          <a-radio :value="4">评论</a-radio>
        </a-radio-group>
      </a-col>
      <a-col :span="12">
        <a-input-search
          placeholder="号内搜  请输入关键词、商品名称、品牌名"
          @change="onChangeSearch"
          @search="onSearch"
          enterButton
        />
      </a-col>
    </a-row>

    <a-row :gutter="16" v-if="detailType === '2'">
      <a-col :span="24">
        <a-input-search
          placeholder="号内搜  请输入关键词、商品名称、品牌名"
          @change="onChangeSearch"
          @search="onSearch"
          enterButton
        />
      </a-col>
    </a-row>

    <div class="video-container">
      <div class="video-content-title">
        <h4 v-if="detailType === '1'">{{ `历史作品数据(${pageInfo.num})` }}</h4>
        <h4 v-if="detailType === '2'">{{ `相簿图文数据(${pageInfo.num})` }}</h4>
        <p v-if="updateTime">{{ `数据更新时间：${updateTime}` }}</p>
      </div>

      <a-empty v-if="pageInfo.result && !pageInfo.result.length" />

      <div class="video-content-wrapper" v-else v-for="(item) of pageInfo.result" :key="item.id">
        <div class="video-content">
          <div class="video-content-img">
            <a target="_blank" :href="item.sourceUrl">
              <img v-lazy="item.coverImg" alt />
            </a>
            <a href="javascript:;" style="color: #888;" @click="copylink(item.sourceUrl)">
              <a-icon type="link" />复制作品链接
            </a>
          </div>
          <div class="video-content-info">
            <h3 class="video-content-info-title" v-if="item.title">
              <a
                :href="item.sourceUrl"
                target="_blank"
                v-html="decodeURI(decodeURI(pageInfo.keyword)) ? heightLight(item.title, decodeURI(decodeURI(pageInfo.keyword))) : item.title"
              ></a>
            </h3>
            <p
              class="video-content-info-text"
              v-html="decodeURI(decodeURI(pageInfo.keyword)) ? heightLight(item.summary, decodeURI(decodeURI(pageInfo.keyword))) :  item.summary"
            ></p>
            <template v-if="item.tags">
              <a-tag
                color="pink"
                :style="{ marginBottom: '6px' }"
                v-for="(item, index) of JSON.parse(item.tags)"
                :key="index"
                v-html="decodeURI(decodeURI(pageInfo.keyword)) ? heightLight(item, decodeURI(decodeURI(pageInfo.keyword))) :  item"
              ></a-tag>
            </template>
            <div class="video-content-info-label">
              <p class="video-content-info-label-time">发布时间：{{ item.publishTime | formatDate }}</p>
              <ul class="video-content-info-label-num">
                <li v-if="detailType === '1'" :style="{ paddingLeft: '8px', cursor: 'pointer' }">
                  <icon-font type="icon-danmu" />
                  <span :style="{ paddingLeft: '4px' }">{{ item.barrageNum }}</span>
                </li>
                <li v-if="detailType === '1'" :style="{ paddingLeft: '8px', cursor: 'pointer' }">
                  <a-icon type="youtube" theme="filled" />
                  <span :style="{ paddingLeft: '4px' }">{{ item.playNum }}</span>
                </li>
                <li v-if="detailType === '2'" :style="{ paddingLeft: '8px', cursor: 'pointer' }">
                  浏览：
                  <span>{{ item.readNum }}</span>
                </li>
                <li :style="{ paddingLeft: '8px', cursor: 'pointer' }">
                  <a-icon type="like" theme="filled" />
                  <span :style="{ paddingLeft: '4px' }">{{ item.praiseNum }}</span>
                </li>
                <li :style="{ paddingLeft: '8px', cursor: 'pointer' }">
                  <a-icon type="star" theme="filled" />
                  <span :style="{ paddingLeft: '4px' }">{{ item.collectNum }}</span>
                </li>
                <li :style="{ paddingLeft: '8px', cursor: 'pointer' }">
                  <a-icon type="message" theme="filled" />
                  <span :style="{ paddingLeft: '4px' }">{{ item.commentNum }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 评论 -->
        <div class="video-comments">
          <a-collapse :bordered="false" :activeKey="activeKey">
            <a-collapse-panel header="展开精选20条评论" key="1">
              <a-list
                class="comment-list"
                :header="false"
                itemLayout="horizontal"
                :dataSource="JSON.parse(item.commentContent)"
              >
                <a-list-item slot="renderItem" slot-scope="item">
                  <a-comment :author="item.pt" :avatar="false">
                    <template slot="actions">
                      <span style="margin-right: 12px">
                        <a-icon type="like-o" />
                        {{item.pn}}
                      </span>
                      <span style="margin-right: 12px">
                        <a-icon type="message" />
                        {{item.cn}}
                      </span>
                    </template>
                    <p slot="content">{{item.ct}}</p>
                  </a-comment>
                </a-list-item>
              </a-list>
            </a-collapse-panel>
          </a-collapse>
        </div>
      </div>
    </div>
    <!-- 分页 -->
    <a-row :style="{ marginTop: '12px' }">
      <a-col :span="24" :style="{ margin: '12px 0' }">
        <a-pagination
          showQuickJumper
          :hideOnSinglePage="true"
          :current="current"
          :pageSize="pageSize"
          :total="total"
          @change="onChangePage"
        />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'
import { heightLight } from '@/utils/util'
import { Icon } from 'ant-design-vue'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('@/assets/font/iconfont')
})

@Component({
  components: {
    'icon-font': MyIcon
  }
})
export default class Video extends Vue {
  @Prop({ default: {} }) private videoInfo!: object
  @Prop({ default: 0 }) private videoType!: number
  @Prop({ default: '1' }) private detailType!: string
  @Prop({ default: '' }) private updateTime!: string

  private pageInfo?: object
  // 分页
  private total?: number
  private current?: number
  private pageSize?: number

  private type: number = 0
  private activeKey?: string
  private data() {
    return {
      heightLight,
      activeKey: '-1',
      pageInfo: {},
      total: 0,
      current: 1,
      pageSize: 20
    }
  }

  // Radio
  private onChange(e: any): void {}

  // 搜索
  @Emit('videoSearch')
  private onSearch(value: string, e: any, type: number = this.type): number {
    e.preventDefault()
    return type
  }

  @Emit('changeSearch')
  private onChangeSearch(e: any): void {}

  // copy
  private copylink(link: string) {
    this.$copyText(link).then(
      e => {
        this.$message.success('复制成功')
      },
      e => {
        this.$message.error('复制失败')
      }
    )
  }

  // 分页
  @Emit('videoChangePage')
  private onChangePage(
    pageNumber: string,
    pageSize: string,
    pageInfo: any = this.pageInfo
  ): any {
    return pageInfo
  }

  @Watch('videoInfo', { immediate: true, deep: true })
  private watchPageInfo(params: any): void {
    this.pageInfo = params

    this.total = params.count
    this.current = +params.index + 1

    if (params.type === 4) {
      this.activeKey = '1'
    } else {
      this.activeKey = '-1'
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/mixins.less';
@import '~@/assets/styles/variable.less';

.video {
  .ant-radio-group {
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    height: 32px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  .video-container {
    border: 1px solid #d9d9d9;
    margin: 12px 0;
    padding: 12px;
    border-radius: 4px;
    width: 100%;

    .video-content-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;

      h4 {
        border-left: 5px solid @active;
        padding-left: 6px;
        font-size: 16px;
        font-weight: 400;
      }

      p {
        font-size: 12px;
        font-weight: 400;
        color: #c6c6c6;
      }
    }

    .video-content-wrapper {
      display: flex;
      flex-direction: column;
      margin: 12px 0;

      .video-content {
        display: flex;
        border-bottom: 1px solid #d9d9d9;
        min-height: 158px;
        align-items: center;

        .video-content-img {
          flex: 0 0 180px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-right: 12px;

          img {
            width: 100%;
            height: 118px;
          }

          a:nth-child(2) {
            margin: 12px 0;
          }
        }

        .video-content-info {
          flex: 1;
          padding: 12px 0;

          .video-content-info-title {
            width: 100%;
            a {
              display: inline-block;
              max-width: 680px;
              font-size: 16px;
              font-weight: bold;
              color: #00a1d6;
              line-height: 24px;
              .ellipsisOne();
            }
          }

          .video-content-info-text {
            font-weight: 400;
            line-height: 24px;
            color: #a1a1a2;
            margin: 12px 0;
            height: 48px;
            .ellipsisMore();
          }

          .video-content-info-label {
            display: flex;
            justify-content: space-between;
            margin-top: 12px;

            .video-content-info-label-num {
              display: flex;
              align-items: center;

              li {
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }

      .video-comments {
        width: 100%;

        /deep/ .ant-collapse {
          .ant-collapse-item .ant-collapse-header {
            padding-left: 6px;
            .anticon {
              left: initial;
              right: 6px;
            }
          }

          .ant-collapse-content {
            max-height: 400px;
            overflow: auto;
          }
        }
      }
    }
  }

  .ant-pagination {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
