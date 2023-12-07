<template>
  <div class="d-flex justify-content-center">
    <div class="col-lg-8 col-12">
      <div v-if="tasksLoading">
        <loader :loading="tasksLoading"></loader>
      </div>
      <div v-else class="pb-4">
        <div>
          <div v-for="(item, index) in items" :key="index">
            <div>
              <div class="image-container">
                <img
                  src="images/mobile/green-task-bg.png"
                  width="100%"
                  height="100%"
                  class="image"
                />
              </div>
              <div class="description-container">
                <div class="description">
                  <!-- <a
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
                    >{{ item.name }}</a
                  > -->
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
                        >{{ item.name }}</a
                      >
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
                        >{{ item.name }} ></a
                      >
                    </template>

                    <template v-else-if="item.taskType == 'ExternalSurvey'">
                      <a
                        class="content-title"
                        href="#"
                        @click="redirectTo(item)"
                        >{{ item.name }} ></a
                      >
                    </template>

                    <template v-else-if="item.taskType == 'LiveSurvey'">
                      <a
                        class="content-title"
                        href="#"
                        @click="redirectTo(item, 'live')"
                        >{{ item.name }} ></a
                      >
                    </template>

                    <template v-else-if="item.taskType == 'CrmMiniAnket'">
                      <a class="content-title" :href="item.urlLink">
                        {{ item.name }}
                        ></a
                      >
                    </template>
                    <template v-else>
                      <a
                        class="content-title"
                        href="#"
                        @click.prevent="return false;"
                        >{{ item.name }} ></a
                      >
                      <span class="float-right text-muted small mt-2"> </span>
                    </template>
                  </template>
                  <div class="nap-points">
                    <p class="content-desc" v-html="item.description"></p>
                    <!-- <div class="common">
                      <img src="/images/mobile/clock.png" />
                      <span>5 dk</span>
                    </div>
                    <div class="common">
                      <img
                        src="/images/mobile/coin.png"
                        width="18"
                        height="18"
                      />
                      <span>3000 NAP Puan</span>
                    </div> -->
                  </div>
                </div>
                <div>
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
                          </a
                        >
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
                          </a
                        >
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
                          </a
                        >
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

import moment from "moment";
import Loader from "@/view/components/Loader";
import Swal from "sweetalert2";

const _MODULE_NAME_TASK = MODULE_NAME_TASK;

export default {
  name: "tasks",
  components: { Loader },
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
                this.$router.push({ path: 'index.tasks'});
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
                this.$router.push({ path: 'index.tasks' });
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

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("refresh_token", token);
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

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  position: absolute;
  z-index: 12;
  color: white;
  margin-bottom: 37px;
  padding: 16px;
}
.description-container {
  background-color: white;
  border-radius: 16px;
  z-index: 2;
  position: relative;
  top: -47px;
  box-shadow: 0px 5px 20px 0px #cdcdcd40;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
}

.description {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
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
}

.content-desc {
  /* padding: 0 0 16px 16px; */
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
</style>
