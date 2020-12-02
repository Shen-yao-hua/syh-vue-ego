<template>
  <div class="product-container">
    <ProductHead />
    <ProductList />
    <ProductPagination />
    <ProductAdd />
    <ProductEditor />
  </div>
</template>

<script>
import ProductHead from "./ProductHead";
import ProductList from "./ProductList";
import ProductPagination from "./ProductPagination";
// 点击编辑弹出的编辑组件
import ProductEditor from "./ProductEditor";

import ProductAdd from "./ProductAdd";

export default {
  name: "Index",
  components: {
    ProductHead,
    ProductList,
    ProductPagination,
    ProductAdd,
    ProductEditor,
  },
};
</script>

<style>
</style>