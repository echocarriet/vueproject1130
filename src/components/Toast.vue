<template>
  <div class="toast" role="alert" aria-live="assertive" aria-atomic="true" ref="bsToast">
    <div class="toast-header">
      <span :class="`bg-${msg.style}`" class="rounded me-2 p-2"></span>
      <strong class="me-auto">{{ msg.title }}</strong>
      <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
    </div>
    <div class="toast-body" v-if="msg.content">{{ msg.content }}</div>
  </div>
</template>
<script>
import Toast from 'bootstrap/js/dist/toast';

export default {
  props: ['msg'],
  mounted() {
    // BS Toast實體化並使用show的方法
    const toast = new Toast(this.$refs.bsToast, {
      delay: 6000,
    });
    toast.show();
  },
};
</script>
