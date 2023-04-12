<template>
  <div class="col-lg-4  col-12 d-lg-block ">
    <div class="d-flex justify-content-center" style="width: 100%">
      <button
          aria-controls="collapseMenu"
          aria-expanded="false"
          class="btn btn-primary menu-button-for-collapse"
          data-target="#collapseMenu"
          data-toggle="collapse"
          type="button"
      >
        <div class="d-flex justify-content-around">
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/hesabim.png'"
                alt=""
                class="img-fluid menu-images-1 menu-images"
            />
          </div>
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/gorevlerim.png'"
                alt=""
                class="img-fluid menu-images-2 menu-images"
            />
          </div>
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/nap-transfer.png'"
                alt="M"
                class="img-fluid menu-images-3 menu-images"
            />
          </div>
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/nap-puan.png'"
                alt="E"
                class="img-fluid menu-images-4 menu-images"
            />
          </div>
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/liderlik.png'"
                alt="N"
                class="img-fluid menu-images-5 menu-images"
            />
          </div>
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/eglen-ogren.png'"
                alt="Ü"
                class="img-fluid menu-images-6 menu-images"
            />
          </div>
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/duello.png'"
                alt=""
                class="img-fluid menu-images-7 menu-images"
            />
          </div>
          <div class="menu-button-images">
            <img
                :src="mediaBase + '/images/icons/ayarlar.png'"
                alt=""
                class="img-fluid menu-images-8 menu-images"
            />
          </div>
        </div>
      </button>
    </div>
    <div id="collapseMenu" :class="menuItemsClass">
      <div class="widget">
        <div class="row">
          <div class="col-6" @click="closeToggleMenu">
            <router-link :to="{ name: 'user.nap_actions' }">
              <div class="accounts rounded d-block shadow text-center py-3 settings-items">
                <img
                    :src="mediaBase + '/images/icons/nap-puan.png'"
                    class="nap-point"
                />
                <h6 v-if="point_cup" class="title text-dark h6 my-0">
                  {{
                    point_cup && point_cup[1] && point_cup[1].point
                        ? formatNumber(point_cup[1].point)
                        : 0
                  }}
                </h6>
                <h6 class="title text-dark h6 my-0">{{ $t("setting.nap") }}</h6>
              </div>
            </router-link>
          </div>
          <!--end col-->

          <div class="col-6" @click="closeToggleMenu">
            <router-link :to="{ name: 'user.nap_actions' }">
              <div class="accounts rounded d-block shadow text-center py-3 settings-items">
                <img :src="mediaBase + '/images/icons/kupa.png'" class="nap-point"/>
                <h6 v-if="point_cup" class="title text-dark h6 my-0">
                  {{point_cup && point_cup[0] && point_cup[0].point ? point_cup[0].point : 0 }}
                </h6>
                <h6 class="title text-dark h6 my-0">{{ $t("setting.cup") }}</h6>
              </div>
            </router-link>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <div class="widget mt-4 settings-items-progress">
        <div class="rounded d-block shadow text-center p-3 ">
          <div class="progress-box">
            <h6 class="title text-dark h6 pb-3">
              {{ $t("setting.profile_occupancy") }}
            </h6>
            <div class="progress">
              <div
                  :class="
                  Number(item.profilePercentage < 100)
                    ? 'border-right-radius-none'
                    : ''
                "
                  :style="'width:' + item.profilePercentage + '%;'"
                  aria-valuemax="100"
                  aria-valuemin="0"
                  class="progress-bar position-relative bg-primary settings-items"
                  role="progressbar"
              >
                <div class="progress-value d-block h6 text-dark title">
                  % {{ item.profilePercentage }}
                </div>
              </div>
              <div
                  :class="
                  Number(item.profilePercentage < 100)
                    ? 'border-left-radius-none'
                    : ''
                "
                  :style="
                  'width:' +
                    (100 - Number(item.profilePercentage)).toString() +
                    '%;'
                "
                  aria-valuemax="100"
                  aria-valuemin="0"
                  class="progress-bar position-relative bg-danger settings-items"
                  role="progressbar"
              ></div>
            </div>
          </div>
          <!--end process box-->
        </div>
      </div>
      <div class="widget">
        <div class="row justify-content-around">
          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.account' }"
                         :to="{ name: 'user.account' }"
                         class="accounts rounded d-block shadow text-center py-3">
               <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/hesabim.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.my_account") }}
              </h6>
            </router-link>
          </div>
          <!--end col-->

          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu">
            <router-link :class="{ active: $route.name === 'user.tasks' }"
                         :to="{ name: 'user.tasks' }"
                         class="accounts rounded d-block shadow text-center py-3">
                <span
                    v-if="tasksCount"
                    class="task-count position-absolute badge badge-warning"
                >{{ tasksCount }}</span
                >
              <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/gorevlerim.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.my_task") }}
              </h6>
            </router-link>
          </div>
          <!--end col-->

          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.nap_transfers' }"
                         :to="{ name: 'user.nap_transfers' }"
                         class="accounts rounded d-block shadow text-center py-3">
                <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/nap-transfer.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.nap_transfers") }}
              </h6>
            </router-link>
          </div>
          <!--end col-->

          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.nap_actions' }"
                         :to="{ name: 'user.nap_actions' }"
                         class="accounts rounded d-block shadow text-center py-3">
               <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/nap-puan.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.nap_movement") }}
              </h6>
            </router-link>
          </div>
          <!--end col-->


          <div v-if="false"
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.facebook_nap_box' }"
                         :to="{ name: 'user.facebook_nap_box' }"
                         class="accounts rounded d-block shadow text-center py-3">
               <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/facebook2.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.facebook_nap_box") }}
              </h6>
            </router-link>
          </div>
          <!--end col-->

          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.have_fun_and_learn' }"
                         :to="{ name: 'user.have_fun_and_learn' }"
                         class="accounts rounded d-block shadow text-center py-3">
              <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/eglen-ogren.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.have_fun_and_learn") }}
              </h6>
            </router-link>
          </div>

          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.duel' }"
                         :to="{ name: 'user.duel' }"
                         class="accounts rounded d-block shadow text-center py-3">
              <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/duello.png'"
                    class="nap-point"
                    height="40"
                    width="40"
                />
              </span>
              <h6 class="title text-dark h6 my-0">{{ $t("setting.duel") }}</h6>
            </router-link>
          </div>


          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.leadership_rank' }"
                         :to="{ name: 'user.leadership_rank' }"
                         class="accounts rounded d-block shadow text-center py-3">
                <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/liderlik.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0 px-1" style="font-size: 14px !important;">
                {{ $t("setting.leadership_rank") }}
              </h6>
            </router-link>
          </div>
          <!--end col-->

          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <router-link :class="{ active: $route.name === 'user.setting' }"
                         :to="{ name: 'user.setting' }"
                         class="accounts rounded d-block shadow text-center py-3">
             <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/ayarlar.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.setting") }}
              </h6>
            </router-link>
          </div>
          <!--end col-->

          <div
              class="col-lg-6 col-md-4 col-sm-4 settings-items col-6 mt-4 pt-2"
              @click="closeToggleMenu"
          >
            <a
                class="accounts rounded d-block shadow text-center py-3"
                @click.prevent="logout"
            >
              <span class="pro-icons h3 text-muted">
                <img
                    :src="mediaBase + '/images/icons/cikis-yap.png'"
                    class="nap-point"
                />
              </span>
              <h6 class="title text-dark h6 my-0">
                {{ $t("setting.log_out") }}
              </h6>
            </a>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>

      <div class="widget mt-4 pt-2">
        <h5 class="widget-title">{{ $t("setting.follow") }} :</h5>
        <ul class="list-unstyled social-icon mb-0 mt-4">
          <li class="list-inline-item">
            <a class="rounded" href="https://www.facebook.com/Napolyon/"
            ><i class="fea icon-sm fea-social" data-feather="facebook"></i
            ></a>
          </li>
          <li class="list-inline-item">
            <a
                class="rounded mx-1"
                href="https://www.instagram.com/napolyonapp/"
            ><i class="fea icon-sm fea-social" data-feather="instagram"></i
            ></a>
          </li>
          <li class="list-inline-item">
            <a class="rounded" href="https://twitter.com/napolyonapp"
            ><i class="fea icon-sm fea-social" data-feather="twitter"></i
            ></a>
          </li>
        </ul>
        <!--end icon-->
      </div>
    </div>
  </div>
  <!--end col-->
