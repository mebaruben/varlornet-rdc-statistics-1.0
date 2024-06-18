<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useRouter } from 'vue-router';
import store from '../store';
import { mapState } from "vuex";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";
import Toast from 'primevue/toast';

const { layoutConfig } = useLayout();

const toast = useToast();
const confirm = useConfirm();




const showWarn = () => {
    toast.add({ severity: 'warn', summary: 'Warn Message', detail: 'Bonjour hello word', life: 3000 });
};

const email = ref('');
const password = ref('');

const checked = ref(false);

const loading = ref(false);

const adresseMac = "00-FF-22-7C-92-0E";
const nomMachine = "DESKTOP-D8MJB89";

const router = useRouter();

let errorMsg = ref('');

let user = {
    login: '',
    password: '',
    adresseMac: adresseMac,
    nomMachine: nomMachine

}

const confirm1 = (message) => {
    console.log("Bonjour je suis ici")
    confirm.require({
        message: message,
        header: 'Attention',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Annuler',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Valider'
        },
        accept: () => {
           // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
        },
        reject: () => {
           // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
        }
    });
};

computed(() => {
    mapState(["auth"]);
});

function getUserConnected(email) {

    store.dispatch("auth/getUserConnected", email).then((response) => {

        console.log('data user get User connected ', response.data);
        loading.value = false;
        if (response.data.module == '2') {
            router.push({ path: '/' })
        } else if (response.data.module == '3') {
            router.push({ path: '/dashboard-assurance' })
        } else if (response.data.module == '7') {
            router.push({ path: '/dashboard-rtnc' })
        } else {
            router.push({ path: '/' })
        }
    },
        (error) => {
            console.log("login error exception :", error);
            if (error.response) {

                if (error.response.status === 401) {
                    console.log(error.response.data)
                } else if (error.response.status === 403) {
                    console.log(error.response.data)
                } else if (error.response.status === 500) {
                    console.log(error.response.data)
                }
            }
        }

    ).catch(err => {

        loading.value = false;
        console.log()
        console.log(err.message);
        errorMsg.value = err.message;
        email.value = "";
        password.value = "";
    })

}




function auth() {

    user = { login: email.value, password: password.value, adresseMac, nomMachine }

    loading.value = true;

    store.dispatch("auth/login", user).then(() => {

        getUserConnected(email);

    }).catch(err => {
        loading.value = false;
        console.log(err.response.data)
        confirm1(err.response.data)
    })
}

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>

    <Toast />
    <ConfirmDialog></ConfirmDialog>

    <div
        class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">


        <div class="flex flex-column align-items-center justify-content-center">

            <div
                style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">

                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/inv.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Authentification</div>
                        <span class="text-600 font-medium">Veuillez vous connecter avec votre login et le mot de
                            passe</span>
                    </div>
                    <form @submit.prevent="auth">
                        <div>
                            <label for="email" class="block text-900 text-xl font-medium mb-2">Login</label>
                            <InputText id="email" type="text" v-model="email" placeholder="votre login"
                                class="w-full md:w-30rem mb-5" style="padding: 1rem" />

                            <label for="password1" class="block text-900 font-medium text-xl mb-2">Mot de Passe</label>
                            <Password id="password1" v-model="password" placeholder="votre mot de passe"
                                :toggleMask="true" class="w-full mb-3" inputClass="w-full"
                                :inputStyle="{ padding: '1rem' }"></Password>

                            <div class="flex align-items-center justify-content-between mb-5 gap-5">

                            </div>

                            <Toast />
                            <Button label="Connexion" class="w-full p-3 text-xl" :loading="loading"
                                type="submit"></Button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
