import ApiService from "@/core/services/api.service";
import querystring from "querystring";

const BASE = "BASE";

export const MODULE_NAME = `memberTask`;
export const BASE_URL = `mobile/memberInfoTaskEntry`;
export const BASE_URL_NOTIFICATIONS = `mobile/memberInfoTaskEntry/allNotification`;
export const BASE_URL_NOTIFICATIONS_COUNT = `mobile/memberInfoTaskEntry/allNotificationCount`;
export const LOADING = `${BASE}/LOADING`;
export const ERROR = `${BASE}/ERROR`;
export const SUCCESS = `${BASE}/SUCCESS`;
export const ITEMS = `${BASE}/ITEM`;
export const ITEM = `${BASE}/CURRENT_ITEM`;
export const TASKS = `${BASE}/TASKS`;
export const NOTIFICATIONS = `${BASE}/NOTIFICATIONS`;
export const NOTIFICATIONS_COUNT = `${BASE}/NOTIFICATIONS_COUNT`;

export const SET_LOADING = `${BASE}/M/LOADING`;
export const SET_ERROR = `${BASE}/M/ERROR`;
export const SET_SUCCESS = `${BASE}/M/SUCCESS`;
export const SET_ITEMS = `${BASE}/M/ITEMS`;
export const SET_TASKS = `${BASE}/M/TASKS`;
export const SET_NOTIFICATIONS = `${BASE}/M/NOTIFICATIONS`;
export const SET_NOTIFICATIONS_COUNT = `${BASE}/M/NOTIFICATIONS_COUNT`;
export const SET_ITEM = `${BASE}/M/CURRENT_ITEM`;
export const RESET_VALUES = `${BASE}/M/RESET_VALUES`;

// ACTIONS
export const GET_ITEMS = `${BASE}/GET_ITEMS`;
export const GET_NOTIFICATIONS = `${BASE}/GET_NOTIFICATIONS`;
export const GET_NOTIFICATIONS_COUNT = `${BASE}/GET_NOTIFICATIONS_COUNT`;
export const GET_TASKS = `${BASE}/GET_TASKS`;
export const GET_ITEM = `${BASE}/GET_ITEM`;
export const CREATE_ITEM = `${BASE}/CREATE_ITEM`;
export const UPDATE_ITEM = `${BASE}/UPDATE_ITEM`;
export const DELETE_ITEM = `${BASE}/DELETE_ITEM`;

const state = {
  items: null,
  notifications: null,
  notification_count: null,
  tasks: null,
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
  [NOTIFICATIONS]: (state) => {
    return state.notifications;
  },
  [NOTIFICATIONS_COUNT]: (state) => {
    return state.notification_count;
  },
  [TASKS]: (state) => {
    return state.tasks;
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
  [SET_NOTIFICATIONS]: (state, payload) => {
    state.notifications = payload;
  },
  [SET_NOTIFICATIONS_COUNT]: (state, payload) => {
    state.notification_count = payload;
  },
  [SET_TASKS]: (state, payload) => {
    state.tasks = payload;
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
  [GET_TASKS]: (context, payload) => {
    let url = payload.url;
    let filters = payload.filters;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(`${url}?` + querystring.stringify(filters))
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_TASKS, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_NOTIFICATIONS]: (context, payload) => {
    let url = payload.url || BASE_URL_NOTIFICATIONS;
    context.commit(SET_LOADING, true);
    context.commit(SET_ERROR, null);
    return ApiService.get(url)
        .then((response) => {
          context.commit(SET_LOADING, false);
          context.commit(SET_NOTIFICATIONS, response.data);
        })
        .catch((error) => {
          context.commit(SET_ERROR, error);
        });
  },
  [GET_NOTIFICATIONS_COUNT]: (context, payload) => {
    let url = payload.url || BASE_URL_NOTIFICATIONS_COUNT;
    context.commit(SET_ERROR, null);
    return ApiService.get(url)
        .then((response) => {
          context.commit(SET_NOTIFICATIONS_COUNT, response.data);
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
