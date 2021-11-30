<template>
  <Loading :active="isLoading"></Loading>
  <h2 class="text-center py-4">產品頁面</h2>
  <div class="text-end">
    <button type="button" class="btn btn-primary" @click.prevent="openModal(true)">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4 container">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="200">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">{{ $filters.currency(item.origin_price) }}</td>
        <td class="text-right">{{ $filters.currency(item.price) }}</td>
        <td>
          <span class="text-success" v-if="item.is_enabled">啟用</span>
          <span class="text-muted" v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button class="btn btn-outline-primary btn-sm" @click.prevent="openModal(false, item)">
              編輯
            </button>
            <button class="btn btn-outline-danger btn-sm" @click.prevent="openDelModal(item)">
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="ProductModal"
    :isNew="isNew"
    :product="tempProduct"
    @update-product="updateProduct"
  ></ProductModal>
  <DelModal ref="DelModal" :item="openDelModal" @del-product="delProduct"></DelModal>
  <Paginaiton :pages="pagination" @update-page="getProducts"></Paginaiton>
</template>
<script>
import ProductModal from '../components/ProductModal.vue';
import DelModal from '../components/DelModal.vue';
import Paginaiton from '../components/Pagination.vue';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false, // 判斷新增或編輯
      isLoading: false, // 讀取效果
    };
  },
  components: {
    ProductModal,
    DelModal,
    Paginaiton,
  },
  inject: ['emitter', 'pushMessageState'],
  methods: {
    getProducts(page = 1) {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(apiUrl).then((res) => {
        if (res.data.success) {
          this.isLoading = false;
          console.log(res.data);
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          // Mitt 發送資料到 ToastMessage.vue
          this.pushMessageState(res, '更新資料內容');
        }
      });
    },
    openModal(isNew, item) {
      this.isNew = isNew;
      if (isNew) {
        this.tempProduct = {};
      } else {
        this.tempProduct = { ...item };
      }
      const modalComponent = this.$refs.ProductModal;
      modalComponent.showModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      // 新增
      let apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product`;
      let httpMethod = 'post';
      // 編輯
      if (!this.isNew) {
        apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${item.id}`;
        httpMethod = 'put';
      }

      const modalComponent = this.$refs.ProductModal;
      this.$http[httpMethod](apiUrl, { data: this.tempProduct }).then((res) => {
        console.log(res);
        modalComponent.hideModal();
        // Mitt 發送資料到 ToastMessage.vue，觸發push-message把title內的資訊顯示在畫面上
        if (res.data.success) {
          this.getProducts();
          this.pushMessageState(res, '更新資料內容');
        } else {
          this.pushMessageState(res, '更新資料內容');
        }
      });
    },
    openDelModal(item) {
      this.tempProduct = { ...item };
      const delModalComponent = this.$refs.DelModal;
      delModalComponent.showModal();
    },
    delProduct() {
      const apiUrl = `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/product/${this.tempProduct.id}`;
      this.$http.delete(apiUrl).then((res) => {
        if (res.data.success) {
          console.log(res.data);
          const delModalComponent = this.$refs.DelModal;
          delModalComponent.hideModal();
          this.getProducts();
        }
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
