<template>
  <div class="carousel">
    <h3 class="carousel-title">海量账号 随意搜索</h3>

    <div class="carousel-container">
      <div class="carousel-swiper">
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
      </div>

      <ul class="carousel-text">
        <li
          :class="{ activeIndex: targetIndex === item.index }"
          v-for="item of listData"
          :key="item.index"
        >
          <p style="font-weight: bold;">{{ item.title }}</p>
          <p v-for="(cItem,index) of item.text" :key="index">{{ cItem }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Carousel extends Vue {
  private list: object[] = [
    {
      index: '0',
      img: require('@/assets/images/banner05.png')
    },
    {
      index: '1',
      img: require('@/assets/images/banner01.png')
    },
    {
      index: '2',
      img: require('@/assets/images/banner03.png')
    },
    {
      index: '3',
      img: require('@/assets/images/banner02.png')
    },
    {
      index: '4',
      img: require('@/assets/images/banner04.png')
    }
  ]
  private targetIndex: number = 0
  private listData: object[] = [
    {
      index: 0,
      title: '账号搜索',
      text: [
        '关键词搜索——模糊语义兼顾精确包含',
        '高级搜索——多标签和多维度筛选条件'
      ]
    },
    {
      index: 1,
      title: '排行榜单',
      text: ['总榜\t月周涨粉榜\t月周掉粉榜']
    },
    { index: 2, title: '投前分析', text: ['历史数据统计\t粉丝画像'] },
    {
      index: 3,
      title: '内容搜索',
      text: ['作品标题+简介\t作品标签+评论\t纯评论内容']
    },
    {
      index: 4,
      title: '数据监测',
      text: ['监测对象：发布作品/账号', '监测时长：24h / 48h / 72h']
    }
  ]
  private data() {
    const _this = this
    return {
      swiperOption: {
        loop: true,
        direction: 'vertical',
        speed: 500,
        autoplay: {
          delay: 3000 // 1秒切换一次
        },
        mousewheel: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        on: {
          slideChangeTransitionStart: function(): void {
            _this.targetIndex = (this as any).realIndex
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.carousel {
  .basicWidth();
  padding: 48px 0 120px;

  .carousel-title {
    font-size: 24px;
    text-align: center;
    padding: 12px 0 60px;
  }

  .carousel-container {
    .basicWidth();
    height: 400px;
    display: flex;

    .carousel-swiper {
      width: 830px;
      height: 400px;

      .swiper-container {
        width: 100%;
        height: 100%;

        .inner {
          width: 100%;
          height: 100%;
          display: flex;
          border-width: 1px;
          border-style: solid;
          border-color: rgb(232, 232, 232);
          border-image: initial;
          justify-content: center;
          align-items: center;
          transition: all 0.3s ease 0s;

          img {
            height: 100%;
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

    .carousel-text {
      width: 300px;
      display: flex;
      margin-left: 70px;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      li {
        padding: 6px 0;
        list-style: disc;
        width: 100%;
        cursor: pointer;

        p {
          line-height: 22px;
          font-size: 14px;
          font-weight: 500;
        }
      }

      .activeIndex {
        color: @active;
      }
    }
  }
}
</style>
