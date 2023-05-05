<script>
import axios from 'axios';

import PostCard from './PostCard.vue';
import AppPagination from './AppPagination.vue';

export default {
  data() {
    return {
      error: false,
      isLoading: false,
      posts: {
        list: [],
        pages: [],
      },
      category: null,
    };
  },

  props: {
    type: String,
  },

  components: { PostCard, AppPagination },

  emits: ['changePage'],

  methods: {
    fetchPosts(endpoint = null) {
      this.isLoading = true;

      if (!endpoint) endpoint = this.baseEndpoint;

      axios
        .get(endpoint)
        .then((response) => {
          this.posts.list = response.data.posts.data;
          this.posts.pages = response.data.posts.links;
          if (response.data.category) this.category = response.data.category;
        })
        .catch((err) => {
          console.log(err);
          this.error = err.message;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  computed: {
    title() {
      if (this.type == 'most-recent') return 'Post più recenti';
      if (this.type == 'by-category')
        return this.category
          ? 'Posts della categoria ' + this.category.label
          : 'Post filtrati per categoria';
      return 'Lista post';
    },

    baseEndpoint() {
      if (this.type == 'most-recent') return 'http://127.0.0.1:8000/api/posts';
      if (this.type == 'by-category')
        return (
          'http://127.0.0.1:8000/api/category/' +
          this.$route.params.category_id +
          '/posts'
        );
      return 'http://127.0.0.1:8000/api/posts';
    },
  },

  created() {
    this.fetchPosts();
  },
};
</script>

<template>
  <section>
    <h1 class="my-4">{{ title }}</h1>
    <AppLoader v-if="isLoading" />
    <div v-if="error" class="alert alert-danger" role="alert">
      {{ error }}
    </div>
    <div v-else-if="posts.list.length" class="row g-4">
      <PostCard
        v-for="post in posts.list"
        :key="post.id"
        :post="post"
        :isDetail="false"
        class="col-md-4 d-flex"
      />
    </div>
    <h2 v-else class="text-muted">Non ci sono posts</h2>

    <AppPagination :pages="posts.pages" @changePage="fetchPosts" />
  </section>
</template>

<style lang="scss" scoped></style>
