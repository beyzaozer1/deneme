<template>
  <div id="nap-transfer-page" class="col-lg-8 col-12">
    <template v-if="campaignDetail">
      <template v-if="campaignDetailLoading">
        <loader :loading="campaignDetailLoading"></loader>
      </template>
      <template v-else>
        <div class="rounded shadow border-bottom p-4 mb-2">
          <div class="container-fluid px-0">
            <div class="slider single-item">
              <div class="rounded-md">
                <img
                  :src="
                    campaignDetail.image1
                      ? campaignDetail.image1.includes('cdn.')
                        ? campaignDetail.image1
                        : cdnImagePrefix + campaignDetail.image1
                      : defaultImage
                  "
                  alt=""
                  class="img-fluid m-h-275"
                />
                <div class="mt-3 p-2">
                  <h5 class="title">
                    {{ campaignDetail.campaignObject.homePageTitle }}
                  </h5>
                  <p
                    class="description"
                    v-html="campaignDetail.campaignObject.homePageDescription"
                  ></p>
                </div>
                <div class="mt-2 p-2">
                  <a
                    class="btn btn-primary btn-md"
                    href="#"
                    target="_blank"
                    @click.prevent="showDetailItemToGet(campaignDetail)"
                  >
                    {{ campaignDetail.campaignObject.buttonText }}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="rounded shadow border-bottom p-4 mb-2 vh-100 overflow-auto">
          <ul id="myTab" class="nav nav-tabs" role="tablist">
            <li
              v-for="(item, index) in campaignDetail.campaignObject.tabsObject"
              :key="index"
              class="nav-item"
              role="presentation"
            >
              <a
                :id="'tab-parent-' + item.tabId"
                :class="index === 0 ? 'active nav-item-active' : ''"
                :href="'#tab-' + item.tabId"
                aria-controls="home"
                aria-selected="true"
                class="nav-link"
                data-toggle="tab"
                role="tab"
                >{{ item.tabTitle }}</a
              >
            </li>
          </ul>
          <div id="myTabContent" class="tab-content mt-3 scroll-overflow">
            <div
              v-for="(item, index) in campaignDetail.campaignObject.tabsObject"
              :id="'tab-' + item.tabId"
              :key="index"
              :aria-labelledby="'tab-' + item.tabId"
              :class="index === 0 ? 'show active' : ''"
              class="tab-pane fade "
              role="tabpanel"
            >
              <span v-html="item.tabContent"></span>
            </div>
          </div>
        </div>
      </template>
    </template>
    <template v-else-if="showItemDetails">
      <div class="row">
        <div v-if="this.selectedItem === 1" class="col-12">
          <div
            class="rounded shadow border-bottom nap-transfer-box p-2 cursor-pointer"
            @click.prevent="onClickItem(1)"
          >
            <div class="d-flex flex-column">
              <div class="p-2 d-flex justify-content-center align-items-center">
                <img
                  :alt="activeItem.campaignName"
                  :src="mediaBase + '/images/tocev-destek.jpg'"
                  class="avatar avatar-ex-large border-radius-10"
                  style="width: 100%; height: 100%"
                />
              </div>
              <div
                class="mt-auto p-2 justify-content-center d-flex align-items-center"
              >
                <h4>
                  <span class="text-muted"
                    >Artık Napolyon.com üyeleri de TOÇEV aracılığıyla maddi
                    durumu yetersiz ailelerin okuma istekli çocuklarına
                    biriktirdikleri NAP Puanlarıyla kitap desteğinde
                    bulunabilecek.
                  </span>
                </h4>
              </div>

              <template v-if="tocevDescription">
                <div
                  class="mt-auto p-2 justify-content-center d-flex align-items-center text-muted"
                >
                  <p>
                    Napolyon.com üyeleri, TOÇEV aracılığıyla maddi durumu
                    yetersiz ailelerin okuma istekli çocuklarına,
                    biriktirdikleri NAP Puanlarıyla içinde 2 kitap bulunan bir
                    paket gönderiyor.

                    <br />
                    Napolyon.com üyeleri'nin destekleri sayesinde Ağrı, Denizli,
                    Kilis, Kayseri, Hakkari, Sinop, Bitlis ve Ordu'daki TOÇEV
                    çocuklarına kitapları ulaştırıldı!

                    <img src="" />

                    <br />

                    Yapmanız gerekenler;
                    <br />
                    - Aşağıdaki butona tıklayın, tıkladığınız tarihten itibaren
                    kazanacağınız NAP Puanlarınız TOÇEV kumbaranızda biriksin.
                    <br />
                    - Her ay sonunda TOÇEV kumbaranızda 2.000* ve katları kadar
                    biriken NAP Puanlarınız okuma istekli çocuklarımıza kitap
                    göndermek amacıyla TOÇEV'e aktarılsın.
                    <br />
                    - TOÇEV tarafından, desteğinizle oluşacak ve içinde 2 kitap
                    bulunan bir paketi maddi durumu yetersiz ailelerin okuma
                    istekli çocuklarına iletilsin.
                  </p>
                </div>

                <div
                  class="mt-auto p-2 justify-content-center d-flex align-items-center"
                >
                  <button
                    class="btn btn-outline-primary"
                    type="button"
                    @click.prevent="tocevDescription = false"
                  >
                    Okuma İstekli Çocuklarımıza Kitap Gönderin!
                  </button>
                </div>
              </template>

              <template v-else>
                <div
                  class="mt-auto p-2 justify-content-center d-flex align-items-center text-muted"
                >
                  <p>
                    Sevgili <b>{{ user.firstName }} {{ user.lastName }} </b>,
                    <br />
                    <template v-if="!tocevStatus">
                      {{ today }} tarihinden itibaren Napolyon.com'dan gelen
                      anketleri doldurma, kampanya e-postalarını Facebook'ta
                      paylaşma, ve davet gönderdiğin kişilerin siteye aktif
                      üye** olmaları karşılığında kazanacağın 2.000* ve katları
                      tutarındaki NAP Puanların, okuma istekli çocuklarımıza
                      kitap desteği için TOÇEV'e aktarılacak!
                      <br />
                      Onaylıyor musunuz?
                    </template>
                    <template v-else>
                      {{ tocevStartDate }} tarihinde TOCEV aracılığıyla maddi
                      durumu yetersiz ailelerin okuma istekli çocuklarına
                      biriktirdiğiniz ňaplar ile destekte bulunmak istediğinizi
                      belirtmiştiniz.
                      <br />
                      Aşağıdaki <b>"VAZGEÇ"</b> düğmesine tıkladığında
                      <b>projeden ayrılmış olacak</b> ve Napolyon.com'da
                      gerçekleştireceğin aksiyonlar karşılığında kazanacağın NAP
                      Puanlar kendi hesabına aktarılacaktır.
                      <br />
                      Onaylıyor musunuz?
                    </template>
                  </p>
                </div>
                <div class="nap-transfer-error">
                  <div
                    v-if="resultError"
                    class="alert alert-danger text-center"
                  >
                    <span v-html="resultError"></span>
                  </div>
                </div>
                <div
                  v-if="resultSuccess"
                  class="alert alert-success text-center"
                >
                  Katılım talebiniz alındı
                </div>
                <div
                  v-else
                  class="mt-auto p-2 justify-content-center d-flex align-items-center"
                >
                  <button
                    :disabled="loadingTocevStatus"
                    class="btn btn-sm btn-primary"
                    type="button"
                    @click.prevent="approveCampaign(1)"
                  >
                    {{ !tocevStatus ? "Evet" : "Vazgeç" }}
                  </button>
                </div>

                <div
                  class="mt-auto p-2 justify-content-center d-flex align-items-center"
                >
                  <button
                    class="btn btn-sm btn-outline-primary"
                    type="button"
                    @click.prevent="
                      showItemDetails = null;
                      selectedItem = null;
                      tocevDescription = true;
                      scrollToTop(0, 0);
                    "
                  >
                    <i class="fa fa-chevron-left mr-2"></i> Geri
                  </button>
                </div>
              </template>
              <div
                class="mt-auto p-2 justify-content-center d-flex align-items-center"
              >
                <h4><span class="text-muted">Katılım Koşulları</span></h4>
              </div>

              <div
                class="mt-auto p-2 justify-content-center d-flex align-items-center text-muted"
              >
                <ul>
                  <li>
                    Tüvana Okuma İstekli Çocuk Eğitim Vakfı (TOÇEV) ve
                    Napolyon.com işbirliğinde gerçekleşen eğitime destek
                    aktivitesi, 25 Kasım 2011 tarihinden itibaren geçerli
                    olacaktır.
                  </li>
                  <li>
                    TOÇEV ve Napolyon.com işbirliğinde gerçekleşen eğitime
                    destek aktivitesinin kurgusu 25 Kasım 2011 tarihinden
                    itibaren onay metnine "Evet" butonuna tıkladıktan sonra
                    Napolyon.com'dan gelen anketleri doldurma, kampanya
                    e-postalarını Facebook'ta paylaşma ve davet gönderdikleri
                    kişilerin siteye aktif üye** olmaları karşılığında
                    kazandıkları 2.000 ve katları tutarındaki nap puanların
                    okuma istekli çocuklarımıza kitap desteği için TOÇEV'e
                    aktarılmasına yönelik bir çalışmadır.
                  </li>
                  <li>
                    Katılımın gerçekleştiği tarihten itibaren her ay sonunda
                    TOÇEV kumbarasında 2.000* ve katları kadar biriken ňaplar
                    TOÇEV’e aktarılacaktır.
                  </li>
                  <li>
                    "Okuma İstekli Çocuklarımıza Kitap Gönderin!" butonunu
                    tıklayan Napolyon.com üyelerinin, Napolyon.com’dan gelen
                    reklam e-postalarını okuma, tıklama, Facebook’ta paylaşma,
                    anket okuma, doldurma ve davet gönderdikleri kişilerin
                    siteye aktif üye** olmaları karşılığında kazandıkları 2.000
                    ve katları tutarındaki ňapları TOÇEV’e aktarılacaktır.
                  </li>
                  <li>
                    Napolyon.com üyelerinin desteğiyle oluşacak fondan
                    karşılanacak ve içinde 5 kitap bulunan kitap paketlerini,
                    gönderilecek okulun toplam çocuk sayısı kadar kitap desteği
                    oluştuğunda TOÇEV kargo ile çocuklara ulaştıracaktır.
                  </li>
                  <li>
                    Katılım sırasında üye tarafından yanlış veya eksik beyan
                    edilen bilgiler dolayısıyla yaşanacak aksaklıklardan dolayı
                    Napolyon.com sorumlu tutulamaz.
                  </li>
                  <li>
                    Uygulamada öngörülmemiş açıklar yoluyla haksız avantaj
                    sağlamaya çalışan katılımcılar belirlendiğinde bu kişiler
                    hakkında yasal işlem başlatılacaktır.
                  </li>
                  <li>
                    Napolyon.com eğitime destek verenlerin isimlerini ilan etme
                    hakkını saklı tutar.
                  </li>
                  <li>
                    Napolyon.com, bu projeyle ilgili olarak dilediği zaman
                    herhangi bir gerekçe göstermek zorunda olmadan değişiklik
                    yapma hakkını saklı tutar.
                  </li>
                  <li>Kampanya 31 Aralık 2014 tarihine kadar geçerlidir.</li>
                  <li>
                    Eğitime destek veren herkes bu şartları kabul etmiş sayılır.
                  </li>
                  <li>Sadece Napolyon.com üyeleri katılabilir.</li>
                </ul>
              </div>
              <div
                class="mt-auto p-2 justify-content-center d-flex align-items-center text-muted"
              >
                <div class="alert alert-info">
                  Üyelik bilgilerini tamamlayarak, cep telefonu ve e-posta
                  adresini onaylayanlar aktif üye olarak kabul edilir.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="this.selectedItem === 2"
          class="col-md-12 rounded shadow border-bottom nap-transfer-box"
        >
          <div class="row">
            <div class="col-md-12 mt-3 nap-transfer-error">
              <div class="form-group">
                <div v-if="resultError" class="alert alert-danger text-center">
                  <span v-html="resultError"></span>
                </div>
                <div v-if="resultSuccess">
                  <div
                    v-if="activeItem.messageAfterRequest"
                    class="alert alert-success"
                  >
                    <span v-html="activeItem.messageAfterRequest"></span>
                  </div>
                  <p>
                    Napolyon.com'da NAP Puanların, yeterli seviyeye ulaştığında,
                    ister anlaşmalı olduğumuz web sitelerinde yapacağın
                    alışverişlerde sana özel indirim ve hediye çeklerinden
                    yararlanabilir, ister çekilişlere katılarak büyük ödülleri
                    kazanma fırsatı elde edebilirsin.
                  </p>
                  <div class="h15"></div>
                  <p>
                    <strong>
                      Hemen NAP Puanlarını harca, sana özel fırsatları sakın
                      kaçırma!
                    </strong>
                  </p>
                  <div class="alert alert-info" role="alert">
                    <p>
                      Transfer edilen NAP Puanlar hesabınıza yalnızca transfer
                      talebini takip eden 1 saat içerisinde iade edilebilir,
                      daha sonra iade talep edilemez.
                    </p>
                  </div>

                  <button
                    class="btn btn-warning btn-block"
                    type="button"
                    @click.prevent="
                      showItemDetails = null;
                      scrollToTop(0, 0);
                    "
                  >
                    Geri
                  </button>
                </div>
              </div>
            </div>

            <div class="col-4 m-auto text-center">
              <div class="row">
                <div class="col-12">
                  <img
                    :alt="activeItem.campaignName"
                    :src="
                      activeItem.image2
                        ? cdnImagePrefix + activeItem.image2
                        : defaultImage
                    "
                    class="avatar avatar-medium border-radius-10"
                  />
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-12">
                  {{ activeItem.campaignName }}
                </div>
              </div>
            </div>
            <div class="col-8">
              <div class="row">
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      >TC Kimlik No <span class="text-danger">*</span></label
                    >
                    <div class="position-relative">
                      <input
                        v-model="form.tcNo"
                        class="form-control"
                        placeholder="TC Kimlik No:"
                        required=""
                        type="text"
                      />
                    </div>
                    <div
                      v-if="submitStatus && !$v.form.tcNo.required"
                      class="error d-block"
                    >
                      TC Kimlik No giriniz
                    </div>
                    <div v-if="submitStatus && tcNoError" class="error d-block">
                      Hatalı TC Kimlik No girdiniz
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Adınız <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <input
                        v-model="form.firstName"
                        class="form-control"
                        disabled
                        name="name"
                        placeholder="Adınız"
                        required=""
                        type="text"
                      />
                    </div>
                    <div
                      v-if="submitStatus && !$v.form.firstName.required"
                      class="error d-block"
                    >
                      Adınızı giriniz
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Soyadınız <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <input
                        v-model="form.lastName"
                        class="form-control"
                        disabled
                        name="surname"
                        placeholder="Soyadınız"
                        required=""
                        type="text"
                      />
                    </div>
                    <div
                      v-if="submitStatus && !$v.form.firstName.required"
                      class="error d-block"
                    >
                      Soyadınızı giriniz
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      >{{ $t("login.birthday") }}
                      <span class="text-danger">*</span></label
                    >
                    <select
                      v-model="form.day"
                      class="form-control custom-select"
                      disabled
                    >
                      <option selected value="null">Seçiniz</option>
                      <option v-for="item in days" :value="item.value"
                        >{{ item.text }}
                      </option>
                    </select>
                    <div
                      v-if="submitStatus && !$v.form.day.required"
                      class="error d-block"
                    >
                      Doğum Gününüz
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      >{{ $t("login.month_of_birth") }}
                      <span class="text-danger">*</span></label
                    >
                    <select
                      v-model="form.month"
                      class="form-control custom-select"
                      disabled
                    >
                      <option selected value="null">Seçiniz</option>
                      <option v-for="item in months" :value="item.value"
                        >{{ item.text }}
                      </option>
                    </select>
                    <div
                      v-if="submitStatus && !$v.form.month.required"
                      class="error d-block"
                    >
                      Doğum Ayınız
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      >{{ $t("login.year_of_birth") }}
                      <span class="text-danger">*</span></label
                    >
                    <select
                      v-model="form.year"
                      class="form-control custom-select"
                      disabled
                    >
                      <option :value="null" selected>Seçiniz</option>
                      <option v-for="item in years" :value="item.value"
                        >{{ item.text }}
                      </option>
                    </select>
                    <div
                      v-if="submitStatus && !$v.form.year.required"
                      class="error d-block"
                    >
                      Doğum Yılınız
                    </div>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <h4>
                      <span>
                        Transfer Edilecek NAP Puan:
                        {{ formatNumber(activeItem.point) }}
                      </span>
                    </h4>
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group">
                    <div
                      v-if="!resultSuccess"
                      class="mt-auto p-2 justify-content-center d-flex align-items-center"
                    >
                      <button
                        :disabled="
                          napTransferLoading ||
                            !(Number(activeItem.point) < Number(user.point))
                        "
                        class="btn btn-primary"
                        type="button"
                        @click="approveCampaign(2)"
                      >
                        Onaylıyorum
                      </button>
                      <button
                        class="btn btn-warning ml-2"
                        type="button"
                        @click.prevent="
                          showItemDetails = null;
                          scrollToTop(0, 0);
                        "
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="this.selectedItem === 3"
          class="col-md-12 rounded shadow border-bottom nap-transfer-box"
        >
          <div class="row">
            <div class="col-4 m-auto text-center d-none">
              <div class="row">
                <div class="col-12">
                  <img
                    :alt="activeItem.campaignName"
                    :src="
                      activeItem.image1
                        ? cdnImagePrefix + activeItem.image1
                        : defaultImage
                    "
                    class="avatar avatar-medium border-radius-10"
                  />
                </div>
              </div>
              <div class="row mt-5">
                <div class="col-12">
                  {{ activeItem.campaignName }}
                </div>
              </div>
            </div>
            <div class="col-12 mt-5">
              <div class="row">
                <div class="col-md-12 mb-2 mt-n5">
                  <img
                    :src="mediaBase + '/images/nap-transfer/100TL.png'"
                    class="w-100"
                  />

                  <h4 class="mt-2">
                    Napolyon'da Takıl, Sen de Kazananların Dünyasına Katıl!
                  </h4>
                  <p>
                    Napolyon'da yapacağınız aksiyonlar karşılığında
                    biriktirdiğiniz NAP Puanları nakit paraya çevirebilirsiniz.
                    Anketleri doldurun, arkadaşlarınızı davet edin, biriken
                    100.000 NAP Puanınızı 100 TL nakit paraya çevirerek
                    dilediğiniz gibi harcayın!
                  </p>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label
                      >TC Kimlik No <span class="text-danger">*</span></label
                    >
                    <div class="position-relative">
                      <input
                        v-model="form.tcNo"
                        class="form-control"
                        placeholder="TC Kimlik No:"
                        required=""
                        type="text"
                      />
                    </div>
                    <div
                      v-if="submitStatus && !$v.form.tcNo.required"
                      class="error d-block"
                    >
                      TC Kimlik No giriniz
                    </div>
                    <div v-if="submitStatus && tcNoError" class="error d-block">
                      Hatalı TC Kimlik No girdiniz
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Adınız <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <input
                        v-model="form.firstName"
                        class="form-control"
                        disabled="true"
                        name="name"
                        placeholder="Adınız"
                        required=""
                        type="text"
                      />
                    </div>
                    <div
                      v-if="submitStatus && !$v.form.firstName.required"
                      class="error d-block"
                    >
                      Adınızı giriniz
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>Soyadınız <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <input
                        v-model="form.lastName"
                        class="form-control"
                        disabled
                        name="surname"
                        placeholder="Soyadınız"
                        required=""
                        type="text"
                      />
                    </div>
                    <div
                      v-if="submitStatus && !$v.form.firstName.required"
                      class="error d-block"
                    >
                      Soyadınızı giriniz
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      >{{ $t("login.birthday") }}
                      <span class="text-danger">*</span></label
                    >
                    <select
                      v-model="form.day"
                      class="form-control custom-select"
                      disabled
                    >
                      <option selected value="null">Seçiniz</option>
                      <option v-for="item in days" :value="item.value"
                        >{{ item.text }}
                      </option>
                    </select>
                    <div
                      v-if="submitStatus && !$v.form.day.required"
                      class="error d-block"
                    >
                      Doğum Gününüz
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      >{{ $t("login.month_of_birth") }}
                      <span class="text-danger">*</span></label
                    >
                    <select
                      v-model="form.month"
                      class="form-control custom-select"
                      disabled
                    >
                      <option selected value="null">Seçiniz</option>
                      <option v-for="item in months" :value="item.value"
                        >{{ item.text }}
                      </option>
                    </select>
                    <div
                      v-if="submitStatus && !$v.form.month.required"
                      class="error d-block"
                    >
                      Doğum Ayınız
                    </div>
                  </div>
                </div>
                <div class="col-md-4">
                  <div class="form-group">
                    <label
                      >{{ $t("login.year_of_birth") }}
                      <span class="text-danger">*</span></label
                    >
                    <select
                      v-model="form.year"
                      class="form-control custom-select"
                      disabled
                    >
                      <option :value="null" selected>Seçiniz</option>
                      <option v-for="item in years" :value="item.value"
                        >{{ item.text }}
                      </option>
                    </select>
                    <div
                      v-if="submitStatus && !$v.form.year.required"
                      class="error d-block"
                    >
                      Doğum Yılınız
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <label>IBAN: <span class="text-danger">*</span></label>
                    <div class="position-relative">
                      <input
                        v-model="form.iban"
                        class="form-control"
                        placeholder="IBAN"
                        required=""
                        type="text"
                      />
                    </div>
                    <div
                      v-if="submitStatus && !$v.form.iban.required"
                      class="error d-block"
                    >
                      IBAN giriniz
                    </div>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group text-center">
                    <h4>
                      <span>
                        Transfer Edilecek NAP Puan:
                        {{ formatNumber(activeItem.point) }}
                      </span>
                    </h4>
                  </div>
                </div>
                <div class="col-md-12">
                  <div class="form-group">
                    <ul>
                      <li>
                        <a
                          >Napolyon.com'dan ödeme alabilmeniz için; banka
                          hesabınızın kendi adınıza açılmış olması
                          gerekmektedir.</a
                        >
                      </li>
                      <li>
                        <a
                          >Napolyon.com'da kayıtlı olan bilgilerinizden; Ad
                          Soyad, Doğum tarihi ve T.C Kimlik numarası
                          bilgilerinizin nüfusa kayıtlı olan bilgilerle aynı
                          olması gerekmektedir.</a
                        >
                      </li>
                      <li>
                        <a
                          >IBAN numarasının yanlış iletilmesi, ödemenin başka
                          bir hesaba/kişiye iletilmesinden Napolyon.com sorumlu
                          tutulamaz. Bu durumda 100.000 nap puanın iadesi ya da
                          100 TL ödemenin tekrar yapılması talep edilemez.</a
                        >
                      </li>
                      <li>
                        <a
                          >18 yaşını doldurmamış üyelerimizin ödeme talebinde
                          bulunabilmeleri için, velisi ile birlikte bankaya
                          gidip, banka hesabı başvurusu yapmaları
                          gerekmektedir.</a
                        >
                      </li>
                      <li>
                        <a
                          >Napolyon.com web sitesi üzerinden 100.000 nap puan
                          transferi sonucu 100 TL ödeme talep eden tüm
                          üyelerimiz bu şartları kabul etmiş sayılır.</a
                        >
                      </li>
                      <li>
                        <a
                          >100.000 nap puan transferini gerçekleştirebilmek
                          için, Ad Soyad bilgilerini değiştirdiği tespit edilen
                          üyeliklerin üzerindeki nap puanlarının tamamı
                          silinmektedir. Ayrıca Napolyon.com üyeliği kapatma
                          hakkına da sahiptir.</a
                        >
                      </li>
                      <li>
                        <a
                          >Napolyon.com üyesi aynı hafta içerisinde en fazla 2
                          adet ödeme talebinde bulunabilir.</a
                        >
                      </li>
                    </ul>
                    <span class="d-inline-flex font-weight-bold"
                      >Yukarıdaki maddeleri onaylıyorum
                      <input
                        v-model="form.approve"
                        class="ml-2 custom-checkbox large"
                        type="checkbox"
                    /></span>
                  </div>
                  <div
                    v-if="submitStatus && !$v.form.approve.required"
                    class="error d-block"
                  >
                    Yukarıdaki maddeleri onaylayınız
                  </div>
                </div>

                <div class="col-md-12">
                  <div class="form-group nap-transfer-error">
                    <div
                      v-if="resultError"
                      class="alert alert-danger text-center"
                    >
                      <span v-html="resultError"></span>
                    </div>

                    <div v-if="resultSuccess">
                      <div
                        v-if="activeItem.messageAfterRequest"
                        class="alert alert-success"
                      >
                        <span v-html="activeItem.messageAfterRequest"></span>
                      </div>
                      <p>
                        Napolyon.com'da NAP Puanların, yeterli seviyeye
                        ulaştığında, ister anlaşmalı olduğumuz web sitelerinde
                        yapacağın alışverişlerde sana özel indirim ve hediye
                        çeklerinden yararlanabilir, ister çekilişlere katılarak
                        büyük ödülleri kazanma fırsatı elde edebilirsin.
                      </p>
                      <div class="h15"></div>
                      <p>
                        <strong>
                          Hemen NAP Puanlarını harca, sana özel fırsatları sakın
                          kaçırma!
                        </strong>
                      </p>
                      <div class="alert alert-info" role="alert">
                        <p>
                          Transfer edilen NAP Puanlar hesabınıza yalnızca
                          transfer talebini takip eden 1 saat içerisinde iade
                          edilebilir, daha sonra iade talep edilemez.
                        </p>
                      </div>
                    </div>
                    <div
                      v-else
                      class="mt-auto p-2 justify-content-center d-flex align-items-center"
                    >
                      <button
                        :disabled="
                          napTransferLoading ||
                            !(Number(activeItem.point) < Number(user.point))
                        "
                        class="btn btn-primary"
                        type="button"
                        @click="approveCampaign(3)"
                      >
                        Onaylıyorum
                      </button>
                      <button
                        class="btn btn-warning ml-2"
                        type="button"
                        @click.prevent="
                          showItemDetails = null;
                          selectedItem = null;
                          scrollToTop(0, 0);
                        "
                      >
                        Vazgeç
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else-if="selectedItem">
      <div class="rounded shadow border-bottom p-4 mb-2">
        <div class="container">
          <div v-if="loading" class="row">
            <loader :loading="loading" style="width: 100%"></loader>
          </div>
          <div v-else class="row">
            <div
              v-for="(item, index) in items"
              :key="index"
              class="col-sm-6 col-12 pb-4"
            >
              <div class="rounded shadow border-bottom ">
                <div class="d-flex flex-column nap-transfer-box">
                  <div
                    class="p-2 d-flex justify-content-center align-items-center"
                  >
                    <img
                      v-if="selectedItem === 1"
                      :alt="item.campaignName"
                      :src="mediaBase + '/images/tocev-logo-.jpg'"
                      class="avatar avatar-medium border-radius-10"
                    />
                    <img
                      v-else-if="selectedItem === 3"
                      :alt="item.campaignName"
                      :src="mediaBase + '/images/napolyon-100tl.png'"
                      class="avatar avatar-medium border-radius-10"
                    />
                    <img
                      v-else
                      :alt="item.campaignName"
                      :src="
                        item.image2
                          ? cdnImagePrefix + item.image2
                          : defaultImage
                      "
                      class="avatar avatar-medium border-radius-10"
                    />
                  </div>
                  <div
                    class="mt-auto p-2 justify-content-center d-flex align-items-center"
                  >
                    <h5 class="text-center">
                      <span class="text-muted text-justify">{{
                        item.campaignName
                      }}</span>
                    </h5>
                  </div>
                  <div
                    class="mt-auto p-2 justify-content-center d-flex align-items-center d-flex align-text-bottom"
                  >
                    <button
                      class="btn btn-sm btn-primary"
                      type="button"
                      @click.prevent="showDetailItemToGet(item)"
                    >
                      {{ selectedItem === 1 ? "Destek Ol" : "Hemen Al" }}
                    </button>
                    <button
                      class="btn btn-sm btn-info ml-2"
                      type="button"
                      @click.prevent="showDetailItem(item)"
                    >
                      Detay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div
              class="col-lg-12 col-md-12 col-12 reply d-flex justify-content-center align-content-center"
            >
              <button
                class="btn btn-sm btn-outline-primary"
                type="button"
                @click.prevent="
                  selectedItem = null;
                  scrollToTop(0, 0);
                "
              >
                <i class="fa fa-chevron-left mr-2"></i>
                Geri
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="rounded shadow border-bottom py-2 px-4 mb-4">
        <div class="row">
          <div class="col-12">
            <p>
              Napolyon.com'da NAP Puanların, yeterli seviyeye ulaştığında, ister
              anlaşmalı olduğumuz web sitelerinde yapacağın alışverişlerde sana
              özel indirim ve hediye çeklerinden yararlanabilir, ister
              çekilişlere katılarak büyük ödülleri kazanma fırsatı elde
              edebilirsin.
            </p>
            <p>
              <b
                >Hemen NAP Puanlarını harca, sana özel fırsatları sakın
                kaçırma!</b
              >
            </p>
            <div class="alert alert-info">
              <i class="fa fa-info-circle"></i>
              Transfer edilen NAP Puanlar hesabınıza yalnızca transfer talebini
              takip eden 1 saat içerisinde iade edilebilir, daha sonra iade
              talep edilemez.
            </div>
          </div>
        </div>
      </div>
      <!-- <div
          class="rounded shadow border-bottom p-2 cursor-pointer"
          @click.prevent="onClickItem(1)"
      >
        <div class="d-flex justify-content-around">
          <div class="justify-content-center d-flex align-items-center">
            <img
                :src="mediaBase + '/images/nap-transfer/SOSYALSORUMLULUK.png'"
                alt="Sosyal Sorumluluk Projesi"
                class="avatar avatar-medium"
            />
          </div>
          <div class="justify-content-center d-flex align-items-center">
            <h3>
              <span class="text-muted"
              >SOSYAL SORUMLULUK <br/>
                PROJESİNE KATIL</span
              >
            </h3>
          </div>
        </div>
      </div>
