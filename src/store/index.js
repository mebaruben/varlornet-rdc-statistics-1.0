import { createStore } from 'vuex';
import auth from '../store/auth.module'
import dashboard from   '../store/dashboard.module'

const store = createStore({
    modules:{
        auth , dashboard
    }
});

export default store;
