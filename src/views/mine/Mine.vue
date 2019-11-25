<template>
  <div class="mine">
    <div class="mine-container">
      <ul class="mine-breadcrumb">
        <li
          v-for="item of breadcrumb"
          :class="{ activeBreadcrumb: isActiveBreadcrumb === item.index }"
          :key="item.index"
          @click="changeBreadcrumb(item.index)"
        >
          <icon-font class="mine-breadcrumb-icon" :type="item.icon" />
          <span class="mine-breadcrumb-text">{{ item.text }}</span>
          <span v-if="item.index !== 2" class="mine-breadcrumb-separate">/</span>
        </li>
      </ul>
      <div class="mine-content">
        <component
          :is="isActiveBreadcrumb === 0 ? 'hsy-classroom' : (isActiveBreadcrumb === 1 ? 'hsy-about' : 'hsy-contact')"
        ></component>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Icon } from 'ant-design-vue'
import About from '@/components/About/About.vue'
import Classroom from '@/components/Classroom/Classroom.vue'
import Contact from '@/components/Contact/Contact.vue'

const MyIcon: any = Icon.createFromIconfontCN({
  scriptUrl: require('../../assets/font/iconfont')
})

@Component({
  components: {
    'hsy-classroom': Classroom,
    'hsy-about': About,
    'hsy-contact': Contact,
    'icon-font': MyIcon
  }
})
export default class Mine extends Vue {
  private breadcrumb: object[] = [
    { index: 0, icon: 'icon-xuexi1', text: '火烧云课堂' },
    { index: 1, icon: 'icon-icon_home', text: '关于我们' },
    { index: 2, icon: 'icon-lianxiwomendianhua', text: '联系我们' }
  ]
  private isActiveBreadcrumb: number = 0
  private setComponent: string = 'hsy-classroom'

  private mounted() {
    if (this.$route.query.index) {
      this.isActiveBreadcrumb = +this.$route.query.index
    }
  }

  private changeBreadcrumb(index: number): void {
    this.isActiveBreadcrumb = index
  }
}
</script>

<style lang="less" scoped>
.mine {
  width: 100%;
  height: 100%;

  .mine-container {
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .mine-breadcrumb {
      padding: 24px 0;
      display: flex;

      li {
        cursor: pointer;
        margin-right: 12px;
        display: flex;
        align-items: center;
        color: #e2e2e2;
        font-size: 16px;

        .mine-breadcrumb-icon {
          margin-right: 2px;
          font-size: 18px;
        }

        .mine-breadcrumb-separate {
          margin-left: 12px;
        }
      }

      .activeBreadcrumb {
        color: #2a2a2a;
      }
    }

    .mine-content {
      flex: 1;
      padding-bottom: 24px;
    }
  }
}
</style>
