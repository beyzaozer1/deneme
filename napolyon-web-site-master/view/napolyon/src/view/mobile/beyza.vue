<template>
  <div>
    <button @click="goToSuccessPage()">Go to success</button>
  </div>
</template>
  
  <script>
export default {
  methods: {
    goToSuccessPage() {
      const jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDQ0Mzk5NDIsInVzZXJfbmFtZSI6ImJleXphLm96ZXJAc2t5YWxwLmNvbS50ciIsImF1dGhvcml0aWVzIjpbIk1FTUJFUiJdLCJqdGkiOiJGSWZ4LWFYY19KNXo0M2Zua0ZpcEFFajFOY3ciLCJjbGllbnRfaWQiOiJwb3J0YWwiLCJzY29wZSI6WyJyZWFkIiwid3JpdGUiLCJ0cnVzdCJdfQ.It-SIJ6HYxkG5pCcQ7zILaZasK7pZmZpMi_rorenKUc"
      const encodedToken = encodeURIComponent(jwtToken);

      this.$router.push({
        name: "index.nap_transfers",
        query: { token: encodedToken },
      });
    },
  },
};
</script>
  