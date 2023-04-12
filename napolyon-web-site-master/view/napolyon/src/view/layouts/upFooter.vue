<template>
  <div>
    <footer class="footer bg-light">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-12 mb-0 mb-md-4 pb-0 pb-md-2">
            <a href="#" class="logo-footer">
              <img :src="mediaBase + '/images/nap_primary.png'" alt="" />
            </a>
            <p class="mt-4 text-muted">
              {{ $t("index.index_footer") }}
            </p>
            <ul class="list-unstyled social-icon social mb-0 mt-4 mt-lg-0">
              <li class="list-inline-item">
                <a href="https://www.facebook.com/Napolyon/" class="rounded"
                  ><i data-feather="facebook" class="fea icon-sm fea-social"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a
                  href="https://www.instagram.com/napolyonapp/"
                  class="rounded mx-1"
                  ><i
                    data-feather="instagram"
                    class="fea icon-sm fea-social"
                  ></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a href="https://twitter.com/napolyonapp" class="rounded"
                  ><i data-feather="twitter" class="fea icon-sm fea-social"></i
                ></a>
              </li>
              <li class="list-inline-item">
                <a href="mailto:info@napolyon.com" class="rounded mx-1"
                  ><i data-feather="mail" class="fea icon-sm fea-social"></i
                ></a>
              </li>
            </ul>
            <!--end icon-->
          </div>
          <!--end col-->
          <div class="col-lg-2 offset-lg-2 offset-md-2 col-md-4 col-12 mt-4">
            <h5 class="text-dark footer-head">{{ $t("index.Napolyon") }}</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.about_us' })"
                  class="text-muted"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.about_us") }}</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.corporate' })"
                  class="text-muted"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.corporate") }}</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.content_us' })"
                  class="text-muted"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.faq") }}</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="
                    $router.push({
                      name: 'index.content_us',
                      query: { form: true },
                    })
                  "
                  class="text-muted"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.contact_us") }}</a
                >
              </li>
            </ul>
          </div>
          <!--end col-->
          <div class="col-lg-3 col-md-4 col-12 mt-4 pt-2 pt-sm-0">
            <h5 class="text-dark footer-head">{{ $t("index.information") }}</h5>
            <ul class="list-unstyled footer-list mt-4">
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.terms' })"
                  class="text-muted m"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.terms_of_us") }}</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.membership_agreement' })"
                  class="text-muted"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.membership_agreement") }}</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.privacy' })"
                  class="text-muted"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.privacy") }}</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.clarification_text' })"
                  class="text-muted text-nowrap"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.clarification_text") }}</a
                >
              </li>
              <li>
                <a
                  href="javascript:void(0)"
                  @click="$router.push({ name: 'index.anti_spam' })"
                  class="text-muted"
                  ><i class="mdi mdi-chevron-right mr-1"></i>
                  {{ $t("index.anti_span") }}</a
                >
              </li>
            </ul>
          </div>
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </footer>
    <!--end footer-->
  </div>
</template>

<script>
export default {
  name: "upFooter",
  props: {
    showMenu: {
      required: false,
      default: true,
    },
  },
};
</script>

<style scoped>
.text-nowrap {
  white-space: nowrap !important;
}
</style>
