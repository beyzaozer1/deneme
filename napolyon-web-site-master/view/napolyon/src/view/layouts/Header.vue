<template>
  <nav
    class="navbar navbar-expand-xl general-navbar-style fixed-top px-4 py-0 m-0 text-primary d-flex justify-content-around"
    style="width:100vw;"
  >
    <a class="navbar-brand" href="/"
      ><img
        :src="mediaBase + '/images/images/nap_primary.png'"
        class="img-fluid dark-navbar-napolyon-logo"
        alt=""/>
      <img
        :src="mediaBase + '/images/images/nap_light.png'"
        class="img-fluid light-navbar-napolyon-logo"
        alt=""
    /></a>

    <button
      class="navbar-toggler collapsed"
      id="navbar-toggle-button-header"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <div class="lines">
        <span class="lines-span"></span>
        <span class="lines-span"></span>
        <span class="lines-span"></span>
      </div>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav navigation-menu mr-auto">
        <li
          :class="{ active: $route.name === 'user.index' }"
          class="px-2 navbar-link-space"
        >
          <a
            href="#"
            @click.prevent="scrollPage('dashboardIndexComponent')"
            class="text-nowrap px-4"
            :class="userIndexClass"
          >
            {{ $t("index.home") }}
          </a>
        </li>
        <li
          :class="{ active: $route.name === 'index.howToWin' }"
          class="px-2 navbar-link-space"
        >
          <a
            href="#"
            @click.prevent="scrollPage('nasil-kazanirim')"
            class="text-nowrap px-4"
            :class="howIWinClass"
          >
            {{ $t("index.who_i_win") }}
          </a>
        </li>
        <li
          :class="{ active: $route.name === 'index.whatIEarn' }"
          class="px-2 navbar-link-space"
        >
          <a
            href="#"
            @click.prevent="scrollPage('n1')"
            class="text-nowrap px-4"
            :class="whatIEarnClass"
          >
            {{ $t("index.what_i_earn") }}
          </a>
        </li>

        <li
          :class="{ active: $route.name === 'index.solutionCenter' }"
          class="px-2 navbar-link-space"
        >
          <router-link
              :to="{name: 'index.solution_center' }"
              class="text-nowrap px-4"
              :class="$route.name === 'index.solution_center'
                ? 'navbar-active-link-text'
                : 'navbar-link-text'
            ">
            {{ $t("index.solution_center") }}
          </router-link>
        </li>
        <li :class="{ active: $route.name === 'index.content_us' }" class="px-2 navbar-link-space">
          <router-link
              :to="{name: 'index.content_us' }"
              class="text-nowrap px-4"
              :class="$route.name === 'index.content_us'
                ? 'navbar-active-link-text'
                : 'navbar-link-text'
            ">
            {{ $t("index.content_us") }}
          </router-link>
        </li>
      </ul>
      <div class="m-0 p-0" v-if="userAuthHeader">
        <router-link :to="{ name: 'user.account' }" v-if="userAuthHeader">
          <div class="btn home-login-register-user-links m-2">
            {{ capitalizeFirstLetter(userAuthHeader.firstName) }}
            {{ capitalizeFirstLetter(userAuthHeader.lastName) }}
          </div>
        </router-link>
      </div>
      <div class="m-0 p-0" v-else>
        <router-link :to="{ name: 'index.login' }">
          <div class="btn home-login-register-user-links">
            {{ $t("index.login") }}
          </div>
        </router-link>
        <router-link :to="{ name: 'index.register' }">
          <div class="btn home-login-register-user-links m-1">
            {{ $t("index.register") }}
          </div>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import store from "@/core/services";
import module, {
  ERROR,
  GET_USER,
  MODULE_NAME,
  PURGE_AUTH,
  USER,
    LOADING
} from "@/core/services/store/auth.module";
const _MODULE_NAME = MODULE_NAME;

