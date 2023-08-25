<template>
  <div class="upload-image-content">
    <div class="image-content">
      <img
        src="https://cdn.napolyon.com/skyalp/images/icerik.png"
        alt="içerik"
        width="600px"
        height="600px"
      />
    </div>
    <div class="upload-image container">
      <input type="file" accept="image/*" @change="handleFileChange" />
      <div v-if="imageUrl">
        <img :src="imageUrl" alt="Yüklenen Resim" />
      </div>
      <div class="kvkk-policy">
        <label class="checkbox-label container">
          <input type="checkbox" v-model="accepted" class="checkbox-input" />
          <span class="custom-checkbox"></span>
          <button class="download-button" @click="downloadPdfOne()">
            Açık Rıza Metni
          </button>
          kapsamında kişisel verilerimin işlenmesine ve aktarılmasına açık rıza
          veriyorum.
        </label>
        <p v-if="!accepted && error" class="error-message">
          Zorunlu
        </p>
        <label class="checkbox-label container">
          <input type="checkbox" v-model="isAccepted" class="checkbox-input" />
          <span class="custom-checkbox"></span>
          <button class="download-button" @click="downloadPdfTwo()">
            Aydınlatma Metni
          </button>
        </label>
        <p v-if="!isAccepted && error" class="error-message">
          Zorunlu
        </p>
      </div>
      <button class="upload-button" @click="uploadImage">Resim Yükle</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      selectedFile: null,
      imageUrl: "",
      accepted: false,
      isAccepted: false,
      error: false,
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
        if (!this.accepted && !this.isAccepted) {
          this.error = true;
        } else {
          let formData = new FormData();
          formData.append("file", this.selectedFile);
          try {
            await axios.post(
              `https://apiv2.napolyon.com/files/upload?name=${this.$route.query.mid}`,
              formData
            );
            window.location.href = `https://www.napolyon.com/#/anket-sonuc?mid=${this.$route.query.mid}&ca=c`;
          } catch (error) {
            console.error("Upload error:", error);
          }
        }
      }
    },
    downloadPdfOne() {
      const pdfUrl =
        "https://cdn.napolyon.com/skyalp/images/acik-riza-metni.docx";

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";
      link.download = "acik-riza-metni.docx";
      link.click();
    },
    downloadPdfTwo() {
      const pdfUrl =
        "https://cdn.napolyon.com/skyalp/images/aydinlatma-metni.docx";

      const link = document.createElement("a");
      link.href = pdfUrl;
      link.target = "_blank";
      link.download = "aydinlatma-metni.docx";
      link.click();
    }
  }
};
</script>
<style lang="scss" scoped>
.upload-image-content {
  display: flex;
  @media (max-width: 768px) {
    display: block;
    overflow-x: hidden;
  }
  .image-content img {
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .upload-image {
    width: 100%;
    margin: 120px auto;
    padding: 20px;
    width: 600px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 4px 4px 4px 4px rgba(0, 0, 0, 0.1);
    @media only screen and (max-width: 768px) {
      width: 370px;
    }

    input {
      border: none;
    }
    .upload-button {
      border: none;
      background-color: #d7382d;
      color: white;
      border-radius: 8px;
      padding: 8px 12px;
      margin-top: 25px;
      @media only screen and (max-width: 768px) {
        margin-top: 25px;
      }
    }
    .kvkk-policy {
      margin-top: 25px;
      .error-message {
        color: red;
        font-weight: 400;
        font-size: 12px;
        margin-bottom: 10px;
        margin-left: 20px;
      }
      .download-button {
        background-color: transparent;
        border: none;
        color: #d7382d;
        font-weight: 700;
        border-bottom: 1px solid #d7382d;
      }
    }
  }
}
</style>
