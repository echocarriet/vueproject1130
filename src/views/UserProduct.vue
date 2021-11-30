<template>
  <h2 class="fw-bold">{{ userProduct.title }}</h2>
  <img :src="userProduct.imageUrl" alt="userProduct.title" style="width:200px" />
</template>
<script>
export default {
  data() {
    return {
      userProduct: {},
      id: '',
    };
  },
  methods: {
    getUserProduct() {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/product/${this.id}`;
      this.$http.get(apiUrl).then((res) => {
        this.userProduct = res.data.product;
        console.log(res);
      });
    },
  },
  mounted() {
    this.id = this.$route.params.productId;
    this.getUserProduct();
  },
};
</script>
