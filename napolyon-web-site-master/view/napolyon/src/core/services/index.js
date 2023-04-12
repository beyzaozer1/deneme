import Vue from "vue";
import Vuex from "vuex";

// Modules
import rest from "./store/rest.module";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        rest,
    }
});

