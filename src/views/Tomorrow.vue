<template>
  <div class="tomorrow">
    <!-- 新增todo input -->
    <div class="input-container" :style="{display: visable ? 'block' : 'none'}">
      <input placeholder="tell me what you want to do" v-model="content" class="input" type="text">
      <button :disabled="disabled" class="button" @click="addNewTodo"><i class="iconfont icon-add icon"></i></button>
    </div>
    <!-- todos -->
    <div class="todos" v-if="tomorrowTodos.length !== 0">
      <template v-for="(todo, index) in tomorrowTodos">
        <div class="todo" :key="index">
          <div class="content">{{todo.content}}</div>
          <i @click="deleteTodo(todo.id)" class="iconfont icon-shanchu delete"></i>
        </div>
      </template>
    </div>
    <div class="todos" v-else>
      <h3>什么？你明天居然要无所事事！！！</h3>
    </div>
    <!-- 新增todo icon -->
    <div class="new" @click="showInput">
      <i :class="`iconfont ${iconName} icon`"></i>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action, State} from 'vuex-class'
import {TodayTime, TomorrowTime} from '../utils/formatTime'
@Component
export default class Tomorrow extends Vue {
  content: string = ''
  visable: boolean = false
  @State tomorrowTodos: any
  get disabled (): boolean {
    if (this.content === '') {
      return true
    } else {
      return false
    }
  }
  get iconName (): string {
    if (this.visable) {
      return 'icon-shanchu1'
    } else {
      return 'icon-add1'
    }
  }
  @Action newTodo: any
  @Action getTomorrowTodos: any
  @Action deleteTodoById: any
  showInput () {
    this.visable = !this.visable
    console.log(this.tomorrowTodos)
  }
  addNewTodo () {
    const todo = {
      content: this.content,
      complete: false,
      createTime: TomorrowTime
    }
    this.newTodo(todo).then((res: object) => {
      console.log(res)
      this.content = ''
      this.getTomorrowTodos()
    })
    .catch((err: any) => {
      if (err) {
        console.log(err)
      }
    })
  }
  async deleteTodo (id: string) {
    // console.log(id)
    try {
      await this.deleteTodoById(id)
      this.getTomorrowTodos()
    } catch (err) {
      console.log(err)
    }
    
  }
  created () {
    this.getTomorrowTodos()
  }
}

</script>

<style lang="less" scoped>
@import '../common/main.less';
.tomorrow {
  .input-container {
    box-sizing: border-box;
    position: fixed;
    padding-top: 10vh;
    height: 92vh;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.5);
    .input {
      width: 90%;
      height: 2rem;
      color: rgb(36, 36, 36);
      font-size: 1.5rem;
      text-indent: 1rem;
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
  .todos {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 92vh;
    background: rgb(240, 233, 245);
    .todo {
      width: 95%;
      display: flex;
      background: rgba(211, 205, 216, 0.568);
      margin: 5px;
      height: 10vh;
      border-radius: 5vh;
      line-height: 10vh;
      box-shadow: 0 1px 5px #333;
      color: rgb(5, 84, 88);
      .content {
        width: 85%;
        text-align: left;
        text-indent: 2rem;
        font-size: 1.7rem;
      }
      .delete {
        text-align: center;
        color: rgba(53, 18, 18, 0.61);
        font-size: 2rem;
        cursor: pointer;
      }
    }
  }
  .new {
    position: fixed;
    bottom: 13vh;
    width: 100%;
    .icon {
      font-size: 2rem;
      background: @activeColor;
      border-radius: 50%;
      font-weight: 100;
      color: rgb(255, 253, 253);
      padding: 10px;
      cursor: pointer;
    }
  }
}
</style>
