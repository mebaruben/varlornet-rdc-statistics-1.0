import api from '../service/api';
import moment from 'moment';

class DashBoardService {
    getDateDashboard(nombreJour) {
        var date = new Date();
        local.setDate(date + nombreJour);
        local.getDay;
        local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
        return local.toJSON().slice(0, 10);
    }

    getDateFormat(dateData) {
        return moment(dateData).format('yyyy-MM-DD');
    }

    appelServiceOperation(dateRech) {
        return api.get('/dash/notes/' + dateRech).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    appelServiceOperationSite(dateRech, nomSite) {
        return api.get('/dash/notes/' + nomSite + '/' + dateRech).then((response) => {
            //  console.log('response appelServiceOperationSite:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServicePlaques(dateRech) {
        return api.get('/dash/plaques/' + dateRech).then((response) => {
            console.log('response appelServicePlaques:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServicePlaqueSite(dateRech, nomSite) {
        return api.get('/dash/plaques/' + nomSite + '/' + dateRech).then((response) => {
            console.log('response appelServicePlaqueSite:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServiceCommisssion(date) {
        return api.get('/finances/dash/courtier/' + date).then((response) => {
            console.log('response appelServiceCommisssion:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServiceRecetteRtnc(dateRech) {
        return api.get('/finances/dash/' + dateRech + '/rtnc').then((response) => {
            console.log('response appelServiceRecetteRtnc:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServiceRecetteSite(dateRech, nomSite) {
        return api.get('/finances/dash/' + nomSite + '/' + dateRech).then((response) => {
            console.log('response appelServiceRecetteSite:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServiceFinanceSite(dateRech) {
        return api.get('/finances/dash/' + dateRech).then((response) => {
            console.log('response appelServiceFinanceSite:' + JSON.stringify(response.data));
            return response;
        });
    }

    getDateDashboardList(response) {
        let list = [];
        let imm = {
            id: 1,
            operation: 'IMMATRICULATION',
            emise: response.data['operations']['IMMATRICULATION'].emise,
            apure: response.data['operations']['IMMATRICULATION'].apure_non_valide,
            valide: response.data['operations']['IMMATRICULATION'].valide
        };
        let mut = { id: 2, operation: 'MUTATION', emise: response.data['operations']['MUTATION'].emise, apure: response.data['operations']['MUTATION'].apure_non_valide, valide: response.data['operations']['MUTATION'].valide };
        let con = {
            id: 3,
            operation: 'REIMMATRICULATION',
            emise: response.data['operations']['REIMMATRICULATION'].emise,
            apure: response.data['operations']['REIMMATRICULATION'].apure_non_valide,
            valide: response.data['operations']['REIMMATRICULATION'].valide
        };
        let dup = { id: 4, operation: 'DUPLICATA', emise: response.data['operations']['DUPLICATA'].emise, apure: response.data['operations']['DUPLICATA'].apure_non_valide, valide: response.data['operations']['DUPLICATA'].valide };
        let it = {
            id: 5,
            operation: 'IMMATRICULATION TEMPORAIRE',
            emise: response.data['operations']['IMMATRICULATION TEMPORAIRE'].emise,
            apure: response.data['operations']['IMMATRICULATION TEMPORAIRE'].apure_non_valide,
            valide: response.data['operations']['IMMATRICULATION TEMPORAIRE'].valide
        };
        let change = {
            id: 6,
            operation: "CHANGEMENT D'ADRESSE",
            emise: response.data['operations']["CHANGEMENT D'ADRESSE"].emise,
            apure: response.data['operations']["CHANGEMENT D'ADRESSE"].apure_non_valide,
            valide: response.data['operations']["CHANGEMENT D'ADRESSE"].valide
        };

        // console.log(dataImm);
        list.push(imm);
        list.push(mut);
        list.push(con);
        list.push(dup);
        list.push(it);
        list.push(change);
        console.log(list.length);
        console.log(list);
        return list;
    }

    getCardDataDash(response1, response2) {
        let list = [];
    }

    getPrivilegesSites() {
        return api.get('/privileges/profile/sites').then((response) => {
            console.log(response.data);
            return response;
        });
    }
}
export default new DashBoardService();
