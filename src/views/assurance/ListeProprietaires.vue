<script setup>
import { ref, onMounted } from 'vue';
import dashboardService from '../../service/dashboard.service';
import statistiqueSonasService from '../../service/statistique.sonas.service';

const dateDebut = ref(null);
const dateFin = ref(null);
const loading = ref(false);

const load = () => {
    
    loading.value = true;

    console.log(dashboardService.getDateFormat(dateDebut.value));

    let idsite = selectedSite.value !=null ? selectedSite.value.id : '0'

    console.log(dateDebut.value, dateFin.value, idsite)

    statistiqueSonasService.statListeVehiculesProprietaires(idsite, dashboardService.getDateFormat(dateDebut.value), dashboardService.getDateFormat(dateFin.value)).then((response) => {
        console.log(response.data);
        loading.value = false;
        noteList.value = response.data;
    })


    //setTimeout(() => {}, 2000);
}

const selectedSite = ref(null);
const siteList = ref([]);
const noteList = ref([]);

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
                <h5>LISTE DES VEHICULES ET LEURS PROPRIETAIRES DANS LA BASE DE DONNEES</h5>
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
                <DataTable :value="noteList" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]"
                    tableStyle="min-width: 50rem">
                    <Column field="type" header="TYPE DE PROPRIETAIRE" style="width: auto"></Column>
                    <Column field="nomSite" header="SITE" style="width: auto"></Column>
                    <Column field="noms" header="NOMS ET RAISON SOCIALE" style="width: auto"></Column>
                    <Column field="telephones" header="TELEPHONE" style="width: auto"></Column>
                    <Column field="numImpotDgi" header="NIF" style="width: auto"></Column>
                    <Column field="mail" header="MAIL" style="width: auto"></Column>
                    <Column field="marque" header="MARQUE" style="width: auto"></Column>
                    <Column field="modele" header="MODELE" style="width: auto"></Column>
                    <Column field="nombreCv" header="PUISSANCE FISC" style="width: auto"></Column>
                    <Column field="genre" header="GENRE" style="width: auto"></Column>
                    <Column field="usage" header="USAGE" style="width: auto"></Column>
                    <Column field="province" header="PROVINCE" style="width: auto"></Column>
                    <Column field="ville" header="VILLE" style="width: auto"></Column>
                    <Column field="commune" header="COMMUNE" style="width: auto"></Column>
                    <Column field="quartier" header="QUARTIER" style="width: auto"></Column>
                    <Column field="avenue" header="AVENUE" style="width: auto"></Column>
                    <Column field="numero" header="NUMERO" style="width: auto"></Column>
                    <Column field="primeEmise" header="PRIME EMISE" style="width: auto"></Column>
                    <Column field="primeEmiseFc" header="PRIME EMISE(Fc)" style="width: auto"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
