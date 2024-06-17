class TokenService {
 
    getLocalAccessToken() {
      const token =localStorage.getItem("token");
      return JSON.parse(token);
    }

    setLocalAccessToken(token){
        console.log(JSON.stringify(token));
        localStorage.setItem("token", JSON.stringify(token));
    }

    removeToken() {
      localStorage.removeItem("token");
    }
  
    getUser() {
      return JSON.parse(localStorage.getItem("user"));
    }
  
    setUser(user) {
      console.log(JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    }
  
    removeUser() {
      localStorage.removeItem("user");
    }

    numberWithCommas(x) {
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
  }
  }
  
  export default new TokenService();