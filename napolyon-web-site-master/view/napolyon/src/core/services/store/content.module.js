import ApiService from "@/core/services/api.service";
import querystring from "querystring";

const BASE = "CONTENT";

export const MODULE_NAME = `content`;
export const BASE_URL = `mobile`;
export const LOADING = `${BASE}/LOADING`;
export const ERROR = `${BASE}/ERROR`;
export const SUCCESS = `${BASE}/SUCCESS`;
export const ITEMS = `${BASE}/ITEM`;
export const FAQS = `${BASE}/FAQS`;
export const FAQS_SUBJECTS = `${BASE}/FAQS_SUBJECTS`;
export const CITIES = `${BASE}/CITIES`;
export const ITEM = `${BASE}/CURRENT_ITEM`;
export const TITLES = `${BASE}/TITLES`;
export const CONTACT_PREFERENCE_REASONS = `${BASE}/CONTACT_PREFERENCE_REASONS`;

export const SET_LOADING = `${BASE}/M/LOADING`;
export const SET_ERROR = `${BASE}/M/ERROR`;
export const SET_SUCCESS = `${BASE}/M/SUCCESS`;
export const SET_ITEMS = `${BASE}/M/ITEMS`;
export const SET_CITIES = `${BASE}/M/CITIES`;
export const SET_TITLES = `${BASE}/M/TITLES`;
export const SET_FAQS = `${BASE}/M/FAQS`;
export const SET_FAQS_SUBJECTS = `${BASE}/M/FAQS_SUBJECTS`;
export const SET_ITEM = `${BASE}/M/CURRENT_ITEM`;
export const SET_CONTACT_PREFERENCE_REASONS= `${BASE}/M/CONTACT_PREFERENCE_REASONS`;

// ACTIONS
export const GET_ITEMS = `${BASE}/GET_ITEMS`;
export const GET_CONTACT_PREFERENCE_REASONS = `${BASE}/GET_CONTACT_PREFERENCE_REASONS`;
export const GET_CITIES = `${BASE}/GET_CITIES`;
export const GET_TITLES = `${BASE}/GET_TITLES`;
export const GET_FAQS = `${BASE}/GET_FAQS`;
export const GET_FAQS_SUBJECTS = `${BASE}/GET_FAQS_SUBJECTS`;
export const GET_ITEM = `${BASE}/GET_ITEM`;
export const CREATE_CONTACT_US = `${BASE}/CREATE_CONTACT_US`;
export const CREATE_ITEM = `${BASE}/CREATE_ITEM`;
export const UPDATE_ITEM = `${BASE}/UPDATE_ITEM`;
export const DELETE_ITEM = `${BASE}/DELETE_ITEM`;

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
  faqs: null,
  cities: null,
  faqs_subjects: null,
  contact_preference_reasons: null,
  item: {},
  loading: false,
  error: null,
  success: null,
  titles :null
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
  [CITIES]: (state) => {
    return state.cities;
  },
  [TITLES]: (state) => {
    return state.titles;
  },
  [FAQS]: (state) => {
    return state.faqs;
  },
  [CONTACT_PREFERENCE_REASONS]: (state) => {
    return state.contact_preference_reasons;
  },
  [FAQS_SUBJECTS]: (state) => {
    return state.faqs_subjects;
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
  [SET_FAQS]: (state, payload) => {
    state.faqs = payload;
  },
  [SET_CITIES]: (state, payload) => {
    state.cities = payload;
  },
  [SET_TITLES]: (state, payload) => {
    state.titles = payload;
  },
  [SET_CONTACT_PREFERENCE_REASONS]: (state, payload) => {
    state.contact_preference_reasons = payload;
  },
  [SET_FAQS_SUBJECTS]: (state, payload) => {
    state.faqs_subjects = payload;
  },
  [SET_SUCCESS]: (state, payload) => {
    state.success = payload;
  },
  [SET_ITEM]: (state, payload) => {
    state.item = payload;
  }
};

const actions = {
  [GET_FAQS]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters),"", config)
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_FAQS, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_FAQS_SUBJECTS]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters),"", config)
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_FAQS_SUBJECTS, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_CONTACT_PREFERENCE_REASONS]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters),"", config)
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_CONTACT_PREFERENCE_REASONS, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_TITLES]: (context, payload) => {
    let url = '/mobile/codeData/title';
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_TITLES, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_CITIES]: (context, payload) => {
    let url = '/mobile/codeData/city';
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters),"", config)
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_CITIES, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [CREATE_CONTACT_US]: (context, payload) => {
    let url = payload.url;
    let contents = payload.contents;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);

    if (payload.hasOwnProperty('isAuthenticated') && payload.isAuthenticated) {
      config.headers.Authorization = 'Bearer ' + payload.isAuthenticated;
    }

    return ApiService.post(url, contents, config);
  },
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
