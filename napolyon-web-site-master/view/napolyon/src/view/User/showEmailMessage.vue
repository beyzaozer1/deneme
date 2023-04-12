<template>
  <div>
    <span v-if="error">
      <div class="alert alert-danger">
        {{ error }}
      </div>
    </span>
    <span v-else v-html="content"></span>
  </div>
</template>

<script>
import {GET_ITEMS} from "@/core/services/store/rest.module";

export default {
  name: "showEmailMessage",
  data() {
    return {
      content: "",
      url: "showMessage",
      error: null,
    };
  },
  methods: {
    getItems() {
      let self = this;
      this.$store.dispatch(GET_ITEMS, {
        url: this.url,
        returnType: 'stateless',
        filters: {
          mid: this.$route.params.id
        }
      }).then(response => {
        if (response.status) {
          if (response.data.status) {
            self.content = response.data.content;
          } else {
            // self.$router.push({ path: response.data.content });
          }
        } else {
          try {
            self.error = response.data.response.data || "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
          } catch (e) {
            self.error = "İşlem yapılırken hata oluştu. Lütfen daha sonra tekrar deneyiniz";
          }
        }
      });
    }
  },
  mounted() {
    if (!this.$route.params.id) {
     // this.$router.push({name: 'user.index'});
    }
    this.getItems();
  }
};
</script>

<style scoped>
</style>
