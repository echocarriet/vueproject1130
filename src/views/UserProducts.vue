<template>
  <h3 class="text-center fw-bold py-3">產品列表</h3>
  <table class="table">
    <thead>
      <tr>
        <th scope="col">圖片</th>
        <th scope="col">商品名稱</th>
        <th scope="col">價錢</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, key) in userProducts" :key="key">
        <td>
          <img :src="item.imageUrl" alt="item.title" style="width: 100px" />
        </td>
        <td>{{ item.title }}</td>
        <td>
          <p v-if="!item.price">原價 {{ item.origin_price }} 元</p>
          <del v-if="item.price">原價 {{ item.origin_price }} 元</del>
          <p v-if="item.price">現在特價 {{ item.price }} 元</p>
        </td>
        <td>
          <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
            <button
              type="button"
              class="btn btn-outline-primary"
              @click.prevent="readMore(item.id)"
            >
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click.prevent="addToCart(item.id)"
              :disabled="status.loadingItem === item.id"
            >
              <div
                class="spinner-grow spinner-grow-sm"
                role="status"
                v-if="status.loadingItem === item.id"
              >
                <span class="visually-hidden">Loading...</span>
              </div>
              加入購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <h3 class="fw-bold text-center py-3">購物車列表</h3>
  <table class="table">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">名稱</th>
        <th scope="col">數量</th>
        <th scope="col">單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="cartData.carts">
        <tr v-for="item in cartData.carts" :key="item.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              :disabled="cartData.id === item.id"
              @click.prevent="delSingleProduct(item.id)"
            >
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
          <td>{{ item.product.title }}</td>
          <td>
            <div class="input-group input-group-sm mb-3">
              <input
                type="number"
                class="form-control"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
                v-model.number="item.qty"
              />
              <span class="input-group-text" id="basic-addon1">/{{ item.product.unit }}</span>
            </div>
          </td>
          <td>{{ $filters.currency(item.product.price) }}</td>
        </tr>
      </template>
      <tr v-else>
        <td colspan="4" class="text-center py-5">
          購物車目前尚無商品唷 ! <br />
          歡迎至賣場逛逛
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  inject: ['emitter', 'pushMessageState'],
  data() {
    return {
      userProducts: [],
      cartData: {},
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
    getUserProducts() {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/products`;
      this.$http.get(apiUrl).then((res) => {
        this.userProducts = res.data.products;
      });
    },
    readMore(id) {
      this.$router.push(`/user/product/${id}`);
    },
    addToCart(id) {
      this.status.loadingItem = id;
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      const cart = {
        product_id: id,
        qty: 1,
      };
      this.$http.post(apiUrl, { data: cart }).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.status.loadingItem = '';
          this.getCart();
          this.pushMessageState(res, '加入購物車');
        }
      });
    },
    getCart() {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart`;
      this.$http.get(apiUrl).then((res) => {
        console.log(res);
        this.cartData = res.data.data;
      });
    },
    delSingleProduct(id) {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/cart/${id}`;
      this.$http.delete(apiUrl).then((res) => {
        console.log(res);
        if (res.data.success) {
          this.getCart();
          this.pushMessageState(res, '購物車商品刪除');
        }
      });
    },
  },
  mounted() {
    this.getUserProducts();
    this.getCart();
  },
};
</script>
