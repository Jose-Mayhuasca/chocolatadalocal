import axios from 'axios';

const API_URL = 'https://localhost:7079/api';

const ProfileOrganizationService = {
    async GetProfileOrganizationService(idOrganizacion) {
        return axios.get(`${API_URL}/Organizacion/ID?IdOrganizacion=${idOrganizacion}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },

    async UpdateProfileOrganizationService(data) {
        return axios.put(`${API_URL}/Organizacion/Actualizar`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    },
    
    async UpdatePasswordOrganizationService(data) {
        return axios.put(`${API_URL}/Organizacion/ActualizarContrasenia`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

};

export default ProfileOrganizationService;
