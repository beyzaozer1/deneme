<template>
  <div>
    <t-header :nav-light="false"></t-header>
    <div class="app-wrap" id="skrollr-body">
      <div class="skrollr-wrapper">
        <!-- Slide 0 -->
        <section
          class="slide slide-0 front-page"
          id="start"
          data-nav="Intro"
          data-0=""
        >
          <div class="slide-container">
            <div class="introduction">
              <div class="page-title-intro">
                <img src="/images/nap_primary.png" alt="" />
              </div>
              <h1 class="page-title">
                {{
                  $t(
                    "howToWin.turkey_first_and_largest_online_research_platform"
                  )
                }}
              </h1>
            </div>
            <a class="next-slide" href="#1950" data-position="1000"
              ><i data-feather="chevrons-down" class="fea icon-sm"> </i
            ></a>
          </div>
        </section>
        <!-- Slide 1 -->
        <section
          class="circle-mask abs-centered slide slide-1"
          id="1950"
          data-nav="1950"
          data-0="width:0%;height:0%;"
          data-1000="width:100%;height:100%;"
        >
          <div class="container">
            <aside class="about">
              <h2 class="mb-3">{{ $t("howToWin.sing_up_free") }}</h2>
              <p class="mb-0" data-700="opacity: 0;" data-750="opacity: 1;">
                {{
                  $t("howToWin.click_on_the_Register_button_on_the_home")
                }}.<br />{{
                  $t("howToWin.fill_in_all_fields_on_the_membership_form")
                }}
              </p>
              <p class="mb-0" data-750="opacity:0;" data-800="opacity:1;">
                {{
                  $t(
                    "howToWin.login_to_the_site_with_your_password_by_clickingt_he_link"
                  )
                }}
              </p>
              <p class="mb-0" data-800="opacity:0;" data-850="opacity:1;">
                {{
                  $t(
                    "howToWin.complete_all_fields_on_the_my_Profile_information_page_in_order"
                  )
                }}
              </p>
            </aside>

            <div class="images">
              <div class="img-wrap">
                <img
                  :src="mediaBase + '/nasil-kazanirim/images/1-top.png'"
                  alt="1950s Interior Design Illustration"
                />
              </div>
              <div class="floor">
                <div class="img-wrap">
                  <img
                    :src="mediaBase + '/nasil-kazanirim/images/1-bottom.png'"
                    alt="1950s Interior Design Illustration"
                  />
                </div>
              </div>
            </div>
            <a class="next-slide" href="#" data-position="2000"
              ><i data-feather="chevrons-down" class="fea icon-sm"> </i
            ></a>
          </div>
        </section>
        <!-- Slide 2 -->
        <section
          class="circle-mask abs-centered slide slide-2"
          id="1960"
          data-nav="1960"
          data-1000="width:0%;height:0%;"
          data-2000="width:100%;height:100%;"
        >
          <div class="container">
            <aside class="about">
              <h2>{{ $t("howToWin.fill_your_profile_information") }}</h2>
              <p data-1700="opacity: 0;" data-1900="opacity: 1;">
                {{
                  $t(
                    "howToWin.do_not_miss_the_chance_to_share_your_opinions_on_topics_that_interest_you"
                  )
                }}
              </p>
              <p data-1900="opacity: 0;" data-1950="opacity: 1;">
                {{
                  $t(
                    "howToWin.you_can_fill_out_your_profile_information_by_completing_the_steps_below"
                  )
                }}
              </p>
              <p data-1950="opacity: 0;" data-2000="opacity: 1;">
                {{
                  $t(
                    "howToWin.click_on_profile_information_from_the_left_menu_by_logging_into_the_site"
                  )
                }}
              </p>
              <p data-2000="opacity: 0;" data-2050="opacity: 1;">
                {{
                  $t(
                    "howToWin.complete_all_fields_on_the_my_profile_information_page_in_order_fill_more_questionnaires"
                  )
                }}
              </p>
            </aside>

            <div class="images">
              <div class="img-wrap">
                <img
                  :src="mediaBase + '/nasil-kazanirim/images/2-top.png'"
                  alt="1960s Interior Design Illustration"
                />
              </div>
              <div class="floor">
                <div class="img-wrap">
                  <img
                    :src="mediaBase + '/nasil-kazanirim/images/2-bottom.png'"
                    alt="1960s Interior Design Illustration"
                  />
                </div>
              </div>
            </div>
            <a class="next-slide" href="#" data-position="3000"
              ><i data-feather="chevrons-down" class="fea icon-sm"> </i
            ></a>
          </div>
        </section>
        <!-- Slide 3 -->
        <section
          class="circle-mask abs-centered slide slide-3"
          id="1970"
          data-nav="1970"
          data-2000="width:0%;height:0%;"
          data-3000="width:100%;height:100%;"
        >
          <div class="container">
            <aside class="about">
              <h2>{{ $t("howToWin.participate_in_surveys") }}</h2>
              <p data-2700="opacity: 0;" data-2900="opacity: 1;">
                {{ $t("howToWin.napolyon_com_description") }}
              </p>
            </aside>

            <div class="images">
              <div class="img-wrap">
                <img
                  :src="mediaBase + '/nasil-kazanirim/images/3-top.png'"
                  alt="1970s Interior Design Illustration"
                />
              </div>
              <div class="floor">
                <div class="img-wrap">
                  <img
                    :src="mediaBase + '/nasil-kazanirim/images/3-bottom.png'"
                    alt="1970s Interior Design Illustration"
                  />
                </div>
              </div>
            </div>
            <a class="next-slide" href="#" data-position="4000"
              ><i data-feather="chevrons-down" class="fea icon-sm"> </i
            ></a>
          </div>
        </section>
        <!-- Slide 4 -->
        <section
          class="circle-mask abs-centered slide slide-4"
          id="1980"
          data-nav="1980"
          data-3000="width:0%;height:0%;"
          data-4000="width:100%;height:100%;"
        >
          <div class="container">
            <aside class="about">
              <h2>{{ $t("howToWin.send_invitation") }}</h2>
              <p data-3700="opacity: 0;" data-3900="opacity: 1;">
                {{ $t("howToWin.send_invitation_description_1") }}
              </p>
              <p data-3900="opacity: 0;" data-3950="opacity: 1;">
                {{ $t("howToWin.send_invitation_description_2") }}
              </p>
              <p data-3950="opacity: 0;" data-4000="opacity: 1;">
                {{ $t("howToWin.send_invitation_description_3") }}
              </p>
              <p data-4000="opacity: 0;" data-4050="opacity: 1;">
                {{ $t("howToWin.send_invitation_description_4") }}
              </p>
            </aside>

            <div class="images">
              <div class="img-wrap">
                <img
                  :src="mediaBase + '/nasil-kazanirim/images/4-top.png'"
                  alt="1980s Interior Design Illustration"
                />
              </div>
              <div class="floor">
                <div class="img-wrap">
                  <img
                    :src="mediaBase + '/nasil-kazanirim/images/4-bottom.png'"
                    alt="1980s Interior Design Illustration"
                  />
                </div>
              </div>
            </div>
            <a class="next-slide" href="#" data-position="5000"
              ><i data-feather="chevrons-down" class="fea icon-sm"> </i
            ></a>
          </div>
        </section>
        <!-- Slide 5 -->
        <section
          class="circle-mask abs-centered slide slide-5"
          id="1990"
          data-nav="1990"
          data-4000="width:0%;height:0%;"
          data-5000="width:100%;height:100%;"
        >
          <div class="container">
            <aside class="about">
              <h2>{{ $t("howToWin.evaluate_NAP_scores") }}</h2>
              <p data-4700="opacity: 0;" data-4900="opacity: 1;">
                {{ $t("howToWin.evaluate_NAP_scores_description") }}
              </p>
            </aside>

            <div class="images">
              <div class="img-wrap">
                <img
                  :src="mediaBase + '/nasil-kazanirim/images/5-top.png'"
                  alt="1990s Interior Design Illustration"
                />
              </div>
              <div class="floor">
                <div class="img-wrap">
                  <img
                    :src="mediaBase + '/nasil-kazanirim/images/5-bottom.png'"
                    alt="1990s Interior Design Illustration"
                  />
                </div>
              </div>
            </div>
            <a class="next-slide" href="#" data-position="6000"
              ><i data-feather="chevrons-down" class="fea icon-sm"> </i
            ></a>
          </div>
        </section>
      </div>

      <section
        class="slide slide-last"
        id="thank-you"
        data-nav="Credits"
        data-6000="top: 100%;"
        data-7000="top: 45%;"
      >
        <footer class="footer footer-body bg-light">
          <div class="container">
            <div class="row">
              <div class="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
                <a href="#" class="logo-footer">
                  <img src="images/nap_primary.png" alt="" />
                </a>
                <p class="mt-4 text-muted">
                  Napolyon.com, ilgi alanlarınıza göre araştırmaları, izniniz
                  doğrultusunda size ulaştırır. Katılmış olduğunuz
                  araştırmalardan kazandığınız NAP Puanları harcarken, indirimli
                  kampanyalardan faydalanma fırsatı sunar, ayrıcalık ve zaman
                  kazandırır.
                </p>
                <ul class="list-unstyled social-icon social mb-0 mt-4">
                  <li class="list-inline-item">
                    <a href="https://www.facebook.com/Napolyon/" class="rounded"
                      ><i
                        data-feather="facebook"
                        class="fea icon-sm fea-social"
                      ></i
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a
                      href="https://www.instagram.com/napolyonapp/"
                      class="rounded"
                      ><i
                        data-feather="instagram"
                        class="fea icon-sm fea-social"
                      ></i
                    ></a>
                  </li>
                  <li class="list-inline-item">
                    <a href="https://twitter.com/napolyonapp" class="rounded"
                      ><i
                        data-feather="twitter"
                        class="fea icon-sm fea-social"
                      ></i
                    ></a>
                  </li>
                </ul>
                <!--end icon-->
              </div>
              <!--end col-->
              <div
                class="col-lg-2 offset-lg-3 offset-md-4 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0"
              >
                <h5 class="text-dark footer-head">Napolyon</h5>
                <ul class="list-unstyled footer-list mt-4">
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Hakkımızda</a
                    >
                  </li>
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Kurumsal</a
                    >
                  </li>
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Anti-Spam</a
                    >
                  </li>
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Sıkça
                      Sorulanlar</a
                    >
                  </li>
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Bize Ulaşın</a
                    >
                  </li>
                </ul>
              </div>
              <!--end col-->
              <div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                <h5 class="text-dark footer-head">Bilgiler</h5>
                <ul class="list-unstyled footer-list mt-4">
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Kullanım
                      Koşulları</a
                    >
                  </li>
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Üyelik
                      Sözleşmesi</a
                    >
                  </li>
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Gizlilik</a
                    >
                  </li>
                  <li>
                    <a href="#" class="text-muted"
                      ><i class="mdi mdi-chevron-right mr-1"></i> Anket Katıl.
                      Aydınlatma Metni</a
                    >
                  </li>
                </ul>
              </div>
              <!--end col-->
              <!--<div class="col-lg-3 col-md-4 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                    <h5 class="text-dark footer-head">E-Bülten</h5>
                    <p class="mt-4 text-muted">E-mail adresini kaydederek yeniliklerden haberdar olabilirsin.</p>
                    <form>
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="foot-subscribe foot-white form-group">
                                    <label class="text-muted">E-Posta Adresi <span class="text-danger">*</span></label>
                                    <div class="position-relative">
                                        <i data-feather="mail" class="fea icon-sm icons"></i>
                                        <input type="email" name="email" id="emailsubscribe" class="form-control bg-light border pl-5 rounded" placeholder="E-Posta Adresiniz : " required />
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12"><input type="submit" id="submitsubscribe" name="send" class="btn btn-primary btn-block" value="Kaydol" /></div>
                        </div>
                    </form>
                </div>-->
              <!--end col-->
            </div>
            <!--end row-->
          </div>
          <!--end container-->
        </footer>
        <!--end footer-->
        <footer class="footer footer-bar">
          <div class="container text-center">
            <div class="row align-items-center">
              <div class="col-sm-6">
                <div class="text-sm-left">
                  <p class="mb-0">
                    <img
                      src="https://www.limonist.com/img/theme-1/logoas.png"
                      style="margin-top: -7px; width: 80px !important;"
                      width="85"
                    />
                    © 2015 Tüm hakları saklıdır.
                  </p>
                </div>
              </div>
              <!--end col-->
           
              <!--end col-->
            </div>
            <!--end row-->
          </div>
          <!--end container-->
        </footer>
      </section>
      <nav class="app-nav">
        <ul>
          <li class="active">
            <a data-position="0" href="#start"><span>Napolyon.com</span></a>
          </li>
          <li>
            <a data-position="1000" style="cursor: pointer"
              ><span>Ücretsiz Üye Ol!</span></a
            >
          </li>
          <li>
            <a data-position="2000" style="cursor: pointer"
              ><span>Profil Bilgilerini Doldur</span></a
            >
          </li>
          <li>
            <a data-position="3000" style="cursor: pointer"
              ><span>Anketlere Katılım Göster</span></a
            >
          </li>
          <li>
            <a data-position="4000" style="cursor: pointer"
              ><span>Davet Gönder</span></a
            >
          </li>
          <li>
            <a data-position="5000" style="cursor: pointer"
              ><span>NAP Puanlarını Değerlendir</span></a
            >
          </li>
        </ul>
      </nav>
    </div>
    <!-- Back to top -->
    <a
      href="#"
      class="btn btn-icon btn-primary back-to-top"
      style="z-index: 100000"
      ><i data-feather="arrow-up" class="icons"></i
    ></a>
    <!-- Back to top -->
  </div>
