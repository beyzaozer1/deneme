<template>
  <div>
    <div class="back-to-home rounded d-none d-sm-block">
      <button @click="$router.push({name: 'user.index'})" class="btn btn-icon btn-primary"><i data-feather="home" class="icons"></i></button>
    </div>
    <!-- Hero Start -->
    <section class="cover-user bg-white">
      <div class="container-fluid px-0">
        <div class="row no-gutters position-relative">
          <div class="col-lg-4 cover-my-30 order-2 background-napolyon2">
            <div class="cover-user-img d-flex align-items-center">
              <div class="row">
                <div class="col-12">
                  <div class="card login-page border-0" style="z-index: 1;background: transparent">
                    <div class="card-body p-0">
                      <h4 class="card-title text-center">Hesap Aktivasyon</h4>
                      <form class="login-form mt-4">
                        <div class="row">
                          <div class="col-lg-12 text-center">
                            <i data-feather="mail" class="fea icon-ex-lg icons mb-3"></i>
                          </div>

                          <template v-if="!key">
                            <div class="col-lg-12 text-center">
                              <div class="d-block">
                                Üyeliğinizi başlatmak için hemen e-posta adresinize gönderilen bağlantıya tıklayın, profil bilgilerinizi tamamladıktan sonra anket, yarışma ve gizli görevlere katılarak kazanmaya başlayın.

                                <br />
                                <br />
                                Eğer gelen e-posta, “Gereksiz Kutunuza” düşmüşse lütfen Napolyon.com’dan gelen e-postanızı “Güvenli Mail” olarak işaretlemeyi unutmayın! Konuyla ilgili <a href='https://www.napolyon.com/#/bize-ulasin?form'>"Bize Ulaşın"</a>dan tarafımıza ulaşabilirsiniz.
                              </div>
                            </div>
                          </template>

                          <template v-else>
                            <span v-html="action"  class="text-center" v-if="!error && !success"></span>
                            <span v-html="error" v-if="error"></span>
                            <span v-html="success" v-if="success"></span>
                          </template>

                          <div class="col-md-12 mt-5" v-if="!isMobile || isAndroid">
                            <button class="btn btn-block btn-primary" type="button" @click.prevent="$router.push({name: 'index.login'})">Giriş Yap</button>
                          </div>

                          <div class="col-md-12 mt-5" v-if="isIOS">
                            <button class="btn btn-block btn-primary" type="button" @click.prevent="redirectToApp(1)">Giriş Yap</button>
                          </div>
                        </div><!--end row-->
                      </form>
                    </div>
                  </div>
                </div><!--end col-->
              </div><!--end row-->
            </div> <!-- end about detail -->
          </div> <!-- end col -->
          <div class="col-lg-8 offset-lg-4 padding-less img order-1" style="background-image:url('images/user/girisyap.png')"
               data-jarallax='{"speed": 0.5}'></div><!-- end col -->
        </div><!--end row-->
      </div><!--end container fluid-->
    </section><!--end section-->
  </div>
</template>

<script>
import * as external from '@/core/mixin/external'
import store from "@/core/services/index";
import feather from 'feather-icons';
import {CREATE_ITEM} from "@/core/services/store/rest.module";
import querystring from "querystring";
import { isMobile, isIOS, isAndroid } from 'mobile-device-detect';

export default {
  data() {
    return {
      key: '',
      error: null,
      success: null,
      action: "<div class='d-block alert alert-info'>İşlem yapılıyor. Lütfen bekleyiniz</div>",
    };
  },
  computed: {
    isMobile() {
      return isMobile
    },
    isIOS() {
      return isIOS
    },
    isAndroid() {
      return isAndroid
    }
  },
  methods: {
    redirectToApp(type) {
      if (type == 1) {
        location.replace("myNapoyonAppUrlScheme://com.napolyon.iosapp2");
      } else {
        location.replace("myNapoyonAppUrlScheme://com.napolyon.iosapp2");
      }
    }
  },
  mounted() {
    let self = this;
    window.scrollTo(0,0);
    feather.replace();

    if (this.$route.query.key) {
      self.key = this.$route.query.key;
    }

    if (self.key) {
      let params = {
        key: self.key
      }

      // send reset password request
      store.dispatch( CREATE_ITEM, {
        url: "/mobile/member/activateMember?" + querystring.stringify(params),
        returnType: 'stateless'
      }).then(response => {
        if (response.status) {
          self.success = response.data.content;
        } else {
          try {
            self.error = response.data.response.data.content;
          } catch (e) {
            self.error = '<div class="alert alert-danger">İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz</div>';
          }
          if (!self.error) {
            self.error = '<div class="alert alert-danger">İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz</div>';
          }
        }
      });
    }


    external.del_link('/css/magnific-popup.css');
    external.del_link('/css/owl.carousel.min.css');
    external.del_link('/css/owl.theme.default.min.css');
    external.del_link('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
    external.del_link('css/custom.css');
    external.del_script('/js/magnific.init.js');
  },
  destroyed() {
    external.head_link('/css/magnific-popup.css');
    external.head_link('/css/owl.carousel.min.css');
    external.head_link('/css/owl.theme.default.min.css');
    external.head_link('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
    external.head_link('css/custom.css');
    external.head_script('/js/magnific.init.js');
  },
};
</script>

<style lang="scss">

</style>


