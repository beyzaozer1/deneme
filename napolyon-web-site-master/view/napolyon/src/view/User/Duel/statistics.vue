<template>
  <div class="col-lg-8 col-12">
    <template v-if="pageLoading">
      <loader :loading="pageLoading"></loader>
    </template>
    <template v-else>
      <div id="game" :style="{ backgroundImage: 'url(assets/images/npbg1.png)'}"
           class="rounded shadow border-bottom p-4">
        <div id="game-area" class="row">
          <div class="col-lg-12 col-md-12 col-12 head-box">
            <h3 class="title">DÜELLO SONUÇLARI</h3>
          </div>
          <transition
              enter-active-class="animated fadeInLeft"
              leave-active-class="animated bounceOutRight"
              name="custom-classes-transition"
          >
            <div class="container">
              <div class="row" style="padding: 15px">
                <div v-for="(item, index) in statics" :key="index" class="col-lg-12 col-md-12 col-12">
                  <div class="question text-center">
                    <div class="row">
                      <div class="col-md-5 col-lg-5 col-5 profile text-right">
                        <strong>{{ item.user_name1 }}</strong>
                        <img :src="item.user_photo1" width="50">
                      </div>
                      <div class="col-md-2 col-lg-2 col-2">
                        <img :src="mediaBase + '/images/vs.png'" width="50">
                      </div>
                      <div class="col-md-5 col-lg-5 col-5 profile text-left">
                        <img :src="item.user_photo2" width="50">
                        <strong>{{ item.user_name2 }}</strong>
                      </div>
                      <div class="col-md-12 col-lg-12 col-12 result">
                        <span>{{ item.message }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="text-center mt-2">
        <button class="btn btn-primary" @click="$router.go(-1)">Geri</button>
      </div>
    </template>
  </div>
</template>

<script>
import * as external from '@/core/mixin/external'
import feather from 'feather-icons';
import store from "@/core/services";
import {ERROR, GET_USER, MODULE_NAME, USER} from "@/core/services/store/auth.module";
import {ITEMS_LEADERSHIP as ITEMS, MODULE_NAME as MODULE_NAME_USER} from "@/core/services/store/user.module";
import Swal from "sweetalert2";
import axios from "axios";
import querystring from "querystring";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "statistics",
  components: {Loader},
  data() {
    return {
      statics: null,
      pageLoading: false,
    };
  },
  computed: {
    user: {
      get() {
        return store.getters[_MODULE_NAME + '/' + USER]
      },
      set(value) {
      }
    },
    items: {
      get() {
        return store.getters[_MODULE_NAME_USER + '/' + ITEMS]
      },
      set(value) {
      }
    },
    error() {
      return store.getters[_MODULE_NAME + '/' + ERROR]
    },
  },
  methods: {
    getStatics() {
      let self = this;
      self.pageLoading = true;
      let config = {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'Content-Type': 'application/json',
        }
      };

      let token = {
        accessToken: localStorage.getItem('token')
      }

      axios.post(process.env.VUE_APP_MOBIL_URL + 'duels_web/check_for_member_valid.php?' + querystring.stringify(token), {}, config)
          .then((response) => {
            let params = {
              customerId: this.user.memberId,
            }
            axios.get(process.env.VUE_APP_MOBIL_URL + 'duels_web/get_duel_statistic_data_list.php?' + querystring.stringify(params), {}, config)
                .then((response) => {
                  self.pageLoading = false;
                  this.statics = response.data.result;
                })
                .catch((error) => {

                  self.pageLoading = false;

                  Swal.fire({
                    html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
                    icon: 'error',
                    confirmButtonText: 'Tamam'
                  }).then((response) => {
                    self.$router.push({name: 'user.duel'})
                  });
                })

          })
          .catch((error) => {

            self.pageLoading = false;

            Swal.fire({
              html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
              icon: 'error',
              confirmButtonText: 'Tamam'
            }).then((response) => {
              self.$router.push({name: 'user.duel'})
            });
          })
    },
  },
  mounted() {
    feather.replace();
    let protectedRoute = this.$route.meta.hasOwnProperty("protected") && this.$route.meta.protected === true;
    if (!this.user && protectedRoute) {
      store.dispatch(_MODULE_NAME + '/' + GET_USER);
    }

    this.getStatics();

    external.head_link('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');
  }
}
</script>

<style scoped>
.information #reply {
  font-weight: bold;
}

.reply {
  text-align: center;
  margin-top: 25px;
  margin-bottom: 15px;
}

.reply a {
  color: #000;
}

.head-box {
  text-align: center;
}

.question {
  min-height: 120px;
  background: #fff;
  border-radius: 14px;
  padding: 15px;
  margin-bottom: 15px;
}

.question .information {
  font-size: 13px;
  color: #767676;
}

.profile strong {
  color: #0a9c8c;
}

.question .result {
  margin-top: 15px;
}

.title, .description {
  color: #fff;
}

#game {
  background-color: rgb(10 155 140);
  background-position: center top;
  width: 100%;
  height: 750px;
  background-size: 400px auto;
  overflow: hidden;
  position: relative;
}

@media screen and (max-width: 768px) {
  .question .profile strong {
    display: block;
  }
}
</style>
