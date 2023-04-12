<template>
  <div class="loading-home" id="loadingDiv" :class="loading ? 'd-flex' : 'd-none'">
    <center class="loading-center">
      <div class="loading-napolyon">
        <div class="c1"></div>
        <div class="c2"></div>
        <div class="c3"></div>
        <div class="c4"></div>
      </div>
      <div class="n">
        <p>N</p>
      </div>
    </center>
  </div>
</template>

<script>
export default {
  name: "GeneralLoader",
  props: {
    loading: {
      default: false,
      required: true
    },
  }
};
</script>

<style scoped>
/* Loading */
.loading {
  background: rgba(0,0,0,0.7);
  display: flex !important;
  align-items: center;
}

.loading-home {
  background: rgba(0,0,0,0.7);
  display: flex !important;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.loading .loading-center, .loading-home .loading-center {
}

.loading .loading-napolyon, .loading-home .loading-napolyon {
  -webkit-animation: rotate 90s linear infinite;
  overflow: hidden;
  max-width: 200px;
  max-height: 200px;
  margin-top: 50px;
}

.loading .c1, .loading-home .c1 {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #00B6A6;
  -webkit-animation: c1 5s ease infinite;
}

.loading .c2, .loading-home .c2 {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #00B6A6;
  margin-left: 100px;
  -webkit-animation: c2 5s ease infinite;
}

.loading .c3, .loading-home .c3 {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #00B6A6;
  margin-left: -100px;
  margin-top: -50px;
  -webkit-animation: c3 5s ease infinite;
}

.loading .n, .loading-home .n {
  background: #00B6A6;
  width: 50px;
  height: 50px;
  border-radius: 100%;
  margin-left: -100px;
  transform: translate(-3.7px, -35.5px);
  -webkit-animation: f 5s ease infinite;
  margin-left: 10px;
  margin-top: -60px;
  opacity: 0;
}

.loading .c4, .loading-home .c4 {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background: #00B6A6;
  -webkit-animation: c4 5s ease infinite;
}

@-webkit-keyframes rotate {
  100% {
    transform: rotate(36000deg);
  }
}

@-webkit-keyframes c1 {
  50% {
    transform: translate(0px, 50px);
    opacity: 0;
  }
}

@-webkit-keyframes c2 {
  50% {
    transform: translate(-50px, 0px);
    opacity: 0;
  }
}

@-webkit-keyframes c3 {
  50% {
    transform: translate(50px, 0px);
    opacity: 0;
  }
}

@-webkit-keyframes c4 {
  50% {
    transform: translate(0px, -50px);
    opacity: 0;
  }
}

@-webkit-keyframes f {
  50% {
    opacity: 1;
  }
}

.loading p, .loading-home p {
  font-family: "museo300", Helvetica, Arial, sans-serif;
  font-weight: 500;
  color: #fff;
  font-size: 30px;
  text-align: center;
  padding: 2px 0 0 2px;
}
</style>
