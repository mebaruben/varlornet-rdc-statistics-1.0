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
  }
  
  export default new TokenService();