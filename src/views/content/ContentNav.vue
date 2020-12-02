<template>
  <div>
    左边导航
    <el-tree
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
      highlight-current
      :render-content="renderContent"
      :expand-on-click-node="false"
    >
    </el-tree>

    <!-- 子导航添加对话框 -->
    <el-dialog
      title="添加子导航"
      :visible.sync="dialogAddNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="navForm" ref="ruleForm">
        <el-form-item label="导航名字" prop="pass">
          <el-input type="text" v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAddNavHandle">添 加</el-button>
      </span>
    </el-dialog>
    <!-- 子导航添加对话框 -->
    <!-- 子导航修改对话框 -->
    <el-dialog
      title="修改子导航"
      :visible.sync="dialogUpdateNavVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form :model="navForm" ref="ruleForm">
        <el-form-item label="导航名字" prop="pass">
          <el-input type="text" v-model="navForm.name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddNavVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureUpdateNavHandle">修 改</el-button>
      </span>
    </el-dialog>
    <!-- 子导航修改对话框 -->
  </div>
</template>

<script>
import api from "../../api";
export default {
  name: "ContentNav",
  inject: ["reload"],
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },

      navForm: {
        name: "",
      },

      dialogAddNavVisible: false,
      dialogUpdateNavVisible: false,
      navContent: {},
    };
  },

  methods: {
    http(level, resolve) {
      api.selectContentCategoryByParentId(level).then((res) => {
        console.log("内容分类管理左边导航一级菜单", res.data);
        if (res.data.status === 200) {
          return resolve(res.data.result);
        } else {
          return resolve([]);
        }
      });
    },

    loadNode(node, resolve) {
      if (node.level === 0) {
        //   第一次访问
        this.http({ id: 1 }, resolve);
      }
      //   点击二级菜单
      if (node.level >= 1) {
        this.http({ id: node.data.pid }, resolve);
      }
    },

    handleNodeClick() {},

    renderContent(h, { node, data, store }) {
      return (
        <span class="custom-tree-node">
          <span>{node.label}</span>
          <span>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.append(node, data)}
            >
              {" "}
              增加子导航
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.update(node, data)}
            >
              修 改{" "}
            </el-button>
            <el-button
              size="mini"
              type="text"
              on-click={() => this.remove(node, data)}
            >
              删 除
            </el-button>
          </span>
        </span>
      );
    },

    // 增加子导航
    append(node, data) {
      console.log("点击增加导航得到的data", data);
      this.navContent = data;
      this.dialogAddNavVisible = true;
    },

    //添加子导航 确定按钮
    sureAddNavHandle() {
      api
        .insertContentCategory({
          pid: this.navContent.pid,
          name: this.navForm.name,
        })
        .then((res) => {
          console.log("增加子导航确定按钮提交数据", res.data);
          if (res.data.status === 200) {
            this.dialogAddNavVisible = false;
            this.reload();
          } else {
            this.$message.erroe("添加失败");
          }
        });
    },

    // 修改子导航
    update(node, data) {
      this.navContent = data;
      this.dialogUpdateNavVisible = true;
    },

    // 修改子导航 确定按钮
    sureUpdateNavHandle() {
      api
        .updateContentCategory({
          pid: this.navContent.pid,
          name: this.navForm.name,
        })
        .then((res) => {
          if (res.data.status === 200) {
              this.$message.success('修改成功')
            this.reload();
          } else {
            this.$message.error("修改失败");
          }
        });
    },

    // 删除子导航
    remove(node, data) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          api
            .deleteContentCategoryById({
              pid: data.pid,
            })
            .then((res) => {
              if (res.data.status === 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                this.http(1);
                this.reload();
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

    handleClose() {
      this.dialogAddNavVisible = false;
    },
  },
};
</script>

<style>
</style>