import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API

const callApi = (method, url, data = null) => {
    return axios[method](url, data)
    .then(response => response.data)
    .catch(error => error.response);
};

export const GetWargaByNik = (nik) => {
    return callApi('get', `${apiUrl}/warga?nik=${nik}`);
};
  
export const GetSuratByType = (name) => {
    return callApi('get', `${apiUrl}/surat/type?name=${name}`);
};
  
export const CreateSuratByType = (data) => {
    return callApi('post', `${apiUrl}/surat/type`, data);
};
  
export const UpdateSuratByType = (data) => {
    return callApi('put', `${apiUrl}/surat/type/update`, data);
};
  