const i18nService = {
  defaultLanguage: "tr",

  languages: [
    {
      lang: "tr",
      name: "Türkçe",
      flag: process.env.BASE_URL + "media/images/flags/218-turkey.svg"
    },
    {
      lang: "en",
      name: "English",
      flag: process.env.BASE_URL + "media/images/flags/226-united-states.svg"
    }
  ],


  /**
   * Keep the active language in the localStorage
   * @param lang
   */
  setActiveLanguage(lang) {
    localStorage.setItem("language", lang);
  },

  /**
   * Get the current active language
   * @returns {string | string}
   */
  getActiveLanguage() {
    return localStorage.getItem("language") || this.defaultLanguage;
  }
};

export default i18nService;