-->
      <div
        class="rounded shadow border-bottom p-2 mt-4 cursor-pointer"
        @click.prevent="onClickItem(2)"
      >
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="d-flex justify-content-around">
              <div class="justify-content-center d-flex align-items-center">
                <h3>
                  <span class="text-muted">HEDİYE ÇEKİNE<br />DÖNÜŞTÜR</span>
                </h3>
              </div>
              <div class="justify-content-center d-flex align-items-center">
                <img
                  :src="mediaBase + '/images/nap-transfer/HEDIYECEKI.png'"
                  alt="Hediye Çekine Dönüştür"
                  class="avatar avatar-medium"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="rounded shadow border-bottom p-2 mt-4 cursor-pointer"
        @click.prevent="onClickItem(3)"
      >
        <div class="row">
          <div class="col-lg-12 col-md-12 col-12">
            <div class="d-flex justify-content-around">
              <div class="justify-content-center d-flex align-items-center">
                <img
                  :src="mediaBase + '/images/nap-transfer/100TL-TALEP.png'"
                  alt="100 TL Talep Et"
                  class="avatar avatar-medium"
                />
              </div>

              <div class="justify-content-center d-flex align-items-center">
                <h3>
                  <span class="text-muted"
                    >100 ₺ <br />
                    TALEP ET</span
                  >
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import feather from "feather-icons";
import store from "@/core/services";
import module, {
  ERROR,
  MODULE_NAME,
  USER,
} from "@/core/services/store/auth.module";
import ntCampaignModule, {
  BASE_URL,
  GET_ITEMS,
  GET_TOCEV_STATUS,
  SET_TOCEV_STATUS,
  ITEMS,
  LOADING,
  LOADING_TOCEV_STATUS,
  MODULE_NAME as MODULE_NAME_NT_CAMPAIGN,
  SET_ITEMS,
  SET_LOADING as SET_LOADING_NT_CAMPAIGN,
  TOCEV_STATUS,
} from "@/core/services/store/ntCampaign.module";
import userModule, {
  GET_POINT_CUP,
  MODULE_NAME as MODULE_NAME_USER,
} from "@/core/services/store/user.module";
import {
  CREATE_ITEM,
  GET_ITEMS as REST_GET_ITEMS,
  SET_GENERAL_LOADING as SET_LOADING,
} from "@/core/services/store/rest.module";

