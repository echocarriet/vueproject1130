<template>
  <Navbar></Navbar>
  <div class="container-fluid position-relative">
    <ToastMessage></ToastMessage>
    <router-view />
  </div>
</template>
<script>
// import emitter from '../methods/emitter';
import Navbar from '../components/Navbar.vue';
import ToastMessage from '../components/ToastMessage.vue';

export default {
  components: {
    Navbar,
    ToastMessage,
  },
  // provide() {
  //   return {
  //     emitter,
  //   };
  // },
  created() {
    // 取出cookie中的token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)carrieToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1',
    );
    // axios請求中加上token
    this.$http.defaults.headers.common.Authorization = token;
    // API文件檢查用戶是否仍持續登入
    const apiUrl = `${process.env.VUE_APP_API}api/user/check`;
    this.$http.post(apiUrl).then((res) => {
      console.log(res);
    });
  },
};
</script>
