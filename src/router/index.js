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
                    component: () => import('@/views/Dashboard.vue'),
                    meta: {
                        requiresAuth: true // Add meta field to indicate protected route
                      }
                },
                {
                    path: '/dgi/note-immatriculation',
                    name: 'note-immatriculation',
                    component: () => import('@/views/dgi/NoteEmise.vue')
                },
                {
                    path: '/dgi/note-mutation',
                    name: 'note-mutation',
                    component: () => import('@/views/dgi/NoteEmiseMut.vue')
                },
                {
                    path: '/dgi/note-reimmatriculation',
                    name: 'note-reimmatriculation',
                    component: () => import('@/views/dgi/NoteEmiseCon.vue')
                },
                {
                    path: '/dgi/note-duplicata',
                    name: 'note-duplicata',
                    component: () => import('@/views/dgi/NoteEmiseDup.vue')
                },
                {
                    path: '/dgi/note-changement',
                    name: 'note-changement',
                    component: () => import('@/views/dgi/NoteEmiseChangement.vue')
                },
                {
                    path: '/dgi/note-temporaire',
                    name: 'note-temporaire',
                    component: () => import('@/views/dgi/NoteEmiseTemp.vue')
                }
            ]
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
            component: () => import('@/views/Login.vue'),
           
        }
    ]
});

// GOOD
  router.beforeEach((to) => {

    const publicPages=['/login'];
    const authRequired=! publicPages.includes(to.path);
    const token = tokenService.getLocalAccessToken();
    const user=tokenService.getUser();

      console.log('token router : '+JSON.stringify(token).toString());
      if (authRequired && !user) {
       return '/login';
      } 
    
  });

  
  

export default router;
