<script setup>
import { computed, onMounted, reactive, ref, watch } from 'vue';
import { ProductService } from '@/service/ProductService';
import { useLayout } from '@/layout/composables/layout';
import CardView from './CardView.vue';
import ChartView from '../components/ChartView.vue';
import store from '../store';
import dashboardService from '../service/dashboard.service';


computed(() => {
    mapState(["auth"]);
});



const cardDataList = ref([
    { id: 1, title: 'PLAQUE DISPONIBLES', nombre: 120, icon: "pi pi-car" },
    { id: 2, title: 'PLAQUES RESERVEES', nombre: 120, icon: "pi pi-credit-card" },
    { id: 3, title: 'NIM ET REI APUREES', nombre: 120, icon: "pi pi-credit-card" },
    { id: 4, title: 'RECETTE REALISEES', nombre: 120, icon: "pi pi-dollar" },
    { id: 5, title: 'RECETTE AUTRES OP.', nombre: 120, icon: "pi pi-dollar" },

]);

let listePiedData = ref([]);

const { isDarkTheme } = useLayout();

const products = ref(null);
  
const lineData = reactive({
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'First Dataset',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            backgroundColor: '#2f4860',
            borderColor: '#2f4860',
            tension: 0.4
        },
        {
            label: 'Second Dataset',
            data: [28, 48, 40, 19, 86, 27, 90],
            fill: false,
            backgroundColor: '#00bb7e',
            borderColor: '#00bb7e',
            tension: 0.4
        }
    ]
});
const items = ref([
    { label: 'Add New', icon: 'pi pi-fw pi-plus' },
    { label: 'Remove', icon: 'pi pi-fw pi-minus' }
]);

const lineOptions = ref(null);
const dashOp=ref(null);
const productService = new ProductService();

const dateRech="2024-01-22";

console.log(store.state.auth.user.nom , store.state.auth.user.postnom, store.state.auth.user.prenom )

onMounted(() => {

    dashboardService.appelServiceOperation(dateRech).then((response)=>{

        listePiedData =  dashboardService.getDateDashboardList(response)
    
    }
    );

    dashboardService.appelServicePlaques(dateRech);
    dashboardService.appelServiceFinanceSite(dateRech);

    productService.getProductsSmall().then((data) => (products.value = data));
});

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
        }
    },
    { immediate: true }
);
</script>

<template>
    <div class="grid ">

        <CardView v-for="item in cardDataList" :cardData="item"></CardView>

        <div class="grid grid-cols-3">

            <ChartView ></ChartView>
            <ChartView ></ChartView>
            <ChartView ></ChartView>
            <ChartView ></ChartView>
            <ChartView ></ChartView>
            <ChartView ></ChartView>
            
        </div>
    </div>
</template>
