<template>
  <div :class="loading ? 'd-inline-block' : 'd-none'">
    <font-awesome-icon icon="spinner" pulse />
  </div>
  <!-- end::Page Loader -->
</template>

<script>
import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner,  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSpinner)

Vue.component('font-awesome-icon', FontAwesomeIcon)
export default {
  name: "Loader",
  props: {
    loading: {
      default: false,
      type: Boolean
    },
  },
};
</script>

<style>

</style>
