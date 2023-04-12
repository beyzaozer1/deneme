<template>
  <section v-if="item" id="home" class="bg-profile d-table w-100 bg-primary">
    <div class="container">
      <div class="row">
        <div class="col-lg-12">
          <div
              class="card public-profile border-0 rounded shadow"
              style="z-index: 1;"
          >
            <div class="card-body">
              <div class="row align-items-center">
                <div class="col-lg-2 col-md-3 text-md-left text-center">
                  <img
                      :src="
                      item && item.avatar
                        ? mediaBase + '/images/avatars/' + item.avatar
                        : mediaBase + '/images/images/napolyon-avatar.jpg'
                    "
                      alt=""
                      class="avatar avatar-large rounded-circle shadow shadow-avatar d-block mx-auto"
                      @click="$router.push({ name: 'user.setting' })"
                  />
                </div>
                <!--end col-->

                <div class="col-lg-10 col-md-9">
                  <div class="row align-items-end">
                    <div class="col-md-7 text-md-left text-center mt-4 mt-sm-0">
                      <h3 class="title mb-0">
                        {{ capitalizeFirstLetter(item.firstName) }}
                        {{ capitalizeFirstLetter(item.lastName) }}
                      </h3>
                      <!--                      <small class="text-muted h6 mr-2">{{ item.title }}</small>-->
                      <ul class="list-inline mb-0 mt-3">
                        <li v-if="instagramLink" class="list-inline-item mr-2">
                          <a
                              class="text-muted"
                              href="#"
                              target="_blank"
                              title="Instagram"
                              @click.prevent="updateInstagramAccount"
                          >
                            <i
                                class="fea icon-sm mr-2"
                                data-feather="instagram"
                            ></i
                            >{{ instagramLink }}</a
                          >
                        </li>
                        <li v-else class="list-inline-item mr-2">
                          <a
                              class="text-muted"
                              href="#"
                              title="Instagram"
                              @click.prevent="updateInstagramAccount"
                          >
                            <i
                                class="fea icon-sm mr-2"
                                data-feather="instagram"
                            ></i
                            >{{
                              instagramLink ||
                              "Instagram hesabınız tanımlı değil"
                            }}</a
                          >
                        </li>
                        <li class="list-inline-item d-none">
                          <a
                              class="text-muted"
                              href="javascript:void(0)"
                              title="Linkedin"
                          >
                            <i
                                class="fea icon-sm mr-2"
                                data-feather="linkedin"
                            ></i
                            >Müjgan Suyaran</a
                          >
                        </li>
                      </ul>
                    </div>
                    <!--end col-->
                    <div class="col-md-4 text-md-right text-center">
                      <ul class="list-unstyled social-icon social mb-0 mt-4">
                        <li class="list-inline-item">
                          <a
                              v-if="userAccount.canInvite"
                              class="rounded"
                              data-placement="bottom"
                              data-toggle="tooltip"
                              href="#/hesabim"
                              title="Davet Gönder"
                              @click="inviteLinkClicked">
                            <i class="fea icon-sm fea-social" data-feather="user-plus"></i>
                          </a>
                        </li>
                        <li class="list-inline-item">
                          <router-link
                              :to="{ name: 'user.notification' }"
                              class="rounded mx-1"
                              data-placement="bottom"
                              data-toggle="tooltip"
                              style="cursor: pointer;"
                              title="Bildirimler">
                            <i
                                class="fea icon-sm fea-social"
                                data-feather="bell"
                            ></i>
                          </router-link>
                          <span
                              v-if="notificationCount"
                              class="position-absolute badge badge-warning rounded"
                              style="z-index:10; position:absolute; transform:translate(-23px, -10px) scale(0.8);"
                          >{{ notificationCount }}</span>
                        </li>
                        <li class="list-inline-item">
                          <router-link
                              :to="{ name: 'user.setting' }"
                              class="rounded"
                              data-placement="bottom"
                              data-toggle="tooltip"
                              title="Ayarlar">
                            <i
                                class="fea icon-sm fea-social"
                                data-feather="tool"
                            ></i>
                          </router-link>
                        </li>
                      </ul>
                      <!--end icon-->
                    </div>
                    <!--end col-->
                  </div>
                  <!--end row-->
                </div>
                <!--end col-->
              </div>
              <!--end row-->
            </div>
          </div>
        </div>
        <!--end col-->
      </div>
      <!--end row-->
    </div>
    <!--ed container-->
  </section>
  <!--end section-->
