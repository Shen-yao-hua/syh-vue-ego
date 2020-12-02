<template>
  <div class="params-container">
    <SearchHead @onSubmitAdd="getSubmitAdd" />

    <element-table :tableData="tableData" :cell-style="cellstyle">
      <el-table-column
        show-overflow-tooltip
        prop="id"
        label="规格参数ID"
        align="center"
        width="100"
      >
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="itemCatId"
        label="类目ID"
        align="center"
        width="100"
      >
      </el-table-column>

      <el-table-column
        show-overflow-tooltip
        prop="paramData"
        label="规格参数"
        align="center"
      >
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </element-table>

    <!-- 分页组件 -->
    <Pagination :total="total" @page="getPages" />

    <!-- 点击添加弹的对话框  开始 -->
    <el-dialog title="规格参数" :visible.sync="dialogParamsVisible">

      <ParamsTree @treeData="getTreeData" />

      <!-- 内层对话框 -->
      <el-dialog
        width="50%"
        title="内层 Dialog"
        :visible.sync="dialogParamsInnerVisible"
        append-to-body
      >
        <!-- 添加分组按钮 -->
        <el-button @click="addDomain" class="addDomain">添加分组</el-button>
        <el-form :model="dynamicValidateForm" ref="dynamicValidateForm">
          <el-form-item
            label="规格参数"
            v-for="(item, index) in dynamicValidateForm.domains"
            :key="index"
            class="el-form-item"
          >
            <el-input v-model="item.value" style="width: 80%"></el-input>
            <el-button @click="addParams(index)" class="addParams"
              >添加参数</el-button
            >

            <div
              v-for="(innerItem, innerIndex) in item.children"
              :key="innerIndex"
            >
              <el-input
                v-model="innerItem.childValue"
                style="width: 60%; margin-left: 80px"
              ></el-input>
              <el-button
                @click="removeParams(index, innerIndex)"
                class="removeParams"
                >删除参数</el-button
              >
            </div>

            <el-button @click="removeDomain(item)" class="removeDomain"
              >删除当前分组</el-button
            >
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogParamsInnerVisible = false">取 消</el-button>
          <el-button type="primary" @click="paramsSubimt">提 交</el-button>
        </span>
      </el-dialog>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogParamsVisible = false">取 消</el-button>
        <el-button type="primary" @click="paramsContentHandle"
          >确定添加此类目的规格参数</el-button
        >
      </span>
    </el-dialog>
    <!-- 点击添加弹的对话框  结束 -->
  </div>
</template>

<script>
import api from "../../api";
import SearchHead from "../../components/SearchHead";
import Pagination from "../../components/Pagination";
import ParamsTree from "../Product/ProductTree";

export default {
  name: "Params",
  data() {
    return {
      treeData: {},
      tableData: [],
      total: 0,
      dialogParamsVisible: false,
      dialogParamsInnerVisible: false,
      // 添加对话框数据结构
      dynamicValidateForm: {
        domains: [
          {
            value: "",
            children: [
              {
                childValue: "",
                value: "",
              },
              {
                childValue: "",
                value: "",
              },
            ],
          },
        ],
      },
    };
  },
  mounted() {
    this.http(1);
    api.paramsTotal().then((res) => {
      console.log("规格参数总页数", res.data.result[0]["count(*)"]);
      this.total = res.data.result[0]["count(*)"];
    });
  },
  components: {
    SearchHead,
    Pagination,
    ParamsTree,
  },
  methods: {
    http(page) {
      // 规格参数列表请求
      api.selectItemParamAll({ page }).then((res) => {
        console.log("规格参数数据：", res.data);
        this.tableData = res.data.result;
      });
    },

    // 点击添加获取treedata数据
    getTreeData(data) {
      console.log(data);
      this.treeData = data;
    },

    // 子级组件传过来的事件
    getSubmitAdd(flag) {
      console.log(flag);
      this.dialogParamsVisible = true;
    },

    cellstyle() {},

    // 规格参数查询数据请求
    searchDataHandle(search) {
      console.log("查询");
      api
        .paramsSearch({
          search,
        })
        .then((res) => {
          this.tableData = res.data.result;
        });
    },

    // 删除按钮事件
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .paramsDelete({
              id: row.id,
            })
            .then((res) => {
              if (res.data.status === 200) {
                this.$message.success("删除成功");
                this.http(1);
              } else {
                this.$message.error("删除失败");
              }
            });
        })
        .catch(() => {
          this.$message.info("已取消删除");
        });
    },

    getPages(page) {
      this.http(page);
    },

    // 点击添加分组
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        children: [
          {
            childValue: "",
            value: "",
          },
          {
            childValue: "",
            value: "",
          },
        ],
      });
    },

    // 点击添加参数
    addParams(index) {
      this.dynamicValidateForm.domains[index].children.push({
        childValue: "",
        value: "",
      });
    },

    // 删除当前分组
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      this.dynamicValidateForm.domains.splice(index, 1);
    },

    // 删除参数
    removeParams(index, innerIndex) {
      this.dynamicValidateForm.domains[index].children.splice(innerIndex, 1);
    },

    paramsContentHandle() {
      this.dialogParamsInnerVisible = true;
    },

    // 提交规格参数
    paramsSubimt() {
      this.dialogParamsVisible=false
      this.dialogParamsInnerVisible = false;
      console.log("提交的当前规格参数", this.dynamicValidateForm.domains);
      api
        .insertItemParam({
          itemCatId: this.treeData.cid,
          content: JSON.stringify(this.dynamicValidateForm.domains),
        })
        .then((res) => {
          console.log("提交规格参数后", res.data);
          if (res.data.status === 200) {
            this.dialogParamsVisible = false;
            this.dialogParamsInnerVisible = false;
            this.http(1);
          } else {
            this.$message.error(res.data.msg);
          }
        });
    },
  },
};
</script>

<style scoped>
.addDomain {
  border-bottom: 1px solid red;
  background: gray;
  color: white;
  margin-bottom: 30px;
  text-align: center;
}
.el-form-item {
  border: 2px solid red;
  padding: 10px;
}

.removeDomain {
  background: red;
  color: aliceblue;
  margin-left: 180px;
}

.addParams {
  background: green;
  color: aliceblue;
  margin-left: 180px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.removeParams {
  background: tomato;
  color: white;
}
</style>