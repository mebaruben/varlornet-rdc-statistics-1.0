class TokenService {
 
    getLocalAccessToken() {
      const token = JSON.parse(localStorage.getItem("token"));
      return token;
    }

    setLocalAccessToken(token){
        console.log(JSON.stringify(token));
        localStorage.setItem("token", JSON.stringify(token));
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