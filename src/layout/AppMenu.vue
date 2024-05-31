<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Dashboard',
        items: [
            
        { label: 'DGI', icon: 'pi pi-fw pi-home', to: '/' } ,
        { label: 'ASSURANCE', icon: 'pi pi-fw pi-home', to: '/' } ,
        { label: 'VARLORNET', icon: 'pi pi-fw pi-home', to: '/' } ,
        { label: 'RTNC', icon: 'pi pi-fw pi-home', to: '/' } ,

        ]
    },
    {
        label: 'Statistiques',
        items: [
            {
                label: 'DGI',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'NOTES EMISES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'IMMATRICULATION', icon: 'pi pi-fw pi-bookmark' , to:'/dgi/note-immatriculation' },
                            { label: 'MUTATION', icon: 'pi pi-fw pi-bookmark' , to:'/dgi/note-mutation'},
                            { label: 'REIMMATRICULATION', icon: 'pi pi-fw pi-bookmark' ,to:'/dgi/note-reimmatriculation' },
                            { label: 'DUPLICATA ', icon: 'pi pi-fw pi-bookmark' , to:'/dgi/note-duplicata'},
                            { label: "CHAN. D'ADRESSE ", icon: 'pi pi-fw pi-bookmark' ,to:'/dgi/note-changement'},
                            { label: "IMMAT. TEMPORAIRE ", icon: 'pi pi-fw pi-bookmark' ,to:'/dgi/note-temporaire'},

                        ]
                    },
                    {
                        label: 'SITUATION PLAQUES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'PLAQUES ATTRIBUEES', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'NOTES APUREES', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'SITUAT. GEN. APUREMENT', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'RECETTES REALISEES', icon: 'pi pi-fw pi-bookmark' },
                                { label: 'PLAQUES/SITES', icon: 'pi pi-fw pi-bookmark' },
                        ]
                    }
                ]
            },
            {
                label: 'ASSURANCE',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'Individuelle',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Affaires Initiées', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Affaires Realisées', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Polices en Cours', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Polices échues', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Financières Réalisées', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Liste des Proprietaires', icon: 'pi pi-fw pi-bookmark' },
                        ]
                    },
                    {
                        label: 'Flotte',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Nouvelle Affaires', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'VALORNET',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    {
                        label: 'COM. DGI',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'COM. ASSURANCE',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
            {
                label: 'RTNC',
                icon: 'pi pi-fw pi-bookmark',
                items: [
                    
                        { label: 'Notes Initiées', icon: 'pi pi-fw pi-bookmark' },
                        { label: 'Notes Payées', icon: 'pi pi-fw pi-bookmark' }
                    
                ]
            }
        ]
    }
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
       
    </ul>
</template>

<style lang="scss" scoped></style>
