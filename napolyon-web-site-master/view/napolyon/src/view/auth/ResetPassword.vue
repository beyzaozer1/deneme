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
        style="background-image: url('media/images/images/user/03.jpg')"
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
                    <h4 class="card-title text-center">Şifremi Yenile</h4>
                    <p class="text-muted text-center">
                      Lütfen yeni şifrenizi giriniz.
                    </p>
                    <div
                      v-if="success"
                      class="alert alert-success text-center m-2"
                    >
                      {{ success }}
                    </div>

                    <div v-if="error" class="error d-block text-center p-2">
                      <span v-html="error"></span>
                    </div>
                    <div class="form-group px-2 py-0">
                      <label>Şifre <span class="text-danger">*</span></label>
                      <div class="position-relative">
                        <i
                          class="fea icon-sm icons"
                          style="z-index:2;"
                          data-feather="key"
                        ></i>
                        <input
                          type="password"
                          class="form-control pl-5"
                          v-model="password"
                          placeholder="Şifre"
                        />
                      </div>
                      <div
                        v-if="submitStatus && !$v.password.required"
                        class="error d-block"
                      >
                        Şifrenizi giriniz
                      </div>
                      <div
                        v-if="submitStatus && !$v.password.minLength"
                        class="error d-block"
                      >
                        Şifreniz en az
                        {{ $v.password.$params.minLength.min }}
                        karakterden oluşmalıdır
                      </div>
                      <div
                        v-if="
                          submitStatus &&
                            !$v.password.valid &&
                            $v.password.minLength
                        "
                        class="error d-block"
                      >
                        En az 1 harf 1 rakam olmalıdır.
                      </div>
                    </div>
                    <div class="form-group px-2 py-0">
                      <label
                        >Şifre Tekrar <span class="text-danger">*</span></label
                      >
                      <div class="position-relative">
                        <i
                          class="fea icon-sm icons"
                          style="z-index:2;"
                          data-feather="key"
                        ></i>
                        <input
                          type="password"
                          class="form-control pl-5"
                          v-model="password_confirm"
                          placeholder="Şifre Tekrar"
                        />
                      </div>
                      <div
                        v-if="
                          submitStatus && !$v.password_confirm.sameAsPassword
                        "
                        class="error d-block"
                      >
                        Şifreler aynı olmalıdır
                      </div>
                    </div>

                    <div class="p-2">
                      <button
                        :disabled="loading"
                        class="btn btn-primary btn-block"
                        type="button"
                        @click="submit"
                      >
                        {{ $t("login.send") }}
                      </button>
                    </div>

                    <p class="mb-0 mt-4 text-center">
                      <small class="text-dark mr-2">{{
                        $t("login.remember_your_password")
                      }}</small>
                      <a
                        href="#"
                        @click="$router.push({ name: 'index.login' })"
                        class="text-dark font-weight-bold"
                        >{{ $t("login.log_in") }}</a
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
import feather from "feather-icons";
import { minLength, required, sameAs } from "vuelidate/lib/validators";
import store from "@/core/services";
import querystring from "querystring";
import { CREATE_ITEM } from "@/core/services/store/rest.module";

export default {
  name: "ResetPassword",
  data() {
    return {
      password: null,
      password_confirm: null,
      submitStatus: false,
      success: null,
      error: null,
      key: null,
    };
  },
  validations: {
    password: {
      required,
      minLength: minLength(6),
      valid: function(value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return (containsUppercase || containsLowercase) && containsNumber;
      },
    },
    password_confirm: {
      sameAsPassword: sameAs("password"),
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
          key: self.key,
          password: self.password,
        };
        // send reset password request
        store
          .dispatch(CREATE_ITEM, {
            url:
              "/mobile/member/recoverPassword?" + querystring.stringify(params),
            returnType: "stateless",
          })
          .then((response) => {
            if (response.status) {
              self.success = response.data.content;
            } else {
              try {
                self.error = response.data.response.data.content;
              } catch (e) {
                self.error =
                  "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              }
            }
          });
      }
    },
  },
  mounted() {
    this.key = this.$route.query.key;
    if (!this.key) {
      this.$router.push({ name: "index.login" });
    }
    feather.replace();
  },
};
</script>

<style scoped lang="scss">
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
