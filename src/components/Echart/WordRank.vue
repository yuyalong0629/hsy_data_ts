<template>
  <div class="word-rank" style="width: 100%; height: 340px;">
    <a-row :gutter="16" class="word-rank-wrapper">
      <a-col :span="12" class="word-rank-left">
        <p
          v-for="(item, index) of word.slice(0, 10)"
          :key="index"
        >{{`${index + 1}-${item.name}（${item.value}）`}}</p>
      </a-col>
      <a-col :span="12" class="word-rank-right">
        <p
          v-for="(item, index) of word.slice(10, 20)"
          :key="index"
        >{{`${index + 11}-${item.name}（${item.value}）`}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class WordRank extends Vue {
  @Prop({ default: () => [] }) private word!: []
}
</script>

<style lang="less" scoped>
.word-rank {
  border: 1px solid #ececec;
  margin: 12px 12px 12px 0;
  border-radius: 4px;
  padding: 12px;

  .word-rank-wrapper {
    display: flex;
    justify-content: center;
    height: 100%;

    .word-rank-left,
    .word-rank-right {
      display: flex;
      flex-direction: column;
      align-content: center;
      justify-content: space-around;

      p {
        text-align: left;
        padding-left: 24px;
      }
    }
  }
}
</style>