export default {
  name: "Header",
  props: {
    navLight: {
      required: false,
      default: true,
    },
    active: {
      required: false,
      default: false,
    },
    userLayout: {
      required: false,
      default: false,
    },
  },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }
    registerStoreModule(_MODULE_NAME, module);
  },
  computed: {
    userAuthHeader: {
      get() {
        return store.getters[_MODULE_NAME + "/" + USER];
      },
      set(value) {},
    },
    userAuthLoading: {
      get() {
        return store.getters[_MODULE_NAME + "/" + LOADING];
      },
      set(value) {},
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
  },
  data() {
    return {
      userIndexClass: "navbar-active-link-text",
      howIWinClass: "navbar-link-text",
      navbarClass: "navbar-link-text",
      whatIEarnClass: "navbar-link-text",
      pageRoute: this.$route.name,
      counter: 0,
      oldOffsetTop: 0,
      navbarToggleClass: "navbar-toggle",
    };
  },
  watch: {
    pageRoute: {
      immediate: true,
      handler() {
        this.specifyClasses();
      },
    },
  },
  methods: {
    scrollPage(id) {
      if (window.innerWidth <= 1199) {
        $("#navbar-toggle-button-header").click();
      }
      let route = this.$route.name;
      if (route !== "user.index") {
        this.$router.push({ name: "user.index" });

        setTimeout(() => {
          let element = document.getElementById(id);
          let top = element.offsetTop;
          window.scrollTo(0, Number(top) - 100);
          this.specifyClasses({ top });
        }, 1000);
      } else {
        let element = document.getElementById(id);
        let top = element.offsetTop;
        window.scrollTo(0, Number(top) - 100);
        this.specifyClasses();
      }
    },
    specifyClasses(params) {
      let scroll = $(window).scrollTop();

      if (params) {
        setTimeout(() => {
          window.scrollTo(0, Number(params.top) - 99);
        }, 100);
      } else {
        if (this.$route.name === "user.index") {
          let nasil = document.getElementById("nasil-kazanirim")?.offsetTop;
          let ne = document.getElementById("n1")?.offsetTop;
          if (scroll > nasil - 151 && scroll <= ne - 151) {
            this.userIndexClass = "navbar-link-text";
            this.howIWinClass = "navbar-active-link-text";
            this.whatIEarnClass = "navbar-link-text";
          } else if (scroll > ne - 151 && scroll < ne + 700) {
            this.userIndexClass = "navbar-link-text";
            this.howIWinClass = "navbar-link-text";
            this.whatIEarnClass = "navbar-active-link-text";
          } else {
            this.userIndexClass = "navbar-active-link-text";
            this.howIWinClass = "navbar-link-text";
            this.whatIEarnClass = "navbar-link-text";
          }
        } else {
          this.userIndexClass = "navbar-link-text";
          this.howIWinClass = "navbar-link-text";
          this.whatIEarnClass = "navbar-link-text";
        }
      }
    },
  },
  mounted() {
    const navbarColors = () => {
      // window.alert("selam");
      var scroll = $(window).scrollTop();
      if (this.$route.name === "user.index") {
        if (scroll > 50) {
          this.specifyClasses();

          $(".general-navbar-style").css("background", "white");
        } else {
          $(".general-navbar-style").css("background", "transparent");
        }
        if (scroll > 50 && window.innerWidth > 1199) {
          $(".home-login-register-user-links").css("background", "#00b6a6");
          $(".home-login-register-user-links").css("color", "#ffffff");
          $(".dark-navbar-napolyon-logo").css("display", "inline");
          $(".light-navbar-napolyon-logo").css("display", "none");
          $(".navbar-link-text").css("color", "rgba(0,0,0,0.8)");
          $(".navbar-active-link-text").css("color", "#00b6a6");
        } else if (scroll <= 50 && window.innerWidth > 1199) {
          $(".home-login-register-user-links").css("background", "#f8f9fc");
          $(".home-login-register-user-links").css("color", "#3c4858");
          $(".dark-navbar-napolyon-logo").css("display", "none");
          $(".light-navbar-napolyon-logo").css("display", "inline");
          $(".navbar-link-text").css("color", "rgba(255,255,255,0.5)");
          $(".navbar-active-link-text").css("color", "rgba(255,255,255,1)");
        } else {
          $(".home-login-register-user-links").css("background", "#00b6a6");
          $(".home-login-register-user-links").css("color", "#ffffff");
          $(".dark-navbar-napolyon-logo").css("display", "inline");
          $(".light-navbar-napolyon-logo").css("display", "none");
          $(".navbar-link-text").css("color", "rgba(0,0,0,0.8)");
          $(".navbar-active-link-text").css("color", "#00b6a6");
        }
      } else {
        $(".general-navbar-style").css("background", "white");
        if (window.innerWidth > 1199) {
          $(".home-login-register-user-links").css("background", "#00b6a6");
          $(".home-login-register-user-links").css("color", "#ffffff");
          $(".dark-navbar-napolyon-logo").css("display", "inline");
          $(".light-navbar-napolyon-logo").css("display", "none");
          $(".navbar-link-text").css("color", "rgba(0,0,0,0.8)");
          $(".navbar-active-link-text").css("color", "#00b6a6");
        } else {
          $(".home-login-register-user-links").css("background", "#00b6a6");
          $(".home-login-register-user-links").css("color", "#ffffff");
          $(".dark-navbar-napolyon-logo").css("display", "inline");
          $(".light-navbar-napolyon-logo").css("display", "none");
          $(".navbar-link-text").css("color", "rgba(0,0,0,0.8)");
          $(".navbar-active-link-text").css("color", "#00b6a6");
        }
      }
    };
    if(!this.userLayout) {
      if (localStorage.getItem("token") !== null && this.userAuthLoading === false) {
        store.dispatch(_MODULE_NAME + "/" + GET_USER);
      }
    }
    navbarColors();
    $(document).ready(function() {
      $(window).scroll(navbarColors);
      $(window).resize(navbarColors);
    });
  },
};
</script>

