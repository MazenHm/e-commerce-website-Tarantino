import axios from "axios"

export const baseUrl = "http://localhost:8080/v1/api"
export const baseUrlImage = "http://localhost:8080"
export const Api = axios.create({
    baseURL: baseUrl
})