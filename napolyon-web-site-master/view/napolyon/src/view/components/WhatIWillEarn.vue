<template>
  <section
    id="n1"
    class="feature-section padding-top oh padding-bottom pb-lg-half bg_img pos-rel"
    data-background="assets/images/n1/feature-bg.png"
    style="background-image: url('assets/images/n1/feature-bg.png');"
  >
    <div class="top-shape d-md-block ">
      <img
        :src="mediaBase + '/images/n1/top-shape.png'"
        alt="css"
        class="top-shape-height-style"
      />
    </div>
    <div class="bottom-shape d-md-block mw-0">
      <img :src="mediaBase + '/images/n1/bottom-shape.png'" alt="css" />
    </div>
    <div
      class="ball-2"
      data-paroller-factor="-0.30"
      data-paroller-factor-lg="0.60"
      data-paroller-type="foreground"
      data-paroller-direction="horizontal"
    >
      <img :src="mediaBase + '/images/n1/1.png'" alt="balls" />
    </div>
    <div
      class="ball-3"
      data-paroller-factor="0.30"
      data-paroller-factor-lg="-0.30"
      data-paroller-type="foreground"
      data-paroller-direction="horizontal"
    >
      <img :src="mediaBase + '/images/n1/2.png'" alt="balls" />
    </div>
    <div
      class="ball-4"
      data-paroller-factor="0.30"
      data-paroller-factor-lg="-0.30"
      data-paroller-type="foreground"
      data-paroller-direction="horizontal"
    >
      <img :src="mediaBase + '/images/n1/3.png'" alt="balls" />
    </div>
    <div
      class="ball-5"
      data-paroller-factor="0.30"
      data-paroller-factor-lg="-0.30"
      data-paroller-type="foreground"
      data-paroller-direction="vertical"
    >
      <img :src="mediaBase + '/images/n1/4.png'" alt="balls" />
    </div>
    <div
      class="ball-6"
      data-paroller-factor="-0.30"
      data-paroller-factor-lg="0.60"
      data-paroller-type="foreground"
      data-paroller-direction="horizontal"
    >
      <img :src="mediaBase + '/images/n1/5.png'" alt="balls" />
    </div>
    <div
      class="ball-7"
      data-paroller-factor="-0.30"
      data-paroller-factor-lg="0.60"
      data-paroller-type="foreground"
      data-paroller-direction="vertical"
    >
      <img :src="mediaBase + '/images/n1/6.png'" alt="balls" />
    </div>
    <div class="container">
      <div class="section-header cl-white">
        <h2 class="title mt-md-0">{{ $t("index.what_i_will_earn") }}</h2>
        <p>
          {{ $t("index.what_i_will_earn_description") }}
        </p>
      </div>
      <div class="tab">
        <ul class="tab-menu feature-tab ml-n5">
          <li>
            <div class="thumb">
              <img
                @click.prevent="whatIEarnStatus"
                :src="mediaBase + '/images/n1/ne-kazanirim-icon.png'"
                alt="feature"
              />
            </div>
            <div class="content">{{ $t("index.what_i_will_earn") }}</div>
          </li>
          <li>
            <div class="thumb">
              <img
                @click.prevent="napPointStatus"
                :src="mediaBase + '/images/n1/nap-nedir-icon.png'"
                alt="feature"
              />
            </div>
            <div class="content">{{ $t("index.what_is_the_nap_point") }}</div>
          </li>
          <li>
            <div class="thumb">
              <img
                @click.prevent="napPointEarnStatus"
                :src="mediaBase + '/images/n1/nasil-nap-kazanirsin.png'"
                alt="feature"
              />
            </div>
            <div class="content">{{ $t("index.who_can_win_nap_point") }}</div>
          </li>
          <li>
            <div class="thumb">
              <img
                @click.prevent="napPointSpendStatus"
                :src="mediaBase + '/images/n1/nasil-nap-harcarsin.png'"
                alt="feature"
              />
            </div>
            <div class="content">{{ $t("index.who_can_spend_nap_point") }}</div>
          </li>
        </ul>
        <div class="tab-area">
          <div class="tab-item " :class="{ active: whatIEarn }">
            <div class="feature-item">
              <h3 class="title">{{ $t("index.what_i_will_earn") }}</h3>
              <ul class="list-unstyled text-muted">
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{
                    $t(
                      "index.you_earn_NAP_points_for_various_activities_on_Napolyon"
                    )
                  }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.by_using_the_NAP_points_you_have_earned") }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.to_take_advantage_of_these_opportunities") }}
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-item " :class="{ active: napPoint }">
            <div class="feature-item">
              <h3 class="title">{{ $t("index.what_is_the_nap_point") }}</h3>
              <ul class="list-unstyled text-muted">
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.what_is_the_nap_point_description") }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.what_is_the_nap_point_description_1") }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.what_is_the_nap_point_description_2") }}
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-item" :class="{ active: napPointEarn }">
            <div class="feature-item">
              <h3 class="title">{{ $t("index.who_can_win_nap_point") }}</h3>
              <ul class="list-unstyled text-muted">
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.who_can_win_nap_point") }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.who_can_win_nap_point_2") }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.who_can_win_nap_point_3") }}
                </li>
              </ul>
            </div>
          </div>
          <div class="tab-item" :class="{ active: napPointSpend }">
            <div class="feature-item">
              <h3 class="title">{{ $t("index.who_can_spend_nap_point") }}</h3>
              <ul class="list-unstyled text-muted">
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.who_can_spend_nap_point_description") }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.who_can_spend_nap_point_description_1") }}
                </li>
                <li class="mb-0">
                  <span class="text-primary h4 mr-2"
                    ><i class="uil uil-check-circle align-middle"></i
                  ></span>
                  {{ $t("index.who_can_spend_nap_point_description_2") }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "WhatIWillEarn",
  props: {},
  data() {
    return {
      whatIEarn: true,
      napPoint: false,
      napPointEarn: false,
      napPointSpend: false,
    };
  },
  methods: {
    napPointSpendStatus() {
      this.whatIEarn = false;
      this.napPointSpend = true;
      this.napPoint = false;
      this.napPointEarn = false;
    },
    napPointEarnStatus() {
      this.whatIEarn = false;
      this.napPointSpend = false;
      this.napPoint = false;
      this.napPointEarn = true;
    },
    napPointStatus() {
      this.whatIEarn = false;
      this.napPointSpend = false;
      this.napPoint = true;
      this.napPointEarn = false;
    },
    whatIEarnStatus() {
      this.whatIEarn = true;
      this.napPointSpend = false;
      this.napPoint = false;
      this.napPointEarn = false;
    },
  },
};
</script>

<style scoped lang="scss">
@media (max-width: 500px) {
  .top-shape-height-style {
    position: absolute !important;
    top: 2px;
    left: 0px;
  }
}
</style>
