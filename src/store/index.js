import { createStore } from 'vuex';
import auth from '../store/auth.module'
import dashboard from   '../store/dashboard.module'
import dashboard_assurance from '../store/dashboard.sonas.module'
import dashboardRtncModule from '../store/dashboard.rtnc.module'

const store = createStore({
    modules:{
        auth , dashboard , dashboard_assurance , dashboardRtncModule
    }
});

export default store;
