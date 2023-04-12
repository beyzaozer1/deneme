<template>
  <div id="howToWin">
    <t-header :nav-light="false"></t-header>
    <section class="bg-white d-table w-100 pb-100"></section>
    <WhatIWillEarn></WhatIWillEarn>
    <section class="testimonial-section padding-top padding-bottom pos-rel oh">
      <div class="ball-3 style2 d-lg-block"
           data-paroller-factor="0.30"
           data-paroller-factor-lg="-0.30"
           data-paroller-type="foreground"
           data-paroller-direction="horizontal">
        <img :src="mediaBase + '/images/n1/circle2.png'" alt="client">
      </div>
      <div class="ball-6 style2 d-lg-block"
           data-paroller-factor="-0.30"
           data-paroller-factor-lg="0.60"
           data-paroller-type="foreground"
           data-paroller-direction="horizontal">
        <img :src="mediaBase + '/images/n1/circle1.png'" alt="client">
      </div>
      <div class="container">
        <div class="row justify-content-between flex-wrap-reverse align-items-center">
          <div class="col-lg-7">
            <div class="testimonial-wrapper style-two">
              <a href="#0" class="testi-next trigger">
                <img :src="mediaBase + '/images/n1/left.png'" alt="client">
              </a>
              <a href="#0" class="testi-prev trigger">
                <img :src="mediaBase + '/images/n1/right.png'" alt="client">
              </a>
              <div class="testimonial-area testimonial-slider owl-carousel owl-theme">
                <div class="testimonial-item">
                  <div class="testimonial-thumb">
                    <div class="thumb">
                      <img src="http://napolyon.com/Content/Napolyon70/img/pt/tocev-logo-.jpg" alt="client">
                    </div>
                  </div>
                  <div class="testimonial-content">
                    <p>
                      Toçev'e Destek (1 Aylık Kitap)
                    </p>
                    <h5 class="title"><a href="#0">2.000 Ň</a></h5>
                    <div class="action">
                      <a href="#" class="btn btn-primary">Hemen Al</a>
                    </div>
                  </div>
                </div>
                <div class="testimonial-item">
                  <div class="testimonial-thumb">
                    <div class="thumb">
                      <img src="http://cdn.napolyon.com/napolyon/kampanya/350x250/halistores.png" alt="client">
                    </div>
                  </div>
                  <div class="testimonial-content">
                    <p>
                      Halıstores (%10 İndirim)
                    </p>
                    <h5 class="title"><a href="#0">1.000 Ň</a></h5>
                    <div class="action">
                      <a href="#" class="btn btn-primary">Hemen Al</a>
                    </div>
                  </div>
                </div>
                <div class="testimonial-item">
                  <div class="testimonial-thumb">
                    <div class="thumb">
                      <img src="http://cdn.napolyon.com/napolyon/kampanya/350x250/goldmaster--50-indirim-.png"
                           alt="client">
                    </div>
                  </div>
                  <div class="testimonial-content">
                    <p>
                      GoldMaster (%50 Hediye İndirim Kodu)
                    </p>
                    <h5 class="title"><a href="#0">1.000 Ň</a></h5>
                    <div class="action">
                      <a href="#" class="btn btn-primary">Hemen Al</a>
                    </div>
                  </div>
                </div>
                <div class="testimonial-item">
                  <div class="testimonial-thumb">
                    <div class="thumb">
                      <img src="http://cdn.napolyon.com/napolyon/kampanya/350x250/365ist--10-hediye-indirim-kodu.png"
                           alt="client">
                    </div>
                  </div>
                  <div class="testimonial-content">
                    <p>
                      365ist (%10 Hediye İndirim Kodu)
                    </p>
                    <h5 class="title"><a href="#0">1.000 Ň</a></h5>
                    <div class="action">
                      <a href="#" class="btn btn-primary">Hemen Al</a>
                    </div>
                  </div>
                </div>
                <div class="testimonial-item">
                  <div class="testimonial-thumb">
                    <div class="thumb">
                      <img src="http://cdn.napolyon.com/napolyon/kampanya/350x250/napolyon-100tl.png" alt="client">
                    </div>
                  </div>
                  <div class="testimonial-content">
                    <p>
                      Ňapolyon (100 TL Nakit Ödeme)
                    </p>
                    <h5 class="title"><a href="#0">100.000 Ň</a></h5>
                    <div class="action">
                      <a href="#" class="btn btn-primary">Hemen Al</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-5 pl-lg-5">
            <div class="testi-wrapper">
              <div class="testi-header">
                <div class="section-header left-style mb-lg-0">
                  <h5 class="cate">{{ $t('index.nap_transfer') }}</h5>
                  <h2 class="title">{{ $t('index.nap_transfer_description') }}</h2>
                  <a @click="$router.push({name:'index.howToWin'})"
                     class="button-3 active mt-md-2">{{ $t('index.who_i_win') }} <i data-feather="arrow-right"
                                                                                    class="fea icon-sm ml-2"> </i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <t-up-footer></t-up-footer>
    <t-footer></t-footer>
  </div>

