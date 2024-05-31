import axios from 'axios';
import store from '../store';

const axiosClient = axios.create({
    //baseURL:"https://api.valornet-rdc.com/StatINV/stat/"
    //https://api.valornet-rdc.com/StatINV/stat/test/
    //"https://192.168.111.3:8080/stat"
    //"http://192.168.0.62:51782/stat"

    baseURL: "http://192.168.0.62:51782/stat",

    withCredentials: true
});

axiosClient.interceptors.request.use((config) => {

    const usertoken = store.state.auth.userToken;

    console.log("token : "+JSON.stringify(usertoken));

    config.headers['Content-Type']="application/json";

    if (usertoken.token!=null) {    
        config.headers.Authorization = 'Bearer ' + JSON.stringify(store.state.auth.userToken.token).toString();
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response) {
            if (error.response.status === 401) {
                console.log(error.response.status)
            } else if (error.response.status === 403) {
                console.log(error.response.status)
            } else if (error.response.status === 500) {
                console.log(error.response.status)
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
