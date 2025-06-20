import axios from 'axios';

const API_URL = 'https://localhost:7079/api';

const EnrolledDetailService = {
    //     //Método GET para obtener datos de la organización
    //     async GetCatalogeService(idVoluntariado) {
    //         return axios.get(`${API_URL}/VoluntariadoRequisito/VoluntariosPanelUsuarioID`, {
    //             params: { idVoluntariado: idVoluntariado },
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //     },

    async GetEnrolledDetailService(idVoluntario) {
        return axios.get(`${API_URL}/InscripcionVoluntariado/PanelOrganizacion?IdVoluntariado=${idVoluntario}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    // async GetProposalsDetailService(idVoluntariado) {
    //     return axios.get(`${API_URL}/VoluntariadoRequisito/VoluntariadoEditarDetalleOrganizacion`, {
    //         params: { IdVoluntariado: idVoluntariado },
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // },

    async UpdateStatusEnrolledService(data) {
        return axios.put(`${API_URL}/InscripcionVoluntariado/ActualizacionEstado`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    // //Método PUT para actualizar el estado de una organización existente
    // async UpdateStatusProposalsService(data) {
    //     return axios.put(`${API_URL}/VoluntariadoRequisito/ActualizarEstadoPanelOrg`, data, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // },

    // Método POST para unirse a una propuesta como voluntario
    async CreateInscriptionVolunteerService(data) {
        return axios.post(`${API_URL}/InscripcionVoluntariado/Insertar`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default EnrolledDetailService;
