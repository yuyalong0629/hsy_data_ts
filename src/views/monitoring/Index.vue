<template>
  <div class="monitor" ref="anchor">
    <div class="monitor-radio">
      <a-radio-group @change="onChangeMonitor" :value="monitor">
        <a-radio :value="1">即时监控</a-radio>
        <a-radio :value="2">预约监控</a-radio>
      </a-radio-group>

      <p class="monitor-radio-link">广告作品链接</p>
      <p class="monitor-radio-instructions">可对媒体主发布的广告进行即时监控，提供分钟级的作品阅读数/点赞数/收藏数监测，追踪广告效果动态</p>

      <div class="monitor-input" v-if="monitor === 1">
        <a-input placeholder="请粘贴作品链接" v-model="content" size="large" />
      </div>

      <div class="monitor-search" v-if="monitor === 2">
        <a-input-search
          placeholder="请输入达人名称"
          size="large"
          v-model="wiseName"
          @search="onSearch"
          enterButton
        />
        <ul class="monitor-search-result">
          <li
            :class="{active: isActive === index}"
            v-for="(item, index) of searchInfo"
            :key="item.id"
            @click="onClickActive(item.kolId, index)"
          >
            <a-avatar :src="item.kolImg" />
            <span class="monitor-search-result-name">{{ item.kolName }}</span>
          </li>
        </ul>
        <p class="monitor-search-time">
          预约监控时段 (
          <span>若在时间段内无广告内容发布，本次监控默认完成，但无监控报告</span>)
        </p>
        <a-range-picker
          showTime
          :value="timeValue"
          :disabledDate="disabledDate"
          format="YYYY-MM-DD HH:mm:ss"
          style="width: 420px;"
          @change="onChangeDate"
          @ok="onOk"
          size="large"
        />
      </div>

      <p class="monitor-time">监控时长</p>
      <a-radio-group :value="monitorTime">
        <a-radio @click="onChangeMonitorTime(24)" :value="24">24小时</a-radio>
        <a-radio @click="onChangeMonitorTime(48)" :value="48">48小时</a-radio>
        <a-radio @click="onChangeMonitorTime(72)" :value="72" v-if="this.monitor === 2">72小时</a-radio>
      </a-radio-group>

      <div class="monitor-start">
        <a-button type="primary" size="large" @click="onClickMonitor">开始监测</a-button>
      </div>

      <a-spin :spinning="spinning">
        <MonitorList :monitorInfo="monitorInfo" />
      </a-spin>

      <a-row>
        <a-col :span="24" :style="{ margin: '12px 0' }">
          <a-pagination
            showQuickJumper
            :current="current"
            :pageSize="pageSize"
            :hideOnSinglePage="true"
            :total="total"
            @change="onChangePage"
          />
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Ref } from 'vue-property-decorator'
import moment from 'moment'
import { addMonitor, searchKol, monitorHistory } from '@/api/monitor'
import MonitorList from './pages/MonitorList.vue'

@Component({
  components: {
    MonitorList
  }
})
export default class Monitoring extends Vue {
  @Ref() readonly anchor?: any

  private monitor: number = 1
  private monitorTime: number = 24
  private content: string = ''
  private wiseName: string = ''
  private isActive: number = 0
  private disabled: boolean = false
  private searchInfo: any[] = []
  private spinning: boolean = false
  private timeValue!: any[]
  private monitorInfo: object = {}
  // 分页
  private total: number = 100
  private current: number = 1
  private pageSize: number = 20

  private data() {
    return {
      moment,
      timeValue: [
        moment(new Date()),
        moment(new Date().setDate(new Date().getDate() + 1))
      ]
    }
  }

  private mounted() {
    this.monitorHistoryInfo({ pageNo: 0 })

    // 判断是否从详情页跳转
    if (this.$route.query.kolId && this.$route.query.name) {
      this.monitor = 2

      searchKol({
        keyword: encodeURI(encodeURI((this.$route.query as any).name))
      }).then((res: any) => {
        if (res.code === 200) {
          this.searchInfo = res.kolInfos
        } else {
          this.$message.error(res.message)
        }
      })
    }
  }

  // 监控 radio
  private onChangeMonitor(e: any) {
    this.monitor = e.target.value
    // 切换初始化监控时长 Radio
    this.monitorTime = 24
  }

