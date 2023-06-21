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
              <h4 class="title">{{ $t("contactUs.contact_us") }}</h4>
              <div class="page-next">
                <nav aria-label="breadcrumb" class="d-inline-block">
                  <ul class="breadcrumb bg-white rounded shadow mb-0">
                    <li class="breadcrumb-item">
                      <a @click="$router.push({ name: 'user.index' })">{{
                        $t("index.home")
                      }}</a>
                    </li>
                    <li class="breadcrumb-item active" aria-current="page">
                      {{ $t("contactUs.contact_us") }}
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
          viewBox="0 0 2880 48"
          fill="none"
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
    <div class="questions-section">
      <div class="container">
        <div class="row text-center mb-20">
          <div class="col-lg-12">
            <div class="questions-text">
              <h2 class="questions-subtitle">{{ $t("contactUs.faqs") }}</h2>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-12 col-md-12">
            <ul
              class="nav nav-pills mb-3 justify-content-center questions-nav-pills"
              id="questions-pills-tab"
              role="tablist"
            >
              <li
                class="nav-item questions-nav-item"
                v-for="(item, index) in items"
                :key="index"
              >
                <a
                  v-if="item.faqCategoryID !== 7"
                  class="nav-link questions-nav-link"
                  @click="setActiveItemId(item.faqCategoryID)"
                  :class="{ active: index === 0 }"
                  :id="'tab-accordion-' + item.faqCategoryID"
                  data-toggle="pill"
                  :href="'#tab-category-' + item.faqCategoryID"
                  role="tab"
                  :aria-controls="'tab-accordion-' + item.faqCategoryID"
                  aria-selected="true"
                  >{{ item.faqCategoryName }}</a
                >
              </li>
            </ul>
            <div
              class="tab-content questions-tab-content"
              id="pills-tabContent"
              v-for="(item, index) in items"
              :key="index"
              v-if="item.faqCategoryID === activeItemId"
            >
              <div
                class="tab-pane fade questions-tab-pane"
                :class="{
                  show: activeItemId === item.faqCategoryID,
                  active: activeItemId === item.faqCategoryID,
                }"
                :id="'tab-category-' + item.faqCategoryID"
                role="tabpanel"
                :aria-labelledby="'tab-accordion-' + item.faqCategoryID"
              >
                <div class="questions-accordion" id="withdrawal-accordion">
                  <div
                    class="card questions-card"
                    v-for="(subItem, subIndex) in item.content"
                  >
                    <div
                      class="card-header questions-card-header"
                      :id="'withdrawal-heading' + subItem.faqID"
                    >
                      <h5 class="mb-0">
                        <button
                          class="btn btn-link questions-btn-link"
                          :class="{ collapsed: subIndex !== 0 }"
                          data-toggle="collapse"
                          :data-target="'#withdrawal-collapse' + subItem.faqID"
                          :aria-expanded="subIndex === 0 ? true : false"
                          aria-controls="tab-main-accordion"
                        >
                          {{ subItem.faqContent }}
                        </button>
                      </h5>
                    </div>
                    <div
                      :id="'withdrawal-collapse' + subItem.faqID"
                      class="collapse questions-show"
                      :class="{ show: subIndex === 0 }"
                      :aria-labelledby="'withdrawal-heading' + subItem.faqID"
                      data-parent="#withdrawal-accordion"
                    >
                      <div class="card-body questions-card-body">
                        <span v-html="subItem.faqAnswerHtmlContent"></span>
                        <div class="question-wizard">
                          <hr />
                          <h5>{{ $t("contactUs.did_this_help_you") }}</h5>
                          <div class="buttons">
                            <a
                              class="btn btn-sm btn-pills btn-soft-primary mr-2 question-yes"
                              @click.prevent="submitFeedback(subItem.faqID)"
                              ><i
                                data-feather="thumbs-up"
                                class="fea icon-sm"
                              ></i>
                              {{ $t("contactUs.yes") }}</a
                            >
                            <a
                              class="btn btn-sm btn-pills btn-soft-danger help-form"
                              @click.prevent="showContactForm(true)"
                              ><i
                                data-feather="thumbs-down"
                                class="fea icon-sm"
                              ></i>
                              {{ $t("contactUs.no") }}</a
                            >
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- questions section end -->

    <!-- Start Contact -->
    <section
      id="iletisim-formu"
      :style="{ display: contactFormStatus ? 'block' : 'none' }"
    >
      <div class="container">
        <div class="row">
          <div class="col-lg-12 col-md-12  mt-4 pt-2">
            <div class="card shadow rounded border-0">
              <div class="card-body py-5">
                <h4 class="card-title text-orange">
                  {{ $t("contactUs.contact_us") }}
                </h4>
                <div class="custom-form mt-4">
                  <p>{{ $t("contactUs.contact_us_form_description") }}</p>
                  <div
                    id="message"
                    class="col-xs-12 col-md-12 col-lg-6 offset-lg-3 text-center error-result-message"
                    v-if="contactUsError"
                  >
                    <div class="alert alert-danger text-center">
                      <span v-html="contactUsError"></span>
                    </div>
                  </div>
                  <div
                    id="message"
                    class="col-xs-12 col-md-12 col-lg-6 offset-lg-3 text-center error-result-message"
                    v-if="contactUsSuccess"
                  >
                    <div class="alert alert-success text-center">
                      İletiniz kaydedilmiştir. Size en kısa sürede geri dönüş
                      yapılacaktır.
                    </div>
                  </div>
                  <form action="#" name="contact-form" id="contact-form">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label
                            >{{ $t("contactUs.object") }}
                            <span class="text-danger">*</span></label
                          >
                          <select
                            class="form-control custom-select"
                            name="konu"
                            v-model="topic"
                          >
                            <option
                              :value="item.value"
                              v-for="(item, index) in categories"
                              :key="index"
                            >
                              {{ item.text }}
                            </option>
                          </select>
                          <div
                            v-if="submitStatus && !$v.topic.required"
                            class="error d-block"
                          >
                            Konuyu seçiniz
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label
                            >{{ $t("contactUs.name") }}
                            <span class="text-danger">*</span></label
                          >
                          <div class="position-relative">
                            <i
                              data-feather="user"
                              class="fea icon-sm icons"
                            ></i>
                            <input
                              name="name"
                              id="name"
                              v-model="firstName"
                              :disabled="!!user"
                              type="text"
                              class="form-control pl-5"
                              placeholder="Adınız"
                            />
                          </div>
                          <div
                            v-if="submitStatus && !$v.firstName.required"
                            class="error d-block"
                          >
                            Adınızı giriniz
                          </div>
                        </div>
                      </div>
                      <div class="col-md-4">
                        <div class="form-group">
                          <label>
                            {{ $t("contactUs.surname") }}
                            <span class="text-danger">*</span></label
                          >
                          <div class="position-relative">
                            <i
                              data-feather="user"
                              class="fea icon-sm icons"
                            ></i>
                            <input
                              name="lastname"
                              v-model="lastName"
                              :disabled="!!user"
                              id="lastname"
                              type="text"
                              class="form-control pl-5"
                              placeholder="Soyadınız"
                            />
                          </div>
                          <div
                            v-if="submitStatus && !$v.lastName.required"
                            class="error d-block"
                          >
                            Soyadınızı giriniz
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <label>
                            {{ $t("contactUs.email") }}
                            <span class="text-danger">*</span></label
                          >
                          <div class="position-relative">
                            <i
                              data-feather="mail"
                              class="fea icon-sm icons"
                            ></i>
                            <input
                              v-model="email"
                              id="email"
                              :disabled="!!user"
                              type="email"
                              class="form-control pl-5"
                              placeholder="E-Posta Adresiniz :"
                            />
                          </div>
                          <div
                            v-if="submitStatus && !$v.email.required"
                            class="error d-block"
                          >
                            Email adresinizi giriniz
                          </div>
                          <div
                            v-if="submitStatus && !$v.email.email"
                            class="error d-block"
                          >
                            Geçerli bir Email adresi giriniz
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-md-6">
                        <div class="form-group">
                          <label> {{ $t("contactUs.phone") }}</label>
                          <div class="position-relative">
                            <i
                              data-feather="phone"
                              class="fea icon-sm icons"
                            ></i>
                            <input
                              name="phone"
                              v-model="phone"
                              id="phone"
                              :disabled="!!user"
                              v-mask="'##########'"
                              type="text"
                              class="form-control pl-5"
                              placeholder="Telefon"
                            />
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-md-12">
                        <div class="form-group">
                          <label> {{ $t("contactUs.message") }}</label>
                          <div class="position-relative">
                            <i
                              data-feather="message-circle"
                              class="fea icon-sm icons"
                            ></i>
                            <textarea
                              name="comments"
                              v-model="message"
                              id="comments"
                              rows="4"
                              class="form-control pl-5"
                              placeholder="Mesajınız :"
                            ></textarea>
                          </div>
                          <div
                            v-if="submitStatus && !$v.message.required"
                            class="error d-block"
                          >
                            Lütfen mesajınızı giriniz
                          </div>
                          <div class="error" v-if="!$v.message.maxLength">
                            Mesajınız en fazla
                            {{ $v.message.$params.maxLength.max }} karakterden
                            oluşabilir.
                          </div>
                        </div>
                      </div>
                    </div>
                    <!--end row-->
                    <div
                      class="row d-flex justify-content-between flex-wrap px-3 py-1"
                    >
                      <div class="d-flex justify-content-center flex-wrap p-0">
                        <div class="p-1">
                          <button
                            :disabled="submitButtonStatus"
                            @click.prevent="triggerFileChooser"
                            class="btn btn-primary btn-block m-1"
                          >
                            {{ $t("contactUs.add_file") }}
                            <i
                              data-feather="upload"
                              class="fea icon-sm pull-right mt-1"
                            >
                            </i>
                          </button>
                          <input
                            accept="image/*, application/pdf"
                            type="file"
                            style="display: none"
                            id="file-chooser"
                            @change="fileSelected"
                          />
                          <span class="d-block" v-if="filename">{{
                            filename
                          }}</span>
                        </div>

                        <div class=" text-nowrap p-1">
                          <button
                            :disabled="submitButtonStatus"
                            class="btn btn-warning  text-nowrap m-1"
                            @click.prevent="submit"
                          >
                            {{ $t("contactUs.send") }}
                            <span>
                              <i
                                data-feather="send"
                                class="fea icon-sm pull-right mt-1"
                              >
                              </i
                            ></span>
                          </button>
                        </div>
                      </div>
                      <div class="text-nowrap">
                        <div
                          class="textarea-count-box p-3 text-center text-nowrap align-items-center"
                        >
                          500
                        </div>
                      </div>
                    </div>
                    <!--end row-->
                  </form>
                  <!--end form-->
                </div>
                <!--end custom-form-->
              </div>
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
      <div class="container mt-100 mt-60">
        <div class="row"></div>
        <!--end col-->
      </div>
    </section>
    <!--end row-->
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
  GET_FAQS as GET_ITEMS,
  MODULE_NAME,
  FAQS as ITEMS,
  ERROR,
  CREATE_CONTACT_US,
  GET_FAQS_SUBJECTS,
  FAQS_SUBJECTS,
} from "@/core/services/store/content.module";
import * as external from "@/core/mixin/external";
import { maxLength, required, email } from "vuelidate/lib/validators";
import { CREATE_ITEM as FILE_UPLOAD } from "@/core/services/store/rest.module";
import moduleAuth, {
  IS_AUTHENTICATED,
  MODULE_NAME as MODULE_NAME_AUTH,
  USER,
} from "@/core/services/store/auth.module";
import ApiService from "@/core/services/api.service";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_AUTH = MODULE_NAME_AUTH;

