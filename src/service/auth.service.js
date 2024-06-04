import api from './api';
import TokenService from './token.service';

class AuthService {
    
    login(user) {
        console.log('auth: ' + user);

        return api.post('/authentification', user).then((response) => {
            console.log(response.data + ' ' + response.status);
            return response.data;
        });
    }

    logout() {
        TokenService.removeUser();
    }

    getUserConnected() {
        return api.get('/user').then((response) => {
            if (response.data) {
                console.log(JSON.stringify(response.data) + ' ' + response.status);
                TokenService.setUser(response.data);
            }
            return response.data;
        });
    }
}

export default new AuthService();
