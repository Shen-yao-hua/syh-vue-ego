<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%"
      class="el-table"
      :cell-style="cellstyle"
    >
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "ElementTable",
  props: {
    tableData: {
      type: Array,
      default: function () {
        return [];
      },
    },
    cellstyle: {
      type: Function,
      default: function () {
        return [];
      },
    },
  },
};
</script>

<style>
</style>