export default {
  name: "contentUs",
  components: {
    "t-footer": Footer,
    "t-up-footer": upFooter,
    "t-header": Header,
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    topic: {
      required,
    },
    email: {
      required,
      email,
    },
    message: {
      required,
      maxLength: maxLength(500),
    },
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
      url: "mobile/fAQCategory",
      subjectUrl: "mobile/contactUs/subjects",
      createContactUsUrl: "mobile/contactUs",
      activeItemId: null,
      contactUsSuccess: null,
      contactUsError: null,
      contactFormStatus: false,
      submitStatus: false,
      firstName: null,
      lastName: null,
      topic: null,
      email: null,
      message: null,
      phone: "",
      file: null,
      attachmentFile: null,
      filename: null,
    };
  },
  computed: {
    user: {
      get() {
        return store.getters[_MODULE_NAME_AUTH + "/" + USER];
      },
      set(value) {},
    },
    items() {
      let items = store.getters[_MODULE_NAME + "/" + ITEMS];
      if (items) {
        this.activeItemId = items.length ? items[0].faqCategoryID : 0;
      }
      return items;
    },
    categories() {
      let results = [{ text: "Seçiniz", value: null }];
      let items = store.getters[_MODULE_NAME + "/" + FAQS_SUBJECTS];
      if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          if (item && item.hasOwnProperty("contactUsSubjectId")) {
            results.push({
              text: item.subjectText,
              value: item.contactUsSubjectId,
            });
          }
        }
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
  mounted() {
    window.insider_object = window.insider_object || {};
    window.insider_object.page = {
      type: "Confirmation"
    };
  },
  methods: {
    triggerFileChooser(itemId) {
      document.getElementById("file-chooser").click();
    },
    submit() {
      let self = this;
      if (self.topic != 16 && !self.user) {
        self.contactUsError =
          "Talebinizi iletmek için Giriş yapmanız gerekmektedir.";

        let element = document.getElementById("iletisim-formu");
        let top = element.offsetTop;
        window.scrollTo(0, Number(top - 100));

        return false;
      }
      self.contactUsError = false;
      self.contactUsSuccess = false;

      let value = self.phone;

      if (value && !Number.isInteger(Number(value))) {
        self.contactUsError =
          "Lütfen rakamlardan oluşan telefon numaranızı giriniz";
        return;
      }
      if (value && String(value).length !== 10) {
        self.contactUsError =
          "Lütfen Telefon numaranızı başında 0 olmadan 10 haneli olarak giriniz";
        return;
      }
      self.submitButtonStatus = true;

      if (self.file) {
        self.uploadFile().then((response) => {
          if (response.status) {
            self.attachmentFile = response.data;
            self.sendRequest();
          } else {
            let element = document.getElementById("iletisim-formu");
            let top = element.offsetTop;
            window.scrollTo(0, Number(top - 100));

            self.contactUsError = true;
            try {
              self.contactUsError = response.data.response.data;
            } catch (e) {
              self.contactUsError =
                "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
            }
          }
        });
      } else {
        self.sendRequest();
      }
    },
    uploadFile() {
      let self = this;
      let fileChooser = document.getElementById("file-chooser");
      let formData = new FormData();
      formData.append("file", fileChooser.files[0]);
      return this.$store.dispatch(FILE_UPLOAD, {
        url: "files?unique=1",
        contents: formData,
        returnType: "stateless",
        acceptPromise: true,
        isAuthenticated: self.isAuthenticated,
      });
    },
    sendRequest() {
      let self = this;
      self.submitStatus = true;

      if (!this.$v.$invalid) {
        let formData = {
          email: self.email,
          phone: self.phone,
          firstName: self.firstName,
          lastName: self.lastName,
          attachment: self.attachmentFile,
          contactUsSubjectId: self.topic,
          message: self.message,
        };

        let url = this.createContactUsUrl;
        if (self.attachmentFile) {
          url = this.createContactUsUrl + "?image=" + self.attachmentFile;
        }

        this.$store
          .dispatch(_MODULE_NAME + "/" + CREATE_CONTACT_US, {
            url: url,
            contents: formData,
            isAuthenticated: self.isAuthenticated,
          })
          .then(() => {
            self.contactUsSuccess = true;
          })
          .catch((response) => {
            self.submitButtonStatus = false;
            try {
              self.contactUsError = response.data.response.data;
            } catch (e) {
              self.contactUsError =
                "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
            }
          });
      } else {
        self.submitButtonStatus = false;
      }
    },
    fileSelected(file) {
      let fileChooser = document.getElementById("file-chooser");
      this.filename =
        fileChooser && fileChooser.files[0] && fileChooser.files[0].name
          ? fileChooser.files[0].name
          : null;

      this.file = true;
    },
    submitFeedback(itemId) {
      window.alert("Geri bildirim için teşekkürler.");
    },
    showContactForm(status) {
      this.contactFormStatus = status;
      setTimeout(function() {
        let element = document.getElementById("iletisim-formu");
        let top = element.offsetTop;
        window.scrollTo(0, Number(top) - 100);
      }, 500);
    },
    setActiveItemId(itemId) {
      this.activeItemId = itemId;
    },
    getItems() {
      this.$store.dispatch(_MODULE_NAME + "/" + GET_ITEMS, {
        url: this.url,
        filters: {
          all: true,
        },
      });
    },
    getSubjects() {
      this.$store.dispatch(_MODULE_NAME + "/" + GET_FAQS_SUBJECTS, {
        url: this.subjectUrl,
        filters: {
          all: true,
        },
      });
    },
  },
  mounted() {
    this.getItems();
    this.getSubjects();
    external.head_script("/js/main.js", "main-js", "paroller-js");
    external.head_script("/js/contact.js", "contact-js", "scrollspy-js");
    window.scrollTo(0, 0);
    feather.replace();

    if (this.$route.query.hasOwnProperty("selected")) {
      this.topic = this.$route.query.selected;

      this.showContactForm(true);
    }

    if (this.$route.query.hasOwnProperty("form")) {
      this.showContactForm(true);
    }

    if (!this.user) {
      this.topic = 16;
    }
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
    external.del_script("/js/contact.js");
    external.del_script("/js/main.js");
  },
};
</script>

<style scoped>
@media (max-width: 450px) {
  .textarea-count-box {
    display: none;
  }
}
</style>
