<template>
  <div>
    <el-dialog
      title="添加商品"
      :visible.sync="dialogAddVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-form
        label-width="70px"
        :label-position="labelPosition"
        :model="addForm"
        ref="ruleForm"
      >
        <!-- 类目选择 开始 -->
        <el-form-item label="商品类目">
          <el-button
            class="category"
            type="primary"
            @click="dialogCategoryVisible = true"
            >类目选择</el-button
          >
          <p>{{ treeData.name }}</p>
          <!-- 类目选择弹框 -->
          <el-dialog
            width="50%"
            title="类目选择"
            :visible.sync="dialogCategoryVisible"
            append-to-body
          >
            <ProductTree @treeData="getTreeData" />

            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="getCategoryDataHandle"
                >类目选择确 定</el-button
              >
            </span>
          </el-dialog>
        </el-form-item>
        <!-- 类目选择 结束 -->

        <el-form-item label="商品名称" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="商品卖点" prop="sellPoint">
          <el-input v-model="addForm.sellPoint"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="price">
          <el-input v-model="addForm.price"></el-input>
        </el-form-item>
        <el-form-item label="商品数量" prop="num">
          <el-input v-model="addForm.num"></el-input>
        </el-form-item>
        <!-- 商品图片 -->
        <el-form-item label="商品图片">
          <el-button
            class="category"
            type="primary"
            @click="dialogUploadVisible = true"
            >图片上传</el-button
          >
          <!-- 展示图片路径 -->
          <p>{{ upLoadData.url }}</p>
          <el-dialog
            width="50%"
            title="上传图片"
            :visible.sync="dialogUploadVisible"
            append-to-body
          >
            <ProductUpload @upload="getUpload" />
          </el-dialog>
        </el-form-item>

        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <!-- wang富文本组件 -->
          <ProductWangEditor @onEditor="getonEditor" />
        </el-form-item>

        <!-- 规格参数 开始 -->
        <div v-for="(item, index) in treeDataEditor" :key="index">
          <h3>{{ item.value }}</h3>
          <div
            v-for="(childItem, childIndex) in item.children"
            :key="childIndex"
          >
            <el-form-item label-width="130px" :label="childItem.childValue">
              <el-input v-model="childItem.value" type="text"></el-input>
            </el-form-item>
          </div>
        </div>
        <!-- 规格参数 结束 -->
      </el-form>
      <!-- 商品列表添加 弹框里的确定 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
import ProductWangEditor from "./ProductWangEditor";
import ProductUpload from "./ProductUpload";
import ProductTree from "./ProductTree";

export default {
  name: "ProductAdd",
  data() {
    return {
      dialogAddVisible: false,
      labelPosition: "left",
      // 控制图片上传到服务器后图片上传对话框
      dialogUploadVisible: false,
      // 控制类目选择完对话框
      dialogCategoryVisible: false,
      addForm: {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      },
      // 类目的数据
      treeData: {},
      // 图片数据
      upLoadData: {},
      // 王富文本编辑器的输入数据
      editorData: "",

      treeDataEditor: [],
    };
  },
  components: {
    ProductWangEditor,
    ProductUpload,
    ProductTree,
  },

  mounted() {
    this.$bus.$on("productAdd", (aa) => {
      this.dialogAddVisible = aa;
    });
  },

  methods: {
    handleClose() {
      this.dialogAddVisible = false;
    },

    // 上传成功以后传过来的事件
    getUpload(data) {
      console.log("图片点击上传到服务器后返回的数据", data);
      this.dialogUploadVisible = false;
      // 传过来的数据要存起来显示某些信息
      this.upLoadData = data;
    },

    // 类目选择弹框上的 确定
    getCategoryDataHandle() {
      api
        .paramsItem({
          cid: this.treeData.cid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            this.treeDataEditor = JSON.parse(res.data.result[0].paramData);
            this.dialogCategoryVisible = false;
          } else {
            this.$message("请选择分类");
          }
        });
    },

    // 使用类目选择tree子级组件中的事件
    getTreeData(data) {
      console.log('选择完类目的数据',this.treeData);
      this.treeData = data;
    },

    // wang子级组件里传过来的
    getonEditor(data) {
      console.log(data);
      this.editorData = data;
    },

    // 商品完善后点击的【确定】按钮，需要提交新加的商品数据
    sureSubmit() {
      api
        .insertTbItem({
          title: this.addForm.name,
          cid: this.treeData.cid,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image: this.upLoadData.url,
        })
        .then((res) => {
          if (res.data.status == 200) {
            console.log("信息完善后点确定提交的数据", res.data);
            this.dialogAddVisible = false;
            // 上传成功后的标志需要传给list让其去刷新页面数据
            this.$bus.$emit("onRef", true);
            this.initForm();
          } else {
            this.$message.error("添加失败");
          }
        });
    },
    // 初始化
    initForm() {
      (this.addForm = {
        name: "",
        sellPoint: "",
        price: "",
        num: "",
      }),
        (this.treeData = {}),
        (this.uploadData = {}),
        (this.editorData = "");
    },
  },
};
</script>

<style scoped lang="less">
.category {
  float: left;
  margin-right: 20px;
}
.upload-img {
  width: 400px;
  float: left;
}
</style>