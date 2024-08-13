import api from '../service/api';
import moment from 'moment';
import tokenService from './token.service';
class DashBoardRtncService {
    appelServiceRecetteRtnc(dateRech) {
        return api.get('/finances/dash/' + dateRech + '/rtnc').then((response) => {
            console.log('response appelServiceRecetteRtnc:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServiceOperationParDateRechEtParSite(dateRech, site) {
        let requete = '';
        if (site === 0) {
            requete = '/dash/notes/' + dateRech + '/rtnc';
        } else {
            requete = '/dash/notes/' + site + '/' + dateRech + '/rtnc';
        }
        return api.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log('response appelServiceOperationParDateRechEtParSite : ', response.data);
            return response;
        });
    }

    getCardFinanceDataParSite(site, dateRech){
        let requeteDashFinance = '';
        console.log(requeteDashFinance, site, dateRech, requeteDashNotes);
        console.log('Date now ', dateRech);

       return api.get('/finances/dash/' + dateRech + '/rtnc').then((response) => {
            console.log("finances dash", response);
            return { id: 3, title: 'RECETTES REALISEES', nombre: response.data.hasOwnProperty('rtnc') ? tokenService.numberWithCommas(response.data.rtnc.total_fc) + '(en FC)' : 0, icon: 'pi pi-dollar' };
        });
    }

    getCardDataDashParSite (site, dateRech)  {
        let list = [];
        let requeteDashNotes = '';
        console.log( site, dateRech, requeteDashNotes);
        console.log('Date now ', dateRech);

       api.get('/dash/notes/' + dateRech + '/rtnc').then((response) => {
            console.log("notes dash : " , response);
            list.push({ id: 1, title: 'OPERATIONS INITIEES', nombre: response.data['operations']['IMMATRICULATION'].emise, icon: 'pi pi-car' });
            list.push({ id: 2, title: 'OPERATIONS PAYEES', nombre: response.data['operations']['IMMATRICULATION'].valide, icon: 'pi pi-car' });  
        });

        return list;
    }

    getStatNotesInitieesPeriodiqueParSite(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = 'operations/notes/' + dateDebut + '/' + dateFin + '/rtnc';
        } else {
            requete = 'operations/notes/' + idSite + '/' + dateDebut + '/' + dateFin + '/rtnc';
        }

        return api.get(requete).then((response) => {
            return response;
        });
    }

    getStatNotesPayeesPeriodiqueParSite(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = 'operations/apurees/' + dateDebut + '/' + dateFin + '/rtnc';
        } else {
            requete = 'operations/apurees/' + idSite + '/' + dateDebut + '/' + dateFin + '/rtnc';
        }
        return api.get(requete).then((response) => {
            return response;
        });
    }
}
export default new DashBoardRtncService();
