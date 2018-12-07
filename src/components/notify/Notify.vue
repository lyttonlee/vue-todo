<template>
  <div class="notify" v-if="visable">
    <div class="container">
      <div class="title">
        {{title}}
      </div>
      <div class="content">
        {{content}}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
@Component
export default class Notify extends Vue {
  @Prop() public title!: string
  @Prop() public content!: string
  // @Prop({default: 'primary'}) public type!: string
  // 控制notify是否可见
  public visable: boolean = true
  // 持续时间
  public durtion: number = 3000
  public timer!: any
  // 销毁组件
  public destroyElement() {
    this.$el.removeEventListener('transitionend', this.destroyElement)
    this.$destroy()
    if (this.$el.parentNode) {
      this.$el.parentNode.removeChild(this.$el)
    }
  }
  public doClose() {
    this.visable = false
    this.destroyElement()
  }
  public createTime() {
    // console.log('start')
    if (this.durtion) {
      this.timer = setTimeout(() => {
        // console.log('done')
        this.doClose()
      }, this.durtion)
    }
  }
  // 挂载时创建定时器
  public mounted() {
    this.createTime()
  }
  // 销毁前清除定时器
  public beforeDestroy() {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  }
}
</script>
<style lang="less" scoped>
.notify {
  position: fixed;
  width: 100%;
  top: 20%;
  .container {
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    // height: 25vh;
    padding: 15px;
    background: rgba(145, 180, 145, 0.199);
    border-radius: 5vh;
    flex-direction: column;
    .title {
      font-size: 1.2rem;
      align-self: flex-start;
      text-indent: 1rem;
      color: rgb(29, 28, 28);
    }
  }
}
</style>
