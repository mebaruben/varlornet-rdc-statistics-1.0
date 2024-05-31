import axios from "axios";

const axiosClient =axios.create({
    //baseURL:"https://api.valornet-rdc.com/StatINV/stat/"  

    baseURL:process.env.VUE_APP_ENDPOINT ,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
      },
    
   
});



export default axiosClient;