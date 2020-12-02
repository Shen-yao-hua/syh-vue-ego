<template>
  <element-table :tableData="tableData" :cell-style='cellstyle'>
    <el-table-column prop="id" label="商品编号" width="100px" align="center">
    </el-table-column>

    <el-table-column
      show-overflow-tooltip
      prop="title"
      label="商品名称"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="image"
      label="商品图片"
      show-overflow-tooltip
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="sellPoint"
      show-overflow-tooltip
      label="商品卖点"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="price"
      label="价格"
      width="100px"
      align="center"
    ></el-table-column>
    <el-table-column
      prop="num"
      label="库存"
      width="100px"
      align="center"
    ></el-table-column>
    <el-table-column
      show-overflow-tooltip
      prop="descs"
      label="商品描述"
      align="center"
    >
      <!-- 处理渲染的数据去掉p标签 -->
      <template slot-scope="scope">
        <div v-html="scope.row.descs"></div>
      </template>
    </el-table-column>
    <!-- 编辑删除按钮 -->
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
        >
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </element-table>
</template>

<script>
import api from "../../api";
import ElementTable from "../../components/element-table/index.vue";
export default {
  name: "ProductList",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
    };
  },
  components: {
    ElementTable,
  },
  created() {
    // 进来请求第一页
    this.http(1);
    // 然后再把点击pagination的页码传过来请求
    this.$bus.$on("page", (val) => {
      console.log(val);
      this.http(val);
    });
    this.$bus.$on("searchData", (data) => {
      this.tableData = data;
    });

    // 添加完产品点击确定后传过来的标志，让页面自动刷新
    this.$bus.$on("onRef", (data) => {
      this.http(1);
      this.reload()
    });
  },


  methods: {
    // 封装方法请求数据，参数page表示请求的是第几页数据
    http(page) {
      // 请求数据启动loading
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      api.getselectTbItemAllByPage({ page }).then((res) => {
        if (res.data .status===200) {
          loading.close();
        } else {
          // 返回结果关闭loading
          loading.close();
          console.log("商品列表数据", res.data);
          this.tableData = res.data;
        }
      });
    },

    // 编辑 删除 按钮事件
    // 点击编辑事件
    handleEdit(index, row) {
      console.log("编辑打印信息", index, row);
      // 点击编辑传走true
      this.$bus.$emit("onEditor", row);
      this.reload()
    },

    // 点击删除事件
    handleDelete(index, row) {
      console.log("点击删除返回数据", index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        // 点击确定
        .then(() => {
          api
            .deleteItemById({
              id: row.id,
            })
            .then((res) => {
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(1);
                this.reload()
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!",
                });
              }
            });
        })
        // 点击取消
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },


    cellstyle({row, column, rowIndex, columnIndex}){
      console.log('过滤',row);
      if(row.num<=10){
        return{
          color:'red'
        }
      }
    }
  },
};
</script>

<style scoped lang='less'>
</style>