<style scoped>
.lines {
  width: 25px;
  display: block;
  position: relative;
  margin: 28px 20px;
  height: 18px;
}
.lines-span {
  height: 2px;
  width: 100%;
  background-color: #3c4858;
  display: block;
  margin-bottom: 5px;
  -webkit-transition: -webkit-transform 0.5s ease;
  transition: -webkit-transform 0.5s ease;
  transition: transform 0.5s ease;
  transition: transform 0.5s ease, -webkit-transform 0.5s ease;
}
.navbar-toggler .lines-span {
  position: absolute;
}
.navbar-toggler .lines-span:first-child {
  top: 6px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
}
.navbar-toggler .lines-span:nth-child(2) {
  display: none;
}
.navbar-toggler .lines-span:last-child {
  width: 100%;
  top: 6px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.navbar-toggler.collapsed .lines-span {
  position: relative;
}
.navbar-toggler.collapsed .lines-span:first-child {
  top: 0px;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.navbar-toggler.collapsed .lines-span:nth-child(2) {
  display: block;
}
.navbar-toggler.collapsed .lines-span:last-child {
  width: 100%;
  top: 0px;
  -webkit-transform: rotate(0deg);
  transform: rotate(0deg);
}
.lines-span:hover {
  background-color: #2f55d4;
}
@media (max-width: 1199px) and (min-width: 800px) {
  .general-navbar-style {
    padding-left: 10vw !important;
  }
}
@media (min-width: 1200px) {
  .general-navbar-style {
    padding: 10px !important;
    padding-left: 5vw !important;
    padding-right: 5vw !important;
    font-size: 0.85vw !important;
  }
}
@media (max-width: 1199px) {
  .general-navbar-style {
    background: rgba(255, 255, 255, 1) !important;
    font-size: 14px;
  }
  .navbar-link-space {
    padding: 10px;
  }
  .navbar-link-text {
    color: rgba(0, 0, 0, 0.6) !important;
  }
}
.general-navbar-style {
  font-family: "Lato TR Bold", sans-serif !important;
  background: rgba(0, 0, 0, 0);
  font-weight: 700;
  letter-spacing: 1px;
  line-height: 24px;
  transition: all 0.5s;
}
</style>
