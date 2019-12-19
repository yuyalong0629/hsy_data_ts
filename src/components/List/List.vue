<template>
  <a-row>
    <a-col :span="24" class="search-wrapper">
      <div
        class="search-content"
        v-for="(item, index) of pageInfo.result"
        :key="index"
        @mouseenter.stop="onMoveEnter(index)"
        @mouseleave.stop="onMoveLeave(index)"
      >
        <!-- position -->
        <div
          class="search-btn animated"
          ref="searchBtn"
          :class="active === index ? 'fadeInLeft' : 'fadeOutLeft'"
        >
          <a-button @click="handleDetail(item.kolId)">查看详情</a-button>
          <a-button @click="handleSimilar(item.kolId)">相似账号</a-button>
          <a-button @click="handleAnalysis(item.kolId)">投前分析</a-button>
        </div>

        <div class="search-left">
          <a-avatar :size="88" :src="item.kolImg" icon="user" />
        </div>

        <div class="search-middle">
          <div class="search-middle-user">
            <span class="search-middle-user-name">
              <span>
                <router-link
                  tag="a"
                  target="_blank"
                  :to="{path: '/rank/detail', query: {kolId: item.kolId}}"
                  v-html="pageInfo.keyword ? heightLight(item.kolName, pageInfo.keyword) : item.kolName"
                ></router-link>
              </span>
              <span>{{ `LV${item.platformGrade}` }}</span>
              <span>{{ item.isVip }}</span>
              <span v-if="item.isFansBadge">粉</span>
            </span>
            <p
              class="search-middle-user-text"
              v-html="pageInfo.keyword ? heightLight(item.kolSummary, pageInfo.keyword) : item.kolSummary"
            ></p>

            <a-tag
              :style="{ margin: '6px 12px 6px 0' }"
              color="pink"
              v-for="item in item.sortFlag"
              :key="item.id"
              v-html="item.name"
            ></a-tag>
          </div>

          <ul class="search-middle-num">
            <li>
              <h5>{{ item.fansNum }}</h5>
              <p>粉丝数</p>
            </li>
            <li>
              <h5>{{ item.videoNum }}</h5>
              <p>作品发布数</p>
            </li>
            <li>
              <h5>{{ item.avgPlayNum }}</h5>
              <p>平均播放数</p>
            </li>
            <li>
              <h5>{{ item.avgCommentNum }}</h5>
              <p>平均评论数</p>
            </li>
            <li>
              <h5>{{ item.avgPraiseNum }}</h5>
              <p>平均点赞数</p>
            </li>
          </ul>
        </div>

        <div class="search-right">
          <span>
            <a-tooltip placement="top">
              <template slot="title">
                <span>收藏</span>
              </template>
              <a-icon
                type="star"
                :theme="item.isCollect ? 'filled' : 'outlined'"
                :style="{ fontSize: '36px', color: '#FFBE31' }"
                class="hoverStar"
                @click="onChangeStart(item, index)"
              />
            </a-tooltip>
          </span>
          <span class="search-right-cloud">
            <h3>{{ item.indexNum }}</h3>
            <a-popover placement="bottomLeft" :title="false" :style="{ color: '#DEDEDE' }">
              <template slot="content">
                <p style="width: 200px;">云指数是系统基于账号粉丝活跃度、作品原创度、作品内容质量、作品完播度以及平均评论和点赞量等数据分析得出的综合评分</p>
              </template>
              <span>云指数</span>
              <a-icon type="question-circle" />
            </a-popover>
          </span>
        </div>
      </div>
    </a-col>

    <a-col :span="24">
      <!-- 收藏账号 -->
      <a-modal
        title="添加收藏分组"
        :visible="visible"
        :destroyOnClose="true"
        width="420px"
        :footer="null"
        @cancel="handleCancel"
      >
        <Collect :kolId="kolId" @lightUp="lightUp" />
      </a-modal>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator'
import { heightLight } from '@/utils/util'
import Collect from '@/components/Collect/Collect.vue'

@Component({
  components: {
    Collect
  }
})
export default class List extends Vue {
  @Prop({ default: {} }) private pageInfo!: any

  @Ref() private searchBtn: any

  private active?: number = -1
  private timeout?: any = null
  private visible: boolean = false
  private kolId?: string = ''

  private data() {
    return {
      heightLight
    }
  }

