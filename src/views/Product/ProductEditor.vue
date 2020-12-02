<template>
  <div>
    <el-dialog
      title="修改商品"
      :visible.sync="dialogEditorVisible"
      width="80%"
      :before-close="handleClose"
    >
      <el-form
        label-width="70px"
        :label-position="labelPosition"
        :model="addForm"
        ref="ruleForm"
      >
        <el-form-item label="商品类目">
          <el-button
            class="category"
            type="primary"
            @click="innercategoryVisible = true"
            >类目选择</el-button
          >
          <p>{{ treeData.name }}</p>
          <el-dialog
            width="50%"
            title="类目选择"
            :visible.sync="innercategoryVisible"
            append-to-body
          >
            <ProductTree @getcategoryData="getcategoryData" />
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="getCategoryDataHandle"
                >确 定</el-button
              >
            </span>
          </el-dialog>
        </el-form-item>

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
        <!-- <el-form-item label="历史描述">
          <p v-html="editorData"></p>
        </el-form-item> -->
        <el-form-item label="商品描述">
          <!-- wang富文本组件 -->
          <ProductWangEditor
            @onEditor="getonEditor"
            :editorData="editorContent"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditorVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ProductWangEditor from "./ProductWangEditor";
import ProductUpload from "./ProductUpload";
import ProductTree from "./ProductTree";
import api from "../../api";
import { mapState, mapMutations } from "vuex";

export default {
  name: "ProductAdd",
  data() {
    return {
      // 商品添加对话框控制
      dialogEditorVisible: false,
      labelPosition: "left",
      // 控制图片上传到服务器后图片上传对话框
      dialogUploadVisible: false,
      // 控制类目选择完对话框
      innercategoryVisible: false,
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
      currentId: "",
    };
  },
  components: {
    ProductWangEditor,
    ProductUpload,
    ProductTree,
  },

  mounted() {
    //   传过来确定点了编辑
    this.$bus.$on("onEditor", (row) => {
      this.dialogEditorVisible = true;
      this.currentId = row.id;
      // 调用预更新接口,相当于获取当前条数据
      api.preUpdateItem({ id: row.id }).then((res) => {
        console.log("点击编辑预更新数据", res.data.result[0]);
        this.preCategroyUpdate(res.data.result[0].cid);

        this.addForm = {
          name: res.data.result[0].title,
          sellPoint: res.data.result[0].sellPoint,
          price: res.data.result[0].price,
          num: res.data.result[0].num,
        };
        this.upLoadData = {
          url: res.data.result[0].image,
        };
        this.editorData = res.data.result[0].descs;
        // 数据存储进仓库
        this.setEditorContent(this.editorData);
      });
    });
  },
  computed: {
    ...mapState("editorModule", {
      editorContent: (state) => state.editorContent,
    }),
  },

  methods: {
    ...mapMutations("editorModule", ["setEditorContent"]),
    handleClose() {
      this.dialogEditorVisible = false;
    },

    // 上传成功以后传过来的事件
    getUpload(data) {
      console.log("图片点击上传到服务器后返回的数据", data);
      this.dialogUploadVisible = false;
      // 传过来的数据要存起来显示某些信息
      this.upLoadData = data;
    },

    // 选类目里点击确定把弹框隐藏
    getCategoryDataHandle() {
      this.innercategoryVisible = false;
    },

    // 使用类目选择tree子级组件中的事件
    getcategoryData(data) {
      this.treeData = data;
    },

    // wang子级组件里传过来的
    getonEditor(data) {
      console.log(data);
      this.editorData = data;
    },

    // 改完数据点确定按钮事件带走数据请求修改接口
    sureSubmit() {
      api
        .updateTbItem({
          id: this.currentId,
          title: this.addForm.name,
          sellPoint: this.addForm.sellPoint,
          price: this.addForm.price,
          num: this.addForm.num,
          desc: this.editorData,
          image: this.upLoadData.url,
          cid: this.treeData.cid,
        })
        .then((res) => {
          if (res.data.status === 200) {
            //   关闭对话框
            this.dialogEditorVisible = false;
            //   刷新页面
            this.$bus.$emit("onRef", true);
          } else {
            this.$message({
              type: error,
              message: "修改失败",
            });
          }
        });
    },

    // 获取类目
    preCategroyUpdate(cid) {
      api
        .preCategory({
          cid,
        })
        .then((res) => {
          console.log("类目：", res.data.result[0].name);
          if (res.data.status == 200) {
            this.treeData = {
              name: res.data.result[0].name,
              cis: res.data.result[0].cid,
            };
          } else {
            name: res.data.msg;
          }
        });
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