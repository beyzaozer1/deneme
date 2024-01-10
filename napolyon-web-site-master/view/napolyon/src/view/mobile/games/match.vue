<template>
  <div class="col-lg-8 col-12">
    <!-- <div class="success-screen">
    <div>
      <img src=""/>
    </div>
    <p>Şahane!</p>
    <p>Günün oyununu tamamladın ve 10 Kupa kazandın. Her gün Napolyon'a uğramayı unutma. Çünkü daha çok oyun, daha çok kupa!</p>
  </div> -->
    <div v-if="pageLoading">
      <lottie-animation :animationData="animationData"></lottie-animation>
    </div>
    <div v-else id="game">
      <div v-if="question" id="game-area">
        <div class="game-container">
          <div class="game-image">
            <img src="/images/mobile/Group 14089.svg" width="45" height="45" />
          </div>
          <p class="description">
            Lütfen aşağıdaki kelimeleri doğru olacak şekilde eşleştir.
          </p>
          <div v-if="start" id="timer">{{ start }}</div>
          <div class="question-container">
            <div class="row">
              <div class="col-lg-6 col-md-6 col-6">
                <draggable
                  :disabled="!enabled"
                  :list="list"
                  :move="checkMove"
                  class="list-group"
                  ghost-class="ghost"
                  @end="dragging = false"
                  @start="dragging = true"
                >
                  <div
                    v-for="element in list"
                    :key="element"
                    class="list-group-item"
                  >
                    {{ element }}
                  </div>
                </draggable>
              </div>
              <div id="match_lists" class="col-lg-6 col-md-6 col-6">
                <div
                  v-for="(m_list, index) in match_list"
                  :key="index"
                  class="item"
                >
                  {{ m_list }}
                </div>
              </div>
              <div
                class="col-lg-12 col-md-12 col-12 reply d-flex justify-content-center align-content-center"
              >
                <a
                  class="btn btn-pills btn-light"
                  href="javascript:void(0)"
                  @click.prevent="submitQuiz"
                >
                  Gönder
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div
      v-else
      id="game"
      :style="{ backgroundImage: 'url(assets/images/npbg1.png)' }"
      class="rounded shadow border-bottom p-4"
    >
      <div id="game-area" class="row">
        <div class="col-lg-12 col-md-12 col-12 head-box">
          <h3 class="title">{{ $t("haveFundAndLearn.match") }}</h3>
          <p class="description">{{ $t("haveFundAndLearn.match_desc") }}</p>
        </div>

        <div class="container ml-3 mr-3">
          <div class="row">
            <div class="col-lg-6 col-md-6 col-6">
              <draggable
                :disabled="!enabled"
                :list="list"
                :move="checkMove"
                class="list-group"
                ghost-class="ghost"
                @end="dragging = false"
                @start="dragging = true"
              >
                <div
                  v-for="element in list"
                  :key="element"
                  class="list-group-item"
                >
                  {{ element }}
                </div>
              </draggable>
            </div>
            <div id="match_lists" class="col-lg-6 col-md-6 col-6">
              <div
                v-for="(m_list, index) in match_list"
                :key="index"
                class="item"
              >
                {{ m_list }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="col-lg-12 col-md-12 col-12 reply d-flex fixed-bottom justify-content-center align-content-center position-absolute"
        >
          <a
            class="btn btn-pills btn-light"
            href="javascript:void(0)"
            @click.prevent="submitQuiz"
          >
            Gönder
          </a>
        </div>
      </div>
    </div> -->
</template>

<script>
import * as external from "@/core/mixin/external";
import draggable from "vuedraggable";
import Swal from "sweetalert2";
import feather from "feather-icons";
import store from "@/core/services";
import {
  ERROR,
  GET_USER,
  MODULE_NAME,
  USER,
} from "@/core/services/store/auth.module";
import {
  ITEMS_LEADERSHIP as ITEMS,
  MODULE_NAME as MODULE_NAME_USER,
} from "@/core/services/store/user.module";
import axios from "axios";
import querystring from "querystring";
import LottieAnimation from '../../components/LottieAnimation.vue';


const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "match",
  components: {
    draggable,
    LottieAnimation,
  },
  data() {
    return {
      pageLoading: false,
      url: "/mobile/match",
      enabled: true,
      list: [],
      match_list: [],
      dragging: false,
      processControlBlockId: "",
      question_id: null,
      question_text: null,
      question: null,
      animationData: require('../Loading.json'),
    };
  },
  computed: {
    draggingInfo() {
      return this.dragging ? "under drag" : "";
    },
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
  methods: {
    getQuestion() {
      let self = this;
      self.pageLoading = true;
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, Content-Type, X-Auth-Token, ws_token",
          "Content-Type": "application/json",
        },
      };

      let token = {
        accessToken: localStorage.getItem("token"),
      };

      axios
        .post(
          process.env.VUE_APP_MOBIL_URL +
            "duels_web/check_for_member_valid.php?" +
            querystring.stringify(token),
          {},
          config
        )
        .then((response) => {
          let params = {
            customerId: this.user.memberId,
            subjectId: 3,
            processControlBlockId: self.processControlBlockId,
          };
          axios
            .get(
              process.env.VUE_APP_MOBIL_URL +
                "games_web/get_game_wordmatch_question_items.php?" +
                querystring.stringify(params),
              {},
              config
            )
            .then((response) => {
              self.pageLoading = false;
              if (response.data.status == 0) {
                let item = response.data;
                self.processControlBlockId = item.process_control_block_id;
                self.question_id = item.questions[0].question_id;
                self.question_text = item.questions[0].question_text;
                self.list = item.questions[0].options[0];
                self.match_list = item.questions[0].options[1];
                self.question = item.questions[0];
              } else {
                Swal.fire({
                  html: response.data.message,
                  icon: "success",
                  confirmButtonText: "Tamam",
                }).then((response) => {
                  self.$router.push("/mobil-eglen-ogren");
                });
              }
            })
            .catch((error) => {
              self.pageLoading = false;

              Swal.fire({
                html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
                icon: "error",
                confirmButtonText: "Tamam",
              }).then((response) => {
                self.$router.push("/mobil-eglen-ogren");
              });
            });
        })
        .catch((error) => {
          self.pageLoading = false;

          Swal.fire({
            html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
            icon: "error",
            confirmButtonText: "Tamam",
          }).then((response) => {
            self.$router.push("/mobil-eglen-ogren");
          });
        });
    },
    submitQuiz: function () {
      let self = this;
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers":
            "Origin, Content-Type, X-Auth-Token, ws_token",
          "Content-Type": "application/json",
        },
      };

      self.pageLoading = true;

      let params = {
        customerId: this.user.memberId,
        processControlBlockId: this.processControlBlockId,
        questionId: this.question_id,
        subjectId: 3,
        questionText: this.question_text,
        answerText: this.list.toString(),
      };

      axios
        .post(
          process.env.VUE_APP_MOBIL_URL +
            "games_web/send_game_wordmatch_question_answer_request.php?" +
            querystring.stringify(params),
          {},
          config
        )
        .then((response) => {
          self.pageLoading = false;
          this.counter = 0;
          this.getQuestion();
        })
        .catch((error) => {
          self.pageLoading = false;
          // Swal.fire({
          //   html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
          //   icon: "error",
          //   confirmButtonText: "Tamam",
          // }).then((response) => {
          //   self.$router.push("/mobil-eglen-ogren");
          // });
        });
    },
    add: function () {
      this.list.push({ name: "Juan " + id, id: id++ });
    },
    replace: function () {
      this.list = [{ name: "Edgard", id: id++ }];
    },
    checkMove: function (e) {
      window.console.log("Future index: " + e.draggedContext.futureIndex);
    },
  },
  mounted() {
    feather.replace();

    let protectedRoute =
      this.$route.meta.hasOwnProperty("protected") &&
      this.$route.meta.protected === true;
    if (!this.user && protectedRoute) {
      store.dispatch(_MODULE_NAME + "/" + GET_USER);
    }

    external.head_link("https://cdn.jsdelivr.net/npm/animate.css@3.5.1");
    this.getQuestion();
  },
};
</script>

