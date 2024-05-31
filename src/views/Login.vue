<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useRouter } from 'vue-router';
import store from '../store';
import { mapState } from "vuex";

const { layoutConfig } = useLayout();

const email = ref('');
const password = ref('');

const checked = ref(false);

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

computed(() => {
    mapState(["auth"]);
});

function getUserConnected(email) {

    store.dispatch("auth/getUserConnected", email).then((data) => {

        router.push({ path: '/' })

    }).catch(err => {
        console.log(err)
        console.log(err.message);
        errorMsg.value = err.message;
    })

}

function auth() {

    user = { login: email.value, password: password.value, adresseMac, nomMachine }

    store.dispatch("auth/login", user).then(() => {

        getUserConnected(email);

    }).catch(err => {
        console.log(err)
        console.log(err.message);
        errorMsg.value = err.message;
    })
}

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>
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
                            <Button label="Connexion" class="w-full p-3 text-xl" type="submit"></Button>
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
