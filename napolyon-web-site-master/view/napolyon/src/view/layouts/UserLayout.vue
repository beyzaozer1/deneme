<template>
  <div id="account">
    <loader :loading="generalLoading"></loader>
    <template v-if="authUser">
      <t-header :user-layout="true"></t-header>
      <ProfileCard :item="authUser"></ProfileCard>
      <section class="section background-napolyon">
        <div class="container">
          <div class="row margin-top-100">
            <ScoreStatus :item="authUser"></ScoreStatus>
            <router-view />
          </div>
        </div>
      </section>
      <t-up-footer></t-up-footer>
      <t-footer></t-footer>
    </template>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import Footer from "@/view/layouts/Footer";
import Loader from "@/view/components/LoaderFull";
import upFooter from "@/view/layouts/upFooter";
import Header from "@/view/layouts/Header";
import ProfileCard from "@/view/components/ProfileCard";
import ScoreStatus from "@/view/components/ScoreStatus";
import store from "@/core/services";
import module, {
  ERROR,
  GET_USER,
  IS_AUTHENTICATED,
  LOGOUT,
  MODULE_NAME,
  USER,
  LOADING as USER_LOADING,
} from "@/core/services/store/auth.module";

import { LOADING } from "@/core/services/store/rest.module";
import * as external from "@/core/mixin/external";
const _MODULE_NAME = MODULE_NAME;
import feather from "feather-icons";

export default {
  name: "UserLayout",
  components: {
    "t-footer": Footer,
    "t-up-footer": upFooter,
    "t-header": Header,
    ScoreStatus,
    ProfileCard,
    Loader,
  },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }
    registerStoreModule(_MODULE_NAME, module);
  },
  destroyed() {
    external.del_link("/css/auth.css", "auth-css", "owl-theme-default-css");
    external.del_script("/js/main.js", "main-js", "paroller-js");
  },
  computed: {
    loading() {
      return store.getters[_MODULE_NAME + "/" + USER_LOADING];
    },
    isAuthenticated() {
      return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
    },
    generalLoading() {
      return store.getters[LOADING];
    },
    authUser() {
      return store.getters[_MODULE_NAME + "/" + USER] || this.localAuthUser;
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
  },
  data() {
    return {
      routerName: null,
      loaderEnabled: true,
      localAuthUser: null,
    };
  },
  mounted() {
    let token = window.localStorage.getItem("token");
    if (token !== null && this.authUser === null) {
      this.$store.dispatch(_MODULE_NAME + "/" + GET_USER).then((response) => {
        if (response) {
          this.localAuthUser = response;
        }
      });
      /*      if (localStorage.getItem("reload") !== null) {
        if (localStorage.getItem("reload") == "force") {
          setTimeout(function() {
            localStorage.removeItem("reload");
          }, 5000);
        }
      } else {
        localStorage.setItem("reload", "force");
        location.reload();
      }*/
    }

    if (Cookies.get("redirectUrl")) {
      this.$router.push("/resim-yukle");
    }

    if (token == null && this.authUser == null) {
      let self = this;
      setTimeout(() => {
        self.$router.push({
          name: "index.login",
          params: { redirect: self.$route.fullPath },
        });
      }, 1000);
    }
    external.head_link("/css/auth.css", "auth-css", "owl-theme-default-css");
    external.head_script("/js/main.js", "main-js", "paroller-js");
    feather.replace();
  },
  watch: {
    error(value) {
      if (value) {
        store.dispatch(_MODULE_NAME + "/" + LOGOUT);
        this.$router.push({ name: "index.login" });
      }
    },
  },
};
</script>

<style scoped></style>
