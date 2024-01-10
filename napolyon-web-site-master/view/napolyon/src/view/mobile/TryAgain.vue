<template>
  <div class="try-container">
    <div class="content-container">
      <i data-feather="repeat" class="try-icon"></i>
      <p class="content">
        Sayfa yüklenirken bir hata oluştu. Lütfen tekrar deneyin.
      </p>
    </div>
  </div>
</template>
<script>
export default {
  name: "try_again",
  mounted() {
    feather.replace();
  },
};
import feather from "feather-icons";
</script>

<style scoped>
.try-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 1rem;
}
.content-container {
  border: 2px solid #00b6a6;
  border-radius: 2rem;
  padding: 2rem;
  box-shadow: 4px 8px 8px rgba(12, 170, 157, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.content {
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: rgb(158, 157, 157);
}

.try-icon {
  width: 70px;
  height: 70px;
  color: rgb(158, 157, 157);
  margin: 0.8rem 0 1.8rem 0;
}
</style>
  
  