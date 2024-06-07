<script setup>
import { computed, onMounted , ref, watch } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import CardView from './CardView.vue';
import ChartView from '../components/ChartView.vue';
import store from '../store';
import dashboardService from '../service/dashboard.service';
import tokenService from '../service/token.service';


const cardDataList = ref([
    { id: 1, title: 'PLAQUE DISPONIBLES', nombre: 120, icon: "pi pi-car" },
    { id: 2, title: 'PLAQUES RESERVEES', nombre: 120, icon: "pi pi-credit-card" },
    { id: 3, title: 'NIM ET REI APUREES', nombre: 120, icon: "pi pi-credit-card" },
    { id: 4, title: 'RECETTE REALISEES', nombre: 120, icon: "pi pi-dollar" },
    { id: 5, title: 'RECETTE AUTRES OP.', nombre: 120, icon: "pi pi-dollar" },

]);

const days = ref([
    { name: 'Live', nbre: 0 },
    { name: 'J-1', nbre: 1 },
    { name: 'J-2', nbre: 2 },
    { name: 'J-3', nbre: 3 },
    { name: 'J-4', nbre: 4 },
    { name: 'J-5', nbre: 5 },
]);

const userConnected=tokenService.getUser();

console.log(userConnected.data)

const { isDarkTheme } = useLayout();



const lineOptions = ref(null);


const dateRech = "2024-01-22";

const selectedSite = ref({});
const selectedDay = ref({});
const siteList = ref([]);



computed(() => {

    mapState(["auth"]);
    mapState(["dashboard"]);

});


onMounted(() => {
   
    setColorOptions(),
    setChart()

     store.dispatch("auth/getUserConnected");
     //
    //console.log("data computed: " + store.state.dashboard.chartPiedList);
    dashboardService.getPrivilegesSites().then((response) => {
        siteList.value = response.data;
    }) ;

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

        <div class="col-12">
            <div class="card flex justify-center flex-wrap gap-1">
                    <div class="flex gap-3 mt-1">
                       
                <Dropdown v-model="selectedSite" :options="siteList" filter optionLabel="name"
                    placeholder="Select a Site" class="w-full md:w-[14rem] ">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">

                            <div>{{ slotProps.value.nom }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">

                            <div>{{ slotProps.option.nom }}</div>
                        </div>
                    </template>
                </Dropdown>

                <Dropdown v-model="selectedDay" :options="days" optionLabel="name" placeholder="Select a Day"
                    class="w-full md:w-[14rem] ">
                    <template #value="slotProps">
                        <div v-if="slotProps.value" class="flex items-center">

                            <div>{{ slotProps.value.name }}</div>
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                    <template #option="slotProps">
                        <div class="flex items-center">

                            <div>{{ slotProps.option.name }}</div>
                        </div>
                    </template>
                </Dropdown>
            </div>
                    
                </div>
        </div>

        <CardView v-for="item in cardDataList" :cardData="item"></CardView>

        <div class="grid grid-cols-3">
            
            <ChartView></ChartView>
            <ChartView></ChartView>
            <ChartView></ChartView>
            <ChartView></ChartView>
        </div>
    </div>
</template>
