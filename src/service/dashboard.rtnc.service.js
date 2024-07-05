import api from '../service/api';
import moment from 'moment';
import tokenService from './token.service';
class DashBoardRtncService{

    appelServiceRecetteRtnc(dateRech) {
        return api.get('/finances/dash/' + dateRech + '/rtnc').then((response) => {
            console.log('response appelServiceRecetteRtnc:' + JSON.stringify(response.data));
            return response;
        });
    }

    appelServiceOperationParDateRechEtParSite(dateRech , site) {
        let requete="";
        if(site===0){
        requete='/dash/notes/'+ dateRech +'/rtnc'
        }else{
         requete='/dash/notes/'+site+'/'+ dateRech +'/rtnc'
        }
        return api.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log("response appelServiceOperationParDateRechEtParSite : " ,response.data );
            return response;
        });
    }

    getCardDataDashParSite(site, dateRech) {
        let list = [];
        let requeteDashFinance="";
        let requeteDashNotes="";

        if (site != 0) {    
            requeteDashFinance = '/finances/dash/' + site + '/' + dateRech +'/rtnc';
            requeteDashNotes = '/dash/notes/' + site + '/' + dateRech +'/rtnc';
            
        } else {
            requeteDashFinance = '/finances/dash/' + dateRech +'/rtnc';
            requeteDashNotes = '/dash/notes/'+ dateRech +'/rtnc';
        }

        console.log(requeteDashFinance, site, dateRech , requeteDashNotes);
        console.log('Date now ', dateRech);

        api.get(requeteDashNotes).then((res) => {
            console.log(requeteDashNotes, res);
            list.push({ id: 1, title: 'OPERATIONS INITIEES', nombre: res.data['operations']['IMMATRICULATION'].emise, icon: 'pi pi-car' });
            list.push({ id: 2, title: 'OPERATIONS PAYEES', nombre: res.data['operations']['IMMATRICULATION'].valide, icon: 'pi pi-car' });
            console.log(list);
        });

        api.get(requeteDashFinance).then((response) => {
            console.log(requeteDashFinance, response);
            list.push({ id: 3, title: 'RECETTES REALISEES', nombre: response.data.hasOwnProperty('rtnc') ? tokenService. numberWithCommas(response.data.rtnc.total_fc) + "(en FC)"  : 0, icon: 'pi pi-dollar' });
        });

        

        return list;
    }

}
export default new DashBoardRtncService();