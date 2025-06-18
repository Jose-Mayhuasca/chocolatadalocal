import axios from 'axios';

const API_URL = 'https://localhost:7079/api';

const ProposalsService = {
    //Método GET para obtener datos de la organización
    async GetProposalsService(idOrganizacion) {
        return axios.get(`${API_URL}/VoluntariadoRequisito/VoluntariadoPanelOrganizacionID`, {
            params: { IdOrganizacion: idOrganizacion },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    async GetProposalsDetailService(idVoluntariado) {
        return axios.get(`${API_URL}/VoluntariadoRequisito/VoluntariadoEditarDetalleOrganizacion`, {
            params: { IdVoluntariado: idVoluntariado },
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    //Método PUT para actualizar datos de una organización existente
    async UpdateProposalsDetailService(data) {
        return axios.put(`${API_URL}/VoluntariadoRequisito/ActualizarDatosPanelOrg`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    //Método PUT para actualizar el estado de una organización existente
    async UpdateStatusProposalsService(data) {
        return axios.put(`${API_URL}/VoluntariadoRequisito/ActualizarEstadoPanelOrg`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    // Método POST para registrar una nueva organización
    async CreateProposalsService(data) {
        return axios.post(`${API_URL}/VoluntariadoRequisito/RegistrarPanelOrg`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default ProposalsService;
