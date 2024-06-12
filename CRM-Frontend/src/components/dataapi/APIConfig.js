import axios from "axios";

export function GetToken() {
    return localStorage.getItem('token');
}
const baseURL = "http://localhost:5000/api";
const token = GetToken();
const config = {
    headers: {
        "content-type": "application/json",
        Authorization: `bearer ${token}`
    },
};

export async function sendEmailTemplate(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, JSON.stringify(data), config);
    return response;
}

export async function loginUser(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, JSON.stringify(data), config);
    return response;
}

export async function registerUser(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, JSON.stringify(data), config);
    return response;
}
export async function loadUser(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, data, config);
    return response;
}

export async function forgotPassword(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, JSON.stringify(data), config);
    return response;
}
export async function resetpassword(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, JSON.stringify(data), config);
    return response;
}

export async function UpdateProfile(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, JSON.stringify(data), config);
    return response;
}

export async function deleteUser(url) {
    const response = await axios.post(`${baseURL}/${url}`, config);
    return response;
}
export async function changepassword(url) {
    const response = await axios.post(`${baseURL}/${url}`, config);
    return response;
}
export async function sendVerificationOtp(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, data);
    return response;
}
export async function VerifyOtp(url, data) {
    const response = await axios.post(`${baseURL}/${url}`, data);
    return response;
}