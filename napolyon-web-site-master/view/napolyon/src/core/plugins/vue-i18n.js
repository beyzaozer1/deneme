import Vue from "vue";
import VueI18n from "vue-i18n";

// Localisation language list
import { locale as tr } from "@/core/config/i18n/tr";
import { locale as en } from "@/core/config/i18n/en";

Vue.use(VueI18n);

let messages = {};
messages = { ...messages, en, tr };


// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'tr',
  messages // set locale messages
});

export default i18n;