<style scoped>
.answer-text {
  color: gray;
}
.game-image {
  border-radius: 50%;
  background: rgb(234, 245, 248);
  width: 86px;
  height: 86px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 24px;
}

.information {
  font-size: 20px !important;
  margin-bottom: 30px;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 32px;
}

.description {
  color: gray;
  text-align: center;
  margin-top: 16px;
  margin-bottom: 16px;
  font-size: 16px;
}

.answer {
  background-color: white;
  padding: 12px 24px;
  border-radius: 60px;
  margin-bottom: 10px;
  color: gray;
}

.question-container {
  background: rgb(234, 245, 248);
  width: 100%;
  height: 100%;
  border-radius: 32px;
  display: flex;
  flex-direction: column;
  padding: 32px 24px;
  min-height: 464px;
  margin-bottom: 16px;
}

#timer {
  margin-bottom: 15px;
}

.reply {
  text-align: center;
  margin-top: 25px;
}

.reply span {
  display: block;
  font-weight: bold;
}

.reply img {
  text-align: center;
}

.reply a {
  color: #000;
}

.head-box {
  text-align: center;
}

.question {
  background: #fff;
  border-radius: 14px;
  padding: 15px;
}

.question .counter-box {
  display: flex;
  justify-content: center;
}

.question .counter {
  position: absolute;
  text-align: center;
  margin-top: 5px;
  background-color: #fff;
  border-radius: 50%;
  padding-left: 7px;
  padding-right: 7px;
  border: 1px solid #e4e4e4;
}

