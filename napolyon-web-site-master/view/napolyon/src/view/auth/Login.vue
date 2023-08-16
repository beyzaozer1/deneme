<template>
  <div>
    <div class="back-to-home rounded d-sm-block">
      <a class="btn btn-icon btn-primary" href=""
        ><i class="icons" data-feather="home"> </i>
      </a>
    </div>
    <section class="m-0 p-0">
      <div v-if="loading">
        <loading :loading="loading"></loading>
      </div>
      <div
        v-else
        class="container-fluid m-0 p-0 login-screen-cover-container"
        style="background-image: url('images/user/girisyap.png')"
      >
        <div class="row m-0 p-0" style="max-width: 100%;">
          <div class="col-md-6 col-lg-4 login-part-background-bigger-screen">
            <div
              class="d-flex justify-content-center align-items-center"
              style="min-height: 100vh"
            >
              <div class="container-fluid p-0 my-2">
                <div class="d-flex justify-content-center" style="width:100%">
                  <form
                    class="form-background-login-screen  rounded my-2 py-4"
                    style="min-width: 300px;"
                  >
                    <h4 class="card-title text-center">Giriş Yap</h4>
                    <span class="d-none">{{ error }}</span>
                    <div v-if="error" class="error d-block text-center p-2">
                      <span v-html="error"></span>
                    </div>
                    <div class="form-group px-2 py-0">
                      <label
                        >E-Posta Adresi
                        <span class="text-danger">*</span></label
                      >
                      <div class="position-relative">
                        <i
                          class="fea icon-sm icons"
                          data-feather="user"
                          style="z-index:2;"
                        ></i>
                        <input
                          v-model.trim="email"
                          class="form-control pl-5"
                          name="email"
                          placeholder="E-Posta/ GSM"
                          type="text"
                        />
                      </div>
                      <div
                        v-if="submitStatus && !$v.email.required"
                        class="error d-block"
                      >
                        E-Posta adresinizi giriniz
                      </div>
                    </div>
                    <div class="form-group px-2 py-0">
                      <label>Şifre <span class="text-danger">*</span></label>
                      <div class="position-relative">
                        <i
                          class="fea icon-sm icons"
                          data-feather="key"
                          style="z-index:2;"
                        ></i>
                        <input
                          v-model="password"
                          class="form-control pl-5"
                          placeholder="Şifre"
                          type="password"
                        />
                      </div>
                      <div
                        v-if="submitStatus && !$v.password.required"
                        class="error d-block"
                      >
                        Şifrenizi giriniz
                      </div>
                    </div>
                    <div class="form-group text-center m-0 p-0">
                      <div class="custom-control custom-checkbox">
                        <input
                          id="customCheck1"
                          v-model="rememberMe"
                          class="custom-control-input"
                          type="checkbox"
                        />
                        <label
                          class="custom-control-label text-nowrap"
                          for="customCheck1"
                          >Beni Hatırla</label
                        >
                      </div>
                    </div>
                    <div class="p-2">
                      <button
                        :disabled="loading"
                        class="btn btn-primary btn-block"
                        type="button"
                        @click="login"
                      >
                        Giriş Yap
                      </button>
                    </div>
                    <div
                      class=" d-none d-flex justify-content-center pt-2"
                      style="display:none; width:100%"
                    >
                      <button
                        class="btn btn-light btn-social-login mr-1 d-none"
                        type="button"
                      >
                        <i class="mdi mdi-facebook text-primary"></i>
                        <span class="text-nowrap">{{
                          $t("login.facebook")
                        }}</span>
                      </button>
                      <button
                        class="btn btn-light btn-social-login m1 d-none"
                        type="button"
                      >
                        <i class="mdi mdi-google text-danger"></i>
                        <span class="text-nowrap">{{
                          $t("login.google")
                        }}</span>
                      </button>
                    </div>
                    <div
                      class="d-flex justify-content-center flex-wrap mt-4 p-1"
                    >
                      <a
                        class="text-dark font-weight-bold"
                        href="#"
                        @click.prevent="
                          $router.push({ name: 'index.forgotPassword' })
                        "
                      >
                        <i class="fea icon-sm ml-2" data-feather="key"></i>
                        <span class="text-nowrap ml-1">Şifremi Unuttum</span>
                      </a>
                      <a
                        class="text-dark font-weight-bold text-nowrap ml-2"
                        href="#"
                        @click.prevent="
                          $router.push({
                            name: 'index.content_us',
                            query: { selected: 16 },
                          })
                        "
                      >
                        <i class="fea icon-sm ml-2" data-feather="mail"></i>
                        <span class="ml-1 text-nowrap"
                          >E-Posta Adresimi Unuttum</span
                        >
                      </a>
                    </div>
                    <p class="mb-0 mt-4 text-center">
                      <small class="text-dark mr-2"
                        >Henüz üye değil misiniz ?</small
                      >
                      <a
                        class="text-dark font-weight-bold"
                        href="#"
                        @click.prevent="
                          $router.push({ name: 'index.register' })
                        "
                        >Üye Ol</a
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col col-lg-8 big-screen-image-login-screen"
            data-jarallax='{"speed": 0.5}'
            style="background-image:url('images/user/girisyap.png'); min-height: 100%;"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import * as external from "@/core/mixin/external";
import store from "@/core/services";
import { required } from "vuelidate/lib/validators";
import module, {
  GET_USER,
  IS_AUTHENTICATED,
  MODULE_NAME,
  SET_AUTH,
  SET_ERROR,
  SET_USER,
  SUCCESS,
} from "@/core/services/store/auth.module";