</template>

<script>
import store from "@/core/services/index";
import module, {LOGOUT, MODULE_NAME} from "@/core/services/store/auth.module";
import userModule, {
  ERROR,
  GET_POINT_CUP,
  MODULE_NAME as MODULE_NAME_USER,
  POINT_CUP,
} from "@/core/services/store/user.module";
import taskModule, {
  BASE_URL as BASE_URL_TASK,
  GET_ITEMS,
  ITEMS as TASKS,
  MODULE_NAME as MODULE_NAME_TASK,
} from "@/core/services/store/task.module";
import Cookies from "js-cookie";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;
const _MODULE_NAME_TASK = MODULE_NAME_TASK;

export default {
  name: "ScoreStatus",
  props: {
    item: {
      required: true,
      default: null,
    },
  },
  data() {
    return {
      windowWidth: 769,
      windowScrollTop: 0,
      menuItemsClass: String,
    };
  },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_USER, userModule);
    registerStoreModule(_MODULE_NAME_TASK, taskModule);
  },
  computed: {
    point_cup() {
      return store.getters[_MODULE_NAME_USER + "/" + POINT_CUP];
    },
    error() {
      return store.getters[_MODULE_NAME_USER + "/" + ERROR];
    },
    tasksCount: {
      get() {
        let items = store.getters[_MODULE_NAME_TASK + "/" + TASKS];
        if (items && items.length) {
          return items.filter((item) => item.isCelebration != 1).length;
        }
        return null;
      },
      set(value) {
      },
    },
  },
  methods: {
    closeToggleMenu() {
      if (this.windowWidth <= 991) {
        $(".menu-button-for-collapse").click();
      }
    },
    updateWindowWidth() {
      this.windowWidth = window.innerWidth;
      this.menuItemsClassFunc();
    },
    updateWindowScroll() {
      this.windowScrollTop = window.pageYOffset;
      this.menuItemsClassFunc();
    },
    menuItemsClassFunc() {
      if (this.windowWidth > 991 && this.windowScrollTop < 1000) {
        this.menuItemsClass = "sidebar p-4 rounded shadow collapse show";
      } else if (this.windowWidth > 991) {
        this.menuItemsClass =
            "sidebar sticky-bar p-4 rounded shadow collapse show";
      } else {
        this.menuItemsClass = "sidebar sticky-bar p-4 rounded shadow collapse";
      }
    },
    logout() {
      Cookies.remove("remember_me");
      Cookies.remove("remember_meS");
      store.dispatch(_MODULE_NAME + "/" + LOGOUT);
      window.location = "/";
    },
    getTasks() {
      this.$store.dispatch(MODULE_NAME_TASK + "/" + GET_ITEMS, {
        url: BASE_URL_TASK + "/allTask",
      });
    },
  },
  mounted() {
    if (!this.point_cup) {
      let filters = {};
      store.dispatch(_MODULE_NAME_USER + "/" + GET_POINT_CUP, {
        url: "/mobile/memberPoint/points",
        filters: filters,
      });
    }

    if (!this.tasks) {
      this.getTasks();
    }
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth);
    window.addEventListener("scroll", this.updateWindowScroll);
  },
  destroyed() {
    window.removeEventListener("resize", this.updateWindowWidth);
    window.removeEventListener("scroll", this.updateWindowScroll);
  },
};
</script>