  // Mouse Move
  private onMoveEnter(index: number) {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
    this.timeout = setTimeout(() => {
      this.searchBtn[index].style.display = 'block'
      this.active = index
    }, 300)
  }

  private onMoveLeave(index: number) {
    if (this.timeout) {
      clearTimeout(this.timeout)
      this.timeout = null
    }
    this.timeout = setTimeout(() => {
      this.active = -1
    }, 300)
  }

  // 查看详情
  private handleDetail(kolId: string): void {
    const { href } = this.$router.resolve({
      path: '/rank/detail',
      query: {
        kolId: kolId
      }
    })
    window.open(href, '_blank')
  }

  // 相似号
  private handleSimilar(kolId: string): void {
    const { href } = this.$router.resolve({
      path: '/similar',
      query: {
        kolId: kolId
      }
    })
    window.open(href, '_blank')
  }

  // 投前分析
  private handleAnalysis(kolId: string): void {
    const { href } = this.$router.resolve({
      path: '/analysis',
      query: {
        kolId: kolId
      }
    })
    window.open(href, '_blank')
  }

  // 收藏
  private onChangeStart(recored: any, index: number) {
    const { pageInfo } = this
    const target = pageInfo.result.filter(
      (item: any) => item.kolId === recored.kolId
    )[0]

    if (!target.isCollect) {
      this.visible = true
      this.kolId = recored.kolId
    } else {
      this.visible = false
      this.$message.warning('该账户已收藏')
    }

    this.pageInfo = pageInfo
  }

  private lightUp(star: boolean, id: string) {
    if (star) {
      const { pageInfo } = this
      const target = pageInfo.result.filter((item: any) => item.kolId === id)[0]

      if (target) {
        target.isCollect = true
      }

      this.pageInfo = pageInfo
    }
  }

  // Modal
  private handleCancel(): void {
    this.visible = false
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;

  .search-content {
    margin-bottom: 24px;
    padding: 12px;
    border: 1px solid #ececec;
    border-color: rgba(0, 0, 0, 0.08);
    position: relative;
    background: #fff;
    border-radius: 4px;
    transition: all 0.3s;
    width: 900px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:hover {
      border-color: rgba(0, 0, 0, 0.09);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
    }

    .search-btn {
      position: absolute;
      right: 12px;
      top: 12px;
      display: none;

      .ant-btn {
        margin: 0 12px;
      }
    }

    .search-left {
      width: 130px;
      display: flex;
      justify-content: center;
    }

    .search-middle {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      padding: 24px 12px 0;

      .search-middle-user {
        border-bottom: 1px solid #ececec;
        padding: 12px;

        .search-middle-user-name {
          display: flex;
          align-items: center;
          margin-bottom: 8px;

          span {
            margin-right: 8px;
          }

          span:nth-child(1) {
            a {
              font-size: 16px;
              font-weight: 400;
              color: #3c3c3c;
            }
          }

          span:nth-child(2) {
            font-size: 12px;
            font-weight: 400;
            color: #fff;
            background: #eb000e;
            padding: 1px 4px;
            border-radius: 2px;
          }

          span:nth-child(3) {
            font-size: 12px;
            font-weight: 400;
            color: #fff;
            background: #e24f86;
            padding: 1px 4px;
            border-radius: 2px;
          }

          span:nth-child(4) {
            font-size: 12px;
            font-weight: 400;
            color: #ef73a9;
            border: 1px solid #e24f86;
            padding: 1px 4px;
            border-radius: 2px;
          }
        }

        .search-middle-user-text {
          color: #c6c6c6;
          font-weight: 400;
          line-height: 20px;
          .ellipsisMore();
        }
      }

      .search-middle-num {
        display: flex;
        justify-content: space-between;
        padding: 12px;

        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          h5 {
            font-size: 20px;
            font-weight: 500;
            color: #303133;
            line-height: 30px;
          }

          p {
            color: #c6c6c6;
            font-weight: 400;
            line-height: 22px;
          }
        }
      }
    }

    .search-right {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 160px;

      .hoverStar {
        transition: all 0.3s;
      }

      .hoverStar:hover {
        transform: scale(1.1);
      }

      .search-right-cloud {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h3 {
          font-size: 24px;
          font-weight: 500;
          color: @active;
          line-height: 24px;
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>
