<template>
  <div class="hot">
    <a-row>
      <!-- bilibili -->
      <a-col :span="24">
        <div class="hot-bilibili-title">
          <img src="@/assets/images/about1.png" alt />
          <strong>排行榜</strong>
        </div>

        <div class="hot-bilibili-wrapper">
          <div class="hot-bilibili-nav">
            <a-radio-group defaultValue="0" buttonStyle="solid">
              <a-radio-button value="0">全站榜</a-radio-button>
              <a-radio-button value="1">原创榜</a-radio-button>
              <a-radio-button value="2">新番榜</a-radio-button>
              <a-radio-button value="3">影视榜</a-radio-button>
              <a-radio-button value="4">新人榜</a-radio-button>
            </a-radio-group>

            <div class="hot-bilibili-nav-slect">
              <a-select
                defaultValue="lucy"
                size="small"
                style="width: 100px; margin-right: 6px;"
                @change="handleChangeSelect"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
              <a-select
                defaultValue="lucy"
                size="small"
                style="width: 100px"
                @change="handleChangeSelect"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
            </div>
          </div>

          <div class="hot-bilibili-content">
            <div>
              <a-checkable-tag
                v-for="(tag, index) in tags"
                :key="tag.id"
                :checked="index === activeIndex"
                @change="(checked) => handleChangeTag(tag, checked, index)"
              >{{ tag.name }}</a-checkable-tag>
            </div>

            <section class="hot-bilibili-content-list">
              <div class="hot-bilibili-content-top">
                <h3>1</h3>
              </div>
              <div class="hot-bilibili-content-img">
                <img v-lazy="require('@/assets/images/about1.png')" alt />
              </div>
              <div class="hot-bilibili-content-text">
                <h4>如何在晒超黑之白修复？！亲身实践美东方故事白大亲身实</h4>
                <ul class="hot-bilibili-content-text-label">
                  <li>
                    <a-icon type="youtube" theme="filled" />
                    <span>云指数</span>
                  </li>
                  <li>
                    <a-icon type="youtube" theme="filled" />
                    <span>云指数</span>
                  </li>
                  <li>
                    <a-icon type="youtube" theme="filled" />
                    <span>云指数</span>
                  </li>
                </ul>
              </div>
              <div class="hot-bilibili-content-score">
                <h3>8383424</h3>
                <p>综合得分</p>
              </div>
            </section>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Hot extends Vue {
  private tags: any[] = [
    { id: 0, name: '全部' },
    { id: 1, name: '动画' },
    { id: 2, name: '国创相关' },
    { id: 3, name: '音乐' },
    { id: 4, name: '舞蹈' },
    { id: 5, name: '游戏' }
  ]
  private selectedTags: any[] = []
  private activeIndex: number = 0

  // select
  private handleChangeSelect(value: string): void {
    console.log(`selected ${value}`)
  }

  // Tags
  private handleChangeTag(tag: any, checked: boolean, index: number): void {
    this.activeIndex = index
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.hot {
  .basicWidth();
  padding: 24px 0;

  .hot-bilibili-title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 148px;
      height: 48px;
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
              margin-right: 8px;
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