  // 预约监控 搜索
  private onSearch(value: string): void {
    // 搜索列表
    searchKol({ keyword: encodeURI(encodeURI(value)) }).then((res: any) => {
      if (res.code === 200) {
        this.searchInfo = res.kolInfos
      } else {
        this.$message.error(res.message)
      }
    })
  }

  // Can not select days before today and today
  private disabledDate(current: any) {
    return current && current < moment().startOf('day')
  }

  // 监控时长 radio
  private onChangeMonitorTime(value: number) {
    this.monitorTime = value
  }

  // 预约监控 日期选择
  private onChangeDate(date: any, dateString: string) {
    this.timeValue = date
  }

  private onOk(value: string) {
    console.log('onOk: ', value)
  }

  // 预约监控 列表选中
  private onClickActive(id: string, key: number) {
    console.log(id)
    this.isActive = key
  }

  // 开始监控
  private onClickMonitor() {
    if (this.monitor === 1) {
      const data = {
        type: this.monitor,
        content: this.content,
        sTime: this.timeValue[0].format('YYYY-MM-DD HH:mm:ss') || '',
        eTime: this.timeValue[1].format('YYYY-MM-DD HH:mm:ss') || '',
        duration: this.monitorTime
      }

      this.addMonitor({ ...data }).then(() => {
        // 回调更新列表数据
        this.monitorHistoryInfo({ pageNo: 0 })
      })
    }

    if (this.monitor === 2) {
      // 获取预约监控搜索列表对应名字
      const target = this.searchInfo.filter(
        (item, index) => this.isActive === index
      )[0]
      const data = {
        type: this.monitor,
        content: target.kolId,
        sTime: this.timeValue[0].format('YYYY-MM-DD HH:mm:ss') || '',
        eTime: this.timeValue[1].format('YYYY-MM-DD HH:mm:ss') || '',
        duration: this.monitorTime
      }

      this.addMonitor({ ...data }).then(() => {
        // 回调更新列表数据
        this.monitorHistoryInfo({ pageNo: 0 })
      })
    }
  }

  // 分页
  public onChangePage(pageNumber: string): void {
    this.monitorHistoryInfo({ pageNo: +pageNumber - 1 })
    // 锚点
    ;(this.anchor as any).scrollIntoView(true)
  }

  // 添加监控 Function
  private addMonitor(params: any) {
    return addMonitor(params).then((res: any) => {
      if (res.code === 200) {
        console.log(res)
        this.$message.success(res.message)
        // 每次添加初始化列表
      } else {
        this.$message.error(res.message)
      }
    })
  }

  // 监控列表
  private monitorHistoryInfo(params: { pageNo: number }) {
    this.spinning = true
    return monitorHistory(params)
      .then((res: any) => {
        if (res.code === 200) {
          this.monitorInfo = res.page

          this.total = res.page && res.page.count
          this.current = res.page && res.page.index + 1
        } else {
          this.$message.error(res.message)
        }
      })
      .catch(err => this.$message.error(err))
      .finally(() => (this.spinning = false))
  }
}
</script>

<style lang="less" scoped>
@import '~@/assets/styles/variable.less';
@import '~@/assets/styles/mixins.less';

.monitor {
  .basicWidth();

  .monitor-radio {
    margin: 40px 0 10px;

    .monitor-radio-link {
      line-height: 30px;
      font-size: 16px;
      margin-top: 20px;
      font-weight: 600;
    }

    .monitor-radio-instructions {
      line-height: 30px;
      color: #999;
    }

    .monitor-input {
      width: 80%;
      margin: 10px 0;
    }

    .monitor-search {
      width: 80%;
      margin: 10px 0;
      .monitor-search-result {
        .active {
          border: 1px solid @active;
        }
        li {
          cursor: pointer;
          border: 1px solid #e8e8e8;
          border-radius: 4px;
          margin: 10px 0;
          padding: 10px;
          .ant-avatar {
            width: 40px;
            height: 40px;
          }
          .monitor-search-result-name {
            color: rgba(0, 0, 0, 0.65);
            transition: all 0.3s;
            font-size: 16px;
            font-weight: 500;
            line-height: 40px;
            height: 40px;
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
      .monitor-search-time {
        line-height: 30px;
        margin: 12px 0;
        font-size: 16px;
        font-weight: 600;
        span {
          color: #999;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
    .monitor-time {
      line-height: 50px;
      font-size: 16px;
      margin-top: 10px;
      font-weight: 600;
    }

    .monitor-start {
      margin: 30px 0;
      text-align: center;
    }

    .ant-pagination {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
