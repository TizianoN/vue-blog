<script>
export default {
  name: 'AppPagination',
  props: { pages: Array },
};
</script>

<template>
  <nav aria-label="Posts pagination">
    <ul class="pagination my-3">
      <li v-for="page in pages" class="page-item">
        <button
          type="button"
          class="page-link"
          @click="$emit('changePage', page.url)"
          :class="{
            disabled: !page.url,
            active: page.active,
          }"
          v-html="page.label"
        ></button>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped></style>
