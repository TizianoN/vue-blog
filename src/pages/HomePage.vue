<script>
import PostList from '../components/PostList.vue';

export default {
  name: 'HomePage',
  components: { PostList },
};
</script>

<template>
  <PostList type="most-recent" class="my-3" />
</template>

<style lang="scss" scoped></style>
