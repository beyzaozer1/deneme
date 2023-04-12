import * as dateFilters from './date.filter';

const addFilters = (Vue, filters) => {
  for(let key in filters)  {
      Vue.filter(key, filters[key]);
  }
};

export default {
    install(Vue) {
        addFilters(Vue, dateFilters);
    }
};
