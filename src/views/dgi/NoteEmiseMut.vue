<script setup>
import { ref, onMounted } from 'vue';
import dashboardService from '../../service/dashboard.service';
import statistiqueDgiService from '../../service/statistique.dgi.service';

const dateDebut = ref(null);
const dateFin = ref(null);
const loading = ref(false);

const load = () => {
    console.log(dateDebut.value, dateFin.value, selectedSite.value.id)
    loading.value = true;

    console.log(dashboardService.getDateFormat(dateDebut.value));

    ;

    statistiqueDgiService.statNoteMutation(selectedSite.value.id, dashboardService.getDateFormat(dateDebut.value), dashboardService.getDateFormat(dateFin.value)).then((response) => {

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
                <h5>Liste des Mutations tirées</h5>
                <div class="card flex justify-center flex-wrap gap-3">

                    <Calendar v-model="dateDebut" showIcon dateFormat="dd/mm/yy" />

                    <Calendar v-model="dateFin" showIcon dateFormat="dd/mm/yy" />
                    <Dropdown v-model="selectedSite" :options="countries" filter optionLabel="name"
                    placeholder="Select a Site" class="w-auto md:w-[14rem] ">
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
                    <Button type="button" label="Recherche" icon="pi pi-search" :loading="loading"
                        @click="load"></Button>
                </div>

            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <DataTable :value="noteList" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="numOp" header="OPERATION" style="width: auto"></Column>
                    <Column field="site" header="SITE" style="width: auto"></Column>
                    <Column field="noms" header="NOM OU RAISSON SOCIALE" style="width: auto"></Column>
                    <Column field="numImpot" header="NIF" style="width: auto"></Column>
                    <Column field="numChassis" header="CHASSIS" style="width: auto"></Column>
                    <Column field="numPlaque" header="PLAQUE" style="width: auto"></Column>
                    <Column field="genre" header="GENRE" style="width: auto"></Column>
                    <Column field="marque" header="MARQUE" style="width: auto"></Column>
                    <Column field="modele" header="MODELE" style="width: auto"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
