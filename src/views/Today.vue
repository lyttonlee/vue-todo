<template>
  <div class="today">
    <div class="menu">
      <template v-for="(menu, index) in menus">
        <div @click="filterTodos(index)" :key="index" :class="['item', `${menuIndex === index ? 'active' : ''}`]">{{menu}}</div>
      </template>
    </div>
    <Todos 
      :todos="todayTodos"
      emptyMsg="这下你高兴了！今天居然无事可做！！！"
    />
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action, State, Getter} from 'vuex-class'
import Todos from '../components/Todos.vue'
@Component({
  components: {
    Todos
  }
})
export default class Today extends Vue {
  @State todayTodos: any
  @Action getTodayTodos: any
  @Getter filterTodayCompleteTodos: any
  menus: any = ['全部', '已完成', '未完成']
  menuIndex: number = 0
  created() {
    this.getTodayTodos()
  }
  filterTodos (index: number) {
    this.menuIndex = index
  }
}
</script>
<style lang="less" scoped>
.today {
  .menu {
    display: flex;
    width: 100%;
    height: 12vh;
    background: rgba(9, 90, 46, 0.719);
    .item {
      flex: 1;
      height: 12vh;
      line-height: 12vh;
      font-size: 1.2rem;
      box-sizing: border-box;
      color: rgb(178, 185, 190);
      // &:active {
      //   border-bottom: 3px solid #234; 
      // }
    }
    .active {
      border-bottom: 3px solid rgb(4, 51, 24);
      color: antiquewhite;
    }
  }
}
</style>
