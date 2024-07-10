<script setup>
import { ref, onMounted } from 'vue';
import dashboardService from '../../service/dashboard.service';
import statistiqueDgiService from '../../service/statistique.dgi.service';
import dashboardRtncService from '../../service/dashboard.rtnc.service';
import xlsx from 'xlsx/dist/xlsx.full.min'
import moment from 'moment/moment';

const dateDebut = ref(null);
const dateFin = ref(null);
const loading = ref(false);

let JsonData;

const load = () => {

    loading.value = true;

    var  idSite=0;

    if(selectedSite.value !=null){
        idSite=selectedSite.value.id
    }

    console.log(dashboardService.getDateFormat(dateDebut.value) , dashboardService.getDateFormat(dateFin.value) , idSite);

    dashboardRtncService.getStatNotesInitieesPeriodiqueParSite(idSite, dashboardService.getDateFormat(dateDebut.value), dashboardService.getDateFormat(dateFin.value)).then((response) => {
        loading.value = false;
        noteList.value = response.data;
        JsonData=response.data;
        
    })


    // setTimeout(() => { loading.value = false;}, 2000);
};

const dt = ref();

function FormatJson(FilterData , JsonData){

    return JsonData.map((v)=> FilterData.map((j=>{
       console.log(v[j]);
        return v[j];
    })))
}

const exportXLSX = () => {
    let periode;
   if( selectedSite.value !=null ) {
    periode= "NOTES NIM  "+selectedSite.value.nom+" - DU "+dashboardService.getDateFormat(dateDebut.value) +" AU "+dashboardService.getDateFormat(dateDebut.value) +" - "+moment( new Date().getTime()).format("hh:mm:ss");
   }else{
    periode= "NOTES NIM TOUS SITES"+moment( new Date().getTime()).format("DD-MM-YYYY hh:mm:ss");
   }

  const XLSX=xlsx;
  const workbook=XLSX.utils.book_new();
  const workSheet=XLSX.utils.json_to_sheet(noteList.value);
  XLSX.utils.book_append_sheet(workbook,workSheet,"notes emises NIM");
  XLSX.writeFile(workbook,periode +".xlsx");

}



const selectedSite = ref({});
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
                <h5>Liste des Notes Initiées</h5>
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
                    <template #header>
                        <div style="text-align: left">
                            <Button icon="pi pi-external-link" label="Export" @click="exportXLSX(event)" />
                        </div>
                    </template>
                    <Column field="numOp" header="OPERATION" style="width: auto"></Column>
                    <Column field="operation" header="OPERATION" style="width: auto"></Column>
                    <Column field="site" header="SITE" style="width: auto"></Column>
                    <Column field="noms" header="NOM OU RAISSON SOCIALE" style="width: auto"></Column>
                    <Column field="typePersonne" header="TYPE DE PERSONNE" style="width: auto"></Column>
                    <Column field="numImpot" header="NIF" style="width: auto"></Column>
                    <Column field="dateOperation" header="DATE DE L'OPERATION" style="width: auto"></Column>
                    <Column field="partRtnc" header="PART RTNC($)" style="width: auto"></Column>
                    <Column field="partRtncFc" header="PART RTNC(FC)" style="width: auto"></Column>
                    <Column field="partDgi" header="PART DGI($)" style="width: auto"></Column>
                    <Column field="partDgiFc" header="PART DGI(FC)" style="width: auto"></Column>
                    <Column field="partSyntell" header="PART VALORNET($)" style="width: auto"></Column>
                    <Column field="partSyntellFc" header="PART VALORNET(FC)" style="width: auto"></Column>
                    <Column field="montantOp" header="MONTANT($)" style="width: auto"></Column>
                    <Column field="montantOpFc" header="MONTANT(FC)" style="width: auto"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
