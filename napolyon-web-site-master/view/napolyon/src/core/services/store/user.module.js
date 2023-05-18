import ApiService from "@/core/services/api.service";
import querystring from "querystring";

const BASE = "USER";

export const BASE_URL = "/user";
export const CAMPAIGN_URL = "mobile/member/campaignSlider";
export const MODULE_NAME = "user";
export const LOADING = `${BASE}/LOADING`;
export const LOADING_LEADERSHIP = `${BASE}/LOADING_LEADERSHIP`;
export const LOADING_CAMPAIGNS = `${BASE}/LOADING_CAMPAIGNS`;
export const ERROR = `${BASE}/ERROR`;
export const SUCCESS = `${BASE}/SUCCESS`;
export const ITEMS = `${BASE}/ITEM`;
export const CAMPAIGNS = `${BASE}/CAMPAIGNS`;
export const ITEM = `${BASE}/CURRENT_ITEM`;
export const ITEMS_ALL = `${BASE}/ITEMS_ALL`;
export const ITEMS_LEADERSHIP = `${BASE}/ITEMS_LEADERSHIP`;
export const POINT_CUP = `${BASE}/POINT_CUP`;

export const SET_LOADING = `${BASE}/M/LOADING`;
export const SET_LOADING_LEADERSHIP = `${BASE}/M/LOADING_LEADERSHIP`;
export const SET_LOADING_CAMPAIGNS = `${BASE}/M/LOADING_CAMPAIGNS`;
export const SET_ERROR = `${BASE}/M/ERROR`;
export const SET_SUCCESS = `${BASE}/M/SUCCESS`;
export const SET_ITEMS = `${BASE}/M/ITEMS`;
export const SET_CAMPAIGNS = `${BASE}/M/CAMPAIGNS`;
export const SET_ITEM = `${BASE}/M/CURRENT_ITEM`;
export const RESET_VALUES = `${BASE}/M/RESET_VALUES`;
export const SET_ITEMS_ALL = `${BASE}/M/ITEMS_ALL`;
export const SET_POINT_CUP = `${BASE}/M/POINT_CUP`;
export const SET_ITEMS_LEADERSHIP = `${BASE}/M/ITEMS_LEADERSHIP`;

// ACTIONS
export const GET_ITEMS_LEADERSHIP = `${BASE}/GET_ITEMS_LEADERSHIP`;
export const GET_ITEMS_ALL = `${BASE}/GET_ITEMS_ALL`;
export const GET_ITEMS = `${BASE}/GET_ITEMS`;
export const GET_CAMPAIGNS = `${BASE}/GET_CAMPAIGNS`;
export const GET_POINT_CUP = `${BASE}/GET_POINT_CUP`;
export const GET_ITEM = `${BASE}/GET_ITEM`;
export const CREATE_ITEM = `${BASE}/CREATE_ITEM`;
export const UPDATE_ITEM = `${BASE}/UPDATE_ITEM`;
export const DELETE_ITEM = `${BASE}/DELETE_ITEM`;

const state = {
  items: null,
  campaigns: null,
  items_all: null,
  point_cup: null,
  items_leadership: null,
  item: {},
  loading: false,
  loading_leadership: false,
  loading_campaigns: false,
  error: null,
  success: null,
};

const getters = {
  [LOADING]: (state) => {
    return state.loading;
  },
  [LOADING_LEADERSHIP]: (state) => {
    return state.loading_leadership;
  },
  [LOADING_CAMPAIGNS]: (state) => {
    return state.loading_campaigns;
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
  [CAMPAIGNS]: (state) => {
    return state.campaigns;
  },
  [ITEMS_ALL]: (state) => {
    return state.items_all;
  },
  [ITEMS_LEADERSHIP]: (state) => {
    return state.items_leadership;
  },
  [ITEM]: (state) => {
    return state.item;
  },
  [POINT_CUP]: (state) => {
    return state.point_cup;
  },
};

const mutations = {
  [SET_LOADING]: (state, payload) => {
    state.loading = payload;
  },
  [SET_LOADING_LEADERSHIP]: (state, payload) => {
    state.loading_leadership = payload;
  },
  [SET_LOADING_CAMPAIGNS]: (state, payload) => {
    state.loading_campaigns = payload;
  },
  [SET_ERROR]: (state, payload) => {
    state.error = payload;
  },
  [SET_ITEMS]: (state, payload) => {
    state.items = payload;
  },
  [SET_CAMPAIGNS]: (state, payload) => {
    state.campaigns = payload;
  },
  [SET_ITEMS_ALL]: (state, payload) => {
    state.items_all = payload;
  },
  [SET_ITEMS_LEADERSHIP]: (state, payload) => {
    state.items_leadership = payload;
  },
  [SET_POINT_CUP]: (state, payload) => {
    state.point_cup = payload;
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
  [GET_CAMPAIGNS]: (context, payload) => {
    let url = CAMPAIGN_URL;
    let filters = payload.filters || {};
    context.commit(SET_LOADING_CAMPAIGNS, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
      .then((response) => {
        context.commit(SET_LOADING_CAMPAIGNS, false);
        context.commit(SET_CAMPAIGNS, response.data);
      })
      .catch((error) => {
        context.commit(SET_LOADING_CAMPAIGNS, false);
        context.commit(SET_ERROR, error);
      });
  },
  [GET_ITEMS_ALL]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
      .then((response) => {
        context.commit(SET_LOADING, false);
        context.commit(SET_ITEMS_ALL, response.data);
      })
      .catch((error) => {
        context.commit(SET_ERROR, error);
      });
  },

  [GET_ITEMS_LEADERSHIP]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_LOADING_LEADERSHIP, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
      .then((response) => {
        context.commit(SET_LOADING_LEADERSHIP, false);
        context.commit(SET_ITEMS_LEADERSHIP, response.data);
      })
      .catch((error) => {
        context.commit(SET_LOADING_LEADERSHIP, false);
        context.commit(SET_ERROR, error);
      });
  },
  [GET_POINT_CUP]: (context, payload) => {
    let url = payload.url;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(url)
      .then((response) => {
        context.commit(SET_LOADING, false);
        context.commit(SET_POINT_CUP, response.data);
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
      })
      .catch((error) => {
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
      })
      .catch((error) => {
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
      })
      .catch((error) => {
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
      })
      .catch((error) => {
        context.commit(SET_ERROR, error);
      });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
