<template>
  <div class="col-lg-8 col-12">
    <div v-if="pageLoading">
      <loader :loading="pageLoading"></loader>
    </div>
    <div v-else id="game"
         :style="{ backgroundImage: 'url(assets/images/npbg1.png)'}"
         class="rounded shadow border-bottom p-4"
    >
      <div v-if="question" id="game-area" class="row d-flex justify-content-center">
        <div class="col-lg-12 col-md-12 col-12 head-box">
          <h3 class="title">{{ $t('haveFundAndLearn.yes_no') }}</h3>
          <p class="description">{{ $t('haveFundAndLearn.yes_no_desc') }}</p>
          <div v-if="start" id="timer">{{ start }}</div>
        </div>

        <transition
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated bounceOutRight"
            name="custom-classes-transition"
        >
          <div class="col-lg-12 col-md-12 col-12 question text-center">
            <img v-if="question.question_image" :src="question.question_image" width="110">
            <p class="information">{{ question.question_text }}</p>
            <div class="counter-box">
              <span class="counter">{{ quiz }}</span>
            </div>
          </div>

        </transition>

        <div v-for="(answer, index) in question.options" v-if="question.options" :key="index"
             class="col-lg-6 col-md-6 col-6 reply">
          <a href="#" @click.prevent="submitQuiz(answer.option_is_right, answer.option_text)">
            <img :src="answer.option_image" width="60">
            <span>{{ answer.option_text }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as external from '@/core/mixin/external'
import feather from 'feather-icons';
import store from "@/core/services";
import {ERROR, GET_USER, MODULE_NAME, USER} from "@/core/services/store/auth.module";
import {ITEMS_LEADERSHIP as ITEMS, MODULE_NAME as MODULE_NAME_USER} from "@/core/services/store/user.module";
import Swal from 'sweetalert2'
import axios from "axios";
import querystring from "querystring";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "yes_no",
  components: {Loader},
  data() {
    return {
      url: '/mobile/yes_no',
      pageLoading: false,
      start: null,
      deger: 0,
      quiz: 0,
      questionIndex: 0,
      question: null,
      question_hash: null,
      counter: 0,
      process_control_block_id: '',
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
    getQuestion() {
      this.quiz++;
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
              subjectId: 1,
              processControlBlockId: self.process_control_block_id
            }
            axios.get(process.env.VUE_APP_MOBIL_URL + 'games_web/get_game_yesno_question_items.php?' + querystring.stringify(params), {}, config)
                .then((response) => {
                  self.pageLoading = false;
                  if (response.data.status == 0) {
                    let item = response.data;
                    self.question = item.questions[0]
                    self.process_control_block_id = item.process_control_block_id;
                  } else {
                    Swal.fire({
                      html: response.data.message,
                      icon: 'success',
                      confirmButtonText: 'Tamam'
                    }).then((response) => {
                      self.$router.push('/eglen-ogren')
                    });
                  }
                })
                .catch((error) => {
                  self.pageLoading = false;

                  Swal.fire({
                    html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
                    icon: 'error',
                    confirmButtonText: 'Tamam'
                  }).then((response) => {
                    self.$router.push('/eglen-ogren')
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
              self.$router.push('/eglen-ogren')
            });
          })
    },
    submitQuiz: function (index, answerText) {
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
      let params = {
        customerId: this.user.memberId,
        processControlBlockId: this.process_control_block_id,
        questionId: this.question.question_id,
        questionText: this.question.question_text,
        answerText: answerText,
        subjectId: 1,
        isRight: index,
      }
      axios.post(process.env.VUE_APP_MOBIL_URL + 'games_web/send_game_yesno_question_answer_request.php?' + querystring.stringify(params), {}, config)
          .then((response) => {
            self.pageLoading = false;

            Swal.fire({
              html: response.data.message,
              icon: 'success',
              confirmButtonText: 'Tamam'
            }).then((response) => {
              self.getQuestion();
            });
          })
          .catch((error) => {
            self.pageLoading = false;

            Swal.fire({
              html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
              icon: 'error',
              confirmButtonText: 'Tamam'
            }).then((response) => {
              self.$router.push('/eglen-ogren')
            });

          })
    },
    timer: function () {
      if (this.start) {
        this.start--;
        if (this.start <= 0) {
          this.start = "Süreniz Bitti"
          window.clearInterval(this.deger)
        }
      }
    },
    countStart: function () {
      this.counter++;
    }
  },
  mounted() {
    feather.replace();
    let protectedRoute = this.$route.meta.hasOwnProperty("protected") && this.$route.meta.protected === true;

    if (!this.user && protectedRoute) {
      store.dispatch(_MODULE_NAME + '/' + GET_USER);
    }

    external.head_link('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');

    this.deger = setInterval(this.timer, 1000);
    setInterval(this.countStart, 1000);

    this.getQuestion();
  },
  destroyed() {
    external.del_link('https://cdn.jsdelivr.net/npm/animate.css@3.5.1')
  }
}
</script>

<style scoped>
#timer {
  margin-bottom: 15px;
  color: #fff;
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

.question .information {
  padding-top: 10px;
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

.title, .description {
  color: #fff;
}

#game {
  background-color: rgb(10 155 140);
  background-position: center top;
  width: 100%;
  height: 530px;
  background-size: 400px auto;
  overflow: hidden;
}
</style>
