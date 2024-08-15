
import dashboardRtncService from "../service/dashboard.rtnc.service";

export default{
    namespaced: true,

    state: {
        
        cardListDashboard: [] ,
    },

    mutations:{

        setCardListDashboard(state, cardListDashboardData) {
            state.cardListDashboard = cardListDashboardData;
        },
    },

    actions:{

     async  listCardDashboardData({ commit }, payloadUser) {
            console.log('data store rtnc : ', payloadUser.dateRech, payloadUser.site);
            let list = await dashboardRtncService.getCardDataDashParSite(payloadUser.site , payloadUser.dateRech);
            console.log("data load  rtnc : " , list );
            commit("setCardListDashboard", list);
            return list;
        }
    }
}