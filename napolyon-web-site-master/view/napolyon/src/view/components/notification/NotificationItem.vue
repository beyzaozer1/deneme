<template>
  <li id="NotificationItem" :class="{'active-message': isActive}">
    <a href="#">
      <div class="d-flex">
        <span class="notification-icon btn btn-soft-danger  disabled mr-3">
          <i :class="notificationClass"></i></span>
        <div class="message-by-headline">
          <h5>{{title}}</h5>
          <p>{{description}}</p>
        </div>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: "NotificationItem",
  props:{
    title: {
      required: true,
    },
    description: {
      required: true,
    },
    notificationClass: {
      required: true,
    },
    isActive: {
      required: false,
      default: false,
    }
  }
}
</script>

