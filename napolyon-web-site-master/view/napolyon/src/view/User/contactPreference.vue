<template>
  <div id="contentUs">
    <t-header :nav-light="false"></t-header>
    <section
        class="bg-half bg-light d-table w-100"
        style="background: url('media/images/images/contact-detail.jpg') center center;"
    >
      <div class="bg-overlay bg-overlay-white"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <div class="page-next-level">
              <h4 class="title">{{ $t("general.contact_preference") }}</h4>
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </section>
    <!--end section-->
    <div class="position-relative">
      <div class="shape overflow-hidden text-white">
        <svg
            fill="none"
            viewBox="0 0 2880 48"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
    <!--Shape End-->

    <!-- questions section begin -->

    <div class="container mt-5">
      <div class="row">
        <div class="col-lg-12">
          <div class="UnSubscribleHead">
            <p class="turuncu-baslik UnSubBaslik">Sevgili {{ username }},</p>
            <p>Napolyon.com'dan e-posta almak istemediğinizi ilettiniz.</p>
            <p>Görüşleriniz bizim için çok değerli, sizlerin memnuniyetini artırabilmemiz, hizmet kalitemizi gözden
              geçirmemiz ve size daha iyi hizmet verebilmemiz için Napolyon.com'dan neden ayrıldığınızı bilmek
              istiyoruz.</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <form action="" method="post">
            <div class="modal-form">
              <div class="row" style="border-bottom: 1px solid #ddd">
                <div class="col-md-6 UnSubLeft">
                  <template v-for="item in items">
                    <div class="form-group">
                      <label class="container_radio version_2 answer"
                      > {{ item.text }}
                        <input
                            id="reason"
                            :checked="item.id === selectedReason"
                            :value="item.id"
                            class="required"
                            name="reason"
                            type="radio"
                            @change="selectedReason = item.id"
                        />
                        <span class="checkmark"></span>
                      </label>
                    </div>

                  </template>
                </div>

                <div class="col-md-6 UnSubRight">
                  <div v-if="selectedReason === 7">
                    <p>
                      Napolyon.com’da alacağınız e-postaların sıklığını ve e-posta tercihlerinizi kendiniz
                      belirleyebilirsiniz.
                    </p>
                    <p>
                      Tarafınıza gönderilen kampanya ve anket e-postaları profil bilgilerinizin doluluğuna bağlıdır.
                      Profil bilgilerinizin tamamını doldurduğunuzda, tercihlerinize uygun çok çeşitli anket e-postaları
                      alabilirsiniz. Size gönderilen e-postaları okuduğunuzda, tıkladığınızda, Facebook’ta
                      paylaştığınızda, anketleri doldurduğunuzda, arkadaşlarınız davetinizle üye olduklarında daha çok
                      NAP Puan kazanabilirsiniz.
                    </p>
                  </div>

                  <div v-if="selectedReason === 8">
                    <p>
                      Napolyon.com'a giriş yaparak hesabınızı, istediğiniz zaman yeniden aktifleştirebileceğinizi
                      unutmayın! Ayrıca, Napolyon.com'daki bilgileriniz hesabınızı aktifleştirdikten sonra otomatik
                      olarak geri gelecektir.Napolyon.com hesabınızı tekrar aktifleştirmek için mevcut şifre ve giriş
                      bilgilerinizle tekrar giriş yapabilirsiniz.
                    </p>
                  </div>

                  <div v-if="selectedReason === 9">
                    <p>
                      Napolyon.com, üyelerinin bütün bilgilerini "Gizlilik Politikası" kapsamında saklar ve üçüncü kişi
                      / firmalarla paylaşmaz.
                    </p>
                    <p>
                      <a :href="$router.resolve({name: 'index.membership_agreement'}).href" target="_blank">Üyelik
                        sözleşmesini</a>
                      incelemek için tıklayın. Ayrıca, profil bilgilerinizi vermeden üyeliğinizi devam ettirdiğinizde
                      sadece
                      Napolyon.com’un size ulaştıracağı kampanya e-posta / SMS lerini alabilir ve arkadaşlarınıza davet
                      göndererek NAP Puan kazanabilirsiniz.
                    </p>
                  </div>

                  <div v-if="selectedReason === 10">
                    <p>
                      <a :href="$router.resolve({name: 'index.about_us'}).href" target="_blank">Hakkımızda</a> sayfasını
                      inceleyerek Napolyon.com
                      hakkında bilgi edinebilirsiniz.
                    </p>
                    <p>
                      Ayrıca <a :href="$router.resolve({name: 'index.content_us'}).href" target="_blank">Sıkça
                      Sorulanlar</a> sayfasında da sorularınızın cevaplarını bulabilirsiniz.
                    </p>
                  </div>

                  <div v-if="selectedReason === 11">
                    <p>
                      Napolyon.com üyeleri, isterlerse Napolyon.com’da kayıtlı e-posta adreslerini değiştirebilirler.
                      E-posta adresinizi değiştirmek için <a :href="$router.resolve({name: 'user.account'}).href"
                                                             target="_blank">buraya tıklayın.</a>
                    </p>
                  </div>

                  <div v-if="selectedReason === 12">
                    <p>
                      Napolyon.com’da yer alan eğlenceli kampanyalara katılarak hem ayırdığınız vakti keyifli
                      geçirebilir, hem de birbirinden ilgi çekici ödüller kazanabilirsiniz. Hemen <a
                        :href="$router.resolve({name: 'user.setting'}).href" target="_blank">tıklayın.</a>
                    </p>
                  </div>

                  <div v-if="selectedReason === 13">
                    <span class="field-validation-valid" data-valmsg-for="OtherReason"
                          data-valmsg-replace="true"></span>
                    <textarea
                        id="comments"
                        v-model="message"
                        class="form-control"
                        name="comments"
                        placeholder="Mesajınız :"
                        rows="4"
                    ></textarea>
                    <div v-if="submitStatus && !$v.message.required" class="error d-block">
                      Lütfen Boş Bırakmayınız!
                    </div>
                    <div v-if="!$v.message.maxLength" class="error">
                      Mesajınız en fazla
                      {{ $v.message.$params.maxLength.max }} karakterden
                      oluşabilir.
                    </div>
                  </div>
                </div>
              </div>
              <div class="row mb-5">
                <div class="col-md-12 UnSubCenter">
                  <div class="form-group">
                    <input id="Email" v-model="email"
                           class="form-control"
                           data-val-required="Lütfen e-posta adresiniz ya da GSM numaranız ile giriş yapın."
                           name="Email" placeholder="E-Posta / GSM" type="text" value="">
                    <div
                        v-if="submitStatus && !$v.email.required"
                        class="error d-block text-left"
                    >
                      E-posta adresiniz veya başında "0" olmadan GSM numaranızı giriniz
                    </div>
                  </div>
                  <div class="form-group">
                    <input id="Password" v-model="password" class="form-control sifre-goster"
                           data-val="true" data-val-required="Lütfen şifrenizi girin." name="Password"
                           placeholder="Şifre" type="password">
                    <div
                        v-if="submitStatus && !$v.password.required"
                        class="error d-block text-left"
                    >
                      Şifrenizi giriniz
                    </div>
                  </div>
                  <div class="form-group">
                    <button class="btn btn-embossed btn-success" type="button" @click="submit">Güncelle</button>
                  </div>
                  <p v-if="requestSuccess">
                    <span class="alert alert-success">

                      {{ requestSuccess }}
                    </span>
                  </p>
                  <p v-if="requestError">
                    <span class="alert alert-danger" v-html="requestError"></span>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <t-up-footer></t-up-footer>
    <t-footer></t-footer>
  </div>
