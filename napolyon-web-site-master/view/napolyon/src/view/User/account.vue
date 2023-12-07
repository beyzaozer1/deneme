<template>
  <div class="col-lg-8 col-12">
    <div class="container-fluid px-0 box-shadow shadow rounded">
      <VueSlickCarousel
        v-if="campaigns && campaigns.length"
        ref="carousel"
        v-bind="settings"
      >
        <div
          v-for="(item, index) in campaigns"
          class="slider single-item"
          :key="index"
          @click="routeDirect()"
        >
          <div class="rounded-md">
            <img :src="item.campaignImage" alt="" class="img-fluid m-h-275" />
            <div class="mt-3 p-2">
              <h5 class="title">{{ item.campaignTitle }}</h5>
              <p class="description" v-html="item.campaignDescription"></p>
            </div>
          </div>
        </div>
      </VueSlickCarousel>
    </div>
    <br />
    <div v-if="userAccount" class="rounded shadow border-bottom p-4">
      <div class="row">
        <div class="col-12">
          <h5>{{ $t("account.personal_information") }}:</h5>
        </div>
        <div class="col-md-6">
          <div class="media align-items-center mt-3">
            <i class="fea icon-ex-md text-muted mr-3" data-feather="mail"></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">{{ $t("account.email") }} :</h6>
              <a class="text-muted">{{
                userAccount.email || "Tanımlı Değil"
              }}</a>
              <a
                class="text-muted"
                href="#"
                v-show="showChangeToPrimary"
                title="Birincil E-Posta olarak kullan"
              >
                <i class="fas fa-exchange-alt  ml-2 color-primary"></i>
              </a>
              <i
                v-show="!showChangeToPrimary"
                class="far fa-check-circle  ml-2 color-primary"
              ></i>
            </div>
          </div>
          <div class="media align-items-center mt-3">
            <i
              class="fea icon-ex-md text-muted mr-3"
              data-feather="bookmark"
            ></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">
                {{ $t("account.elternative_email") }} :
              </h6>
              <a
                class="text-muted"
                >{{ userAccount.alternateEmail || "Tanımlamak için tıklayın" }}
              </a>
              <a class="text-muted"
                v-show="showChangeToAlternate"
                title="Birincil E-Posta olarak kullan"
              >
                <i class="fas fa-exchange-alt ml-2 color-primary"></i>
              </a>
              <i
                v-show="
                  !showChangeToAlternate && userAccount.altEmailStatus == 'CNF'
                "
                class="far fa-check-circle  ml-2 color-primary"
              ></i>
            </div>
          </div>
          <div class="media align-items-center mt-3">
            <i class="fea icon-ex-md text-muted mr-3" data-feather="phone"></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">{{ $t("account.gsm_no") }} :</h6>
              <a
                class="text-muted"
              >
                {{
                  userAccount.gsmNumber == "9999999999" ||
                  !userAccount.gsmNumber
                    ? "Tanımlı Değil"
                    : userAccount.gsmNumber
                }}</a
              >
            </div>
          </div>
          <div class="media align-items-center mt-3">
            <i
              class="fea icon-ex-md text-muted mr-3"
              data-feather="facebook"
            ></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">{{ $t("account.facebook") }} :</h6>
              <a
                v-if="userAccount.facebookUserId"
                class="text-muted"
                >Bağlantılı</a
              >
              <a v-else class="text-muted"
                >Bağlantılı Değil</a
              >
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="media align-items-center mt-3">
            <i class="fea icon-ex-md text-muted mr-3" data-feather="user"></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">{{ $t("account.tc_no") }}:</h6>
              <a
                class="text-muted"
                >{{ userAccount.tcNo || "Tanımlamak için tıklayın" }}</a
              >
            </div>
          </div>
          <div class="media align-items-center mt-3">
            <i class="fea icon-ex-md text-muted mr-3" data-feather="gift"></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">{{ $t("account.birthday") }} :</h6>
              <a class="text-muted">{{
                birthday || "Tanımlı Değil"
              }}</a>
            </div>
          </div>
          <div class="media align-items-center mt-3">
            <i
              class="fea icon-ex-md text-muted mr-3"
              data-feather="map-pin"
            ></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">
                {{ $t("account.live_place") }} :
              </h6>
              <a class="text-muted">{{
                userAccount.homeCityName || "Tanımlamak için tıklayın"
              }}</a>
            </div>
          </div>
          <div class="media align-items-center mt-3">
            <i class="fea icon-ex-md text-muted mr-3" data-feather="edit-3"></i>
            <div class="media-body">
              <h6 class="text-primary mb-0">{{ $t("account.iban_no") }} :</h6>
              <a
                class="text-muted"
              >
                {{
                  userAccount.hasOwnProperty("memberIbanObject") &&
                  userAccount.memberIbanObject &&
                  userAccount.memberIbanObject != null
                      && userAccount.memberIbanObject.iban1
                    ? userAccount.memberIbanObject.iban1
                    : "Tanımlamak için tıklayın"
                }}
              </a>
            </div>
          </div>
        </div>
      </div>
      <!--end row-->
    </div>
    <br />
    <div v-if="userAccount" class="rounded shadow border-bottom p-4">
      <div class="row">
        <div class="col-sm-8 col-12">
          <h5>Davet Linkini Kullan</h5>
          <span>
            Sadece sana özel oluşturulan aşağıdaki davet linki ile tüm
            arkadaşlarını Napolyon.com’a davet ederek, davetinle gelen üyeler
            sayesinde NAP Puanlarını katlayabilirsin!
          </span>
        </div>
        <div class="col-4 images-for-abilities">
          <img
            :src="mediaBase + '/images/davet-s1.png'"
            class="d-inline img-w-60"
          />
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-4 images-for-abilities">
          <img
            :src="mediaBase + '/images/davet-s2.png'"
            class="d-inline img-w-60"
          />
        </div>
        <div class="col-sm-8 col-12">
          <h5>Dilediğin Platformda Paylaş</h5>
          <span>
            Davet linkini Facebook, Instagram, Twitter hesabından ya da
            dilediğin platformdan paylaşarak davetinle gelen üye sayısını
            artırabilirsin!
          </span>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-sm-8 col-12">
          <h5>NAP Puanlarını Katla</h5>
          <span>
            Hemen davet gönder, NAP puanlarını katla, biriktirdiğin puanları
            dilediğin gibi harca!
          </span>
        </div>
        <div class="col-4 images-for-abilities">
          <img
            :src="mediaBase + '/images/davet-s3.png'"
            class="d-inline img-w-60"
          />
        </div>
      </div>
      <div class="row mt-5">
        <div
          v-if="userAccount.canInvite"
          class="col-md-12 mt-4 pt-sm-0"
          id="invitation-link-id-redirect"
        >
          <div class="form-group">
            <img
              :src="mediaBase + '/images/invitation.png'"
              class="invitation-img mr-1 d-inline"
            />
            <input
              id="invitation-link"
              :value="invitationLink"
              class="form-control pl-2 pr-2 display-inline invitation-input"
              type="text"
            />
            <button
              class="btn btn-primary ml-1 d-inline"
              type="button"
              @click="copyToClipboard"
            >
              <small>Davet Linkini Kopyala</small>
            </button>
            <div id="link-copied" class="d-none text-center">
              Link kopyalandı!
            </div>
          </div>
        </div>
      </div>
      <!--end row-->
    </div>
  </div>
  <!--end col-->
