<template>
  <div class="carousel">
    <swiper :options="swiperOption" ref="mySwiper">
      <!-- slides -->
      <swiper-slide v-for="item of list" :key="item.index">
        <div class="inner">
          <img :src="item.img" alt />
        </div>
      </swiper-slide>
      <!-- Optional controls -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <a-button class="carousel-btn" type="primary" size="large" style="background: #ff5847;">
      <router-link to="/rank">立即使用</router-link>
    </a-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Carousel extends Vue {
  private list: any[] = [
    {
      index: '0',
      img: require('@/assets/images/hbanner0.png')
    },
    {
      index: '1',
      img: require('@/assets/images/hbanner1.png')
    },
    {
      index: '2',
      img: require('@/assets/images/hbanner2.png')
    },
    {
      index: '3',
      img: require('@/assets/images/hbanner3.png')
    }
  ]

  private data() {
    const _this = this
    return {
      swiperOption: {
        loop: true,
        speed: 500,
        effect: 'fade',
        autoplay: {
          disableOnInteraction: false,
          delay: 5000 // 1秒切换一次
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.carousel {
  width: 100%;
  height: 600px;
  position: relative;

  .carousel-btn {
    z-index: 1000;
    position: absolute;
    bottom: 48px;
    left: 50%;
    margin-left: -79px;
  }

  .ant-btn-lg {
    width: 160px;
    height: 48px;
  }

  .swiper-container {
    width: 100%;
    height: 100%;

    .inner {
      width: 100%;
      height: 100%;
      display: flex;
      border-image: initial;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease 0s;

      img {
        height: 100%;
        width: 100%;
      }
    }

    .inner:hover {
      box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.19);
    }

    .swiper-pagination-bullet-active {
      background: #ff5847;
    }
  }
}
</style>
