<template>
  <div class="col-lg-8 col-12">
    <div v-if="tasksLoading">
      <loader :loading="tasksLoading"></loader>
    </div>
    <div v-else class="pb-4">
      <div class="row">
        <div v-for="(item, index) in items" :key="index" class="col-lg-6 col-md-6 col-12 mb-4">
          <div class="company-list card border-0 rounded shadow bg-white d-flex align-items-end flex-column mb-3">
            <div class="text-center">
              <img :src="item.taskImage" alt="" class="mx-auto d-block mb-3 img-fluid"/>
              <a
                  class="text-dark h5 name"
                  href="#"
                  @click="
                  $router.push({
                    name: 'user.surveys',
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
              <p class="text-muted mt-1 mb-0" v-html="item.description"></p>
            </div>
            <div class="mt-auto border-top">
              <div class="px-4 pt-4">
                <template v-if="!item.isCelebration">
                  <template v-if="item.taskType == 'ProfileTask'">
                    <a
                        class="btn btn-block btn-soft-primary"
                        href="#"
                        @click="
                        $router.push({
                          name: 'user.surveys',
                          params: {
                            name: convertToKebabCase(item.name),
                            id: item.id,
                            questionIds: item.questionIds,
                            code: item.code,
                          },
                        })
                      "
                    >Göreve katılmak için tıklayın.
                      <i class="fea icon-sm" data-feather="arrow-right"></i
                      ></a>
                    <span class="float-right text-muted small mt-2">
                      {{ item.date }} - ID: {{ item.id }}
                    </span>
                  </template>

                  <template v-else-if="item.taskType == 'CRMCampaign'">
                    <a
                        class="btn btn-block btn-soft-primary"
                        href="#"
                        @click="
                        $router.push({
                          name: 'user.campaign',
                          params: { id: item.id },
                        })
                      "
                    >Göreve katılmak için tıklayın.
                      <i class="fea icon-sm" data-feather="arrow-right"></i
                      ></a>
                    <span class="float-right text-muted small mt-2">
                      {{ item.date }} - ID: {{ item.id }}
                    </span>
                  </template>

                  <template v-else-if="item.taskType == 'ExternalSurvey'">
                    <a
                        class="btn btn-block btn-soft-primary"
                        href="#"
                        @click="redirectTo(item)"
                    >Göreve katılmak için tıklayın.
                      <i class="fea icon-sm" data-feather="arrow-right"></i
                      ></a>
                    <span class="float-right text-muted small mt-2">
                      {{ item.date }} - ID: {{ item.id }}
                    </span>
                  </template>

                  <template v-else-if="item.taskType == 'LiveSurvey'">
                    <a
                        class="btn btn-block btn-soft-primary"
                        href="#"
                        @click="redirectTo(item, 'live')"
                    >Göreve katılmak için tıklayın.
                      <i class="fea icon-sm" data-feather="arrow-right"></i
                      ></a>
                    <span class="float-right text-muted small mt-2">
                      {{ item.date }} - ID: {{ item.id }}
                    </span>
                  </template>

                  <template v-else-if="item.taskType == 'CrmMiniAnket'">
                    <a class="btn btn-block btn-soft-primary" :href="item.urlLink">
                      Göreve katılmak için tıklayın.
                      <i class="fea icon-sm" data-feather="arrow-right"></i></a>
                    <span class="float-right text-muted small mt-2">
                      {{ item.date }} - ID: {{ item.id }}
                    </span>
                  </template>
                  <template v-else>
                    <a
                        class="btn btn-block btn-soft-primary"
                        href="#"
                        @click.prevent="return false;"
                    >Göreve katılmak için tıklayın.
                      <i class="fea icon-sm" data-feather="arrow-right"></i
                      ></a>
                    <span class="float-right text-muted small mt-2">
                      {{ item.date }} - ID: {{ item.id }}
                    </span>
                  </template>
                </template>
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

import {GET_ITEMS as REST_GET_ITEMS} from "@/core/services/store/rest.module";


import moment from "moment";
import Loader from "@/view/components/Loader";
import Swal from "sweetalert2";

const _MODULE_NAME_TASK = MODULE_NAME_TASK;

export default {
  name: "tasks",
  components: {Loader},
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
      from: null
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
        let onlyProfile = this.$route.query.hasOwnProperty('profile');
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
      set(value) {
      },
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
      if (url && url.includes('napolyon_internal_survey')) {
        let id = url.split('-')[1];
        this.$router.push({
          name: 'user.surveys',
          params: {name: this.convertToKebabCase(item.name), id: id, code: id}
        })
      } else if (type && type == 'live'){
        let self = this;
        let filters = this.urlParser(item.urlLink);
        self.$store.dispatch(REST_GET_ITEMS, {
          url: "/linkTracker/liveRedirect",
          filters: filters,
          returnType: 'stateless'
        })
            .then((response) => {
              if (response.status) {
                if (response.data.status == 1) {
                  window.location.href = response.data.content;
                } else {
                  this.$router.push({path: response.data.content});
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
        self.$store.dispatch(REST_GET_ITEMS, {
          url: "/linkTracker",
          filters: filters,
          returnType: 'stateless'
        })
            .then((response) => {
              if (response.status) {
                if (response.data.status == 1) {
                  window.location.href = response.data.content;
                } else {
                  this.$router.push({path: response.data.content});
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
    }
  },
  mounted() {
    feather.replace();
    this.getItems();
  },
  watch: {
    items (value) {
      if (value && _.isEmpty(value) && !this.tasksLoading) {
        this.showSuccessNotification(
            "",
            "Herhangi bir göreviniz bulunmamaktadır.\n"
        );
      }
    }
  }
};
</script>

<style scoped>
.company-list {
  height: 100%;
}
</style>
