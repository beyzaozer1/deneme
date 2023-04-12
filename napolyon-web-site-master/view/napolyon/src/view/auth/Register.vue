<template>
  <div>
    <div class="back-to-home rounded d-sm-block">
      <a class="btn btn-icon btn-primary" href=""
        ><i class="icons" data-feather="home"> </i>
      </a>
    </div>
    <section class="m-0 p-0">
      <div v-if="loading">
        <loading :loading="loading"></loading>
      </div>
      <div
        v-else
        class="container-fluid m-0 p-0 register-screen-cover-container"
        style="background-image: url('images/user/uyeol.png')"
      >
        <div class="row m-0 p-0" style="max-width: 100%;">
          <div class="col-md-6 col-lg-4 register-part-background-bigger-screen">
            <div
              class="d-flex justify-content-center align-items-center"
              style="min-height: 100vh"
            >
              <div class="container-fluid my-2">
                <div class="d-flex justify-content-center" style="width:100%">
                  <form
                    class="form-background-register-screen border border-dark shadow rounded my-2 py-1"
                    style="min-width: 300px; width: 60vw; max-width: 600px;"
                  >
                    <h4 class="card-title text-center m-0 p-0">Üye Ol</h4>
                    <div
                      v-if="registerError"
                      class="error d-block text-center p-2"
                    >
                      <span v-html="registerError"></span>
                    </div>
                    <div class="row m-0 p-0" style="width:100%;">
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <div class="position-relative">
                            <i
                              class="fea icon-sm icons"
                              data-feather="user"
                              style="z-index:2;"
                            ></i>
                            <input
                              v-model="firstName"
                              class="form-control pl-5"
                              name="name"
                              placeholder="Ad"
                              required=""
                              type="text"
                            />
                          </div>
                          <div
                            v-if="submitStatus && !$v.firstName.required"
                            class="error d-block"
                          >
                            Adınızı giriniz
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <div class="position-relative">
                            <i
                              class="fea icon-sm icons"
                              data-feather="user"
                              style="z-index:2;"
                            ></i>
                            <input
                              v-model="lastName"
                              class="form-control pl-5"
                              name="surname"
                              placeholder="Soyad"
                              required=""
                              type="text"
                            />
                          </div>
                          <div
                            v-if="submitStatus && !$v.firstName.required"
                            class="error d-block"
                          >
                            Soyadınızı giriniz
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row m-0 p-0" style="width: 100%;">
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <select
                            v-model="gender"
                            class="form-control custom-select"
                          >
                            <option
                              v-for="(item, index) in genders"
                              :key="index"
                              :value="item.value"
                              >{{ item.text }}
                            </option>
                          </select>
                          <div
                            v-if="submitStatus && !$v.gender.required"
                            class="error d-block"
                          >
                            Cinsiyetinizi giriniz
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <select
                            v-model="homeCity"
                            class="form-control custom-select"
                          >
                            <option
                              v-for="(item, index) in cities"
                              :key="index"
                              :value="item.value"
                              >{{ item.text }}
                            </option>
                          </select>
                          <div
                            v-if="submitStatus && !$v.homeCity.required"
                            class="error d-block"
                          >
                            Yaşadığınız ili giriniz
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row m-0 p-0" style="width: 100%;">
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <div class="position-relative">
                            <i
                                class="fea icon-sm icons"
                                data-feather="gift"
                                style="z-index:2;"
                            ></i>
                            <input
                                v-model="birthday"
                                class="form-control pl-5"
                                name="surname"
                                required=""
                                type="date"
                            />
                          </div>
                          <div v-if="submitStatus && !$v.birthday.required" class="error d-block">
                            Doğum tarihinizi giriniz
                          </div>
                          <div v-if="submitStatus && birthday && !userAge" class="error d-block">
                            Üye olabilmek için 15 yaşını doldurmuş olmalısınız
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <div class="position-relative">
                            <i
                              class="fea icon-sm icons"
                              data-feather="mail"
                              style="z-index:2;"
                            ></i>
                            <input
                              v-model.trim="email"
                              class="form-control pl-5"
                              name="email"
                              placeholder="E-Posta"
                              required=""
                              type="email"
                            />
                          </div>
                          <div
                            v-if="submitStatus && !$v.email.required"
                            class="error d-block"
                          >
                            E-Posta adresinizi giriniz
                          </div>
                          <div
                            v-if="submitStatus && !$v.email.email"
                            class="error d-block"
                          >
                            Geçerli bir E-Posta adresi giriniz
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="row m-0 p-0" style="width: 100%;">
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <div class="position-relative">
                            <i
                              class="fea icon-sm icons"
                              data-feather="key"
                              style="z-index:2;"
                            ></i>
                            <input
                              v-model="password"
                              class="form-control pl-5"
                              placeholder="Şifre"
                              required=""
                              type="password"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-md-6 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <div class="position-relative">
                            <i
                              class="fea icon-sm icons"
                              data-feather="key"
                              style="z-index:2;"
                            ></i>
                            <input
                              v-model="password_confirm"
                              class="form-control pl-5"
                              placeholder="Şifre Tekrar"
                              required=""
                              type="password"
                            />
                          </div>

                        </div>
                      </div>

                      <div class="col-md-12 m-0 px-3 py-1">
                        <div class="form-group m-0 p-2">
                          <div
                              v-if="
                              submitStatus &&
                                !$v.password_confirm.sameAsPassword
                            "
                              class="error d-block"
                          >
                            Girdiğiniz şifreler aynı olmalıdır.
                          </div>

                          <div
                              v-if="
                              submitStatus &&
                                !$v.password.valid &&
                                $v.password.minLength
                            "
                              class="error d-block"
                          >
                            Şifreniz en az {{ $v.password.$params.minLength.min }} karakter uzunluğunda olup, harf ve rakamlardan oluşmalıdır
                          </div>
                        </div>
                        </div>

                    </div>

                    <div
                      class="form-group px-4 py-2 m-0"
                      style="padding-bottom: 0px !important;"
                    >
                      <div class="custom-control custom-checkbox">
                        <input
                          id="customCheck1"
                          v-model="agreement"
                          class="custom-control-input"
                          type="checkbox"
                        />
                        <label class="custom-control-label" for="customCheck1">
                          <a
                            class="text-primary"
                            href="#"
                            @click.prevent="showModal('uyelik-sozlesmesi')"
                            >{{ $t("login.membership_agreement") }}</a
                          >{{ $t("login.ni_or")
                          }}<a
                            class="text-primary"
                            href="#"
                            @click.prevent="showModal('aydinlatma-metni')"
                            >{{
                              $t("login.survey_participant_clarification_text")
                            }}</a
                          >{{ $t("login.read_and_accept") }}
                        </label>
                      </div>
                      <div
                        v-if="submitStatus && !$v.agreement.required"
                        class="error d-block"
                      >
                        Üyelik sözleşmesini ve Anket katılımcı aydınlatma
                        metnini kabul etmelisiniz
                      </div>
                    </div>

                    <div class="form-group px-4 py-2 m-0">
                      <div
                        class="custom-control custom-checkbox"
                        style="padding-top: 0px !important;"
                      >
                        <input
                          id="customCheck11"
                          v-model="permission"
                          class="custom-control-input"
                          type="checkbox"
                        />
                        <label class="custom-control-label" for="customCheck11">
                          {{ $t("login.to_take_advantage") }}
                          <a
                            class="text-primary"
                            href="#"
                            @click.prevent="showModal('iletisim')"
                            >{{ $t("login.content") }}</a
                          >
                          {{ $t("login.accept_it_to_pass") }}
                        </label>
                      </div>
                      <div
                          v-if="submitStatus && !$v.permission.required"
                          class="error d-block"
                      >
                        Napolyon.com'un sizinle iletişime geçmesini kabul etmelisiniz
                      </div>
                    </div>

                    <div class="px-4 py-2 m-0">
                      <button
                        class="btn btn-block btn-primary"
                        type="button"
                        :disabled="loading"
                        @click="submit"
                      >
                        {{ $t("login.free_sing_up") }}
                      </button>
                    </div>

                    <div
                      class="d-flex justify-content-center d-none"
                      style="width:100%; display: none"
                    >
                      <button
                        class="btn btn-light btn-social-login m-2"
                        type="button"
                      >
                        <i class="mdi mdi-facebook text-primary"></i>
                        <span class="text-nowrap">{{
                          $t("login.facebook")
                        }}</span>
                      </button>
                      <button
                        class="btn btn-light btn-social-login m-2"
                        type="button"
                      >
                        <i class="mdi mdi-google text-danger"></i>
                        <span class="text-nowrap">{{
                          $t("login.google")
                        }}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div
            class="col col-lg-8 big-screen-image-register-screen"
            data-jarallax='{"speed": 0.5}'
            style="background-image:url('images/user/uyeol.png'); min-height: 100%;"
          ></div>
        </div>
      </div>
    </section>
    <div id="uyelik-sozlesmesi" class="modal fade">
      <div
        class="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              NAPOLYON.COM ÜYELİK SÖZLEŞMESİ
            </h5>
            <button
              aria-label="Close"
              class="close"
              data-dismiss="modal"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll">
            <div class="">
              <br />
              1. TARAFLAR<br />
              <br />
              İşbu sözleşme ve sözleşmeyle atıfta bulunulan ve sözleşmenin
              ayrılmaz bir parçası olan belgelerden ve eklerden (EK-1 Gizlilik
              Politikası,) ve (EK-2 Nap Puan Kullanım Koşulları) oluşan işbu
              Üyelik Sözleşmesi (Hepsi birlikte 'Sözleşme' olarak anılacaktır),
              Napolyon Reklam ve Danışmanlık Hizmetleri Tic. A.Ş. (Bundan böyle
              kısaca 'Napolyon.com' olarak anılacaktır) ile Napolyon.com
              sitesine işbu Sözleşme' de belirtilen koşullar dahilinde kayıt
              olan Üye arasında, Üye'nin elektronik olarak onay vermesi ile
              karşılıklı olarak kabul edilerek üyenin onay verme tarihinde
              yürürlüğe girmiştir. <br />
              <br />
              2. TANIMLAR<br />
              <br />
              İletişim Kanalları: Üye' nin Site' ye üye olduktan sonra Mesajları
              izlediği cep telefonu, sabit telefon, e-posta ve posta adresi gibi
              ve fakat bunlarla sınırlı olmaksızın her türlü iletişim
              mecralarını<br />
              <br />
              İzinli Pazarlama Hizmeti: Müşteri ile yapılan anlaşma sonucunda
              Mesajların Üye' ye İletişim Kanalları’ndan iletilmesi ve Üye'nin
              gelir oranının Nap Puanlar'ı doğrultusunda hesaplanarak, Üye'nin
              Üye hesabına iletilmesine yönelik olarak işbu Sözleşme'de
              belirtilen koşullar dahilinde Napolyon.com tarafından sağlanan
              hizmeti; <br />
              <br />
              Mesaj(lar): Müşteriler'in, Üyeler'e pazarlama, araştırma, kampanya
              vesair amaçlarla gönderecekleri, Üyeler'in Site'ye üye olurken
              Müşteriler tarafından kendilerine gönderilmesine izin verdikleri
              tüm mesajları; <br />
              <br />
              Müşteri(ler): Sundukları ürün ya da hizmetlerle ilgili olarak
              Üyeler'e pazarlama, araştırma, kampanya, benzer vesair amaçlarla
              Mesaj gönderilmesi veya gösterilmesi suretiyle İzinli Pazarlama
              Yönetimi Hizmeti'nden ve izinli veri tabanından aydalanmak üzere
              Napolyon.com ile anlaşma yapan gerçek ve tüzel kişileri; <br />
              <br />
              Ödeme Sistemi: Üyeler'in işbu Sözleşme içerisinde tanımlı
              işlemleri gerçekleştirmeleri sonucunda; Üye hesabında biriken Nap
              Puanlar karşılığında Napolyon.com'un “Nap Puanlarım Sayfasından
              görüntülenecek miktarda ödenmesini ve/veya bahsi geçen Nap Puanlar
              kullandırılarak Napolyon.com ile anlaşmalı kurumlarda sunulan
              hizmetlerden yararlanmasının sağlandığı ve Site'nin ”Nasıl
              Kazanırım? Ve Nap Puan Nedir?” bölümlerinde detaylı olarak
              açıklanan sistemi; <br />
              <br />
              Nap Puan(lar): Üyeler’in tüm İletişim Kanalları’ndan gördükleri,
              Mesajlar başta olmak üzere, Site’de sunulan anket, forum gibi
              ürünler üzerinden kazandıkları puanları; <br />
              <br />
              Napolyon.com Hizmetleri ('Kısaca Hizmet(ler)'): Site içerisinde
              Üyeler'in işbu Sözleşme içerisinde tanımlı olan iş ve işlemlerini
              gerçekleştirmelerini sağlamak amacıyla Napolyon.com tarafından
              ortaya konulan İzinli Pazarlama Hizmeti dahil tüm uygulamaları;
              <br />
              <br />
              Site: www.Napolyon.com isimli alan adından ve bu alan adına bağlı
              alt alan adlarından oluşan web sitesi ve bu site ile bağlantılı
              olarak oluşturulan katma değerli hizmetlerin sunulduğu mecraları;
              <br />
              <br />
              Sisteme Erişim Araçları: Üye'nin, Üye Hesabı Yönetim Sayfası ve
              Napolyon.com Hizmetleri'ne erişimini sağlayan kullanıcı adı,
              parola ve/veya şifre v.b. gibi yalnızca Üye tarafından bilinen
              bilgileri; <br />
              <br />
              Üye(ler): Siteye Napolyon.com tarafından belirlenen yöntemlerle
              kayıt olan ve Napolyon.com tarafından üyeliği onaylanan, Site'de
              sunulan Hizmetler'den işbu Sözleşmede belirtilen koşullar
              dahilinde yararlanan kişi(ler)i; <br />
              <br />
              Üye Hesabı Yönetim Sayfası: Üye'nin yalnızca Sisteme Erişim
              Araçlarını kullanarak ulaştığı üyeliğine ilişkin iş ve işlemlerde
              bulunduğu kendisine özel web sayfasını ifade etmektedir. <br />
              <br />
              3. Sözleşme'nin Konusu ve Kapsamı <br />
              <br />
              İşbu Sözleşme'nin konusu, Üye'ye yönelik olarak Napolyon.com
              tarafından Site'de mevcut olan ve/veya ileride sunulacak tüm
              Hizmetler'in, bu Hizmetler'den yararlanma şartlarının ve
              tarafların hak ve yükümlülüklerinin tespitidir. İşbu Sözleşme'nin
              kapsamı işbu Sözleşme ve ekleri ile Site içerisinde yer alan
              kullanıma, üyeliğe ve Hizmetler'e ilişkin Napolyon.com tarafından
              yapılmış olan bilcümle uyarı, yazı ve açıklama gibi beyanlardır.
              Üye, işbu Sözleşme hükümlerini kabul etmekle, Site içinde yer alan
              kullanıma, üyeliğe ve Hizmetler'e ilişkin Napolyon.com tarafından
              açıklanan her türlü beyanı da kabul etmiş olmaktadır. Üye bahsi
              geçen beyanlarda belirtilen her türlü hususa uygun davranacağını
              kabul, beyan ve taahhüt eder. <br />
              <br />
              4. Üyelik ve Hizmet Kullanımı Şartları <br />
              <br />
              a) Site'nin ilgili bölümünden üye olmak isteyen kişinin Siteye üye
              olmak için gerekli bilgilerini verilmesi, bilgilerin doğruluğunun
              onaylanması, bilgilerin gönderilmesi suretiyle kayıt işleminin
              yaptırılması ve Napolyon.com tarafından kayıt işleminin
              onaylanması ile tamamlanır. Üyelik işlemi tamamlanmadan işbu
              Sözleşmede tanımlanan üye olma hak ve yetkisine sahip olunamaz.
              <br />
              <br />
              b) Siteye üye olabilmek için Napolyon.com tarafından geçici olarak
              üyelikten uzaklaştırılmış veya üyelikten süresiz yasaklanmış
              olmamak gerekmektedir. Yukarıda belirtildiği gibi Napolyon.com
              tarafından işbu Sözleşme'nin 5.1 maddesi uyarınca geçici olarak
              üyelikten uzaklaştırılmış veya üyelikten süresiz yasaklanmış olan
              kişilerin Site kayıt işlemlerini tamamlamış olmaları Site üyesi
              olmaları sonucunu doğurmayacaktır. <br />
              <br />
              c) Siteye üye olmak isteyen kişi, 6563 saylı Elektronik Ticaretin
              Korunması Hakkında Kanunun sadece ilgili maddeleriyle sınırlı
              olmak üzere ve ilgili diğer tüm mevzuata uygun olarak, işbu
              sözleşmenin konusu tüm haberleşmelerin yapılacağına dair
              bilgilendirilerek ve reddetme imkânı sağlanarak Napolyon.com ile
              paylaştığını, kendisi ile önceden izin alınmaksızın aynı veya
              benzer mal ya da hizmetlerle ilgili pazarlama, tanıtım, değişiklik
              ve bakım hizmetleri, ticari iletişim ve haberleşme
              yapılabileceğini, üyelik bilgilerinde kendisine sorulan soruların
              ayrıntılarının her türlü veri tabanında saklanmasını kabul
              ettiğini, kişisel verilerinin 3.kişiler ile paylaşılmasını kabul
              ettiğini beyan ve taahhüt eder. İşbu kabul taahhüt beyanı Üyeliğe
              onay verildikten devam edecek olup ve üyelik herhangi bir suretle
              sona ermedikçe devam edecektir. <br />
              Sözleşmedeki her hangi bir hakkın Napolyon .com tarafından hiç
              veya belirli bir süre kullanılmaması Napolyon.com tarafından bu
              haktan vazgeçildiği anlamına gelmeyecektir.<br />
              <br />
              5. Hak ve Yükümlülükler <br />
              <br />
              5.1. Üye'nin Hak ve Yükümlülükleri <br />
              <br />
              a) Üye, üyelik prosedürlerini yerine getirirken, Site'deki
              Hizmetler'den faydalanırken ve Site'deki Hizmetler'le ilgili
              herhangi bir işlemi yerine getirirken işbu Sözleşme içerisinde yer
              alan tüm şartlara, Site'nin ilgili yerlerinde belirtilen kurallara
              ve yürürlükteki tüm mevzuata, dürüstlük ve iyi niyet kuralları ile
              bu sözleşme amacına uygun hareket edeceğini, işbu sözleşmede
              düzenlenen tüm şart ve kuralları anladığını ve onayladığını kabul
              eder. <br />
              <br />
              b) Üye, Napolyon.com'un yürürlükteki emredici mevzuat hükümleri
              gereğince resmi makamlara açıklama yapmakla yükümlü olduğu
              durumlarda, resmi makamlarca usulü dairesinde bu bilgilerin talep
              edilmesi halinde, Napolyon.com'un Üyeler'e ait gizli/özel/ticari
              bilgileri resmi makamlara açıklamaya yetkili olacağını ve bu
              sebeple kendisinden her ne nam altında olursa olsun tazminat talep
              edilemeyeceğini kabul eder. <br />
              <br />
              c) Üye, Napolyon.com'un işbu Sözleşme konusu Hizmetler'i ifasına
              yönelik olarak ve/veya bu amaçlarla benzer hizmetlerin ifası için
              anlaşma akdettiği iş ortakları ile vesair nam altındaki 3.
              kişilere, Napolyon.com'un Üyeler'e ait üyenin izin verdiği
              bilgileri açıklamaya yetkili olacağını ve bu sebeple kendisinden
              her ne nam altında olursa olsun tazminat talep edilemeyeceğini
              kabul eder. <br />
              <br />
              d) Üye'nin, Napolyon.com tarafından sunulan Hizmetler'den
              yararlanabilmek amacıyla kullandığı Sisteme Erişim Araçları'nın
              (kullanıcı ismi, şifre v.b) güvenliği, saklanması, üçüncü
              kişilerin bilgisinden uzak tutulması, kullanılması durumlarıyla
              ilgili hususlar tamamen Üye'nin kendi sorumluluğundadır. Üye'nin,
              Sisteme Giriş Araçları'nın güvenliği, saklanması, üçüncü kişilerin
              bilgisinden uzak tutulması, kullanılması gibi hususlardaki tüm
              ihmal ve kusurlarından dolayı Üye'nin ve/ veya üçüncü kişilerin
              uğradığı veya uğrayabileceği zararlardan Napolyon.com'un doğrudan
              veya dolaylı herhangi bir sorumluluğu yoktur. <br />
              <br />
              f) Üye, Site dahilinde kendisi tarafından sağlanan bilgilerin ve
              içeriklerin doğru ve hukuka uygun olduğunu kabul ve taahhüt
              etmektedir. Napolyon.com, Üye tarafından Napolyon.com'a iletilen
              veya Site üzerinden kendisi tarafından yüklenen, değiştirilen ve
              sağlanan bilgilerin ve içeriklerin doğruluğunu araştırma; bu bilgi
              ve içeriklerin güvenli, doğru ve hukuka uygun olduğunu taahhüt ve
              garanti etmekle yükümlü ve sorumlu olmadığı gibi, söz konusu bilgi
              ve içeriklerin yanlış veya hatalı olmasından dolayı ortaya çıkacak
              hiçbir zarardan da sorumlu tutulamaz. <br />
              <br />
              e) Üye, “Nap Puanlarım Sayfası”nda yapılan tüm işlemlerin
              münhasıran ve müstakilen kendisi tarafından gerçekleştirildiğini
              kabul, beyan ve tahhüt eder. Üye, Napolyon.com'a verdiği İletişim
              Kanalları'nın yalnızca kendisine ait ve yalnızca kendi kontrolü
              altındaki İletişim Kanalları olduğunu ve bu İletişim Kanalları'nı
              aktif olarak kullandığını, başkasına devretmediğini, taahhüt eder.
              Üye İletişim Kanalları'nın Üye'nin kendisine ait olmamasından veya
              İletişim Kanalları'nı aktif olarak kullanmamasından dolayı
              Napolyon.com'un uğrayabileceği her türlü maddi ve manevi zararı
              tazminle yükümlü olacaktır. Üye'nin kendisi için oluşturulmuş Üye
              Hesabı Yönetim Sayfasını başkasına devretmesi veya kullanıma
              açması halinde Üye; Napolyon.com'un tek taraflı olarak ve ihbarda
              bulunmadan işbu Sözleşmeyi feshetme ve Üye'nin üyeliğine son verme
              hakkı bulunduğunu kabul ve beyan eder. Üye, Napolyon.com'un yazılı
              onayı olmadan işbu Sözleşmeyi veya bu Sözleşme'nin kapsamındaki
              hak ve yükümlülüklerini kısmen veya tamamen herhangi bir üçüncü
              kişiye devredemez. <br />
              <br />
              f) Napolyon.com'un sunduğu Hizmetler'den yararlananlar, Üye ve
              Siteyi kullananlar, Site dahilinde veya üzerinden yalnızca hukuka
              uygun amaçlarla işlem yapabilirler. Üye'nin, Site dahilinde veya
              üzerinden yaptığı her işlem ve eylemdeki hukuki ve cezai
              sorumluluk kendisine aittir. Üye, Napolyon.com ve/veya başka bir
              üçüncü şahsın ayni veya şahsi haklarına, malvarlığına tecavüz
              teşkil edecek nitelikteki Site dahilinde bulunan resimleri,
              metinleri, görsel ve işitsel imgeleri, video klipleri, dosyaları,
              veri tabanlarını, katalogları ve listeleri çoğaltmayacağını,
              kopyalamayacağını, dağıtmayacağını, işlemeyeceğini, bu eylemleri
              ile Napolyon.com ile doğrudan ve/veya dolaylı olarak rekabete
              girmeyeceğini kabul ve taahhüt etmektedir. Üye'nin işbu Sözleşme
              hükümlerine ve hukuka aykırı olarak gerçekleştirdiği Napolyon.com
              ve Napolyon.com Hizmetleri ile bağlantılı faaliyetleri nedeniyle
              üçüncü kişilerin uğradıkları veya uğrayabilecekleri zararlardan
              dolayı Napolyon.com doğrudan ve/veya dolaylı olarak hiçbir şekilde
              sorumlu tutulamaz. <br />
              <br />
              g) Site'de ve Site üzerinden bağlantı ( link ) verilen internet
              sitelerinde, Üye de dahil olmak üzere üçüncü kişiler tarafından
              yayınlanan içeriklerden dolayı Napolyon.com'un, Napolyon.com
              çalışanlarının ve yöneticilerinin ve tüzel kişiliğinin sorumluluğu
              bulunmamaktadır. Herhangi bir üçüncü kişi tarafından sağlanan ve
              yayınlanan bilgilerin, içeriklerin, görsel ve işitsel imgelerin
              doğruluğu ve hukuka uygunluğunun taahhüdü bütünüyle bu eylemleri
              gerçekleştiren kişilerin sorumluluğundadır. Napolyon.com, Üye de
              dahil olmak üzere üçüncü kişiler tarafından sağlanan hizmetlerin
              ve içeriklerin güvenliğini, doğruluğunu ve hukuka uygunluğunu
              taahhüt ve garanti etmemektedir. <br />
              <br />
              h) Üye ve Napolyon.com birbirinden bağımsız taraflardır. İşbu
              Sözleşme'nin Üye ve Napolyon.com tarafından onaylanması ve
              uygulanması sonucunda, aralarında ortaklık, temsilcilik veya
              işçi-işveren, mal ve hizmet sağlayıcı-tüketici, vekaletilişkisi
              doğmaz. <br />
              <br />
              i) Napolyon.com'un yazılı olarak önceden verilmiş izni olmadan,
              Üye'nin, Site üzerinden yapacakları herhangi bir işlemde başka bir
              web sitesine, bir web sitesinin içeriğine veya ağ üzerindeki
              herhangi bir veriye link vermesi yasaktır. Böyle bir durumda işbu
              tüm hukuki ve cezai sorumluluk üyeye ait olup, Napolyon.com’un tüm
              zarar ve ziyanını karşılamayı kabul ve taahhüt eder.<br />
              <br />
              j) Üye ‘Napolyon.com sitesi aracılığı ile göndereceği’ ya da
              ‘Napolyon.com davet sistemi kullanarak göndereceği elektronik
              postalar ile üçüncü kişilerce istenmeyen elektronik posta
              iletişimi olarak nitelendirilebilecek yoğunlukta bir iletişimde
              bulunmayacağını, işbu Sözleşme kapsamında üçüncü kişilere
              göndereceği referans mesajlarının hukuka ve ahlaka aykırı unsurlar
              içermeyeceğini kabul, beyan ve taahhüt eder <br />
              Üye, işbu madde hükmüne aykırı olarak yapacağı tüm elektronik
              posta iletişiminin sorumluluğunun kendisine ait olduğunu, her ne
              sebeple olursa olsun bu iletişimlerden kaynaklı olarak
              Napolyon.com'a bir dava ve talep yöneltilmesi halinde; bu dava ve
              talep'in Napolyon.com tarafından kendisine ihbar edilebileceğini,
              Napolyon.com'un savunma yapması için gerekli olan her türlü bilgi
              ve içeriği kendisine savunma için gerekli yasal sürelerin
              geçirilmemesini teminen derhal sağlayacağını, bahsi geçen dava ve
              talep sonucunda Napolyon.com'un herhangi bir zarara uğraması
              durumunda bahsi geçen zararın Napolyon.com tarafından, tazminat
              hakları saklı kalmak kaydıyla, kendisine rücu ettirilebileceğini
              kabul, beyan ve taahhüt eder. . Üye iletişime geçtiği tüm 3.
              kişilerin isim, telefon vesair tüm iletişim bilgilerinin kendisi
              tarafından mevzuata ve dürüstlük kurallarına uygun olarak tedarik
              edildiğini, bu bilgilerin kişisel verilerin paylaşımı ile ilgili
              Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve kişisel
              verilerin korunması hakkında yapılmış ya da yapılacak her türlü
              yasal düzenleme ve ilgili tüm sair mevzuat kapsamında ilgili
              kişilerden tüm izinlerin alındığını beyan kabul ve taahhüt
              eder.<br />
              <br />
              Üye, iletişime geçilecek kişilerin iletişim izinlerinin düzenli
              olarak güncellendiğini, bu güncellemeleri şirket ve Napolyon’a
              bildirildiğini, ilgili tüm bu izinlerin alınmamış olması veya
              alınmasına rağmen veya Kanun kapsamında anılan hizmetlerin
              verilmesi nedeniyle veya bağlantılı olarak anılan kişilerden veya
              resmi mercilerden gelebilecek her türlü talep, şikayet, iddia ve
              sorun vb ile ilgili tüm sorumluluğun münhasıran kendisine ait
              olduğunu, bu bağlamda Şirket ve Napolyon’un maddi, manevi, hukuki
              ve cezai anlamda anılan 3. Kişilere, resmi mercilere ve üyeye
              karşı herhangi bir sorumluluğu olmayacağını, Napolyon.com tüm
              bunlardan umumi surette b’eri kıldığını, bu nedenlerle veya
              bunlarla bağlantılı olarak şirket ve Napolyon.com anılan 3.
              Kişilere veya resmi mercilere tazminat, para cezası, harç vesair
              nam altında herhangi bir ödeme yapmak durumunda olması halinde
              Napolyon.com’un ödediği tüm tutarları Napolyon.com’a aynen tazmin
              edeceğini ve ayrıca Napolyon.com’un bu nedenle uğradığı/uğrayacağı
              tüm zararlarını Napolyon.com’un ilk talebi ile birlikte
              Napolyon.com’a derhal nakden ve defaten tazmin edeceğini gayri
              kabili rücu olarak kabul, beyan ve taahhüt eder. <br />
              Üye'nin işbu maddeye aykırı hareket etmesi sebebiyle Napolyon.com
              işbu Sözleşmeyi herhangi bir bildirimde bulunmadan tek taraflı
              olarak feshetme, üyeliği askıya alma veya iptal etme hakkını saklı
              tutmaktadır. Üye işbu madde hükmüne aykırı davranması durumunda
              üyelik sıfatına binaen kazanmış olduğu ve/veya kazanacağı tüm
              haklardan Napolyon.com lehine sarfinazar ettiğini peşinen kabul,
              beyan ve taahhüt etmektedir.<br />
              k) Üye'nin Napolyon.com'a ilişkin referans mesajlarını ve
              Mesajları, istenmeyen elektronik posta gönderen elektronik posta
              listeleri tarafından gönderilmiş gibi gösterilmesine ilişkin
              fiillerde bulunması veya böyle bir duruma sebebiyet vermesi
              halinde Napolyon.com Üye'nin üyeliğini hiçbir ihtar ve ihbara
              gerek kalmadan sona erdirme hakkını saklı tutmaktadır. Üye üyelik
              hak ve yetkilerini başkalarına devretmemeyi, üyeliğe ilişkin
              olarak herhangi bir manipülasyonda ve yanıltıcı fiilde bulunmamayı
              kabul, beyan ve taahhüt etmektedir. <br />
              <br />
              l) Üye dilediği zaman /Icerik/BizeUlasin adresinden ücretsiz bir
              şekilde sebeple üyelikten ayrılabilir.
              <br />
              <br />
              5.2. Napolyon.com'un Hak ve Yükümlülükleri <br />
              <br />
              a) Napolyon.com, Site'de sunulan Hizmetler'i, koşulları,
              uygulamaları ve tüm içerikleri her zaman tek taraflı olarak
              değiştirebilme; Üye'nin sisteme yüklediği bilgileri ve içerikleri
              Üye de dahil olmak üzere üçüncü kişilerin erişimine kapatabilme ve
              silme hakkını saklı tutmaktadır. Napolyon.com, bu hakkını hiçbir
              bildirimde bulunmadan ve önel vermeden kullanabilir. Sözleşmede
              yapılan değişiklikler Napolyon.com sitesinde ve Üye’lerin e-posta
              adreslerine yapılan gönderimler ile bildirilecektir. Güncel
              sözleşmenin takibinden Üye sorumludur. Herhangi bir
              anlaşmazsızlıkta 8.2 maddesindeki Sözleşme Değişiklikleri
              hükümleri geçerlidir. Üye, Napolyon.com'un talep ettiği değişiklik
              ve/veya düzeltmeleri ivedi olarak yerine getirmek zorundadır.
              Napolyon.com tarafından talep edilen değişiklik ve/veya düzeltme
              istekleri gerekli görüldüğü takdirde Napolyon.com tarafından
              doğrudan yapılabilir. Napolyon.com tarafından talep edilen
              değişiklik ve/veya düzeltme taleplerinin, Üye tarafından zamanında
              yerine getirilmemesi sebebiyle doğan veya doğabilecek zararlar,
              hukuki ve cezai sorumluluklar tamamen Üye'ye aittir. <br />
              <br />
              b) Referans kolaylığı veya çeşitli sebepler nedeniyle Site
              içerisinde yalnızca Napolyon.com tarafından Napolyon.com
              kontrolünde olmayan bir takım web sitelerine veya içeriklere
              linkler verilebilir. Bu linkler bahsi geçen web sitesini veya
              içerik sahibini destekleyici mahiyette olmadığı gibi, web sitesi
              veya içerikte yer alan bilgilere yönelik herhangi bir türde bir
              beyan veya garanti niteliği de taşımamaktadır. Site üzerindeki
              linkler vasıtasıyla erişilen portallar, web siteleri, dosyalar ve
              içerikler, bu linkler vasıtasıyla erişilen portallar veya web
              sitelerinden sunulan hizmetler veya ürünler veya bunların içeriği
              hakkında Napolyon.com'un herhangi bir sorumluluğu yoktur. <br />
              <br />
              c) Napolyon.com, Site'de yer alan Üye bilgilerini veya Üye'nin
              açıkladığı diğer bilgileri, Hizmetler dışında da Üye güvenliği,
              kendi yükümlülüğünü ifa ve bazı istatistiki değerlendirmeler ve iç
              denetimler için dilediği biçimde kullanabilir, bunları bir
              veritabanı üzerinde tasnif edip muhafaza edebilir. Üye bu tür
              kullanımlara izin verdiğini kabul ve taahhüt eder.<br />
              <br />
              d) Napolyon.com, Site'nin işleyişine, genel kurallarına, genel
              ahlak kurallarına aykırı olan Mesaj, anket ve içerikleri istediği
              zaman ve şekilde erişimden kaldırabilir ve/veya bu Mesaj, anket
              veya içeriği giren Üye'nin üyeliğine herhangi bir ihbar yapmadan
              son verebilir. Üye Site'nin işleyişine, genel kurallarına, genel
              ahlak kurallarına aykırılık sebebiyle Mesaj, anket ve
              içeriklerinin erişimden kaldırılması ve üyeliğine herhangi bir
              ihbar yapılmaksızın son verilmesi durumunda hiçbir itirazda,
              tazminat ve benzer talepte bulunmayacağını kabul, beyan ve taahhüt
              eder. <br />
              <br />
              e) Napolyon.com, Site içerisinde ortaya konulan uygulamalar
              üzerinde Üyeler'in işbu Sözleşme içerisinde tanımlı olan iş ve
              işlemleri daha etkin şekilde gerçekleştirebilmelerini sağlamak
              üzere dilediği zaman Hizmetler'de değişiklikler ve/veya
              uyarlamalar yapabilir. Napolyon.com tarafından yapılan bu
              değişiklikler ve/veya uyarlamalarla ilgili Üye'nin uymakla yükümlü
              olduğu kural ve koşullar Napolyon.com tarafından ilgili Hizmet'in
              kullanımıyla ilgili açıklamaların bulunduğu web sayfasından
              Üyeler'e duyurulur. <br />
              <br />
              f) Napolyon.com istediği zaman, Site'de belirtmek suretiyle
              Hizmetler'i ücretli veya Nap Puan karşılığı olarak veya sair
              yollarla sağlayabilir veya bunlara ilişkin olarak dilediği
              değişiklikleri tek taraflı yapabilir. Site'de bildirimin
              yapılmasından itibaren söz konusu Hizmetler bildirilen şart ve
              koşullarda sağlanacak ve söz konusu Hizmetler'den değişiklikten
              önce faydalanan Üye'ye de değişiklikler yeni şart ve koşullar ile
              uygulanacaktır. <br />
              <br />
              6. Hizmetler <br />
              <br />
              Napolyon.com Site'de, Üyeler'e işbu Sözleşme ile kapsamı ve
              içeriği belirlenen Hizmetler'i sağlayacaktır. Napolyon.com
              tarafından verilen Hizmetler'in temelinde Müşteriler ile izinli
              pazarlama ve anket çalışması anlaşmalarının yapılması, Üyeler'e
              Mesajlar'ın ve anketlerin İletişim Kanalları’ndan iletilmesi ve
              bunun için gerekli alt yapının hazırlanması, izinli pazarlama ve
              anket gelirlerinin hesaplanması ve işbu Sözleşme ile belirlendiği
              şekil ve koşullarla Üyeler'e iletilmesi bulunmaktadır. <br />
              <br />
              6.1. İzinli Pazarlama Hizmeti <br />
              <br />
              a) Üye işbu Sözleşme hükümlerine uygun olarak izin verdiği kişisel
              verileri ve iletişim bilgileri vasıtasıyla kendisine yöneltilecek
              Mesajlar'a yönelik herhangi bir itirazda bulunamaz. <br />
              <br />
              b) Üye iletişim bilgileri Napolyon.com tarafından herhangi bir
              sınırlama olmadan kullanılabilir. Napolyon.com İzinli Pazarlama
              Hizmetini verebilmek için Müşterilerle reklam veren olarak
              anlaşabilir. Üye aksini beyan etmediği sürece; Napolyon.com,
              İzinli Pazarlama Hizmeti'nin yürütülmesi için Üye'nin kendisine
              açıkladığı tüm İletişim Kanallarını izinli pazarlama yapmak
              amacıyla kullanabilir. <br />
              <br />
              c) Üye, Napolyon.com tarafından sunulan İzinli Pazarlama Hizmeti
              sonucunda işbu Sözleşme hükümlerine uygun olarak hak kazandığı
              ödemelerin yapılabilmesi için IBAN numarasını içeren şahsi mevduat
              hesabını Napolyon.com'a bildirmek zorundadır. Üye'nin bildirdiği
              şahsi mevduat hesabı dışında veya Üye'nin kendisine ait şahsi bir
              mevduat hesabı bildirmemesi halinde Napolyon.com tarafından Üye'ye
              herhangi bir ödeme yapılamaz. Üye'nin; şahsi mevduat hesabı
              olmayan bir mevduat hesabı bildirmesi ya da şahsi mevduat hesabını
              yanlış veya eksik bildirmesi durumunda bütün sorumluluk Üye'ye
              aittir. Üye, Napolyon.com'un Üye'nin yanlış ve/veya eksik olarak
              bildirdiği mevduat hesabına ve/veya Üye'nin bildirdiği ancak
              şahsına ait olmayan mevduat hesabına ödeme yapmaması veya bu
              hesaplara zuhulen ödeme yapılması sebebiyle Napolyon.com'dan her
              ne nam ve surette olursa olsun herhangi bir talepte
              bulunmayacağını, kabul, beyan ve taahhüt eder. Napolyon.com, işbu
              surette Üye'nin yanlış veya eksik olarak bildirdiği hesaba yapılan
              ödeme sonucunda, Üye'ye karşı ödeme borcundan gayri kabili rücu
              olarak kurtulmuş olacaktır. Yapılan ödeme nedeniyle doğacak ayni,
              nakdi her türlü vergi, rüsum, harç vesair yükümlükler Üye'ye ait
              olup bunların ilgili kurumlara yatırıldığı Üye tarafından
              belgelendirilecektir.<br />
              Üye işbu ödemelerin hiç veya zamanında yapılmaması nedeniyle
              Napolyon.com’un uğrayacağı tüm zararları nakden ve defaten
              Napolyon.com’un ilk talebi üzerine ödeyeceğini kabul ve taahhüt
              eder. <br />
              d) Üye'nin Sözleşme konusu Hizmetler'le ilgili olarak edindiği Nap
              Puanlar'ın kullanımına ilişkin koşullar işbu Sözleşme'nin ayrılmaz
              parçası olan “EK 2-Nap Puan Kullanım Koşulları”nda belirtilmiş
              olup Üye işbu sözleşmeyi kabul ile “EK – Nap Puan Kullanım
              Koşullarını” da kabul etmiş sayılacaktır. <br />
              <br />
              e) Üye, işbu Sözleşme'ye uygun olarak kendisine yöneltilecek Mesaj
              içeriğinin Napolyon.com tarafından kullanılmasının izlenmesini
              engelleyecek herhangi bir fiilde bulunmamayı, buna uygun kurulacak
              denetim sistemine uygun davranmayı, işbu madde hükmüne aykırı
              hareket etmesi durumunda Napolyon.com tarafından kendisine
              herhangi bir ödeme yapılmayacağını ve bu konuda herhangi bir hak
              iddia etmeyeceğini kabul, beyan ve taahhüt eder. <br />
              <br />
              <br />
              7. Gizlilik Politikası <br />
              <br />
              Napolyon.com, Site'de Üyeler'le ilgili bilgileri işbu Sözleşme'nin
              kapsamı dışında işbu Sözleşme'nin EK-1 bölümünde yer alan ve
              Sözleşme'nin ayrılmaz bir parçası olan 'Gizlilik Politikası'
              kapsamında kullanabilir. Napolyon.com Üyeler'e ait gizli
              bilgileri, işbu Sözleşme'nin kapsamı dışında ancak 'Gizlilik
              Politikası'nda belirtilen koşullar dahilinde üçüncü kişilere
              açıklayabilir veya kullanabilir. <br />
              <br />
              8. Diğer Hükümler <br />
              <br />
              8.1. Fikri Mülkiyet Hakları <br />
              <br />
              a) Site'nin (tasarım, metin, imge, html kodu ve diğer kodlar da
              dahil ve fakat bunlarla sınırlı olmamak kaydıyla) tüm unsurları
              (kısaca 'Napolyon.com'un Telif Haklarına Tabi Çalışmaları')
              Napolyon.com'a ait ve/veya Napolyon.com tarafından üçüncü bir
              kişiden alınan lisans hakkı altında kullanılmaktadır. Üyeler,
              Hizmetler'i, Napolyon.com bilgilerini ve Napolyon.com'un Telif
              Haklarına Tabi Çalışmaları'nı yeniden satamaz, paylaşamaz,
              dağıtamaz, sergileyemez veya başkasının Hizmetler'e erişmesine
              veya kullanmasına izin veremez, aksi takdirde lisans verenler de
              dahil üçüncü kişilerin uğradıkları zararlardan dolayı
              Napolyon.com'dan talep edilen tazminat miktarını, mahkeme
              masrafları ve avukatlık ücreti de dahil olmak üzere karşılamakla
              yükümlü olacaklardır. Üyeler Napolyon.com'un Telif Haklarına Tabi
              Çalışmaları'nı çoğaltamaz, dağıtamaz veya bunlardan türemiş
              çalışmalar yapamaz veya hazırlayamaz. <br />
              <br />
              b) Napolyon.com'un; Napolyon.com Hizmetleri, Napolyon.com
              bilgileri, Napolyon.com'un Telif Haklarına Tabi Çalışmaları'na,
              Napolyon.com ticari markalarına, Napolyon.com ticari görünümüne ve
              Site vasıtasıyla sahip olduğu her tür maddi ve fikri mülkiyet
              hakları da dahil tüm malvarlığı, ayni ve şahsi hak, ticari bilgi
              ve know-how'a yönelik tüm hakları saklıdır. <br />
              <br />
              8.2. Sözleşme Değişiklikleri <br />
              <br />
              Napolyon.com, tamamen kendi takdirine bağlı ve tek taraflı olarak
              işbu Sözleşme'yi, veya herhangi bir hükmünü Hizmet koşullarını,
              uygulamaları ve bunlara ilişkin tüm içerikleri uygun göreceği
              herhangi bir zamanda Site'de ilan ederek tek taraflı olarak
              değiştirebilir. İşbu Sözleşme'nin değişen hükümleri, Site’de ilan
              edildikleri tarihte geçerlilik kazanacak, geri kalan hükümler
              aynen yürürlükte kalarak hüküm ve sonuçlarını doğurmaya devam
              edecektir. Üye, söz konusu değişikliği kabul etmemesi halinde,
              işbu değişikliğin Site'de ilan edildiği tarihten itibaren 7 (yedi)
              gün içinde keyfiyeti Napolyon.com'a yazılı olarak bildirip,
              Sözleşme'yi tek taraflı ve tazminatsız olarak, değişiklik tarihine
              kadar kazanılmış hakları saklı kalmak kaydıyla, feshedebilir. İşbu
              Sözleşme, Üye'nin tek taraflı beyanları ile değiştirilemeyeceği
              gibi, haklı nedenler dışında gerekçe gösterilmeksizin Üye
              tarafından tek taraflı olarak feshedilemez. <br />
              <br />
              8.3. Mücbir Sebepler <br />
              <br />
              Hukuken mücbir sebep sayılan tüm durumlarda, Napolyon.com işbu
              Sözleşme ile belirlenen edimlerinden herhangi birini geç veya
              eksik ifa etme veya ifa etmeme nedeniyle yükümlü değildir. Bu ve
              bunun gibi durumlar, Napolyon.com için, gecikme, eksik ifa etme
              veya ifa etmeme veya temerrüt addedilmeyecek veya bu durumlar için
              Napolyon.com'dan herhangi bir nam altında tazminat talep
              edilemeyecektir. Mücbir sebep terimi, doğal afet, isyan, savaş,
              grev, iletişim sorunları, altyapı ve internet arızaları, elektrik
              kesintisi ve kötü hava koşulları, Napolyon.com'un gerekli bilgi
              güvenliği önlemleri almasına karşın Site'ye ve sisteme yapılan
              saldırılar da dahil ve fakat bunlarla sınırlı olmamak kaydıyla
              Napolyon.com'un makul kontrolü haricinde gelişen ve
              Napolyon.com'un gerekli özeni göstermesine rağmen önleyemediği
              kaçınılamayacak olaylar olarak yorumlanacaktır. <br />
              <br />
              8.4. Uygulanacak Hukuk ve Yetki Kuralları<br />
              <br />
              İşbu Sözleşme'nin uygulanmasında, yorumlanmasında ve işbu Sözleşme
              dahilinde doğan hukuki ilişkilerin yönetiminde yabancılık unsuru
              bulunması durumunda Türk kanunlar ihtilafı kuralları hariç olmak
              üzere, Türk Hukuku uygulanacaktır. İşbu Sözleşme'den dolayı doğan
              veya doğabilecek her türlü ihtilafın hallinde İstanbul Merkez
              Mahkemeleri ve İcra Daireleri yetkilidir. <br />
              <br />
              8.5. Napolyon.com Kayıtlarının Geçerliliği <br />
              <br />
              Üye, işbu Sözleşme'den doğabilecek ihtilaflarda Napolyon.com'un
              kendi veri tabanında, sunucularında tuttuğu elektronik ve sistem
              kayıtlarının, ticari kayıtlarının, defter kayıtlarının, mikrofilm,
              mikrofiş ve bilgisayar kayıtlarının muteber bağlayıcı, kesin ve
              münhasır delil teşkil edeceğini, Napolyon.com'u yemin teklifinden
              ber'i kıldığını ve bu maddenin. HMK 193. madde anlamında delil
              sözleşmesi niteliğinde olduğunu kabul, beyan ve taahhüt eder.
              <br />
              <br />
              8.6. Yürürlük <br />
              <br />
              İşbu Sözleşme Üye'nin elektronik olarak onay vermesi ile
              karşılıklı olarak kabul edilerek yürürlüğe girmiş olup, ekleri ile
              birlikte uygulanacaktır. Ekler ile işbu Sözleşme hükümleri
              arasında çelişki olması halinde işbu Sözleşme hükümleri geçerli
              olacaktır. <br />
              <br />
              EK 1: Napolyon.com Gizlilik Politikası <br />
              <br />
              Napolyon.com projesi için tahsis edilmiş www.napolyon.com alan
              adlı web sitesinin (kısaca "Site" olarak anılacaktır) tüm hakları
              Napolyon Reklam ve Danışmanlık Hizmetleri Ticaret Anonim
              Şirketi'ne (kısaca "Napolyon.com" olarak anılacaktır) aittir.
              Napolyon.com, Site üzerinden kullanıcılar tarafından kendisine
              elektronik ortamda iletilen kişisel bilgileri, üyeleri ile yaptığı
              "Napolyon.com Üyelik Sözleşmesi" ile üyeden alınan izinler
              belirlenen amaçlar ve kapsam dışında üçüncü kişilere
              açıklamayacaktır. <br />
              <br />
              Sistemle ilgili sorunların tanımlanması ve Site'de çıkabilecek
              sorunların ivedilikle giderilebilmesi için, Napolyon.com,
              gerektiğinde kullanıcıların IP adresini tespit etmekte ve bunu
              kullanmaktadır. IP adresleri, kullanıcıları genel bir şekilde
              tanımlamak ve kapsamlı demografik bilgi toplamak amacıyla da
              kullanılabilir. <br />
              <br />
              Napolyon.com, Site dahilinde başka sitelere link verebilir.
              Napolyon.com, link vasıtasıyla erişilen sitelerin gizlilik
              uygulamaları ve içeriklerine yönelik herhangi bir sorumluluk
              taşımamaktadır. <br />
              <br />
              Kişisel bilgiler; kişi adı-soyadı, adresi, telefon numarası,
              e-posta adresi ve kullanıcıyı tanımlamaya yönelik her türlü
              bilgiyi içermekte olup, kısaca "Gizli Bilgiler" olarak
              anılacaktır. Napolyon.com, işbu gizlilik politikasında aksi
              belirtilmedikçe kişisel bilgilerden herhangi birini
              Napolyon.com'un işbirliği içinde olmadığı şirketlere ve üçüncü
              kişilere açıklamayacaktır. Aşağıda belirtilen sınırlı durumlarda
              Napolyon.com, işbu "Gizlilik Politikası" hükümleri dışında
              kullanıcılara ait bilgileri üçüncü kişilere açıklayabilir. Bu
              durumlar sınırlı sayıda olmak üzere;<br />
              <ul>
                <li>
                  Yetkili hukuki otoriteler tarafından çıkarılan ve yürürlükte
                  olan Kanun, Kanun Hükmünde Kararname, Yönetmelik v.b. gibi
                  hukuk kurallarının getirdiği zorunluluklara uyulmasının;
                </li>
                <li>
                  Napolyon.com'un kullanıcılarla akdettiği "Napolyon.com Üyelik
                  Sözleşmesi"nin ve diğer sözleşmelerin gereklerinin yerine
                  getirilmesi ve bunların uygulamaya konulmasının;
                </li>
                <li>
                  Yetkili idari ve adli otorite tarafından usulüne göre
                  yürütülen bir araştırma veya soruşturmanın yürütümü amacıyla
                  kullanıcılarla ilgili bilgi talep edilmesinin ve
                </li>
                <li>
                  Kullanıcıların hakları veya güvenliklerini korumak için bilgi
                  verilmesinin gerekli olduğu hallerdir.<br />
                </li>
              </ul>
              Napolyon.com, kişisel bilgileri kesinlikle özel ve gizli tutmayı,
              bunu bir sır saklama yükümü olarak addetmeyi ve gizliliğin
              sağlanması ve sürdürülmesi, gizli bilginin tamamının veya herhangi
              bir kısmının kamu alanına girmesini veya yetkisiz kullanımını veya
              üçüncü bir kişiye ifşasını önlemek için gerekli tüm tedbirleri
              almayı ve gerekli özeni göstermeyi taahhüt etmektedir.
              Napolyon.com'un gerekli bilgi güvenliği önlemlerini almasına
              karşın Site'ye ve sisteme yapılan saldırılar sonucunda gizli
              bilgilerin zarar görmesi veya üçüncü kişilerin eline geçmesi
              durumunda Napolyon.com'un herhangi bir sorumluluğu olmayacaktır.
              <br />
              <br />
              EK 2: Nap Puan Kullanım Koşulları <br />
              <br />
              İşbu "EK-2 Nap Puan Kullanım Koşulları", Üye ile Napolyon.com
              arasında akdedilen "Napolyon.com Üyelik Sözleşmesi"ne ("Sözleşme")
              ek olarak tanzim edilmiş olup, Üye'nin Sözleşme kapsamında
              edindiği Nap Puanlar'ın kullanım koşullarını düzenlemektedir.
              <br />
              <br />
              Üyelik <br />
              <br />
              Kişiler, Üyeler'den birinin davetini kabul ettikten sonra veya
              farklı kaynaklardan kendileri bizzat gelerek Site'deki "Üye
              Formu"nu doldurarak; Site'ye üye olabilirler. <br />
              <br />
              Site'ye üye olmak için kişiler Site'de yer alan "Üye Formu"nu
              dolduracak, "Üye Formu"nda belirtmiş oldukları e-posta adresine
              gönderilen aktivasyon E-postasındaki aktivasyon bağlantısına
              tıklayarak veya e-postaya cevap vererek e-posta adreslerini aktive
              ettikten sonra bu e-posta adresi ve yine "Üye Formu"nda belirtmiş
              oldukları şifre ile Site'ye giriş yapabilecekler. <br />
              <br />
              <br />
              Nap Puan Sistemi <br />
              <br />
              Site'de Üyeler'in Nap Puan kazanım kanalları aşağıdaki şekilde
              sıralanmıştır: <br />
              <br />
              • Üye olma <br />
              <br />
              • Profil bilgilerini doldurma <br />
              <br />
              • Farklı kanallardan gönderilecek olan pazarlama mesajlarını okuma
              (e-posta, SMS, banner vb.) <br />
              <br />
              • Anketlere katılım <br />
              <br />
              • Yeni Üye getirme <br />
              <br />
              • Hedef olarak verilen aksiyonları gerçekleştirme (form doldurma,
              alışveriş yapma vb.) <br />
              <br />
              Napolyon.com dilediği zaman yukarıda belirtilenlere yeni Nap Puan
              kazanım kanalları ekleyebilir ya da bu kanallarda değişiklik
              yapabilir. <br />
              <br />
              Nap Puan karşılığı Üye'ye yapılacak olan ödemeler <br />
              <br />
              Üye her bir 100.000 Nap Puan'a ulaşması halinde, 100 (yüz) TL'ye
              hak kazanacaktır. Üye'ye, işbu 100 TL, sadece 100.000 Nap Puan
              seviyesine ulaştığında ve bu seviyeye ulaşması kaydıyla ödenecek
              olup, Üye, üyeliğinin devamı sırasında veya üyeliği sona erdikten
              sonra hiçbir surette Nap Puan seviyeleri aralığında (her bir
              100.000 Nap Puan aralığı) kalan Nap Puanlar'ına karşılık olarak,
              orantılı olarak kendisine bir ödeme yapılmasını talep edemez. Üye,
              bu durumda sadece alt seviyenin karşılığına gelen tutarı talep
              hakkını haizdir. Napolyon.com dilediği zaman yukarıda
              belirtilenlere göre 100.000 Nap Puan seviyesine ulaşma koşulunda
              değişiklik yapabilir, nakit ödeme uygulamasını kaldırabilir.<br />
              <br />
              <br />
              Nap Puanlar’ın Kullanım Süresi:<br />
              <br />
              Napolyon.com’da bir takvim yılı boyunca kazanılmış olan Nap
              Puanlar iki takvim yılı sonra 31 Ocak günü itibarı ile
              silinmektedir. <br />
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary btn-block"
              data-dismiss="modal"
              type="button"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="aydinlatma-metni" class="modal fade">
      <div
        class="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">ANKET KATILIMCI AYDINLATMA METNİ</h5>
            <button
              aria-label="Close"
              class="close"
              data-dismiss="modal"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body modal-scroll">
            <div class="">
              <br />
              GİRİŞ<br />
              <br />
              NAPOLYON REKLAM VE DANIŞMANLIK HİZMETLERİ TİC. A.Ş ( "Napolyon"
              veya "Şirket"), 7 Nisan 2016 tarihli ve 29677 sayılı Resmi
              Gazete’de yayınlanmış olan 6698 sayılı Kişisel Verilerin Korunması
              Kanunu'na ("KVK Kanunu"), ektörünün mesleki davranış kurallarına
              tamamen uymaya kendini adamıştır. Şirket olarak yürüttüğümüz
              araştırmalarına katılanların ve süreç içerisinde yer alan tüm
              tarafların gizlilik ve Kişisel Verilerinin Korunması bizim için
              son derece önemli olup; Kişisel Verilerinizin güvenliği hususunda
              azami hassasiyet göstermekteyiz.<br />
              <br />
              Bu bilinçle, Şirket olarak her türlü kişisel verinin KVK Kanunu’na
              uygun olarak işlenerek, muhafaza edilmesine büyük önem
              atfetmekteyiz. Bu sorumluluğumuzun tam idraki ile KVK Kanunu'nda
              tanımlı şekli ile "Veri Sorumlusu" sıfatıyla, kişisel verilerinizi
              aşağıda izah edildiği surette ve mevzuat tarafından emredilen
              sınırlar çerçevesinde toplamakta, işlemekte ve gerekli olması
              halinde muhafaza etmekteyiz. Bu kapsamda, Kişisel Verilerinizi
              yalnızca araştırmalarımızı yürütmek için işbu Aydınlatma Metni
              sınırları içerisinde işleyeceğiz.<br />
              <br />
              1. KONU<br />
              <br />
              İşbu Aydınlatma Metninin konusu, tanımı Kişisel Verilerin
              Korunması Politikasında yer alan genel anketlere katılımcı olan
              Veri Sahibinin, Şirket ile paylaştığı Kişisel Verilerine ilişkin
              olarak KVK Kanunu başta olmak üzere Kişisel Verilerin korunmasına
              ilişkin ilgili mevzuat kapsamında Kişisel Verilerinin işlenmesine
              ilişkin Şirket'in hak ve yükümlülüklerini düzenlemektir.<br />
              <br />
              2. TOPLANABİLİR VERİLER<br />
              <br />
              Toplanabilir verileriniz, aşağıda sayılan, açık rıza veya diğer
              haller kapsamındaki Kişisel Verileriniz veya Özel Nitelikli
              Kişisel Verilerinizin işlenmesine ilişkindir:<br />
              <br />
              a. Adınız, adresiniz, telefon numaranız, e-posta adresiniz, T.C.
              kimlik bilgileriniz, yaşınız, mesleğiniz, sosyo ekonomik statünüz,
              sizi özel olarak tanımlayan bilgileriniz ve benzeri diğer bilgiler
              dâhil olmak üzere Kişisel Verileriniz;<br />
              <br />
              b. Irk veya etnik kökeniniz, siyasi görüşleriniz, dini veya
              felsefi inançlarınız, sendika üyeliğiniz, sağlığınız veya cinsel
              yaşamınız ve bunlarla sınırlı olmamak üzere gibi Özel Nitelikli
              Kişisel Verileriniz.<br />
              <br />
              3. VERİ TOPLAMA YÖNTEMİ VE HUKUKİ SEBEBİ <br />
              <br />
              Kişisel Verilerin Toplanması, İşlenmesi ve İşleme Amaçları<br />

              <br />
              Kişisel verileriniz, Napolyon tarafından sağlanan hizmet ve
              Şirketimizin ticari faaliyetlerine bağlı olarak değişkenlik
              gösterebilmekle birlikte; otomatik ya da otomatik olmayan
              yöntemlerle, Napolyon’un birimleri ve ofisler, internet sitesi,
              sosyal medya mecraları, mobil uygulamalar ve benzeri vasıtalarla
              sözlü, yazılı ya da elektronik olarak toplanabilecektir.<br />
              <br />
              Napolyon ve Hitay Grup Şirketleri'nin sunduğu ürün ve hizmetlerden
              yararlandığınız müddetçe, Şirket çağrı merkezlerimizi veya
              internet sayfamızı kullandığınızda, internet sitelerimizi ziyaret
              ettiğinizde, Şirket’in düzenlediği eğitim, seminer veya
              organizasyonlara katıldığınızda Kişisel Verileriniz
              işlenebilecektir.<br />
              <br />
              Ayrıca, Kişisel Verileriniz aşağıda yer verilen amaçlar
              doğrultusunda Napolyon ve Hitay Grup Şirketleri'nin sunduğu ürün
              ve hizmetlerin belirlenen yasal çerçevede sunulabilmesi ve bu
              kapsamda sözleşme ve yasadan doğan mesuliyetlerini eksiksiz ve
              doğru bir şekilde yerine getirebilmesi için işlenebilecektir.
              <br />
              <br />
              Napolyon’un Kişisel Veri işleme amacı ve dayanağı Hitay Grup
              Şirketleri'nin kayıtlı bulundukları sicillerde belirtilmiş olan
              amaçların bütünüdür. Bu kapsamda Napolyon'un amacı ile ilişkili
              olarak aşağıdakilerle sınırlı olmamak üzere, araştırma
              katılımcılarının Kişisel Verileri toplanabilmekte ve
              işlenebilmektedir:.<br />

              <br />
              a. Pazar araştırması ve sosyal araştırma gerçekleştirmek; bu
              kapsamda, sizin anket araştırmasına katılmanız;<br />
              <br />
              b. Kişisel Veri kayıtlarımızın doğrulama ve güncellenmesi;<br />
              <br />
              c. İstediğiniz hizmetleri sağlamaması da dahil olmak üzere, bize
              gönderdiğiniz sorulara ve taleplerinize yanıt verilmesi;<br />
              <br />
              d. Çıkan anket sonuçları ile müşterilerimizin çeşitli ürün ve
              hizmetlerle ilgili tüketicilerin farkındalıklarını, kullanımlarını
              veya memnuniyetini anlamasını sağlamak; tutum ve kamuoyunu ölçmek
              için anketler ve odak grupları oluşturmak, yeni ürünleri
              tasarlamak veya test etmek ya da iletişim etkinliğini test
              etmek;<br />
              <br />
              e. Şirketimiz tarafından sunulan hizmetlere ilişkin gerekli
              çalışmaların iş birimlerimiz tarafından yapılması;<br />
              <br />
              f. KVK Kanunu’nun 5. ve 6. maddelerinde belirtilen kişisel veri
              işleme şartları ve amaçları dâhilinde işlenebilecektir.<br />

              <br />
              Şirket ve Hitay Grup Şirketleri olarak, Kişisel Verilerin
              işlenmesi bakımından işbu amaç ve dayanağın dışına
              çıkmayacaktır.<br />
              <br />
              4. İŞLENEN KİŞİSEL VERİLERİN KİMLERE VE HANGİ AMAÇLA
              AKTARILABİLECEĞİ<br />
              <br />
              Şirket, araştırma katılımcıların Kişisel Verilerini üçüncü
              şahıslara aşağıdaki şekillerde aktarabilmektedir: <br />

              <br />
              a. Hitay Grup Şirketleri ve bağlı şirketleri (yurtdışında
              bulunanlar dahil) ile paylaşılması;<br />
              <br />b. Şirket ve Şirket’in iş ilişkisi içerisinde olan tüzel ve
              gerçek kişiler tarafından sunulan ürün ve hizmetlerden sizleri
              faydalandırmak için gerekli çalışmaların iş birimlerimiz
              tarafından yapılması;<br />
              <br />c. Şirket için veya sunduğu hizmetler ile bağlantılı olarak
              tedarikçileri ve danışmanları ile paylaşılması ve belirtilenler
              tarafından işlenmesine. Örneğin, anket sitelerini barındıracak,
              veri toplamak veya işleme hizmetleri;<br />
              <br />d. Şirket’in sizden ayrıca alınacak onay ile müşterileri ile
              paylaşması için;<br />
              <br />e. Yürürlükteki kanunlar uyarınca veya bir mahkeme celbine
              ya da bir resmi kurumun emrine cevaben;<br />
              <br />f. Sınırlı kalmamak kaydıyla veri ekleme hizmetleri, veri
              doğrulama hizmetleri, veri tabanı eşleme hizmetleri, kodlama
              hizmetleri, veri segmentasyonu hizmetleri ve ödül, teşvik ve
              çekilişle ilgili hizmetler dahil olmak üzere Hitay Grup
              şirketlerinin hizmet sağlayan yetkili temsilcileri ve/veya
              tedarikçileri ile paylaşılması;<br />
              <br />g. Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve
              uygulanması;<br />
              <br />h. Sınırlı kalmamak kaydıyla ilgili kişiyi tanımlayıcı
              bilgileri alan veya elde eden tarafın, kişisel tanımlayıcı
              bilgileri işbu Aydınlatma Metnine uygun olarak kullanmayı ve işbu
              Aydınlatma Metnine uygun olarak güvenliğini, bütünlüğünü ve
              gizliliğini korumayı ve sürdürmeyi kabul etmesi şartıyla, sınırlı
              kalmamak kaydıyla Şirket’in ticari varlıklarından herhangi birinin
              veya tamamının birleşmesi veya satın alınması dahil olmak üzere
              bir mülkiyet veya kontrol değişikliğiyle bağlantılı olarak;<br />
              <br />i. KVK Kanunu’nun 8. ve 9. maddelerinde belirtilen kişisel
              veri işleme şartları ve amaçları çerçevesinde<br />
              <br />
              Şirket, işlediği Kişisel Verileri ilgili mevzuat ve Kurul
              kararlarında öngörülen yöntemler dâhilinde doğru ve güncel olarak
              muhafaza etmektedir. Şirket, işlenmesini gerektiren sebeplerin
              ortadan kalkması hâlinde Kişisel Verileri resen veya Katılımcının
              talebi üzerine silecek veya yok edecektir.<br />
              <br />
              5. KİŞİSEL VERİ SAHİBİNİN KVK KANUNU’NUN 11. MADDESİNDE SAYILAN
              HAKLARI
              <br />
              <br />
              Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi,
              işbu Aydınlatma Metninde aşağıda düzenlenen yöntemlerle
              Şirketimize iletmeniz durumunda Şirketimiz talebiniz niteliğine
              göre en geç otuz gün içinde ücretsiz olarak sonuçlandıracaktır.
              Başvuruya cevabın CD, flash bellek gibi bir kayıt ortamında
              verilmesi halinde Kişisel Verileri Koruma Kurumu tarafından talep
              edilebilecek ücret kayıt ortamının maliyetini geçmeyecektir. Bu
              kapsamda Veri sahibi olarak;<br />

              <br />a. Kişisel Verilerinizin işlenip işlenmediğini öğrenme,<br />
              <br />b. Kişisel Verileriniz işlenmişse buna ilişkin bilgi talep
              etme,<br />
              <br />c. Kişisel Verilerinizin işlenme amacını ve bunların amacına
              uygun kullanılıp kullanılmadığını öğrenme,<br />
              <br />d. Yurt içinde veya yurt dışında Kişisel Verilerinizin
              aktarıldığı üçüncü kişileri bilme,<br />
              <br />e. Kişisel Verilerinizin eksik veya yanlış işlenmiş olması
              hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan
              işlemin Kişisel Verilerinizin aktarıldığı üçüncü kişilere
              bildirilmesini isteme,<br />
              <br />f. KVK Kanununun ve ilgili diğer kanun hükümlerine uygun
              olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin
              ortadan kalkması hâlinde Kişisel Verilerinizin silinmesini veya
              yok edilmesini isteme ve bu kapsamda yapılan işlemin Kişisel
              Verilerinizin aktarıldığı üçüncü kişilere bildirilmesini
              isteme,<br />
              <br />g. İşlenen verilerin münhasıran otomatik sistemler
              vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir
              sonucun ortaya çıkmasına itiraz etme,<br />
              <br />h. Kişisel Verilerinizin kanuna aykırı olarak işlenmesi
              sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep
              etme hakkına sahipsiniz.<br />
              <br />
              6. VERİ SORUMLUSUNA BAŞVURU USULÜ<br />
              <br />
              KVK Kanunu’nun 13. maddesinin 1. fıkrası ve Veri Sorumlusuna
              Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca, yukarıda
              belirtilen haklarınızı kullanmak için adresindeki bulunan Kişisel
              Verilerin Korunması Kanunu linkin altında bulunan Kişisel Veri
              Sahibi Başvuru Formu’nu doldurarak bizzat elden veya noter
              kanalıyla, iadeli taahhütlü posta yoluyla ilgili Şirket adına,
              Eski Büyükdere Cad. Özcan Sok. No: 2 34416, 4. Levent / Kağıthane
              / İstanbul adresine göndererek iletebilir veya ilgili formu
              taratarak napolyon@napolyon.com adresine güvenli elektronik imza,
              mobil imza ya da tarafınızca Napolyon’a daha önce bildirilen ve
              sistemlerimizde kayıtlı olan elektronik posta adresinizi kullanmak
              suretiyle iletebilirsiniz.<br />
              <br />
              Şirketimiz, talebi kabul edebileceği gibi gerekçesini açıklayarak
              reddedebilir; cevabını ilgili kişiye yazılı olarak veya elektronik
              ortamda bildirir. Başvuruda yer alan talebin kabul edilmesi
              hâlinde Şirketimiz gereğini yerine getirir.<br />

              <br />
              Başvurunun reddedilmesi, verilen cevabın yetersiz bulunması veya
              süresinde başvuruya cevap verilmemesi hâllerinde; veri sahibi,
              cevabı öğrendiği tarihten itibaren otuz ve her hâlde başvuru
              tarihinden itibaren altmış gün içinde Kurula şikâyette bulunma
              hakkına sahiptir.<br />
              <br />
              7. KAPSAM<br />
              <br />
              İşbu Aydınlatma Metni, Napolyon tarafından internet sitesinde
              yayınlanmış olan Kişisel Verilerin Korunması Politikasının hüküm
              ve koşullarını kapsamaktadır.<br />
              <br />
              8. SORULAR VE ŞİKAYETLER<br />
              <br />
              İşbu Aydınlatma Metnine, uygulama veya araştırmaya katılım ile
              ilgili sorularınız veya endişeleriniz bulunması durumunda bizimle
              napolyon@napolyon.com e-mail adresi üzerinden iletişime
              geçebilirsiniz. <br />
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary btn-block"
              data-dismiss="modal"
              type="button"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
    <div id="iletisim" class="modal fade">
      <div
        class="modal-dialog modal-dialog-scrollable modal-lg"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">NAPOLYON.COM ÜYE İLETİŞİM İZİNLERİ</h5>
            <button
              aria-label="Close"
              class="close"
              data-dismiss="modal"
              type="button"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body modal-scroll">
            <div class="">
              <p>
                Üye, yürürlükte bulunan ve/veya yürürlüğe alınacak uygulamalar
                kapsamında Napolyon.com tarafından kendisine ürün ve hizmet
                tanıtımları, reklamlar, kampanyalar, anketler ve benzeri
                uygulamaların sunulmasına yürürlükte mevzuat ve yürürlüğü
                girecek mevzuat kapsamında gerek kişisel verilerin korunması,
                gerekse ticari iletişim kapsamında izin verdiğini beyan ve kabul
                eder. Üye aksini bildirmediği sürece Napolyon.com'un kendisi ile
                internet, telefon, SMS, vb iletişim kanalları kullanarak
                irtibata geçmesine izin verdiğini beyan ve kabul eder. Üye
                yukarıda bahsi geçen bilgilerin toplanması, paylaşılması,
                kullanılması, arşivlenmesi ve kendisine erişilmesi nedeniyle
                doğrudan ve/veya dolaylı maddi ve/veya manevi menfi ve/veya
                müsbet, velhasıl herhangi bir zarara uğradığı konusunda talepte
                bulunmayacağını ve Napolyon.com'u sorumlu tutmayacağını beyan ve
                kabul eder.
              </p>
              <p>
                Üye, Napolyon.com’dan gönderilen iletileri almak istemediği
                yönündeki tercihini, Site’de bulunan üyelik bilgileri altındaki
                iletişim tercihleri ayarından belirleyebilir, veya bu yöndeki
                talebini Site’de bulunan iletişim formundan ücretsiz olarak
                iletebilir. Bu talebin Napolyon.com’a ulaşmasını müteakip 3 (üç)
                iş günü içersinde Napolyon.com Üye’ye ileti göndermeyi
                durduracaktır.
              </p>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-primary btn-block"
              data-dismiss="modal"
              type="button"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feather from "feather-icons";
