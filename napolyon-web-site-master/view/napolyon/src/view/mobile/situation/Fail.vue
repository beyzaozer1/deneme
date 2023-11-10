<template>
    <div>
       <h1>Payment Fail Page</h1>
       <ul>
         <li><strong>sipay_status:</strong> {{ $route.query.sipay_status }}</li>
         <li><strong>order_no:</strong> {{ $route.query.order_no }}</li>
         <li><strong>order_id:</strong> {{ $route.query.order_id }}</li>
         <li><strong>invoice_id:</strong> {{ $route.query.invoice_id }}</li>
         <li><strong>status_code:</strong> {{ $route.query.status_code }}</li>
         <li><strong>status_descriptio:</strong> {{ $route.query.status_description }}</li>
         <li><strong>sipay_payment_method:</strong> {{ $route.query.sipay_payment_method }}</li>
         <li><strong>credit_card_no:</strong> {{ $route.query.credit_card_no }}</li>
         <li><strong>transaction_type:</strong> {{ $route.query.transaction_type }}</li>
         <li><strong>payment_status:</strong> {{ $route.query.payment_status }}</li>
         <li><strong>payment_method:</strong> {{ $route.query.payment_method }}</li>
         <li><strong>error_code:</strong> {{ $route.query.error_code }}</li>
         <li><strong>error:</strong> {{ $route.query.error }}</li>
         <li><strong>auth_code:</strong> {{ $route.query.auth_code }}</li>
         <li><strong>hash_key:</strong> {{ $route.query.hash_key }}</li>
         <li><strong>md_status:</strong> {{ $route.query.md_status }}</li>
         <li><strong>original_bank_error_code:</strong> {{ $route.query.original_bank_error_code }}</li>
         <li><strong>original_bank_error_description:</strong> {{ $route.query.original_bank_error_description }}</li>
       </ul>
     </div>
   </template>
     
   <script>
   import axios from "axios";
   
   export default {
     name: "fail",
     beforeCreate() {},
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
     created() {
       const urlParams = new URLSearchParams(window.location.search);
   
       this.sipayStatus = urlParams.get("sipay_status");
       this.orderNo = urlParams.get("order_no");
       this.orderId = urlParams.get("order_id");
       this.invoiceId = urlParams.get("invoice_id");
       this.statusCode = urlParams.get("status_code");
       this.statusDescription = urlParams.get("status_description");
       this.sipayPaymentMethod = urlParams.get("sipay_payment_method");
       this.creditCardNo = urlParams.get("credit_card_no");
       this.transactionType = urlParams.get("transaction_type");
       this.paymentStatus = urlParams.get("payment_status");
       this.paymentMethod = urlParams.get("payment_method");
       this.errorCode = urlParams.get("error_code");
       this.error = urlParams.get("error");
       this.authCode = urlParams.get("auth_code");
       this.hashKey = urlParams.get("hash_key");
       this.mdStatus = urlParams.get("md_status");
       this.originalBankErrorCode = urlParams.get("original_bank_error_code");
       this.originalBankErrorDescription = urlParams.get(
         "original_bank_error_description"
       );
   
       this.makeApiRequest();
     },
     methods: {
       makeApiRequest() {
         const apiUrl = "https://tomcat.skyalp.com.tr:8181/smartgateway/payment/fail";
   
         const requestData = {
           sipay_status: this.sipayStatus,
           order_no: this.orderNo,
           order_id: this.orderId,
           invoice_id: this.invoiceId,
           status_code: this.statusCode,
           status_description: this.statusDescription,
           sipay_payment_method: this.sipayPaymentMethod,
           credit_card_no: this.creditCardNo,
           transaction_type: this.transactionType,
           payment_status: this.paymentStatus,
           payment_method: this.paymentMethod,
           error_code: this.errorCode,
           error: this.error,
           auth_code: this.authCode,
           hash_key: this.hashKey,
           md_status: this.mdStatus,
           original_bank_error_code: this.originalBankErrorCode,
           original_bank_error_description: this.originalBankErrorDescription,
         };
   
         axios.get(apiUrl, { params: requestData })
           .then(response => {
             console.log('api call is successful:', response.data);
           })
           .catch(error => {
             console.error('Something went wrong error!', error);
           });
       }
     }
   };
   </script>
     