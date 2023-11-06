import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  base: "/",
  routes: [
    {
      path: "/",
      mode: "history",
      component: () => import("@/view/layouts/DashboardLayout"),
      children: [
        {
          path: "/",
          name: "user.index",
          component: () => import("@/view/User/Index.vue"),
        },
        {
          path: "/lt",
          name: "survey.redirect",
          component: () => import("@/view/User/Index.vue"),
        },
        {
          path: "/lt-custom",
          name: "survey.redirect.custom",
          component: () => import("@/view/User/Index.vue"),
        },
        {
          path: "/redirect",
          name: "survey.redirect.temp",
          component: () => import("@/view/User/Index.vue"),
        },
      ],
    },
    {
      path: "/nasil-kazanirim",
      name: "index.howToWin",
      component: () => import("@/view/User/howToWin"),
    },
    {
      path: "/ne-kazandilar",
      name: "index.whatIEarn",
      component: () => import("@/view/User/whatIEarn"),
    },
    {
      path: "/sifremi-unuttum",
      name: "index.forgotPassword",
      component: () => import("@/view/auth/ForgotPassword"),
    },
    {
      path: "/sifremi-yenile",
      name: "index.resetPassword",
      component: () => import("@/view/auth/ResetPassword"),
    },
    {
      path: "/hesap-aktivasyon",
      name: "index.accountActivation",
      component: () => import("@/view/auth/AccountActivation"),
    },
    {
      path: "/mail-guncelle",
      name: "index.mailUpdate",
      component: () => import("@/view/auth/MailUpdate"),
    },
    {
      path: "/giris",
      name: "index.login",
      component: () => import("@/view/auth/Login"),
    },
    {
      path: "/otomatik-giris",
      name: "index.auto_login",
      component: () => import("@/view/auth/Login"),
    },
    {
      path: "/uye-ol/:invitationId?",
      name: "index.register",
      component: () => import("@/view/auth/Register"),
    },
    {
      path: "/onlar-ne-kazandi",
      name: "index.what_did_they_win",
      component: () => import("@/view/User/whatDidTheyWin"),
    },
    {
      path: "/uyelik",
      redirect: "/hesabim",
      mode: "history",
      component: () => import("@/view/layouts/UserLayout"),
      children: [
        {
          path: "/hesabim",
          name: "user.account",
          component: () => import("@/view/User/account"),
        },
        {
          path: "/gorevler",
          name: "user.tasks",
          component: () => import("@/view/User/tasks"),
        },
        {
          path: "/bildirimler",
          name: "user.notification",
          component: () => import("@/view/User/notification"),
        },
        {
          path: "/liderlik",
          name: "user.leadership_rank",
          component: () => import("@/view/User/leadershipRank"),
        },
        {
          path: "/nap-transferleri/:type?/:id?",
          name: "user.nap_transfers",
          component: () => import("@/view/User/napTransfers"),
        },
        {
          path: "/eglen-ogren",
          name: "user.have_fun_and_learn",
          component: () => import("@/view/User/haveFundAndLearn"),
        },
        {
          path: "/facebook-nap-kutusu",
          name: "user.facebook_nap_box",
          component: () => import("@/view/User/facebookNapBox"),
        },
        {
          path: "/kampanya/:id",
          name: "user.campaign",
          component: () => import("@/view/User/campaign"),
        },
        {
          path: "/evet-hayir",
          name: "user.games.yes_no",
          component: () => import("@/view/User/Games/yes_no"),
        },
        {
          path: "/bosluklari-doldur",
          name: "user.games.fill_in_the_blank",
          component: () => import("@/view/User/Games/fill_in_the_blank"),
        },
        {
          path: "/duello",
          name: "user.duel",
          component: () => import("@/view/User/duel"),
        },
        {
          path: "/duello/haftanin-kazanani",
          name: "user.duel.winner_week",
          component: () => import("@/view/User/Duel/winnerOfWeek"),
        },
        {
          path: "/duello/istatistiklerim",
          name: "user.duel.my_duel_stats",
          component: () => import("@/view/User/Duel/statistics"),
        },
        {
          path: "/duello/giris",
          name: "user.duel.join",
          component: () => import("@/view/User/Duel/join"),
        },
        {
          path: "/eslestir",
          name: "user.games.match",
          component: () => import("@/view/User/Games/match"),
        },
        {
          path: "/ayarlar",
          name: "user.setting",
          component: () => import("@/view/User/setting"),
        },
        {
          path: "/nap-hareketleri",
          name: "user.nap_actions",
          component: () => import("@/view/User/napActions"),
        },
        {
          path: "/anketler/:name-:id",
          name: "user.surveys",
          component: () => import("@/view/User/surveys"),
        },
      ],
    },
    {
      path: "/mobil-anketler/:name-:id",
      name: "user.surveys.mobil",
      component: () => import("@/view/User/mobileSurveys"),
    },
    {
      path: "/bize-ulasin",
      name: "index.content_us",
      component: () => import("@/view/User/contactUs"),
    },
    {
      path: "/cozum-merkezi",
      name: "index.solution_center",
      component: () => import("@/view/User/solutionCenter"),
    },
    {
      path: "/eposta-tercihleri/:id",
      name: "index.contact_preference",
      component: () => import("@/view/User/contactPreference"),
    },
    {
      path: "/mesaj-goster/:id",
      name: "index.show_message",
      component: () => import("@/view/User/showEmailMessage"),
    },
    {
      path: "/ssi-web",
      name: "index.survey_result",
      component: () => import("@/view/User/surveyResult"),
    },
    {
      path: "/anket-sonuc",
      name: "index.survey_result_2",
      component: () => import("@/view/User/surveyResult"),
    },
    {
      path: "/anket-sonuclari",
      name: "index.lk_result",
      component: () => import("@/view/User/surveyResult"),
    },
    {
      path: "/hakkimizda",
      name: "index.about_us",
      component: () => import("@/view/Pages/aboutUs"),
    },
    {
      path: "/kurumsal",
      name: "index.corporate",
      component: () => import("@/view/Pages/corporate"),
    },
    {
      path: "/anti-spam",
      name: "index.anti_spam",
      component: () => import("@/view/Pages/antiSpam"),
    },
    {
      path: "/kullanim-kosullari",
      name: "index.terms",
      component: () => import("@/view/Pages/terms"),
    },
    {
      path: "/resim-yukle",
      name: "index.resim_yukle",
      component: () => import("@/view/Pages/uploadImage.vue")
    },
    {
      path: "/uyelik-sozlesmesi",
      name: "index.membership_agreement",
      component: () => import("@/view/Pages/membership_agreement"),
    },
    {
      path: "/gizlilik",
      name: "index.privacy",
      component: () => import("@/view/Pages/privacy"),
    },
    {
      path: "/aydinlatma-metni",
      name: "index.clarification_text",
      component: () => import("@/view/Pages/clarification_text"),
    },
    ///MOBILE
    { 
      path: "/mobil-nap-hareketleri",
      name: "index.nap_actions",
      component: () => import("@/view/mobile/napActions.vue"),
    },
    {
      path: "/mobil-gorevlerim",
      name: "index.tasks",
      component: () => import("@/view/mobile/Tasks.vue"),
    },
    {
      path: "/mobil-eglen-ogren",
      name: "index.have_fun_and_learn",
      component: () => import("@/view/mobile/haveFundAndLearn"),
    },
    //MOBILE GAMES 
    {
      path: "/mobil-evet-hayir",
      name: "index.games.yes_no",
      component: () => import("@/view/mobile/games/yes_no"),
    },
    {
      path: "/mobil-eslestir",
      name: "index.games.match",
      component: () => import("@/view/User/Games/match"),
    },
    {
      path: "/mobil-bosluklari-doldur",
      name: "index.games.fill_in_the_blank",
      component: () => import("@/view/mobile/games/fill_in_the_blank"),
    },
    //404 
    {
      path: "*",
      redirect: "/404",
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/error/404.vue"),
    },
  ],
});