</template>

<script>
import Footer from "@/view/layouts/Footer";
import upFooter from "@/view/layouts/upFooter";
import Header from "@/view/layouts/Header";
import feather from "feather-icons";
import store from "@/core/services";
import module, {
  CONTACT_PREFERENCE_REASONS,
  ERROR,
  GET_CONTACT_PREFERENCE_REASONS,
  MODULE_NAME
} from "@/core/services/store/content.module";
import * as external from "@/core/mixin/external";
import {maxLength, required} from "vuelidate/lib/validators";
import {CREATE_ITEM} from "@/core/services/store/rest.module";
import moduleAuth, {IS_AUTHENTICATED, MODULE_NAME as MODULE_NAME_AUTH, USER,} from "@/core/services/store/auth.module";
import ApiService from "@/core/services/api.service";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_AUTH = MODULE_NAME_AUTH;

export default {
  name: "contactPreference",
  components: {
    "t-footer": Footer,
    "t-up-footer": upFooter,
    "t-header": Header,
  },

  validations() {
    if (this.selectedReason === 13) {
      return {
        email: {
          required,
        },
        password: {
          required,
        },
        message: {
          required,
          maxLength: maxLength(1024),
        },
      }
    } else {
      return {
        email: {
          required,
        },
        password: {
          required,
        }
      }
    }
  },
  beforeCreate() {
    $("#body").height("auto");
    ApiService.init();

    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_AUTH, moduleAuth);
  },
  data() {
    return {
      submitButtonStatus: false,
      url: "nopReason/unsubscribe",
      unsubscribeUrl: "mobile/member/unsubscribe",
      requestSuccess: null,
      requestError: null,
      contactFormStatus: false,
      submitStatus: false,
      email: null,
      message: null,
      password: null,
      selectedReason: 7,
    };
  },
  computed: {
    username() {
      return this.user ? this.user.firstName + ' ' + this.user.lastName : "üyemiz";
    },
    user: {
      get() {
        return store.getters[_MODULE_NAME_AUTH + "/" + USER];
      },
      set(value) {
      },
    },
    items() {
      let items = store.getters[_MODULE_NAME + "/" + CONTACT_PREFERENCE_REASONS];
      let results = [];

      if (items) {
        items.forEach(item => {
          if (item.isActive) {
            results.push({
              id: item.nopReasonId,
              text: item.description,
            })
          }
        })
      }

      return results;
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
    isAuthenticated() {
      return store.getters[_MODULE_NAME_AUTH + "/" + IS_AUTHENTICATED];
    },
  },
  methods: {
    submit() {
      let self = this;
      self.requestError = false;
      self.requestSuccess = false;
      self.submitButtonStatus = true;
      self.submitStatus = true;

      if (!this.$v.$invalid) {
        let formData = {
          username: self.email,
          password: self.password,
          identifier: self.$route.params.id,
          nopReasonId: self.selectedReason,
          other: "",
        };

        if (this.selectedReason === 13) {
          formData.other = self.message;
        }

        this.$store
            .dispatch(CREATE_ITEM, {
              url: this.unsubscribeUrl,
              contents: formData,
              returnType: 'stateless'
            })
            .then((response) => {
              if (response.status) {
                self.requestSuccess = response.data.content;
                window.localStorage.clear();
                setTimeout(() => {
                  self.$router.push({
                    name: 'user.index'
                  });
                  location.reload();
                }, 1000)
              } else {
                try {
                  self.requestError = response.data.response.data ? response.data.response.data : "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
                } catch (e) {
                  self.requestError = "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
                }
              }
            })
            .catch((response) => {
              self.submitButtonStatus = false;
              try {
                self.requestError = response.data.response.data;
              } catch (e) {
                self.requestError = "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
              }
            });
      } else {
        self.submitButtonStatus = false;
      }
    },
    submitFeedback(itemId) {
      window.alert("Geri bildirim için teşekkürler.");
    },
    getItems() {
      this.$store.dispatch(_MODULE_NAME + "/" + GET_CONTACT_PREFERENCE_REASONS, {
        url: this.url,
        filters: {
          all: true,
        },
      });
    },
  },
  mounted() {
    this.getItems();
    external.head_link("/survey/css/menu.css", "survey-menu-css", "custom-css");
    external.head_link("/survey/css/style.css", "survey-style-css", "survey-menu-css");
    external.head_link("/survey/css/vendors.css", "survey-vendors-css", "survey-style-css");
    external.head_link("/survey/css/custom.css", "survey-custom-css", "survey-vendors-css");


    window.scrollTo(0, 0);
    feather.replace();
  },
  watch: {
    user(value) {
      if (this.user) {
        this.email = this.user.email;
        this.phone = this.user.gsmNumber;
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
      }
    },
  },
  destroyed() {
    external.head_link("/survey/css/menu.css");
    external.head_link("/survey/css/style.css");
    external.head_link("/survey/css/vendors.css");
    external.head_link("/survey/css/custom.css");
  },
};
</script>

