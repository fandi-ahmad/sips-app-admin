import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API

export const GetWargaByNik = (nik) => {
    return axios.get(`${apiUrl}/warga?nik=${nik}`,)
    .then(response => response.data)
    .catch(error => error.response)
}

export const GetSuratByType = (name) => {
    return axios.get(`${apiUrl}/surat/type?name=${name}`,)
    .then(response => response.data)
    .catch(error => error.response)
}

export const CreateSuratByType = (data) => {
    return axios.post(`${apiUrl}/surat/type`, data)
    .then(response => response.data)
    .catch(error => error.response)
}
