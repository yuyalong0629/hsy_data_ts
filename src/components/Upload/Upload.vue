<template>
  <div class="upload">
    <a-upload
      action="http://upload.hsydata.com/upload.htm"
      listType="picture-card"
      :fileList="fileList"
      :data="{'app':'userImages', 'type': 'json'}"
      @preview="handlePreview"
      @change="handleChange"
    >
      <div v-if="fileList.length < 1">
        <a-icon type="plus" />
        <div class="ant-upload-text">上传头像</div>
      </div>
    </a-upload>

    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator'

@Component
export default class Upload extends Vue {
  @Prop({ default: '' }) private userImage!: string

  private previewVisible!: boolean
  private previewImage!: string
  private propsFileList?: undefined
  private fileList?: any[]
  private count!: number

  private data() {
    return {
      previewVisible: false,
      previewImage: '',
      fileList: [],
      count: 0,
      propsFileList: undefined
    }
  }

  private handleCancel() {
    this.previewVisible = false
  }

  private handlePreview(file: any) {
    this.previewImage = file.url || file.thumbUrl
    this.previewVisible = true
  }

  private handleChange({ fileList }: any) {
    this.fileList = fileList
    this.count++
    this.propsFileList = undefined
    ;(this.fileList as any).forEach((item: any) => {
      if (item.response && item.response.resultCode === 0) {
        this.propsFileList = item.response.httpUrl

        this.propsFile(this.propsFileList)
      }
    })
  }

  @Emit('propsFile')
  private propsFile(propsFile: any): void {
    return propsFile
  }

  @Watch('userImage', { deep: true, immediate: true })
  private function(val: string) {
    this.fileList = []
    this.fileList.push({
      url: val,
      uid: Math.floor(Math.random() * 100),
      name: 'avator.png'
    })
  }
}
</script>

<style lang="less" scoped>
.upload {
  /deep/ .ant-upload-list-picture-card .ant-upload-list-item {
    border-radius: 50%;
    width: 86px;
    height: 86px;
    margin: 0px;
    .ant-upload-list-item-info {
      border-radius: 50%;
      span {
        height: 100%;
      }
    }
  }
  /deep/ .ant-upload.ant-upload-select-picture-card {
    border-radius: 50%;
    height: 86px;
    width: 86px;
  }
}
</style>
