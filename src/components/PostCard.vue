<script>
export default {
  name: 'PostCard',

  props: {
    post: Object,
    isDetail: Boolean,
  },

  computed: {
    abstract() {
      return this.post.text.slice(0, 200) + '...';
    },
  },
};
</script>

<template>
  <div>
    <div class="card w-100">
      <div class="card-header clearfix">
        <router-link
          v-if="post.category"
          :to="{
            name: 'category-posts',
            params: {
              category_id: post.category_id,
            },
          }"
          class="badge float-end"
          :style="{ backgroundColor: post.category.color }"
        >
          {{ post.category.label }}
        </router-link>
        <h2>{{ post.title }}</h2>
      </div>

      <div class="card-body">
        <div class="clearfix">
          <img
            :src="post.image"
            class="img-fluid float-end ms-3"
            :class="{
              'w-50': isDetail,
            }"
            :alt="post.title"
            width="120"
          />
          {{ isDetail ? post.text : abstract }}
        </div>
        <div v-if="post.tags.length">
          <hr />
          <span
            v-for="tag in post.tags"
            :key="tag.id"
            class="badge rounded-pill me-2"
            :style="{ backgroundColor: tag.color }"
          >
            {{ tag.label }}
          </span>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-between">
        Creato {{ post.created_at }}
        <router-link
          v-if="!isDetail"
          class="btn btn-primary btn-sm"
          :to="{
            name: 'post-detail',
            params: {
              slug: post.slug,
            },
          }"
        >
          vedi
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