</template>

<script>
import DashboardLayout from "@/view/layouts/DashboardLayout";
import Footer from "@/view/layouts/Footer";
import upFooter from "@/view/layouts/upFooter";
import Header from "@/view/layouts/Header";
import WhatIWillEarn from "@/view/components/WhatIWillEarn";
import * as external from '@/core/mixin/external'
import feather from 'feather-icons';

export default {
  name: "whatIEarn",
  components: {
    DashboardLayout,
    't-footer': Footer,
    't-up-footer': upFooter,
    't-header': Header,
    WhatIWillEarn
  },
  data() {
    return {};
  },
  beforeCreate() {
    $("#body").height("auto");
  },
  mounted() {
    external.head_link('css/owl.carousel.min.css', 'owl-carousel-css', 'magnific-popup-css');
    external.head_link('css/owl.theme.default.min.css', 'owl-theme-default-css', 'owl-carousel-css');
    external.head_script('/js/jquery.magnific-popup.min.js', 'jquery-magnific-popup-js', 'scrollspy-js');
    external.head_script('/js/owl.carousel.min.js', 'owl-carousel-js', 'jquery-magnific-popup-js');
    external.head_script('/js/feather.min.js', 'feather-js', 'owl-carousel-js');
    external.head_script('/js/sweetalert2.js', 'sweetalert2-js', 'feather-js');
    external.head_script('/js/icons/script/monochrome/bundle.js', 'monochrome-bundle-js', 'sweetalert2-js');
    external.head_script('/assets/plugins/revslider/js/jquery.themepunch.revolution.min.js', 'jquery-themepunch-revolution-js', 'monochrome-bundle-js');
    external.head_script('/assets/plugins/revslider/js/jquery.themepunch.plugins.min.js', 'jquery-themepunch-plugins-js', 'jquery-themepunch-revolution-js');
    external.head_script('/assets/plugins/flexslider/jquery.flexslider-min.js', 'jquery-flexslider-js', 'jquery-themepunch-plugins-js');
    external.head_script('/assets/js/corpress.min.js', 'corpress-js', 'jquery-flexslider-js');
    external.head_script('/assets/js/scrollspy.min.js', 'scrollspy-js', 'corpress-js');
    external.head_script('/assets/js/paroller.js', 'paroller-js', 'scrollspy-js');
    external.head_script('/js/main.js', 'main-js', 'paroller-js');

    window.scrollTo(0, 0);
    feather.replace();
  },
  destroyed() {
    external.del_link('css/owl.carousel.min.css', 'owl-carousel-css', 'magnific-popup-css');
    external.del_link('css/owl.theme.default.min.css', 'owl-theme-default-css', 'owl-carousel-css');
    external.del_script('/js/jquery.magnific-popup.min.js', 'jquery-magnific-popup-js', 'scrollspy-js');
    external.del_script('/js/owl.carousel.min.js', 'owl-carousel-js', 'magnific-init-js');
    external.del_script('/js/feather.min.js', 'feather-js', 'owl-carousel-js');
    external.del_script('/js/sweetalert2.js', 'sweetalert2-js', 'feather-js');
    external.del_script('/js/icons/script/monochrome/bundle.js', 'monochrome-bundle-js', 'sweetalert2-js');
    external.del_script('/assets/plugins/revslider/js/jquery.themepunch.revolution.min.js', 'jquery-themepunch-revolution-js', 'monochrome-bundle-js');
    external.del_script('/assets/plugins/revslider/js/jquery.themepunch.plugins.min.js', 'jquery-themepunch-plugins-js', 'jquery-themepunch-revolution-js');
    external.del_script('/assets/plugins/flexslider/jquery.flexslider-min.js', 'jquery-themepunch-revolution-js', 'jquery-flexslider-js');
    external.del_script('/assets/js/corpress.min.js', 'corpress-js', 'jquery-themepunch-revolution-js');
    external.del_script('/assets/js/scrollspy.min.js', 'scrollspy-js', 'corpress-js');
    external.del_script('/assets/js/paroller.js', 'paroller-js', 'scrollspy-js');
    external.del_script('/js/main.js', 'main-js', 'paroller-js');
  }
}
</script>

<style scoped>

</style>