<script setup>
import { computed, onMounted, ref, watch, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import CardView from './CardView.vue';
import store from '../store';
import dashboardSonasService from '../service/dashboard.sonas.service';
import tokenService from '../service/token.service';
import moment from 'moment/moment';
import ChartViewNovelleAffaire from '../components/ChartViewNovelleAffaire.vue';
import ChartViewFlotte from '../components/ChartViewFlotte.vue';
import ChartViewRenouvellement from '../components/ChartViewRenouvellement.vue';
import CardSkeleton from '../components/CardSkeleton.vue';
import { useIntervalFn } from '@vueuse/core'


const days = ref([
    { name: 'Live', nbre: 0 },
    { name: 'J-1', nbre: 1 },
    { name: 'J-2', nbre: 2 },
    { name: 'J-3', nbre: 3 },
    { name: 'J-4', nbre: 4 },
    { name: 'J-5', nbre: 5 },
]);

const tous_site = "TOUS SITES"
const siteId = "1111"

const selectedSite = ref({ id: siteId, nom: tous_site })
const selectedDay = ref({ name: 'Live', nbre: 0 });

const userConnected = tokenService.getUser();

console.log(userConnected.data)

const { isDarkTheme } = useLayout();

const checked = ref(false);

const loading = ref(false);

const lineOptions = ref(null);


const dateRech = new Date().getTime();

const siteList = ref([]);
const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const interval = ref(300000)


const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 5000);
}

onBeforeUnmount(() => {

});

computed(() => {

    mapState(["auth"]);
    mapState(["dashboard_assurance"]);

});


const { pause, resume, isActive } = useIntervalFn(async () => {

  await  getDashboardData()

}, interval)


onMounted(async () => {

    setInterval(load, 5000);

    await store.dispatch("dashboard_assurance/appelServiceOperationCardData", dashboardSonasService.getDateFormat(dateRech))
    await store.dispatch("dashboard_assurance/appelServiceOperation", dashboardSonasService.getDateFormat(dateRech));
    await store.dispatch("auth/getUserConnected");

    await dashboardSonasService.getPrivilegesSites().then((response) => {
        siteList.value = response.data.filter((item) => item.id.length <= 2);
    });


});

//IMMATRICULATION  //

async function getDashboardData() {

    word.value = greetings[rand(0, greetings.length - 1)]

    let payloadUser;
    let idsite;
    let dateSelected;

    if (selectedDay.value == null || selectedDay.value.name == 'Live') {
        dateSelected = 0;
    } else {
        dateSelected = selectedDay.value.nbre;
    }

    if (selectedSite.value == null || selectedSite.value.nom == tous_site) {
        idsite = 0;
    } else {
        idsite = selectedSite.value.id
    }
    payloadUser = { site: idsite, dateRech: moment().subtract(dateSelected, 'days').format('yyyy-MM-DD') }
    // cardDataList = await dashboardService.getCardDataDashParSite(idsite, dashboardService.getDateFormat(dateRech));
    await store.dispatch("dashboard_assurance/appelServiceOperationCardDataParSite", payloadUser);
    await store.dispatch("dashboard_assurance/appelServiceOperationParDateRechEtParSite", payloadUser);

}


async function getOnValueChangedDropdownSite(v) {

    let payloadUser;

    if (selectedDay.value == null || selectedDay.value.name == 'Live') {

        payloadUser = { site: v.id, dateRech: moment().subtract(0, 'days').format('yyyy-MM-DD') }
        console.log("valeur jour :", moment().subtract(0, 'days').format('yyyy-MM-DD'), v.id);

    } else {

        payloadUser = { site: v.id, dateRech: moment().subtract(0, 'days').format('yyyy-MM-DD') }
        console.log("valeur jour :", moment().subtract(selectedDay.value.nbre, 'days').format('yyyy-MM-DD'), v.id);
    }

    await store.dispatch("dashboard_assurance/appelServiceOperationCardDataParSite", payloadUser)
    await store.dispatch("dashboard_assurance/appelServiceOperationParDateRechEtParSite", payloadUser);

}

async function getOnValueChangedDropdownDateRebours(v) {
    let payloadUser;

    if (selectedSite.value == null || selectedSite.value.nom == 'Live') {

        const idsite = 0;
        payloadUser = { site: idsite, dateRech: moment().subtract(v.nbre, 'days').format('yyyy-MM-DD') }
        console.log("valeur jour :", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'), idsite);
    } else {
        payloadUser = { site: selectedSite.value.id, dateRech: moment().subtract(v.nbre, 'days').format('yyyy-MM-DD') }
        console.log("valeur jour :", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'), selectedSite.value);
    }

    await store.dispatch("dashboard_assurance/appelServiceOperationCardDataParSite", payloadUser)
    await store.dispatch("dashboard_assurance/appelServiceOperationParDateRechEtParSite", payloadUser);
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
                    <Button text icon="pi pi-search" :loading="loading"></Button>
                </div>
            </div>

        </div>

        <CardView v-if="store.state.dashboard_assurance.cardDataList.length != 0"
            v-for="item in store.state.dashboard_assurance.cardDataList.map(item => item).sort((a, b) => a.id - b.id)"
            :cardData="item" :key="item.id">
        </CardView>
        
        <div v-if="store.state.dashboard_assurance.chartPiedList.length != 0"
            class="grid grid-cols-3">

            <ChartViewNovelleAffaire></ChartViewNovelleAffaire>
            <ChartViewFlotte></ChartViewFlotte>
            <ChartViewRenouvellement></ChartViewRenouvellement>

        </div>
        <div v-else class="grid grid-cols-3 gap-2 mx-2 mt-2 ">
            <CardSkeleton></CardSkeleton>
            <CardSkeleton></CardSkeleton>
            <CardSkeleton></CardSkeleton>
        </div>
    </div>
</template>
