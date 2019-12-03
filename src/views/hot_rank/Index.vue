<template>
  <div class="hot">
    <a-row>
      <!-- bilibili -->
      <a-col :span="24">
        <div class="hot-bilibili-title">
          <img src="../../assets/images/about1.png" alt />
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
                style="width: 80px; margin-right: 6px;"
                @change="handleChangeSelect"
              >
                <a-select-option value="jack">Jack</a-select-option>
                <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option>
              </a-select>
              <a-select
                defaultValue="lucy"
                size="small"
                style="width: 80px"
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
              <div class="hot-bilibili-content-top">1</div>
              <div class="hot-bilibili-content-img">1</div>
              <div class="hot-bilibili-content-text">1</div>
              <div class="hot-bilibili-content-score">1</div>
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
        }

        .hot-bilibili-content-img {
          flex: 0 0 180px;
        }

        .hot-bilibili-content-text {
          flex: 1;
        }

        .hot-bilibili-content-score {
          flex: 0 0 200px;
        }
      }
    }
  }
}
</style>
