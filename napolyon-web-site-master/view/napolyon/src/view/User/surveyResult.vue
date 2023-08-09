<template>
  <div id="contentUs">
    <t-header v-if="!isMobile" :nav-light="false"></t-header>
    <section
      v-if="!isMobile"
      class="bg-half bg-light d-table w-100"
      style="background: url('media/images/images/contact-detail.jpg') center center;"
    >
      <div class="bg-overlay bg-overlay-white"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <div class="page-next-level">
              <h4 class="title">Anket Sonucu</h4>
              <div class="page-next">
                <nav aria-label="breadcrumb" class="d-inline-block">
                  <ul class="breadcrumb bg-white rounded shadow mb-0">
                    <li class="breadcrumb-item">
                      <a @click="$router.push({ name: 'user.index' })">{{
                        $t("index.home")
                      }}</a>
                    </li>
                    <li aria-current="page" class="breadcrumb-item active">
                      Anket Sonucu
                    </li>
                  </ul>
                </nav>
              </div>
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
    <div class="questions-section" :class="isMobile ? 'mt-0' : ''">
      <div class="container">
        <div class="row text-center mb-20" v-if="surveyResult">
          <div v-if="surveyResult == surveyFilled" class="col-lg-12">
            <h3 v-if="isMobile" class="primary-color">
              Sevgili {{ username }},
            </h3>
            <h1 v-else class="primary-color">Sevgili {{ username }},</h1>
            <p>
              Anketimize gösterdiğiniz ilgi için teşekkürler fakat bu anketimizi
              daha önce doldurdunuz.
            </p>
            <p>Yeni bir ankette görüşmek üzere ...</p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>

          <div v-if="surveyResult == quota" class="col-lg-12">
            <h3 v-if="isMobile" class="primary-color">
              Sevgili {{ username }},
            </h3>
            <h1 v-else class="primary-color">Sevgili {{ username }},</h1>

            <p><strong>Anketin kotası dolmuştur.</strong></p>
            <p>İlginize teşekkür ederiz.</p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>

          <div v-if="surveyResult == projectClosed" class="col-lg-12">
            <h3 v-if="isMobile" class="primary-color">
              Sevgili {{ username }},
            </h3>
            <h1 class="primary-color">Sevgili {{ username }},</h1>
            <p><strong>Çalışma tamamlanmıştır.</strong></p>
            <p>Gösterdiğiniz ilgiye teşekkür ederiz.</p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>

          <div
            v-if="
              surveyResult == linkError ||
                surveyResult == messageError ||
                surveyResult == linkError ||
                surveyResult == messageNotFoundError ||
                surveyResult == offerError
            "
            class="col-lg-12"
          >
            <h1 class="primary-color">Sevgili {{ username }},</h1>
            <p>Anketimize gösterdiğiniz ilgi için teşekkürler.</p>
            <p>
              Teknik bir sorundan kaynaklı anket puanınız hesabınıza maalesef
              yüklenememiştir.
            </p>
            <p>
              Konu ilgili birimlere iletilmiş olup, en kısa zamanda çözüme
              kavuşturulacaktır.
            </p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>

          <div v-if="surveyResult == overQuota" class="col-lg-12">
            <h1 class="primary-color">Sevgili {{ username }},</h1>
            <p>
              Bulunduğunuz grupta hedeflenen kişi sayısına ulaşılmıştır.
              Göstermiş olduğunuz ilgi için teşekkür ederiz.
            </p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>

          <div v-if="surveyResult == noPoint" class="col-lg-12">
            <h1 class="primary-color">Sevgili {{ username }},</h1>
            <p>Anketi doldurduğunuz için teşekkür ederiz.</p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>
          <div v-if="surveyResult == completeWithoutPoint" class="col-lg-12">
            <h1 class="primary-color">Sevgili {{ username }},</h1>
            <p>Anketi doldurduğunuz için teşekkür ederiz.</p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>

          <div v-if="surveyResult == timeUp" class="col-lg-12">
            <h1 class="primary-color">Sevgili {{ username }},</h1>
            <p>Anketimize gösterdiğiniz ilgi için teşekkürler.</p>
            <p>Maalesef biraz geciktiniz, anketimizin süresi doldu.</p>
            <p>Göstermiş olduğunuz ilgi için teşekkür ederiz.</p>
            <p>Yeni bir ankette görüşmek üzere...</p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>

          <div v-if="surveyResult == timeUp" class="col-lg-12">
            <h1 class="primary-color">Sevgili {{ username }},</h1>
            <p>Maalesef biraz geciktiniz ve anket çalışması tamamlandı.</p>
            <p>NAP kazanamadınız ancak KUPA ödülü hesabınıza yüklendi.</p>
            <p>
              Size ulaşan anketleri anında doldurun, NAP puan kazanma şansınızı
              ve Napolyon Mobil Uygulamasına özel Liderlik sıralamasındaki KUPA
              sayınızı arttırın.
            </p>
            <p>
              Göstermiş olduğunuz ilgi için teşekkür ederiz. Yeni bir ankette
              görüşmek üzere.
            </p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
            <div class="alert alert-success" v-if="cup">
              Tebrikler
              <strong
                >{{ cup
                }}<img
                  :src="mediaBase + '/images/cup.png'"
                  height="18"
                  width="18"
                />
              </strong>
              kazandınız.
            </div>
          </div>

          <div v-if="surveyResult == complete" class="row p-3">
            <div class="col-lg-6 col-md-6 col-xs-12">
              <img
                :src="mediaBase + '/images/smile.png'"
                class="img-responsive text-center animated rubberBand mt-3"
              />
              <br />
              <p
                style="text-align:center; margin-top: 10px; font-family: museo500; font-weight:bold; color: #008679; font-size: x-large;"
              >
                TEBRİKLER KAZANDINIZ!
              </p>
            </div>
            <div class="col-lg-6 col-md-6 col-xs-12 text-left">
              <h3 v-if="isMobile" class="primary-color">
                Sevgili {{ username }},
              </h3>
              <h1 v-else class="primary-color">Sevgili {{ username }},</h1>
              <p>
                Bu anketi doldurarak <strong>{{ point }}</strong> NAP Puan
                <span v-if="cup"> ve aşağıda belirtilen kadar kupa </span>
                kazandınız.
              </p>
              <p v-if="cup">
                Kupalarınız Napolyon Mobil Uygulamasındaki Liderlik sıralamasını
                belirler.
              </p>
              <p>
                Göstermiş olduğunuz ilgi için teşekkür ederiz. Yeni bir ankette
                görüşmek üzere.
              </p>
              <p>Saygılarımızla,</p>
              <p>Napolyon Ekibi</p>
            </div>
            <div v-if="cup" class="col-12 mt-2">
              <div class="alert alert-success">
                Tebrikler
                <strong
                  >{{ cup
                  }}<img
                    :src="mediaBase + '/images/cup.png'"
                    height="18"
                    width="18"
                  />
                </strong>
                kazandınız.
              </div>
            </div>
          </div>

          <div v-if="surveyResult == screenOut" class="row p-3">
            <div class="col-lg-6 col-md-6 col-xs-12">
              <img
                :src="mediaBase + '/images/sad.png'"
                class="img-responsive text-center animated rubberBand mt-3"
              />
              <br />
              <p
                style="text-align:center; margin-top: 10px; font-family: museo500; font-weight:bold; color: #008679; font-size: x-large;"
              >
                ÜZGÜNÜZ BU ANKET SİZE GÖRE DEĞİL!
              </p>
            </div>
            <div class="col-lg-6 col-md-6 col-xs-12 text-left">
              <h3 v-if="isMobile" class="primary-color">
                Sevgili {{ username }},
              </h3>
              <h1 v-else class="primary-color">Sevgili {{ username }},</h1>
              <p>
                Maalesef görüşleri alınmak istenen hedef grubun içerisinde
                değilsiniz.
              </p>
              <p>
                <span v-if="point"
                  ><strong>{{ point }}</strong> Nap Puan
                </span>
                <span v-if="point && cup"> ve </span
                ><span v-if="cup"> KUPA ödülü </span> hesabınıza yüklendi.
              </p>
              <p>
                Kupalarınız Napolyon Mobil Uygulamasındaki Liderlik sıralamasını
                belirler.
              </p>
              <p>
                Göstermiş olduğunuz ilgi için tekrar teşekkür ederiz. Yeni bir
                ankette görüşmek üzere.
              </p>
              <p>Saygılarımızla,</p>
              <p>Napolyon Ekibi</p>
            </div>
            <div v-if="cup" class="col-12 mt-2">
              <div class="alert alert-success">
                Tebrikler
                <strong
                  >{{ cup
                  }}<img
                    :src="mediaBase + '/images/cup.png'"
                    height="18"
                    width="18"
                  />
                </strong>
                kazandınız.
              </div>
            </div>
          </div>
        </div>
        <div v-if="completedError" class="row text-center mb-20">
          <div class="col-lg-12">
            <h3 v-if="isMobile" class="primary-color">
              Sevgili {{ username }},
            </h3>
            <h1 v-else class="primary-color">Sevgili {{ username }},</h1>
            <p>Anketimize gösterdiğiniz ilgi için teşekkürler.</p>
            <p>
              Teknik bir sorundan kaynaklı anket puanınız hesabınıza maalesef
              yüklenememiştir.
            </p>
            <p>
              Konu ilgili birimlere iletilmiş olup, en kısa zamanda çözüme
              kavuşturulacaktır.
            </p>
            <p class="mt-5">
              Saygılarımızla, <span class="mt-1 d-block">Napolyon.com</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <!-- questions section end -->
    <t-up-footer v-if="!isMobile" />
    <t-footer v-if="!isMobile" />
  </div>
