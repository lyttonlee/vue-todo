<template>
  <div class="today">
    <div class="menu" v-if="todayTodos.length !== 0 || menuIndex !== 0">
      <template v-for="(menu, index) in menus">
        <div @click="filterTodos(index)" :key="index" :class="['item', `${menuIndex === index ? 'active' : ''}`]">{{menu}}</div>
      </template>
    </div>
    <transition
        enter-active-class="animated fadeInLeft"
        leave-active-class="animated fadeOutRight"
        mode="out-in"
        >
      <Todos
        :key="menuIndex"
        :todos="todayTodos"
        :emptyMsg="emptyMsg"
        :type="menuIndex"
      />
    </transition>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator'
import {Action, State, Getter} from 'vuex-class'
import Todos from '../components/Todos.vue'
@Component({
  components: {
    Todos,
  },
})
export default class Today extends Vue {
  @State public todayTodos: any
  @Action public getTodayTodos: any
  @Action public filterTodayTodos: any
  public menus: any = ['全部', '已完成', '未完成']
  public menuIndex: number = 0
  public get emptyMsg() {
    if (this.menuIndex === 0) {
      return '这下你高兴了！今天居然无事可做！！！'
    } else if (this.menuIndex === 1) {
      return '你今天居然什么事都没做完！'
    } else {
      return '人生就该勤奋做事！！'
    }
  }
  public async filterTodos(index: number) {
    if (index === 1) {
      await this.filterTodayTodos(true)
      this.menuIndex = index
    } else if (index === 2) {
      await this.filterTodayTodos(false)
      this.menuIndex = index
    } else {
      await this.filterTodayTodos()
      this.menuIndex = index
    }
  }
}
</script>
<style lang="less" scoped>
@import '../common/main';
.today {
  .menu {
    display: flex;
    width: 100%;
    height: 12vh;
    background: @mainColor;
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
      border-bottom: 3px solid rgb(78, 54, 54);
      color: rgb(255, 255, 255);
    }
  }
}
</style>
