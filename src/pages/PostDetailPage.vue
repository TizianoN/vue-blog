<script>
import PostCard from '../components/PostCard.vue';
import CommentList from '../components/CommentList.vue';
import axios from 'axios';

export default {
  name: 'PostDetailPage',

  data() {
    return {
      post: null,
      isLoading: false,
    };
  },

  components: { PostCard, CommentList },

  created() {
    // console.log(this.$route.params.id);
    this.isLoading = true;

    axios
      .get(`http://127.0.0.1:8000/api/posts/${this.$route.params.slug}`)
      .then((response) => {
        // se la chiamata va a buon fine...
        this.post = response.data;
      })
      .catch(() => {
        // se c'è un errore...
        this.$router.push({ name: 'not-found' });
      })
      .finally(() => {
        // comunque sia...
        this.isLoading = false;
      });
  },
};
</script>

<template>
  <AppLoader v-if="isLoading" />
  <h1 class="my-4">Dettaglio Post {{ post?.title }}</h1>
  <PostCard v-if="post" :post="post" :isDetail="true" />
  <CommentList v-if="post" :post_id="post.id" />
</template>

<style lang="scss" scoped></style>