import { CREATE_ITEM } from "@/core/services/store/rest.module";
import feather from "feather-icons";
import VueRecaptcha from "vue-recaptcha";
import { assign } from "lodash";
import Loading from "@/view/components/Loader";
import Cookies from "js-cookie";

const _MODULE_NAME = MODULE_NAME;
export default {
  components: { VueRecaptcha, Loading },
  data() {
    return {
      email: "",
      password: "",
      submitStatus: false,
      rememberMe: 0,
      loading: false,
      error: null,
    };
  },
  validations: {
    email: {
      required,
    },
    password: {
      required,
    },
  },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        console.log("module name login" + moduleName);

        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
  },
  computed: {
    isAuthenticated() {
      return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
    },
    success() {
      return store.getters[_MODULE_NAME + "/" + SUCCESS];
    },
  },
  methods: {
    validateEmail(mail) {
      if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      return false;
    },
    login() {
      let self = this;
      const username = self.email;
      const password = self.password;
      self.submitStatus = true;
      self.error = null;

      if (!this.validateEmail(self.email)) {
        if (
          !Number.isInteger(Number(self.email)) ||
          String(self.email).length !== 10
        ) {
          self.error = "Lütfen cep telefonu numaranızı başında 0 olmadan girin";
          return;
        }
      }

      if (!(this.$v.email.$invalid || this.$v.password.$invalid)) {
        self.loading = true;
        // send login request
        let credentials = assign(
          {},
          { username, password },
          {
            type: "password",
            client_id: "portal",
            client_secret: "portal",
            login_type: 1,
          }
        );
        store.commit(_MODULE_NAME + "/" + SET_ERROR, null);
        store
          .dispatch(CREATE_ITEM, {
            url: "/mobile/login/token",
            contents: credentials,
            returnType: "stateless",
          })
          .then((response) => {
            if (response.status) {
              let data = {
                token: localStorage.getItem("token"),
              };
              store.commit(_MODULE_NAME + "/" + SET_AUTH, response.data);
              store
                .dispatch(_MODULE_NAME + "/" + GET_USER, data)
                .then((response) => {
                  self.$store.commit(_MODULE_NAME + "/" + SET_USER, response);
                  if (self.rememberMe) {
                    Cookies.set("remember_me", true, {
                      expires: 2,
                      sameSite: "Lax",
                      secure: true,
                    });
                  } else {
                    Cookies.set("remember_meS", true, {
                      sameSite: "Lax",
                      secure: true,
                    });
                  }

                  if (this.$route.params.hasOwnProperty("redirect")) {
                    self.$router.push({ path: this.$route.params.redirect });
                  } else {
                    self.$router.push({ path: "uyelik" });
                  }
                });
            } else if (response) {
              if (Cookies.get("redirectUrl")) {
                this.$router.push("/resim-yukle");
              }
            } else {
              self.loading = false;
              let item;
              try {
                item = response.data.response.data;
                if (item && item.hasOwnProperty("content")) {
                  self.error =
                    item.content ||
                    "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
                } else if (item) {
                  self.error =
                    "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
                }
              } catch (e) {
                self.error =
                  "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
              }
            }
          });
      }
    },
  },
  mounted() {
    window.scrollTo(0, 0);
    feather.replace();

    if (this.$route.name == "index.auto_login") {
      window.localStorage.clear();
      let token = this.$route.query.token;
      let self = this;
      let data = {
        token: token,
      };

      let tokenData = {
        access_token: token,
        token_type: "bearer",
        refresh_token: token,
        expires_in: 3599,
        scope: "read write trust",
        jti: "Ho-qDbbyqivfwU5DmrvtZRo1Fys",
      };

      store.commit(_MODULE_NAME + "/" + SET_AUTH, tokenData);
      store.dispatch(_MODULE_NAME + "/" + GET_USER, data).then((response) => {
        self.$store.commit(_MODULE_NAME + "/" + SET_USER, response);
        self.$router.push({ path: "uyelik" });
      });
    }

    if (this.isAuthenticated) {
      this.$router.push({ name: "user.account" });
      return true;
    } else {
      window.localStorage.clear();
    }

    this.$store.commit(_MODULE_NAME + "/" + SET_ERROR, null);

    external.del_link("/css/magnific-popup.css");
    external.del_link("/css/owl.carousel.min.css");
    external.del_link("/css/owl.theme.default.min.css");
    external.del_link(
      "https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    );
    external.del_link("css/custom.css");
    external.del_script("/js/magnific.init.js");
  },
  destroyed() {
    external.head_link("/css/magnific-popup.css");
    external.head_link("/css/owl.carousel.min.css");
    external.head_link("/css/owl.theme.default.min.css");
    external.head_link(
      "https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
    );
    external.head_link("css/custom.css", "custom-css");
    external.head_script("/js/magnific.init.js");
  },
};
</script>

<style lang="scss" scoped>
.form-background-login-screen {
  background: rgba(255, 255, 255, 0.97);
}

.big-screen-image-login-screen {
  background-repeat: repeat-y;
  background-size: cover;
  background-position: center;
}

@media (max-width: 767px) {
  .login-screen-cover-container {
    background-repeat: repeat-y;
    background-size: cover;
    background-position: center;
  }
  .big-screen-image-login-screen {
    display: none;
  }
}

@media only screen and (min-width: 768px) {
  .login-part-background-bigger-screen {
    background: rgba(255, 255, 255, 1);
  }
  .form-background-login-screen {
    #Build {
      background-image: none !important;
    }
  }
}
</style>
