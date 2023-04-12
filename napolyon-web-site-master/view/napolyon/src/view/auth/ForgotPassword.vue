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
        class="container-fluid m-0 p-0 forgot-pass-screen-cover-container"
        style="background-image: url('media/images/images/user/03.jpg')"
      >
        <div class="row m-0 p-0" style="max-width: 100%;">
          <div
            class="col-md-6 col-lg-4 forgot-pass-part-background-bigger-screen"
          >
            <div
              class="d-flex justify-content-center align-items-center"
              style="min-height: 100vh"
            >
              <div class="container-fluid p-4 my-2">
                <div class="d-flex justify-content-center" style="width:100%">
                  <form
                    class="form-background-forgot-pass-screen  rounded my-2 py-4"
                    style="min-width: 300px; width: 60vw; max-width: 400px;"
                  >
                    <p class="text-muted text-center px-4 py-1">
                      {{ $t("login.please_enter_your_email_address") }}
                    </p>
                    <div v-if="error" class="error d-block text-center p-2">
                      <span v-html="error"></span>
                    </div>
                    <div v-if="success" class="alert alert-warning text-center">
                      <span v-html="success"></span>
                    </div>
                    <div class="form-group px-4 py-0">
                      <label
                        >E-Posta/ Gsm <span class="text-danger">*</span></label
                      >
                      <div class="position-relative">
                        <i
                          data-feather="mail"
                          class="fea icon-sm icons"
                          style="z-index:2;"
                        ></i>
                        <input
                          type="text"
                          class="form-control pl-5"
                          v-model="info"
                          placeholder="E-Posta/ Gsm"
                        />
                      </div>
                      <div
                        v-if="!success && submitStatus && !$v.info.required"
                        class="error d-block"
                      >
                        Lütfen e-posta adresinizi veya Gsm numaranizi girin.
                      </div>
                    </div>

                    <div class="px-4 py-0">
                      <button
                        type="button"
                        @click="submit"
                        :disabled="loading"
                        class="btn btn-primary btn-block"
                      >
                        {{ $t("login.send") }}
                      </button>
                    </div>

                    <p class="m-2 text-center">
                      <small class="text-dark mr-2"
                        >Şifrenizi hatırlıyor musunuz ?</small
                      >
                      <a
                        class="text-dark font-weight-bold"
                        href="#"
                        @click.prevent="$router.push({ name: 'index.login' })"
                        >Giriş Yap</a
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col col-lg-8 big-screen-image-forgot-pass-screen"
            data-jarallax='{"speed": 0.5}'
            style="background-image:url('images/user/girisyap.png'); min-height: 100%;"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import feather from "feather-icons";
import { required } from "vuelidate/lib/validators";
import store from "@/core/services";
import querystring from "querystring";
import { CREATE_ITEM } from "@/core/services/store/rest.module";
import Loading from "@/view/components/Loader";

export default {
  name: "ForgotPassword",
  components: { Loading },
  data() {
    return {
      info: null,
      submitStatus: false,
      success: null,
      error: null,
      loading: false,
    };
  },
  validations: {
    info: {
      required,
    },
  },
  methods: {
    submit() {
      let self = this;
      self.submitStatus = true;
      self.success = false;
      self.error = false;

      if (!this.$v.$invalid) {
        let params = {
          info: self.info,
        };
        self.loading = true;

        // send login request
        store
          .dispatch(CREATE_ITEM, {
            url: "/mobile/member/forgotPassword?" + querystring.stringify(params),
            returnType: "stateless",
          })
          .then((response) => {
            if (response.status) {
              self.success = response.data.content;
              self.loading = false;
              self.info = null;
            } else {
              self.loading = false;
              try {
                self.error = response.data.response.data.content  || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              } catch (e) {
                self.error = "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              }
            }
          });
      }
    },
  },
  mounted() {
    feather.replace();
  },
};
</script>

<style scoped lang="scss">
.form-background-forgot-pass-screen {
  background: rgba(255, 255, 255, 0.97);
}
.big-screen-image-forgot-pass-screen {
  background-repeat: repeat-y;
  background-size: cover;
  background-position: center;
}
@media (max-width: 767px) {
  .forgot-pass-screen-cover-container {
    background-repeat: repeat-y;
    background-size: cover;
    background-position: center;
  }
  .big-screen-image-forgot-pass-screen {
    display: none;
  }
}
@media only screen and (min-width: 768px) {
  .forgot-pass-part-background-bigger-screen {
    background: rgba(255, 255, 255, 1);
  }
  .form-background-forgot-pass-screen {
    #Build {
      background-image: none !important;
    }
  }
}
</style>
