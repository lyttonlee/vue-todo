<template>
  <div class="welcome">
    <div class="content">
      <div class="time">
        <h3>{{Day}}</h3>
        <h2>{{Hour}}</h2>
      </div>
      <div class="msg">
        享受生活从有规划的每一天开始！
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import {Action} from 'vuex-class'
import moment from 'moment';
moment.locale('zh-cn')
@Component
export default class Welcome extends Vue {
  public Day: string = moment().format('YYYY-MM-DD');
  public Hour: string = moment().format('HH:mm:ss');
  private interTimer: any = 0;
  private timer: any = 0;
  @Action filterTodayTodos: any
  // 初始化组件
  private init() {
    // 用定时器获取当前时间
    this.interTimer = setInterval(() => {
      // const Day = moment().format('YYYY-MM-DD')
      const Hour = moment().format('HH:mm:ss')
      // this.Day = Day
      this.Hour = Hour
      // console.log(this.interTimer)
    }, 1000);
    // 5秒后页面跳转
    this.timer = setTimeout(() => {
      this.$router.push('/todo')
      // console.log(this.timer)
    }, 5000);
    // 这里还可以做一些数据请求...
  }
  public created() {
    this.filterTodayTodos()
  }
  // 组件挂载时，初始化
  private mounted() {
    this.init()
  }
  // 组件销毁前，清除定时器
  private beforeDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer)
      // console.log(this.timer)
    }
    if (this.interTimer) {
      clearInterval(this.interTimer)
      // console.log(this.interTimer)
    }
  }
}
</script>

<style lang="less" scoped>
.welcome {
  background: url('../assets/wel.jpg');
  background-size: 100%;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .content {
    background-color: rgba(255, 255, 255, 0.356);
    width: 100%;
    // height: 300px;
    // box-shadow: 2px 2px 4px #232;
    // border-radius: 5px;
    .time {
      font-size: 2rem;
      font-weight: 400;
      color: rgb(3, 3, 3);
    }
    .msg {
      font-size: 3rem;
      font-weight: 200;
      color: rgb(27, 27, 27);
    }
  }
}
</style>