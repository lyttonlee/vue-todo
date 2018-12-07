<template>
  <div class="tomorrow">
    <!-- 新增todo input -->
    <div class="input-container" :style="{display: visable ? 'block' : 'none'}">
      <input placeholder="tell me what you want to do" v-model="content" class="input" type="text">
      <button :disabled="disabled" class="button" @click="addNewTodo"><i class="iconfont icon-add2 icon"></i>Add New Todo</button>
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
import notify from '../components/notify/Notify.js'
@Component
export default class Tomorrow extends Vue {
  public content: string = ''
  public visable: boolean = false
  @State public tomorrowTodos: any
  get disabled(): boolean {
    if (this.content === '') {
      return true
    } else {
      return false
    }
  }
  get iconName(): string {
    if (this.visable) {
      return 'icon-shanchu1'
    } else {
      return 'icon-add1'
    }
  }
  @Action public newTodo: any
  @Action public getTomorrowTodos: any
  @Action public deleteTodoById: any
  public showInput() {
    this.visable = !this.visable
  }
  public addNewTodo() {
    const todo = {
      content: this.content,
      complete: false,
      createTime: TomorrowTime,
    }
    this.newTodo(todo).then((res: any) => {
      // console.log(res)
      const { msg } = res
      this.content = ''
      this.getTomorrowTodos()
      this.showInput()
      notify({
        title: 'Success',
        content: res.msg,
      })
    })
    .catch((err: any) => {
      if (err) {
        console.log(err)
      }
    })
  }
  public async deleteTodo(id: string) {
    // console.log(id)
    try {
      const res = await this.deleteTodoById(id)
      this.getTomorrowTodos()
      // this.$notify()这是一个添加到Vue原型上的方法，虽然提示是一个错误,但事实上并没有错！！
      // this.$notify({
      //   content: res.msg,
      // })
      // console.log(this)
    } catch (err) {
      console.log(err)
    }
  }
  public created() {
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
    display: flex;
    flex-direction: column;
    padding-top: 10vh;
    height: 92vh;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.6);
    .input {
      width: 100%;
      height: 2rem;
      color: rgb(36, 36, 36);
      font-size: 1.5rem;
      text-indent: 1rem;
      border: none;
      box-sizing: border-box;
      border-bottom: 1px solid @mainColor;
      outline: 0;
      &:focus {
        border: none;
        border-bottom: 2px solid @activeColor;
      }
    }
    .button {
      outline: 0;
      margin: 20px 0;
      border: none;
      background-color: rgb(8, 83, 73);
      height: 50px;
      width: 80%;
      border-radius: 25px;
      line-height: 50px;
      font-size: 1.5rem; 
      color: #ccc;
      &:disabled {
        // background-color: rgb(15, 54, 88);
        color: rgb(156, 143, 143);
        background-color: rgba(8, 83, 73, .3);
      }
      .icon {
        // border-bottom: 1px solid @mainColor;
        height: 2rem;
        font-size: 1.3rem;
        line-height: 2rem;
        padding: 0 20px 0 0;
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
