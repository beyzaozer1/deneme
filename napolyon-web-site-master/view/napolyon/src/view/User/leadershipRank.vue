<template>
  <div class="col-lg-8 col-12">
    <template v-if="loading">
      <loader :loading="loading"></loader>
    </template>
    <template v-else>
      <div class="rounded shadow border-bottom p-4">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12" v-if="currentUser">
            <div class="text-center">
              <img :src="userLeadership.avatar ? mediaBase + '/images/avatars/' + userLeadership.avatar : defaultAvatar" class="avatar avatar-medium shadow-lg rounded-pill" :alt="userLeadership.firstName + ' ' + userLeadership.lastName">
              <div class="content">
                <a href="javascript:void(0)" class="h5 text-dark">{{ capitalizeFirstLetter(userLeadership.firstName) }} {{ capitalizeFirstLetter(userLeadership.lastName) }}</a>
                <ul class="list-unstyled social-icon social">
                  <li class="list-inline-item" v-if="currentUser.memberRank">
                    <span class="text-muted">
                      {{ formatNumber(currentUser.memberRank) }}. sıradasınız
                    </span>
                  </li>
                  <li class="list-inline-item mt-3" v-else></li>
                  <li class="list-inline-item text-center" v-if="message">
                    <span class="text-muted" v-html="message"></span>
                  </li>
                  <li class="list-inline-item text-center d-flex justify-content-between">
                    <button type="button" class="btn btn-sm btn-primary" :class="{active: !isLast}" @click="getItems(false)">Önceki Turnuva</button>
                    <button type="button" class="btn btn-sm btn-primary" :class="{active: isLast}" @click="getItems(true)">Yeni Turnuva</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="row" v-if="items">
          <div class="col-lg-12 col-md-12 col-12 text-center" v-for="(item, index) in items.content" :key="index">
            <div class="d-flex align-content-center align-items-center justify-content-center">
              <div class="circle avatar avatar-medium shadow-lg rounded-pill" :style="{ backgroundColor: backgroundColors[index % 10]}"><span>{{ ++index }}</span></div>
            </div>
            <div class="content mb-3 align-items-end">
              <a href="javascript:void(0)" class="h5 text-dark">{{ item.firstName }} {{ item.lastName }}</a>
              <ul class="list-unstyled social-icon social">
                <li class="list-inline-item">
                  <span class="text-muted">{{ formatNumber(item.cupQuantity) }} <i class="mdi mdi-seal icon-ex-md text-primary mb-1 mdi-24px"></i></span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import feather from 'feather-icons';
import store from "@/core/services";
import module, {MODULE_NAME, USER} from "@/core/services/store/auth.module";
import userModule, {GET_ITEMS_LEADERSHIP as GET_ITEMS, MODULE_NAME as MODULE_NAME_USER, ITEMS_LEADERSHIP as ITEMS, ERROR as ERROR_USER, LOADING_LEADERSHIP } from "@/core/services/store/user.module";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "account",
  components: {Loader},
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule)
      }
    }
    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_USER, userModule);
  },
  data() {
    return {
      url: '/mobile/leaderShip',
      isLast: null,
      backgroundColors: ['#00d5c3', '#ff8d8d', '#a1ddff', '#ffbda9', '#ffa0c2', '#ffd888', '#dbb0bf', '#0de3cf', '#e8d431', '#11a6ee']
    };
  },
  computed: {
    userLeadership: {
      get() {
        return store.getters[_MODULE_NAME + '/' + USER]
      },
      set(value) {
      }
    },
    items: {
      get() {
        return store.getters[_MODULE_NAME_USER + '/' + ITEMS];
      },
      set(value) {
      }
    },
    loading() {
      return store.getters[_MODULE_NAME_USER + '/' + LOADING_LEADERSHIP]
    },
    message() {
      let message = null;
      if (this.items) {
        message = this.items.message;
        message = message.replaceAll("**", "<b>");
        let t=0;
        message = message.replace(/<b>/g, function (match) {
          t++;
          return (t === 2) || (t === 4) ? "</b>" : match;
        });
      }
      return message;
    },
    currentUser: {
      get() {
        if (this.items && this.items.content_personel) {
          return this.items.content_personel;
        }
        return null;
      },
      set(value) {
      }
    }
  },
  methods: {
    getItems(isLast = true) {
      if (this.isLast === isLast) {
        return false;
      }
      this.isLast = isLast;
      this.$store.dispatch(_MODULE_NAME_USER + '/' + GET_ITEMS, {
        url: this.url,
        filters: {
          last: isLast,
          size: 50
        }
      });
    },
  },
  mounted() {
    feather.replace();
    this.getItems(true);
  },
}
</script>

<style scoped>
.circle {
  border-radius: 50%;
  width: 110px;
  height: 110px;
  border: 12px solid #fff;
  color: #fff;
  text-align: center;
  box-shadow: 0 10px 25px rgba(60,72,88,0.15) !important;
  display: flex;
  align-items: center;
  justify-content: center;
}
.circle span {
  font-size: 70px;
  font-family: 'Abadi-MT-Condensed', serif;
}
</style>
