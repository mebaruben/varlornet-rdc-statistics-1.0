class StatistiqueFinance{

    statFinanceOperationsNotes(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/operations/notes/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/operations/notes/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    } 

    
    statFinanceOperationsApures(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/operations/apurees/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/operations/apurees/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    statFinanceTotaleApuresParOperation(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/finances/apures/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/finances/apures/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    statFinanceRecetteParSite(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/finances/recette/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/finances/recette/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

}
export default new StatistiqueFinance();