#game {
  background-position: center top;
  width: 100%;
  height: 100%;
  background-size: 400px auto;
  overflow: hidden;
}
.buttons {
  margin-top: 35px;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.head-box {
  text-align: center;
}

.reply {
  text-align: center;
  margin-top: 25px;
  margin-bottom: 15px;
}

.reply a {
  color: #000;
}

#match_lists .item {
  position: relative;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 15px;
  padding: 5px 10px;
  border-radius: 10px !important;
  background: rgb(255, 255, 255);
  border: 2px solid #fff;
  color: #000;
  font-weight: 500;
  font-family: "museo500";
  font-size: 14px;
  cursor: pointer;
}

#match_lists .item:before {
  content: "";
  border-top: 0.3rem solid #26bbd9;
  width: 1.4rem;
  position: absolute;
  left: -20px;
  top: 46%;
}

.list-group-item:after {
  content: "";
  border-top: 0.3rem solid #26bbd9;
  width: 1.2rem;
  position: absolute;
  right: -13px;
  top: 46%;
}

.list-group-item {
  position: relative;
  display: block;
  border: 1px solid rgba(0, 0, 0, 0.125);
  margin-bottom: 15px;
  padding: 5px 10px;
  border-radius: 10px !important;
  background: #e7f5f8;
  background: -webkit-gradient(
    linear,
    left top,
    left bottom,
    from(#e7f5f8),
    color-stop(35%, #e7f5f8),
    to(#e7f5f8)
  );
  background: linear-gradient(180deg, #e7f5f8 0%, #e7f5f8 35%, #e7f5f8 100%);
  border: 2px solid #26bbd9;
  color: #26bbd9;
  font-weight: 500;
  font-family: "museo500";
  font-size: 14px;
  cursor: pointer;
}

.success-screen {
  background-color: linear-gradient(
    138.21deg,
    #c3f197 -50.44%,
    #3bfafd 119.72%
  );
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
