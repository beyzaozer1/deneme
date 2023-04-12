import Vue from 'vue';
import VueI18n from "vue-i18n";
import ApiService from "@/core/services/api.service";
import moment from "moment";

Vue.use(VueI18n);

// set the current language for i18n.
let locale = localStorage.getItem('language');

if(!locale){
  localStorage.setItem('language', 'tr');
  locale = 'tr';
}

function getTranslations() {
  return ApiService.get(`/api/localization`);
}

function prepareConfig(data) {
  let messages = {};
  let langauges = data.languages;
  localStorage.setItem('languages', JSON.stringify(langauges));
  langauges.forEach(function(currentValue) {
    Vue.set(messages, currentValue.code, data.translations[currentValue.code]);
  });

  moment.locale(locale);

  // Create VueI18n instance with options
  return new VueI18n({
    messages, // set locale messages
    locale: locale
  });
}

export { prepareConfig, getTranslations };