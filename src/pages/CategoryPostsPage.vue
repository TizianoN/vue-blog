<script>
import PostList from '../components/PostList.vue';

export default {
  name: 'CategoryPostsPage',
  components: { PostList },
};
</script>

<template>
  <PostList type="by-category" class="my-3" />
</template>

<style lang="scss" scoped></style>
