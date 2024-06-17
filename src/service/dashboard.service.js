import api from '../service/api';
import moment from 'moment';
import tokenService from './token.service';

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

    appelServiceOperationParDateRechEtParSite(dateRech , site) {
        return api.get('/dash/notes/'+site+'/'+ dateRech).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log("response appelServiceOperationParDateRechEtParSite : " ,response.data );
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

        console.log("data response : " , response.data)

        let list = [];
        let imm = {
            id: 1,
            operation: 'IMMATRICULATION',
            dataOp: [
                { libelle: 'emise', valeur: response.data['operations']['IMMATRICULATION'].emise },
                { libelle: 'apure', valeur: response.data['operations']['IMMATRICULATION'].apure_non_valide },
                { libelle: 'valide', valeur: response.data['operations']['IMMATRICULATION'].valide }
            ]
        };
        let mut = {
            id: 2,
            operation: 'MUTATION',
            dataOp: [
                { libelle: 'emise', valeur: response.data['operations']['MUTATION'].emise },
                { libelle: 'apure', valeur: response.data['operations']['MUTATION'].apure_non_valide },
                { libelle: 'valide', valeur: response.data['operations']['MUTATION'].valide }
            ]
        };

        let con = {
            id: 3,
            operation: 'REIMMATRICULATION',
            dataOp: [
                { libelle: 'emise', valeur: response.data['operations']['REIMMATRICULATION'].emise },
                { libelle: 'apure', valeur: response.data['operations']['REIMMATRICULATION'].apure_non_valide },
                { libelle: 'valide', valeur: response.data['operations']['REIMMATRICULATION'].valide }
            ]
        };
        let dup = {
            id: 4,
            operation: 'DUPLICATA',
            dataOp: [
                { libelle: 'emise', valeur: response.data['operations']['DUPLICATA'].emise },
                { libelle: 'apure', valeur: response.data['operations']['DUPLICATA'].apure_non_valide },
                {
                    libelle: 'valide',
                    valeur: response.data['operations']['DUPLICATA'].valide
                }
            ]
        };

        let it = {
            id: 5,
            operation: 'IMMATRICULATION TEMPORAIRE',
            dataOp: [
                { libelle: 'emise', valeur: response.data['operations']['IMMATRICULATION TEMPORAIRE'].emise },
                { libelle: 'apure', valeur: response.data['operations']['IMMATRICULATION TEMPORAIRE'].apure_non_valide },
                { libelle: 'valide', valeur: response.data['operations']['IMMATRICULATION TEMPORAIRE'].valide }
            ]
        };
        let change = {
            id: 6,
            operation: "CHANGEMENT D'ADRESSE",
            dataOp: [
                { libelle: 'emise', valeur: response.data['operations']["CHANGEMENT D'ADRESSE"].emise },
                { libelle: 'apure', valeur: response.data['operations']["CHANGEMENT D'ADRESSE"].apure_non_valide },
                { libelle: 'valide', valeur: response.data['operations']["CHANGEMENT D'ADRESSE"].valide }
            ]
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

            list.push({ id: 5, title: 'RECETTES REALISEES', nombre: response.data.hasOwnProperty('dgi') ? tokenService. numberWithCommas(response.data.dgi.total_fc) + "(en FC)"  : 0, icon: 'pi pi-dollar' });
        });

        api.get('/dash/plaques/' + dateRech).then((response) => {
            console.log(response);
            list.push({ id: 1, title: 'PLAQUES DISPONIBLES', nombre: response.data.dispo, icon: 'pi pi-car' });
            list.push({ id: 2, title: 'PLAQUES RESERVEES', nombre: response.data.reserve_non_attribue, icon: 'pi pi-car' });
            list.push({ id: 3, title: 'PLAQUES ATTRIBUEES', nombre: response.data.attribue, icon: 'pi pi-car' });
            list.push({ id: 4, title: 'NIM ET REI APUREES', nombre: response.data.attribue, icon: 'pi pi-dollar' });
            console.log(list);
        });

        return list;
    }

    getCardDataDashParSite(site, dateRech) {
        let list = [];
        let requeteCard;
        let requetePiedChart;

        if (site != 0) {
            requeteCard = '/dash/plaques/' + site + '/' + dateRech;
            requetePiedChart = '/finances/dash/' + site + '/' + dateRech;
            
        } else {
            requeteCard = '/dash/plaques/' + dateRech;
            requetePiedChart = '/finances/dash/' + dateRech;
        }

        console.log(requeteCard, site, dateRech , requetePiedChart);
        // requeteCard='/dash/plaques/' + dateRech
        //  requetePiedChart='/finances/dash/' + dateRech
        // if(asSite != true){ requetePiedChart='/finances/dash/'+idSite+'/' + dateRech }else{ requetePiedChart='/finances/dash/' + dateRech   }

        console.log('Date now ', dateRech);

        api.get(requetePiedChart).then((response) => {
            console.log(response);

            list.push({ id: 5, title: 'RECETTES REALISEES', nombre: response.data.hasOwnProperty('dgi') ? response.data.dgi.total : 0, icon: 'pi pi-dollar' });
        });

        api.get(requeteCard).then((response) => {
            console.log(response);
            list.push({ id: 1, title: 'PLAQUES DISPONIBLES', nombre: response.data.dispo, icon: 'pi pi-car' });
            list.push({ id: 2, title: 'PLAQUES RESERVEES', nombre: response.data.reserve_non_attribue, icon: 'pi pi-car' });
            list.push({ id: 3, title: 'PLAQUES ATTRIBUEES', nombre: response.data.attribue, icon: 'pi pi-car' });
            list.push({ id: 4, title: 'NIM ET REI APUREES', nombre: response.data.attribue, icon: 'pi pi-dollar' });
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
export default new DashBoardService();
