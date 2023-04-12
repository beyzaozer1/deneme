<template>
  <div class="col-lg-8 col-12">
    <div class="rounded shadow border-bottom p-4">
      <div class="row">
        <div class="col-12">
          <img :src="mediaBase + '/images/nap-kutusu.jpg'" class="img-fluid" />
        </div>
        <div class="col-md-12">
          <div class="media align-items-center mt-3">
            <div class="media-body">
              <h4 class="text-primary mb-0">Facebook NAP Kutusu</h4>
              <div>
                <p>
                  Facebook NAP Kutusu; Napolyon.com’daki üyeliğinde
                  gerçekleştirdiğin işlemleri, Facebook’tan ayrılmadan yapmanı
                  sağlayan yenilikçi bir uygulamadır.
                </p>
                <p class="font-weight-bold">
                  Facebook NAP Kutusunda Neler mi Yapabilirsin?
                </p>
                <div class="pl-3">
                  <p>
                    <i
                      class="fea icon-ex-md text-muted"
                      data-feather="chevron-right"
                    ></i>
                    Anketlere katılabilir, NAP Puanlarını artırabilirsin.
                  </p>
                  <p>
                    <i
                      class="fea icon-ex-md text-muted"
                      data-feather="chevron-right"
                    ></i>
                    “Canlı Anketler” bölümünde profiline uygun olarak gönderilen
                    en yeni anketleri doldurabilirsin.
                  </p>
                  <p>
                    <i
                      class="fea icon-ex-md text-muted"
                      data-feather="chevron-right"
                    ></i>
                    Napolyon.com’un bol ödüllü kampanya, yarışma ve
                    çekilişlerine katılabilirsin.
                  </p>
                  <p>
                    <i
                      class="fea icon-ex-md text-muted"
                      data-feather="chevron-right"
                    ></i>
                    Sana özel gönderilen kampanya e-postalarını paylaşarak NAP
                    Puan kazanabilirsin.
                  </p>
                  <p>
                    <i
                      class="fea icon-ex-md text-muted"
                      data-feather="chevron-right"
                    ></i>
                    Napolyon.com’da kazandığın NAP Puanları takip edebilirsin.
                  </p>
                  <p>
                    <i
                      class="fea icon-ex-md text-muted"
                      data-feather="chevron-right"
                    ></i>
                    Biriken NAP Puanlarını anlaşmalı olduğumuz çeşitli web
                    sitelerinde indirim veya hediye çekine dönüştürebilirsin.
                  </p>
                </div>
                <p>
                  Hemen aşağıdaki butonu tıkla, sen de Facebook NAP Kutusu
                  uygulamasını kullanarak hem eğlen hem de kazanmaya başla!
                </p>

                <div class="col-md-12 mt-4 pt-sm-0">
                  <div class="form-group text-center">
                    <a
                      class="btn btn-primary ml-1 d-inline fb-btn-color"
                      href="https://apps.facebook.com/napolyon_com/"
                      target="_blank"
                      type="button"
                    >
                      Facebook NAP Kutusu
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!--end row-->
    </div>
  </div>
  <!--end col-->
</template>
<script>
import ScoreStatus from "@/view/components/ScoreStatus";
import feather from "feather-icons";

export default {
  name: "account",
  components: {
    ScoreStatus,
  },
  data() {
    return {};
  },
  mounted() {
    feather.replace();
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped>
.fb-btn-color {
  background-color: #4267b2 !important;
  border-color: #4267b2 !important;
  box-shadow: 0 3px 5px 0 rgb(118, 146, 215);
}
</style>
