//import AuthService from '../service/'
import { computedInject } from "@vueuse/core";
import dashboardSonasService from "../service/dashboard.sonas.service";

export default {
    namespaced: true,

    state: {
        dashOperation: {},
        messageError: null,
        chartPiedList: [] ,
        cardDataList : []
    },

    getters: {
    },

    mutations: {

        setCardlistData:(state , list) =>{
            state.cardDataList=list;
           },

         removeCardlistData:(state)=>{
            state.cardDataList=[];
         }  ,

        setDashOperation: (state, dashOperationData) => {
            state.dashOperation = dashOperationData;
        },

        DashOperationSuccess(state, dashOperationData) {
            state.dashOperation = dashOperationData;
        },

        DashOperationFailure(state) {
            state.userToken.loggedIn = false;
            state.userToken.token = null;
        },
        
        logout(state) {
            state.userToken.loggedIn = false;
            state.userToken.token = null;
        },

        setChartPiedList(state, chartPiedListData) {
            state.chartPiedList = chartPiedListData;
        },

        removeChartPiedList(state) {
            state.chartPiedList = [];
        }
    },

    actions: {
        appelServiceOperation({ commit }, user) {
            console.log(user);
            // Login...
            return AuthService.appelServiceOperation(user).then(
                (response) => {
                    commit('loginSuccess', response);

                    return Promise.resolve(token);
                },
                (error) => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

        appelServiceOperationSite({ commit }) {
            return AuthService.appelServiceOperationSite().then(
                (data) => {
                    console.log('utilisateur connecté : ' + data);
                    commit('setUser', data);
                    return data;
                },

                (error) => {
                    return Promise.reject(error);
                }
            );
        },

     async sitesByprofile({ commit }) {
            return await axiosClient.get('/privileges/profile/sites').then(({ response }) => {
                commit('setSites', response);
                return response;
            });
        },

    async  sitesByprofile({ commit }) {
            return  await axiosClient.get('/privileges/profile/sites').then(({ response }) => {
                commit('setSites', response);
                return response;
            });
        },

     async appelServiceOperation({ commit }, dateRech) {
            let list=[];
            
            return await dashboardSonasService.appelServiceOperation(dateRech).then(response => {
                dashboardSonasService.getDateDashboardList(response).forEach((item) => {
                    console.log(item);
                    list.push(item);
                })
                console.log(list.length);
              //  commit('removeChartPiedList');
                commit('setChartPiedList', list);
            });
            
        },

      async  appelServiceOperationParDateRechEtParSite({ commit }, payloadUser) {
            console.log("data store : " ,payloadUser.dateRech , payloadUser.site )
            let list=[];
            
            return await dashboardSonasService.appelServiceOperationParDateRechEtParSite(payloadUser.dateRech ,payloadUser.site).then(response => {
                console.log("data store : " ,response )
                dashboardSonasService.getDateDashboardList(response).forEach((item) => {
                    console.log(item);
                    list.push(item);
                })
                console.log(list.length);
               // commit('removeChartPiedList');
                commit('setChartPiedList', list);
            });
            
        },

        async  appelServiceOperationCardData({ commit }, dateRech) {
            console.log('date : ', dateRech);
            let list = [];

            return (await dashboardSonasService.getCardDataDash(dateRech)).forEach(value =>{
                list.push(value);
               // commit('removeCardlistData');
                commit('setCardlistData', list);
            } 

        );        
        } ,

        async  appelServiceOperationCardDataParSite({ commit }, payloadUser) {
            console.log('data store : ', payloadUser.dateRech, payloadUser.site);
            let list = [];
            return (await dashboardSonasService.getCardDataDashParSite(payloadUser.site,payloadUser.dateRech)).forEach(value =>{
                list.push(value);
               // commit('removeCardlistData');
                commit('setCardlistData', list);
            } 
        );        
        } ,
    }
};
