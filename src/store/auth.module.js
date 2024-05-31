import AuthService from '../service/auth.service';


export default {
    namespaced: true,
    state: {
        userToken: {
            loggedIn: false,
            token: null
        },
        user: {},
        sites: [],
    },

    getters: {
       
    },

    mutations: {
        setToken: (state, tokenData) => {
            state.userToken.token = tokenData;
        },

        setUser: (state, userData) => {
            state.user = Object.assign({},userData);
        },
        setSites: (state, siteData) => {
            state.sites = siteData;
        },

        loginSuccess(state, token) {
            state.userToken.loggedIn = true;
            state.userToken.token = token;
        },
        loginFailure(state) {
            state.userToken.loggedIn = false;
            state.userToken.token = null;
        },
        logout(state) {
            state.userToken.loggedIn = false;
            state.userToken.token = null;
        }
    },

   

    actions: {
        login({ commit }, user) {
            console.log(user);
            // Login...
            return AuthService.login(user).then(
                (token) => {
                    commit('loginSuccess', token);

                    return Promise.resolve(token);
                },
                (error) => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },

        getUserConnected({ commit, payload }) {
            return AuthService.getUserConnected(payload).then(
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
            return axiosClient.get('/privileges/profile/sites').then(({ data }) => {
                commit('setSites', data);
                return data;
            });
        }
    }
};
