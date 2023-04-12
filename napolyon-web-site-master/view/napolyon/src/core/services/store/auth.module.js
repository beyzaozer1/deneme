import ApiService from "@/core/services/api.service";
import { assign } from "lodash";
import axios from "axios";
// GETTERS
export const MODULE_NAME = "auth";

const BASE = "AUTH";
export const VERIFY_AUTH = `${BASE}/verifyAuth`;
export const LOGIN = `${BASE}/login`;
export const SEND_EMAIL = `${BASE}/send_email`;
export const FOR = `${BASE}/reset_password`;

export const ERROR = `${BASE}/error`;
export const SUCCESS = `${BASE}/success`;
export const TOKEN = `${BASE}/token`;
export const TOKEN_EXP = `${BASE}/token_exp`;
export const USER = `${BASE}/user`;
export const LOADING = `${BASE}/loading`;
export const IS_AUTHENTICATED = `${BASE}/is_authenticated`;
export const UPDATE_USER = `${BASE}/updateUser`;

// action types
export const GET_USER = `${BASE}/get_user`;
export const LOGOUT = `${BASE}/logout`;
export const REGISTER = `${BASE}/register`;

// mutation types
export const PURGE_AUTH = `${BASE}/M/logOut`;
export const SET_AUTH = `${BASE}/M/setAuth`;
export const SET_USER = `${BASE}/M/setUser`;
export const SET_ERROR = `${BASE}/M/setError`;
export const SET_SUCCESS = `${BASE}/M/setSuccess`;
export const SET_LOADING = `${BASE}/M/setLoading`;

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "application/json",
  },
};

const state = {
  errors: null,
  success: null,
  token: null,
  token_exp: 3600,
  user: null,
  loading: false,
  isAuthenticated: window.localStorage.getItem("token"),
};

const getters = {
  [TOKEN]: (state) => {
    return state.token;
  },
  [TOKEN_EXP]: (state) => {
    return state.token_exp;
  },
  [IS_AUTHENTICATED]: (state) => {
    return state.isAuthenticated;
  },
  [ERROR]: (state) => {
    return state.errors;
  },
  [SUCCESS]: (state) => {
    return state.success;
  },
  [USER]: (state) => {
    return state.user;
  },
  [LOADING]: (state) => {
    return state.loading;
  },
};

const actions = {
  [LOGIN](context, credentials) {
    return new Promise((resolve) => {
      context.commit(SET_ERROR, null);
      context.commit(SET_SUCCESS, null);
      context.commit(SET_LOADING, true);
      credentials = assign({}, credentials, {
        type: "password",
        client_id: "portal",
        client_secret: "portal",
        login_type: 1,
      });
      axios
        .post("/mobile/login/token", credentials, {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
            "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
            "Content-Type": "application/json",
          },
        })
        .then(({ data }) => {
          context.commit(SET_SUCCESS, data);
          context.commit(SET_AUTH, data);
          context.commit(SET_LOADING, false);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ERROR, response.data);
        });
    });
  },
  [SEND_EMAIL](context, credentials) {
    return new Promise((resolve) => {
      credentials = assign({}, credentials);
      ApiService.post("api/forgot-password", credentials)
        .then(({ data }) => {
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_ERROR, response.data);
        });
    });
  },
  [GET_USER](context, payload) {
    return new Promise((resolve) => {
      context.commit(SET_LOADING, true);
      context.commit(SET_ERROR, null);
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type",
          "Content-Type": "application/json",
        },
      };
      if (payload && payload.token) {
        config.headers.Authorization = "Bearer " + payload.token;
      } else {
        config.headers.Authorization =
          "Bearer " + localStorage.getItem("token");
      }

      axios.post("/mobile/login/user", {}, config)
        .then(({ data }) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_USER, data);
          resolve(data);
        })
        .catch((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ERROR, response);
        });
    });
  },
  [REGISTER](context, payload) {
    return new Promise((resolve) => {
      let contents = payload.contents;
      let url = payload.url;
      context.commit(SET_LOADING, true);

      ApiService.post(url, contents, config)
        .then(({ data }) => {
          context.commit(SET_LOADING, false);
          resolve(data);
        })
        .catch(({ response }) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ERROR, response.data);
        });
    });
  },
  [LOGOUT](context) {
    context.commit(PURGE_AUTH);
  },
  [VERIFY_AUTH](context) {
    if (!window.localStorage.getItem("token")) {
      context.commit(PURGE_AUTH);
    }
  },
  [UPDATE_USER]: (context, payload) => {
    let url = payload.url;
    let contents = payload.contents;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    context.commit(SET_SUCCESS, false);
    ApiService.post(url, contents)
      .then((response) => {
        context.commit(SET_LOADING, false);
        context.commit(SET_SUCCESS, true);
        context.commit(SET_USER, response.data);
      })
      .catch((error) => {
        context.commit(SET_ERROR, error);
      });
  },
};

const mutations = {
  [SET_ERROR](state, error) {
    state.errors = error;
  },
  [SET_SUCCESS](state, payload) {
    state.success = payload;
  },
  [SET_AUTH](state, user) {
    state.isAuthenticated = user.access_token;
    state.token = user;
    state.token_exp = user.expires_in;
    state.errors = null;
    window.localStorage.setItem("token", user.access_token);
    window.localStorage.setItem("refresh_token", user.refresh_token);
  },
  [SET_USER](state, user) {
    state.user = user;
  },
  [SET_LOADING](state, loading) {
    state.loading = loading;
  },
  [PURGE_AUTH](state) {
    state.errors = null;
    state.success = null;
    state.token = null;
    state.user = null;
    state.loading = false;
    state.isAuthenticated = false;

    delete state.errors;
    delete state.success;
    delete state.token;
    delete state.user;
    delete state.loading;
    delete state.isAuthenticated;

    let storage = window.localStorage;
    let rememberMe = storage.getItem("remember_me");
    window.localStorage.clear();
    window.localStorage.setItem("remember_me", rememberMe);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters,
};
