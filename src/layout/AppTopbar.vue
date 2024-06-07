<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';
import store from '../store';
import tokenService from '../service/token.service';




const loading = ref(false);

const displayConfirmation = ref(false);

const load = () => {
    displayConfirmation.value=false;
    store.dispatch("auth/logout");
};



const closeConfirmation = () => {
    displayConfirmation.value = false;
    
};

const openConfirmation = () => {
    displayConfirmation.value = true;
};

const { layoutConfig, onMenuToggle } = useLayout();

const outsideClickListener = ref(null);
const topbarMenuActive = ref(false);
const router = useRouter();

const userConnected=tokenService.getUser();


onMounted(() => {
    bindOutsideClickListener();
});

onBeforeUnmount(() => {
    unbindOutsideClickListener();
});

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});

const onTopBarMenuButton = () => {
    topbarMenuActive.value = !topbarMenuActive.value;
};

const topbarMenuClasses = computed(() => {
    return {
        'layout-topbar-menu-mobile-active': topbarMenuActive.value
    };
});

const bindOutsideClickListener = () => {
    if (!outsideClickListener.value) {
        outsideClickListener.value = (event) => {
            if (isOutsideClicked(event)) {
                topbarMenuActive.value = false;
            }
        };
        document.addEventListener('click', outsideClickListener.value);
    }
};
const unbindOutsideClickListener = () => {
    if (outsideClickListener.value) {
        document.removeEventListener('click', outsideClickListener);
        outsideClickListener.value = null;
    }
};
const isOutsideClicked = (event) => {
    if (!topbarMenuActive.value) return;

    const sidebarEl = document.querySelector('.layout-topbar-menu');
    const topbarEl = document.querySelector('.layout-topbar-menu-button');

    return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};







</script>

<template>

    <Toast />


    <div class="layout-topbar">

        <router-link to="/" class="layout-topbar-logo">
            <img src="/demo/images/login/inv.png" alt="logo" />
            <span class="text-lg">INV-STATISTICS 1.0</span>
        </router-link>

        <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
            <i class="pi pi-bars"></i>
        </button>

        <button class="p-link layout-topbar-menu-button layout-topbar-button" @click="onTopBarMenuButton()">
            <i class="pi pi-ellipsis-v"></i>
        </button>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">


        </div>

        <div class="layout-topbar-menu" :class="topbarMenuClasses">  

            <button @click="onTopBarMenuButton()" class="p-link layout-topbar-button">
                <i class="pi pi-user"></i>
                <span>Profile</span>
            </button>
            <span class="text-lg ">{{ userConnected.data.nom }} -{{ userConnected.data.postnom}}-{{ userConnected.data.prenom }}</span>
            <Button type="button" label="Deconnexion" icon="pi pi-search" :loading="loading"
                @click="openConfirmation()">
            </Button>

            <Dialog header="Confirmation" v-model:visible="displayConfirmation" :style="{ width: '350px' }"
                :modal="true">
                <div class="flex align-items-center justify-content-center">
                    <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                    <span>Etes-vous sur de vouloir vous deconnecter?</span>
                </div>
                <template #footer>
                    <Button label="Non" icon="pi pi-times" @click="closeConfirmation" class="p-button-text" />
                    <Button label="Oui" icon="pi pi-check" @click="load" class="p-button-text" autofocus />
                </template>
            </Dialog>

        </div>
    </div>
</template>

<style lang="scss" scoped></style>
