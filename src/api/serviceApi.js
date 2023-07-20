import axios from "axios";
import Auth from "./auth";

const apiUrl = 'http://localhost:8000/api/v1/service'

const config = () => {
    const userToken = localStorage.getItem('user')
    return {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'multipart/form-data'
      }
    }
}

export const GetService = () => {
    return axios.get(apiUrl, Auth())
    .then(response => response.data)
    .catch(error => error.response);
}

export const CreateService = (data) => {
    return axios.post(apiUrl, data, config())
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const DeleteService = (id) => {
    return axios.delete(apiUrl+'/delete/'+id, Auth())
    .then(response => response.data)
    .catch(error => error.response);
}

export const UpdateService = (data) => {
    return axios.put(apiUrl+'/update', data, config())
    .then(response => response.data)
    .catch(error => error.response);
}