import { email, minLength, required, sameAs } from "vuelidate/lib/validators";
import store from "@/core/services";
import module, {
  ERROR,
  LOGOUT,
  MODULE_NAME,
  SUCCESS,
} from "@/core/services/store/auth.module";

import moduleContent, {
  CITIES,
  GET_CITIES,
  MODULE_NAME as MODULE_NAME_CONTENT,
} from "@/core/services/store/content.module";

import { CREATE_ITEM } from "@/core/services/store/rest.module";
import Loading from "@/view/components/Loader";

import querystring from "querystring";
import Cookies from "js-cookie";
import moment from 'moment';

const _MODULE_NAME = MODULE_NAME;
const _MODULE_NAME_CONTENT = MODULE_NAME_CONTENT;

export default {
  name: "reqister",
  components: { Loading },
  beforeCreate() {
    function registerStoreModule(moduleName, storeModule) {
      if (!(store && store.state && store.state[moduleName])) {
        store.registerModule(moduleName, storeModule);
      }
    }

    registerStoreModule(_MODULE_NAME, module);
    registerStoreModule(_MODULE_NAME_CONTENT, moduleContent);
  },
  data() {
    return {
      registerError: false,
      submitStatus: false,
      firstName: null,
      lastName: null,
      email: null,
      birthday: null,
      password: null,
      password_confirm: null,
      homeCity: null,
      agreement: null,
      parentMemberId: null,
      gender: null,
      permission: null,
      genders: [
        { value: null, text: "Cinsiyetiniz" },
        { value: 1, text: "Erkek" },
        { value: 2, text: "Kadın" },
      ],
      loading: false,
    };
  },
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    email: {
      required,
      email,
    },
    birthday: {
      required,
    },
    homeCity: {
      required,
    },
    gender: {
      required,
    },
    agreement: {
      required,
    },
    permission: {
      required,
    },
    password: {
      required,
      minLength: minLength(6),
      valid: function(value) {
        const containsUppercase = /[A-Z]/.test(value);
        const containsLowercase = /[a-z]/.test(value);
        const containsNumber = /[0-9]/.test(value);
        return (containsUppercase || containsLowercase) && containsNumber;
      },
    },
    password_confirm: {
      sameAsPassword: sameAs("password"),
    },
  },
  computed: {
    userAge() {
      let result = false;
      if (this.birthday) {
        const age = moment().diff(this.birthday, 'years');
       if (age >= 15) result = true;
      }

      return result;
    },
    error() {
      let item = store.getters[_MODULE_NAME + "/" + ERROR];
      if (item && item.hasOwnProperty("content")) {
        return item.content;
      } else if (item) {
        return "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
      }
      return null;
    },
    success() {
      return store.getters[_MODULE_NAME + "/" + SUCCESS];
    },
    cities() {
      let items = store.getters[_MODULE_NAME_CONTENT + "/" + CITIES];
      let results = [
        { text: this.$t("login.city_where_live"), value: null },
        { text: "İstanbul Avrupa", value: 34 },
        { text: "İstanbul Asya", value: 99 },
      ];
      if (items && items.length) {
        items.forEach((item) => {
          if (!(Number(item.cityId) == 34 || Number(item.cityId) == 99)) {
            results.push({
              value: item.cityId,
              text: item.cityName,
            });
          }
        });
      }
      return results;
    },
  },
  methods: {
    showModal(id) {
      $("#" + id).modal("show");
    },
    getCities() {
      store.dispatch(_MODULE_NAME_CONTENT + "/" + GET_CITIES, {
        filters: {
          all: true,
        },
      });
    },
    submit() {
      let self = this;
      self.submitStatus = true;
      if (!this.$v.$invalid && this.birthday && this.userAge) {
        this.loading = true;

        // clear existing errors
        store.dispatch(_MODULE_NAME + "/" + LOGOUT);
        let birthday = self.birthday;
        let content = {
          firstName: self.firstName,
          lastName: self.lastName,
          email: self.email,
          password: self.password,
          birthYear: moment(birthday).format('YYYY'),
          emailPermissionType: "NOP",
          gsmPermissionType: "NOP",
        };

        if (this.permission) {
          content.emailPermissionType = "GRN";
          content.gsmPermissionType = "GRN";
        }

        if (this.parentMemberId) {
          content.parentMemberId = this.parentMemberId;
        }

        let params = {
          homeCityId: self.homeCity,
          birthday: birthday,
          gender: self.gender,
        };

        // send login request
        store
          .dispatch(CREATE_ITEM, {
            url: "mobile/member/register?" + querystring.stringify(params),
            contents: content,
            returnType: "stateless",
          })
          .then((response) => {
            if (response.status) {
              Cookies.set("remember_meS", true, {
                sameSite: "Lax",
                secure: true,
              });
              self.$router.push({ name: "index.accountActivation" });
            } else {
              self.loading = false;
              try {
                self.registerError = response.data.response.data.content;
              } catch (e) {
                self.registerError =
                  "İşlem yapılırken hata oluştu. Lütfen tekrar deneyiniz";
              }
            }
          });
      }
    },
  },
  mounted() {
    feather.replace();
    this.getCities();
    let invitationId = this.$route.query.invitationId;
    if (invitationId) {
      this.parentMemberId = invitationId;
    }
  },
};
</script>

<style scoped lang="scss">
.form-background-register-screen {
  background: rgba(255, 255, 255, 0.97);
}
.big-screen-image-register-screen {
  background-repeat: repeat-y;
  background-size: cover;
  background-position: center;
}
@media (max-width: 767px) {
  .register-screen-cover-container {
    background-repeat: repeat-y;
    background-size: cover;
    background-position: center;
  }
  .big-screen-image-register-screen {
    display: none;
  }
}
@media only screen and (min-width: 768px) {
  .register-part-background-bigger-screen {
    background: rgba(255, 255, 255, 1);
  }
  .form-background-register-screen {
    #Build {
      background-image: none !important;
    }
  }
}
</style>
