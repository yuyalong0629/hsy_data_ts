<template>
  <div class="home">
    <HeaderCarousel />

    <div ref="core">
      <rote />
    </div>

    <!-- <Header :fansInfo="fansInfo" /> -->

    <Work :helpUserData="helpUserData" :autoplay="autoplay" />

    <Carousel />

    <More />

    <Classroom :newsContentInfoList="newsContentInfoList" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { pkData } from '@/api/index'
import Header from './pages/Header.vue'
import Rote from './pages/Rote.vue'
import Work from './pages/Work.vue'
import Carousel from '@/components/Carousel/Carousel.vue'
import HeaderCarousel from '@/components/Carousel/HeaderCarousel.vue'
import More from './pages/More.vue'
import Classroom from './pages/Classroom.vue'

@Component({
  name: 'home',
  components: {
    Header,
    Rote,
    Work,
    Carousel,
    More,
    Classroom,
    HeaderCarousel
  }
})
export default class Home extends Vue {
  private fansInfo: any[] = []
  private helpUserData: object = {}
  private newsContentInfoList: object[] = []
  private autoplay: boolean = false

  private mounted() {
    pkData().then((res: any) => {
      if (res.code === 200 || res.code === 1) {
        // this.fansInfo = res.bilibiliKolPkDatas || []
        this.helpUserData = res.helpUserData || {}
        this.newsContentInfoList = res.newsContentInfoList || []
      }
    })
    // 监听滚动事件
    window.addEventListener('scroll', this.handleScroll)
  }

  destroyed() {
    // 移除监听事件
    window.removeEventListener('scroll', this.handleScroll)
  }

  private handleScroll() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop
    const offsetTop = (this.$refs.core as any).offsetTop

    if (scrollTop > offsetTop) {
      this.autoplay = true
    } else {
      this.autoplay = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.home {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
