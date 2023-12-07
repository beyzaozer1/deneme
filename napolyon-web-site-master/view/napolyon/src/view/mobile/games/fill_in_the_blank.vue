<template>
  <div class="col-lg-8 col-12">
    <div v-if="pageLoading">
      <loader :loading="pageLoading"></loader>
    </div>
    <div v-else id="game" class="game-container">
      <div class="game-image">
        <img src="/images/mobile/Group 14088.svg" width="45" height="45" />
      </div>
      <p class="description">
        {{ $t("haveFundAndLearn.fill_in_the_blank_desc") }}
      </p>

      <div class="question-container">
        <p class="information" v-html="question?.question_text"></p>
        <div
          v-for="(q1reply, index) in question?.options"
          :key="index"
          class="answer"
        >
          <a href="javascript:void(0)" @click.prevent="reply($event, index)">
            <span class="answer-text">{{ q1reply }}</span>
          </a>
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
    <!-- <div id="game-area" class="row d-flex justify-content-center">
        <div class="col-lg-12 col-md-12 col-12 head-box">
          <h3 class="title">{{ $t("haveFundAndLearn.fill_in_the_blank") }}</h3>
          <p v-show="false" class="description">
            {{ $t("haveFundAndLearn.fill_in_the_blank_desc") }}
          </p>
        </div>

        <transition
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated bounceOutRight"
          name="custom-classes-transition"
        >
          <div v-if="question" class="text-center" style="padding: 15px">
            <div class="col-lg-12 col-md-12 col-12 question text-center">
              <img
                v-if="question.question_image"
                :src="question.question_image"
                width="110"
              />
              <p class="information" v-html="question.question_text"></p>
            </div>
            <div class="container mt-4">
              <div class="row text-center">
                <div
                  v-for="(q1reply, index) in question.options"
                  :key="index"
                  class="col-md-4 col-lg-4 col-4"
                >
                  <a
                    class="btn btn-pills btn-light mt-2 me-2 p-2"
                    href="javascript:void(0)"
                    @click.prevent="reply($event)"
                  >
                    {{ q1reply }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </transition>

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
      </div> -->
    <!-- </div> -->
  </div>
</template>

<script>
import * as external from "@/core/mixin/external";
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
import Swal from "sweetalert2";
import axios from "axios";
import querystring from "querystring";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "fill_in_the_blank",
  components: { Loader },
  data() {
    return {
      pageLoading: false,
      url: "/mobile/fill_in_the_blank",
      start: null,
      quiz: 0,
      questionIndex: 0,
      question: null,
      question_hash: null,
      selectReply: null,
      subjectId: null,
      process_control_block_id: "",
      question_id: null,
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
  methods: {
    getQuestion() {
      let self = this;
      self.pageLoading = true;

      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
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
            subjectId: 2,
            processControlBlockId: this.process_control_block_id,
          };
          axios
            .get(
              process.env.VUE_APP_MOBIL_URL +
                "games_web/get_game_fillblank_question_items.php?" +
                querystring.stringify(params),
              {},
              config
            )
            .then((response) => {
              self.start = null;
              self.pageLoading = false;

              if ((response.data.status = 0)) {
                let item = response.data;
                self.process_control_block_id = item.process_control_block_id;
                self.question = item.questions[0];
                self.start =
                  self.question && self.question.duration
                    ? self.question.duration
                    : 10;
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
      self.pageLoading = true;
      let config = {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods":
            "GET, POST, PATCH, PUT, DELETE, OPTIONS",
          "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
          "Content-Type": "application/json",
        },
      };
      let params = {
        customerId: this.user.memberId,
        processControlBlockId: this.process_control_block_id,
        questionId: self.question.question_id,
        questionText: self.question?.question_text,
        answerText: self.selectReply,
        subjectId: 2,
      };

      axios
        .post(
          process.env.VUE_APP_MOBIL_URL +
            "games_web/send_game_fillblank_question_answer_request.php?" +
            querystring.stringify(params),
          {},
          config
        )
        .then((response) => {
          this.counter = 0;
          self.pageLoading = false;
          this.getQuestion();
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
    reply: function (event) {
      this.reply_content = event.target.innerHTML;
      $("p.information b").html(event.target.innerHTML);
      this.selectReply = event.target.innerHTML;
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
    external.head_link("https://code.jquery.com/jquery-3.6.0.min.js");

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
  max-width: 80%;
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
  border: 1px solid transparent; /* Initially set border as transparent */
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
  min-height: 250px;
  background: #fff;
  border-radius: 14px;
  padding: 15px;
}

.question .information {
  padding-top: 10px;
}

.question .counter-box {
  display: flex;
  justify-content: center;
}

.question .counter {
  text-align: center;
  margin-top: 10px;
  border-radius: 50%;
  padding-left: 7px;
  padding-right: 7px;
  border: 1px solid #e4e4e4;
  position: absolute;
  bottom: -14px;
}
</style>
