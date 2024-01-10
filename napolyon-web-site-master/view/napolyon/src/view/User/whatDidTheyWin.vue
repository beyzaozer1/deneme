<template>
  <div id="whatDidTheyWin">
    <t-header></t-header>

    <section class="bg-white d-table w-100 pb-100"></section><!--end section-->
    <!-- Hero End -->

    <section class="background-napolyon">
      <div class="container-fluid np-bg-green">
        <div class="container">
          <div class="row justify-content-center padding-top-60 padding-bottom-60">
            <div class="col-md-12">
              <div class="main-timeline5">
                <div class="timeline" data-order="1" data-dg="slideInRight">
                  <div class="timeline-icon"><span class="year"><img :src="mediaBase + '/images/nap.png'" alt=""></span></div>
                  <div class="timeline-content">
                    <img src="https://cdn.napolyon.com/napolyon/kampanya/750x330/flormar-2015.jpg" alt="">
                    <div class="timeline-body">
                      <h3 class="title">Flormar’dan Makyaj Çantası Anketi!</h3>
                      <p class="description">“Kadın ve Güzellik” ile ilgili mini anketimizi dolduran Napolyon.com üyeleri,
                        üye oldukları e-posta adresine gelen kod ile flormar.com.tr'den yapacakları diledikleri...</p>
                    </div>
                  </div>
                </div>
                <div class="timeline" data-order="2" data-dg="slideInLeft">
                  <div class="timeline-icon"><span class="year"><img :src="mediaBase + '/images/nap.png'" alt=""></span></div>
                  <div class="timeline-content">
                    <img src="https://cdn.napolyon.com/napolyon/kampanya/750x330/eglencenin-adresi.jpg" alt="">
                    <div class="timeline-body">
                      <h3 class="title">Eğlence Seni Çağırıyor!</h3>
                      <p class="description">
                        31 Mart 2015 tarihine kadar en fazla aktif üye getiren Napolyon.com üyeleri, Biletix'ten 100 TL Hediye Çeki kazandı.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="timeline" data-order="3" data-dg="slideInRight">
                  <div class="timeline-icon"><span class="year"><img :src="mediaBase + '/images/nap.png'" alt=""></span></div>
                  <div class="timeline-content">
                    <img src="https://cdn.napolyon.com/napolyon/kampanya/750x330/nap-puan-yagmuru.jpg" alt="">
                    <div class="timeline-body">
                      <h3 class="title">NAP Puan Yağmuru Başlıyor!</h3>
                      <p class="description">
                        22 Nisan – 16 Mayıs 2015 tarihleri arasında yarışmaya katılıp, sembollerin eşini doğru şekilde ve en kısa sürede bulan ilk 12 üye, 20.000 NAP Puan'ı kazandı.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="timeline" data-order="4" data-dg="slideInLeft">
                  <div class="timeline-icon"><span class="year"><img :src="mediaBase + '/images/nap.png'" alt=""></span></div>
                  <div class="timeline-content">
                    <img src="https://cdn.napolyon.com/napolyon/kampanya/750x330/zamanakarsi.jpg" alt="">
                    <div class="timeline-body">
                      <h3 class="title">Baharı NAP Puanlarla Kutluyoruz!</h3>
                      <p class="description">
                        10 Nisan 2015 tarihine kadar yarışmaya katılıp, puzzle’da yer alan resmi doğru bir şekilde tamamlayan ilk 5 Napolyon.com üyesi, 50.000 NAP Puan kazandı.
                      </p>
                    </div>
                  </div>
                </div>

                <div class="timeline" data-order="5" data-dg="slideInRight">
                  <div class="timeline-icon"><span class="year"><img :src="mediaBase + '/images/nap.png'" alt=""></span></div>
                  <div class="timeline-content">
                    <img src="https://cdn.napolyon.com/napolyon/kampanya/750x330/rifat-yuzuak-2015.jpg" alt="">
                    <div class="timeline-body">
                      <h3 class="title">Saatler Tutuldu, Geri Sayım Başladı...</h3>
                      <p class="description">
                        22 Nisan - 12 Mayıs 2015 tarihleri arasında yarışmaya katılıp, selfisini çekip stil sahibi makyajını bize gönderenler üyelerimiz arasından ünlülerin makyözü Rıfat Yüzüak...
                      </p>
                    </div>
                  </div>
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
import ProfileCard from "@/view/components/ProfileCard";
import ScoreStatus from "@/view/components/ScoreStatus";
import feather from 'feather-icons';


export default {
  name: "whatDidTheyWin",
  components: {
    DashboardLayout,
    't-footer': Footer,
    't-up-footer': upFooter,
    't-header': Header,
    ScoreStatus,
    ProfileCard

  },
  data() {
    return {};
  }
  ,
  computed: {},
  beforeCreate() {
    $("#body").height("auto");
  },
  mounted() {
    window.scrollTo(0,0);
    feather.replace();
  }
}
</script>

<style scoped>

</style>