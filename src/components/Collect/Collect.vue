<template>
  <div class="collect">
    <div class="collection-add">
      <span @click="onClickCollection">
        <a-icon type="plus-circle" />新建分组
      </span>
    </div>

    <a-modal
      title="新建后直接添加到新分组里"
      :visible="visible"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-form :form="form">
        <a-form-item label="分组名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }">
          <a-input
            v-decorator="['themeName', { rules: [{ required: true, message: '分组名称不能为空' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>

    <a-list :loading="loading" itemLayout="horizontal" :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="false" @click="addCollect(item.id)">
          <a slot="title" href="javascript:;">{{item.themeName}}</a>
        </a-list-item-meta>
        <div>{{item.countNum}}</div>
      </a-list-item>
    </a-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { collectGroupList, addCollectGroup, addCollect } from '@/api/collection'

@Component
export default class Collect extends Vue {
  @Prop({ default: '' }) private kolId!: string

  private loading: boolean = false
  private data: any[] = []
  private form!: any
  private visible: boolean = false
  private confirmLoading: boolean = false
  private inputValue: string = ''

  private beforeCreate() {
    this.form = this.$form.createForm(this)
  }

  private mounted() {
    this.collectGroupList()
  }

  // 初始化收藏数据
  private collectGroupList() {
    this.loading = true
    return collectGroupList()
      .then((res: any) => {
        if (res.code === 200) {
          this.data = res.userThemeInfos
        }
      })
      .catch((err: any) => {
        this.$message.error(err)
      })
      .finally(() => (this.loading = false))
  }

  // 新建分组
  private onClickCollection() {
    this.visible = true
  }

  // 添加收藏
  private handleOk(e: any) {
    ;(this.form as any).validateFields((err: any, values: any) => {
      if (!err) {
        // 添加分组
        this.confirmLoading = true
        addCollectGroup({ ...values })
          .then((res: any) => {
            if (res.code === 200) {
              const timer = setTimeout(() => {
                this.$message.success(res.message)

                this.visible = false
                this.confirmLoading = false
                this.collectGroupList()

                window.clearTimeout(timer)
              }, 1000)
            } else {
              this.$message.error(res.message)
              this.confirmLoading = false
            }
          })
          .catch(err => {
            this.confirmLoading = false
            this.$message.error(err)
          })
      }
    })
  }

  // 取消
  private handleCancel(e: any) {
    this.visible = false
  }

  // 添加收藏
  private addCollect(id: string) {
    addCollect({
      kolId: this.kolId || this.$route.query.kolId,
      themeId: id
    })
      .then((res: any) => {
        if (res.code === 200) {
          this.$message.success(res.message)
          this.visible = false
          this.lightUp(true, this.kolId)
        } else {
          this.$message.error(res.message)
          this.lightUp(false)
        }
      })
      .finally(() => {
        this.collectGroupList()
      })
  }

  // 回调
  @Emit('lightUp')
  private lightUp(star: boolean = false, kolId: string = '') {}
}
</script>

<style lang="less" scoped>
.collect {
  height: 500px;
  overflow: auto;

  .collection-add {
    cursor: pointer;
    height: 30px;
    line-height: 30px;
    text-align: center;

    i {
      margin: 0 4px;
    }
  }
}
.ant-list-item {
  cursor: pointer;
}
</style>
