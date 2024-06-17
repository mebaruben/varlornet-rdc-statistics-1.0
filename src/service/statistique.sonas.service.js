import axiosClient
 from "./api";
class StatistiqueSONAS{

    statRegistreAffairesInities(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite === '0') {
            requete = '/sonas/initie/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/sonas/initie/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        console.log(requete);
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log(response.data);
            return response;
        });
    }

    statRegistreAffairesRealisees(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite === '0') {
            requete = '/sonas/realise/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/sonas/realise/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        console.log(requete);
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log(response.data);
            return response;
        });
    }

    statListePoliceEchues(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite === '0') {
            requete = '/sonas/nonencours/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/sonas/nonencours/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        console.log(requete);
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log(response.data);
            return response;
        });
    }

    statListePoliceEnCours(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite === '0') {
            requete = '/sonas/encours/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/sonas/encours/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        console.log(requete);
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log(response.data);
            return response;
        });
    }

    statAffairesFinanciereRealisees(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite === '0') {
            requete = '/sonas/affaire/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/sonas/affaire/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        console.log(requete);
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            console.log(response.data);
            return response;
        });
    }

    statListeVehiculesProprietaires(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite === '0') {
            requete = '/sonas/proprio/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/sonas/proprio/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            console.log(response.data);
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }
}

export default new StatistiqueSONAS();