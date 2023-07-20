import axios from "axios";
import Auth from "./auth";

const apiUrl = 'http://localhost:8000/api/v1/user'

export const GetUser = () => {
    return axios.get(apiUrl, Auth())
    .then(response => response.data)
    .catch(error => error.response);
}

export const DeleteUser = (id) => {
    return axios.delete(`${apiUrl}/delete/${id}`, Auth())
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const CreateUser = (data) => {
    return axios.post(apiUrl, data, Auth())
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const UpdateUser = (data) => {
    return axios.put(`${apiUrl}/update`, data, Auth())
    .then(response => response.data)
    .catch(error => {
        throw error;
    });
}

export const LoginUser = (data) => {
    return axios.post(`${apiUrl}/login`, data)
    .then(response => response.data)
    .catch(error => error.response.data)
}
