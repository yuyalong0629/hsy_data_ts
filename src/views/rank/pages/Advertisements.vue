<template>
  <div class="advertisements">
    <a-row>
      <a-col :span="24" class="advertisements-content-title">
        <h4>商品分类报告</h4>
      </a-col>

      <a-col :span="24">
        <Tabs :tagInfos="classification" @onChangeTag="onChangeTagClass" tagName="行业分类" />
        <Tabs
          v-if="classificationTwo.length"
          :tagInfos="classificationTwo"
          @onChangeTag="onChangeTagClassTwo"
          tagName="二级分类"
        />
      </a-col>
    </a-row>

    <a-row :gutter="16" class="advertisements-word-cloud">
      <a-col :span="24" class="advertisements-content-title">
        <h4>商品关键词云图</h4>
      </a-col>
    </a-row>

    <a-row :gutter="16" v-for="item of 6" :key="item">
      <a-col :span="12">
        <h5>作品标题-简介商品关键词云库</h5>
        <Wordcloud />
      </a-col>
      <a-col :span="11" :offset="1">
        <h5>品牌关键词榜单</h5>
        <WordRank />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Tabs from '@/components/Tabs/Tabs.vue'
import Wordcloud from '@/components/Echart/Wordcloud.vue'
import WordRank from '@/components/Echart/WordRank.vue'

@Component({
  components: {
    Tabs,
    Wordcloud,
    WordRank
  }
})
export default class Advertisements extends Vue {
  private classification: any[] = []
  private classificationTwo: any[] = []

  // 商品分类
  private onChangeTagClass(value: any) {}

  // 商品分类 二级分类
  private onChangeTagClassTwo(value: any) {}
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.advertisements {
  .advertisements-content-title {
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
  }

  .advertisements-word-cloud {
    h4 {
      margin: 12px 0;
    }
  }
}
</style>
