<template>
  <div class="d-flex justify-content-center">
    <div class="col-lg-8 col-12">
      <template v-if="loading">
        <loader :loading="loading"></loader>
      </template>
      <template v-else>
        <div
          class="d-flex align-items-center justify-content-center p-4 flex-column"
          v-if="currentUser"
        >
          <div class="tab-tournament">
            <button
              type="button"
              class="tab-detail"
              :class="{ active: isLast }"
              @click="getItems(true)"
            >
              Yeni Turnuva
            </button>
            <button
              type="button"
              class="tab-detail"
              :class="{ active: !isLast }"
              @click="getItems(false)"
            >
              Önceki Turnuva
            </button>
          </div>
        </div>
        <div
          v-if="items"
          class="pink-background-container outer-container d-flex align-items-center justify-content-around"
        >
          <div class="box"></div>
          <div class="box1"></div>
          <div class="absolute winner-container">
            <div class="second">
              <div
                class="mini-icon text-white d-flex align-items-center justify-content-center"
              >
                2
              </div>
              <img
                class="profile-photo relative"
                width="100%"
                height="100%"
                v-if="items.content[1].isPictureActive"
                :src="
                  items.content[1].isPictureActive &&
                  mediaBase + '/images/avatars/' + items.content[1].pictureName
                "
              />
              <div class="profile-photo relative bg-no-image" v-else>
                {{ capitalizeFirstLetter(items.content[1].firstName) }}
              </div>
              <div class="winners-name">
                {{ items.content[1].firstName }} {{ items.content[1].lastName }}
              </div>
              <div class="cup-container">
                <img src="/images/mobile/cup.svg" width="16px" height="16px" />
                <span class="cup-text"
                  >{{ formatNumber(items?.content[1].cupQuantity) }} Kupa</span
                >
              </div>
            </div>
            <div class="first">
              <div
                class="mini-icon-first text-white d-flex align-items-center justify-content-center"
              >
                1
              </div>
              <div>
                <img
                  v-if="items.content[0].isPictureActive"
                  class="profile-photo-first relative"
                  width="100%"
                  height="100%"
                  :src="
                    items.content[0].isPictureActive &&
                    mediaBase +
                      '/images/avatars/' +
                      items.content[0].pictureName
                  "
                />
                <div class="profile-photo-first bg-no-image" v-else>
                  {{ capitalizeFirstLetter(items.content[0].firstName) }}
                </div>
              </div>
              <div class="winners-name">
                {{ items.content[0].firstName }} {{ items.content[0].lastName }}
              </div>
              <div class="cup-container">
                <img src="/images/mobile/cup.svg" width="16px" height="16px" />
                <span class="cup-text"
                  >{{ formatNumber(items.content[0].cupQuantity) }} Kupa</span
                >
              </div>
            </div>
            <div class="third">
              <div
                class="mini-icon text-white d-flex align-items-center justify-content-center"
              >
                3
              </div>
              <div>
                <img
                  class="profile-photo relative"
                  width="100%"
                  height="100%"
                  v-if="items.content[2].isPictureActive"
                  :src="
                    items.content[2].isPictureActive &&
                    mediaBase +
                      '/images/avatars/' +
                      items.content[2].pictureName
                  "
                />
                <div class="profile-photo relative bg-no-image" v-else>
                  {{ capitalizeFirstLetter(items.content[2].firstName) }}
                </div>
              </div>
              <div class="winners-name">
                {{ items.content[2].firstName }} {{ items.content[2].lastName }}
              </div>
              <div class="cup-container">
                <img src="/images/mobile/cup.svg" width="16px" height="16px" />
                <span class="cup-text"
                  >{{ formatNumber(items.content[2].cupQuantity) }} Kupa</span
                >
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="other-items-container">
            <div
              v-for="(item, index) in items?.content?.slice(3)"
              :key="index"
              class="d-flex align-items-center justify-content-between user-container"
            >
              <div class="d-flex align-items-center justify-content-between">
                <div class="queue">{{ index + 4 }}</div>
                <div class="d-flex align-items-center" :style="{ gap: '8px' }">
                  <img
                    v-if="item?.avatar"
                    width="100%"
                    height="100%"
                    class="user-avatar"
                    :src="
                      item?.avatar &&
                      mediaBase + '/images/avatars/' + item?.avatar
                    "
                  />
                  <div v-else class="bg-no-image-queue user-avatar">
                    {{ capitalizeFirstLetter(item?.firstName) }}
                  </div>
                  <div class="user-name">
                    {{ item.firstName }} {{ item.lastName }}
                  </div>
                </div>
              </div>
              <div class="cup-container border">
                <img src="/images/mobile/cup.svg" width="16px" height="16px" />
                <span class="cup-text"
                  >{{ formatNumber(item.cupQuantity) }} Kupa</span
                >
              </div>
            </div>
          </div>
        </div>
        <div
          class="current-user d-flex align-items-center justify-content-between"
        >
          <div class="d-flex align-items-center justify-content-between">
            <div class="queue text-white">
              {{ formatNumber(currentUser?.memberRank) }}
            </div>
            <div class="d-flex align-items-center" :style="{ gap: '8px' }">
              <img
                v-if="userLeadership?.avatar"
                :src="
                  userLeadership.avatar
                    ? mediaBase + '/images/avatars/' + userLeadership.avatar
                    : defaultAvatar
                "
                width="100%"
                height="100%"
                class="user-avatar"
                :alt="currentUser?.firstName + ' ' + currentUser?.lastName"
              />
              <div v-else class="bg-no-image-queue user-avatar">
                {{ capitalizeFirstLetter(currentUser?.firstName) }}
              </div>
              <div class="user-name text-white">
                {{ currentUser?.firstName }} {{ currentUser?.lastName }}
              </div>
            </div>
          </div>
          <div class="cup-container border">
            <img src="/images/mobile/cup.svg" width="16px" height="16px" />
            <span class="cup-text">{{ currentUser?.cupQuantity }}</span>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import store from "@/core/services";
