<template>
    <Pie :data="data" :options="options" />
  </template>
  
  <script >
  import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
  import { Pie } from 'vue-chartjs'
  import * as chartConfig from '../chartConfig.js'
  
  ChartJS.register(ArcElement, Tooltip, Legend)
  
  export default {
    name: 'ChartDataView',
    components: {
      Pie
    },
    data() {
      return chartConfig
    }
  }
  </script>