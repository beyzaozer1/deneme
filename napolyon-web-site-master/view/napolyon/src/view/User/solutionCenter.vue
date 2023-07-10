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
              <h4 class="title">{{ $t("solutionCenter.self") }}</h4>
              <div class="page-next">
                <nav aria-label="breadcrumb" class="d-inline-block">
                  <ul class="breadcrumb bg-white rounded shadow mb-0">
                    <li class="breadcrumb-item">
                      <a @click="$router.push({ name: 'user.index' })">{{
                        $t("index.home")
                      }}</a>
                    </li>
                    <li aria-current="page" class="breadcrumb-item active">
                      {{ $t("solutionCenter.self") }}
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
    <div class="questions-section">
      <div class="container">
        <div class="row text-center mb-20">
          <div class="col-lg-12">
            <div class="questions-text">
              <transition name="fade">
                <p v-if="activated">
                  <template>
                    <h2 class="questions-subtitle">
                      {{ $t("solutionCenter.help_text") }}
                    </h2>
                  </template>
                </p>
              </transition>
            </div>
          </div>
        </div>

        <div class="row text-center mb-20">
          <div class="col-lg-12">
            <div class="questions-text">
              <transition name="fade">
                <p v-if="activated">
                  <template>
                    <input
                      v-model="search"
                      class="form-control form-control-lg"
                      placeholder="Konuyu yazınız.."
                      type="text"
                    />
                  </template>
                </p>
              </transition>
            </div>
          </div>
        </div>
        <div class="row justify-content-center">
          <div class="col-lg-12 col-md-12">
            <ul
              id="questions-pills-tab"
              class="nav nav-pills mb-3 justify-content-center questions-nav-pills"
              role="tablist"
            >
              <li
                v-for="(item, index) in parentItems"
                :key="index"
                class="nav-item questions-nav-item mt-3"
              >
                <transition v-if="item.solutionCenterId !== 10" name="bounce">
                  <p v-show="item.show && !search">
                    <a
                      :class="{
                        active: item.solutionCenterId === activeItemId,
                      }"
                      class="nav-link questions-nav-link cursor-pointer mr-3 p-2 mb-n4"
                      href="#"
                      @click.prevent="setActiveItemId(item.solutionCenterId)"
                      >{{ item.title }}</a
                    >
                  </p>
                </transition>
              </li>
            </ul>
            <transition-group name="list-complete" tag="p">
              <div
                v-for="(item, index) in childItems"
                :key="index"
                class="tab-content questions-tab-content list-complete-item d-block"
              >
                <div
                  v-if="item.show"
                  class="show active tab-pane fade questions-tab-pane"
                  role="tabpanel"
                >
                  <div id="withdrawal-accordion" class="questions-accordion">
                    <div class="card questions-card">
                      <div class="card-header questions-card-header">
                        <h5 class="mb-0">
                          <span
                            class="btn btn-link collapsed"
                            @click="showDetails(item)"
                          >
                            <h4>{{ item.title }}</h4>
                          </span>
                        </h5>
                      </div>
                      <div class="questions-show d-none">
                        <div class="card-body questions-card-body">
                          <span v-html="item.content"></span>
                          <div class="question-wizard">
                            <hr />
                            <h5>{{ item.question.title }}</h5>
                            <div class="buttons d-flex justify-content-center">
                              <vue-reaction-emoji
                                v-for="(subItem, subIndex) in item.question
                                  .options"
                                :is-active="isActive"
                                :is-disabled="isDisabled"
                                :reaction="reactions[subIndex]"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </transition-group>

            <transition name="bounce">
              <p v-if="detailItem && showDetail">
                <template>
                  <div class="tab-content questions-tab-content">
                    <div
                      class="show active tab-pane fade questions-tab-pane"
                      role="tabpanel"
                    >
                      <div class="questions-accordion">
                        <div class="card questions-card">
                          <div class="card-header questions-card-header">
                            <h5 class="mb-0">
                              <span class="btn btn-link collapsed">
                                <h4>{{ detailItem.title }}</h4>
                              </span>
                            </h5>
                          </div>
                          <div class="questions-show">
                            <div class="card-body questions-card-body">
                              <span v-html="detailItem.content"></span>
                              <div class="question-wizard">
                                <hr />
                                <h5>{{ detailItem.question.title }}</h5>
                                <div
                                  class="buttons d-flex justify-content-center useful-actions"
                                >
                                  <template
                                    v-for="(subItem, subIndex) in detailItem
                                      .question.options"
                                  >
                                    <span
                                      v-if="subItem.isUseful === 1"
                                      class="btn btn-link collapsed h5"
                                      @click="reactionClicked(subItem)"
                                    >
                                      Evet
                                    </span>
                                    <span
                                      v-if="subItem.isUseful === 0"
                                      class="btn btn-link collapsed h5"
                                      @click="reactionClicked(subItem)"
                                    >
                                      Hayır
                                    </span>
                                  </template>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </p>
            </transition>
          </div>
        </div>
      </div>
    </div>
    <!-- questions section end -->

    <!-- Start Contact -->
    <section
      v-if="detailItem"
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
                    v-if="contactUsError"
                    class="col-xs-12 col-md-12 col-lg-6 offset-lg-3 text-center error-result-message"
                  >
                    <div class="alert alert-danger text-center">
                      <span v-html="contactUsError"></span>
                    </div>
                  </div>
                  <div
                    v-if="contactUsSuccess"
                    class="col-xs-12 col-md-12 col-lg-6 offset-lg-3 text-center error-result-message"
                  >
                    <div class="alert alert-success text-center">
                      {{ contactUsMessage }}
                    </div>
                  </div>
                  <form id="contact-form" action="#" name="contact-form">
                    <div class="row">
                      <div class="col-md-4">
                        <div class="form-group">
                          <label
                            >{{ $t("contactUs.object") }}
                            <span class="text-danger">*</span></label
                          >
                          <select
                            v-model="topic"
                            class="form-control custom-select"
                            name="konu"
                          >
                            <option
                              v-for="(item, index) in categories"
                              :key="index"
                              :value="item.value"
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
                              class="fea icon-sm icons"
                              data-feather="user"
                            ></i>
                            <input
                              id="name"
                              v-model="firstName"
                              :disabled="!!user"
                              class="form-control pl-5"
                              name="name"
                              placeholder="Adınız"
                              type="text"
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
                              class="fea icon-sm icons"
                              data-feather="user"
                            ></i>
                            <input
                              id="lastname"
                              v-model="lastName"
                              :disabled="!!user"
                              class="form-control pl-5"
                              name="lastname"
                              placeholder="Soyadınız"
                              type="text"
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
                              class="fea icon-sm icons"
                              data-feather="mail"
                            ></i>
                            <input
                              id="email"
                              v-model="email"
                              :disabled="!!user"
                              class="form-control pl-5"
                              placeholder="E-Posta Adresiniz :"
                              type="email"
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
                              class="fea icon-sm icons"
                              data-feather="phone"
                            ></i>
                            <input
                              id="phone"
                              v-model="phone"
                              v-mask="'##########'"
                              :disabled="!!user"
                              class="form-control pl-5"
                              name="phone"
                              placeholder="Telefon"
                              type="text"
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
                              class="fea icon-sm icons"
                              data-feather="message-circle"
                            ></i>
                            <textarea
                              id="comments"
                              v-model="message"
                              class="form-control pl-5"
                              name="comments"
                              placeholder="Mesajınız :"
                              rows="4"
                            ></textarea>
                          </div>
                          <div
                            v-if="submitStatus && !$v.message.required"
                            class="error d-block"
                          >
                            Lütfen mesajınızı giriniz
                          </div>
                          <div v-if="!$v.message.maxLength" class="error">
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
                            class="btn btn-primary btn-block m-1"
                            @click.prevent="triggerFileChooser"
                          >
                            {{ $t("contactUs.add_file") }}
                            <i
                              class="fea icon-sm pull-right mt-1"
                              data-feather="upload"
                            >
                            </i>
                          </button>
                          <input
                            id="file-chooser"
                            accept="image/*, application/pdf"
                            style="display: none"
                            type="file"
                            @change="fileSelected"
                          />
                          <span v-if="filename" class="d-block">{{
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
                                class="fea icon-sm pull-right mt-1"
                                data-feather="send"
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
import moduleSolutionCenter, {
  CATEGORIES,
  ERROR,
  GET_CATEGORIES,
  GET_ITEMS as GET_CATEGORY_ITEMS,
  HIT_ITEM,
  HIT_URL,
  ITEMS as CATEGORY_ITEMS,
  LOADING,
  MODULE_NAME as MODULE_NAME_SOLUTION,
} from "@/core/services/store/solutionCenter.module";
import * as external from "@/core/mixin/external";

import module, {
  CREATE_CONTACT_US,
  FAQS_SUBJECTS,
  GET_FAQS as GET_ITEMS,
  GET_FAQS_SUBJECTS,
  MODULE_NAME,
} from "@/core/services/store/content.module";

import { email, maxLength, required } from "vuelidate/lib/validators";
import { CREATE_ITEM as FILE_UPLOAD } from "@/core/services/store/rest.module";
import moduleAuth, {
  IS_AUTHENTICATED,
  MODULE_NAME as MODULE_NAME_AUTH,
  USER,
} from "@/core/services/store/auth.module";
import ApiService from "@/core/services/api.service";
import { VueReactionEmoji } from "vue-feedback-reaction";
import Swal from "sweetalert2";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_SOLUTION = MODULE_NAME_SOLUTION;
const _MODULE_NAME_AUTH = MODULE_NAME_AUTH;

export default {
  name: "solutionCenter",
  components: {
    "t-footer": Footer,
    "t-up-footer": upFooter,
    "t-header": Header,
    VueReactionEmoji,
    Loader,
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

    registerStoreModule(_MODULE_NAME_SOLUTION, moduleSolutionCenter);
    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_AUTH, moduleAuth);
  },
  data() {
    return {
      awaitingSearch: false,
      search: "",
      contactUsMessage: "",
      showDetail: null,
      detailItem: null,
      reactions: ["excellent", "disappointed"],
      isActive: false,
      isDisabled: false,
      show: 1,
      panel: 1,
      submitButtonStatus: false,
      url: "mobile/fAQCategory",
      solutionUrl: "mobile/solutionCenter",
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
      activated: false,
    };
  },
  computed: {
    loading() {
      return store.getters[_MODULE_NAME_SOLUTION + "/" + LOADING];
    },
    user: {
      get() {
        return store.getters[_MODULE_NAME_AUTH + "/" + USER];
      },
      set(value) {},
    },
    parentItems: {
      get() {
        let items = store.getters[_MODULE_NAME_SOLUTION + "/" + CATEGORIES];
        if (!items) {
          return [];
        }

        items.map((item) => {
          item.show = false;
        });

        return items;
      },
      set(value) {},
    },
    childItems: {
      get() {
        let items = store.getters[_MODULE_NAME_SOLUTION + "/" + CATEGORY_ITEMS];
        if (!items || this.detailItem) {
          return [];
        }

        let item = _.first(items);
        if (item && item.hasOwnProperty("childs") && item.childs) {
          item.childs.map((child) => {
            if (
              typeof child.question === "string" ||
              child.question instanceof String
            )
              child.question = child.question ? JSON.parse(child.question) : [];
          });

          return item.childs;
        }

        if (this.search) {
          items.map((child) => {
            if (
              typeof child.question === "string" ||
              child.question instanceof String
            )
              child.question = child.question ? JSON.parse(child.question) : [];
          });

          return items;
        }
        return [];
      },
      set(value) {},
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
  methods: {
    reactionClicked(item) {
      if (item.isUseful) {
        Swal.fire({
          title: "Teşekkürler!",
          text: item.text,
          icon: "success",
          confirmButtonText: "Kapat",
        });

        this.showDetail = null;
        this.detailItem = null;
        this.activeItemId = null;
      } else {
        this.contactUsMessage = item.text;
        this.message = this.detailItem.title;
        this.showContactForm(true);
      }
    },
    showDetails(item) {
      this.detailItem = item;
      this.sendSolutionCenterHit();
      setTimeout(() => {
        this.showDetail = true;
      });
    },
    triggerFileChooser(itemId) {
      document.getElementById("file-chooser").click();
    },
    submit() {
      let self = this;
      if (+self.topic !== 16 && !self.user) {
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
    sendSolutionCenterHit() {
      let self = this;
      self.submitStatus = true;
      let formData = {
        solutionCenterId: this.detailItem.solutionCenterId,
      };

      if (this.user) {
        formData.memberId = this.user.memberId;
      }

      this.$store.dispatch(_MODULE_NAME_SOLUTION + "/" + HIT_ITEM, {
        url: HIT_URL,
        contents: formData,
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
      this.showDetail = null;
      this.detailItem = null;
      this.activeItemId = itemId;
      this.getCategoryItems();
    },
    getItems() {
      this.$store.dispatch(_MODULE_NAME + "/" + GET_ITEMS, {
        url: this.url,
        filters: {
          all: true,
        },
      });
    },
    getParentCategories() {
      this.$store.dispatch(_MODULE_NAME_SOLUTION + "/" + GET_CATEGORIES, {
        url: this.solutionUrl,
        filters: {
          id: 0,
        },
      });
    },
    getCategoryItems() {
      let filter = {
        id: this.activeItemId,
        like: this.search,
      };
      this.$store.dispatch(_MODULE_NAME_SOLUTION + "/" + GET_CATEGORY_ITEMS, {
        url: this.solutionUrl,
        filters: filter,
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
    this.getParentCategories();
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

    setTimeout(() => {
      this.activated = true;
    }, 500);
  },
  watch: {
    search: function(val) {
      if (!this.awaitingSearch) {
        setTimeout(() => {
          this.getCategoryItems();
          this.awaitingSearch = false;
        }, 1000);
      }
      this.awaitingSearch = true;
    },
    parentItems(value) {
      if (value && value.length) {
        let self = this;
        value.forEach((item, index) => {
          setTimeout(() => {
            self.parentItems[index].show = true;
            self.$forceUpdate();
          }, index * 200);
        });
      }
    },
    childItems(value) {
      if (value && value.length) {
        let self = this;
        value.forEach((item, index) => {
          setTimeout(() => {
            self.childItems[index].show = true;
            self.$forceUpdate();
          }, index * 200);
        });
      }
    },
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
.h5 {
  font-size: 20px !important;
}

.useful-actions .btn-link:hover {
  text-decoration: none !important;
}

@media (max-width: 450px) {
  .textarea-count-box {
    display: none;
  }
}

.questions-section .questions-text .questions-subtitle {
  text-transform: none !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
 {
  opacity: 0;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

.list-complete-item {
  transition: all 1s;
  display: inline-block;
  margin-right: 10px;
}

.list-complete-enter, .list-complete-leave-to
  /* .list-complete-leave-active below version 2.1.8 */
 {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>
<style lang="sass" scoped>
.fade-enter-active,
.fade-leave-active
  transition: opacity .5s

.fade-enter,
.fade-leave-to
  opacity: 0
</style>

<style>
.vue-reaction {
  margin-right: 10px !important;
  margin-left: 10px !important;
}
</style>
