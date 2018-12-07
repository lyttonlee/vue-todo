<script lang="ts">
import { Line, Bar } from 'vue-chartjs'
import {Prop, Component, Vue} from 'vue-property-decorator'
@Component
export default class BarChart extends Bar {
  @Prop({default: null}) public chartdata!: any
  @Prop({default: null}) public options!: any
  public mounted() {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>