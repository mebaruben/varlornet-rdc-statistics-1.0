<script setup>
import { ref } from 'vue';

const products = ref();
const columns = [
    { field: 'operation', header: 'Opération' },
    { field: 'nom', header: 'Nom  ou Raison Sociale' },
    { field: 'impot', header: "Numéro d'Impot" },
    { field: 'plaque', header: 'Plaque' },
    { field: 'genre', header: 'Genre' },
    { field: 'marque', header: 'Marque' },
    { field: 'modele', header: 'Modèle' },
    { field: 'chassis', header: 'Chassis' }
];
const dateDebut = ref(null);
const dateFin = ref(null);
const loading = ref(false);

const load = () => {
    loading.value = true;
    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
</script>
<template>
    <div class="grid">
        <div class="col-12">
            <div class="card">
                <h5>Notes Emises</h5>
                <div class="card flex justify-center flex-wrap gap-3">

                    <Calendar v-model="dateDebut" showIcon dateFormat="dd/mm/yy" />

                    <Calendar v-model="dateFin" showIcon dateFormat="dd/mm/yy" />
                    <Button type="button" label="Recherche" icon="pi pi-search" :loading="loading"
                        @click="load"></Button>
                </div>

            </div>
        </div>

        <div class="col-12">
            <div class="card">
                <DataTable :value="products" tableStyle="min-width: 50rem">
                    <Column v-for="col of columns" :key="col.field" :field="col.field" :header="col.header"></Column>
                </DataTable>
            </div>
        </div>
    </div>
</template>
