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
        style="background-image: url('images/user/01.jpg')"
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
                    <h4 class="card-title text-center">
                      E-Mail Adresi Onaylama
                    </h4>
                    <div class="d-flex justify-content-center">
                      <i
                        data-feather="mail"
                        class="fea icon-ex-lg icons mb-3"
                      ></i>
                    </div>

                    <template v-if="!key">
                      <div class="col-lg-12 text-center">
                        <div class="d-block">
                          Üyeliğinizi başlatmak için hemen e-posta adresinize
                          gönderilen bağlantıya tıklayın, profil bilgilerinizi
                          tamamladıktan sonra anket, yarışma ve gizli görevlere
                          katılarak kazanmaya başlayın.

                          <br />
                          <br />
                          Eğer gelen e-posta, “Gereksiz Kutunuza” düşmüşse
                          lütfen Napolyon.com’dan gelen e-postanızı “Güvenli
                          Mail” olarak işaretlemeyi unutmayın! Konuyla ilgili
                          <a href="https://www.napolyon.com/#/bize-ulasin?form"
                            >"Bize Ulaşın"</a
                          >dan tarafımıza ulaşabilirsiniz.
                        </div>
                      </div>
                    </template>

                    <template v-else>
                      <div
                        class="d-flex justify-content-center "
                        style="width:100%;"
                      >
                        <span
                          v-html="action"
                          class="text-center"
                          v-if="!error && !success"
                        ></span>
                        <span
                          class="text-center"
                          v-html="error"
                          v-if="error"
                        ></span>
                        <span
                          class="text-center"
                          v-html="success"
                          v-if="success"
                        ></span>
                      </div>
                    </template>

                    <div class="p-2">
                      <button
                        class="btn btn-block btn-primary"
                        type="button"
                        @click.prevent="$router.push({ name: 'index.login' })"
                      >
                        Giriş Yap
                      </button>
                    </div>
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
import store from "@/core/services/index";
import feather from "feather-icons";
import { CREATE_ITEM } from "@/core/services/store/rest.module";
import querystring from "querystring";
export default {
  data() {
    return {
      key: "",
      error: null,
      success: null,
      action:
        "<div class='d-block alert alert-info text-center'>İşlem yapılıyor. Lütfen bekleyiniz</div>",
    };
  },
  mounted() {
    let self = this;
    window.scrollTo(0, 0);
    feather.replace();

    if (this.$route.query.key) {
      self.key = this.$route.query.key;
    }

    if (self.key) {
      let params = {
        key: self.key,
      };

      // send reset password request
      store
        .dispatch(CREATE_ITEM, {
          url: "/mobile/member/approveMail?" + querystring.stringify(params),
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
                '<div class="alert alert-danger">İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz</div>';
            }
            if (!self.error) {
              self.error =
                '<div class="alert alert-danger">İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz</div>';
            }
          }
        });
    }

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

<style scoped lang="scss">
.form-background-login-screen {
  background: rgba(255, 255, 255, 0.9);
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
