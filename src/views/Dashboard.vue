<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import CardView from './CardView.vue';
import ChartView from '../components/ChartView.vue';
import store from '../store';
import dashboardService from '../service/dashboard.service';


const cardDataList = ref([
    { id: 1, title: 'PLAQUE DISPONIBLES', nombre: 120, icon: "pi pi-car" },
    { id: 2, title: 'PLAQUES RESERVEES', nombre: 120, icon: "pi pi-credit-card" },
    { id: 3, title: 'NIM ET REI APUREES', nombre: 120, icon: "pi pi-credit-card" },
    { id: 4, title: 'RECETTE REALISEES', nombre: 120, icon: "pi pi-dollar" },
    { id: 5, title: 'RECETTE AUTRES OP.', nombre: 120, icon: "pi pi-dollar" },

]);



const { isDarkTheme } = useLayout();

const products = ref(null);


const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);

const lineOptions = ref(null);
const productService = new ProductService();

let listePiedData = ref([]);
let dataPiedImm = ref(null);
let dataPiedMut = ref(null);
let dataPiedRei = ref(null);
let dataPiedCon = ref(null);
let dataPiedIt = ref(null);

const dateRech = "2024-01-22";

console.log(store.state.auth.user.nom, store.state.auth.user.postnom, store.state.auth.user.prenom);

computed(() => {

    mapState(["auth"]);
    mapState(["dashboard"]);



});


onMounted(() => {
   
    dashboardService.appelServicePlaques(dateRech);
    dashboardService.appelServiceFinanceSite(dateRech);
    setColorOptions(),
    setChart()
    //store.state.dashboard.getters.chartPiedList(dateRech);
     store.dispatch("dashboard/appelServiceOperation", dateRech);
    //console.log("data computed: " + store.state.dashboard.chartPiedList);
});

//IMMATRICULATION  //
let documentStyle = getComputedStyle(document.documentElement);
let textColor = documentStyle.getPropertyValue('--text-color');
let textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
let surfaceBorder = documentStyle.getPropertyValue('--surface-border');

const pieData = ref(null);
const pieOptions = ref(null);

const setColorOptions = () => {
    documentStyle = getComputedStyle(document.documentElement);
    textColor = documentStyle.getPropertyValue('--text-color');
    textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    surfaceBorder = documentStyle.getPropertyValue('--surface-border');
};

 const setChart = () => {
    // chartPiedCard=
    pieData.value = {
        labels: ['Initiées', 'apurées', 'validées'],
        datasets: [
            {
                data: [540, 325, 702],
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

//MUTATION//

const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const applyLightTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#495057'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            },
            y: {
                ticks: {
                    color: '#495057'
                },
                grid: {
                    color: '#ebedef'
                }
            }
        }
    };
};

const applyDarkTheme = () => {
    lineOptions.value = {
        plugins: {
            legend: {
                labels: {
                    color: '#ebedef'
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            },
            y: {
                ticks: {
                    color: '#ebedef'
                },
                grid: {
                    color: 'rgba(160, 167, 181, .3)'
                }
            }
        }
    };
};

watch(
    isDarkTheme,
    (val) => {
        if (val) {
            applyDarkTheme();
        } else {
            applyLightTheme();
            // applyDarkTheme();
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid ">

        <CardView v-for="item in cardDataList" :cardData="item"></CardView>

        <div class="grid grid-cols-3">
            <div class="col-12 lg:col-6 xl:col-4">
                <div class="card flex flex-column align-items-center">
                    <h5 class="text-left w-full">{{ store.state.dashboard.chartPiedList }}</h5>
                    <Chart type="pie" :data="pieData" :options="pieOptions"></Chart>
                </div>
            </div>
            <ChartView></ChartView>
            <ChartView></ChartView>
            <ChartView></ChartView>
            <ChartView></ChartView>
        </div>
    </div>
</template>
