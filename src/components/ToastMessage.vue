<template>
  <div class="position-absolute top-0 end-0">
    <Toast v-for="(item, key) in messages" :key="key" :msg="item"></Toast>
  </div>
</template>
<script>
import Toast from './Toast.vue';

export default {
  inject: ['emitter'],
  components: {
    Toast,
  },
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    // Mitt接收，監聽
    this.emitter.on('push-message', (message) => {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
    });
  },
};
</script>
