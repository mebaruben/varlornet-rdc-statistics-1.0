import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import store from '../store';
import tokenService from '../service/token.service';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            meta: { requiresAuth: true },
            children: [
                {
                    path: '/',
                    name: 'dashboard',
                    component: () => import('@/views/Dashboard.vue')
                },
                {
                    path: '/dgi/note-immatriculation',
                    name: 'note-immatriculation',
                    component: () => import('@/views/dgi/NoteEmise.vue')
                },
                {
                    path: '/dgi/note-mutation',
                    name: 'note-mutation',
                    component: () => import('@/views/dgi/NoteEmise.vue')
                },
                {
                    path: '/dgi/note-reimmatriculation',
                    name: 'note-reimmatriculation',
                    component: () => import('@/views/dgi/NoteEmise.vue')
                },
                {
                    path: '/dgi/note-duplicata',
                    name: 'note-duplicata',
                    component: () => import('@/views/dgi/NoteEmise.vue')
                },
                {
                    path: '/dgi/note-changement',
                    name: 'note-changement',
                    component: () => import('@/views/dgi/NoteEmise.vue')
                },
                {
                    path: '/dgi/note-temporaire',
                    name: 'note-temporaire',
                    component: () => import('@/views/dgi/NoteEmise.vue')
                }
            ]
        },
        {
            path: '/landing',
            name: 'landing',
            component: () => import('@/views/pages/Landing.vue')
        },
        {
            path: '/pages/notfound',
            name: 'notfound',
            component: () => import('@/views/pages/NotFound.vue')
        },
        {
            path: '/auth/access',
            name: 'accessDenied',
            component: () => import('@/views/pages/auth/Access.vue')
        },
        {
            path: '/auth/error',
            name: 'error',
            component: () => import('@/views/pages/auth/Error.vue')
        },

        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/Login.vue')
        }
    ]
});

// GOOD
router.beforeEach((to, from, next) => {

    if(tokenService.getLocalAccessToken()!=null){
        
        store.dispatch('auth/getToken');
        console.log('token router : '+store.userToken.token);

        if (to.name !== 'Login' && store.state.userToken.token != null) 
            next({ name: 'Login' });
        else next();

    }else{
        next({ name: 'Login' });
    }
    
});

export default router;
