<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="bsModal"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-danger">
          <h5 class="modal-title text-white" id="exampleModalLabel">刪除商品</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">確認要刪除 " {{ item.title }} " 商品</div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click.prevent="$emit('del-product')">
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modalMixin from '../mixins/ModalMixin';

export default {
  mixins: [modalMixin],
  props: ['item'],
};
</script>
