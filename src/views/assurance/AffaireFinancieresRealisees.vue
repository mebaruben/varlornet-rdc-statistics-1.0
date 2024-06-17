<script setup>
import { ref, onMounted } from 'vue';
import dashboardService from '../../service/dashboard.service';
import statistiqueSonasService from '../../service/statistique.sonas.service';

const dateDebut = ref(null);
const dateFin = ref(null);
const loading = ref(false);

const load = () => {
    console.log(dateDebut.value, dateFin.value, selectedSite.value.id)
    loading.value = true;

    console.log(dashboardService.getDateFormat(dateDebut.value));

    ;

    statistiqueSonasService.statRegistreAffairesInities(selectedSite.value.id, dashboardService.getDateFormat(dateDebut.value), dashboardService.getDateFormat(dateFin.value)).then((response) => {
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
                <h5>AFFAIRES FINANCIERES REALISEES</h5>
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
                    <Column field="numOp" header="NOM DE L'ASSURANCE" style="width: auto"></Column>
                    <Column field="site" header="ADRESSE" style="width: auto"></Column>
                    <Column field="noms" header="TELEPHONE" style="width: auto"></Column>
                    <Column field="numImpot" header="E-MAIL" style="width: auto"></Column>
                    <Column field="dateOperation" header="NUMERO DE L'OPERATION" style="width: auto"></Column>
                    <Column field="partTresor" header="DATE DE L'OPERATION" style="width: auto"></Column>
                    <Column field="partTresorFc" header="LIBELLE AGENCE" style="width: auto"></Column>
                    <Column field="partSyntell" header="NOM DE L'AGENT" style="width: auto"></Column>
                    <Column field="partSyntellFc" header="PRIME EMISE" style="width: auto"></Column>
                    <Column field="partRtnc" header="PC" style="width: auto"></Column>
                    <Column field="partRtncFc" header="TVA" style="width: auto"></Column>
                    <Column field="partUtsch" header="PART DU COURTIER" style="width: auto"></Column>
                    <Column field="partUtschFc" header="TYPE DE GARANTIE" style="width: auto"></Column>
                    <Column field="montantOp" header="DUREE SOUSCRITE" style="width: auto"></Column>
                    
                </DataTable>
            </div>
        </div>
    </div>
</template>