</template>

<script>
import Footer from "@/view/layouts/Footer";
import upFooter from "@/view/layouts/upFooter";
import Header from "@/view/layouts/Header";
import feather from "feather-icons";
import * as external from "@/core/mixin/external";
import { GET_ITEMS } from "@/core/services/store/rest.module";
import module, {
  GET_USER,
  MODULE_NAME,
  USER,
} from "@/core/services/store/auth.module";
import store from "@/core/services";

const _MODULE_NAME = MODULE_NAME;

export default {
  name: "surveyResult",
  components: {
    "t-footer": Footer,
    "t-up-footer": upFooter,
    "t-header": Header,
  },
  beforeCreate() {
    $("#body").height("auto");

    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
  },
  data() {
    return {
      screenMember: null,
      isMobile: false,
      error: false,
      result: false,
      mid: null,
      point: 0,
      cup: 0,
      surveyFilled: "anket-dolduruldu",
      projectClosed: "proje-kapandi",
      linkError: "link-hata",
      messageError: "mesaj-hata",
      messageNotFoundError: "mesaj-bulunamadi",
      offerError: "teklif-hatali",
      quota: "kota",
      noPoint: "_noPointView",
      screenOut: "_screenOutView",
      timeUp: "_timeUpView",
      overQuota: "_overQuotaView",
      complete: "_completedView",
      completeWithoutPoint: "_okWithoutPointView",
      completedSuccess: null,
      completedError: null,
      surveyResult: null,
      redirectObject: {
        title: null,
        content: null,
      },
    };
  },
  computed: {
    /*    authUser() {
      return store.getters[_MODULE_NAME + '/' + USER]
    },*/
    username() {
      return this.screenMember || "üyemiz";
    },
  },
  methods: {
    getResult() {
      let self = this;
      let formData = {
        mid: self.mid,
      };
      this.$store
        .dispatch(GET_ITEMS, {
          url: "/linkTracker/callbackSSI",
          filters: formData,
          returnType: "stateless",
        })
        .then((response) => {
          if (response.status) {
            self.result = response.data;
            self.screenMember = self.result.hasOwnProperty("screenMember")
              ? response.data.screenMember
              : null;
            if (self.result.hasOwnProperty("view")) {
              if (self.result.view === "_completedView") {
                self.point = self.result.completePoint;
                self.cup = self.result.cupCount;
                self.surveyResult = self.complete;
              }

              if (self.result.view === "_noPointView") {
                self.surveyResult = self.noPoint;
                self.completedSuccess = false;
              }

              if (self.result.view === "_invalidParameterView") {
                self.completedError = true;
              }

              if (self.result.view === "_screenOutView") {
                self.point = self.result.screenOutPoint;
                self.cup = self.result.cupCount;
                self.surveyResult = self.screenOut;
              }

              if (self.result.view === "_overQuotaView") {
                self.surveyResult = self.overQuota;
              }

              if (self.result.view === "_okWithoutPointView") {
                self.surveyResult = self.completeWithoutPoint;
              }

              if (self.result.view === "_timeUpView") {
                self.surveyResult = self.timeUp;
                self.point = self.result.screenOutPoint;
                self.cup = self.result.cupCount;
              }
            }
          } else {
            self.error = response.data;
          }
        });
    },
    getResultType() {
      let self = this;
      let formData = {
        mid: self.mid,
        ca: self.ca,
      };
      this.$store
        .dispatch(GET_ITEMS, {
          url: "/linkTracker/callback",
          filters: formData,
          returnType: "stateless",
        })
        .then((response) => {
          if (response.status) {
            self.result = response.data;
            self.screenMember = self.result.hasOwnProperty("screenMember")
              ? response.data.screenMember
              : null;
            if (self.result.hasOwnProperty("view")) {
              if (self.result.view === "_completedView") {
                self.point = self.result.completePoint;
                self.cup = self.result.cupCount;
                self.surveyResult = self.complete;
              }

              if (self.result.view === "_noPointView") {
                self.surveyResult = self.noPoint;
                self.completedSuccess = false;
              }

              if (self.result.view === "_invalidParameterView") {
                self.completedError = true;
              }

              if (self.result.view === "_screenOutView") {
                self.point = self.result.screenOutPoint;
                self.cup = self.result.cupCount;
                self.surveyResult = self.screenOut;
              }

              if (self.result.view === "_overQuotaView") {
                self.surveyResult = self.overQuota;
              }

              if (self.result.view === "_okWithoutPointView") {
                self.surveyResult = self.completeWithoutPoint;
              }

              if (self.result.view === "_timeUpView") {
                self.surveyResult = self.timeUp;
                self.point = self.result.screenOutPoint;
                self.cup = self.result.cupCount;
              }
            } else {
              self.result = response.data;
            }
          } else {
            self.error = response.data;
          }
        });
    },
  },
  mounted() {
    window.insider_object = window.insider_object || {};
    window.insider_object.page = {
      type: "Confirmation"
    };
    external.head_script(
      "/js/main.js",
      "main-js",
      "paroller-js",
      "https://napolyon.api.useinsider.com/ins.js?id=10008745"
    );
    window.scrollTo(0, 0);
    feather.replace();
    /*
    let token = this.$route.query.token;
    if (token) {
      if (!this.authUser) {
        store.dispatch(_MODULE_NAME + '/' + GET_USER, {
          token: token
        });
      }
      window.localStorage.setItem('token', token)
    }
*/

    if (this.$route.query.hasOwnProperty("isMobile")) {
      this.isMobile = true;
      setTimeout(() => {
        location.href = "homepage_mobile";
      }, 5000);
    } else {
      setTimeout(() => {
        location.href = "/";
      }, 5000);
    }

    if (
      this.$route.name == "index.survey_result_2" &&
      this.$route.query.hasOwnProperty("mid") &&
      this.$route.query.hasOwnProperty("ca")
    ) {
      this.mid = this.$route.query.mid;
      this.ca = this.$route.query.ca;
      this.getResultType();
    }

    if (
      this.$route.name == "index.survey_result" &&
      this.$route.query.hasOwnProperty("mid")
    ) {
      this.mid = this.$route.query.mid;
      this.getResult();
    }
    if (this.$route.query.hasOwnProperty("sonuc")) {
      this.surveyResult = this.$route.query.sonuc;
    } else {
      this.completedSuccess = true;
    }
  },
  destroyed() {
    external.del_script("/js/main.js");
  },
};
</script>

<style scoped>
.primary-color {
  color: rgba(0, 201, 167, 0.9);
}
</style>
