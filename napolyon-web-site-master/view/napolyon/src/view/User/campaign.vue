<template>
  <div class="col-lg-8 col-12 ">
    <div class="container-fluid px-0 box-shadow shadow rounded">
      <div v-if="loading">
        <loader :loading="loading"></loader>
      </div>
      <div v-else class="slider single-item">
        <div v-if="item" class="rounded-md">
          <img :src="item.ogImage" alt="" class="img-fluid m-h-275">
          <div class="mt-3 p-2">
            <h5 class="title">{{ item.ogTitle }}</h5>
            <p class="description" v-html="item.ogDescription"></p>
          </div>
          <div class="mt-3 p-2 text-center">
            <a v-if="item.ogUrl" class="btn btn-primary btn-md" href="#" target="_blank"
               @click.prevent="redirectTo(item)">
              Hemen Katıl!
            </a>
          </div>
        </div>
      </div>
    </div>

    <div v-if="item && item.hasOwnProperty('cmpCampaignRedirector') && item.cmpCampaignRedirector.campaignTabs"
         class="rounded shadow border-bottom p-4 vh-100 mt-3 overflow-auto">
      <ul v-if="item.cmpCampaignRedirector.hasOwnProperty('campaignTabs')" id="myTab" class="nav nav-tabs"
          role="tablist">
        <li v-for="(item, index) in item.cmpCampaignRedirector.campaignTabs" :key="index" class="nav-item"
            role="presentation">
          <a :id="'tab-parent-' + item.tabId" :class="index === 0 ? 'active nav-item-active' : ''"
             :href="'#tab-' + item.tabId"
             aria-controls="home" aria-selected="true" class="nav-link" data-toggle="tab"
             role="tab">{{ item.tabTitle }}</a>
        </li>
      </ul>
      <div v-if="item.cmpCampaignRedirector.hasOwnProperty('campaignTabs')" id="myTabContent" class="tab-content mt-3">
        <div v-for="(item, index) in item.cmpCampaignRedirector.campaignTabs" :id="'tab-' + item.tabId" :key="index"
             :aria-labelledby="'tab-' + item.tabId" :class="index === 0 ? 'show active' : ''"
             class="tab-pane fade " role="tabpanel">
          <span v-html="item.tabContent"></span>
        </div>
      </div>
    </div>

    <div class="container-fluid px-0 mt-5">
      <h3 class="text-muted text-center">Diğer Aktif Kampanyalar</h3>
      <template v-if="campaignsLoading">
        <loader :loading="campaignsLoading"></loader>
      </template>
      <template v-else>
        <div v-for="(subItem, index) in campaigns" v-if="item" :key="index"
             class="slider single-item mb-3 mt-3 box-shadow shadow rounded" style="cursor: pointer"
             @click="onClickCampaign(subItem.campaignId)">
          <div class="rounded-md">
            <img :alt="subItem.campaignTitle" :src="subItem.campaignImage" class="img-fluid m-h-275">
            <div class="mt-3 p-2">
              <h5 class="title">{{ subItem.campaignTitle }}</h5>
              <p class="description" v-html="subItem.campaignDescription"></p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div><!--end col-->