</template>

<script>
import DashboardLayout from "@/view/layouts/DashboardLayout";
import Footer from "@/view/layouts/Footer";
import upFooter from "@/view/layouts/upFooter";
import Header from "@/view/layouts/Header";
import * as external from "@/core/mixin/external";
import feather from "feather-icons";

export default {
  name: "howToWin",
  components: {
    DashboardLayout,
    "t-footer": Footer,
    "t-up-footer": upFooter,
    "t-header": Header,
  },
  data() {
    return {
      showFooter: false,
    };
  },
  methods: {
    scrollToView(value) {
      const el = document.querySelector(value);
      console.log(el);
      el && el.scrollIntoView();
    },
  },
  computed: {
    url() {
      if (process.env.VUE_APP_APP_PREFIX) {
        return (
          process.env.VUE_APP_APP_URL +
          process.env.VUE_APP_APP_PREFIX +
          "/#" +
          this.$route.fullPath
        );
      }
      return process.env.VUE_APP_APP_URL + this.$route.fullPath;
    },
  },
  beforeCreate() {
    $("#body").height("auto");
  },
  mounted() {
    external.head_link(
      "/media/nasil-kazanirim/css/styles.min.css",
      "nasil-kazanirim-style-css",
      "custom-css"
    );
    external.head_script(
      "/js/jquery.magnific-popup.min.js",
      "jquery-magnific-popup-js",
      "scrollspy-js"
    );
    external.head_script(
      "/js/contact.js",
      "contact-js",
      "jquery-magnific-popup-js"
    );
    external.head_script("/js/feather.min.js", "feather-js", "contact-js");
    external.head_script(
      "/js/icons/script/monochrome/bundle.js",
      "monochrome-bundle-js",
      "feather-js"
    );
    external.head_script("/js/main.js", "main-js", "monochrome-bundle-js");
    external.head_script(
      "/media/nasil-kazanirim/js/skrollr.min.js",
      "nasil-kazanirim-skrollr-js",
      "main-js"
    );
    external.head_script(
      "/media/nasil-kazanirim/js/skrollr.menu.min.js",
      "nasil-kazanirim-skrollr-menu-js",
      "nasil-kazanirim-skrollr-js"
    );
    external.head_script(
      "/media/nasil-kazanirim/js/plugins.js",
      "nasil-kazanirim-plugins-js",
      "nasil-kazanirim-skrollr-menu-js"
    );

    setTimeout(function() {
      external.head_script(
        "/media/nasil-kazanirim/js/main.js",
        "nasil-kazanirim-main-js",
        "nasil-kazanirim-plugins-js"
      );
    }, 200);

    window.scrollTo(0, 0);
    feather.replace();

    if (localStorage.getItem("reload") !== null) {
      if (localStorage.getItem("reload") == "force") {
        localStorage.removeItem("reload");
      }
    } else {
      localStorage.setItem("reload", "force");
      location.reload();
    }
  },
  destroyed() {
    external.del_link(
      "/media/nasil-kazanirim/css/styles.min.css",
      "nasil-kazanirim-style-css",
      "custom-css"
    );
    external.del_script(
      "/js/jquery.magnific-popup.min.js",
      "jquery-magnific-popup-js",
      "scrollspy-js"
    );
    external.del_script(
      "/js/magnific.init.js",
      "magnific-init-js",
      "jquery-magnific-popup-js"
    );
    external.del_script("/js/contact.js", "contact-js", "magnific-init-js");
    external.del_script("/js/feather.min.js", "feather-js", "contact-js");
    external.del_script(
      "/js/icons/script/monochrome/bundle.js",
      "monochrome-bundle-js",
      "feather-js"
    );
    external.del_script("/js/main.js", "main-js", "monochrome-bundle-js");
    external.del_script(
      "/media/nasil-kazanirim/js/skrollr.min.js",
      "nasil-kazanirim-skrollr-js",
      "main-js"
    );
    external.del_script(
      "/media/nasil-kazanirim/js/skrollr.menu.min.js",
      "nasil-kazanirim-skrollr-menu-js",
      "nasil-kazanirim-skrollr-js"
    );
    external.del_script(
      "/media/nasil-kazanirim/js/plugins.js",
      "nasil-kazanirim-plugins-js",
      "nasil-kazanirim-skrollr-menu-js"
    );
    external.del_script(
      "/media/nasil-kazanirim/js/main.js",
      "nasil-kazanirim-main-js",
      "nasil-kazanirim-plugins-js"
    );
  },
};
</script>

<style scoped>
#topnav {
  position: absolute;
}
.footer {
  background: #202942;
  background-color: rgb(32, 41, 66);
  padding: 60px 0;
  position: relative;
  color: #adb5bd;
}
.footer-body {
  position: initial;
}
.footer-body .container {
  position: unset !important;
}
.footer-body p {
  width: 100%;
}
</style>
