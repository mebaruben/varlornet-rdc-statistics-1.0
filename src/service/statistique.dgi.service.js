import axiosClient from "./api";
class StatistiqueDGI {
    statNoteImmatriculation(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == '') {
            requete = '/nim/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/nim/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        console.log(requete);
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
        
            return response;
        });
    }

    statNoteMutation(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == '') {
            requete = '/mut/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/mut/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    statNoteREImmatriculation(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/con/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/con/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    statNoteDuplicata(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/dup/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/dup/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    statNoteTemporaire(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/temporaires/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/temporaires/' + idSite + '/' + dateDebut + '/' + dateFin;
        }

        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    statNoteChangement(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/changement/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/changement/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }
}

export default new StatistiqueDGI();
