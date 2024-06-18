<script setup>
import { computed, ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import tokenService from '../service/token.service';

const userConnected = tokenService.getUser();

const model_dgi = ref([
    {
        label: 'Dashboard',
        items: [

            { label: 'DGI', icon: 'pi pi-fw pi-home', to: '/' },


        ]
    },
    {
        label: 'Statistiques',
        items: [
            {
                label: 'DGI',
                icon: 'pi pi-fw pi-bookmark',
                module: 1,

                items: [
                    {
                        label: 'NOTES EMISES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Immatriculation', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-immatriculation' },
                            { label: 'Mutation', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-mutation' },
                            { label: 'Reimmatriculation', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-reimmatriculation' },
                            { label: 'Duplicata', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-duplicata' },
                            { label: "Chan. Adresse ", icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-changement' },
                            { label: "Immat. Temporaire ", icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-temporaire' },

                        ]
                    },
                    {
                        label: 'SITUATION FINANCIERES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Notes', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/situation-generale-emise' },
                        { label: 'Apurement', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/situation-notes-apure' },
                        { label: 'Sit. gen. apurement', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/situation-generale-apure' },
                        { label: 'Recettes Realisées ', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/tableau-synthese-note' },

                        ]
                    },
                    {
                        label: 'SITUATION PLAQUES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Plaques attribuées', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Plaques/Sites', icon: 'pi pi-fw pi-bookmark' },
                        ]
                    }
                ]
            }
        ]
    }
]);

const model_admin = ref([
    {
        label: 'Dashboard',
        items: [

            { label: 'DGI', icon: 'pi pi-fw pi-home', to: '/', module: 1 },
            { label: 'ASSURANCE', icon: 'pi pi-fw pi-home', to: '/dashboard-assurance', module: 2 },
            { label: 'CARTE ROSE', icon: 'pi pi-fw pi-home', to: '/valornet/dashboard-valornet', module: 3 },
            { label: 'RTNC', icon: 'pi pi-fw pi-home', to: '/dashboard-rtnc', module: 4 },
            { label: 'ARCA', icon: 'pi pi-fw pi-home', to: '/dashboard-arca', module: 4 },

        ]
    },
    {
        label: 'Statistiques',
        items: [
            {
                label: 'DGI',
                icon: 'pi pi-fw pi-bookmark',
                module: 1,

                items: [
                    {
                        label: 'NOTES EMISES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Immatriculation', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-immatriculation' },
                            { label: 'Mutation', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-mutation' },
                            { label: 'Reimmatriculation', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-reimmatriculation' },
                            { label: 'Duplicata', icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-duplicata' },
                            { label: "Chan. Adresse ", icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-changement' },
                            { label: "Immat. Temporaire ", icon: 'pi pi-fw pi-bookmark', to: '/dgi/note-temporaire' },

                        ]
                    },
                    {
                        label: 'SITUATION FINANCIERES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Notes', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/situation-generale-emise' },
                        { label: 'Apurement', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/situation-notes-apure' },
                        { label: 'Sit. gen. apurement', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/situation-generale-apure' },
                        { label: 'Recettes Realisées ', icon: 'pi pi-fw pi-bookmark', to: '/statistiques/tableau-synthese-note' },

                        ]
                    },
                    {
                        label: 'SITUATION PLAQUES',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Plaques attribuées', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Plaques/Sites', icon: 'pi pi-fw pi-bookmark' },
                        ]
                    }
                ]
            },
            {
                label: 'ASSURANCE',
                icon: 'pi pi-fw pi-bookmark',
                module: 2,
                items: [
                    {
                        label: 'Individuelle',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Affaires Initiées', icon: 'pi pi-fw pi-bookmark', to: '/assurance/registre-financiere-initiee' },
                            { label: 'Affaires Realisées', icon: 'pi pi-fw pi-bookmark', to: '/assurance/registre-financiere-realisee' },
                            { label: 'Polices en Cours', icon: 'pi pi-fw pi-bookmark', to: '/assurance/police-en-cours' },
                            { label: 'Polices échues', icon: 'pi pi-fw pi-bookmark', to: '/assurance/police-dechue' },
                            { label: 'Financières Réalisées', icon: 'pi pi-fw pi-bookmark', to: '/assurance/affaire-financiere-realisee' },
                            { label: 'Liste des Proprietaires', icon: 'pi pi-fw pi-bookmark', to: '/assurance/liste-proprietaires' },
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
                label: 'VALORNET-RDC',
                icon: 'pi pi-fw pi-bookmark',
                module: 3,
                items: [
                    {
                        label: 'Nos Commissions',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'dgi', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'assurance', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: 'Production des Plaques',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Reception des plaques', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Livraison des Plaques', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    },
                    {
                        label: "Production des Cartes Roses",
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Reception des carte', icon: 'pi pi-fw pi-bookmark' },
                            { label: 'Livraison des carte', icon: 'pi pi-fw pi-bookmark' }
                        ]
                    }

                ]
            },
            {
                label: 'RTNC',
                icon: 'pi pi-fw pi-bookmark',
                module: 4,
                items: [

                    { label: 'Notes Initiées', icon: 'pi pi-fw pi-bookmark' },
                    { label: 'Notes Payées', icon: 'pi pi-fw pi-bookmark' }

                ]
            },
            {
                label: 'ARCA',
                icon: 'pi pi-fw pi-bookmark',
                module: 4,
                items: [

                    { label: 'Dossiers Assurés', icon: 'pi pi-fw pi-bookmark' },
                    

                ]
            }
        ]
    }
]);

const model_sonas = ref([
    {
        label: 'Dashboard',
        items: [
            { label: 'ASSURANCE', icon: 'pi pi-fw pi-home', to: '/dashboard-assurance', module: 2 },
        ]
    },
    {
        label: 'Statistiques',
        items: [
            {
                label: 'ASSURANCE',
                icon: 'pi pi-fw pi-bookmark',
                module: 2,
                items: [
                    {
                        label: 'Individuelle',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Affaires Initiées', icon: 'pi pi-fw pi-bookmark', to: '/assurance/registre-financiere-initiee' },
                            { label: 'Affaires Realisées', icon: 'pi pi-fw pi-bookmark', to: '/assurance/registre-financiere-realisee' },
                            { label: 'Polices en Cours', icon: 'pi pi-fw pi-bookmark', to: '/assurance/police-en-cours' },
                            { label: 'Polices échues', icon: 'pi pi-fw pi-bookmark', to: '/assurance/police-dechue' },
                            { label: 'Financières Réalisées', icon: 'pi pi-fw pi-bookmark', to: '/assurance/affaire-financiere-realisee' },
                            { label: 'Liste des Proprietaires', icon: 'pi pi-fw pi-bookmark', to: '/assurance/liste-proprietaires' },
                        ]
                    },
                    {
                        label: 'Flotte',
                        icon: 'pi pi-fw pi-bookmark',
                        items: [{ label: 'Nouvelle Affaires', icon: 'pi pi-fw pi-bookmark' }]
                    }
                ]
            },
        ]
    }
]);

const list = (userConnected.data.module == '3') ? model_sonas :
    (userConnected.data.module == '2') ? model_dgi : model_admin;


</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in list" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>

    </ul>
</template>

<style lang="scss" scoped></style>