<style scoped>
@media (max-width: 450px) {
  .textarea-count-box {
    display: none;
  }
}

.UnSubscribleHead {
  position: relative;
  background-color: #F38630;
  color: #FFF;
  width: 100% !important;
  padding: 15px;
  margin-bottom: 25px;
}

.UnSubscribleHead::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 0;
  height: 0;
  border-top: solid 25px #F38630;
  border-left: solid 25px transparent;
  border-right: solid 25px transparent;
}

.UnSubscribleHead {
  position: relative;
  background-color: #F38630;
  color: #FFF;
  width: 100% !important;
  padding: 15px;
  margin-bottom: 25px;
}

.UnSubBaslik {
  color: #FFF !important;
}

.UnSubscribleHead:after {
  content: '';
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 0;
  height: 0;
  border-top: solid 25px #F38630;
  border-left: solid 25px transparent;
  border-right: solid 25px transparent;
}

.UnSubRight {
  border-left: 1px solid #DDD;
  display: table;
}

.UnSubLeft label {
  font-weight: 600 !important;
}

.UnSubRight div {
  display: table-cell;
  vertical-align: middle;
}

.UnSubCenter {
  text-align: center;
  padding-top: 22px;
  border-top: 1px solid #ddd;
  background: rgb(204, 204, 204); /* Old browsers */
  background: -moz-linear-gradient(top, rgba(204, 204, 204, 1) 0%, rgba(232, 232, 232, 1) 50%, rgba(238, 238, 238, 1) 100%); /* FF3.6+ */
  background: -webkit-gradient(linear, left top, left bottom, color-stop(0%, rgba(204, 204, 204, 1)), color-stop(50%, rgba(232, 232, 232, 1)), color-stop(100%, rgba(238, 238, 238, 1))); /* Chrome,Safari4+ */
  background: -webkit-linear-gradient(top, rgba(204, 204, 204, 1) 0%, rgba(232, 232, 232, 1) 50%, rgba(238, 238, 238, 1) 100%); /* Chrome10+,Safari5.1+ */
  background: -o-linear-gradient(top, rgba(204, 204, 204, 1) 0%, rgba(232, 232, 232, 1) 50%, rgba(238, 238, 238, 1) 100%); /* Opera 11.10+ */
  background: -ms-linear-gradient(top, rgba(204, 204, 204, 1) 0%, rgba(232, 232, 232, 1) 50%, rgba(238, 238, 238, 1) 100%); /* IE10+ */
  background: linear-gradient(to bottom, rgba(204, 204, 204, 1) 0%, rgba(232, 232, 232, 1) 50%, rgba(238, 238, 238, 1) 100%); /* W3C */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#cccccc', endColorstr='#eeeeee', GradientType=0); /* IE6-9 */
}

.btn-fb {
  color: #FFF;
  background-color: #325a97;
  border-color: #2a4f87;
}

.btn-fb:hover {
  background-color: #3d6bb0;
  border-color: #3661a1;
}


.tekrar-gonder-btn .hvr-icon-forward:before {
  content: "\f1d8";
}

</style>
