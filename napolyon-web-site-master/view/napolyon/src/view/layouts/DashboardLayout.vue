<template>
  <div>
    <t-header :active="true" :nav-light="true" />
    <router-view />
    <t-up-footer />
    <t-footer />
  </div>
</template>

<script>

import Header from "@/view/layouts/Header";
import Footer from "@/view/layouts/Footer";
import SideNav from "@/view/layouts/SideNav";
import upFooter from "@/view/layouts/upFooter";
import "@/core/config/echo"
export default {
  name: "DashboardLayout",
  components: {
    Header,
    't-header': Header,
    't-footer': Footer,
    't-up-footer': upFooter,
    't-side-nav': SideNav,
  },
  data() {
    return {
    }
  },
}
</script>
<style scoped>
</style>
