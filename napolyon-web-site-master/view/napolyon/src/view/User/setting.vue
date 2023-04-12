<template>
  <div class="col-lg-8 col-12">
    <template v-if="showAvatars">
      <div class="rounded shadow border-bottom p-4">
        <div class="row">
          <div
              v-for="(item, index) in avatars"
              :key="index"
              class="col-lg-4 col-md-4 col-12 d-flex justify-content-center align-items-center pr-5 pl-5 pb-3"
          >
            <img
                :src="mediaBase + '/images/avatars/' + item"
                class="avatar avatar-medium shadow-lg rounded-pill"
                style="cursor: pointer"
                @click.prevent="changeProfileImage(item)"
            />
          </div>
          <button
              class="btn btn-info btn-block btn-xs"
              type="button"
              @click="showAvatars = !showAvatars"
          >
            Vazgeç
          </button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="card border-0 rounded shadow">
        <div class="card-body">
          <h5 class="text-md-left text-center">
            {{ $t("setting.profile_information") }} :
          </h5>
          <div class="mt-3 text-md-left text-center d-sm-flex">
            <img
                :src="
                userSetting && userSetting.avatar
                  ? mediaBase + '/images/avatars/' + userSetting.avatar
                  : mediaBase + '/images/avatars/Avatar0.png'
              "
                alt=""
                class="avatar float-md-left avatar-medium rounded-circle shadow mr-md-4"
            />
            <div class="mt-md-4 mt-3 mt-sm-0">
              <a
                  class="btn btn-primary mt-2"
                  href="javascript:void(0)"
                  @click="showAvatars = !showAvatars"
              >{{ $t("setting.update") }}</a
              >
              <a
                  class="btn btn-outline-primary mt-2 ml-2"
                  href="javascript:void(0)"
                  @click="changeProfileImage(avatars[0])"
              >{{ $t("setting.delete") }}</a
              >
            </div>
          </div>
          <nav class="mt-5 pt-2">
            <div id="nav-tab" class="nav nav-tabs" role="tablist">
              <a
                  id="nav-email-tab"
                  aria-controls="nav-email"
                  aria-selected="true"
                  class="nav-item nav-link active"
                  data-toggle="tab"
                  href="#nav-email"
                  role="tab"
              >Kullanıcı</a
              >
              <a
                  id="nav-password-tab"
                  aria-controls="nav-password"
                  aria-selected="false"
                  class="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-password"
                  role="tab"
              >Şifre</a
              >
              <a
                  id="nav-GSM-tab"
                  aria-controls="nav-GSM"
                  aria-selected="false"
                  class="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-GSM"
                  role="tab"
              >GSM</a
              >
              <a v-if="false"
                  id="nav-facebook-tab"
                  aria-controls="nav-facebook"
                  aria-selected="false"
                  class="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-facebook"
                  role="tab"
              >Facebook</a
              >
              <a
                  id="nav-permissions-tab"
                  aria-controls="nav-permissions"
                  aria-selected="false"
                  class="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-permissions"
                  role="tab"
              >İzinler</a
              >
              <a
                  id="nav-tc-confirmation-tab"
                  aria-controls="nav-tc-confirmation"
                  aria-selected="false"
                  class="nav-item nav-link"
                  data-toggle="tab"
                  href="#nav-tc-confirmation"
                  role="tab"
              >T.C. Onay</a
              >
            </div>
          </nav>
          <div id="nav-tabContent" class="tab-content mb-n4">
            <div
                id="nav-email"
                aria-labelledby="nav-email-tab"
                class="tab-pane fade show active"
                role="tabpanel"
            >
              <form>
                <div class="row mt-4 pt-2">
                  <div v-if="section_1_status && success" class="col-12">
                    <div class="alert alert-success text-center">
                      <span>Bilgileriniz güncellendi</span>
                    </div>
                  </div>

                  <div v-if="section_1_status && error" class="col-12">
                    <div class="alert alert-danger text-center">
                      <span
                      >İşlem yapılırken hata oluştur. Tekrardan
                        deneyiniz</span
                      >
                    </div>
                  </div>

                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="firstName">{{ $t("setting.name") }}</label>
                      <div class="position-relative">
                        <i class="fea icon-sm icons" data-feather="user"></i>
                        <input
                            id="firstName"
                            v-model="userSetting.firstName"
                            class="form-control pl-5"
                            disabled
                            placeholder="Adınız :"
                            type="text"
                        />
                      </div>
                      <div
                          v-if="section_1_status && !$v.user.firstName"
                          class="error d-block"
                      >
                        Adınızı giriniz
                      </div>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-md-12">
                    <div class="form-group">
                      <label for="lastName"> {{ $t("setting.surname") }}</label>
                      <div class="position-relative">
                        <i
                            class="fea icon-sm icons"
                            data-feather="user-check"
                        ></i>
                        <input
                            id="lastName"
                            v-model="userSetting.lastName"
                            class="form-control pl-5"
                            disabled
                            placeholder="Soyadınız :"
                            type="text"
                        />
                      </div>
                      <div
                          v-if="section_1_status && !$v.user.lastName"
                          class="error d-block"
                      >
                        Soyadınızı giriniz
                      </div>
                    </div>
                  </div>
                  <!--end col-->
                  <div class="col-md-12">
                    <div class="form-group">
                      <label>{{ $t("setting.email") }}</label>
                      <div class="position-relative">
                        <i class="fea icon-sm icons" data-feather="mail"></i>
                        <input
                            id="email"
                            v-model="userSetting.email"
                            class="form-control pl-5"
                            disabled
                            placeholder="E-Postanız :"
                            type="email"
                        />
                      </div>
                      <div
                          v-if="section_1_status && !$v.user.email"
                          class="error d-block"
                      >
                        E-Postanızı giriniz
                      </div>
                    </div>
                  </div>
                  <!--end col-->

                  <!--end col-->
                </div>
                <!--end row-->

                <!--end row-->
              </form>
            </div>

            <!--end form-->
            <div
                id="nav-GSM"
                aria-labelledby="nav-GSM-tab"
                class="tab-pane fade"
                role="tabpanel"
            >
              <div class="row">
                <div v-if="section_2_status" class="col-12 mt-4">
                  <div class="alert alert-success text-center">
                    <span>Bilgileriniz güncellendi</span>
                  </div>
                </div>

                <div class="col-12 mt-4 pt-2">
                  <form>
                    <p>
                      Telefon numaranızı 10 haneli olacak şekilde giriniz
                    </p>
                    <p>
                      Örnek: 5324444444
                    </p>

                    <div class="row mt-4 pt-2">
                      <div class="col-12">
                        <div class="form-group">
                          <label> {{ $t("setting.phone_no") }}:</label>
                          <div class="position-relative">
                            <i
                                class="fea icon-sm icons"
                                data-feather="phone"
                            ></i>
                            <input
                                id="number"
                                v-model="gsmNumber"
                                class="form-control pl-5"
                                placeholder="Telefon :"
                                type="number"
                            />
                          </div>
                        </div>
                      </div>
                      <!--end col-->

                      <!--end col-->
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                          class="btn btn-primary btn-block"
                          type="button"
                          @click="updateGsm"
                      >
                        {{
                          userSetting.gsmNumber !== null
                              ? $t("setting.update")
                              : $t("setting.save")
                        }}
                      </button>
                    </div>
                    <!--end row-->
                  </form>
                </div>
              </div>
            </div>
            <div
                v-if="false"
                id="nav-facebook"
                aria-labelledby="nav-facebook-tab"
                class="tab-pane fade"
                role="tabpanel"
            >
              <div class="row">
                <div class="col-12 mt-4 pt-2 text-center">
                  <img
                      alt="facebook"
                      class="img-fluid"
                      src="/images/fb-ile-baglan.jpg"
                  />
                  <button
                      v-if="userSetting.facebookUserId"
                      class="btn text-white"
                      style="background: #325a97; width:100%;"
                  >
                    <span><i class="fab fa-facebook-square"></i></span
                    >Bağlantılı
                  </button>
                  <button
                      v-else
                      class="btn text-white"
                      style="background: #325a97; width:100%;"
                  >
                    <span><i class="fab fa-facebook-square"></i></span>
                    Facebook eşleştirmenizi oluşturmak için tıklayınız.
                  </button>
                </div>
              </div>
            </div>
            <div
                id="nav-tc-confirmation"
                aria-labelledby="nav-tc-confirmation-tab"
                class="tab-pane fade"
                role="tabpanel"
            >
              <div class="row">
                <div class="col-12 mt-4 pt-2">
                  <form>
                    <p>
                      T.C kimlik numaranızdan hata alıyorsanız üyelik bilgileriniz
                      ile T.C kimlik bilgilerinizin örtüşüp örtüşmediğini
                      (kimliğinizde isim ve soy isim alanından “i,ö,ü,ü,ğ”
                      harfleri var iken üyeliğinizde “ı,o,o,g” ) yer alıyor ise
                      kontrol edin.
                    </p>
                    <p>
                      Eğer bilgileriniz örtüştüğü halde bu hatayı alıyorsanız
                      detaylı inceleme yapabilmemiz için T.C kimlik numaranızı
                      Bize Ulaşın üzerinden iletmeniz gerekmektedir.
                    </p>
                    <div class="row mt-4 pt-2">
                      <div v-if="section_1_status && success" class="col-12">
                        <div class="alert alert-success text-center">
                          <span>Bilgileriniz güncellendi</span>
                        </div>
                      </div>

                      <div v-if="section_1_status && error" class="col-12">
                        <div class="alert alert-danger text-center">
                        <span
                        >İşlem yapılırken hata oluştur. Tekrardan
                          deneyiniz</span
                        >
                        </div>
                      </div>

                      <div class="col-12">
                        <div class="form-group">
                          <label> T.C. Kimlik No:</label>
                          <div class="position-relative">
                            <i class="far fa-address-card icons"></i>

                            <input
                                id="tc_identity"
                                v-model="tc_identity"
                                class="form-control pl-5"
                                placeholder="T.C. Kimlik Numaranız"
                                type="text"
                            />
                          </div>
                          <div
                              v-if="ready_to_submit_tc && !$v.tc_identity.required"
                              class="error d-block"
                          >
                            T.C. Kimlik No'nuzu giriniz.
                          </div>
                          <div v-else>
                            <div
                                v-if="
                              ready_to_submit_tc && !$v.tc_identity.minLength
                            "
                                class="error d-block"
                            >
                              Eksik karakter girdiniz
                            </div>

                            <div
                                v-if="
                              ready_to_submit_tc && !$v.tc_identity.maxLength
                            "
                                class="error d-block"
                            >
                              Fazla karakter girdiniz
                            </div>
                          </div>
                        </div>
                        <div class="form-group">
                          <label> {{ $t("setting.name") }}</label>
                          <div class="position-relative">
                            <i class="fea icon-sm icons" data-feather="user"></i>
                            <input
                                id="first"
                                v-model="userSetting.firstName"
                                class="form-control pl-5"
                                disabled
                                placeholder="Adınız :"
                                type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-12">
                        <div class="form-group">
                          <label> {{ $t("setting.surname") }}</label>
                          <div class="position-relative">
                            <i
                                class="fea icon-sm icons"
                                data-feather="user-check"
                            ></i>
                            <input
                                id="last"
                                v-model="userSetting.lastName"
                                class="form-control pl-5"
                                disabled
                                placeholder="Soyadınız :"
                                type="text"
                            />
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-12" style="width: 100%;">
                        <div
                            class="col-12 font-weight-bold m-0 p-0"
                            style="font-size: 14px;"
                        >
                          Doğum Tarihi
                        </div>
                        <div
                            class="row m-0 py-0 px-0 justify-content-between"
                            style="width: 100%;"
                        >
                          <div class="col-md-4 m-0 px-0 py-1">
                            <div class="form-group m-0 p-0">
                              <select
                                  v-model="userSetting.birthday.split('-')[2]"
                                  class="form-control custom-select"
                                  disabled
                              >
                                <option selected value="null"
                                >{{ $t("login.birthday") }}
                                </option>
                                <option
                                    v-for="(item, index) in days"
                                    :value="item.value"
                                    :key="index"
                                >{{ item.text }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4 m-0 py-1 tc-confirmation-month-part">
                            <div class="form-group m-0 p-0 form-month-style">
                              <select
                                  v-model="userSetting.birthday.split('-')[1]"
                                  class="form-control custom-select"
                                  disabled
                              >
                                <option selected value="null"
                                >{{ $t("login.month_of_birth") }}
                                </option>
                                <option
                                    v-for="(item, index) in months"
                                    :value="item.value"
                                    :key="index"
                                >{{ item.text }}
                                </option>
                              </select>
                            </div>
                          </div>
                          <div class="col-md-4 m-0 px-0 py-1">
                            <div class="form-group m-0 p-0 form-year-style">
                              <select
                                  v-model="userSetting.birthday.split('-')[0]"
                                  class="form-control custom-select"
                                  disabled
                              >
                                <option selected value="null"
                                >{{ $t("login.year_of_birth") }}
                                </option>
                                <option
                                    v-for="(item, index) in years"
                                    :value="item.value"
                                    :key="index"
                                >{{ item.text }}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                      <!--end col-->

                      <!--end col-->
                    </div>
                    <!--end row-->

                    <!--end row-->
                  </form>
                </div>

                <div class="col-12 mt-4 pt-2 text-center">
                  <button
                      :disabled="
                      !(
                        $v.tc_identity.required &&
                        $v.tc_identity.maxLength &&
                        $v.tc_identity.minLength
                      )
                    "
                      class="btn btn-primary btn-block"
                      @click.prevent="updateInformationTC"
                  >
                    {{
                      userSetting.tcNo
                          ? "Güncellemek İçin Tıklayınız"
                          : "Tanımlamak için tıklayın"
                    }}
                  </button>
                </div>
              </div>
            </div>
            <!--end col-->
            <div
                id="nav-password"
                aria-labelledby="nav-password-tab"
                class="tab-pane fade"
                role="tabpanel"
            >
              <div class="row">
                <div v-if="section_3_status && success" class="col-12 mt-4">
                  <div class="alert alert-success text-center">
                    <span>Bilgileriniz güncellendi</span>
                  </div>
                </div>
                <div class="col-12 mt-4 pt-2">
                  <form>
                    <p>
                      Şifrenizi değiştirmek için lütfen mevcut şifrenizi ve yeni
                      şifrenizi giriniz.
                    </p>
                    <p>
                      Yeni şifreniz, rakam ve harf içerecek şekilde, minimum 6
                      karakterden oluşmalıdır.
                    </p>
                    <div class="row mt-4">
                      <div class="col-12">
                        <div class="form-group">
                          <label> {{ $t("setting.old_password") }} :</label>
                          <div class="position-relative">
                            <i class="fea icon-sm icons" data-feather="key"></i>
                            <input
                                v-model="current_password"
                                class="form-control pl-5"
                                placeholder="Mevcut şifreniz"
                                required=""
                                type="password"
                            />
                          </div>
                          <div
                              v-if="
                            section_3_status && !$v.current_password.required
                          "
                              class="error d-block"
                          >
                            Mevcut şifrenizi giriniz
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-12">
                        <div class="form-group">
                          <label>{{ $t("setting.new_password") }} :</label>
                          <div class="position-relative">
                            <i class="fea icon-sm icons" data-feather="key"></i>
                            <input
                                v-model="password"
                                class="form-control pl-5"
                                placeholder="Yeni şifreniz"
                                required=""
                                type="password"
                            />
                          </div>
                          <div
                              v-if="section_3_status && !$v.password.required"
                              class="error d-block"
                          >
                            Yeni şifrenizi giriniz
                          </div>
                          <div
                              v-if="section_3_status && !$v.password.valid"
                              class="error d-block"
                          >
                            En az 1 harf 1 rakam olmalıdır.
                          </div>
                          <div
                              v-if="section_3_status && !$v.password.minLength"
                              class="error d-block"
                          >
                            Yeni şifrenizi en az 6 karakterden oluşmalıdır
                          </div>
                          <div
                              v-if="section_3_status && !$v.password.maxLength"
                              class="error d-block"
                          >
                            Yeni şifrenizi en fazla 20 karakter olabilir
                          </div>
                        </div>
                      </div>
                      <!--end col-->
                      <div class="col-12">
                        <div class="form-group">
                          <label>{{ $t("setting.repeat_new_password") }} :</label>
                          <div class="position-relative">
                            <i class="fea icon-sm icons" data-feather="key"></i>
                            <input
                                v-model="password_confirm"
                                class="form-control pl-5"
                                placeholder="Yeni şifrenizi tekrar giriniz."
                                required=""
                                type="password"
                            />
                          </div>
                          <div
                              v-if="password && !$v.password_confirm.sameAsPassword"
                              class="error d-block"
                          >
                            Şifreler aynı olmalıdır
                          </div>
                        </div>
                      </div>
                      <!--end col-->

                      <!--end col-->
                      <div
                          v-if="password_alert"
                          class="col-lg-12 mt-2 mb-0"
                      ></div>
                    </div>
                    <div class="d-flex justify-content-center">
                      <button
                          class="btn btn-primary btn-block"
                          type="button"
                          @click.prevent="updatePassword"
                      >
                        {{ $t("setting.update") }}
                      </button>
                    </div>
                    <!--end row-->
                  </form>
                </div>
              </div>

            </div>
            <!--end col-->

            <div class="p-4 "></div>
            <div
                id="nav-permissions"
                aria-labelledby="nav-permissions-tab"
                class="tab-pane fade"
                role="tabpanel"
            >
              <div class="p-4">
                <div class="row">
                  <div v-if="section_4_status && success" class="col-12">
                    <div class="alert alert-success text-center">
                      <span>Bilgileriniz güncellendi</span>
                    </div>
                  </div>
                  <div
                      v-if="section_4_status && section_4_error"
                      class="col-12"
                  >
                    <div class="alert alert-danger text-center">
                      <span
                      >İşlem yapılırken hata oluştur. Tekrardan
                        deneyiniz</span
                      >
                    </div>
                  </div>
                </div>
                <div class="d-flex justify-content-between pb-4">
                  <h6 class="mb-0">
                    {{ $t("setting.did_you_need_all_emails") }}
                  </h6>
                  <div class="custom-control custom-switch">
                    <input
                        id="customSwitch1"
                        :checked="
                        userSetting.emailPermissionType !== 'NOP' ? true : false
                      "
                        class="custom-control-input"
                        type="checkbox"
                        @change="updatePermissionType(1)"
                    />
                    <label
                        class="custom-control-label"
                        for="customSwitch1"
                    ></label>
                  </div>
                </div>
                <div
                    class="media d-flex justify-content-between py-4 border-top"
                >
                  <h6 class="mb-0">{{ $t("setting.need_all_emails") }}</h6>
                  <div class="custom-control custom-switch">
                    <input
                        id="customSwitch2"
                        :checked="
                        userSetting.gsmPermissionType !== 'NOP' ? true : false
                      "
                        class="custom-control-input"
                        type="checkbox"
                        @change="updatePermissionType(2)"
                    />
                    <label
                        class="custom-control-label"
                        for="customSwitch2"
                    ></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end row-->
        </div>
      </div>
    </template>
  </div>
  <!--end col-->
</template>

<script>
import feather from "feather-icons";
import module, {
  ERROR,
  GET_USER,
  IS_AUTHENTICATED,
  MODULE_NAME,
  SET_SUCCESS,
  SUCCESS,
  UPDATE_USER,
  USER,
} from "@/core/services/store/auth.module";

import moduleContent, {
  GET_TITLES,
  MODULE_NAME as MODULE_NAME_CONTENT,
  TITLES,
} from "@/core/services/store/content.module";

import store from "@/core/services";
import moment from "moment";
import {
  email,
  maxLength,
  minLength,
  required,
  sameAs,
} from "vuelidate/lib/validators";
import {
  CREATE_ITEM,
  SET_GENERAL_LOADING as SET_LOADING,
} from "@/core/services/store/rest.module";
import querystring from "querystring";
import Swal from "sweetalert2";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_CONTENT = MODULE_NAME_CONTENT;

export default {
  name: "setting",
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_CONTENT, moduleContent);
  },
  validations: {
    user: {
      firstName: {
        required,
      },
      lastName: {
        required,
      },
      email: {
        required,
        email,
      },
      shortDescription: {
        required,
      },
      gsmNumber: {
        required,
      },
    },
    title: {
      required,
    },
    current_password: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
      maxLength: maxLength(20),
      valid: function (value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return (containsUppercase || containsLowercase) && containsNumber;
      },
    },
    password_confirm: {
      sameAsPassword: sameAs("password"),
    },
    tc_identity: {
      required,
      minLength: minLength(11),
      maxLength: maxLength(11),
    },
  },
  data() {
    return {
      gsmNumber: null,
      gsmCode: null,
      title: null,
      current_password: null,
      password: null,
      password_confirm: null,
      section_1_status: false,
      section_2_status: false,
      section_2_error: false,
      section_3_status: false,
      section_3_error: false,
      section_4_status: false,
      section_4_error: false,
      showAvatars: false,
      password_alert: false,
      tc_identity: "",
      ready_to_submit_tc: false,
    };
  },
  watch: {
    tc_identity: {
      immediate: true,
      handler() {
        if (this.tc_identity.length === 11) {
          this.ready_to_submit_tc = true;
        }
      },
    },
    userSetting: {
      immediate: true,
      handler(value) {
        if (value && value.hasOwnProperty("gsmNumber")) {
          this.gsmNumber =
              value.gsmNumber == "9999999999" || !value.gsmNumber
                  ? null
                  : value.gsmNumber;
        }
      },
    },
  },
  computed: {
    avatars() {
      let avatars = [];
      for (let i = 1; i < 25; i++) {
        avatars.push("Avatar" + i + ".png");
      }
      avatars = _.shuffle(avatars);
      avatars.push("Avatar0.png");

      return avatars.reverse();
    },
    userSetting: {
      get() {
        let item = store.getters[_MODULE_NAME + "/" + USER];

        if (item && item.hasOwnProperty("birthday")) {
          let day = item.birthday ? Number(item.birthday.split("-")[2]) : "01";
          let month = item.birthday ? Number(item.birthday.split("-")[1]) : "01";
          let year = item.birthday ? Number(item.birthday.split("-")[0]) : "1989";

          day = day.length != 2 ? day.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) : 0;
          month = month.length != 2 ? month.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false}) : month;
          year =  year.length != 4 ? year.toLocaleString('en-US', {minimumIntegerDigits: 4, useGrouping: false}) : year;
          item.birthday = year +"-"+ month + "-" + day;
        }

        if (item && item.hasOwnProperty("gsmNumber")) {
          item.gsmNumber =
              item.gsmNumber == "9999999999" || !item.gsmNumber
                  ? null
                  : item.gsmNumber;
        }
        return item;
      },
      set(value) {
      },
    },
    isAuthenticated() {
      return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
    success: {
      get() {
        return store.getters[_MODULE_NAME + "/" + SUCCESS];
      },
      set(value) {
      },
    },
    birthday() {
      if (this.userSetting && this.userSetting.birthday) {
        return moment(this.userSetting.birthday).format("DD.MM.YYYY");
      }
      return "-";
    },
    titles() {
      let items = store.getters[_MODULE_NAME_CONTENT + "/" + TITLES];
      let results = [{text: "Mesleğiniz", value: null}];
      if (items && items.length) {
        for (let i = 0; i < items.length; i++) {
          let item = items[i];
          if (item.isActive == 1) {
            results.push({
              value: item.titleId,
              text: item.titleName,
            });
          }
        }
      }
      return results;
    },
  },
  methods: {
    changeProfileImage(image) {
      this.userSetting.avatar = image;
      this.sendUpdateRequest();
      this.showAvatars = false;
    },
    submit(section = null) {
      if (section == 1) {
        this.section_1_status = true;
        this.sendUpdateRequest();
      }
      if (section == 2) {
        this.section_2_status = true;
        if (!this.$v.user.gsmNumber) {
          this.sendUpdateRequest();
        }
      }

      return false;
    },
    sendUpdateRequest() {
      let self = this;
      let url = "/mobile/member/update";
      if (self.userSetting.titleId && self.userSetting.titleId === self.title) {
        url = "/mobile/member/update?titleId=-1";
      } else {
        if (self.userSetting.titleId) {
          url = "/mobile/member/update?titleId=" + self.userSetting.titleId;
        } else {
          url = "/mobile/member/update?titleId=0";
        }
      }
      this.$store.dispatch(_MODULE_NAME + "/" + UPDATE_USER, {
        url: url,
        contents: self.userSetting,
      });
      setTimeout(function () {
        self.getUser();
      }, 500);
    },
    updatePassword() {
      this.section_3_status = true;

      if (
          !(
              this.$v.current_password.$invalid ||
              this.$v.password.$invalid ||
              this.$v.password_confirm.$invalid
          )
      ) {
        let contents = {
          oldPass: this.current_password,
          newPass: this.password,
        };

        this.$store
            .dispatch(CREATE_ITEM, {
              url: "/mobile/member/updatePassword/",
              contents: contents,
              returnType: "stateless",
            })
            .then((response) => {
              if (response.status) {
                Swal.fire({
                  title: response.data.title,
                  text: response.data.content,
                  icon: "success",
                  confirmButtonColor: "#0a9c8c",
                  confirmButtonText: "Tamam",
                });
                this.success = true;
              } else {
                if (typeof response.data.response.data.title != "undefined") {
                  Swal.fire({
                    title: response.data.response.data.title,
                    text: response.data.response.data.content,
                    icon: "warning",
                    confirmButtonColor: "#0a9c8c",
                    confirmButtonText: "Tamam",
                  });
                } else {
                  Swal.fire({
                    title: "Hata",
                    text:
                        "Beklenmeyen bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.",
                    icon: "warning",
                    confirmButtonColor: "#0a9c8c",
                    confirmButtonText: "Tamam",
                  });
                }
              }
            })
            .catch((err) => {
            });
      }
    },
    showGSMUpdateSwal() {
      let self = this;
      return Swal.fire({
        title:
            "<h5>Cep Telefonu Tanımlama</h5><p class='m-0 p-0' style='font-size:14px;'>Telefon numaranızı 10 haneli olacak şekilde giriniz<p>",
        input: "text",
        inputLabel: "Örnek: 5324444444",
        showCancelButton: true,
        confirmButtonText: "Devam",
        confirmButtonColor: "#00b6a6",
        cancelButtonColor: "#f17425",
        cancelButtonText: "Vazgeç",
        inputValidator: (value) => {


          self.gsmNumber = value;
        },
      });
    },
    showGSMCodeSwal() {
      let self = this;
      Swal.fire({
        title: "<h5>Telefon Numarası Güncelleme</h5>",
        input: "text",
        inputLabel: "Numaranıza gönderilen kodu giriniz",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Tamam",
        confirmButtonColor: "#00b6a6",
        cancelButtonColor: "#f17425",
        denyButtonColor: "#387e99",
        cancelButtonText: "Vazgeç",
        denyButtonText: "Tekrar Gönder",
        inputValidator: (value) => {
          if (!value) {
            return "Kodu giriniz";
          }
          self.gsmCode = value;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          store.commit(SET_LOADING, true);

          self.$store
              .dispatch(CREATE_ITEM, {
                url: "/mobile/member/confirmCode",
                contents: {code: self.gsmCode, gsm: self.gsmNumber},
                returnType: "stateless",
                isAuthenticated: self.isAuthenticated,
              })
              .then((response) => {
                store.commit(SET_LOADING, false);
                if (response.status) {
                  self.showSuccessNotification();
                  self.getUser();
                } else {
                  let error;
                  try {
                    error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  } catch (e) {
                    error =
                        "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                  self.showErrorNotification("Hata Oluştu", error);
                }
              });
        }
        if (result.isDenied) {

          self.$store
              .dispatch(CREATE_ITEM, {
                url: "/mobile/member/getConfirmCode",
                contents: {gsm: self.gsmNumber},
                returnType: "stateless",
                isAuthenticated: self.isAuthenticated,
              })
              .then((response) => {
                if (response.status) {
                  self.showGSMCodeSwal();
                } else {
                  let error;
                  try {
                    error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  } catch (e) {
                    error =
                        "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                  self.showErrorNotification(error);
                }
              });
        }
      });
    },
    updateGsm() {
      let self = this;
      let code = null;
      let value = self.gsmNumber;
      if (!value) {
        self.showErrorNotification("Hata Oluştu", "Telefon numaranızı giriniz");
        return;
      }
      if (!Number.isInteger(Number(value))) {
        self.showErrorNotification("Hata Oluştu", "Lütfen rakamlardan oluşan telefon numaranızı giriniz");
        return;
      }
      if (String(value).length !== 10) {
        self.showErrorNotification("Hata Oluştu", "Lütfen başında 0 olmadan 10 haneli olarak giriniz");
        return;
      }

      store.commit(SET_LOADING, true);
      self.$store
          .dispatch(CREATE_ITEM, {
            url: "/mobile/member/getConfirmCode",
            contents: {gsm: self.gsmNumber},
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            store.commit(SET_LOADING, false);
            if (response.status) {
              self.showGSMCodeSwal();
            } else {
              let error;
              try {
                error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              } catch (e) {
                error =
                    "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              }
              self.showErrorNotification(null, error);
            }
          });

    },
    updatePermissionType(type) {
      let self = this;
      this.section_4_status = true;
      let value = null;

      if (type === 1) {
        value = (this.userSetting.emailPermissionType != "NOP" ? 1 : 0) ? 0 : 1;
      } else {
        value = (this.userSetting.gsmPermissionType != "NOP" ? 1 : 0) ? 0 : 1;
      }

      let params = {
        value: value,
        type: type,
      };

      this.$store
          .dispatch(CREATE_ITEM, {
            url:
                "/mobile/member/setConfirmation?" + querystring.stringify(params),
            contents: null,
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            if (response.status) {
              self.getUser();
              store.commit(_MODULE_NAME + "/" + SET_SUCCESS, true);
            } else {
              self.section_4_error = true;
            }
          });
    },
    getTitles() {
      store.dispatch(_MODULE_NAME_CONTENT + "/" + GET_TITLES, {
        filters: {
          all: true,
        },
      });
      this.title = this.userSetting.title;
    },
    getUser() {
      store.dispatch(_MODULE_NAME + "/" + GET_USER);
    },
    updateInformationTC() {
      let self = this;

      let tc_number = self.tc_identity;

      let error;

      let contents = [
        {
          questionId: 1,
          answer: tc_number,
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
                error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              } catch (e) {
                error =
                    "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              }
              self.showErrorNotification("", error);
            }
            store.commit(SET_LOADING, false);
          });

      return false;
    },
  },
  mounted() {
    feather.replace();
    this.getTitles();
    window.scrollTo(0, 0);
  }
};
</script>

<style scoped>
.tc-confirmation-month-part {
  padding-left: 0;
  padding-right: 0;
}

@media (min-width: 768px) {
  .tc-confirmation-month-part {
    padding-left: 10px;
    padding-right: 10px;
  }
}
</style>
