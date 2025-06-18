import axios from 'axios';

const API_URL = 'https://localhost:7079/api';

const RegisterVolunteerService = {

    async CreateRegisterVolunteerService(data) {
        return axios.post(`${API_URL}/Usuario/Registrar`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    
};

export default RegisterVolunteerService;
