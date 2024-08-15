<script setup>
import { ref, watch , reactive , nextTick} from 'vue';
import { useLayout } from '@/layout/composables/layout';
import store from '../store';
import { useIntervalFn } from '@vueuse/core'



const { layoutConfig } = useLayout();
let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const interval = ref(300000)
const pieData = ref(null);
const pieOptions = ref(null);
const datalist= ref(store.state.dashboard.chartPiedList.find(itemData => itemData.id===1));

//datalist.value=store.state.dashboard.chartPiedList.find(itemData => itemData.id===1);

console.log(datalist)


console.log(store.state.dashboard.chartPiedList);



const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};

const setChart = () => {
    
   // chartPiedCard=+dataPiedIMM.emise   +dataPiedIMM.apure +dataPiedIMM.valide
    pieData.value = {
        labels: datalist.dataOp.map(row =>row.libelle.charAt(0).toUpperCase()
        + row.libelle.slice(1)+"("+row.valeur+")"),
        datasets: [
            {
                data: datalist.dataOp.map(row =>row.valeur),
                backgroundColor: [documentStyle.getPropertyValue('--indigo-500'), documentStyle.getPropertyValue('--purple-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--indigo-400'), documentStyle.getPropertyValue('--purple-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
    };

    pieOptions.value = {
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




watch(
    
    layoutConfig.theme,
    () => {
        setColorOptions();
            setChart();       
    },
    { immediate: true }
);
</script>

<template>
        <div class="col-12 lg:col-6 xl:col-4">
            <div class="card flex flex-column align-items-center">
                <h5 class="text-left w-full">NOUVELLE IMMATRICULATION</h5>
                <Chart type="pie" :data="pieData" :options="pieOptions"></Chart>
            </div>
        </div>   
</template>
