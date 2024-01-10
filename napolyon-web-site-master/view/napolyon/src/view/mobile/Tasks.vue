<template>
  <div class="d-flex justify-content-center">
    <div class="col-lg-8 col-12">
      <div v-if="tasksLoading">
        <lottie-animation :animationData="animationData"></lottie-animation>
      </div>
      <div v-else class="mt-4">
        <div>
          <div v-for="(item, index) in items" :key="index">
            <div :style="{marginBottom: '-26px'}">
              <!-- <div>{{ item.taskImage }}</div> -->
              <div class="image-container">
                <img
                  :src="item.taskImage"
                  width="100%"
                  height="100%"
                  class="image"
                />
              </div>
              <div class="description-container">
                <div class="description">
                  <span class="item-title"><bold>{{ item.name }}</bold></span>
                  <p class="content-desc" v-html="item.description"></p>
                </div>
                <div :style="{alignSelf: 'flex-end', marginBottom: '16px'}">
                  <div class="icon-container">
                    <template v-if="!item.isCelebration">
                      <template v-if="item.taskType == 'ProfileTask'">
                        <a
                          class="content-title"
                          href="#"
                          @click="
                            $router.push({
                              name: 'user.surveys.mobil',
                              params: {
                                name: convertToKebabCase(item.name),
                                id: item.id,
                                questionIds: item.questionIds,
                                code: item.code,
                              },
                            })
                          "
                          ><img
                            src="/images/mobile/right-icon.png"
                            class="icon-image"
                            width="8px"
                            height="10px"
                        /></a>
                      </template>

                      <template v-else-if="item.taskType == 'CRMCampaign'">
                        <a
                          class="content-title"
                          href="#"
                          @click="
                            $router.push({
                              name: 'user.campaign',
                              params: { id: item.id },
                            })
                          "
                          ><img
                            src="/images/mobile/right-icon.png"
                            class="icon-image"
                            width="8px"
                            height="10px"
                          />
                        </a>
                      </template>

                      <template v-else-if="item.taskType == 'ExternalSurvey'">
                        <a
                          class="content-title"
                          href="#"
                          @click="redirectTo(item)"
                          ><img
                            src="/images/mobile/right-icon.png"
                            class="icon-image"
                            width="8px"
                            height="10px"
                          />
                        </a>
                      </template>

                      <template v-else-if="item.taskType == 'LiveSurvey'">
                        <a
                          class="content-title"
                          href="#"
                          @click="redirectTo(item, 'live')"
                          ><img
                            src="/images/mobile/right-icon.png"
                            class="icon-image"
                            width="8px"
                            height="10px"
                          />
                        </a>
                      </template>

                      <template v-else-if="item.taskType == 'CrmMiniAnket'">
                        <a class="content-title" :href="item.urlLink">
                          <img
                            src="/images/mobile/right-icon.png"
                            class="icon-image"
                            width="8px"
                            height="10px"
                          />
                          ></a
                        >
                      </template>
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import feather from "feather-icons";
import store from "@/core/services";
import taskModule, {
  BASE_URL as BASE_URL_TASK,
  GET_ITEMS,
  ITEMS as TASKS,
  LOADING as TASKS_LOADING,
  MODULE_NAME as MODULE_NAME_TASK,
} from "@/core/services/store/task.module";

import { GET_ITEMS as REST_GET_ITEMS } from "@/core/services/store/rest.module";
import LottieAnimation from "../components/LottieAnimation.vue";

import moment from "moment";
import Swal from "sweetalert2";

const _MODULE_NAME_TASK = MODULE_NAME_TASK;

