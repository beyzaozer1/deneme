import ApiService from "@/core/services/api.service";
import router from '@/router';
import querystring from 'querystring';

const BASE = 'SOLUTION_CENTER';

export const MODULE_NAME = 'solutionCenter';
export const BASE_URL = `/mobile/solutionCenter`;
export const HIT_URL = `/mobile/solutionCenter/hit`;

export const LOADING = `${BASE}/LOADING`;
export const GENERAL_LOADING = `${BASE}/GENERAL_LOADING`;
export const ERROR = `${BASE}/ERROR`;
export const SUCCESS = `${BASE}/SUCCESS`;
export const ITEMS = `${BASE}/ITEMS`;
export const CATEGORIES = `${BASE}/CATEGORIES`;
export const CURRENT_ITEM = `${BASE}/CURRENT_ITEM`;

export const SET_LOADING = `${BASE}/M/LOADING`;
export const SET_GENERAL_LOADING = `${BASE}/M/GENERAL_LOADING`;
export const SET_ERROR = `${BASE}/M/ERROR`;
export const SET_SUCCESS = `${BASE}/M/SUCCESS`;
export const SET_ITEMS = `${BASE}/M/ITEMS`;
export const SET_CATEGORIES = `${BASE}/M/CATEGORIES`;
export const SET_CURRENT_ITEM = `${BASE}/M/CURRENT_ITEM`;
export const RESET_VALUES = `${BASE}/M/RESET_VALUES`;

// ACTIONS
export const GET_ITEMS = `${BASE}/GET_ITEMS`;
export const GET_CATEGORIES = `${BASE}/GET_CATEGORIES`;
export const GET_ITEM_DETAIL_BY_ID = `${BASE}/GET_ITEM_DETAIL_BY_ID`;
export const CREATE_ITEM = `${BASE}/CREATE_ITEM`;
export const HIT_ITEM = `${BASE}/HIT_ITEM`;
export const UPDATE_ITEM_BY_ID = `${BASE}/UPDATE_ITEM_BY_ID`;
export const DELETE_ITEM_BY_ID = `${BASE}/DELETE_ITEM_BY_ID`;

const config = {
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        'Content-Type': 'application/json',
    }
}

const state = {
    items: null,
    categories: null,
    currentItem: null,
    loading: false,
    general_loading: false,
    error: null,
    success: null,
};

const getters = {
    [LOADING]: (state) => {
        return state.loading;
    },
    [GENERAL_LOADING]: (state) => {
        return state.general_loading;
    },
    [ERROR]: (state) => {
        return state.error;
    },
    [SUCCESS]: (state) => {
        return state.success;
    },
    [ITEMS]: (state) => {
        return state.items;
    },
    [CATEGORIES]: (state) => {
        return state.categories;
    },
    [CURRENT_ITEM]: (state) => {
        return state.currentItem;
    },
};

const mutations = {
    [SET_LOADING]: (state, payload) => {
        state.loading = payload;
    },
    [SET_GENERAL_LOADING]: (state, payload) => {
        state.general_loading = payload;
    },
    [SET_ERROR]: (state, payload) => {
        state.error = payload;
    },
    [SET_SUCCESS]: (state, payload) => {
        state.success = payload;
    },
    [SET_ITEMS]: (state, payload) => {
        state.items = payload;
    },
    [SET_CATEGORIES]: (state, payload) => {
        state.categories = payload;
    },
    [SET_CURRENT_ITEM]: (state, payload) => {
        state.currentItem = payload;
    },
    [RESET_VALUES]: (state) => {
        state.success = null;
        state.error = null;
        state.loading = false;
        state.items = [];
        state.currentItem = null;
    },
};

