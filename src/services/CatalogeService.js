import axios from 'axios';

const API_URL = 'https://localhost:7079/api';

const CatalogeService = {
    //     //Método GET para obtener datos de la organización
    //     async GetCatalogeService(idVoluntariado) {
    //         return axios.get(`${API_URL}/VoluntariadoRequisito/VoluntariosPanelUsuarioID`, {
    //             params: { idVoluntariado: idVoluntariado },
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //     },

    async GetCatalogeService(idVoluntariado) {
        return axios.get(`${API_URL}/VoluntariadoRequisito/VoluntariosPanelUsuarioID?IdVoluntariado=${idVoluntariado}`, {
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

    // //Método PUT para actualizar datos de una organización existente
    // async UpdateProposalsDetailService(data) {
    //     return axios.put(`${API_URL}/VoluntariadoRequisito/ActualizarDatosPanelOrg`, data, {
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    // },

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

export default CatalogeService;
