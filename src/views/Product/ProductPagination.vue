<template>
  <div class="pagination-container">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      layout="prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "ProductPagination",
  data() {
    return {
      currentPage: 1,
      total: 0,
    };
  },
  mounted() {
    api.getTotal().then((res) => {
      console.log("商品总数", res.data.result[0]["count(*)"]);
      this.total = res.data.result[0]["count(*)"];
    });
  },
  methods: {
    handleSizeChange() {
      
    },
    handleCurrentChange(val) {
      console.log("handleCurrentChange", val);
      this.$bus.$emit('page',val)
    },
  },
};
</script>

<style scoped>
.pagination-container{
    margin-top: 15px;
    text-align: center;
}
</style>