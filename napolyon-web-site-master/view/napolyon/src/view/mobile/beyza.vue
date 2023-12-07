<template>
  <div>
    <button @click="goToSuccessPage()">Go to success</button>
  </div>
</template>
  
  <script>
export default {
  methods: {
    goToSuccessPage() {
      const jwtToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDE4OTgwNTgsInVzZXJfbmFtZSI6ImJlZXl6YW96ZXJAZ21haWwuY29tIiwiYXV0aG9yaXRpZXMiOlsiTUVNQkVSIl0sImp0aSI6InpHZXNSTHRyRWdIZU1IYmZOZHdINVFSZDdPdyIsImNsaWVudF9pZCI6InBvcnRhbCIsInNjb3BlIjpbInJlYWQiLCJ3cml0ZSIsInRydXN0Il19.pFWaQzZ0wwoWErY7pwjcKMIRQYClWTq6RYfI7-pBJjk";

      const encodedToken = encodeURIComponent(jwtToken);

      this.$router.push({
        name: "index.have_fun_and_learn",
        query: { token: encodedToken },
      });
    },
  },
};
</script>
  