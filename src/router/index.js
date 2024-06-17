import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '@/layout/AppLayout.vue';
import tokenService from '../service/token.service';
import store from '../store';

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
                    path: '/dashboard-assurance',
                    name: 'dashboard-assurance',
                    component: () => import('@/views/Dashboard-Sonas.vue')
                },
                {
                    path: '/dashboard-rtnc',
                    name: 'dashboard-rtnc',
                    component: () => import('@/views/Dashboard-rtnc.vue')
                },
                {
                    path: '/valornet/dashboard-valornet',
                    name: 'dashboard-valornet',
                    component: () => import('@/views/valornet/Dashboard-valornet.vue')
                }
                ,
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
                },
                {
                    path: '/assurance/affaire-financiere-realisee',
                    name: 'affaire-financiere-realisee',
                    component: () => import('@/views/assurance/AffaireFinancieresRealisees.vue')
                },
                {
                    path: '/assurance/registre-financiere-initiee',
                    name: 'registre-financiere-initiee',
                    component: () => import('@/views/assurance/RegistreAffaireInitiees.vue')
                },
                {
                    path: '/assurance/registre-financiere-realisee',
                    name: 'registre-financiere-realisee',
                    component: () => import('@/views/assurance/RegistreAffairesRealisees.vue')
                },
                {
                    path: '/assurance/liste-proprietaires',
                    name: 'liste-proprietaires',
                    component: () => import('@/views/assurance/ListeProprietaires.vue')
                },
                {
                    path: '/assurance/police-en-cours',
                    name: 'police-en-cours',
                    component: () => import('@/views/assurance/ListePoliceEnCoursValidite.vue')
                },
                {
                    path: '/assurance/police-dechue',
                    name: 'police-dechue',
                    component: () => import('@/views/assurance/ListePoliceDechueValidite.vue')
                }
                ,

                {
                    path: '/statistiques/situation-generale-emise',
                    name: 'situation-generale-emise',
                    component: () => import('@/views/statistiques/SituationNotesEmises.vue')
                },
                {
                    path: '/statistiques/situation-notes-apure',
                    name: 'situation-notes-apure',
                    component: () => import('@/views/statistiques/SituationNotesApures.vue')
                },
                {
                    path: '/statistiques/situation-generale-apure',
                    name: 'situation-generale-apure',
                    component: () => import('@/views/statistiques/SituationGeneraleApurementParOperation.vue')
                },
                {
                    path: '/statistiques/tableau-synthese-note',
                    name: 'tableau-synthese-note',
                    component: () => import('@/views/statistiques/TableauSyntheseNotesParOperation.vue')
                },
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
            meta: {
                requiresAuth: true // Add meta field to indicate protected route
              }
        }
    ]
});


  router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
      const token = tokenService.getLocalAccessToken();
      console.log('token router : '+JSON.stringify(token).toString());
      if (token!=null) {  
       // store.dispatch("auth/getToken");  
        next();
      } else {
        // User is not authenticated, redirect to login
        next('/login');
      }
    } else {
      // Non-protected route, allow access
      next('/login');
    }
  });
  

export default router;
