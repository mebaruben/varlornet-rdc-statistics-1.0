import { createStore } from 'vuex';
import auth from '../store/auth.module'
import dashboard from   '../store/dashboard.module'
import dashboard_assurance from '../store/dashboard.sonas.module'

const store = createStore({
    modules:{
        auth , dashboard , dashboard_assurance
    }
});

export default store;
