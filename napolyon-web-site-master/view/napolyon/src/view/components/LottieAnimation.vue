<template>
  <div class="container-lottie">
    <div class="lottie-wrapper">
      <div
        :style="{ width: width, height: height }"
        ref="lottieContainer"
        class="lottie"
      ></div>
    </div>
  </div>
</template>
  
<script>
import Lottie from "lottie-web";

export default {
  props: {
    animationData: {
      type: Object,
      required: true,
    },
    width: {
      type: String,
      default: "100%", // Varsayılan genişlik
    },
    height: {
      type: String,
      default: "100%", // Varsayılan yükseklik
    },
  },
  mounted() {
    this.playAnimation();
  },
  methods: {
    playAnimation() {
      Lottie.loadAnimation({
        container: this.$refs.lottieContainer,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: this.animationData,
      });
    },
  },
};
</script>
<style scoped>
.container-lottie {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.lottie-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 120px;
  height: 120px;
}

</style>
    