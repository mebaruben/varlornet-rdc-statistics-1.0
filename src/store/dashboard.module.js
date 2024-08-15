//import AuthService from '../service/'
import dashboardService from '../service/dashboard.service';

export default {
    namespaced: true,

    state: {
        dashOperation: {},
        messageError: null,
        chartPiedList: [] ,
        siteList: [] ,
        cardlistData:[],
    },

    getters: {


    },

    mutations: {
        setCardlistData:(state , list) =>{
         state.cardlistData=list;
        },
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
        },
        setSiteList(state, siteListData) {
            state.siteList = siteListData;
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
        
      async  sitesByprofile({ commit }) {
            return await axiosClient.get('/privileges/profile/sites').then((response) => {
                commit('setSiteList', response.data);
                return response;
            });
        },

      async  appelServiceOperation({ commit }, dateRech) {
            let list = [];

            return await dashboardService.appelServiceOperation(dateRech).then((response) => {
                dashboardService.getDateDashboardList(response).forEach((item) => {
                    console.log(item);
                    list.push(item);
                });
                console.log(list.length);
                commit('removeChartPiedList');
                commit('setChartPiedList', list);
            });
        },

      async  appelServiceOperationParDateRechEtParSite({ commit }, payloadUser) {
            console.log('data store : ', payloadUser.dateRech, payloadUser.site);
            let list = [];

            return await dashboardService.appelServiceOperationParDateRechEtParSite(payloadUser.dateRech, payloadUser.site).then(
                (response) => {
                    console.log('data store : ', response);
                    dashboardService.getDateDashboardList(response).forEach((item) => {
                        console.log(item);
                        list.push(item);
                    });
                    console.log(list.length);
                    commit('removeChartPiedList');
                    commit('setChartPiedList', list);
                },

                (error) => {
                    commit('loginFailure', error.response.data);
                    return Promise.reject(error);
                }
            );
        } ,

        async  appelServiceOperationCardData({ commit }, payloadUser) {
            console.log('data store : ', payloadUser.dateRech, payloadUser.site);
            let list = [];

            return (await dashboardService.getCardDataDash(dashboardService.getDateFormat(payloadUser.dateRech))).forEach(value =>{
                list.push(value);
                commit('setCardlistData', list);
            } 

        );        
        } ,

        async  appelServiceOperationCardDataParSite({ commit }, payloadUser) {
            console.log('data store : ', payloadUser.dateRech, payloadUser.site);
            let list = [];
            return (await dashboardService.getCardDataDashParSite(payloadUser.site,payloadUser.dateRech)).forEach(value =>{
                list.push(value);
                commit('setCardlistData', list);
            } 
        );        
        } ,

        
    }
};