<style scoped>
.accounts {
  cursor: pointer;
}

.border-right-radius-none {
  border-bottom-right-radius: 0 !important;
  border-top-right-radius: 0 !important;
}

.border-left-radius-none {
  border-bottom-left-radius: 0 !important;
  border-top-left-radius: 0 !important;
}

@media (min-width: 992px) {
  .menu-button-for-collapse {
    display: none;
  }
}

@media (min-width: 768px) and (max-width: 991px) {
  .menu-button-for-collapse {
    margin-top: 0px !important;
  }
}

@media (max-width: 767px) {
  .menu-button-for-collapse {
    margin-top: 70px !important;
  }
}

@media (max-width: 991px) {
  .menu-button-for-collapse {
    display: inline-block;
  }

  .menu-button-for-collapse:hover {
    animation: none;
  }

  .menu-images-1 {
    animation: jumpingIcons 4s linear 0s infinite;
  }

  .menu-images-2 {
    animation: jumpingIcons 4s linear 0.5s infinite;
  }

  .menu-images-3 {
    animation: jumpingIcons 4s linear 1s infinite;
  }

  .menu-images-4 {
    animation: jumpingIcons 4s linear 1.5s infinite;
  }

  .menu-images-5 {
    animation: jumpingIcons 4s linear 2s infinite;
  }

  .menu-images-6 {
    animation: jumpingIcons 4s linear 2.5s infinite;
  }

  .menu-images-7 {
    animation: jumpingIcons 4s linear 3s infinite;
  }

  .menu-images-8 {
    animation: jumpingIcons 3s linear 3.5s infinite;
  }

  .menu-images {
    transition: all 0.5s;
  }

  @keyframes jumpingIcons {
    0% {
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
    5% {
      -webkit-transform: translate(0px, -5px);
      transform: translate(0px, -5px);
    }
    10% {
      -webkit-transform: translate(0px, -10px);
      transform: translate(0px, -10px);
    }
    20% {
      -webkit-transform: translate(0px, -5px);
      transform: translate(0px, -5px);
    }
    30% {
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
    100% {
      -webkit-transform: translate(0px, 0px);
      transform: translate(0px, 0px);
    }
  }
  @keyframes shakingIcons {
    0% {
      -webkit-transform: translate(1px, 1px) rotate(0deg);
      transform: translate(1px, 1px) rotate(0deg);
    }
    10% {
      -webkit-transform: translate(-1px, -2px) rotate(-1deg);
      transform: translate(-1px, -2px) rotate(-1deg);
    }
    20% {
      -webkit-transform: translate(-3px, 0px) rotate(1deg);
      transform: translate(-3px, 0px) rotate(1deg);
    }
    30% {
      -webkit-transform: translate(3px, 2px) rotate(0deg);
      transform: translate(3px, 2px) rotate(0deg);
    }
    40% {
      -webkit-transform: translate(1px, -1px) rotate(1deg);
      transform: translate(1px, -1px) rotate(1deg);
    }
    50% {
      -webkit-transform: translate(-1px, 2px) rotate(-1deg);
      transform: translate(-1px, 2px) rotate(-1deg);
    }
    60% {
      -webkit-transform: translate(-3px, 1px) rotate(0deg);
      transform: translate(-3px, 1px) rotate(0deg);
    }
    70% {
      -webkit-transform: translate(3px, 1px) rotate(-1deg);
      transform: translate(3px, 1px) rotate(-1deg);
    }
    80% {
      -webkit-transform: translate(-1px, -1px) rotate(1deg);
      transform: translate(-1px, -1px) rotate(1deg);
    }
    90% {
      -webkit-transform: translate(1px, 2px) rotate(0deg);
      transform: translate(1px, 2px) rotate(0deg);
    }
    100% {
      -webkit-transform: translate(1px, 1px) rotate(0deg);
      transform: translate(1px, 1px) rotate(0deg);
    }
  }
  @keyframes shakingIconsHover {
    0% {
      -webkit-transform: translate(1px, 1px) rotate(0deg) scale(1.3);
      transform: translate(1px, 1px) rotate(0deg) scale(1.3);
    }
    10% {
      -webkit-transform: translate(-1px, -2px) rotate(-1deg) scale(1.3);
      transform: translate(-1px, -2px) rotate(-1deg) scale(1.3);
    }
    20% {
      -webkit-transform: translate(-3px, 0px) rotate(1deg) scale(1.3);
      transform: translate(-3px, 0px) rotate(1deg) scale(1.3);
    }
    30% {
      -webkit-transform: translate(3px, 2px) rotate(0deg) scale(1.3);
      transform: translate(3px, 2px) rotate(0deg) scale(1.3);
    }
    40% {
      -webkit-transform: translate(1px, -1px) rotate(1deg) scale(1.3);
      transform: translate(1px, -1px) rotate(1deg) scale(1.3);
    }
    50% {
      -webkit-transform: translate(-1px, 2px) rotate(-1deg) scale(1.3);
      transform: translate(-1px, 2px) rotate(-1deg) scale(1.3);
    }
    60% {
      -webkit-transform: translate(-3px, 1px) rotate(0deg) scale(1.3);
      transform: translate(-3px, 1px) rotate(0deg) scale(1.3);
    }
    70% {
      -webkit-transform: translate(3px, 1px) rotate(-1deg) scale(1.3);
      transform: translate(3px, 1px) rotate(-1deg) scale(1.3);
    }
    80% {
      -webkit-transform: translate(-1px, -1px) rotate(1deg) scale(1.3);
      transform: translate(-1px, -1px) rotate(1deg) scale(1.3);
    }
    90% {
      -webkit-transform: translate(1px, 2px) rotate(0deg) scale(1.3);
      transform: translate(1px, 2px) rotate(0deg) scale(1.3);
    }
    100% {
      -webkit-transform: translate(1px, -2px) rotate(-1deg) scale(1.3);
      transform: translate(1px, -2px) rotate(-1deg) scale(1.3);
    }
  }
}

.menu-button-for-collapse {
  width: 80%;
  margin: 20px;
}

.task-count {
  right: 20px;
  top: 15px;
}
</style>
