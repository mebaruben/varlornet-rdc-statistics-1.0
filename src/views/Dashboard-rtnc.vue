<script setup>
import { computed, onMounted, ref, watch, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import CardView from './CardView.vue';
import store from '../store';
import dashboardService from '../service/dashboard.service';
import dashboardRtncService from '../service/dashboard.rtnc.service';
import tokenService from '../service/token.service';
import CardLoader from '../components/CardLoader.vue';
import moment from 'moment/moment';
import { useIntervalFn } from '@vueuse/core'
import { rand } from '@vueuse/shared'

const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const interval = ref(300000)

const { pause, resume, isActive } = useIntervalFn(() => {
    getDashboardData()

}, interval)


let  cardDataList =[];


const days = ref([
    { name: 'Live', nbre: 0 },
    { name: 'J-1', nbre: 1 },
    { name: 'J-2', nbre: 2 },
    { name: 'J-3', nbre: 3 },
    { name: 'J-4', nbre: 4 },
    { name: 'J-5', nbre: 5 },
]);


const userConnected = tokenService.getUser();

console.log(userConnected.data)

const { isDarkTheme } = useLayout();

const loading = ref(false);

const lineOptions = ref(null);


const dateRech = new Date().getTime();

const selectedSite = ref();
const selectedDay = ref();
const siteList = ref([]);


const load = () => {
    loading.value = true;
    setTimeout(() => {
        console.log("dashboard");
        loading.value = false;
    }, 5000);
}

onBeforeUnmount(() => {

});

computed(() => {

    mapState(["auth"]);
    mapState(["dashboard"]);
    mapState(["dashboardRtncModule"]);

    setInterval(load, 5000);

    

});


onMounted(() => {
    
    cardDataList= dashboardRtncService.getCardDataDashParSite(0 , dashboardService.getDateFormat(dateRech))

    console.log("data : ", cardDataList);

    store.dispatch("auth/getUserConnected");

    store.dispatch("dashboardRtncModule/listCardDashboardData", { dateRech: moment().subtract(0, 'days').format('yyyy-MM-DD') ,site: 0 });

    dashboardService.getPrivilegesSites().then((response) => {
        siteList.value = response.data.filter((item) => item.id.length >= 4);
    });
});

//IMMATRICULATION  //
function getDashboardData() {

    word.value = greetings[rand(0, greetings.length - 1)]

    console.log("Methode getDashboardData")
    console.log("data : ", cardDataList);
    
    let payloadUser;
    let idsite;
    let dateSelected;

    if (selectedDay.value == null || selectedDay.value.name == 'Live') {
        dateSelected = 0;
    } else {
        dateSelected = selectedDay.value.nbre;
    }

    if (selectedSite.value == null || selectedSite.value.nom == 'Live') {
        idsite = 0;
    } else {
        idsite = selectedSite.value.id
    }
    payloadUser = { site: idsite, dateRech: moment().subtract(dateSelected, 'days').format('yyyy-MM-DD') }
    cardDataList = dashboardRtncService.getCardDataDashParSite(idsite, dashboardService.getDateFormat(dateRech));

}


function getOnValueChangedDropdownSite(v) {
    cardDataList = [];
    let payloadUser;

    if (selectedDay.value == null || selectedDay.value.name == 'Live') {

        payloadUser = { site: v.id, dateRech: moment().subtract(0, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(0, 'days').format('yyyy-MM-DD'), v.id);
        cardDataList = dashboardService.getCardDataDashParSite(v.id, moment().subtract(0, 'days').format('yyyy-MM-DD'));

        store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
    } else {

        payloadUser = { site: v.id, dateRech: moment().subtract(selectedDay.value.nbre, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(selectedDay.value.nbre, 'days').format('yyyy-MM-DD'), v.id);

        cardDataList = dashboardService.getCardDataDashParSite(v.id, dashboardService.getDateFormat(dateRech));

        store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
    }

}

function getOnValueChangedDropdownDateRebours(v) {

    cardDataList = [];
    let payloadUser;

    if (selectedSite.value == null || selectedSite.value.nom == 'Live') {

        const idsite = 0;
        payloadUser = { site: idsite, dateRech: moment().subtract(v.nbre, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'), idsite);

        cardDataList = dashboardService.getCardDataDashParSite(idsite, moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'));

        // store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
        store.dispatch("dashboard/appelServiceOperation", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'));
    } else {
        payloadUser = { site: selectedSite.value.id, dateRech: moment().subtract(v.nbre, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'), selectedSite.value);

        cardDataList = dashboardService.getCardDataDashParSite(selectedSite.value.id, moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'))
            .then((error) => {
                console.log(error.message);
                if (error.response.status == 403) {
                    console.log("dashboard" , error.message); 
                }
            }
            );

        store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
    }


}



//MUTATION//

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

            <div class="card flex flex-wrap justify-content-start gap-3">
                <div class="flex align-items-center">
                    <Dropdown placeholder="Select a Site" v-model="selectedSite" :options="siteList" :filter="true"
                        optionLabel="nom" @update:modelValue="getOnValueChangedDropdownSite"
                        class="w-full md:w-[14rem] ">
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
                </div>
                <div class="flex align-items-center">
                    <Dropdown v-model="selectedDay" :options="days" optionLabel="name" placeholder="Select a Day"
                        selected class="w-full md:w-[14rem] " @update:modelValue="getOnValueChangedDropdownDateRebours">
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
                <div class="flex align-items-center">
                    <p>{{ word }}</p>
                    <Button text icon="pi pi-search" :loading="loading"></Button>
                </div>
            </div>

        </div>
         
        <p>{{ store.state.dashboardRtncModule.cardListDashboard }}</p>

        <CardView 
            v-for="item in store.state.dashboardRtncModule.cardListDashboard.map(item => item).sort((a, b) => a.id - b.id)" :cardData="item" :key="item.id">
        </CardView>
        
    </div>
</template>
