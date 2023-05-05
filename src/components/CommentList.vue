<script>
import axios from 'axios';
import CommentForm from './CommentForm.vue';
import AppPagination from './AppPagination.vue';

export default {
  name: 'CommentList',

  data() {
    return {
      comments: {
        list: [],
        pages: [],
      },
      isLoading: false,
    };
  },

  props: {
    post_id: Number,
  },

  emits: ['addedComment', 'changePage'],

  components: { CommentForm, AppPagination },

  methods: {
    fetchComments(endpoint = null) {
      this.isLoading = true;

      if (!endpoint)
        endpoint = `http://127.0.0.1:8000/api/post/${this.post_id}/comments`;

      axios
        .get(endpoint)
        .then((res) => {
          this.comments.list = res.data.data;
          this.comments.pages = res.data.links;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  created() {
    this.fetchComments();
  },
};
</script>

<template>
  <AppLoader v-if="isLoading" />

  <ul>
    <li v-for="comment in comments.list">
      <strong>{{ comment.name }}</strong> <br />
      {{ comment.message }}
      <hr />
    </li>
  </ul>

  <AppPagination
    v-if="comments.pages"
    :pages="comments.pages"
    @changePage="fetchComments"
  />

  <CommentForm :post_id="post_id" @addedComment="fetchComments" />
</template>

<style lang="scss" scoped></style>
