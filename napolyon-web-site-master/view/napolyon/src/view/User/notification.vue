<template>
  <div class="col-lg-8 col-12">
    <div v-if="loading">
      <loader :loading="loading"></loader>
    </div>
    <div v-else class="pb-4">
      <div class="row">
        <div class="col-lg-6 col-md-6 col-12 mb-4 cursor-pointer" v-for="(item, index) in items" :key="index" @click="showDetail(item)">
          <div class="company-list card border-0 rounded shadow bg-white d-flex align-items-end flex-column mb-3">
            <div class="text-center">
              <img
                :src="item.taskImage || notificationImage" class="mx-auto d-block mb-3 img-fluid" :alt="item.name"/>
              <span class="text-dark h5">{{ item.name }}</span>
              <p class="text-muted mt-1 mb-0 p-1"> <span v-html="item.description"></span></p>
            </div>
            <div class="mt-auto">
              <div class="px-4 pt-0">
                <template>
                    <span class="float-right text-muted small mt-2">
                      {{ item.date }}
                    </span>
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
import module, {
  MODULE_NAME,
  NOTIFICATIONS,
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_COUNT,
  LOADING,
} from "@/core/services/store/task.module";

import moment from "moment";
import Loader from "@/view/components/Loader";
const _MODULE_NAME = MODULE_NAME;

export default {
  name: "finishedTasks",
  components: { Loader },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }
    registerStoreModule(_MODULE_NAME, module);
  },
  computed: {
    loading() {
      return store.getters[_MODULE_NAME + "/" + LOADING];
    },
    items: {
      get() {
        let results = [];
        let items = store.getters[_MODULE_NAME + "/" + NOTIFICATIONS];
        if (items && items.length) {
          items.forEach((item) => {

            // TODO: Servisten gelince silelim burasını
            let title = item.title;
            let shortDescription = item.shortDescription;
            if (item.taskType == "NotificationTask") {
              title = "Anketin Var!";
              shortDescription = "Hemen sen de “Görevlerim” e girerek doldurmadığın tüm anketleri tamamla, NAP Puanlar yakala!";
            }

            results.push({
              id: item.taskId,
              taskImage: item.imageUrl,
              description: shortDescription,
              name: title,
              code: item.taskId,
              isCelebration: item.isCelebration,
              taskType: item.taskType,
              date: item.date ? moment(item.date).format("DD.MM.YYYY") : "-",
            });
          });
        }
        return results;
      },
      set(value) {},
    },
  },
  methods: {
    getItems() {
      this.$store.dispatch(_MODULE_NAME + "/" + GET_NOTIFICATIONS, {});
    },
    getNotificationCount() {
      this.$store.dispatch(_MODULE_NAME + "/" + GET_NOTIFICATIONS_COUNT, {});
    },
    showDetail(item) {
      if (item.taskType == 'NotificationTask') {
        this.$router.push({
          name: 'user.tasks'
        })
      }
      else if (item.taskType == 'CRMCampaign') {
        this.$router.push({
          name: 'user.campaign',
          params: { id: item.id },
        })
      }
      else if (item.taskType == 'NTCampaign') {
        this.$router.push({
          name: 'user.nap_transfers',
          params: { type: 2, id: item.id },
        })
      }
      else {
        return false;
      }
    }
  },
  mounted() {
    feather.replace();
    let self = this;
    this.getItems();
    setTimeout(() => {
      self.getNotificationCount();
    }, 3000);
  },
};
</script>

<style scoped>
.company-list {
  height: 100%;
}
.text-center{
  width: 100%;
  margin: 0 auto;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