const actions = {
    [GET_ITEMS]: (context, payload) => {
        let url = payload.url;
        let filters = payload.filters;
        if('showLoading' in payload && payload.showLoading){
            context.commit(SET_LOADING, true);
        }
        if (payload.hasOwnProperty('isAuthenticated') && payload.isAuthenticated) {
            config.headers.Authorization = 'Bearer ' + payload.isAuthenticated;
        }

        return ApiService.get(`${url}?` + querystring.stringify(filters), "", config)
            .then((response) => {
                if(!payload.acceptPromise){
                    context.commit(SET_ITEMS, response.data);
                }
                if('showLoading' in payload && payload.showLoading){
                    context.commit(SET_LOADING, false);
                }
                return {status: true, data: response.data};
            })
            .catch((error) => {
                context.commit(SET_ERROR, error);
                return {status: false, error: error};
            });
    },
    [GET_CATEGORIES]: (context, payload) => {
        let url = payload.url;
        let filters = payload.filters;
        if('showLoading' in payload && payload.showLoading){
            context.commit(SET_LOADING, true);
        }

        if (payload.hasOwnProperty('isAuthenticated') && payload.isAuthenticated) {
            config.headers.Authorization = 'Bearer ' + payload.isAuthenticated;
        }

        return ApiService.get(`${url}?` + querystring.stringify(filters),"", config)
            .then((response) => {
                if(!payload.acceptPromise){
                    context.commit(SET_CATEGORIES, response.data);
                }
                if('showLoading' in payload && payload.showLoading){
                    context.commit(SET_LOADING, false);
                }
                return {status: true, data: response.data};
            })
            .catch((error) => {
                context.commit(SET_ERROR, error);
                return {status: false, error: error};
            });
    },
    [GET_ITEM_DETAIL_BY_ID]: (context, payload) => {
        let url = payload.url;
        context.commit(SET_LOADING, true);
        return ApiService.get(url)
            .then((response) => {
                if(!payload.acceptPromise){
                    context.commit(SET_CURRENT_ITEM, response.data);
                }
                context.commit(SET_LOADING, false);
                return {status: true, data: response.data};

            }).catch((error) => {
            context.commit(SET_ERROR, error);
            router.push({
                name: payload.redirectRouteOnNotFound,
                params: {
                    error: 'general.couldnt_found_item_with_given_id'
                }
            });
        });
    },
    [CREATE_ITEM]: (context, payload) => {
        let url = payload.url;
        let contents = payload.contents;
        let returnType = payload.returnType ? payload.returnType : 'state';

        if (payload.hasOwnProperty('isAuthenticated') && payload.isAuthenticated) {
            config.headers.Authorization = 'Bearer ' + payload.isAuthenticated;
        }

        context.commit(SET_LOADING, true);
        return ApiService.post(url, contents, config).then((response) => {
            context.commit(SET_LOADING, false);
            if (returnType === 'state') {
                context.commit(SET_CURRENT_ITEM, response.data);
            } else {
                return { status: true, data: response.data };
            }
        }).catch((error) => {
            if (returnType === 'state') {
                context.commit(SET_ERROR, error);
            } else {
                return { status: false, data: error };
            }
        });
    },
    [HIT_ITEM]: (context, payload) => {
        let url = payload.url;
        let contents = payload.contents;

        if (payload.hasOwnProperty('isAuthenticated') && payload.isAuthenticated) {
            config.headers.Authorization = 'Bearer ' + payload.isAuthenticated;
        }

        context.commit(SET_LOADING, true);
        ApiService.post(url, contents, config);
    },
    [UPDATE_ITEM_BY_ID]: (context, payload) => {
        let url = payload.url;
        let contents = payload.contents;
        context.commit(SET_LOADING, true);

        if (payload.hasOwnProperty('isAuthenticated') && payload.isAuthenticated) {
            config.headers.Authorization = 'Bearer ' + payload.isAuthenticated;
        }

        ApiService.post(url, contents, config)
            .then((_) => {
                context.commit(SET_LOADING, false);
                context.commit(SET_CURRENT_ITEM, null);
                context.commit(SET_ITEMS, []);
                router.push({name: payload.redirectRouteName, params: {success: payload.successMessage}});
            }).catch((error) => {
            context.commit(SET_ERROR, error);
        });
    },
    [DELETE_ITEM_BY_ID]: (context, payload) => {
        let url = payload.url;
        let id = payload.id;
        context.commit(SET_LOADING, true);
        ApiService.delete(url).then((_) => {
            if(context.state.items.data !== undefined){
                for(let i = 0; i < context.state.items.data.length; i++){
                    let currentItem = context.state.items.data[i];
                    if(Number(id) === Number(currentItem.id)){
                        context.state.items.data.splice(i, 1);
                        break;
                    }
                }
            }else{
                for (let i = 0; i < context.state.items.length; i++) {
                    if (Number(id) === Number(context.state.items[i].id)) {
                        context.state.items.splice(i, 1);
                        break;
                    }
                }
            }
            context.commit(SET_LOADING, false);

        }).catch((error) => {
            context.commit(SET_ERROR, error);
        });
    }

};

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};
