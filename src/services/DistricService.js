import axios from 'axios';

const API_URL = 'https://localhost:7079/api';

const DistrictService = {
    async GetDistrictService() {
        return axios.get(`${API_URL}/Distrito`, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};

export default DistrictService;