</template>
<script>
import ScoreStatus from "@/view/components/ScoreStatus";
import store from "@/core/services";
import module, {ERROR, IS_AUTHENTICATED, MODULE_NAME, USER} from "@/core/services/store/auth.module";
import moduleUser, {
  CAMPAIGNS,
  GET_CAMPAIGNS,
  LOADING_CAMPAIGNS,
  MODULE_NAME as MODULE_NAME_USER
} from "@/core/services/store/user.module";
import feather from 'feather-icons';
import {GET_ITEMS} from "@/core/services/store/rest.module";

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
import Loader from "@/view/components/Loader";
import Swal from "sweetalert2";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "account",
  components: {
    ScoreStatus, VueSlickCarousel, Loader
  },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule)
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_USER, moduleUser);
  },
  computed: {
    invitationLink() {
      if (this.userAccount && this.userAccount.canInvite) {
        return process.env.VUE_APP_APP_URL + '/#/uye-ol?invitationId=' + this.userAccount.memberId
      }
      return null;
    },
    isAuthenticated: {
      get() {
        return store.getters[_MODULE_NAME + '/' + IS_AUTHENTICATED]
      },
      set(value) {
      }
    },
    userAccount: {
      get() {
        return store.getters[_MODULE_NAME + '/' + USER]
      },
      set(value) {
      }
    },
    error() {
      return store.getters[_MODULE_NAME + '/' + ERROR]
    },
    campaignsLoading() {
      return store.getters[_MODULE_NAME_USER + '/' + LOADING_CAMPAIGNS]
    },
    campaigns() {
      let self = this;
      let activeItemId = self.activeItemId;
      let results = [];
      let items = store.getters[_MODULE_NAME_USER + '/' + CAMPAIGNS];
      if (items) {
        items.forEach(item => {
          if (item.campaignId !== Number(activeItemId)) {
            results.push(item);
          }
        })
      }
      return results;
    },
  },
  data() {
    return {
      item: null,
      activeItemId: null,
      loading: true
    };
  },
  mounted() {
    feather.replace();
    let id = this.$route.params.id;

    if (id) {
      this.activeItemId = id;
      this.getCampaignDetail()
    }
  },
  methods: {
    onClickCampaign(id) {
      this.activeItemId = id;
      this.getCampaignDetail();
      window.scrollTo(0, 0);
    },
    getCampaignDetail(id) {
      let self = this;
      self.loading = true;
      let filters = {
        campaignId: this.activeItemId
      }
      self.$store.dispatch(GET_ITEMS, {
        url: '/mobile/member/campaignPage',
        filters: filters,
        returnType: 'stateless',
        isAuthenticated: self.isAuthenticated
      }).then((response) => {
        if (response.status) {
          self.item = response.data;
        } else {
          let error;
          try {
            error = response.data.response.data.content;
          } catch (e) {
            error = "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
          }
          self.showErrorNotification(error)
        }
        self.getCampaings();
        self.loading = false;
      });
    },
    getCampaings() {
      store.dispatch(_MODULE_NAME_USER + '/' + GET_CAMPAIGNS, {
        filters: {}
      });
    },
    redirectTo(item) {
      let self = this;
      if (item.hasOwnProperty('cmpCampaignRedirector')) {
        let url = item.cmpCampaignRedirector.linkUrl;
        if (url && url.includes('napolyon_nt_campaign')) {
          let id = url.split('-')[1];
          this.$router.push({
            name: 'user.nap_transfers',
            params: {type: 2, id: id},
          })
        } else if (url && url.includes(':)')) {
          let id = url.split('-')[1];
          this.$router.push({
            name: 'user.surveys',
            params: {name: this.convertToKebabCase(item.cmpCampaignRedirector.campaignName), id: id, code: id}
          })
        } else {
          let urlPath = item.ogUrl.split("#");
          let result = this.$router.resolve({path: urlPath[1]})
          if (result && result.route.name == 'survey.redirect') {
            let filters = this.urlParser(item.ogUrl);
            self.$store
                .dispatch(GET_ITEMS, {
                  url: "/linkTracker",
                  filters: filters,
                  returnType: "stateless",
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
                      error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
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

          } else if (result && result.route.name !== '404') {
            let params = {};
            if (this.activeItemId == 703) {
              params = {
                linkToDiv: 'invitation-link-id-redirect'
              }
            }
            this.$router.push({name: result.route.name, params: params});
          } else {
            let filters = this.urlParser(item.ogUrl);
            self.$store.dispatch(GET_ITEMS, {
              url: '/linkTracker/customRedirect',
              filters: filters,
              returnType: 'stateless',
              isAuthenticated: self.isAuthenticated
            }).then((response) => {
              if (response.status) {
                let url = response.data;
                window.location.href = url;
              } else {
                let error;
                try {
                  error = response.data.response.data.content;
                } catch (e) {
                  error = "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                }
                self.showErrorNotification(error)
              }
            });
          }
        }
      }
    }
  }
}
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
  background-color: #4267B2 !important;
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

.nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active {
  background: #aaaec4 !important;
  color: white !important;
}
</style>
