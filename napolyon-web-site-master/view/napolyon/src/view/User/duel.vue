<template>
  <div class="col-lg-8 col-12">
    <div class="rounded shadow border-bottom p-4">
      <div class="row">
        <div class="col-lg-12 col-md-12 col-12">
          <h3>{{$t('duel.title')}}</h3>
        </div>
        <div class="col-lg-4 col-md-6 col-12 mt-2 pt-2 text-center" v-for="(item, index) in menus" :key="index">
          <div class="card pricing-rates business-rate shadow bg-light border-0 rounded">
            <div class="card-body">
              <h6 @click="$router.push({name:'user.duel.'+item.name})" :class="{active: $route.name === 'user.duel.'+item.name}" class="title fw-bold text-uppercase text-primary mb-4">{{ $t('duel.'+item.name) }}</h6>
              <div class="d-flex mb-4 game-box" @click="$router.push({name:'user.duel.'+item.name})" :class="{active: $route.name === 'user.duel.'+item.name}">
                <img :src="mediaBase + '/images/icons/'+item.icon">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from 'feather-icons';
import store from "@/core/services";
import module, {ERROR, GET_USER, MODULE_NAME, PURGE_AUTH, USER} from "@/core/services/store/auth.module";
import userModule, {GET_ITEMS_LEADERSHIP as GET_ITEMS, MODULE_NAME as MODULE_NAME_USER, ITEMS_LEADERSHIP as ITEMS, ERROR as ERROR_USER } from "@/core/services/store/user.module";
const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "duel",

  beforeCreate() {

  },
  data() {
    return {
      url: '/mobile/duel',
      menus:[
        {name: 'join',icon:'duello-join.png'},
        {name: 'my_duel_stats',icon:'duello-istatistik.png'},
        {name: 'winner_week',icon:'duello-haftanin-kazanani.png'},
      ]
    };
  }
  ,
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

  },
  mounted() {
    feather.replace();

    let protectedRoute = this.$route.meta.hasOwnProperty("protected") && this.$route.meta.protected === true;
    if (!this.user && protectedRoute) {
      store.dispatch(_MODULE_NAME + '/' + GET_USER);
    }

    window.scrollTo(0, 0);
  }
}
</script>

<style scoped>
.pricing-rates h6,.game-box{
  cursor: pointer;
}
.game-box{
  text-align: center;
  justify-content: center;
}
.game-box img{

  width: 120px;
  height: 100px;
}
.pricing-rates h6{
  min-height: 48px;
}
</style>
