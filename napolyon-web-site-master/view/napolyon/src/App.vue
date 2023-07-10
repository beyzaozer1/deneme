<template>
  <div>
    <router-view></router-view>
    <loader-full></loader-full>
  </div>
</template>
<script>
import LoaderFull from "@/view/components/LoaderFull";
import store from "@/core/services";
import module, {
  IS_AUTHENTICATED,
  MODULE_NAME,
  TOKEN_EXP,
  LOGOUT,
} from "@/core/services/store/auth.module";
import Cookies from "js-cookie";

const _MODULE_NAME = MODULE_NAME;

export default {
  name: "NapolyonVue",
  components: { LoaderFull },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
  },
  computed: {
    isAuthenticated: {
      get() {
        return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
      },
      set(value) {},
    },
    token_expiration: {
      get() {
        return store.getters[_MODULE_NAME + "/" + TOKEN_EXP];
      },
      set(value) {},
    },
  },
  watch: {
    token_expiration: {
      immediate: true,
      handler() {
        // this.tokenCookieControl();
      },
    },
  },
  methods: {
    deleteCookiesAndLogout() {
      let rememberMe = Cookies.get("remember_me");
      let rememberMeS = Cookies.get("remember_meS");
      window.alert("me= " + rememberMe);
      if (
        !(
          rememberMe === "true" ||
          rememberMe === true ||
          rememberMeS === "true" ||
          rememberMeS === true
        )
      ) {
        store.dispatch(_MODULE_NAME + "/" + LOGOUT);
        Cookies.remove("remember_me");
        Cookies.remove("remember_meS");
      }
    },
    tokenCookieControl() {
      let rememberMe = Cookies.get("remember_me");
      let rememberMeS = Cookies.get("remember_meS");
      if (
        !(
          rememberMe === "true" ||
          rememberMe === true ||
          rememberMeS === "true" ||
          rememberMeS === true
        )
      ) {
        // window.alert(this.isAuthenticated);

        if (this.isAuthenticated) {
          setTimeout(() => {
            this.deleteCookiesAndLogout();
          }, 10000);
        }
      }
      if (rememberMe === "true" || rememberMe === true) {
        let cookieTime = new Date(
          new Date().getTime() + this.token_expiration * 1000
        );

        Cookies.set("remember_me", true, {
          expires: cookieTime,
          sameSite: "Lax",
          secure: true,
        });
      }
      if (rememberMeS === "true" || rememberMeS === true) {
        Cookies.set("remember_meS", true, {
          sameSite: "Lax",
          secure: true,
        });
      }
    },
  },
  mounted() {
    // Clear the browser cache data in localStorage when closing the browser window
    // this.tokenCookieControl();
    if (
      this.$route.fullPath.includes("hesap-aktivasyon") ||
      this.$route.fullPath.includes("nap-transferleri/2/189") ||
      this.$route.fullPath.includes("nap-transferleri/2/188") ||
      this.$route.fullPath.includes("nap-transferleri/2/185") ||
      this.$route.fullPath.includes("ssi-web")
    ) {
      window.insider_object = window.insider_object || {};
      window.insider_object.page = {
        type: "Confirmation"
      };
    }
  },
};
</script>
