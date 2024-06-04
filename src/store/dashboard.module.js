//import AuthService from '../service/'
export  default {
 namespaced:true,

 state:{
    dashOperation: {},
    messageError:null
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
        return axiosClient.get('/privileges/profile/sites').then(({ data }) => {
            commit('setSites', data);
            return data;
        });
    },

    sitesByprofile({ commit }) {
        return axiosClient.get('/privileges/profile/sites').then(({ data }) => {
            commit('setSites', data);
            return data;
        });
    }
}


}