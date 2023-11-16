<template>
  <div>
    <h1>Payment Fail Page</h1>
    <ul>
      <li><strong>sipay_status:</strong> {{ $route.query.sipay_status }}</li>
      <li><strong>order_no:</strong> {{ $route.query.order_no }}</li>
      <li><strong>order_id:</strong> {{ $route.query.order_id }}</li>
      <li><strong>invoice_id:</strong> {{ $route.query.invoice_id }}</li>
      <li><strong>status_code:</strong> {{ $route.query.status_code }}</li>
      <li>
        <strong>status_descriptio:</strong>
        {{ $route.query.status_description }}
      </li>
      <li>
        <strong>sipay_payment_method:</strong>
        {{ $route.query.sipay_payment_method }}
      </li>
      <li>
        <strong>credit_card_no:</strong> {{ $route.query.credit_card_no }}
      </li>
      <li>
        <strong>transaction_type:</strong> {{ $route.query.transaction_type }}
      </li>
      <li>
        <strong>payment_status:</strong> {{ $route.query.payment_status }}
      </li>
      <li>
        <strong>payment_method:</strong> {{ $route.query.payment_method }}
      </li>
      <li><strong>error_code:</strong> {{ $route.query.error_code }}</li>
      <li><strong>error:</strong> {{ $route.query.error }}</li>
      <li><strong>auth_code:</strong> {{ $route.query.auth_code }}</li>
      <li><strong>hash_key:</strong> {{ $route.query.hash_key }}</li>
      <li><strong>md_status:</strong> {{ $route.query.md_status }}</li>
      <li>
        <strong>original_bank_error_code:</strong>
        {{ $route.query.original_bank_error_code }}
      </li>
      <li>
        <strong>original_bank_error_description:</strong>
        {{ $route.query.original_bank_error_description }}
      </li>
    </ul>
  </div>
</template>
     
   <script>
export default {
  name: "fail",
  data() {
    return {
      sipayStatus: null,
      orderNo: null,
      orderId: null,
      invoiceId: null,
      statusCode: null,
      statusDescription: null,
      sipayPaymentMethod: null,
      creditCardNo: null,
      transactionType: null,
      paymentStatus: null,
      paymentMethod: null,
      errorCode: null,
      error: null,
      authCode: null,
      hashKey: null,
      mdStatus: null,
      originalBankErrorCode: null,
      originalBankErrorDescription: null,
    };
  },
  mounted() {
    const urlParams = this.$route.query;
    this.sipayStatus = urlParams.sipay_status;
    this.orderNo = urlParams.order_no;
    this.orderId = urlParams.order_id;
    this.invoiceId = urlParams.invoice_id;
    this.statusCode = urlParams.status_code;
    this.statusDescription = urlParams.status_description;
    this.sipayPaymentMethod = urlParams.sipay_payment_method;
    this.creditCardNo = urlParams.credit_card_no;
    this.transactionType = urlParams.transaction_type;
    this.paymentStatus = urlParams.payment_status;
    this.paymentMethod = urlParams.payment_method;
    this.errorCode = urlParams.error_code;
    this.error = urlParams.error;
    this.authCode = urlParams.auth_code;
    this.hashKey = urlParams.hash_key;
    this.mdStatus = urlParams.md_status;
    this.originalBankErrorCode = urlParams.original_bank_error_code;
    this.originalBankErrorDescription =
      urlParams.original_bank_error_description;

    this.sendPostRequest();
  },
  methods: {
    sendPostRequest() {
      const url =
        "http://tomcat.skyalp.com.tr:8080/smartgateway/v1/ccpayment/threed/fail";

      const requestData = {
        sipayStatus: this.sipayStatus,
        orderNo: this.orderNo,
        orderId: this.orderId,
        invoiceId: this.invoiceId,
        statusCode: this.statusCode,
        statusDescription: this.statusDescription,
        sipayPaymentMethod: this.sipayPaymentMethod,
        creditCardNo: this.creditCardNo,
        transactionType: this.transactionType,
        paymentStatus: this.paymentStatus,
        paymentMethod: this.paymentMethod,
        errorCode: this.errorCode,
        error: this.error,
        authCode: this.authCode,
        hashKey: this.hashKey,
        mdStatus: this.mdStatus,
        originalBankErrorCode: this.originalBankErrorCode,
        originalBankErrorDescription: this.originalBankErrorDescription,
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          application: "NAPOLYON",
          systemName: "web",
          language: "TR",
          channel: "WEB",
        },
        body: JSON.stringify(requestData),
      };

      fetch(url, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok.");
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error(
            "There has been a problem with fetch operation:",
            error
          );
        });
    },
  },
};
</script>
     