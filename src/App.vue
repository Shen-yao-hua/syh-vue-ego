<template>
  <div id="app">
    <router-view v-if="isShow" />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data() {
    return {
      isShow: true,
    };
  },

  provide() {
    return {
      reload: this.reload,
    };
  },

  methods: {
    reload() {
      this.isShow = false;
      this.$nextTick(() => {
        this.isShow = true;
      });
    },
  },
};
</script>

<style scoped>
</style>
