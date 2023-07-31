import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API

const callApi = (method, url, data = null) => {
    return axios[method](url, data)
    .then(response => response.data)
    .catch(error => error.response);
};

export const GetWarga = (search, page, limit, nik) => {
    return callApi('get', `${apiUrl}/warga?search=${search}&page=${page}&limit=${limit}&nik=${nik}`);
};

export const GetWargaById = (id) => {
    return callApi('get', `${apiUrl}/warga/select?id=${id}`)
}

export const GetAllSurat = (page, limit, name) => {
    return callApi('get', `${apiUrl}/surat/all?page=${page}&limit=${limit}&nama_surat=${name}`)
}

export const GetSuratByType = (name, id, id_warga, no_surat, id_pegawai) => {
    return callApi('get', `${apiUrl}/surat/type?name=${name}&id=${id}&id_warga=${id_warga}&no_surat=${no_surat}&id_pegawai=${id_pegawai}`);
};
  
export const CreateSuratByType = (data) => {
    return callApi('post', `${apiUrl}/surat/type`, data);
};
  
export const UpdateSuratByType = (data) => {
    return callApi('put', `${apiUrl}/surat/type/update`, data);
};
  