<script>
export default {
  name: 'AppLoader',
};
</script>

<template>
  <div class="layover">Loader</div>
</template>

<style lang="scss" scoped>
.layover {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 99;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
}
</style>
