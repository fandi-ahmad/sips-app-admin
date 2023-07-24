import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API 

export const GetPegawai = () => {
    return axios.get(`${apiUrl}/pegawai`,)
    .then(response => response.data)
    .catch(error => error.response)
}

export const CreatePegawai = (data) => {
    return axios.post(`${apiUrl}/pegawai`, data)
    .then(response => response.data)
    .catch(error => error.response);
}

export const DeletePegawai = (id) => {
    return axios.delete(`${apiUrl}/pegawai/delete/${id}`)
    .then(response => response.data)
    .catch(error => error.response);
}

export const UpdatePegawai = (data) => {
    return axios.put(`${apiUrl}/pegawai/update`, data)
    .then(response => response.data)
    .catch(error => error.response);
}
