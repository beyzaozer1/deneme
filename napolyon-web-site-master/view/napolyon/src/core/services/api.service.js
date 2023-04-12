import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import {Service} from 'axios-middleware';
import router from "@/router";

const baseURL = process.env.VUE_APP_BACKEND_APP_URL;
const service = new Service(axios);

service.register({
    onRequest(config) {
        if (config.url == baseURL + '/mobile/login/token') {
            delete config.headers.Authorization;
        }
        return config;
    },
});

// Add a request interceptor
axios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');

        let anonymousUrl = [
            '/mobile/login/token',
            '/linkTracker',
            '/linkTracker/customRedirect',
            '/linkTracker/callback',
            '/linkTracker/callbackSSI',
        ];

        let url = config.url;
        let founded = false;

        anonymousUrl.forEach((item) => {
            if (url.includes(item)) {
                founded = true;
            }
        })

        if (token && !founded) {
            config.headers['Authorization'] = 'Bearer ' + token;
        } else {
            delete config.headers.Authorization;
        }

        return config;
    },
    error => {
        Promise.reject(error)
    });

axios.interceptors.response.use(
    response => response,
    error => {
        const originalRequest = error.config;
        // Prevent infinite loops
        if (error.message == "Network Error" && originalRequest.url == baseURL + '/mobile/login/token') {
            router.push({name: 'index.login'});
            return Promise.reject(error);
        }

        if (error.message === "Network Error") {
            const refreshToken = localStorage.getItem('refresh_token');
            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
                // exp date in token is expressed in seconds, while now() returns milliseconds:
                const now = Math.ceil(Date.now() / 1000);

                let credentials = {
                    "username": "",
                    "password": "",
                    "type": "refresh_token",
                    "client_id": "portal",
                    "client_secret": "portal",
                    "login_type": 1,
                    "token": localStorage.getItem('refresh_token')
                }

                let tmpHeaders = {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
                        'Content-Type': 'application/json',
                    }
                };
                return axios.post(baseURL + '/mobile/login/token', credentials, tmpHeaders)
                    .then((response) => {
                        localStorage.setItem('token', response.data.access_token);
                        localStorage.setItem('refresh_token', response.data.refresh_token);

                        axios.defaults.headers['Authorization'] = "Bearer " + response.data.access_token;
                        originalRequest.headers['Authorization'] = "Bearer " + response.data.access_token;

                        ApiService.init();
                        ApiService.setHeader();

                        return axios(originalRequest);
                    })
                    .catch(err => {
                        router.push({name: 'index.login'});
                    });
            } else {
                console.log("Refresh token not available.")
                window.localStorage.removeItem("token");
                window.localStorage.removeItem("refresh_token");
                router.push({name: 'index.login'});
            }
        }

        // specific error handling done elsewhere
        return Promise.reject(error);
    }
);

const CONFIG = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Content-Type': 'application/json',
    }
};

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = baseURL;
    },

    /**
     * Set the default HTTP request headers
     */
    setHeader() {
        Vue.axios.defaults.headers.common["Access-Control-Allow-Origin"] = '*';
        Vue.axios.defaults.headers.common["Access-Control-Allow-Methods"] = 'GET, POST, PATCH, PUT, DELETE, OPTIONS';
        Vue.axios.defaults.headers.common["Access-Control-Allow-Headers"] = 'Origin, Content-Type, X-Auth-Token';
        Vue.axios.defaults.headers.common["Content-Type"] = 'application/json';
    },

    getHeader() {
        return Vue.axios.defaults.headers.common;
    },
    query(resource, params, config = CONFIG) {
        return Vue.axios.get(resource, params, config).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    /**
     * Send the GET HTTP request
     * @param resource
     * @param slug
     * @param config
     * @returns {*}
     */
    get(resource, slug = "", config) {
        config = config || CONFIG;

        return Vue.axios.get(`${resource}${slug ? '/' : ''}${slug}`, config).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    },

    /**
     * Set the POST HTTP request
     * @param resource
     * @param params
     * @param config
     * @returns {*}
     */
    post(resource, params, config) {
        config = config || CONFIG;
        return Vue.axios.post(`${resource}`, params, config);
    },

    /**
     * Send the UPDATE HTTP request
     * @param resource
     * @param slug
     * @param params
     * @param config
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    update(resource, slug, params, config = CONFIG) {
        return Vue.axios.put(`${resource}${slug ? '/' : ''}${slug}`, params, config);
    },

    /**
     * Send the PUT HTTP request
     * @param resource
     * @param params
     * @param config
     * @returns {IDBRequest<IDBValidKey> | Promise<void>}
     */
    put(resource, params, config = CONFIG) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        config.headers['Content-Type'] = 'application/json';
        return Vue.axios.put(`${resource}`, params, config);
    },

    /**
     * Send the DELETE HTTP request
     * @param resource
     * @param config
     * @returns {*}
     */
    delete(resource, config = CONFIG) {
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
        return Vue.axios.delete(resource, config).catch(error => {
            throw new Error(`ApiService ${error}`);
        });
    }
};

export default ApiService;
