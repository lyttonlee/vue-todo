<template>
  <div class="tomorrow">
    <div class="input-container">
      <input placeholder="what you want todo" v-model="content" class="input" type="text">
      <button :disabled="disabled" class="button" @click="addNewTodo"><i class="iconfont icon-add icon"></i></button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action} from 'vuex-class'
import {TodayTime, TomorrowTime} from '../utils/formatTime'
@Component
export default class Tomorrow extends Vue {
  content: string = ''
  get disabled (): boolean {
    if (this.content === '') {
      return true
    } else {
      return false
    }
  }
  @Action newTodo: any
  addNewTodo () {
    const todo = {
      content: this.content,
      complete: false,
      createTime: TomorrowTime
    }
    this.newTodo(todo)
    this.content = ''
  }
}

</script>

<style lang="less" scoped>
@import '../common/main.less';
.tomorrow {
  .input-container {
    .input {
      width: 90%;
      height: 2rem;
      color: rgb(36, 36, 36);
      font-size: 1.5rem;
      text-indent: 2rem;
      border: none;
      border-bottom: 1px solid @mainColor;
      outline: 0;
      // &:focus {
      //   border: none;
      //   border-bottom: 1px solid @activeColor;
      // }
    }
    .button {
      outline: 0;
      border: none;
      padding: 0;
      background-color: #fff;
      color: @mainColor;
      &:disabled {
        // background-color: rgb(15, 54, 88);
        color: rgb(58, 57, 57);
      }
      .icon {
        border-bottom: 1px solid @mainColor;
        height: 2rem;
        font-size: 1.5rem;
        line-height: 2rem;
        padding:  0 0 7px 0;
      }
    }
   }
}
</style>
