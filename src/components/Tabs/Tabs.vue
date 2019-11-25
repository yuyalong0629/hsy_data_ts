<template>
  <div class="tabs">
    <strong :style="{ marginRight: 8 }">{{ tagName }}:</strong>
    <div class="rank-list-item-tags">
      <template v-for="(tag, index) in tagInfos">
        <a-checkable-tag
          :key="index"
          :checked="index === activeIndex"
          @change="(checked) => handleChange(tag, checked, index)"
        >{{ tag.name || tag.sortName }}</a-checkable-tag>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Name extends Vue {
  @Prop({ default: [] }) private tagInfos!: object[]
  @Prop({ default: '' }) private tagName!: string

  private timer: any
  private activeIndex: number = 0

  // nav 切换
  private handleChange(tag: any, checked: boolean, index: number): void {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
    this.timer = setTimeout(() => {
      console.log(tag)
      this.activeIndex = index
    }, 300)
  }
}
</script>

<style lang="less" scoped>
.tabs {
  margin: 12px 0 0;
  display: flex;
  flex-wrap: wrap;

  strong {
    flex: 0 0 80px;
    padding-top: 2px;
    font-size: 14px;
    line-height: 16px;
  }

  .rank-list-item-tags {
    flex: 1;

    .ant-tag {
      margin: 0 10px 10px 0;
    }
  }
}
</style>
