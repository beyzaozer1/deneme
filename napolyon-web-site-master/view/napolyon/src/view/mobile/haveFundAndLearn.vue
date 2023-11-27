<template>
  <div class="d-flex justify-content-center">
    <div class="col-lg-8 col-12">
      <div class="p-2">
        <div class="blue-background-container">
          <img src="/images/mobile/mask-group.png" width="100%" height="100%" />
          <div class="content">
            <div class="user-avatar">
              <img
                src="/images/mobile/emoji-happy.svg"
                width="47px"
                height="47px"
                class="content-image"
              />
            </div>
            <span class="content-p"
              >Hangi oyun tipi ile kazanmak istersin?</span
            >
          </div>
        </div>
        <div
          v-for="(game, index) in games"
          :key="index"
          class="games-container"
        >
          <div
            class="game"
            @click="$router.push({ name: 'index.games.' + game.name })"
            :class="{
              active: $route.name === 'index.games.' + game.name,
            }"
          >
            <div class="game-image">
              <img
                v-if="game.name == 'yes_no'"
                src="/images/mobile/money-add.svg"
                width="28px"
                height="28px"
              />
              <img
                v-else-if="game.name == 'filling_blank'"
                src="/images/mobile/Group 14088.svg"
                width="28px"
                height="28px"
              />
              <img
                v-else
                src="/images/mobile/Group 14089.svg"
                width="28px"
                height="28px"
              />
            </div>
            <h6 class="game-name">
              {{ $t("haveFundAndLearn." + game.name) }}
            </h6>
          </div>
        </div>
        <!-- <div
          class="col-lg-4 col-md-6 col-12 mt-2 pt-2 text-center"
          v-for="(game, index) in games"
          :key="index"
        > -->
        <!-- <div
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
                @click="$router.push({ name: 'index.games.'})"
                :class="{ active: $route.name === 'index.games.' + game.name }"
                class="btn btn-primary mt-4"
                >{{ $t("haveFundAndLearn.play") }}</a
              >
            </div>
          </div> -->
      </div>
      <!-- <div
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
                :class="{
                  active: $route.name === 'index.games.' + game.name,
                }"
                class="title fw-bold text-uppercase text-primary mb-4"
              >
                {{ $t("haveFundAndLearn." + game.name) }}
              </h6>
              <div
                class="d-flex mb-4 game-box"
                @click="$router.push({ name: 'index.games.' + game.name })"
                :class="{
                  active: $route.name === 'index.games.' + game.name,
                }"
              >
                <img :src="mediaBase + '/images/icons/' + game.icon" />
              </div>
              <a
                @click="$router.push({ name: 'index.games.' + game.name })"
                :class="{
                  active: $route.name === 'index.games.' + game.name,
                }"
                class="btn btn-primary mt-4"
                >{{ $t("haveFundAndLearn.play") }}</a
              >
            </div>
          </div>
        </div> -->
      <!-- </div> -->
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
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = urlParams.get("token");

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("refresh_token", token);
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

/*NEW*/
.body {
  color: #001d3a;
  font-family: Eina 01;
}
.blue-background-container {
  height: 197px;
  background-color: rgb(234, 245, 248);
  position: relative; /* Set the position of the container to relative */
  border-radius: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  margin-top: 8px;
}

.content {
  position: absolute;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 0px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
}

.content-image {
  color: #26bbd9;
}

.content-p {
  color: #22aeca;
  font-family: Eina 01;
  font-size: 18px;
  font-weight: 900;
  line-height: 25px;
  text-align: center;
  width: 75%;
  padding: 8px;
}

.games-container {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.game {
  width: 100%;
  height: 89px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 5px 20px 0px #cdcdcd40;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-bottom: 8px;
  padding: 16px;
}

.game-image {
  border-radius: 50%;
  width: 57px;
  height: 57px;
  background: #26bbd91a;
  display: flex;
  align-items: center;
  justify-content: center;
}

.game-name {
  color: #001d3a;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0em;
  margin-top: 8px;
}
</style>
