<template>
  <div class="d-flex justify-content-center">
    <div class="col-lg-8 col-12">
      <div class="rounded shadow border-bottom p-4">
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <h3>{{ $t("haveFundAndLearn.title") }}</h3>
            <p class="description">{{ $t("haveFundAndLearn.description") }}</p>
          </div>
          <div
            class="col-lg-4 col-md-6 col-12 mt-2 pt-2 text-center"
            v-for="(game, index) in games"
            :key="index"
          >
            <div
              class="card pricing-rates business-rate shadow bg-light border-0 rounded"
            >
              <div class="card-body">
                <h6
                  @click="$router.push({ name: 'index.games.' + game.name })"
                  :class="{ active: $route.name === 'index.games.' + game.name }"
                  class="title fw-bold text-uppercase text-primary mb-4"
                >
                  {{ $t("haveFundAndLearn." + game.name) }}
                </h6>
                <div
                  class="d-flex mb-4 game-box"
                  @click="$router.push({ name: 'index.games.' + game.name })"
                  :class="{ active: $route.name === 'index.games.' + game.name }"
                >
                  <img :src="mediaBase + '/images/icons/' + game.icon" />
                </div>
                <a
                  @click="$router.push({ name: 'index.games.' + game.name })"
                  :class="{ active: $route.name === 'index.games.' + game.name }"
                  class="btn btn-primary mt-4"
                  >{{ $t("haveFundAndLearn.play") }}</a
                >
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
  ERROR,
  GET_USER,
  MODULE_NAME,
  PURGE_AUTH,
  USER,
} from "@/core/services/store/auth.module";
import userModule, {
  GET_ITEMS_LEADERSHIP as GET_ITEMS,
  MODULE_NAME as MODULE_NAME_USER,
  ITEMS_LEADERSHIP as ITEMS,
  ERROR as ERROR_USER,
} from "@/core/services/store/user.module";
const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "haveFundAndLearn",

  beforeCreate() {},
  data() {
    return {
      url: "/mobile/haveFundAndLearn",
      games: [
        { name: "yes_no", icon: "evet-hayir.png" },
        { name: "fill_in_the_blank", icon: "bosluk-doldur.png" },
        { name: "match", icon: "eslestir.png" },
      ],
    };
  },
  computed: {
    user: {
      get() {
        return store.getters[_MODULE_NAME + "/" + USER];
      },
      set(value) {},
    },
    items: {
      get() {
        return store.getters[_MODULE_NAME_USER + "/" + ITEMS];
      },
      set(value) {},
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
  },
  methods: {},
  mounted() {
    feather.replace();

    let protectedRoute =
      this.$route.meta.hasOwnProperty("protected") &&
      this.$route.meta.protected === true;
    if (!this.user && protectedRoute) {
      store.dispatch(_MODULE_NAME + "/" + GET_USER);
    }

    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.pricing-rates h6,
.game-box {
  cursor: pointer;
}
.game-box {
  text-align: center;
  justify-content: center;
}
.game-box img {
  width: 120px;
  height: 100px;
}
</style>
