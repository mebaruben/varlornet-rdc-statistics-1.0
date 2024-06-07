<script setup>
import { ref, onMounted } from 'vue';
import dashboardService from '../../service/dashboard.service';
import statistiqueDgiService from '../../service/statistique.dgi.service';
import statistiqueDgiFinanciere from '../../service/statistique.dgi.financiere';

const dateDebut = ref(null);
const dateFin = ref(null);
const loading = ref(false);

const load = () => {
    console.log(dateDebut.value, dateFin.value, selectedSite.value.id)
    loading.value = true;

    console.log(dashboardService.getDateFormat(dateDebut.value));

    ;

    statistiqueDgiFinanciere.statFinanceTotaleApuresParOperation(selectedSite.value.id, dashboardService.getDateFormat(dateDebut.value), dashboardService.getDateFormat(dateFin.value)).then((response) => {

        noteImmList.value = response.data;
    })


    setTimeout(() => {
        loading.value = false;
    }, 2000);
};

const selectedSite = ref({});
const siteList = ref([]);
const noteImmList = ref([]);

onMounted(() => {
    dashboardService.getPrivilegesSites().then((response) => {
        siteList.value = response.data;
    })
})

</script>
<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>SITUATION DES APUREMENTS PAR NATURE D'OPERATION</h5>
                <div class="card flex justify-center flex-wrap gap-3">

                    <Calendar v-model="dateDebut" showIcon dateFormat="dd/mm/yy" />

                    <Calendar v-model="dateFin" showIcon dateFormat="dd/mm/yy" />
                    <Dropdown v-model="selectedSite" :options="siteList" filter optionLabel="name"
                        placeholder="Select a Site" class="w-auto md:w-[14rem] ">
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
                    <Button type="button" label="Recherche" icon="pi pi-search" :loading="loading"
                        @click="load"></Button>
                </div>

            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <DataTable :value="noteImmList" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="site" header="NATURE" style="width: auto"></Column>
                    <Column field="noms" header="NOMBRE" style="width: auto"></Column>
                    <Column field="numImpot" header="PART TRESOR" style="width: auto"></Column>
                    <Column field="numImpot" header="PART DGI" style="width: auto"></Column>
                    <Column field="numChassis" header="PART RTNC" style="width: auto"></Column>
                    <Column field="numPlaque" header="PART UTSCH" style="width: auto"></Column>
                    <Column field="genre" header="PART VALORNET" style="width: auto"></Column>
                    <Column field="marque" header="TOTAL PAYE" style="width: auto"></Column> 
                </DataTable>
            </div>
        </div>
    </div>
</template>
