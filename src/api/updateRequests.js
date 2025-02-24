import axios from "axios"

const serverUrl = process.env.REACT_APP_SERVER_URL;

const API = axios.create({baseURL: serverUrl});

export const updateRes = (id, data, method) => {
    const token = localStorage.getItem("access_token")
    return API.put(`/api/${method}/${id}`, data, {headers: {token}})
}; 