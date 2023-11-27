<template>
  <div class="d-flex justify-content-center">
    <div class="col-lg-8 col-12">
      <div v-if="pointsLoading">
        <loader :loading="pointsLoading"></loader>
      </div>
      <div v-else>
        <div class="row">
          <div class="col-12">
            <h4>NAP Puan Dökümü</h4>
          </div>
          <div class="table-responsive bg-white">
            <div class="container"  v-for="(item, index) in points" :key="index">
              <div
                class="survey-container mb-1"
                @click.prevent="onClickItem(2)"
              >
                <img
                  src="/images/mobile/icons.png"
                  width="65px"
                  height="65px"
                />
                <div class="content">
                  <span class="first"><strong>{{ item.title }}</strong></span>
                  <span class="second">27.11.2023 (date gelmiyor apiden)</span>
                </div>
              </div>
              <div class="point">
                <span>{{ formatNumber(item.point > 0 ? item.point : 0) }}</span>
              </div>
            </div>
            <table class="table mb-0 table-center">
              <tbody>
                <tr v-for="(item, index) in points" :key="index">
                  <td>{{ item.title }}</td>
                  <td>
                    <span
                      :class="
                        item.title == 'Toplam NAP Puan'
                          ? 'badge-default badge-nap-point'
                          : 'badge-warning'
                      "
                      class="badge rounded"
                    >
                      {{ formatNumber(item.point > 0 ? item.point : 0) }}</span
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="rounded shadow border-bottom p-4 mt-5">
        <div class="row">
          <div class="col-12">
            <h4>NAP Puan Hareketlerim</h4>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label> Başlangıç Tarihi</label>
              <div class="position-relative">
                <input v-model="start_date" class="form-control" type="date" />
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label> Bitiş Tarihi</label>
              <div class="position-relative">
                <input v-model="end_date" class="form-control" type="date" />
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label> Puan Türü</label>
              <div class="position-relative">
                <select
                  v-model="point_type"
                  class="form-control"
                  name="puan-turu"
                >
                  <option
                    v-for="(item, index) in categories"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label>Filtrele</label>
              <div class="position-relative">
                <button class="btn btn-primary" type="button" @click="getItems">
                  Tamam
                </button>
              </div>
            </div>
          </div>
          <div class="table-responsive bg-white">
            <table class="table mb-0 table-center" v-if="loading">
              <loader :loading="loading"></loader>
            </table>
            <table class="table mb-0 table-center" v-else>
              <thead>
                <tr>
                  <th scope="col" class="text-nowrap">Tarih</th>
                  <th scope="col" class="text-nowrap">Nap Puan Türü</th>
                  <th scope="col" class="text-nowrap">Nap Puanı</th>
                  <th scope="col" class="text-nowrap">Kampanya</th>
                  <th scope="col" class="text-nowrap">Durum</th>
                  <th scope="col" class="text-nowrap">Promosyon Kodu</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ item.date }}</td>
                  <td>{{ item.type }}</td>
                  <td class="text-nowrap">{{ formatNumber(item.point) }} Ň</td>
                  <td class="text-center">{{ item.campaign }}</td>
                  <td class="text-center">{{ item.status }}</td>
                  <td class="text-center">{{ item.code }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          v-if="totalPages > 1 && !loading"
          :paginate="paginateData"
          :per-page="perPage"
          @change="getItems"
        />
      </div>
      <div class="rounded shadow border-bottom p-4 mt-5">
        <div class="row">
          <div class="col-12">
            <h4>Kupa Hareketlerim</h4>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label> Başlangıç Tarihi</label>
              <div class="position-relative">
                <input
                  v-model="start_date_cup"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label> Bitiş Tarihi</label>
              <div class="position-relative">
                <input
                  v-model="end_date_cup"
                  class="form-control"
                  type="date"
                />
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label> Kupa Türü</label>
              <div class="position-relative">
                <select
                  v-model="cup_type"
                  class="form-control"
                  name="kupa-turu"
                >
                  <option
                    v-for="(item, index) in cup_categories"
                    :key="index"
                    :value="item.id"
                  >
                    {{ item.name }}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div class="col-lg-3 col-xs-12">
            <div class="form-group">
              <label>Filtrele</label>
              <div class="position-relative">
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="getCupItems"
                >
                  Tamam
                </button>
              </div>
            </div>
          </div>
          <div class="table-responsive bg-white">
            <table class="table mb-0 table-center" v-if="cupsLoading">
              <loader :loading="cupsLoading"></loader>
            </table>
            <table class="table mb-0 table-center" v-else>
              <thead>
                <tr>
                  <th scope="col" class="text-nowrap">Tarih</th>
                  <th scope="col" class="text-nowrap">Kupa Türü</th>
                  <th scope="col" class="text-nowrap">Kupa Sayısı</th>
                  <th scope="col" class="text-nowrap">Kampanya</th>
                  <th scope="col" class="text-nowrap">Durum</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items_cups" :key="index">
                  <td>{{ item.date }}</td>
                  <td>{{ item.type }}</td>
                  <td class="text-nowrap">{{ formatNumber(item.point) }}</td>
                  <td class="text-center">{{ item.campaign }}</td>
                  <td class="text-center">{{ item.status }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <Pagination
          v-if="totalPages_cup > 1 && !cupsLoading"
          :paginate="paginateCupData"
          :per-page="perPage_cup"
          @change="getCupItems"
        />
      </div>
    </div>
  </div>
</template>
  
  <script>
import feather from "feather-icons";
import store from "@/core/services";
import module, {
  BASE_URL,
  CATEGORIES,
  CUP_CATEGORIES,
  ERROR,
  GET_CATEGORIES,
  GET_CUP_CATEGORIES,
  GET_ITEMS,
  GET_POINTS,
  ITEMS,
  LOADING,
  MODULE_NAME,
  POINTS,
  POINTS_LOADING,
  CUPS,
  GET_CUPS,
  CUPS_LOADING,
} from "@/core/services/store/napActions.module";
import moduleAuth, {
  MODULE_NAME as MODULE_NAME_AUTH,
} from "@/core/services/store/auth.module";
import moment from "moment";
import Pagination from "@/view/components/dataTable/Pagination";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_AUTH = MODULE_NAME_AUTH;

export default {
  name: "napTransfers",
  components: { Pagination, Loader },
  beforeCreate() {
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
      start_date: null,
      end_date: null,
      point_type: 0,
      page: 0,
      perPage: 10,
      totalPages: 0,
      totalElements: 0,
      loadingPoints: false,
      start_date_cup: null,
      end_date_cup: null,
      cup_type: 0,
      page_cup: 0,
      perPage_cup: 10,
      totalPages_cup: 0,
      totalElements_cup: 0,
      loadingCups: false,
    };
  },
  computed: {
    paginateData() {
      return {
        current_page: this.page,
        perPage: this.perPage,
        total: this.totalPages,
        totalItems: this.totalElements,
      };
    },
    paginateCupData() {
      return {
        current_page: this.page_cup,
        perPage: this.perPage_cup,
        total: this.totalPages_cup,
        totalItems: this.totalElements_cup,
      };
    },
    categories: {
      get() {
        let results = [{ id: 0, name: "Hepsi" }];
        let items = store.getters[_MODULE_NAME + "/" + CATEGORIES];

        if (items && items.hasOwnProperty("content")) {
          for (let i = 0; i < items.content.length; i++) {
            let item = items.content[i];
            results.push({
              id: item.pointSourceId,
              name: item.userDescription,
              isSuperNap: item.isSuperNap,
              category: item.category,
            });
          }
        }
        return results;
      },
      set(value) {},
    },
    cup_categories: {
      get() {
        let results = [{ id: 0, name: "Hepsi" }];
        let items = store.getters[_MODULE_NAME + "/" + CUP_CATEGORIES];

        if (items && items.hasOwnProperty("content")) {
          for (let i = 0; i < items.content.length; i++) {
            let item = items.content[i];
            results.push({
              id: item.cupSourceId,
              name: item.userDescription,
            });
          }
        }
        return results;
      },
      set(value) {},
    },
    points() {
      return store.getters[_MODULE_NAME + "/" + POINTS];
    },
    cups() {
      return store.getters[_MODULE_NAME + "/" + CUPS];
    },
    items: {
      get() {
        let results = [];
        let items = store.getters[_MODULE_NAME + "/" + ITEMS];

        if (items && items.hasOwnProperty("content")) {
          for (let i = 0; i < items.content.length; i++) {
            let item = items.content[i];

            let type =
              item.pointSourceObject && item.pointSourceObject.userDescription
                ? item.pointSourceObject.userDescription
                : "-";

            try {
              if (Number(item.description) > 0) {
                type = item.description + " - " + type;
              }
            } catch (e) {}
            results.push({
              date: item.insertedDate
                ? moment(item.insertedDate).format("DD.MM.YYYY")
                : "-",
              type: type,
              point: item.point,
              campaign: item.campaignNameObject ? item.campaignNameObject : "-",
              status: item.statusNameObject ? item.statusNameObject : "-",
              code: item.codeNameObject ? item.codeNameObject : "-",
            });
          }
        } else {
          return results;
        }

        this.totalPages = items.totalPages;
        this.totalElements = items.totalElements;

        return results;
      },
      set(value) {},
    },
    items_cups: {
      get() {
        let results = [];
        let items = store.getters[_MODULE_NAME + "/" + CUPS];

        if (items && items.hasOwnProperty("content")) {
          for (let i = 0; i < items.content.length; i++) {
            let type,
              item = items.content[i];

            if (item.cupSourceObject) {
              type =
                item.cupSourceObject && item.cupSourceObject.userDescription
                  ? item.cupSourceObject.userDescription
                  : "-";

              try {
                if (Number(item.description) > 0) {
                  type = item.description + " - " + type;
                }
              } catch (e) {}
            } else {
              type = item.description || "-";
            }
            results.push({
              date: item.creationTime
                ? moment(item.creationTime).format("DD.MM.YYYY")
                : "-",
              type: type,
              point: item.cupQuantity,
              campaign: "-",
              status: "-",
              code: "-",
            });
          }
        } else {
          return results;
        }

        this.totalPages_cup = items.totalPages;
        this.totalElements_cup = items.totalElements;

        return results;
      },
      set(value) {},
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
    loading() {
      return store.getters[_MODULE_NAME + "/" + LOADING];
    },
    pointsLoading() {
      return store.getters[_MODULE_NAME + "/" + POINTS_LOADING];
    },
    cupsLoading() {
      return store.getters[_MODULE_NAME + "/" + CUPS_LOADING];
    },
  },
  methods: {
    getItems(value = null) {
      if (value >= 0) {
        this.page = value;
      }
      this.page = this.page || 0;

      let filters = {
        page: this.page || 0,
        size: this.perPage,
      };

      if (this.start_date) {
        filters.start = this.start_date;
      }

      if (this.point_type) {
        let pointType = this.categories.find(
          (item) => item.id === this.point_type
        );
        if (pointType.isSuperNap) {
          filters.type = pointType.category;
        } else {
          filters.point = this.point_type;
        }
      }

      if (this.end_date) {
        filters.finish = this.end_date;
      }
      this.$store.dispatch(_MODULE_NAME + "/" + GET_ITEMS, {
        url: BASE_URL,
        filters: filters,
      });
    },
    getCupItems(value = null) {
      if (value >= 0) {
        this.page_cup = value;
      }
      this.page_cup = this.page_cup || 0;

      let filters = {
        page: this.page_cup || 0,
        size: this.perPage_cup,
      };

      if (this.start_date_cup) {
        filters.start = this.start_date_cup;
      }

      if (this.cup_type) {
        filters.point = this.cup_type;
      }

      if (this.end_date_cup) {
        filters.finish = this.end_date_cup;
      }

      this.$store.dispatch(_MODULE_NAME + "/" + GET_CUPS, {
        url: "/mobile/memberCup",
        filters: filters,
      });
    },
    getPoints() {
      let filters = {};
      this.$store.dispatch(_MODULE_NAME + "/" + GET_POINTS, {
        url: BASE_URL + "/summary",
        filters: filters,
      });
    },
    getCategories() {
      let filters = {};
      this.$store.dispatch(_MODULE_NAME + "/" + GET_CATEGORIES, {
        url: BASE_URL + "/category",
        filters: filters,
      });
    },
    getCupCategories() {
      let filters = {};
      this.$store.dispatch(_MODULE_NAME + "/" + GET_CUP_CATEGORIES, {
        url: "/mobile/memberCup/category",
        filters: filters,
      });
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = urlParams.get("token");

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("refresh_token", token);
    feather.replace();
    this.getItems();
    this.getCupItems();
    this.getCategories();
    this.getCupCategories();
    this.getPoints();
  },
};
</script>
  
  <style scoped>
.badge-nap-point {
  font-size: 15px !important;
  background-color: #ddd !important;
  color: #161c2d !important;
}

.container {
  display: flex;
  justify-content: space-between;
  box-shadow: 0px 5px 20px 0px #cdcdcd40;
  padding: 16px 8px 16px 16px;
  border-radius: 16px;
}

.survey-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 12px;
  align-self: center;
}

.image-container {
  background-color: #f4f5f7;
  border-radius: 50%;
  padding: 8px;
}

.content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.point {
  align-self: flex-end;
  color: #40c9c0;
  border-radius: 6px;
  padding: 3px 6px 3px 6px;
  background-color: #f1f8f6;
  font-size: 12px;
  font-weight: 700;
}

.first {
  font-weight: 600;
  font-size: 14px;
}

.second {
  font-weight: 400;
  color: #657c9f;
  font-size: 14px;
}
</style>
  