<template>
  <div class="col-lg-8 col-12">
    <div v-if="duelLoading">
      <loader :loading="duelLoading"></loader>
    </div>
    <div v-else id="game"
         :style="{ backgroundImage: 'url(assets/images/npbg1.png)'}"
         class="rounded shadow border-bottom p-4"
    >
      <div v-if="status" id="game-area" class="row">
        <div class="col-lg-12 col-md-12 col-12 head-box">
          <h3 class="title">{{ $t('duel.title') }}</h3>
          <div id="timer">{{ start || "Süreniz Bitti" }}</div>
        </div>

        <transition
            enter-active-class="animated fadeInLeft"
            leave-active-class="animated bounceOutRight"
            name="custom-classes-transition"
        >
          <div v-if="question" class="col-lg-12 col-md-12 col-12 question text-center">
            <img v-if="question.question_image" :src="question.question_image" width="110">
            <p class="information">{{ question.question_text }}</p>
            <div class="counter-box">
              <span class="counter">{{ quizIndex }}</span>
            </div>
          </div>

        </transition>

        <div v-for="(item, index) in question.options" class="col-lg-6 col-md-6 col-6 reply" :key="index">
          <a href="javascript:void(0)" v-on:click.prevent="sendAnswer(item)" :class="isAnswerSending ? 'disabled' : ''">
            <div class="question">
              <img v-if="item.option_image" :src="getQuestionAnswerImage(item)" width="60" style="display: inline">
              <span style="display: inline;"> {{ item.option_text }}</span>
            </div>
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
import Swal from "sweetalert2";
import axios from "axios";
import querystring from "querystring";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "join",
  components: { Loader },
  data() {
    return {
      quizIndex: 0,
      proccessControlId: null,
      question: null,
      url: '/mobile/duel/join',
      start: 30,
      status: false,
      quiz: 0,
      counter: 0,
      duel_id: null,
      level: null,
      isAnswerSending: false,
      duelLoading: false,
      defaultAnswer: {
        option_id: 0,
        option_text: 'NOANSWER',
        is_right: 0,
        answer_time: 30,
      },
      config: {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
          'Content-Type': 'application/json',
        }
      }
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
    getQuestionAnswerImage(item) {
      let imageName = '';
      if (item.option_image && item.option_image === 'icon_correct_answer.png') {
        imageName = 'yes.png';
      }
      else if (item.option_image && item.option_image === 'icon_wrong_answer.png') {
        imageName = 'no.png';
      }

      return this.cdnImagePrefix + 'game/'+ imageName.toLowerCase()
    },
    startConfirm: function () {
      let self = this;
      let token = {
        accessToken: localStorage.getItem('token')
      }

      self.duelLoading = true;
      axios.post(process.env.VUE_APP_MOBIL_URL + 'duels_web/check_for_member_valid.php?' + querystring.stringify(token), {}, this.config)
          .then((response) => {
            let params = {
              customerId: this.user.memberId,
            }
            axios.post(process.env.VUE_APP_MOBIL_URL + 'duels_web/send_start_duel_request.php?' + querystring.stringify(params), {}, this.config)
                .then((response) => {
                  self.duelLoading = false;

                  if (response.data.status == 0) {
                    if (response.data.hasOwnProperty('subject_id') && response.data.subject_id != 0) {
                      let subjectId = response.data.subject_id;
                      Swal.fire({
                        html: response.data.content[0],
                        icon: 'success',
                        confirmButtonText: 'Tamam'
                      }).then((response) => {
                        if (response.isConfirmed) {
                          let params = {
                            customerId: this.user.memberId,
                            subjectId: subjectId
                          }
                          self.duelLoading = true;

                          axios.post(process.env.VUE_APP_MOBIL_URL + 'duels_web/send_join_duel_request.php?' + querystring.stringify(params), {}, this.config)
                              .then((response) => {
                                self.duelLoading = false;

                                if (response.data.status == "OK") {
                                  Swal.fire({
                                    html: response.data.message[0],
                                    icon: 'success',
                                    confirmButtonText: 'Tamam'
                                  }).then((response) => {
                                    self.$router.push('/duello')
                                  });
                                }
                              });
                        }
                      });
                    } else {
                      Swal.fire({
                        html: response.data.content[0],
                        icon: 'success',
                        confirmButtonText: 'Tamam'
                      }).then((response) => {
                        self.$router.push('/duello')
                      });
                    }
                  } else if (response.data.status == 1) {

                    self.duelLoading = false;

                    let responseData = response.data;
                    let timerInterval
                    let html = '<div class="text-center">' +
                        '<img src="media/images/icons/icon_time_back.png" width="80">' +
                        '</div>' +
                        '<div class="row overflow-hidden w-100">' +
                        '<div class="col-md-6 overflow-hidden">' +
                        '<img src="' + response.data.content[0][2] + '" style="border: 3px solid black;border-radius: 50%;" width="100"><span class="pt-2 d-block">' + response.data.content[0][1] + '</span>' +
                        '</div>' +
                        '<div class="col-md-6 overflow-hidden">' +
                        '<img src="' + response.data.content[1][2] + '" style="border: 3px solid black;border-radius: 50%;" width="100"><span class="pt-2 d-block">' + response.data.content[1][1] + '</span>' +
                        '</div>' +
                        '<div class="col-md-12 pt-3">Düello Başlıyor</div>' +
                        '</div>';

                    Swal.fire({
                      html: html,
                      timer: 5000,
                      timerProgressBar: true,
                      showConfirmButton: false,
                      didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                          const content = Swal.getHtmlContainer()
                          if (content) {
                            const b = content.querySelector('b')
                            if (b) {
                              b.textContent = Swal.getTimerLeft()
                            }
                          }
                        }, 100)
                      },
                      willClose: () => {
                        clearInterval(timerInterval)
                      }
                    }).then((result) => {
                      self.getQuestion(responseData);
                    })
                  } else {
                    Swal.fire({
                      html: response.data.message,
                      icon: 'success',
                      confirmButtonText: 'Tamam'
                    }).then((response) => {
                      self.$router.push('/duello')
                    });
                  }
                }).catch((error) => {
              self.duelLoading = false;

              Swal.fire({
                html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
                icon: 'error',
                confirmButtonText: 'Tamam'
              }).then((response) => {
                self.$router.push('/eglen-ogren')
              });
            })

          }).catch((error) => {
        Swal.fire({
          html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
          icon: 'error',
          confirmButtonText: 'Tamam'
        }).then((response) => {
          self.$router.push('/eglen-ogren')
        });
      })
    },
    getQuestion: function (response = null) {
      let self = this;

      self.duelLoading = true;

      if (self.proccessControlId == null) {
        self.proccessControlId = response.process_control_block_id
      }

      if (self.level == null) {
        self.level = response.level;
      }

      if (self.duel_id == null) {
        self.duel_id = response.duel_id;
      }

      let params = {
        customerId: self.user.memberId,
        processControlBlockId: self.proccessControlId,
        duelId: self.duel_id,
        level: self.level,
      }

      axios.get(process.env.VUE_APP_MOBIL_URL + 'duels_web/get_duel_question_items.php?' + querystring.stringify(params), {}, this.config)
          .then((response) => {
            if (response.data.status == "0") {
              self.duelLoading = false;

              self.start = 30;
              self.counter = 0;

              self.quizIndex += 1;
              self.status = true;
              self.question = response.data.question[0];
            } else {
              let params = {
                customerId: self.user.memberId,
                processControlBlockId: (self.proccessControlId != null) ? self.proccessControlId : response.data.part3,
              }
              axios.get(process.env.VUE_APP_MOBIL_URL + 'duels_web/get_duel_result_items.php?' + querystring.stringify(params), {}, this.config)
                  .then((response) => {
                    self.duelLoading = false;

                    let result = response.data.result[0];
                    let html = '<br>' +
                        '<div class="row align-items-center mt-3">' +
                        '<div class="col-md-8 offset-2 text-left d-flex justify-content-center" style="border-bottom: 1px solid #0a9c8c;padding-bottom: 5px;">' +
                        '<img src="' + result.user_photo + '" style="border: 2px solid black;border-radius: 50%;" width="60">' +
                        '<div class="d-inline-block pl-3">' +
                        '<span>' + result.user_name + '</span>' +
                        '<h5 style="color:#0a9c8c;">' + result.user_detail + '</h5>' +
                        '</div>' +
                        '</div>' +
/*                        '<div class="col-md-8 mt-3 offset-2 text-left d-flex justify-content-center">' +
                        '<p style="color:#0a9c8c;" class="mt-2" ">' + result.user_level + '</H5>' +
                        '</div>' +*/
                        '</div>';
                    Swal.fire({
                      html: html,
                      imageUrl: 'media/images/l1.png',
                      imageHeight: 100,
                      confirmButtonColor: '#0a9c8c',
                      confirmButtonText: 'Kapat',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        self.$router.push('/duello')
                      }
                    });
                  }).catch((error) => {
                self.duelLoading = false;

                Swal.fire({
                    html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
                    icon: 'error',
                    confirmButtonText: 'Tamam'
                  }).then((response) => {
                    self.$router.push({name: 'user.duel'})
                  });
              })
            }
          }).catch((error) => {
        Swal.fire({
          html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
          icon: 'error',
          confirmButtonText: 'Tamam'
        }).then((response) => {
          self.$router.push({name: 'user.duel'})
        });
      })
    },
    sendAnswer: function (answer) {
      let self = this;
      self.duelLoading = true;
      let params = {
        customerId: self.user.memberId,
        processControlBlockId: self.proccessControlId,
        questionId: self.question.question_id,
        questionText: self.question.question_text,
        answerId: answer.option_id,
        answerText: answer.option_text,
        isRight: answer.is_right,
        duelId: self.duel_id,
        level: self.level,
        answerTime: answer.hasOwnProperty('answer_time') ? answer.answer_time : 30 - this.start,
      }

      if (self.isAnswerSending === true) {
        return false;
      }

      self.isAnswerSending = true;

      axios.post(process.env.VUE_APP_MOBIL_URL + 'duels_web/send_duel_question_answer_request.php?' + querystring.stringify(params), {}, this.config)
          .then((response) => {
            if (response.data.status == "OK") {
              self.isAnswerSending = false;
              this.getQuestion();
            } else {
              self.duelLoading = false;
              self.isAnswerSending = false;
              Swal.fire({
                html: "İşlem yapılırken hata oluştu, daha sonra tekrar deneyiniz",
                icon: 'error',
                confirmButtonText: 'Tamam'
              }).then((response) => {
                self.$router.push({name: 'user.duel'})
              });
            }
          });
    },
    countStart: function () {
      this.counter++;
    },
    timer: function () {
      this.start--;
      if (this.start <= 0) {
        this.start = "Süreniz Bitti"
      }
    },
  },
  mounted() {
    feather.replace();

    let protectedRoute = this.$route.meta.hasOwnProperty("protected") && this.$route.meta.protected === true;
    if (!this.user && protectedRoute) {
      store.dispatch(_MODULE_NAME + '/' + GET_USER);
    }

    external.head_link('https://cdn.jsdelivr.net/npm/animate.css@3.5.1');

    setInterval(this.countStart, 1000);
    setInterval(this.timer, 1000);

    this.startConfirm()
  },
  watch: {
    start(value) {
      if (!value) {
        this.sendAnswer(this.defaultAnswer);
      }
    }
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