</template>

<script>
import feather from "feather-icons";
import Swal from "sweetalert2";
import {CREATE_ITEM} from "@/core/services/store/rest.module";
import module, {GET_USER, IS_AUTHENTICATED, MODULE_NAME, USER,} from "@/core/services/store/auth.module";
import store from "@/core/services";

import taskModule, {
  GET_NOTIFICATIONS_COUNT,
  MODULE_NAME as MODULE_NAME_TASK,
  NOTIFICATIONS_COUNT
} from "@/core/services/store/task.module";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_TASK = MODULE_NAME_TASK;

export default {
  name: "ProfileCard",
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME_TASK, taskModule);
    registerStoreModule(_MODULE_NAME, module);
  },
  props: {
    item: {
      required: true,
      default: null,
    },
  },
  methods: {
    getNotifications() {
      this.$store.dispatch(MODULE_NAME_TASK + "/" + GET_NOTIFICATIONS_COUNT, {});
    },
    inviteLinkClicked() {
      setTimeout(() => {
        let ref = document.getElementById("invitation-link-id-redirect");
        let top = ref.offsetTop;
        window.scrollTo(0, Number(top) + 100);
      }, 150);
    },
    getUser() {
      store.dispatch(_MODULE_NAME + "/" + GET_USER);
    },
    updateInstagramAccount() {
      let self = this;
      Swal.fire({
        title: "<h5>Instagram kullanıcı adınız nedir?</h5>",
        input: "text",
        inputLabel: "",
        showCancelButton: true,
        confirmButtonText: "Tamam",
        confirmButtonColor: "#00b6a6",
        cancelButtonColor: "#f17425",
        cancelButtonText: "Vazgeç",
        inputValidator: (value) => {
          if (!value) {
            return "Lütfen Instagram kullanıcı adınızı giriniz";
          }
          let contents = [
            {
              answer: value,
              answerType: 2,
              questionId: 346,
            },
          ];
          self.$store
              .dispatch(CREATE_ITEM, {
                url: "/mobile/memberInfoTaskEntry/singleResult",
                contents: contents,
                returnType: "stateless",
                isAuthenticated: localStorage.getItem("token"),
              })
              .then((response) => {
                if (response.status) {
                  self.showSuccessNotification(
                      "Tebrikler!",
                      "Instagram adresiniz başarıyla kaydedilmiştir"
                  );
                  self.getUser();
                } else {
                  let error;
                  try {
                    error = response.data.data;
                  } catch (e) {
                    error =
                        "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                  self.showErrorNotification(error);
                }
              });
        },
      });
      return false;
    },
  },
  computed: {
    notificationCount() {
      return store.getters[_MODULE_NAME_TASK + "/" + NOTIFICATIONS_COUNT];
    },
    userAccount: {
      get() {
        return store.getters[_MODULE_NAME + "/" + USER];
      },
      set(value) {
      },
    },
    isAuthenticated() {
      return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
    },
    instagramLink() {
      let link = this.item.instagramUserId;

      if (link) {
        if (link.includes("@")) {
          return link.substring(1);
        }
        return link;
      }

      return null;
    },
  },
  mounted() {
    if (!this.notifications) {
      this.getNotifications();
    }
    feather.replace();
  },
};
</script>

<style scoped>
.shadow-avatar {
  -webkit-box-shadow: 0 0 6px rgba(60, 72, 88, 0.15) !important;
  box-shadow: 0 0 6px rgba(60, 72, 88, 0.15) !important;
}

.avatar-large:hover {
  cursor: pointer;
}
</style>