export default {
  name: "tasks",
  components: { LottieAnimation },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(MODULE_NAME_TASK, taskModule);
  },
  data() {
    return {
      hasProfileSurvey: false,
      hasProfileSurveyStatus: false,
      from: null,
      animationData: require("./Loading.json"),
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.from = from;
    });
  },
  computed: {
    tasksLoading() {
      return store.getters[_MODULE_NAME_TASK + "/" + TASKS_LOADING];
    },
    items: {
      get() {
        let results = [];
        let onlyProfile = this.$route.query.hasOwnProperty("profile");
        let items = store.getters[_MODULE_NAME_TASK + "/" + TASKS];
        if (items && items.length) {
          items.forEach((item) => {
            if (item.taskType == "ProfileTask") {
              this.hasProfileSurvey = true;
            }
            if (onlyProfile && item.taskType != "ProfileTask") {
              return;
            }
            results.push({
              id: item.taskId,
              taskImage: item.imageUrl,
              description: item.shortDescription,
              name: item.title,
              code: item.taskId,
              isCelebration: item.isCelebration,
              urlLink: item.urlLink,
              taskType: item.taskType,
              date: item.date ? moment(item.date).format("DD.MM.YYYY") : "-",
            });
          });
        }

        if (
          this.hasProfileSurvey === true &&
          this.hasProfileSurveyStatus === false &&
          this.from &&
          this.from.name !== "user.surveys"
        ) {
          this.hasProfileSurveyStatus = true;
          this.showSuccessNotification(
            "",
            "Profil bilgilerinizi eksiksiz bir şekilde doldurun, daha fazla anket daha fazla NAP puan kazanın!\n"
          );
        }
        return results;
      },
      set(value) {},
    },
  },
  methods: {
    getItems() {
      this.$store.dispatch(MODULE_NAME_TASK + "/" + GET_ITEMS, {
        url: BASE_URL_TASK + "/allTask",
      });
    },
    redirectTo(item, type = null) {
      let url = item.urlLink;
      if (url && url.includes("napolyon_internal_survey")) {
        let id = url.split("-")[1];
        this.$router.push({
          name: "user.surveys.mobil",
          params: {
            name: this.convertToKebabCase(item.name),
            id: id,
            code: id,
          },
        });
      } else if (type && type == "live") {
        let self = this;
        let filters = this.urlParser(item.urlLink);
        self.$store
          .dispatch(REST_GET_ITEMS, {
            url: "/linkTracker/liveRedirect",
            filters: filters,
            returnType: "stateless",
          })
          .then((response) => {
            if (response.status) {
              if (response.data.status == 1) {
                window.location.href = response.data.content;
              } else {
                this.$router.push({ path: "index.tasks" });
              }
            } else {
              let error;
              try {
                error = response.data.response.data.content;
              } catch (e) {
                error =
                  "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              }
              let errorText =
                error ||
                "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz!";
              Swal.fire({
                title: "Hata oluştu!",
                html: errorText,
                icon: "error",
                confirmButtonText: "Tamam",
              });
            }
          });
      } else {
        let self = this;
        let filters = this.urlParser(item.urlLink);
        self.$store
          .dispatch(REST_GET_ITEMS, {
            url: "/linkTracker",
            filters: filters,
            returnType: "stateless",
          })
          .then((response) => {
            if (response.status) {
              if (response.data.status == 1) {
                window.location.href = response.data.content;
              } else {
                this.$router.push({ path: "index.tasks" });
              }
            } else {
              let error;
              try {
                error = response.data.response.data.content;
              } catch (e) {
                error =
                  "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              }
              let errorText =
                error ||
                "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz!";
              Swal.fire({
                title: "Hata oluştu!",
                html: errorText,
                icon: "error",
                confirmButtonText: "Tamam",
              });
            }
          });
      }
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = urlParams.get("token");

    if (
      !window.localStorage.getItem("token") ||
      !window.localStorage.getItem("refresh_token")
    ) {
      window.localStorage.setItem("token", token);
      window.localStorage.setItem("refresh_token", token);
    }
    feather.replace();
    this.getItems();
  },
  watch: {
    items(value) {
      if (value && _.isEmpty(value) && !this.tasksLoading) {
        this.showSuccessNotification(
          "",
          "Herhangi bir göreviniz bulunmamaktadır.\n"
        );
      }
    },
  },
};
</script>

<style scoped>
.image-container {
  display: flex;
  justify-content: center;
  position: relative;
  height: 200px;
  
}

.image {
  border-radius: 16px;
}

.item-title {
  font-weight: 800;
  font-family: Eina 01;
}
.content-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  z-index: 12;
  color: white;
  margin-bottom: 27px;
  padding: 12px;
  font-family: Eina 01;
}
.description-container {
  background-color: white;
  border-radius: 16px;
  z-index: 2;
  position: relative;
  top: -47px;
  box-shadow: 0px 5px 20px 0px #cdcdcd40;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  padding: 16px 16px 0px 16px;
  margin: 22px 0 0 0;
}

.description {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
}
.company-list {
  height: 100%;
}
.nap-points {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.content-title {
  color: black;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 3px;
  margin-left: 2px;
  font-family: Eina 01;
}

.content-desc {
  padding-right: 16px;
  font-weight: 400;
  color: gray;
}

.nap-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.icon-container {
  width: 33px;
  height: 33px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
}

.common {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2px;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
