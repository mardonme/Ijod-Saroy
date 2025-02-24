import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverUrl});

export const delRes = (id, method) => {
    const token = localStorage.getItem("access_token");
    return API.delete(`/api/${method}/${id}`, {headers: {token}})}
export const deleteUser = (id, method) => {
    const token = localStorage.getItem("access_token");
    return API.delete(`/api/${method}/${id}`, {headers: {token}})}