import moment from "moment";
import { required } from "vuelidate/lib/validators";
import Loader from "@/view/components/Loader";
import router from "@/router";

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_NT_CAMPAIGN = MODULE_NAME_NT_CAMPAIGN;
const _MODULE_NAME_USER = MODULE_NAME_USER;

export default {
  name: "napTransfers",
  components: { Loader },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_NT_CAMPAIGN, ntCampaignModule);
    registerStoreModule(_MODULE_NAME_USER, userModule);
  },
  validations() {
    if (this.selectedItem == 3) {
      return {
        form: {
          firstName: {
            required,
          },
          lastName: {
            required,
          },
          tcNo: {
            required,
          },
          day: {
            required,
          },
          month: {
            required,
          },
          year: {
            required,
          },
          iban: {
            required,
          },
          approve: {
            required,
          },
        },
      };
    }
    return {
      form: {
        firstName: {
          required,
        },
        lastName: {
          required,
        },
        tcNo: {
          required,
        },
        day: {
          required,
        },
        month: {
          required,
        },
        year: {
          required,
        },
      },
    };
  },
  data() {
    return {
      tocevDescription: true,
      selectedItem: null,
      campaignDetail: null,
      napTransferLoading: false,
      campaignDetailLoading: false,
      showDetails: null,
      showItemDetails: null,
      activeItem: null,
      resultSuccess: null,
      resultError: null,
      firstName: null,
      lastName: null,
      email: null,
      submitStatus: false,
      tcNoError: false,
      form: {
        firstName: null,
        lastName: null,
        tcNo: null,
        day: null,
        month: null,
        year: null,
        iban: null,
        approve: false,
      },
    };
  },
  computed: {
    user: {
      get() {
        return store.getters[_MODULE_NAME + "/" + USER];
      },
      set(value) {},
    },
    tocevStatus: {
      get() {
        let item = store.getters[_MODULE_NAME_NT_CAMPAIGN + "/" + TOCEV_STATUS];
        if (item && item.status == "1") {
          return true;
        } else if (item && item.status == "0") {
          return false;
        }

        return undefined;
      },
      set(value) {},
    },
    tocevStartDate() {
      let item = store.getters[_MODULE_NAME_NT_CAMPAIGN + "/" + TOCEV_STATUS];
      if (item && item.status == "1") {
        return item.date
          ? moment(item.date).format("DD.MM.YYYY")
          : moment().format("DD.MM.YYYY");
      }
      return moment().format("DD.MM.YYYY");
    },
    today() {
      return moment().format("DD.MM.YYYY");
    },
    items() {
      return store.getters[_MODULE_NAME_NT_CAMPAIGN + "/" + ITEMS];
    },
    loading() {
      return store.getters[_MODULE_NAME_NT_CAMPAIGN + "/" + LOADING];
    },
    loadingTocevStatus() {
      return store.getters[
        _MODULE_NAME_NT_CAMPAIGN + "/" + LOADING_TOCEV_STATUS
      ];
    },
    error() {
      return store.getters[_MODULE_NAME + "/" + ERROR];
    },
  },
  methods: {
    approveCampaign: function(item) {
      this.submitStatus = false;
      this.resultSuccess = false;
      this.resultError = false;
      this.tcNoError = false;
      if (item == 1) {
        if (this.tocevStatus) {
          store.commit(
            _MODULE_NAME_NT_CAMPAIGN + "/" + LOADING_TOCEV_STATUS,
            true
          );
          store.commit(SET_LOADING, true);
          this.$store
            .dispatch(CREATE_ITEM, {
              url: "/mobile/tocevNapTransferi/delete",
              contents: {},
              isAuthenticated: localStorage.getItem("token"),
              returnType: "stateless",
            })
            .then((response) => {
              if (response.status) {
                this.getTocevStatus();
                this.getUserPoint();
              } else {
                try {
                  let errorMessage;
                  if (response.data.response.data.content) {
                    errorMessage = response.data.response.data.content;
                  } else {
                    errorMessage =
                      "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                  this.showErrorNotification("Hata Oluştu", errorMessage);
                } catch (err) {
                  this.showErrorNotification();
                }
              }
              store.commit(SET_LOADING, false);
              store.commit(
                _MODULE_NAME_NT_CAMPAIGN + "/" + LOADING_TOCEV_STATUS,
                false
              );
            });
        } else {
          store.commit(
            _MODULE_NAME_NT_CAMPAIGN + "/" + LOADING_TOCEV_STATUS,
            true
          );
          store.commit(SET_LOADING, true);
          this.$store
            .dispatch(CREATE_ITEM, {
              url: "/mobile/tocevNapTransferi",
              contents: {},
              isAuthenticated: localStorage.getItem("token"),
              returnType: "stateless",
            })
            .then((response) => {
              if (response.status) {
                this.getTocevStatus();
                this.getUserPoint();
              } else {
                try {
                  let errorMessage;
                  if (response.data.response.data.content) {
                    errorMessage = response.data.response.data.content;
                  } else {
                    errorMessage =
                      "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                  this.showErrorNotification("Hata Oluştu", errorMessage);
                } catch (err) {
                  this.showErrorNotification();
                }
              }
              store.commit(SET_LOADING, false);
              store.commit(
                _MODULE_NAME_NT_CAMPAIGN + "/" + LOADING_TOCEV_STATUS,
                false
              );
            });
        }
      } else {
        this.submitStatus = true;
        if (!this.$v.form.$invalid) {
          if (!this.tcCheck(this.form.tcNo)) {
            this.tcNoError = true;
            return false;
          }
          store.commit(SET_LOADING, true);
          this.napTransferLoading = true;
          this.$store
            .dispatch(CREATE_ITEM, {
              url: "/mobile/napTransfer/save",
              returnType: "stateless",
              contents: {
                additionalInfo: {},
                campaignId: this.activeItem.campaignId,
                dogumAyi: this.form.month,
                dogumGunu: this.form.day,
                dogumYili: this.form.year,
                firstName: this.form.firstName,
                iban: this.form.iban,
                lastName: this.form.lastName,
                tckn: this.form.tcNo,
              },
              isAuthenticated: localStorage.getItem("token"),
            })
            .then((response) => {
              if (response.status) {
                this.resultSuccess = true;
                this.getUserPoint();
              } else {
                let element = document.getElementsByClassName(
                  "nap-transfer-error"
                );
                let top = element[0].offsetTop;
                window.scrollTo(0, Number(top) - 100);

                try {
                  if (response.data.response.data.content) {
                    this.resultError = response.data.response.data.content;
                  } else {
                    this.resultError =
                      "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                  }
                } catch (err) {
                  this.resultError =
                    "İşlem yapılırken hata oluştu. Lütfen sonra tekrar deneyiniz";
                }
              }
              store.commit(SET_LOADING, false);
              this.napTransferLoading = false;
            });
        } else {
          let element = document.getElementById("nap-transfer-page");
          let top = element.offsetTop;
          window.scrollTo(0, Number(top) - 100);
        }
      }
    },
    showDetailItemToGet(item) {
      this.showItemDetails = true;
      this.activeItem = item;
      this.submitStatus = false;
      this.resultSuccess = false;
      this.resultError = false;
      this.tcNoError = false;
      this.campaignDetail = null;
      if (this.selectedItem == 1) {
        this.getTocevStatus();
      }
    },
    showDetailItem(item) {
      let self = this;
      self.campaignDetailLoading = true;
      store.commit(
        _MODULE_NAME_NT_CAMPAIGN + "/" + SET_LOADING_NT_CAMPAIGN,
        true
      );
      this.addHashToLocationDetail(2, item.campaignId);
      this.$store
        .dispatch(REST_GET_ITEMS, {
          url: BASE_URL + "/" + item.campaignId,
          filters: {},
        })
        .then((response) => {
          if (response.status) {
            self.campaignDetail = response.data;
          }
          store.commit(
            _MODULE_NAME_NT_CAMPAIGN + "/" + SET_LOADING_NT_CAMPAIGN,
            false
          );
          self.campaignDetailLoading = false;
        });
    },
    addHashToLocation(type) {
      router.push({
        name: "user.nap_transfers",
        params: { type: type },
      });
    },
    addHashToLocationDetail(type, id) {
      router.push({
        name: "user.nap_transfers",
        params: { type: type, id: id },
      });
    },
    onClickItem(type, detailId = null) {
      this.submitStatus = false;
      this.resultSuccess = false;
      this.resultError = false;
      this.tcNoError = false;
      this.$store.commit(_MODULE_NAME_NT_CAMPAIGN + "/" + SET_ITEMS, {});

      this.$store.dispatch(_MODULE_NAME_NT_CAMPAIGN + "/" + GET_ITEMS, {
        url: BASE_URL,
        filters: {
          type: type,
        },
      });
      this.selectedItem = type;

      if (!detailId) {
        this.addHashToLocation(type);
      }

      if (type == 1) {
        this.showItemDetails = true;
        this.activeItem = {
          campaignId: null,
          point: 0,
          haveMobile: 0,
          isActive: 1,
          isLive: 1,
          sortOrder: 1,
          isPromotionCodeActive: null,
          relatedPromotionCodePoolId: null,
          isBankInfoNeeded: null,
          isAdditionalInfoNeeded: null,
          pointSourceOnRequest: null,
          pointSourceOnCancel: null,
          maxAttendCount: null,
          relatedCampaignId: null,
          discountPercent: null,
          maxAttendPeriodId: null,
          requiredNapPoint: null,
          isCupTask: null,
          earnedNapPoint: null,
          earnedCupQuantity: null,
          campaignType: null,
          campaignName: "Toçev'e Destek",
          image1: null,
          image2: null,
          description: "1 Aylık Kitap",
          detailUrl: null,
          startDate: "2001-01-01",
          finishDate: null,
          messageAfterRequest: null,
          specialCampaign: null,
          additionalInfoCaption: null,
          additionalInfoControlRegex: null,
          additionalInfoErrorMessage: null,
          adminDescription: null,
          newRequest: null,
          totalRequest: null,
          totalPromotion: null,
          usedPromotion: null,
        };
        this.submitStatus = false;
        this.resultSuccess = false;
        this.resultError = false;
        this.tcNoError = false;
        this.getTocevStatus();
      }
      if (type == 3) {
        this.showItemDetails = true;
        this.activeItem = {
          campaignId: 4,
          point: 100000,
          haveMobile: null,
          isActive: 1,
          isLive: 1,
          sortOrder: 3001,
          isPromotionCodeActive: 0,
          relatedPromotionCodePoolId: null,
          isBankInfoNeeded: 1,
          isAdditionalInfoNeeded: 0,
          pointSourceOnRequest: 2,
          pointSourceOnCancel: 5,
          maxAttendCount: 0,
          relatedCampaignId: 362,
          discountPercent: null,
          maxAttendPeriodId: null,
          requiredNapPoint: null,
          isCupTask: null,
          earnedNapPoint: null,
          earnedCupQuantity: null,
          campaignType: null,
          campaignName: "Ňapolyon",
          image1: "",
          image2: "",
          description: "100 TL<br />Nakit Ödeme",
          detailUrl: "",
          startDate: "2010-05-08",
          finishDate: null,
          messageAfterRequest:
            "100.000 (N) nap transfer talebinizi başarıyla gerçekleştirdiniz.<br /><br />Napolyon 100 TL ödeme talebiniz Pazartesi günü 08:00’de  Finans Birimimize iletildikten sonra, takip eden hafta Cuma günü ödemeniz hesabınıza yatırılacaktır.<br /><br />Pazartesi 08:00’den sonraki talepler bir sonraki hafta Finans Birimine iletilmektedir.<br /><br />Güvenlik kontrollerinizle ilgili örtüşmeyen bir durum söz konusu olduğunda Napolyon ekibi sizi bilgilendiriyor olacaktır.",
          specialCampaign: "NapolyonCash",
          additionalInfoCaption: null,
          additionalInfoControlRegex: null,
          additionalInfoErrorMessage: null,
          adminDescription: "100 TL Nakit Para Transferi",
          newRequest: null,
          totalRequest: null,
          totalPromotion: null,
          usedPromotion: null,
        };
        this.submitStatus = false;
        this.resultSuccess = false;
        this.resultError = false;
        this.tcNoError = false;
        this.getTocevStatus();
      }
    },
    getItems() {
      this.$store.dispatch(_MODULE_NAME_NT_CAMPAIGN + "/" + GET_ITEMS, {
        url: BASE_URL,
        filters: {
          type: 4,
        },
      });
    },
    getTocevStatus() {
      this.$store.commit(
        _MODULE_NAME_NT_CAMPAIGN + "/" + SET_TOCEV_STATUS,
        null
      );
      this.$store.dispatch(_MODULE_NAME_NT_CAMPAIGN + "/" + GET_TOCEV_STATUS, {
        url: "mobile/tocevNapTransferi",
        filters: {},
      });
    },
    getUserPoint() {
      let filters = {};

      store.dispatch(_MODULE_NAME_USER + "/" + GET_POINT_CUP, {
        url: "/mobile/memberPoint/points",
        filters: filters,
      });
    },
  },
  mounted() {
    feather.replace();
    if (this.$route.params.type) {
      let type = Number(this.$route.params.type);
      if (type > 0 && type < 4) {
        let id = Number(this.$route.params.id);
        if (id && type == 2) {
          this.onClickItem(Number(type), id);
          let item = {
            campaignId: id,
          };
          this.showDetailItem(item);
        } else if (type > 0 && type < 4) {
          this.onClickItem(Number(type));
        }
      } else {
        this.$router.go(-1);
      }
    }

    let day = this.user.birthday
      ? Number(this.user.birthday.split("-")[2])
      : "01";
    let month = this.user.birthday
      ? Number(this.user.birthday.split("-")[1])
      : "01";
    let year = this.user.birthday
      ? Number(this.user.birthday.split("-")[0])
      : "1989";
    this.form = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      tcNo: this.user.tcNo,
      day:
        day.length != 2
          ? day.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })
          : 0,
      month:
        month.length != 2
          ? month.toLocaleString("en-US", {
              minimumIntegerDigits: 2,
              useGrouping: false,
            })
          : month,
      year:
        year.length != 4
          ? year.toLocaleString("en-US", {
              minimumIntegerDigits: 4,
              useGrouping: false,
            })
          : year,
      iban:
        this.user.memberIbanObject && this.user.memberIbanObject.iban1
          ? this.user.memberIbanObject.iban1
          : null,
    };
  },
  watch: {
    tocevStatus(value) {
      if (value) {
        this.tocevDescription = false;
      }
    },
    "$route.params.type": function(id) {
      if (!id) {
        this.selectedItem = null;
        this.activeItem = null;
        this.showDetails = false;
        this.showItemDetails = false;
        this.campaignDetail = false;
      }
    },
    items(value) {
      if (value && Object.keys(value).length) {
        if (this.selectedItem === 1) {
          this.activeItem = value[0];
        }
        if (this.selectedItem === 3) {
          this.activeItem = value[0];
        }
      }
    },
    activeItem(value) {
      let self = this;
      if (value) {
        if (Number(value.point) > Number(this.user.point)) {
          self.showErrorNotification(
            "Uyarı",
            "Bu kampanyadan faydalanabilmek için " +
              this.formatNumber(value.point) +
              " NAP puanına ulaşmanız gerekmektedir"
          );
          setTimeout(() => {
            self.selectedItem = null;
            self.activeItem = null;
            self.showDetails = null;
            self.showItemDetails = null;
            self.campaignDetail = null;
            router.push({
              name: "user.nap_transfers",
            });
          }, 1000);
        }
      }
    },
  },
};
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.border-radius-10 {
  border-radius: 10px;
}

.nap-transfer-box {
  min-height: 270px;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background: #aaaec4 !important;
  color: white !important;
}

/* Main Classes */
.custom-checkbox[type="checkbox"]:not(:disabled):hover:before {
  border-color: #010d10;
}

/* Large checkboxes */
.custom-checkbox.large {
  height: 22px;
  width: 22px;
}

.custom-checkbox.large[type="checkbox"]:before {
  width: 20px;
  height: 20px;
}

.custom-checkbox.large[type="checkbox"]:after {
  top: -20px;
  width: 16px;
  height: 16px;
}

.scroll-overflow {
  overflow: scroll;
}
</style>
