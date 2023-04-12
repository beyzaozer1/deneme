<template>
  <div class="col-lg-8">
    <div v-if="loading">
      <loader :loading="loading"></loader>
    </div>
    <div v-else class="card border-0 rounded shadow">
      <div class="card-body">
        <div
            class="col-lg-12 col-md-10 offset-md-1 offset-lg-0 col-12 d-lg-block"
        >
          <form id="wrapped">
            <div id="middle-wizard">
              <div class="step">
                <template v-if="code == 4">
                  <template v-for="item in questions">
                    <div
                        v-if="item.questionId == 73"
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question1"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="null">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[1] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="
                        item.questionId == 171 &&
                          (form.question1 === 43 ||
                            form.question1 === 42 ||
                            form.question1 === 344)
                      "
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question2"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[2] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="
                        item.questionId == 75 &&
                          (form.question1 === 42 || form.question1 === 344)
                      "
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question3"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[1] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="item.questionId == 77"
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question4"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[1] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="item.questionId == 150"
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question5"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem, subIndex) in item.answerList"
                                :key="subIndex"
                                :value="subItem.answerId"
                                class="survey-option"
                            >
                              {{ subItem.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <hr v-if="item.questionId == 150"/>
                    <div
                        v-if="item.questionId == 175"
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question6"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem, subIndex) in item.answerList"
                                :key="subIndex"
                                :value="subItem.answerId"
                                class="survey-option"
                            >
                              {{ subItem.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="
                        item.questionId == 176 &&
                          form.question6 &&
                          form.question6 != 394
                      "
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question7"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[1] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="
                        item.questionId == 177 &&
                          form.question6 &&
                          form.question6 != 394
                      "
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question8"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[2] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="item.questionId == 329 && form.question7 == 1"
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question9"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[2] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div
                        v-if="item.questionId == 174"
                        :id="'question-' + item.questionId"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="form.question10"
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem, subIndex) in item.answerList"
                                :key="subIndex"
                                :value="subItem.answerId"
                                class="survey-option"
                            >
                              {{ subItem.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                </template>
                <template v-else>
                  <template v-if="relationQuestionId == -102 && questions">
                    <div
                        :id="'question-' + relatedQuestionIds[0]"
                        class="question-parent"
                    >
                      <h4 class="main_question">
                        {{ relatedQuestionTexts[0] }}
                      </h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="level1_item"
                              :data-value="level1_item"
                              class="wide answer form-control"
                              @change="onChangeValue(1, level1_item)"
                          >
                            <option value="null">Seçiniz</option>
                            <option
                                v-for="(item, index) in level1_items"
                                :key="index"
                                :data-value="item.answerId"
                                :value="item.answerId"
                                class="survey-option"
                            >
                              {{ item.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="relatedQuestionIds.length > 1"
                        :id="'question-' + relatedQuestionIds[1]"
                        class="question-parent"
                    >
                      <h4 class="main_question">
                        {{ relatedQuestionTexts[1] }}
                      </h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="level2_item"
                              :data-value="level2_item"
                              class="wide answer form-control"
                              @change="onChangeValue(2, level2_item)"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(item, index) in level2_items"
                                :key="index"
                                :data-value="item.answerId"
                                :value="item.answerId"
                                class="survey-option"
                            >
                              {{ item.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div
                        v-if="relatedQuestionIds.length > 2"
                        :id="'question-' + relatedQuestionIds[2]"
                        class="question-parent"
                    >
                      <h4 class="main_question">
                        {{ relatedQuestionTexts[2] }}
                      </h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="level3_item"
                              :data-value="level3_item"
                              class="wide answer form-control"
                              @change="onChangeValue(2, level3_item)"
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(item, index) in level3_items"
                                :key="index"
                                :data-value="item.answerId"
                                :value="item.answerId"
                                class="survey-option"
                            >
                              {{ item.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-for="item in questions">
                    <div
                        v-if="
                        !item.questionType &&
                          item.answerList &&
                          item.answerList.length &&
                          !selectBoxQuestions.includes(item.questionId)
                      "
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <label
                            v-for="(subItem, subItemIndex) in item.answerList"
                            :key="subItemIndex"
                            class="container_radio version_2 answer"
                        >
                          {{ subItem.answerText }}
                          <input
                              :checked="
                              item.questionId === 12 &&
                                subItem.answerId === user.gender
                            "
                              :name="item.questionId"
                              :value="subItem.answerId"
                              class="required"
                              type="radio"
                              @change="
                              setSelectedOption(
                                item.questionId,
                                subItem.answerId
                              )
                            "
                          />
                          <span class="checkmark"> </span>
                        </label>
                      </div>
                    </div>

                    <div
                        v-if="
                        !item.answerList &&
                          !item.answerObjectList &&
                          item.questionId === 346
                      "
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <input
                            :placeholder="item.questionText"
                            :value="
                            item.questionId === 346 ? user.instagramUserId : ''
                          "
                            class="form-control required answer"
                            type="text"
                        />
                      </div>
                    </div>

                    <div
                        v-else-if="!item.answerList && !item.answerObjectList"
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <input
                            :placeholder="item.questionText"
                            class="form-control required answer"
                            type="text"
                        />
                      </div>
                    </div>

                    <template v-if="item.questionId == 48">
                      <h4 class="main_question d-inline">Cep Telefonunu</h4>
                      <em class="ml-2 d-inline">
                        <span v-if="user.gsmNumber != '9999999999' && user.gsmNumber"> Güncellemek için</span>
                        <span v-else> Aktifleştirmek için</span>
                        <a
                            href="#"
                            @click.prevent="updateGsm"
                        > Tıklayınız</a>
                      </em>
                      <div class="form-group">
                        <input
                            :placeholder="user.gsmNumber != '9999999999' ? user.gsmNumber : ''"
                            class="form-control required answer"
                            v-model="gsmNumber"
                            type="text"
                        />
                      </div>
                    </template>

                    <template
                        v-if="
                        item.answerList &&
                          questionAnswers.filter(
                            (subItem) => subItem.questionId === 62
                          ).length
                      "
                    >
                      <h4 class="main_question d-inline">Cep Tefononu</h4>
                      <div class="form-group">
                        <template v-for="(item, index) in item.answerList">
                          <label class="container_check version_2 answer"
                          >{{ item.answerText }}
                            <input
                                :data-id="item.answerId"
                                :value="item.answerId"
                                class="required"
                                type="checkbox"
                            />
                            <span class="checkmark"></span>
                          </label>
                        </template>
                      </div>
                    </template>

                    <div
                        v-if="
                        item.isCodeData &&
                          item.answerObjectList &&
                          item.answerObjectList.length &&
                          item.questionType != 'CBL'
                      "
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                              @change="
                              setSelectedOption(
                                item.questionId,
                                $event.target.value
                              )
                            "
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem,
                              subIndex) in item.answerObjectList"
                                :key="subIndex"
                                :value="subItem[0]"
                                class="survey-option"
                            >
                              {{ subItem[1] }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="selectBoxQuestions.includes(item.questionId)"
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                        :data-id="item.questionId"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              :data-value="item.questionId"
                              :name="item.questionId"
                              class="wide answer form-control"
                              @change="
                              setSelectedOption(
                                item.questionId,
                                $event.target.value
                              )
                            "
                          >
                            <option value="">Seçiniz</option>
                            <option
                                v-for="(subItem, subIndex) in item.answerList"
                                :key="subIndex"
                                :value="subItem.answerId"
                                class="survey-option"
                            >
                              {{ subItem.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="
                        item.questionType &&
                          item.questionType != 'CBL' &&
                          item.answerList &&
                          item.answerList.length
                      "
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <template v-for="(item, index) in item.answerList">
                          <label class="container_check version_2 answer"
                          >{{ item.answerText }}
                            <input
                                :id="'checkbox-answer-id-' + item.answerId"
                                :data-id="item.answerId"
                                :value="item.answerId"
                                class="required"
                                type="checkbox"
                                @change="
                                setSelectedCheckboxItem(
                                  item.questionId,
                                  item.answerId
                                )
                              "
                            />
                            <span class="checkmark"></span>
                          </label>
                        </template>
                      </div>
                    </div>

                    <div
                        v-else-if="
                        item.questionType &&
                          item.questionType == 'CBL' &&
                          item.answerList &&
                          item.answerList.length
                      "
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <template v-for="(item, index) in item.answerList">
                          <label class="container_check version_2 answer"
                          >{{ item.answerText }}
                            <input
                                :id="'checkbox-answer-id-' + item.answerId"
                                :data-id="item.answerId"
                                :value="item.answerId"
                                class="required"
                                type="checkbox"
                                @change="
                                setSelectedCheckboxItem(
                                  item.questionId,
                                  item.answerId
                                )
                              "
                            />
                            <span class="checkmark"></span>
                          </label>
                        </template>
                      </div>
                    </div>

                    <div
                        v-if="
                        item.questionType == 'CBL' &&
                          item.answerObjectList &&
                          item.answerObjectList.length
                      "
                        :id="'question-' + item.questionId"
                        :class="{
                        'd-none': hiddenQuestionIds.length
                          ? !relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length &&
                            hiddenQuestionIds.includes(item.questionId)
                          : relatedQuestions.filter((questionItem) =>
                              questionItem.questions.includes(item.questionId)
                            ).length,
                      }"
                        class="question-parent"
                    >
                      <h4 class="main_question">{{ item.questionText }}</h4>
                      <div class="form-group">
                        <template
                            v-for="(item, index) in item.answerObjectList"
                        >
                          <label class="container_check version_2 answer"
                          >{{ item[1] }}
                            <input
                                :id="'checkbox-answer-id-' + item[0]"
                                :data-id="item[0]"
                                :value="item[0]"
                                class="required"
                                type="checkbox"
                                @change="
                                setSelectedCheckboxItem(
                                  item.questionId,
                                  item[0]
                                )
                              "
                            />
                            <span class="checkmark"></span>
                          </label>
                        </template>
                      </div>
                    </div>
                  </template>
                  <template
                      v-if="
                      (relationQuestionId == -104 ||
                        relationQuestionId == -103) &&
                        questions
                    "
                  >
                    <div
                        :id="'question-' + relatedQuestionIds[0]"
                        class="question-parent"
                    >
                      <h4 class="main_question">
                        {{ relatedQuestionTexts[0] }}
                      </h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="level1_item"
                              :data-value="level1_item"
                              class="wide answer form-control"
                              @change="onChangeValue(1, level1_item)"
                          >
                            <option
                                v-for="(item, index) in level1_items"
                                :key="index"
                                :data-value="item.answerId"
                                :value="item.answerId"
                                class="survey-option"
                            >
                              {{ item.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div
                        v-if="relatedQuestionIds.length > 1"
                        :id="'question-' + relatedQuestionIds[1]"
                        class="question-parent"
                    >
                      <h4 class="main_question">
                        {{ relatedQuestionTexts[1] }}
                      </h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="level2_item"
                              :data-value="level2_item"
                              class="wide answer form-control"
                              @change="onChangeValue(2, level2_item)"
                          >
                            <option
                                v-for="(item, index) in level2_items"
                                :key="index"
                                :data-value="item.answerId"
                                :value="item.answerId"
                                class="survey-option"
                            >
                              {{ item.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div
                        v-if="relatedQuestionIds.length > 2"
                        :id="'question-' + relatedQuestionIds[2]"
                        class="question-parent"
                    >
                      <h4 class="main_question">
                        {{ relatedQuestionTexts[2] }}
                      </h4>
                      <div class="form-group">
                        <div class="styled-select clearfix">
                          <select
                              v-model="level3_item"
                              :data-value="level3_item"
                              class="wide answer form-control"
                              @change="onChangeValue(2, level3_item)"
                          >
                            <option
                                v-for="(item, index) in level3_items"
                                :key="index"
                                :data-value="item.answerId"
                                :value="item.answerId"
                                class="survey-option"
                            >
                              {{ item.answerText }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div v-if="relationQuestionId == -104" id="question-143">
                      <h4 class="main_question">
                        Aracınızın model yılını giriniz:
                      </h4>
                      <div class="form-group">
                        <input
                            class="form-control required answer"
                            placeholder="Aracınızın model yılını giriniz:"
                            type="text"
                        />
                      </div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
            <div class="form-group">
              <button
                  class="btn btn-warning mr-2 px-3 py-2"
                  type="button"
                  @click="$router.push({ name: 'user.tasks' })"
              >
                Vazgeç
              </button>
              <button
                  class="btn btn-primary px-3 py-2"
                  type="button"
                  @click="save"
              >
                Kaydet
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import store from "@/core/services";
import {CREATE_ITEM, GET_ITEMS, SET_GENERAL_LOADING as SET_LOADING} from "@/core/services/store/rest.module";
import module, {ERROR, GET_USER, IS_AUTHENTICATED, MODULE_NAME, USER, SET_USER} from "@/core/services/store/auth.module";
import taskModule, {MODULE_NAME as MODULE_NAME_TASK,} from "@/core/services/store/task.module";
import userModule, {GET_POINT_CUP, MODULE_NAME as MODULE_NAME_USER,} from "@/core/services/store/user.module";

import * as external from "@/core/mixin/external";
import querystring from "querystring";
import Swal from "sweetalert2";
import Loader from "@/view/components/Loader";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_USER = MODULE_NAME_USER;
const _MODULE_NAME_TASK = MODULE_NAME_TASK;

export default {
  name: "surveys",
  components: {Loader},
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_TASK, taskModule);
    registerStoreModule(_MODULE_NAME_USER, userModule);
  },
  data() {
    return {
      gsmNumber: null,
      gsmCode: null,
      loading: false,
      form: {
        question1: null,
        question2: null,
        question3: null,
        question4: null,
        question5: null,
        question6: null,
        question7: null,
        question8: null,
        question9: null,
        question10: null,
      },
      relationQuestionId: null,
      blankableQuestionIds: [46, 48],
      relationQuestionLevel: [
        {
          id: -102,
          questionIds: [30, 31, 35],
          questions: ["İl", "İlçe", "Mahalle"],
        },
        {
          id: -103,
          questionIds: [62, 64, 65],
          questions: [
            "Üniversite (Lisans)",
            "Fakülte",
            "Üniversite Bölüm:",
          ],
        },
        {
          id: -104,
          questionIds: [142, 164],
          questions: [
            "Hangi marka araç kullanıyorsunuz?",
            "Aracınızın modelini belirtiniz:",
          ],
        },
      ],
      level1_items: [],
      level1_item: null,
      level2_items: [],
      level2_item: null,
      level3_items: [],
      level3_item: null,
      counties: [],
      county: null,
      districts: [],
      district: null,
      questionIds: null,
      questions: null,
      code: null,
      questionAnswers: [],
      selectBoxQuestions: [150, 174, 175, 141],
      cmlBoxQuestions: [200, 201],
      hiddenQuestionIds: [],
      relatedQuestions: [
        {
          questionId: 187,
          answer: [475],
          questions: [188, 208],
        },
        {
          questionId: 58,
          answer: [5, 6, 7, 9],
          questions: [62],
        },
        {
          questionId: 73,
          answer: [43],
          questions: [171],
        },
        {
          questionId: 73,
          answer: [42, 344],
          questions: [171, 75],
        },
        {
          questionId: 345,
          answer: [950],
          questions: [346],
        },
        {
          questionId: 335,
          answer: [920],
          questions: [336],
        },
      ],
    };
  },
  computed: {
    relatedQuestionIds() {
      if (this.relationQuestionId) {
        return this.relationQuestionLevel.find(
            (item) => item.id === this.relationQuestionId
        ).questionIds;
      }
      return [];
    },
    relatedQuestionTexts() {
      if (this.relationQuestionId) {
        return this.relationQuestionLevel.find(
            (item) => item.id === this.relationQuestionId
        ).questions;
      }
      return [];
    },
    user: {
      get() {
        let item = store.getters[_MODULE_NAME + "/" + USER];
        if (item && item.hasOwnProperty("gsmNumber")) {
          item.gsmNumber =
              item.gsmNumber == "9999999999" || !item.gsmNumber
                  ? null
                  : item.gsmNumber;
        }
        return item;
      },
      set(value) {
      },
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
    isAuthenticated() {
      return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
    },
  },
  methods: {
    showGSMCodeSwal() {
      let self = this;
      Swal.fire({
        title: "<h5>Telefon Numarası Güncelleme</h5>",
        input: "text",
        inputLabel: "Numaranıza gönderilen kodu giriniz",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Tamam",
        confirmButtonColor: "#00b6a6",
        cancelButtonColor: "#f17425",
        denyButtonColor: "#387e99",
        cancelButtonText: "Vazgeç",
        denyButtonText: "Tekrar Gönder",
        inputValidator: (value) => {
          if (!value) {
            return "Kodu giriniz";
          }
          self.gsmCode = value;
        },
      }).then((result) => {
        if (result.isConfirmed) {
          store.commit(SET_LOADING, true);

          self.$store
              .dispatch(CREATE_ITEM, {
                url: "/mobile/member/confirmCode",
                contents: {code: self.gsmCode, gsm: self.gsmNumber},
                returnType: "stateless",
                isAuthenticated: self.isAuthenticated,
              })
              .then((response) => {
                store.commit(SET_LOADING, false);
                if (response.status) {
                  self.showSuccessNotification();
                  let tmpUser = self.user;
                  tmpUser.gsmNumber = self.gsmNumber;
                  self.$store.commit(_MODULE_NAME + "/" + SET_USER, tmpUser)
                } else {
                  let error;
                  try {
                    error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  } catch (e) {
                    error =
                        "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                  self.showErrorNotification("Hata Oluştu", error);
                }
              });
        }
        if (result.isDenied) {

          self.$store
              .dispatch(CREATE_ITEM, {
                url: "/mobile/member/getConfirmCode",
                contents: {gsm: self.gsmNumber},
                returnType: "stateless",
                isAuthenticated: self.isAuthenticated,
              })
              .then((response) => {
                if (response.status) {
                  self.showGSMCodeSwal();
                } else {
                  let error;
                  try {
                    error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  } catch (e) {
                    error =
                        "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                  self.showErrorNotification(error);
                }
              });
        }
      });
    },
    updateGsm() {
      let self = this;
      let value = self.gsmNumber;
      if (!value) {
        self.showErrorNotification("Uyarı", "Lütfen Cep Telefonu numaranızı giriniz");
        return;
      }
      if (!Number.isInteger(Number(value))) {
        self.showErrorNotification("Uyarı", "Lütfen rakamlardan oluşan cep telefonu numaranızı giriniz");
        return;
      }
      if (String(value).length !== 10) {
        self.showErrorNotification("Uyarı", "Lütfen cep telefonu numaranızı başında 0 olmadan 10 haneli olarak giriniz");
        return;
      }

      store.commit(SET_LOADING, true);
      self.$store
          .dispatch(CREATE_ITEM, {
            url: "/mobile/member/getConfirmCode",
            contents: {gsm: self.gsmNumber},
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            store.commit(SET_LOADING, false);
            if (response.status) {
              self.showGSMCodeSwal();
            } else {
              let error;
              try {
                error = response.data.response.data.content || "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              } catch (e) {
                error =
                    "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
              }
              self.showErrorNotification(null, error);
            }
          });

    },
    updatePointCup() {
      let filters = {};
      store.dispatch(_MODULE_NAME_USER + "/" + GET_POINT_CUP, {
        url: "/mobile/memberPoint/points",
        filters: filters,
      });
    },
    getUser() {
      store.dispatch(_MODULE_NAME + "/" + GET_USER);
    },
    setSelectedCheckboxItem(questionId, answerId) {
      if (questionId == 337 && answerId == 939) {
        $("#question-" + questionId + " input:checkbox").each(function () {
          if ($(this).data("id") != 939) {
            $(this).prop("checked", false);
          }
        });
        $(
            "#question-" +
            questionId +
            " input:checkbox #checkbox-answer-id-" +
            answerId
        ).prop("checked", true);
      }
      if (questionId == 337 && answerId != 939) {
        $("#question-" + questionId + " input:checkbox").each(function () {
          if ($(this).data("id") == 939) {
            $(this).prop("checked", false);
          }
        });
      }

      if (questionId == 250 && answerId == 715) {
        $("#question-" + questionId + " input:checkbox").each(function () {
          if ($(this).data("id") != 715) {
            $(this).prop("checked", false);
          }
        });
        $(
            "#question-" +
            questionId +
            " input:checkbox #checkbox-answer-id-" +
            answerId
        ).prop("checked", true);
      }
      if (questionId == 250 && answerId != 715) {
        $("#question-" + questionId + " input:checkbox").each(function () {
          if ($(this).data("id") == 715) {
            $(this).prop("checked", false);
          }
        });
      }
    },
    onChangeValue(level = 1, value = null) {
      if (level == 1) {
        this.getLevel2Items();
      }

      if (level == 2) {
        this.getLevel3Items();
      }
    },
    setShowHiddenQuestions(activeQuestion, activeAnswer) {
      let self = this;
      let items = this.relatedQuestions.filter(
          (item) => item.questionId == activeQuestion
      );
      let itemAdded = false;
      if (items) {
        for (let k = 0; k < items.length; k++) {
          let tmpItem = items[k];
          if (tmpItem) {
            self.hiddenQuestionIds = _.uniq(
                self.hiddenQuestionIds.filter(
                    (subItem) => subItem != activeQuestion
                )
            );
            if (tmpItem.answer.includes(activeAnswer)) {
              let tmpQuestionIds = [];
              // Deleted all related questions about question
              for (let m = 0; m < items.length; m++) {
                items[m].questions.forEach((element) => {
                  tmpQuestionIds.push(element);
                });
              }

              for (let i = 0; i < self.hiddenQuestionIds.length; i++) {
                for (let j = 0; j < tmpQuestionIds.length; j++) {
                  if (self.hiddenQuestionIds[i] === tmpQuestionIds[j]) {
                    self.hiddenQuestionIds.splice(i, 1);
                  }
                }
              }

              for (let i = 0; i < tmpItem.questions.length; i++) {
                self.hiddenQuestionIds.push(tmpItem.questions[i]);
              }
              break;
            } else {
              for (let i = 0; i < self.hiddenQuestionIds.length; i++) {
                for (let j = 0; j < tmpItem.questions.length; j++) {
                  if (self.hiddenQuestionIds[i] === tmpItem.questions[j]) {
                    self.hiddenQuestionIds.splice(i, 1);
                  }
                }
              }
            }
          }

          self.hiddenQuestionIds = _.uniq(self.hiddenQuestionIds);
        }
      }
    },
    setSelectedOption(activeQuestion, activeAnswer) {
      // Removing inserted item
      if (this.questionAnswers.length) {
        this.questionAnswers = this.questionAnswers.filter(
            (item) => item.questionId != activeQuestion
        );
      }

      this.questionAnswers.push({
        questionId: activeQuestion,
        answerId: activeAnswer,
      });

      if (
          activeQuestion == 58 &&
          (activeAnswer == 5 ||
              activeAnswer == 6 ||
              activeAnswer == 7 ||
              activeAnswer == 9)
      ) {
        this.relationQuestionId = -103;
        this.getLevel1Items();
      } else if (
          activeQuestion == 58 &&
          !(
              activeAnswer == 5 ||
              activeAnswer == 6 ||
              activeAnswer == 7 ||
              activeAnswer == 9
          )
      ) {
        this.relationQuestionId = null;
      } else if (
          activeQuestion == 141 &&
          (activeAnswer == 228 || activeAnswer == 875)
      ) {
        this.relationQuestionId = -104;
        this.getLevel1Items();
      } else if (
          activeQuestion == 141 &&
          (activeAnswer == 229 || activeAnswer == 876)
      ) {
        this.relationQuestionId = null;
      }
      this.setShowHiddenQuestions(activeQuestion, activeAnswer);
    },
    save() {
      let results = [];
      let questions = this.questions;
      let self = this;

      if (this.code == 4) {
        let question = null;
        question = $("#question-73").length;
        if (question) {
          if (this.form.question1) {
            results.push({
              questionId: 73,
              answer: this.form.question1,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-171").length;
        if (question) {
          if (this.form.question2) {
            results.push({
              questionId: 171,
              answer: this.form.question2,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-75").length;
        if (question) {
          if (this.form.question3) {
            results.push({
              questionId: 75,
              answer: this.form.question3,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-77").length;
        if (question) {
          if (this.form.question4) {
            results.push({
              questionId: 77,
              answer: this.form.question4,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-150").length;
        if (question) {
          if (this.form.question5) {
            results.push({
              questionId: 150,
              answer: this.form.question5,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-175").length;
        if (question) {
          if (this.form.question6) {
            results.push({
              questionId: 175,
              answer: this.form.question6,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-176").length;
        if (question) {
          if (this.form.question7) {
            results.push({
              questionId: 176,
              answer: this.form.question7,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-177").length;
        if (question) {
          if (this.form.question8) {
            results.push({
              questionId: 177,
              answer: this.form.question8,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-329").length;
        if (question) {
          if (this.form.question9) {
            results.push({
              questionId: 329,
              answer: this.form.question9,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
        question = $("#question-174").length;
        if (question) {
          if (this.form.question10) {
            results.push({
              questionId: 174,
              answer: this.form.question10,
              answerType: 1,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
      }
      else {
        for (let i = 0; i < questions.length; i++) {
          let item = questions[i];
          let question = $("#question-" + item.questionId);
          let answerId = null;
          let answerType = 1;
          if (question.is(":visible")) {
            if (
                !item.questionType &&
                item.answerList &&
                item.answerList.length &&
                !self.selectBoxQuestions.includes(item.questionId)
            ) {
              answerId = question.find(".answer input:checked").val();
            }

            if (!item.answerList && !item.answerObjectList) {
              answerId = question.find(".answer").val();

              if (item.questionId == 46 && answerId.length && (answerId.length != 10 || answerId[0] == 0)) {
                this.showErrorNotification(
                    null,
                    "Lütfen Ev Telefon numaranızı başında 0 olmadan, 10 haneli şekilde giriniz"
                );
                return false;
              }

              if (item.questionId == 48 && answerId.length && (answerId.length != 10 || answerId[0] == 0)) {
                this.showErrorNotification(
                    null,
                    "Lütfen İş Telefon numaranızı başında 0 olmadan, 10 haneli şekilde giriniz"
                );
                return false;
              }
              answerType = 2;
            }

            if (item.questionId == 346) {
              answerId = question.find(".answer").val();
              answerType = 2;
            }

            if (
                (item.isCodeData &&
                    item.answerObjectList &&
                    item.answerObjectList.length) ||
                self.selectBoxQuestions.includes(item.questionId)
            ) {
              answerId = question.find(".answer option:selected").val();
            }

            if (
                item.questionType == "CBL" &&
                item.answerList &&
                item.answerList.length
            ) {
              let selectedIds = [];
              question.find(".answer input:checked").each(function () {
                let selectedItemId = $(this).data("id");
                selectedIds.push(selectedItemId);
              });
              answerId = selectedIds.join(",");
            }

            if (
                item.questionType == "CBL" &&
                item.answerObjectList &&
                item.answerObjectList.length
            ) {
              let selectedIds = [];
              question.find(".answer input:checked").each(function () {
                let selectedItemId = $(this).data("id");
                selectedIds.push(selectedItemId);
              });
              answerId = selectedIds.join(",");
            }

            if (answerId) {
              results.push({
                questionId: item.questionId,
                answer: answerId,
                answerType: answerType,
              });
            } else {
              if (!this.blankableQuestionIds.includes(item.questionId)) {
                self.showQuestionError();
                return false;
              }
            }
          }
        }
        if (this.code == 2 && this.user && this.user.hasOwnProperty('gsmNumber') && (this.user.gsmNumber == "9999999999" || this.user.gsmNumber == "" || !this.user.gsmNumber)) {
          self.showQuestionError("Lütfen cep telefonunuzu aktifleştiriniz");
          return false;
        }

        if (this.relationQuestionId) {
          this.relatedQuestionIds.forEach((item) => {
            let question = $("#question-" + item);
            let answer = question.find(".answer option:selected").val();
            if (question.is(":visible")) {
              if (answer) {
                results.push({
                  questionId: item,
                  answer: answer,
                  answerType: 1,
                });
              } else {
                self.showQuestionError();
                return false;
              }
            }
          });
        }

        if (this.relationQuestionId && this.relationQuestionId == -104) {
          let question = $("#question-143");
          let answerId = null;
          answerId = question.find(".answer").val();
          if (answerId) {
            results.push({
              questionId: 143,
              answer: answerId,
              answerType: 2,
            });
          } else {
            self.showQuestionError();
            return false;
          }
        }
      }

      let params = {taskId: self.code};
      store.commit(SET_LOADING, true);
      this.$store
          .dispatch(CREATE_ITEM, {
            url:
                "/mobile/memberInfoTaskEntry/complete?" +
                querystring.stringify(params),
            contents: results,
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            if (response.status) {
              Swal.fire({
                title: "Tebrikler!",
                text: "Görevi başarılı bir şekilde tamamladınız.",
                icon: "success",
                confirmButtonText: "Tamam",
              }).then(() => {
                self.updatePointCup();
                self.getUser();

                if (self.code == 12) {
                  self.updatePointCup();
                }
                self.$router.push({name: "user.tasks"});
              });
            } else {
              let error;
              try {
                error = response.data.response.data.content;
              } catch (e) {
                error =
                    "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz!";
              }
              Swal.fire({
                title: "Hata oluştu!",
                html: error,
                icon: "error",
                confirmButtonText: "Tamam",
              });
            }
            store.commit(SET_LOADING, false);
          });
    },
    parseObjectList(value, index) {
      let item = value.split(",");
      return item[index];
    },
    showQuestionError(message = "Lütfen tüm soruları cevaplayın") {
      Swal.fire({
        title: "",
        html: message,
        icon: "error",
        confirmButtonText: "Tamam",
      });
    },
    getItems() {
      let self = this;
      self.loading = true;
      this.$store
          .dispatch(CREATE_ITEM, {
            url: "/mobile/question/list",
            contents: this.questionIds,
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            self.loading = false;

            if (response.status) {
              this.questions = response.data;

              let params = {taskId: self.code};

              self.$store.dispatch(CREATE_ITEM, {
                url:
                    "/mobile/memberInfoTaskEntry/open?" +
                    querystring.stringify(params),
                contents: {},
                returnType: "stateless",
              });
              external.head_link("/survey/css/menu.css", "survey-menu-css", "custom-css");
              external.head_link("/survey/css/style.css", "survey-style-css", "survey-menu-css");
              external.head_link("/survey/css/vendors.css", "survey-vendors-css", "survey-style-css");
              external.head_link("/survey/css/custom.css", "survey-custom-css", "survey-vendors-css");
            } else {
              self.$router.go("-1");
            }
          });
    },
    getLevel1Items() {
      let self = this;
      let filters = {
        questionId: this.relationQuestionId,
      };
      this.$store
          .dispatch(GET_ITEMS, {
            url: "/mobile/memberInfoTaskEntry/options",
            filters: filters,
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            if (response.status) {
              this.level1_items = response.data;
            }
          });
    },
    getLevel2Items() {
      let self = this;
      let filters = {
        questionId: this.relationQuestionId,
        value: this.level1_item,
        level: 2,
      };
      this.$store
          .dispatch(GET_ITEMS, {
            url: "/mobile/memberInfoTaskEntry/options",
            filters: filters,
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            if (response.status) {
              this.level2_items = response.data.filter(item => item.answerId !== 0);
            }
          });
    },
    getLevel3Items() {
      let self = this;
      let filters = {
        questionId: this.relationQuestionId,
        value: this.level2_item,
        level: 3,
      };
      this.$store
          .dispatch(GET_ITEMS, {
            url: "/mobile/memberInfoTaskEntry/options",
            filters: filters,
            returnType: "stateless",
            isAuthenticated: self.isAuthenticated,
          })
          .then((response) => {
            if (response.status) {
              this.level3_items = response.data.filter(item => item.answerId !== 0);
            }
          });
    },
  },
  mounted() {
    let self = this;
    $(document).on("click", ".styled-select .wide .survey-option", function () {
      let questionId = $(this)
          .parents(".question-parent")
          .data("id");
      let answerId = $(this).attr("id");
      if (questionId && answerId) {
        self.setSelectedOption(questionId, answerId);
      } else {
        self.questionAnswers = self.questionAnswers.filter(
            (item) => item.questionId != questionId
        );
      }
    });

    feather.replace();
    this.code = this.$route.params.id;
    if (!this.code) {
      this.$router.push({name: "user.tasks"});
    } else {
      // getting question ids
      let questionIds = this.profileSurveyQuestionIds.find(
          (questionItem) => questionItem.code == this.code
      );
      if (questionIds) {
        this.questionIds = questionIds.questions;
      }

      this.getItems();

      if (this.code == 2) {
        this.relationQuestionId = -102;
        this.getLevel1Items();
        this.level1_item = self.user.homeCity;
        this.getLevel2Items();
      }
    }
  },
  watch: {
    user: {
      immediate: true,
      handler(value) {
        if (value && value.hasOwnProperty("gsmNumber")) {
          this.gsmNumber =
              value.gsmNumber == "9999999999" || !value.gsmNumber
                  ? null
                  : value.gsmNumber;
        }
      },
    },
  },
  destroyed() {
    external.del_link("/survey/css/menu.css");
    external.del_link("/survey/css/style.css");
    external.del_link("/survey/css/vendors.css");
    external.del_link("/survey/css/custom.css");
  },
};
</script>

<style scoped>
.survey-option {
  font-family: "museo300", sans-serif;
  line-height: 1.5;
}
</style>
