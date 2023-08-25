<template>
  <div>
    <!--end footer-->
    <footer class="footer footer-bar">
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col-sm-6">
          </div>
          <!--end col-->
          <div class="col-sm-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
            <ul class="list-unstyled text-sm-right mb-0">
              <li class="list-inline-item"><a href="https://www.skyalp.com.tr/"><img src="https://cdn.napolyon.com/skyalp/images/white-logo.svg" class="avatar avatar-ex-sm" title="Skyalp" alt=""></a></li></li>
            </ul>
          </div>
          <!--end col-->
        </div>
        <!--end row-->
      </div>
      <!--end container-->
    </footer>
    <!-- Back to top -->
    <a href="#" class="btn btn-icon btn-primary back-to-top"><i data-feather="arrow-up" class="icons"></i></a>
    <!-- Back to top -->
  </div>
</template>

<script>
import feather from "feather-icons";
export default {
  name: "Footer",
  props: {
    showMenu: {
      required: false,
      default: true
    },
  },
  mounted() {
    feather.replace();
  }
}
</script>

<style scoped>

</style>
