<template>
  <div id="contentUs">
    <t-header :nav-light="false"></t-header>
    <section class="bg-half bg-light d-table w-100" style="background: url('media/images/images/contact-detail.jpg') center center;">
      <div class="bg-overlay bg-overlay-white"></div>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 text-center">
            <div class="page-next-level">
              <h4 class="title">Hakkımızda</h4>
              <div class="page-next">
                <nav aria-label="breadcrumb" class="d-inline-block">
                  <ul class="breadcrumb bg-white rounded shadow mb-0">
                    <li class="breadcrumb-item"><a @click="$router.push({name:'user.index'})">{{$t('index.home')}}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Hakkımızda</li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>  <!--end col-->
        </div><!--end row-->
      </div> <!--end container-->
    </section><!--end section-->
    <div class="position-relative">
      <div class="shape overflow-hidden text-white">
        <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
    <!--Shape End-->

    <!-- questions section begin -->
    <div class="questions-section">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-12 col-md-12">
              <h1 class="turuncu-baslik">Hakkımızda</h1>
              <h2>Üyeler için Napolyon.com neler sunar?</h2>
              <p>
                Napolyon.com, ilgi alanlarınıza göre araştırmaları, izniniz doğrultusunda size ulaştırır. Katılmış olduğunuz araştırmalardan kazandığınız NAP Puanları harcarken, indirimli kampanyalardan faydalanma fırsatı sunar, ayrıcalık ve zaman kazandırır.
              </p>
              <h2>Markalar için Napolyon.com neler sunar?</h2>
              <p>
                Napolyon.com, 1.2 milyon üyesiyle Türkiye'nin ilk ve en büyük bağlılık temelli izinli araştırma ve pazarlama platformudur. Napolyon.com, DORinsight bünyesinde geliştirilen araştırma modelleri ile e-posta, mobil uygulama ve sosyal medya üzerinden  birebir online araştırmalara katılım fırsatları sunar.
                Napolyon.com, iletişim izinleri, bağlılıkları ve çeşitli aksiyonları karşılığında üyelerini Nap Puan ile ödüllendirir. Üyeler biriktirdikleri NAP Puanları indirimler, teklifler, çekilişler, ayrıcalıklar şeklinde kolay erişilebilir, fırsatlara dönüştürürler.
              </p>
              <div class="h20"></div>
              <p class="hidden-xs"><img src="http://napolyon.com/Content/Napolyon70/img/tr-map.png" class="fadeIn animated img-responsive"></p>
          </div>
        </div>
      </div>
    </div>
    <!-- questions section end -->

    <!-- Start Contact -->
    <t-up-footer></t-up-footer>
    <t-footer></t-footer>
  </div>

</template>

<script>
import Footer from "@/view/layouts/Footer";
import upFooter from "@/view/layouts/upFooter";
import Header from "@/view/layouts/Header";
import feather from 'feather-icons';
export default {
  name: "AboutUs",
  components: {
    't-footer': Footer,
    't-up-footer': upFooter,
    't-header': Header,
  },
  mounted() {
    window.scrollTo(0,0);
    feather.replace();
  },
}
</script>

<style scoped>

</style>