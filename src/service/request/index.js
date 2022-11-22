import axios from "axios";
import {
    BASEURL,
    TIMEOUT
} from "./config";

let mainStore = {}
import('@/stores/modules').then(res => {
    mainStore = res.useMainStore()
});

class HttpRequest {
    constructor(baseURL, timeout = 3000) {
        this.instance = axios.create({
            baseURL,
            timeout
        })
        this.instance.interceptors.request.use(config => {
            mainStore.isLoading = true
            return config
        }, err => {
            return err
        })
        this.instance.interceptors.response.use(res => {
            mainStore.isLoading = false
            return res
        }, err => {
            mainStore.isLoading = false
            return err
        })
    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.instance.request(config)
                .then(res => {
                    resolve(res.data)
                }).catch(err => {
                    reject(err)
                })
        })
    }

    get(config) {
        return this.request({
            ...config,
            method: 'GET'
        })
    }

    post(config) {
        return this.request({
            ...config,
            method: 'POST'
        })
    }
}

export default new HttpRequest(BASEURL, TIMEOUT);