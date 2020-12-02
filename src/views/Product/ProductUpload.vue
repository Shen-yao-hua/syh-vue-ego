<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    action="http://localhost:3060/api/upload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :file-list="fileList"
    :auto-upload="false"
    :on-success="handleSuccess"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px" size="small" type="success" @click="submitUpload">上传到服务器</el-button >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],  //所有图片存储在这里
    };
  },
  methods: {
    // 上传图片成功预览文件
    handlePreview(file) {
      console.log(file);
    },

    // 上传图片成功点击x删除
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },

    // 点击上传到服务器事件，里边是element ui给的方法,提交图片
    submitUpload() {
      this.$refs.upload.submit();
    },

    // 上传成功返回图片信息要传出去
    handleSuccess(response, file, fileList) {
      this.$emit("upload", response);
    },
  },
};
</script>

<style>
</style>