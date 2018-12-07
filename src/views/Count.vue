<template>
  <div class="count">
    <!-- <button @click="showNotify">click</button> -->
    <div class="title">Vue-ChartJs</div>
    <LineChart
      class="chart"
      :chartdata="ChartData"
      :options="options"
    />
    <!-- <BarChart 
      :chartdata="ChartData"
      :options="options"
    /> -->
    <RadarChart
      class="chart"
      :chartdata="ChartData"
      :options="options"
    />
    <!-- <div v-for="list in days" :key="list">{{list}}</div> -->
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {State} from 'vuex-class'
import {GetLastThreeDays} from '../utils/formatTime'
import LineChart from '../components/LineChart.vue'
import RadarChart from '../components/RadarChart.vue'
// import BarChart from '../components/BarChart.vue'
import notify from '../components/notify/Notify.js'
@Component({
  components: {
    LineChart,
    // BarChart,
    RadarChart,
  },
})
export default class Count extends Vue {
  @State public ChartData!: any
  public options: any = {
    responsive: true,
    maintainAspectRatio: false,
  }
  // days: any = GetLastThreeDays()
  // public showNotify() {
  //   notify({
  //     title: '我是标题',
  //     content: '这是一个notify提示！',
  //   })
  // }
}
</script>
<style lang="less" scoped>
.count {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 92vh;
  background-color: rgb(252, 252, 252);
  .title {
    font-size: 2rem;
  }
  .chart {
    margin: 10px 3px;
    height: 40vh;
    padding: 10px;
    border-radius: 5vh;
    border: .5px solid rgb(206, 221, 214);
    box-sizing: border-box;
    box-shadow: 0 1px 5px rgb(19, 18, 18);
  }
}
</style>
