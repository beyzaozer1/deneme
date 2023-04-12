import ApiService from "@/core/services/api.service";
import querystring from "querystring";

const BASE = "NAP_ACTIONS";

export const MODULE_NAME = `napActions`;
export const BASE_URL = `mobile/memberPoint`;
export const LOADING = `${BASE}/LOADING`;
export const POINTS_LOADING = `${BASE}/POINTS_LOADING`;
export const CUPS_LOADING = `${BASE}/CUPS_LOADING`;
export const ERROR = `${BASE}/ERROR`;
export const SUCCESS = `${BASE}/SUCCESS`;
export const ITEMS = `${BASE}/ITEM`;
export const POINTS = `${BASE}/POINTS`;
export const CUPS = `${BASE}/CUPS`;
export const CATEGORIES = `${BASE}/CATEGORIES`;
export const CUP_CATEGORIES = `${BASE}/CUP_CATEGORIES`;
export const ITEM = `${BASE}/CURRENT_ITEM`;

export const SET_LOADING = `${BASE}/M/LOADING`;
export const SET_ERROR = `${BASE}/M/ERROR`;
export const SET_SUCCESS = `${BASE}/M/SUCCESS`;
export const SET_ITEMS = `${BASE}/M/ITEMS`;
export const SET_POINTS = `${BASE}/M/POINTS`;
export const SET_CUPS = `${BASE}/M/CUPS`;
export const SET_POINTS_LOADING = `${BASE}/M/POINTS_LOADING`;
export const SET_CUPS_LOADING = `${BASE}/M/CUPS_LOADING`;
export const SET_CATEGORIES = `${BASE}/M/CATEGORIES`;
export const SET_CUP_CATEGORIES = `${BASE}/M/CUP_CATEGORIES`;
export const SET_ITEM = `${BASE}/M/CURRENT_ITEM`;
export const RESET_VALUES = `${BASE}/M/RESET_VALUES`;

// ACTIONS
export const GET_ITEMS = `${BASE}/GET_ITEMS`;
export const GET_CUPS = `${BASE}/GET_CUPS`;
export const GET_POINTS = `${BASE}/GET_POINTS`;
export const GET_CATEGORIES = `${BASE}/GET_CATEGORIES`;
export const GET_CUP_CATEGORIES = `${BASE}/GET_CUP_CATEGORIES`;
export const GET_ITEM = `${BASE}/GET_ITEM`;
export const CREATE_ITEM = `${BASE}/CREATE_ITEM`;
export const UPDATE_ITEM = `${BASE}/UPDATE_ITEM`;
export const DELETE_ITEM = `${BASE}/DELETE_ITEM`;

const state = {
  items: null,
  points: null,
  cups: null,
  points_loading: false,
  cups_loading: false,
  categories: null,
  cup_categories: null,
  item: {},
  loading: false,
  error: null,
  success: null,
};

const getters = {
  [LOADING]: (state) => {
    return state.loading;
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
  [POINTS]: (state) => {
    return state.points;
  },
  [CUPS]: (state) => {
    return state.cups;
  },
  [POINTS_LOADING]: (state) => {
    return state.points_loading;
  },
  [CUPS_LOADING]: (state) => {
    return state.cups_loading;
  },
  [CATEGORIES]: (state) => {
    return state.categories;
  },
  [CUP_CATEGORIES]: (state) => {
    return state.cup_categories;
  },
  [ITEM]: (state) => {
    return state.item;
  },
};

const mutations = {
  [SET_LOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SET_ERROR]: (state, payload) => {
    state.error = payload;
  },
  [SET_ITEMS]: (state, payload) => {
    state.items = payload;
  },
  [SET_POINTS]: (state, payload) => {
    state.points = payload;
  },
  [SET_CUPS]: (state, payload) => {
    state.cups = payload;
  },
  [SET_CUPS_LOADING]: (state, payload) => {
    state.cups_loading = payload;
  },
  [SET_POINTS_LOADING]: (state, payload) => {
    state.points_loading = payload;
  },
  [SET_CATEGORIES]: (state, payload) => {
    state.categories = payload;
  },
  [SET_CUP_CATEGORIES]: (state, payload) => {
    state.cup_categories = payload;
  },
  [SET_SUCCESS]: (state, payload) => {
    state.success = payload;
  },
  [SET_ITEM]: (state, payload) => {
    state.item = payload;
  },
  [RESET_VALUES]: (state) => {
    state.success = null;
    state.error = null;
    state.loading = false;
    state.item = {};
    state.items = [];
  },
};

const actions = {
  [GET_ITEMS]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ITEMS, response.data);
        })
        .catch((error) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ERROR, error);
        });
  },
  [GET_POINTS]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_POINTS_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
        .then((response) => {
          context.commit(SET_POINTS_LOADING, false);
          context.commit(SET_POINTS, response.data);
        })
        .catch((error) => {
          context.commit(SET_POINTS_LOADING, false);
          context.commit(SET_ERROR, error);
        });
  },

  [GET_CUPS]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_CUPS_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
        .then((response) => {
          context.commit(SET_CUPS_LOADING, false);
          context.commit(SET_CUPS, response.data);
        })
        .catch((error) => {
          context.commit(SET_CUPS_LOADING, false);
          context.commit(SET_ERROR, error);
        });
  },
  [GET_CATEGORIES]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
        .then((response) => {
          context.commit(SET_CATEGORIES, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_CUP_CATEGORIES]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
        .then((response) => {
          context.commit(SET_CUP_CATEGORIES, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_ITEM]: (context, payload) => {
    let url = payload.url;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(url)
        .then((response) => {
          context.commit(SET_ITEM, response.data);
          context.commit(SET_LOADING, false);
        }).catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [UPDATE_ITEM]: (context, payload) => {
    let url = payload.url;
    let contents = payload.contents;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    ApiService.put(url, contents)
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ITEM, response.data);
        }).catch((error) => {
      context.commit(SET_ERROR, error);
    });
  },
  [CREATE_ITEM]: (context, payload) => {
    let url = payload.url;
    let contents = payload.contents;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    ApiService.post(url, contents)
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ITEM, response.data);
        }).catch((error) => {
      context.commit(SET_ERROR, error);
    });
  },
  [DELETE_ITEM]: (context, payload) => {
    let url = payload.url;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    ApiService.delete(url)
        .then(() => {
          context.commit(SET_LOADING, false);
          context.commit(SET_ITEM, {});
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
