<template>
  <div class="upload-image container">
    <input type="file" accept="image/*" @change="handleFileChange" />
    <button @click="uploadImage">Resim Yükle</button>
    <div v-if="imageUrl">
      <img :src="imageUrl" alt="Yüklenen Resim" />
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      imageUrl: ""
    };
  },
  methods: {
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      const maxSizeInBytes = 5 * 1024 * 1024; // 5 MB sınırı
      if (this.selectedFile.size > maxSizeInBytes) {
        alert("Resim boyutu 5MB'dan büyük olmamalıdır.");
        return;
      }

      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"]; // İzin verilen resim tipleri
      if (!allowedImageTypes.includes(this.selectedFile.type)) {
        alert(
          "Lütfen sadece JPEG, PNG veya GIF formatındaki resimleri yükleyin."
        );
        return;
      }
    },
    async uploadImage() {
      if (this.selectedFile) {
        const formData = new FormData();
        formData.append("file", this.selectedFile);
        axios.post(
          `https://apiv2.napolyon.com/files/upload?name=${this.$route.query.mid}`,
          formData
        );
        window.location.href = `https://www.napolyon.com/#/anket-sonuc?mid=${this.$route.query.mid}&ca=c`;
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
