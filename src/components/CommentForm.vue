<script>
import axios from 'axios';

export default {
  name: 'CommentForm',

  data() {
    return {
      comment: {
        name: '',
        email: '',
        message: '',
      },

      errors: [],

      success: false,

      isLoading: false,
    };
  },

  props: {
    post_id: Number,
  },

  methods: {
    sendComment() {
      this.isLoading = true;
      this.errors = [];
      this.success = false;

      const comment = {
        post_id: this.post_id,
        name: this.comment.name,
        email: this.comment.email,
        message: this.comment.message,
      };

      axios
        .post('http://127.0.0.1:8000/api/comments', comment)
        .then((res) => {
          this.comment.name = '';
          this.comment.email = '';
          this.comment.message = '';

          this.success = true;

          this.$emit('addedComment');
        })
        .catch((err) => {
          const response_errors = err.response.data.errors;

          for (const field in response_errors) {
            this.errors.push(response_errors[field][0]);
          }
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>

<template>
  <AppLoader v-if="isLoading" />

  <h3 class="my-3 text-center">Invia un commento</h3>

  <div v-if="errors.length" class="alert alert-danger" role="alert">
    <ul>
      <li v-for="error in errors">{{ error }}</li>
    </ul>
  </div>

  <div v-if="success" class="alert alert-success" role="alert">
    Il commento è stato inviato con successo
  </div>

  <form @submit.prevent="sendComment">
    <div class="row my-3">
      <div class="col-3 text-end">
        <label for="comment_name"> Nome: </label>
      </div>
      <div class="col-9">
        <input
          class="form-control"
          type="text"
          id="comment_name"
          v-model="comment.name"
        />
      </div>
    </div>

    <div class="row my-3">
      <div class="col-3 text-end">
        <label for="comment_email"> Email: </label>
      </div>
      <div class="col-9">
        <input
          class="form-control"
          type="email"
          id="comment_email"
          v-model="comment.email"
        />
      </div>
    </div>

    <div class="row my-3">
      <div class="col-3 text-end">
        <label for="comment_message"> Messaggio: </label>
      </div>
      <div class="col-9">
        <textarea
          class="form-control"
          v-model="comment.message"
          id="comment_message"
        ></textarea>
      </div>
    </div>

    <div class="row my-3">
      <div class="offset-3 col-9">
        <button type="submit" class="btn btn-primary">Invia</button>
      </div>
    </div>
  </form>
</template>

<style lang="scss" scoped></style>
