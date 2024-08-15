<script setup>
import { computed, onMounted, ref, watch, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import CardView from './CardView.vue';
import store from '../store';
import dashboardService from '../service/dashboard.service';
import tokenService from '../service/token.service';
import ChartViewMut from '../components/ChartViewMut.vue';
import ChartViewCon from '../components/ChartViewCon.vue';
import ChartViewDup from '../components/ChartViewDup.vue';
import ChartViewAdresse from '../components/ChartViewAdresse.vue';
import ChartViewTemp from '../components/ChartViewTemp.vue';
import CardSkeleton from '../components/CardSkeleton.vue';
import moment from 'moment/moment';

import ChartViewNIM from '../components/ChartViewNIM.vue';

import { useIntervalFn } from '@vueuse/core'
import { rand } from '@vueuse/shared'

import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Toast from 'primevue/toast';

const toast = useToast();
const confirm = useConfirm();

const greetings = ['Hello', 'Hi', 'Yo!', 'Hey', 'Hola', 'こんにちは', 'Bonjour', 'Salut!', '你好', 'Привет']
const word = ref('Hello')
const interval = ref(300000)
const tous_site = "TOUS SITES"
const siteId = "1111"

const selectedSite = ref({ id: siteId, nom: tous_site })

const days = ref([
    { name: 'Live', nbre: 0 },
    { name: 'J-1', nbre: 1 },
    { name: 'J-2', nbre: 2 },
    { name: 'J-3', nbre: 3 },
    { name: 'J-4', nbre: 4 },
    { name: 'J-5', nbre: 5 },
]);

const confirm1 = (message) => {
    confirm.require({
        message: message,
        header: 'Attention',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Valider'
        },
        accept: () => {
           // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
           // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};




const userConnected = tokenService.getUser();

console.log(userConnected.data)

const { isDarkTheme } = useLayout();

const checked = ref(false);

const loading = ref(false);

const lineOptions = ref(null);


const dateRech = new Date().getTime();


const selectedDay = ref({ name: 'Live', nbre: 0 });
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

    setInterval(load, 5000);

});

const { pause, resume, isActive } = useIntervalFn(async() => {

  await  getDashboardData()

}, interval)


onMounted(async () => {
    // dashboardService.appelServicePlaques(dateRech);
    // dashboardService.appelServiceFinanceSite(dateRech);
    //cardDataList = await dashboardService.getCardDataDash(dashboardService.getDateFormat(dateRech))
   // console.log("data : ", cardDataList);

    //store.state.dashboard.getters.chartPiedList(dateRech);
    await store.dispatch("dashboard/appelServiceOperationCardData", dashboardService.getDateFormat(dateRech))

    await store.dispatch("dashboard/appelServiceOperation", dashboardService.getDateFormat(dateRech))

    await store.dispatch("auth/getUserConnected");
    //
    siteList.value.push({ id: '0000', nom: 'TOUS SITES' })
    //console.log("data computed: " + store.state.dashboard.chartPiedList);
    await dashboardService.getPrivilegesSites().then((response) => {
        //  siteList.value = response.data.filter((item) => item.id.length >= 4);
        response.data.forEach(element => {
            if (element.id.length >= 4) {
                siteList.value.push(element)
            }

        });
    });
});

//IMMATRICULATION  //
async function getDashboardData() {

    word.value = greetings[rand(0, greetings.length - 1)]

    console.log("Methode getDashboardData")
    // cardDataList = [];
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
    await store.dispatch("dashboard/appelServiceOperationCardDataParSite", payloadUser);
    await store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);

}


async function getOnValueChangedDropdownSite(v) {
    cardDataList = [];
    let payloadUser;

    if (selectedDay.value == null || selectedDay.value.name == 'Live') {

        payloadUser = { site: v.id, dateRech: moment().subtract(0, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(0, 'days').format('yyyy-MM-DD'), v.id);
       // cardDataList = dashboardService.getCardDataDashParSite(v.id, moment().subtract(0, 'days').format('yyyy-MM-DD'));

        await store.dispatch("dashboard/appelServiceOperationCardDataParSite", payloadUser);
        await store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
    } else {

        payloadUser = { site: v.id, dateRech: moment().subtract(selectedDay.value.nbre, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(selectedDay.value.nbre, 'days').format('yyyy-MM-DD'), v.id);

       // cardDataList = dashboardService.getCardDataDashParSite(v.id, dashboardService.getDateFormat(dateRech));

        await store.dispatch("dashboard/appelServiceOperationCardDataParSite", payloadUser);

        await store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
    }

}

async function getOnValueChangedDropdownDateRebours(v) {

    cardDataList = [];
    let payloadUser;

    if (selectedSite.value == null || selectedSite.value.nom == tous_site) {

        const idsite = 0;
        payloadUser = { site: idsite, dateRech: moment().subtract(v.nbre, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'), idsite);

        cardDataList = dashboardService.getCardDataDashParSite(idsite, moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'));

        // store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
        await store.dispatch("dashboard/appelServiceOperationCardDataParSite", payloadUser);
        store.dispatch("dashboard/appelServiceOperation", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'));
    } else {
        payloadUser = { site: selectedSite.value.id, dateRech: moment().subtract(v.nbre, 'days').format('yyyy-MM-DD') }

        console.log("valeur jour :", moment().subtract(v.nbre, 'days').format('yyyy-MM-DD'), selectedSite.value);

        await store.dispatch("dashboard/appelServiceOperationCardDataParSite", payloadUser);

       await store.dispatch("dashboard/appelServiceOperationParDateRechEtParSite", payloadUser);
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
                    <Dropdown v-model="selectedSite" :options="siteList" :filter="true"
                        @update:modelValue="getOnValueChangedDropdownSite" class="w-full md:w-[14rem] ">
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

        <CardView v-if="store.state.dashboard.cardlistData.length != 0"
            v-for="item in store.state.dashboard.cardlistData.map(item => item).sort((a, b) => a.id - b.id)" :cardData="item" :key="item.id">
        </CardView>

        <div v-if="store.state.dashboard.chartPiedList.length != 0" class="grid grid-cols-3">
            <ChartViewNIM></ChartViewNIM>
            <ChartViewMut></ChartViewMut>
            <ChartViewCon></ChartViewCon>
            <ChartViewDup></ChartViewDup>
            <ChartViewAdresse></ChartViewAdresse>
            <ChartViewTemp></ChartViewTemp>

        </div>
        <div v-else class="grid grid-cols-3 gap-2 mx-2 mt-2 ">
            <CardSkeleton></CardSkeleton>
            <CardSkeleton></CardSkeleton>
            <CardSkeleton></CardSkeleton>
        </div>


    </div>
</template>
