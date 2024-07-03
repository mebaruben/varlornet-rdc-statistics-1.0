<script setup>
import { ref, onMounted } from 'vue';
import dashboardService from '../../service/dashboard.service';
import statistiqueDgiService from '../../service/statistique.dgi.service';
import xlsx from 'xlsx/dist/xlsx.full.min'
import moment from 'moment/moment';

const dateDebut = ref(null);
const dateFin = ref(null);
const loading = ref(false);

let JsonData;

const load = () => {
    console.log(dateDebut.value, dateFin.value, selectedSite.value.id)
    loading.value = true;

    console.log(dashboardService.getDateFormat(dateDebut.value));

    statistiqueDgiService.statNoteImmatriculation(selectedSite.value.id, dashboardService.getDateFormat(dateDebut.value), dashboardService.getDateFormat(dateFin.value)).then((response) => {
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



const exportCSV = () => {
    console.log(JsonData);

    import('../../Export2Excel').then((excel)=>{
       
        console.log("Bonjour expor");
        //header in excel
        const Header=["AGENT" , "GENRE","MARQUE","MODELE","NOM & RAISON SOCIALE","NUMERO IMPOTE","OPERATION","PLAQUE" , "SITE"];
       //Field for map with ob data json
        const Field=["agent","genre" ,"marque","modele","noms","numChassis" ,"numImpot","numOp" , "numPlaque" ,"site"];
       //data mapped field and object data
       const Data=FormatJson(Field , JsonData)
       excel.export_json_to_excel(
        {
            header:Header,
            data:Data,
            sheetName:"NOTES EMISES",
            filename:"Note",
            autoWidth:true,
            bookType:"xlsx",
        }
       )
    })
   
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
                <h5>Liste des Nouvelles Immatriculations tirées</h5>
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
