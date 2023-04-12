<template>
  <div id="contentUs">
    <t-header :nav-light="false"></t-header>
    <section class="bg-half bg-light d-table w-100" style="background: url('media/images/images/contact-detail.jpg') center center;">
      <div class="bg-overlay bg-overlay-white"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <div class="page-next-level">
              <h4 class="title">Sayfa Bulunamadı</h4>
              <div class="page-next">
                <nav aria-label="breadcrumb" class="d-inline-block">
                  <ul class="breadcrumb bg-white rounded shadow mb-0">
                    <li class="breadcrumb-item">
                      <a @click="$router.push({ name: 'user.index' })">{{
                          $t("index.home")
                        }}</a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </section>
    <!--end section-->
    <div class="position-relative">
      <div class="shape overflow-hidden text-white">
        <svg
            viewBox="0 0 2880 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
          <path
              d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z"
              fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
    <!--Shape End-->

    <!-- questions section begin -->
    <div class="questions-section">
      <div class="container">
        <div class="row text-center mb-20">
          <div class="col-lg-12">
            <div class="questions-text">
              <h2 class="questions-subtitle" style="text-transform: none">Sayfa bulunamadı</h2>
              <br />
              <h4 class="questions-subtitle" style="text-transform: none">Anasayfaya yönlendiriliyorsunuz..</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- questions section end -->
    <t-up-footer></t-up-footer>
    <t-footer></t-footer>
  </div>
</template>

<script>
import Footer from "@/view/layouts/Footer";
import upFooter from "@/view/layouts/upFooter";
import Header from "@/view/layouts/Header";
import feather from "feather-icons";
import * as external from "@/core/mixin/external";

export default {
  name: "contentUs",
  components: {
    "t-footer": Footer,
    "t-up-footer": upFooter,
    "t-header": Header,
  },
  data() {
    return {
    };
  },
  methods: {
  },
  mounted() {
    let self = this;
    external.head_script("/js/main.js", "main-js", "paroller-js");
    window.scrollTo(0, 0);
    feather.replace();

    setTimeout(() => {
      self.$router.push({name: 'user.index'})
    }, 2000);
  },
  destroyed() {
    external.del_script("/js/main.js");
  },
};
</script>

<style scoped>

</style>
