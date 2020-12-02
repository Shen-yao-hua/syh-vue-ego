<template>
  <div>
    <HeadNav />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeadNav from "../components/HeadNav";
export default {
  name: "Layout",
  components: {
    HeadNav,
  },
};
</script>

<style scoped>
.container{
  width: 1100px;
  margin: 0 auto;
}
</style>