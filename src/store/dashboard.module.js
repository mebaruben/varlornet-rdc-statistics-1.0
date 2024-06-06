//import AuthService from '../service/'
import dashboardService from '../service/dashboard.service';

export default {
    namespaced: true,

    state: {
        dashOperation: {},
        messageError: null,
        chartPiedList: []
    },

    getters: {
        getChartPiedList: (state) => (dateRech) => {
            return dashboardService.appelServiceOperation(dateRech).then(({ response }) => {
                Object.values(this.getDateDashboardList(response)).forEach((data) => {
                    console.log(data);
                    state.chartPiedList.push(data);
                });
            });
        }
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
            return dashboardService.appelServiceOperation(dateRech).then(response => {
                dashboardService.getDateDashboardList(response).forEach((item) => {
                    console.log(item);
                    list.push(item);
                })
                console.log(list.length);
                commit('setChartPiedList', list);
            });
            
        }
    }
};
