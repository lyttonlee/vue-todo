<template>
  <div>
    <button @click="showNotify">click</button>
    <LineChart 
      :chartdata="chartdata"
      :options="options"
    />
    <div v-for="list in days" :key="list">{{list}}</div>
  </div>
</template>
<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator'
import {GetLastThreeDays} from '../utils/formatTime'
import LineChart from '../components/LineChart.vue'
import notify from '../components/notify/Notify.js'
@Component({
  components: {
    LineChart
  }
})
export default class Count extends Vue {
  chartdata: any = {
    datacollection: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    }
  }
  options: any = {
    responsive: true,
    maintainAspectRatio: false
  }
  days: any = GetLastThreeDays()
  public showNotify() {
    notify({
      title: '我是标题',
      content: '这是一个notify提示！',
    })
  }
}
</script>
