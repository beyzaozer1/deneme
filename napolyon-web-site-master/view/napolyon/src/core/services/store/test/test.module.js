// GETTERS
export const NAME = 'TEST/NAME';
export const TITLE = 'TEST/TITLE';
export const DESCRIPTION = 'TEST/DESCRIPTION';
export const LOADING = 'TEST/LOADING';

// MUTATIONS
export const SET_NAME = 'TEST/M/NAME';
export const SET_TITLE = 'TEST/M/TITLE';
export const SET_DESCRIPTION = 'TEST/M/DESCRIPTION';
export const SET_LOADING = 'TEST/M/LOADING';
export const CLEAR_NAME = 'TEST/M/CLEAR_NAME';
export const CLEAR_TITLE = 'TEST/M/CLEAR_TITLE';
export const CLEAR_DESCRIPTION = 'TEST/M/CLEAR_DESCRIPTION';

// ACTIONS
export const CLEAR_ALL_VARS = 'TEST/A/CLEAR_ALL_VARS';


const state = {
    name: "State Name",
    title: "State Title",
    description: "State Description",
    loading: false,
}

const getters = {
    [NAME]: (state) => {
        return state.name;
    },
    [TITLE]: (state) => {
        return state.title;
    },
    [DESCRIPTION]: (state) => {
        return state.description;
    },
    [LOADING]: (state) => {
        return state.loading;
    },
};

const mutations = {
    [SET_NAME]: (state, payload) => {
        state.name = payload.toUpperCase();
    },
    [SET_TITLE]: (state, payload) => {
        state.title = payload;
    },
    [SET_DESCRIPTION]: (state, payload) => {
        state.description = payload;
    },
    [SET_LOADING]: (state, payload) => {
        state.loading = payload;
    },
    [CLEAR_NAME]: (state) => {
        state.name = null;
    },
    [CLEAR_TITLE]: (state) => {
        state.title = null;
    },
    [CLEAR_DESCRIPTION]: (state) => {
        state.description = null;
    },

};

const actions = {
    [CLEAR_ALL_VARS]: (context) => {
        context.commit(SET_LOADING, true);
        setTimeout(
            function() {
                context.commit(CLEAR_NAME);
                context.commit(CLEAR_TITLE);
                context.commit(CLEAR_DESCRIPTION);
                context.commit(SET_LOADING, false);
            }, 5000);
    }
};

export default {
    state,
    getters,
    mutations,
    actions,
}


