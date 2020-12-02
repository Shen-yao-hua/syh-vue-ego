<template>
  <div>
    <el-tree
      :props="defaultProps"
      :load="loadNode"
      lazy
      @node-click="handleNodeClick"
      highlight-current
    >
    </el-tree>
  </div>
</template>

<script>
import api from "../../api";

export default {
  name: "ProductTree",
  data() {
    return {
      defaultProps: {
        label: "name",
        children: "children",
      },
    };
  },
  methods: {
    //异步处理事件，element组件中tree组件中的懒加载，因为点击一级后再去请求
    loadNode(node, resolve) {
      console.log("参数node", node);
      // 默认获取第一层数据
      if (node.level === 0) {
        api.selectItemCategoryByParentId().then((res) => {
          if (res.data.status === 200) {
            return resolve(res.data.result);
          } else {
            return resolve([]);
          }
        });
      }
      // 点一级菜单
      if (node.level >= 1) {
        api
          .selectItemCategoryByParentId({
            id: node.data.cid,
          })
          .then((res) => {
            if (res.data.status === 200) {
              return resolve(res.data.result);
            } else {
              return resolve([]);
            }
          })
          .catch((error) => {
            resolve([]);
          });
      }
    },

    // 点击tree后返回cid id name,传递数据
    handleNodeClick(data) {
      console.log("选完类目返回数据", data);
      this.$emit("treeData", data);
    },
  },
};
</script>

<style>
</style>