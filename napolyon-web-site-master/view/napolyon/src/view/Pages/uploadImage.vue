<template>
  <div class="upload-image container">
    <input type="file" @change="handleFileChange" />
    <button @click="uploadImage">Resim Yükle</button>
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Yüklenen Resim" />
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import store from "@/core/services";
import axios from "axios";
import {
  IS_AUTHENTICATED,
  MODULE_NAME,
} from "@/core/services/store/auth.module";
const _MODULE_NAME = MODULE_NAME;
export default {
  computed: {
    isAuthenticated() {
      return store.getters[_MODULE_NAME + "/" + IS_AUTHENTICATED];
    },
  },
  data() {
    return {
      selectedFile: null,
      imageUrl: "",
    };
  },
  mounted() {
    if (!this.isAuthenticated) {
      this.$router.push("/giris");
      Cookies.set("redirectUrl", true);
    }
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB sınırı
      if (this.selectedFile.size > maxSizeInBytes) {
        alert("Resim boyutu 5MB'dan büyük olmamalıdır.");
        return;
      }
    },
    async uploadImage() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        axios.post(`https://apiv2.napolyon.com/files/upload`, formData);
        Cookies.remove("redirectUrl");
        alert("Resminiz Başarıyla Yüklenmiştir");
        this.$router.push("/hesabim");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.upload-image {
  width: 100%;
  margin: 150px auto;

  input {
    border: none;
  }
  button {
    border: none;
    background-color: #d7382d;
    color: white;
    border-radius: 8px;
    padding: 8px 12px;
    @media only screen and (max-width: 768px) {
      margin-top: 25px;
    }
  }
}
</style>
