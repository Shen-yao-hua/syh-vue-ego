<template>
  <div ref="editorElem" style="text-align: left">
    <!-- <div>{{ editorData }}</div> -->
  </div>
</template>

<script>
import wangeditor from "wangeditor";
export default {
  data() {
    return {
      editor: null,
      editorContent: "",
    };
  },
  // 接收editor传过来的
  props: {
    editorData: {
      type: String,
      default: "",
    },
  },
  //监听数据改变，改变就写入数据
  watch: {
    editorData() {
      this.editor.txt.html(this.editorData);
    },
  },
  components: {
    wangeditor,
  },
  mounted() {
    this.editor = new wangeditor(this.$refs.editorElem);
    this.editor.config.onchange = (html) => {
      this.editorContent = html;
      this.$emit("onEditor", this.editorContent);
    };
    this.editor.config.menus = [
      // 菜单配置
      "head", // 标题
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "italic", // 斜体
      "underline", // 下划线
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      // "table", // 表格
      "code", // 插入代码
      "undo", // 撤销
      "redo", // 重复
    ];
    this.editor.create(); // 创建富文本实例
  },
};
</script>

<style>
</style>