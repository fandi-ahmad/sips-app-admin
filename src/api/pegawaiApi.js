import axios from "axios";
// import Auth from "./auth";

const apiUrl = 'http://localhost:8000/api/v1/'

const config = () => {
    const userToken = localStorage.getItem('user')
    return {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data'
      }
    }
}

export const GetPegawai = () => {
    return axios.get(`${apiUrl}/pegawai`, )
    .then(response => response.data)
    .catch(error => error.response);
}

export const CreatePegawai = () => {
    return axios.post(`${apiUrl}/pegawai`, )
    .then(response => response.data)
    .catch(error => error.response);
}
