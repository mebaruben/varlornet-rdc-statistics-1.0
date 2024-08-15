<template>
    
    <div class="col-12 lg:col-6 xl:col-4">
        <div class="card flex flex-column align-items-center">
            <h5 class="text-left w-full">NOUVELLE IMMATRICULATION</h5>
            <Chart type="pie" :data="chartData" :options="chartOptions" class="w-full md:w-[30rem]" />
        </div>
    </div> 
        
    
</template>

<script setup>
import { ref, onMounted } from 'vue';
import store from '../store';

let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};



onMounted( () => {
    setColorOptions();
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
let datalist= ref();

console.log('chatviewNIM : ' , store.state.dashboard.chartPiedList.find(itemData => itemData.id===1));

console.log(store.state.dashboard.chartPiedList.find(itemData => itemData.id===1))

const setChartData = () => {

  
   datalist = store.state.dashboard.chartPiedList.find(itemData => itemData.id===1)

   const documentStyle = getComputedStyle(document.body);

    return {
        labels: store.state.dashboard.chartPiedList.find(itemData => itemData.id===1).dataOp.map(row =>row.libelle.charAt(0).toUpperCase()
        + row.libelle.slice(1)+"("+row.valeur+")"),
        datasets: [
            {
                data: store.state.dashboard.chartPiedList.find(itemData => itemData.id===1).dataOp.map(row =>row.valeur),
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
    };
};
</script>