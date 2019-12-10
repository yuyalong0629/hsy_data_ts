<template>
  <div class="word-rank" style="width: 100%; height: 340px;">
    <a-row :gutter="16" class="word-rank-wrapper">
      <a-col :span="12" class="word-rank-left">
        <p v-for="(item, index) of 10" :key="index">{{`${index}-美康粉黛（35）`}}</p>
      </a-col>
      <a-col :span="12" class="word-rank-right">
        <p v-for="(item, index) of 10" :key="index">{{`${index}-美康粉黛（35）`}}</p>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class WordRank extends Vue {}
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
        text-align: center;
      }
    }
  }
}
</style>
