<template>
  <div class="cookie-control" id="cookieContainer">
    <div class="inner-content container">
      <div class="cookie-control-text">
        <p class="cookie-exp">
          {{ $t("cookieControltext") }}
        </p>
      </div>
      <div class="cookie-control-button">
        <button
          :class="{ active: isAcceptAllActive }"
          @click="reject"
        >
          {{ $t("acceptAll") }}
        </button>
        <button
          :class="{ active: isRejectAllActive }"
          @click="accept"
        >
          {{ $t("rejectAll") }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      isAcceptAllActive: true,
      isRejectAllActive: false,
    };
  },
  methods: {
    setCookie(cookieName, cookieValue, nDays) {
      var today = new Date();
      var expire = new Date();

      if (!nDays) nDays = 1;
      expire.setTime(today.getTime() + 3600000 * 24 * nDays);
      document.cookie =
        cookieName +
        "=" +
        escape(cookieValue) +
        ";expires=" +
        expire.toUTCString() +
        ";path=/";
      return false;
    },

    accept() {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 365);
      document.cookie =
        "isUserAccept=accepted; expires=" +
        expireDate.toUTCString() +
        "; path=/";
      var cookieContainer = document.getElementById("cookieContainer");
      if (cookieContainer) {
        cookieContainer.style.display = "none";
      }
    },

    reject() {
      var expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 365);
      document.cookie =
        "isUserAccept=rejected; expires=" +
        expireDate.toUTCString() +
        "; path=/";
      var cookieContainer = document.getElementById("cookieContainer");
      if (cookieContainer) {
        cookieContainer.style.display = "none";
      }
    },
  },
  mounted() {
    const kullaniciDurum = document.cookie.replace(/(?:(?:^|.*;\s*)isUserAccept\s*\=\s*([^;]*).*$)|^.*$/, "$1");
    var cookieContainer = document.getElementById('cookieContainer');
    if (kullaniciDurum === "accepted" || kullaniciDurum === "rejected") {
        if (cookieContainer) {
            cookieContainer.style.display = 'none';
        }
    } else {
        if (cookieContainer) {
            cookieContainer.style.display = 'block';
        }
    }
  }
};
</script>
<style lang="scss" scoped>
.cookie-control {
  box-shadow: 0 0.625em 1.875em rgba(2, 2, 3, 0.28);
  position: fixed;
  z-index: 9999999;
  bottom: 0px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background: rgba(28, 31, 34, 0.75);
  // border-radius: 16px;
  padding: 16px 24px;
  @media (max-width: 640px) {
    display: block;
    padding: 25px 20px 55px 20px; // safari ve iphone chrome da popup alt ve üst kısımları gözükmediği için padding top yüksek verildi.
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin: 0px 0px;
    height: 450px;
    overscroll-behavior: contain;
    z-index: 999999999;
  }
  .inner-content {
    display: flex;
    justify-content: space-between;
    @media (max-width: 640px) {
      display: block;
    }
    .cookie-control-text {
      color: #d2d2d3;
      width: 55%;
      font-size: 15px;
      font-weight: 450;
      line-height: 20px;
      @media (max-width: 640px) {
        width: 100%;
        margin-bottom: 30px;
      }
      .cookie-header {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .cookie-exp {
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
      }
    }
    .cookie-control-button {
      display: flex;
      justify-content: space-between;
      padding: 12px 0px;
      @media (max-width: 640px) {
        display: inline-block;
        padding: 12px 0px;
      }

      button {
        background-color: #eaeff2;
        border: none;
        padding: 0 20px;
        font-size: 14px;
        width: 100%;
        border-radius: 10px;
        margin-bottom: 8px;
        font-weight: 600;
        color: #2d4156;
        display: inline-block;
        margin-right: 16px;
        height: auto;
        white-space: nowrap;
        @media (max-width: 640px) {
          display: inline-block;
          padding: 12px 20px;
        }
        &:last-child {
          margin-right: 0;
        }
        &.active {
          background: #d73828;
          color: white;
        }
      }
    }
  }
}
</style>
