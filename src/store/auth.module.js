import AuthService from '../service/auth.service';
import tokenService from '../service/token.service';


export default {
    namespaced: true,
    state: {
        userToken: {
            loggedIn: false,
            token: null
        },
        user: {},
        sites: [],
        messageError:null
    },

    getters: {
       
    },

    mutations: {
        setToken: (state, tokenData) => {
            state.userToken.token = tokenData;
            state.userToken.loggedIn = true;
        },

        setUser: (state, userData) => {
            state.user = Object.assign({},userData);
        },

        setUserMesssageError:(state , message)=>{
           state.messageError=message;
        },

        setSites: (state, siteData) => {
            state.sites = siteData;
        },

        loginSuccess(state, token) {
            state.userToken.loggedIn = true;
            state.userToken.token = token;
        },
        loginFailure(state , message) {
            state.messageError = message;
            
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
                    tokenService.setLocalAccessToken(token);
                    return Promise.resolve(token);
                },
                (error) => {
                    commit('loginFailure' , error.response.data);
                    return Promise.reject(error);
                }
            );
        },

        getUserConnected({ commit }) {
            return AuthService.getUserConnected().then(
                (data) => {
                    console.log('utilisateur connecté : ' + data);
                    commit('setUser', data);
                    
                    return data;
                },

                (error) => {
                    commit('loginFailure' , error.response.data);
                    return Promise.reject(error);
                }
            );
        },
        sitesByprofile({ commit }) {
            return axiosClient.get('/privileges/profile/sites').then(({ data }) => {
                commit('setSites', data);
                return data;
            });
        },

        getToken({commit}){
            commit('setToken',tokenService.getLocalAccessToken);
        }
    }
};
