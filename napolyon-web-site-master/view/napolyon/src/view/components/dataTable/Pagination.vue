<template>
  <div class="row">
    <div class="col-9 mt-4 pt-2" v-if="paginate != null">
      <ul class="pagination justify-content-left mb-0">
        <li class="page-item" v-if="!(Number(paginate.current_page) === 0)">
          <a aria-label="Sonraki" class="page-link" href="javascript:void(0)" @click="changePageNumberDirect(paginate.current_page - 1)">
            Önceki
          </a>
        </li>
        <template v-if="paginate.total > 10">
          <li class="page-item" v-if="!(Number(paginate.current_page) === 0)">
            <a class="page-link" href="javascript:void(0)">...</a></li>
          <li class="page-item" :class="{'active': (index - 1) === paginate.current_page}"
              v-for="index in (paginate.current_page + 3)"
              v-if="index > paginate.current_page - 2 && index < (paginate.total + 1)" :key="index">
            <a class="page-link" href="javascript:void(0)" @click="changePageNumberDirect(index - 1 )">
              {{ index }}
            </a>
          </li>
          <li class="page-item" v-if="!(Number(paginate.current_page) === Number(paginate.total) - 1)"><a class="page-link" href="javascript:void(0)">...</a></li>
        </template>
        <template v-else>
          <li class="page-item" :class="{'active': (index - 1) === paginate.current_page}" v-for="index in paginate.total" :key="index">
            <a class="page-link" href="javascript:void(0)" @click="changePageNumberDirect(index - 1 )">
              {{ index }}
            </a>
          </li>
        </template>
        <li class="page-item" v-if="!(Number(paginate.current_page) === Number(paginate.total) - 1)">
          <a aria-label="Sonraki" class="page-link" href="javascript:void(0)"  @click="changePageNumberDirect(paginate.current_page + 1)">
            Sonraki
          </a>
        </li>
      </ul>
    </div>
    <div class="col-3 mt-4 pt-3" v-if="paginate != null">
      <span class="mr-2">
        <b>Toplam:</b> {{ paginate.totalItems }}
      </span>
    </div>
  </div>

</template>

<script>
export default {
  name: "pagination",
  props: {
    paginate: {
      default: {}
    },
    perPage: {
      default: 10,
    },
    page: {
      default: 0,
    },
    showShort: {
      default: false
    }
  },
  methods: {
    changePageNumber(url){
      if(url == null || url === "null") return;
      let page_number = url.split("page=").pop();
      if(Number(this.paginate.current_page) !== Number(page_number)) {
        this.$emit('change', page_number);
      }
    },
    changePageNumberDirect(page){
      let currentPage = null;
      if (page < 0) {
        currentPage = 0;
      } else if (page > this.paginate.total - 1) {
        currentPage = this.paginate.total - 1;
      } else {
        currentPage = page;
      }
      if(this.paginate.current_page !== currentPage) {
        this.$emit('change', currentPage);
      }
    }
  },
  computed: {
    pageNumbers() {
      return null;
    },
  },
}
</script>

<style scoped>
.cursor-initial{
  cursor: initial !important;
}
</style>
