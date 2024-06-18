import api from '../service/api';
import moment from 'moment';
import tokenService from '../service/token.service';

class DashBoardServiceSonas {
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

    appelServiceOperationParDateRechEtParSite(dateRech, site) {
        return api.get('/dash/notes/' + site + '/' + dateRech).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log('response appelServiceOperationParDateRechEtParSite : ', response.data);
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

    getServiceAssuranceInitiees(debut , fin){
        return api.get('/sonas/initie/')
    }

    getDateDashboardList(response) {
        console.log('data response : ', response.data);

        let list = [];
        let imm = {
            id: 1,
            operation: 'NOUVELLE AFFAIRE',
            dataOp: [
                { libelle: 'emise', valeur: response.data['operations']['NOUVELLE AFFAIRE'].emise },
                { libelle: 'apure', valeur: response.data['operations']['NOUVELLE AFFAIRE'].apure_non_valide },
                { libelle: 'valide', valeur: response.data['operations']['NOUVELLE AFFAIRE'].valide }
            ]
        };
        let mut = {
            id: 2,
            operation: 'FLOTTE',
            dataOp: [
                { libelle: 'emise', valeur: 0 },
                { libelle: 'apure', valeur: 0 },
                { libelle: 'valide', valeur: 0 }
            ]
        };

        // console.log(dataImm);
        list.push(imm);
        list.push(mut);

        console.log(list.length);
        console.log(list);
        return list;
    }

    getCardDataDash(dateRech) {
        let list = [];
        // let requeteCard= ;
        //  let requetePiedChart;

        // if(asSite != true){ requeteCard='/dash/plaques/'+idSite+'/' + dateRech}else{ requeteCard='/dash/plaques/' + dateRech  }

        // requeteCard='/dash/plaques/' + dateRech

        //  requetePiedChart='/finances/dash/' + dateRech

        // if(asSite != true){ requetePiedChart='/finances/dash/'+idSite+'/' + dateRech }else{ requetePiedChart='/finances/dash/' + dateRech   }

        console.log('Date now ', dateRech);

        api.get('/finances/dash/' + dateRech).then((response) => {
            console.log(response);

            list.push({ id: 4, title: 'RECETTES REALISEES', nombre: response.data.hasOwnProperty('sonas') ? tokenService. numberWithCommas(response.data.sonas.total_fc) + "(en FC)" : 0, icon: 'pi pi-money-bill' });
        });

        api.get('/dash/notes/' + dateRech).then((response) => {
            console.log(response);
            list.push({ id: 1, title: 'OPERATION INITIEES', nombre: response.data['operations']['NOUVELLE AFFAIRE'].emise, icon: 'pi pi-car' });
            list.push({ id: 2, title: 'OPERATIONS APUREES', nombre: response.data['operations']['NOUVELLE AFFAIRE'].apure_non_valide, icon: 'pi pi-car' });
            list.push({ id: 3, title: 'OPERATIONS VALIDEES', nombre: response.data['operations']['NOUVELLE AFFAIRE'].valide, icon: 'pi pi-car' });
            console.log(list);
        });

        return list;
    }

    getCardDataDashParSite(site, dateRech) {
        let list = [];
        let requeteCard;
        let requetePiedChart;

        if (site != 0) {
            requeteCard = '/dash/notes/' + site + '/' + dateRech;
            requetePiedChart = '/finances/dash/' + site + '/' + dateRech;
        } else {
            requeteCard = '/dash/notes/' + dateRech;
            requetePiedChart = '/finances/dash/' + dateRech;
        }

        console.log(requeteCard, site, dateRech, requetePiedChart);
        // requeteCard='/dash/plaques/' + dateRech
        //  requetePiedChart='/finances/dash/' + dateRech
        // if(asSite != true){ requetePiedChart='/finances/dash/'+idSite+'/' + dateRech }else{ requetePiedChart='/finances/dash/' + dateRech   }

        console.log('Date now ', dateRech);

        api.get(requetePiedChart).then((response) => {
            console.log(response);

            list.push({ id: 4, title: 'RECETTES REALISEES', nombre: response.data.hasOwnProperty('sonas') ? response.data.sonas.total : 0, icon: 'pi pi-dollar' });
        });

        api.get(requeteCard).then((response) => {
            console.log(response);
            list.push({ id: 1, title: 'OPERATION INITIEES', nombre: response.data['operations']['NOUVELLE AFFAIRE'].emise, icon: 'pi pi-car' });
            list.push({ id: 2, title: 'OPERATIONS APUREES', nombre: response.data['operations']['NOUVELLE AFFAIRE'].apure_non_valide, icon: 'pi pi-car' });
            list.push({ id: 3, title: 'OPERATIONS VALIDEES', nombre: response.data['operations']['NOUVELLE AFFAIRE'].valide, icon: 'pi pi-car' });
            console.log(list);
        });

        return list;
    }

    getPrivilegesSites() {
        return api.get('/privileges/profile/sites').then((response) => {
            console.log(response.data);
            return response;
        });
    }

    
}
export default new DashBoardServiceSonas();
