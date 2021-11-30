<template>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">用戶端</a>
    </div>
  </nav>
  <div class="container-fluid py-3 position-relative">
    <ToastMessage></ToastMessage>
    <router-view />
  </div>
</template>
<script>
import ToastMessage from '../components/ToastMessage.vue';

export default {
  components: {
    ToastMessage,
  },
};
</script>
