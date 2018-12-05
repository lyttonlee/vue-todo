<template>
  <div>
    <!-- todos -->
    <div
      class="todos"
      :style="{height: height}"
      v-if="todos.length !== 0">
      <template v-for="(todo, index) in todos">
        <div
          class="todo" 
          :style="{background: todo.complete ? completeColor : uncompleteColor, color: todo.complete ? '#ccc' : '#aaa'}" 
          :key="index">
          <div class="content">{{todo.content}}</div>
          <i 
            @click="changeTodo(todo.id, todo.complete)" 
            :class="['iconfont', `${todo.complete ? 'icon-wancheng2' : 'icon-weiwancheng1'}`, 'icon']"></i>
        </div>
      </template>
    </div>
    <div class="todos" v-else>
      <h3>{{emptyMsg}}</h3>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {Action} from 'vuex-class'
@Component
export default class Todos extends Vue {
  @Prop() emptyMsg!: string
  @Prop() todos: any
  @Prop({ default: '80vh'}) height!: string
  @Prop({ default: 'rgba(3, 68, 39, 0.8)' }) completeColor!: string
  @Prop({ default: 'rgba(94, 64, 26, 0.8)' }) uncompleteColor!: string
  @Action updateTodoById: any
  @Action getTodayTodos: any
  async changeTodo(id: string, complete: boolean) {
    // ..
    // if (complete) return
    try {
      const data = {
        id,
        complete
      }
      await this.updateTodoById(data)
      await this.getTodayTodos()
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style lang="less" scoped>
.todos {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    // height: 92vh;
    background: rgb(248, 248, 248);
    .todo {
      width: 95%;
      display: flex;
      // background: rgba(129, 75, 173, 0.568);
      margin: 5px;
      height: 10vh;
      border-radius: 5vh;
      line-height: 10vh;
      box-shadow: 0 1px 5px #333;
      color: rgba(94, 64, 26, 0.5);
      .content {
        width: 85%;
        text-align: left;
        text-indent: 2rem;
        font-size: 1.7rem;
      }
      .icon {
        text-align: center;
        // color: rgba(53, 18, 18, 0.61);
        font-size: 2rem;
        // cursor: pointer;
      }
    }
  }
</style>
