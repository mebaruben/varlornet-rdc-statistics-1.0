//import AuthService from '../service/'
import dashboardSonasService from "../service/dashboard.sonas.service";

export default {
    namespaced: true,

    state: {
        dashOperation: {},
        messageError: null,
        chartPiedList: []
    },

    getters: {
    },

    mutations: {
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
        sitesByprofile({ commit }) {
            return axiosClient.get('/privileges/profile/sites').then(({ response }) => {
                commit('setSites', response);
                return response;
            });
        },

        sitesByprofile({ commit }) {
            return axiosClient.get('/privileges/profile/sites').then(({ response }) => {
                commit('setSites', response);
                return response;
            });
        },

        appelServiceOperation({ commit }, dateRech) {
            let list=[];
            commit('removeChartPiedList');
            return dashboardSonasService.appelServiceOperation(dateRech).then(response => {
                dashboardSonasService.getDateDashboardList(response).forEach((item) => {
                    console.log(item);
                    list.push(item);
                })
                console.log(list.length);
                commit('setChartPiedList', list);
            });
            
        },

        appelServiceOperationParDateRechEtParSite({ commit }, payloadUser) {
            console.log("data store : " ,payloadUser.dateRech , payloadUser.site )
            let list=[];
            commit('removeChartPiedList');
            return dashboardSonasService.appelServiceOperationParDateRechEtParSite(payloadUser.dateRech ,payloadUser.site).then(response => {
                console.log("data store : " ,response )
                dashboardSonasService.getDateDashboardList(response).forEach((item) => {
                    console.log(item);
                    list.push(item);
                })
                console.log(list.length);
                commit('setChartPiedList', list);
            });
            
        }
    }
};
