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
            requete = '/mutations/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/mutations/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }

    statNoteREImmatriculation(idSite, dateDebut, dateFin) {
        let requete = '';
        if (idSite == 0) {
            requete = '/rei/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/rei/' + idSite + '/' + dateDebut + '/' + dateFin;
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
        if (idSite == null) {
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
        if (idSite == null) {
            requete = '/changements/' + dateDebut + '/' + dateFin;
        } else {
            requete = '/changements/' + idSite + '/' + dateDebut + '/' + dateFin;
        }
        return axiosClient.get(requete).then((response) => {
            //  Object.values(this.getDateDashboardList(response)).forEach((data) =>{ console.log(data);list.push(data); })
            return response;
        });
    }
}

export default new StatistiqueDGI();