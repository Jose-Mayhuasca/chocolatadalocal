import axios from 'axios';

const API_URL = 'https://localhost:7079/api';

const RegisterOrganizationService = {

    async CreateRegisterOrganizationService(data) {
        return axios.post(`${API_URL}/Organizacion/Registrar`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
};

export default RegisterOrganizationService;