</template>
<script>
import ScoreStatus from "@/view/components/ScoreStatus";
import store from "@/core/services";
import module, {
  ERROR,
  GET_USER,
  IS_AUTHENTICATED,
  MODULE_NAME,
  UPDATE_USER,
  USER,
} from "@/core/services/store/auth.module";
import moduleUser, {
  CAMPAIGNS,
  GET_CAMPAIGNS,
  MODULE_NAME as MODULE_NAME_USER,
} from "@/core/services/store/user.module";
import feather from "feather-icons";
import moment from "moment";
import Swal from "sweetalert2";
import { CREATE_ITEM } from "@/core/services/store/rest.module";

import VueSlickCarousel from "vue-slick-carousel";
import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "vue-slick-carousel/dist/vue-slick-carousel-theme.css";
import Loader from "@/view/components/LoaderFull";
import { SET_GENERAL_LOADING as SET_LOADING } from "@/core/services/store/rest.module";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "account",
  components: {
    Loader,
    ScoreStatus,
    VueSlickCarousel,
  },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_USER, moduleUser);
  },
  computed: {
    showChangeToPrimary() {
      return (
        this.userAccount.emailStatus == "CNF" &&
        this.userAccount.preferredEmail == "ALT"
      );
    },
    showChangeToAlternate() {
      return (
        this.userAccount.altEmailStatus == "CNF" &&
        this.userAccount.preferredEmail == "STD"
      );
    },
    invitationLink() {
      if (this.userAccount && this.userAccount.canInvite) {
        return (
          process.env.VUE_APP_APP_URL +
          "/#/uye-ol?invitationId=" +
          this.userAccount.memberId
        );
      }
      return null;
    },
    isAuthenticated: {
      get() {
        return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
      },
      set(value) {},
    },
    userAccount: {
      get() {
        return store.getters[_MODULE_NAME + "/" + USER];
      },
      set(value) {},
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
    campaigns() {
      return store.getters[_MODULE_NAME_USER + "/" + CAMPAIGNS];
    },
    birthday() {
      if (this.userAccount && this.userAccount.birthday) {

        let date = this.userAccount.birthday.split("-");
        let day = date[2].length != 2 ? "0" + date[2].toString() :  date[2];
        let month = date[1].length != 2 ? "0" + date[1].toString() :  date[1];
        let year = date[0];
        return moment(year.toString() + '-' + month.toString() + '-' +day.toString()).format("DD.MM.YYYY");
      }
      return "-";
    },
  },
  data() {
    return {
      settings: {
        dots: true,
        fade: true,
        edgeFriction: 0.35,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pauseOnFocus: true,
        pauseOnHover: true,
      },
    };
  },
  mounted() {
    feather.replace();
    this.getCampaings();
    let linkToDiv = this.$route.params.linkToDiv;
    if (linkToDiv) {
      setTimeout(() => {
        let ref = document.getElementById(linkToDiv);
        let top = ref.offsetTop;
        window.scrollTo(0, Number(top) + 100);
      }, 150);
    }
  },
  methods: {
    sendUpdateRequest(type) {
      let self = this;
      Swal.fire({
        title: "Uyarı!",
        text: "Alternatif E-posta adresinizi ana E-posta yapmak istediğinizden emin misiniz?",
        showCancelButton: true,
        confirmButtonText: "Tamam",
        confirmButtonColor: "#00b6a6",
        cancelButtonColor: "#f17425",
        cancelButtonText: "Vazgeç"}
        ).then(response => {
          if (response.isConfirmed) {
            let url = "/mobile/member/update?titleId=-1";
            if (type === "ALT") {
              self.userAccount.preferredEmail = "ALT";
              self.userAccount.selectedEmail = self.userAccount.alternateEmail;
            } else {
              self.userAccount.preferredEmail = "STD";
              self.userAccount.selectedEmail = self.userAccount.email;
            }

            this.$store.dispatch(_MODULE_NAME + "/" + UPDATE_USER, {
              url: url,
              contents: self.userAccount,
            });
            setTimeout(() => {
              this.getUser();
            }, 1000);
          }
      });
      return false;
    },
    routeDirect() {
      let self = this;
      self.$refs.carousel.pause();
      let itemIndex = $(document)
        .find(".slick-current")
        .data("index");
      let item = self.campaigns[itemIndex];
      self.$router.push({
        name: "user.campaign",
        params: { id: item.campaignId },
      });
    },
    getCampaings() {
      store.dispatch(_MODULE_NAME_USER + "/" + GET_CAMPAIGNS, {
        filters: {},
      });
    },
    getUser() {
      store.dispatch(_MODULE_NAME + "/" + GET_USER);
    },
    copyToClipboard() {
      let copyText = document.getElementById("invitation-link");
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand("copy");
      $("#link-copied")
        .removeClass("d-none")
        .fadeIn("500");
    },
    updateInformation(questionId) {
      let self = this;

      let questionText;
      let value = "";
      if (questionId == -1) {
        questionText = "<h5>IBAN Numaranızı giriniz</h5>";
        value = "Lütfen başında 'TR' olacak şekilde giriniz.";
      }

      if (questionId == -2) {
        questionText = "<h5>Alternatif E-Posta adresinizi giriniz</h5>";
      }

      if (questionId == 1) {
        questionText = "<h5>T.C. No giriniz</h5>";
      }
      Swal.fire({
        title: questionText,
        input: "text",
        inputLabel: value,
        showCancelButton: true,
        confirmButtonText: "Tamam",
        confirmButtonColor: "#00b6a6",
        cancelButtonColor: "#f17425",
        cancelButtonText: "Vazgeç",
        inputValidator: (value) => {
          if (!value) {
            return questionText;
          }
          if (questionId == -1) {
            if (value.length !== 26) {
              return `IBAN bilgilerinizi aralarında boşluk olmadan giriniz.`;
            } else if (
              !(
                value.substring(0, 2) === "Tr" ||
                value.substring(0, 2) === "TR" ||
                value.substring(0, 2) === "tR" ||
                value.substring(0, 2) === "tr"
              )
            ) {
              return "Başında TR olacak şekilde giriniz !";
            } else {
              for (let i = 2; i < value.length; i++) {
                if (!Number.isInteger(Number(value.substring(i, i + 1)))) {
                  return `${i + 1}. karakter rakam olmalı !`;
                }
              }
            }
            value = value.toUpperCase();
          }
          let contents = [
            {
              answer: value,
              answerType: 2,
              questionId: questionId,
            },
          ];

          store.commit(SET_LOADING, true);
          self.$store
            .dispatch(CREATE_ITEM, {
              url: "/mobile/memberInfoTaskEntry/singleResult",
              contents: contents,
              returnType: "stateless",
              isAuthenticated: self.isAuthenticated,
            })
            .then((response) => {
              if (response.status) {
                self.showSuccessNotification(
                  "Tebrikler !",
                  response.data.content
                );
                self.getUser();
              } else {
                let error;
                try {
                  error = response.data.response.data.content;
                } catch (e) {
                  error =
                    "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                }
                self.showErrorNotification(error);
              }
              store.commit(SET_LOADING, false);
            })
            .catch((err) => {
              self.showErrorNotification("Geçersiz bir e-posta adresi girdiniz.");
            });
        },
      });
      return false;
    },
    updateInformationTC() {
      let self = this;
      let questionId = 1;
      let questionText;
      questionText = "<h5>Bilgilerinizi giriniz</h5>";

      let memberName = self.userAccount.firstName;
      let memberLastName = self.userAccount.lastName;
      let memberBirthDay = self.userAccount.birthday.split("-")[2];
      let memberBirthMonth = self.userAccount.birthday.split("-")[1];
      let memberBirthYear = self.userAccount.birthday.split("-")[0];

      let daysHtml = "";
      this.days.forEach((item) => {
        if (item.value == memberBirthDay) {
          daysHtml +=
            "<option value=" +
            item.value +
            " selected>" +
            item.text +
            "</option>";
        } else {
          daysHtml +=
            "<option value=" + item.value + ">" + item.text + "</option>";
        }
      });
      let monthsHtml = "";
      this.months.forEach((item) => {
        if (item.value == memberBirthMonth) {
          monthsHtml +=
            "<option value=" +
            item.value +
            " selected>" +
            item.text +
            "</option>";
        } else {
          monthsHtml +=
            "<option value=" + item.value + ">" + item.text + "</option>";
        }
      });
      let yearsHtml = "";
      this.years.forEach((item) => {
        if (item.value == memberBirthYear) {
          yearsHtml +=
            "<option value=" +
            item.value +
            " selected>" +
            item.text +
            "</option>";
        } else {
          yearsHtml +=
            "<option value=" + item.value + ">" + item.text + "</option>";
        }
      });
      Swal.fire({
        title: questionText,
        html:
          '<div class="row"> ' +
          '<div class="col-md-12">\n' +
          '                            <div class="form-group">\n' +
          "                              <label>T.C. No</label>\n" +
          '                              <div class="position-relative">\n' +
          '                                <input type="text" id="tc-no" class="form-control" placeholder="T.C. No giriniz" name="name">\n' +
          "                              </div>\n" +
          "                            </div>\n" +
          "                          </div>\n" +
          '<div class="col-md-6">\n' +
          '                            <div class="form-group">\n' +
          "                              <label>Adınız</label>\n" +
          '                              <div class="position-relative">\n' +
          '                                <input type="text" id="tc-name" readonly value="' +
          memberName +
          '" class="form-control" placeholder="Adınız" name="name">\n' +
          "                              </div>\n" +
          "                            </div>\n" +
          "                          </div>\n" +
          '                          <div class="col-md-6">\n' +
          '                            <div class="form-group">\n' +
          "                              <label>Soyadınız</label>\n" +
          '                              <div class="position-relative">\n' +
          '                                <input type="text" id="tc-surname" readonly value="' +
          memberLastName +
          '" class="form-control" placeholder="Soyadınız" name="surname" required="">\n' +
          "                              </div>\n" +
          "                            </div>\n" +
          "                          </div>\n" +
          '                          <div class="col-md-4">\n' +
          '                            <div class="form-group">\n' +
          "                              <label>Doğum Günü</label>\n" +
          '                              <select class="form-control custom-select" disabled id="tc-day">\n' +
          '                                <option value="" selected>Seçiniz</option>\n' +
          daysHtml +
          "                              </select>\n" +
          "                            </div>\n" +
          "                          </div>\n" +
          '                          <div class="col-md-4">\n' +
          '                            <div class="form-group">\n' +
          "                              <label>Doğum Ayı</label>\n" +
          '                              <select class="form-control custom-select" id="tc-month" disabled>\n' +
          '                                <option value="" selected>Seçiniz</option>\n' +
          monthsHtml +
          "                              </select>\n" +
          "                            </div>\n" +
          "                          </div>\n" +
          '                          <div class="col-md-4">\n' +
          '                            <div class="form-group">\n' +
          "                              <label>Doğum Yılı</label>\n" +
          '                              <select class="form-control custom-select" id="tc-year" disabled>\n' +
          '                                <option value="" selected>Seçiniz</option>\n' +
          yearsHtml +
          "                              </select>\n" +
          "                            </div>\n" +
          "                          </div></div>" +
          "                          </div></div>",
        showCancelButton: true,
        confirmButtonText: "Tamam",
        confirmButtonColor: "#00b6a6",
        cancelButtonColor: "#f17425",
        cancelButtonText: "Vazgeç",
        preConfirm: () => {
          return [
            document.getElementById("tc-no").value,
            document.getElementById("tc-name").value,
            document.getElementById("tc-surname").value,
            document.getElementById("tc-day").value,
            document.getElementById("tc-month").value,
            document.getElementById("tc-year").value,
          ];
        },
      }).then((result) => {
        let error;
        if (result.isConfirmed) {
          let filtered = result.value.filter(function(el) {
            return el != "";
          });

          if (filtered.length !== 6) {
            error = "Lütfen tüm alanları doldudurunuz";
            self.showErrorNotification("", error);
            return false;
          }

          let values = result.value;
          let contents = [
            {
              questionId: questionId,
              answer: values[0],
              answerType: 2,
            },
          ];
          store.commit(SET_LOADING, true);

          self.$store
            .dispatch(CREATE_ITEM, {
              url: "/mobile/memberInfoTaskEntry/singleResult",
              contents: contents,
              returnType: "stateless",
              isAuthenticated: self.isAuthenticated,
            })
            .then((response) => {
              if (response.status) {
                self.showSuccessNotification();
                self.getUser();
              } else {
                let error;
                try {
                  error = response.data.response.data.content;
                } catch (e) {
                  error =
                    "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                }
                self.showErrorNotification("", error);
              }
              store.commit(SET_LOADING, false);
            });
        } else if (result.isConfirmed && result.value.length < 6) {
          error = "Lütfen tüm alanları doldudurunuz";
          self.showErrorNotification(error);
        }
      });
      return false;
    },
  },
};
</script>

<style scoped>
.invitation-img {
  height: 35px;
  width: 35px;
}

.invitation-input {
  width: 60%;
  display: inline;
}

.fb-btn-color {
  background-color: #4267b2 !important;
  border-color: #4267b2 !important;
  box-shadow: 0 3px 5px 0 rgb(118, 146, 215);
}

.m-h-275 {
  max-height: 275px !important;
}

.img-w-60 {
  width: 60%;
}
</style>
<style>
.slick-dots {
  bottom: 0 !important;
}

.slick-track {
  min-height: 365px !important;
}

.color-primary {
  color: rgba(0, 201, 167, 0.9);
}
@media (max-width: 575px) {
  .images-for-abilities {
    display: none;
  }
}
html {
  scroll-behavior: smooth !important;
}

.download-app {
  z-index: 1;
  margin-top: 11%;
  font-size: 20px;
  margin-bottom: -80px;

}

@media (max-width: 972px) {
  .download-app {
    margin-bottom: 0px !important;
  }
  
}
</style>