import module, { MODULE_NAME, USER } from "@/core/services/store/auth.module";
import userModule, {
  GET_ITEMS_LEADERSHIP as GET_ITEMS,
  MODULE_NAME as MODULE_NAME_USER,
  ITEMS_LEADERSHIP as ITEMS,
  ERROR as ERROR_USER,
  LOADING_LEADERSHIP,
} from "@/core/services/store/user.module";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "leadership_rank",
  components: { Loader },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }
    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_USER, userModule);
  },
  data() {
    return {
      url: "/mobile/leaderShip",
      isLast: null,
      backgroundColors: [
        "#00d5c3",
        "#ff8d8d",
        "#a1ddff",
        "#ffbda9",
        "#ffa0c2",
        "#ffd888",
        "#dbb0bf",
        "#0de3cf",
        "#e8d431",
        "#11a6ee",
      ],
    };
  },
  computed: {
    userLeadership: {
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
    loading() {
      return store.getters[_MODULE_NAME_USER + "/" + LOADING_LEADERSHIP];
    },
    message() {
      let message = null;
      if (this.items) {
        message = this.items.message;
        message = message.replaceAll("**", "<b>");
        let t = 0;
        message = message.replace(/<b>/g, function (match) {
          t++;
          return t === 2 || t === 4 ? "</b>" : match;
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
      set(value) {},
    },
  },
  methods: {
    capitalizeFirstLetter(text) {
      if (text) return text.charAt(0).toUpperCase();
    },
    getItems(isLast = true) {
      if (this.isLast === isLast) {
        return false;
      }
      this.isLast = isLast;
      this.$store.dispatch(_MODULE_NAME_USER + "/" + GET_ITEMS, {
        url: this.url,
        // headers: {
        //   Authorization: `Bearer ${token}`
        // },
        filters: {
          last: isLast,
          size: 50,
        },
      });
    },
  },
  mounted() {
    const urlParams = new URLSearchParams(window.location.hash.split("?")[1]);
    const token = urlParams.get("token");

    window.localStorage.setItem("token", token);
    window.localStorage.setItem("refresh_token", token);
    feather.replace();
    this.getItems(true);
  },
};
</script>

<style scoped>
.body {
  color: #001d3a;
  font-family: Eina 01;
}
.circle {
  border-radius: 50%;
  width: 110px;
  height: 110px;
  border: 12px solid #fff;
  color: #fff;
  text-align: center;
  box-shadow: 0 10px 25px rgba(60, 72, 88, 0.15) !important;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tab-tournament {
  background-color: #edeff2;
  border-radius: 80px;
  padding: 4px 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 10;
}

.tab-detail {
  border-radius: 40px;
  padding: 4px 16px;
  border: none;
}

.pink-background-container {
  position: relative; /* Set the position of the container to relative */
  background-color: rgb(249, 238, 242);
  border-radius: 32px;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 197px;
  margin-bottom: 16px;
}

.box,
.box1,
.winner-container {
  position: absolute;
  width: 100%; /* Make them fill the entire width of the container */
}

.box {
  height: 10rem;
  background-color: rgb(247, 231, 236);
  border-radius: 0rem 0rem 12rem 12rem;
  -webkit-mask-image: linear-gradient(to bottom, transparent 60%, black 50%);
  mask-image: linear-gradient(to bottom, transparent 60%, black 50%);
  z-index: 2;
  margin-top: -231px;
}

.box1 {
  background-color: rgb(255 233 241);
  border: 1px solid rgb(247, 229, 236);
  border-radius: 0rem 0rem 12rem 12rem;
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 25%,
    rgb(0, 0, 0) 75%
  );
  mask-image: linear-gradient(to bottom, transparent 50%, black 75%);
  height: 196px;
  z-index: 1;
}

.winner-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 5;
  margin-top: 32px;
}

.second,
.first,
.third {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.first {
  margin-bottom: 12px;
}

.profile-photo {
  width: 62px;
  height: 62px;
  border-radius: 50%;
  border: 0px solid black;
}

.profile-photo-first {
  width: 75px;
  height: 75px;
  border-radius: 50%;
  border: 0px solid black;
  z-index: 7;
}

.mini-icon {
  background-color: #f76e9c;
  width: 19.75px;
  height: 19.75px;
  border-radius: 50%;
  font-size: 12px;
  z-index: 7;
  position: absolute;
  bottom: 119px;
}

.mini-icon-first {
  background-color: #f76e9c;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  z-index: 7;
  position: absolute;
  bottom: 130px;
}

.cup-container {
  padding: 4px 8px;
  border-radius: 40px;
  gap: 4px;
  display: flex;
  align-items: center;
  background-color: white;
}
.cup-text {
  font-size: 11px;
  font-weight: 600;
}

.border {
  border: 0.5px solid #001d3a !important;
}

.user-container {
  padding: 8px;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0px 5px 20px 0px rgba(205, 205, 205, 0.25);
  margin-bottom: 8px;
}
.queue {
  width: 42px;
  height: 19px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  margin-right: 4px;
}
.user-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 0px solid black;
}

.user-name {
  font-weight: 400;
  font-size: 14px;
}

.winners-name {
  font-size: 13px;
  font-weight: 600px;
}

.tab-detail.active {
  background-color: white; /* Change this to the desired background color */
}

.current-user {
  padding: 8px 24px 18px 24px;
  width: 100%;
  height: 72px;
  background-color: rgba(227, 92, 128);
  position: fixed;
  bottom: 0;
  left: 0;
}

.bg-no-image-queue {
  background-color: #40c9c0;
  font-size: 22px;
  font-weight: 600;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg-no-image {
  background-color: #40c9c0;
  font-size: 36px;
  font-weight: 600;
  text-align: center;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>