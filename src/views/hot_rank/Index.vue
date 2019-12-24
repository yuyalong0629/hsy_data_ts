<template>
  <div class="hot">
    <a-row>
      <!-- bilibili -->
      <a-col :span="24">
        <div class="hot-bilibili-title">
          <img v-lazy="require('@/assets/images/BILIBILI_LOGO.png')" alt />
        </div>

        <div class="hot-bilibili-wrapper">
          <div class="hot-bilibili-nav">
            <a-radio-group defaultValue="0" buttonStyle="solid" @change="onChangeRadio">
              <a-radio-button value="0">全站榜</a-radio-button>
              <a-radio-button value="1">原创榜</a-radio-button>
              <a-radio-button value="2">新人榜</a-radio-button>
            </a-radio-group>

            <div class="hot-bilibili-nav-slect"></div>
          </div>

          <div class="hot-bilibili-content">
            <a-spin :spinning="spinning">
              <div>
                <a-checkable-tag
                  v-for="(tag, index) in themeInfos"
                  :key="tag.id"
                  :checked="index === activeIndex"
                  @change="(checked) => handleChangeTag(tag, checked, index)"
                >{{ tag.name }}</a-checkable-tag>
              </div>

              <a-empty v-if="!bilibiliRankingDayDatas.length" />

              <RecycleScroller
                v-else
                class="scroller"
                :items="bilibiliRankingDayDatas"
                :item-size="120"
                key-field="id"
                v-slot="{ item, index }"
              >
                <section class="hot-bilibili-content-list">
                  <div class="hot-bilibili-content-top">
                    <h3>{{ +index + 1 }}</h3>
                  </div>
                  <div class="hot-bilibili-content-img">
                    <a :href="item.sourceUrl" target="_blank">
                      <img v-lazy="item.coverImg" alt />
                    </a>
                  </div>
                  <div class="hot-bilibili-content-text">
                    <a :href="item.sourceUrl" target="_blank">
                      <h4>{{ item.title }}</h4>
                    </a>
                    <ul class="hot-bilibili-content-text-label">
                      <li>
                        <a-icon type="youtube" theme="filled" />
                        <span>{{ item.playNum }}</span>
                      </li>
                      <li>
                        <a-icon type="message" theme="filled" />
                        <span>{{ item.commentNum }}</span>
                      </li>
                      <li>
                        <a-icon type="hdd" theme="filled" />
                        <span>{{ item.sortFlag }}</span>
                      </li>
                    </ul>
                  </div>
                  <div class="hot-bilibili-content-score">
                    <h3>{{ item.score }}</h3>
                    <p>综合得分</p>
                  </div>
                </section>
              </RecycleScroller>
            </a-spin>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { hostRanking } from '@/api/rank'
import { RecycleScroller } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

interface Parmas {
  type: string
  tId: string
}

@Component({
  components: {
    RecycleScroller
  }
})
export default class Hot extends Vue {
  private spinning: boolean = false
  private themeInfos: any[] = []
  private bilibiliRankingDayDatas: any[] = []
  private activeIndex: number = 0
  private params: Parmas = {
    type: '0',
    tId: '0'
  }

  private mounted() {
    this.getHotRank({ ...this.params })
  }

  // 火热帮 Function
  public getHotRank(params?: Parmas): any {
    this.spinning = true
    return hostRanking(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.themeInfos = res.themeInfos
          this.bilibiliRankingDayDatas = res.bilibiliRankingDayDatas
        }
      })
      .catch(() => this.$message.error('请求超时'))
      .finally(() => (this.spinning = false))
  }

  // 榜单切换
  public onChangeRadio(e: any): void {
    this.activeIndex = 0

    const { params } = this
    params.type = e.target.value

    this.getHotRank({ ...params, tId: '0' })

    this.params = params
  }

  // Tags
  private handleChangeTag(tag: any, checked: boolean, index: number): void {
    this.activeIndex = index

    const { params } = this
    params.tId = tag.id

    this.getHotRank({ ...params })

    this.params = params
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.hot {
  .basicWidth();
  padding: 24px 0;
  height: 100%;

  .ant-empty {
    margin: 100px auto;
  }

  .hot-bilibili-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 120px;
      height: 48px;
      margin-bottom: 12px;
    }
  }

  .hot-bilibili-wrapper {
    display: flex;
    flex-direction: column;

    .hot-bilibili-nav {
      display: flex;
      justify-content: space-between;

      .hot-bilibili-nav-slect {
        display: flex;
        align-items: center;
      }
    }

    .hot-bilibili-content {
      margin: 12px 0;
      border: 1px solid #ececec;
      padding: 12px;
      border-radius: 4px;
      display: flex;
      flex-direction: column;

      .scroller {
        height: 100%;
      }

      .hot-bilibili-content-list {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ececec;
        padding: 12px 0;

        .hot-bilibili-content-top {
          flex: 0 0 80px;

          h3 {
            font-size: 32px;
            font-weight: bold;
            color: #9099a3;
            text-align: center;
          }
        }

        .hot-bilibili-content-img {
          flex: 0 0 180px;

          img {
            width: 140px;
            height: 88px;
          }
        }

        .hot-bilibili-content-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;

          h4 {
            color: #202020;
            font-size: 16px;
            font-weight: bold;
            padding: 24px 0;
          }

          .hot-bilibili-content-text-label {
            display: flex;
            align-items: center;

            li {
              margin-right: 12px;

              span {
                margin-left: 4px;
              }
            }
          }
        }

        .hot-bilibili-content-score {
          flex: 0 0 200px;
          display: flex;
          flex-direction: column;
          align-items: center;

          h3 {
            color: #5496d4;
            font-size: 18px;
            font-weight: bold;
            line-height: 30px;
          }

          p {
            color: #b3b9c6;
            font-weight: 500;
          }
        }
      }
    }
  }
}
</style>
