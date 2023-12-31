import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API
import Auth from './auth'

const callApi = (method, url, data = null, auth) => {
    return axios[method](url, data, auth)
    .then(response => response.data)
    .catch(error => error.response);
};

export const GetWarga = (search, page, limit, nik) => {
    return callApi('get', `${apiUrl}/warga?search=${search}&page=${page}&limit=${limit}&nik=${nik}`,  Auth());
};

export const GetWargaById = (id) => {
    return callApi('get', `${apiUrl}/warga/select?id=${id}`,  Auth())
}

export const GetAllSurat = (page, limit, name) => {
    return callApi('get', `${apiUrl}/surat/all?page=${page}&limit=${limit}&nama_surat=${name}`,  Auth())
}

export const GetSuratByType = (name, id, id_warga, no_surat, id_pegawai, search, page, limit) => {
    return callApi('get', `${apiUrl}/surat/type?name=${name}&id=${id}&id_warga=${id_warga}&no_surat=${no_surat}&id_pegawai=${id_pegawai}&search=${search}&page=${page}&limit=${limit}`, Auth());
};
  
export const CreateSuratByType = (data) => {
    return callApi('post', `${apiUrl}/surat/type`, data, Auth());
};
  
export const UpdateSuratByType = (data) => {
    return callApi('put', `${apiUrl}/surat/type/update`, data, Auth());
};

// usaha
export const GetSuratKetUsaha = (name, id) => {
    return callApi('get', `${apiUrl}/surat/usaha?name=${name}&id=${id}`, Auth())
}

export const CreateSuratKetUsaha = (data) => {
    return callApi('post', `${apiUrl}/surat/usaha`, data, Auth())
}

export const UpdateSuratKetUsaha = (data) => {
    return callApi('put', `${apiUrl}/surat/usaha/update`, data, Auth())
}

// kematian
export const getSuratKematian = (id) => {
    return callApi('get', `${apiUrl}/surat/kematian?id=${id}`, Auth())
}

export const CreateSuratKematian = (data) => {
    return callApi('post', `${apiUrl}/surat/kematian`, data, Auth())
}

export const UpdateSuratKematian = (data) => {
    return callApi('put', `${apiUrl}/surat/kematian/update`, data, Auth())
}

// dashboard
export const GetDataDashboard = () => {
    return callApi('get', `${apiUrl}/dashboard`, Auth())
}