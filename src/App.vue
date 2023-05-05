<script>
import AppHeader from './components/AppHeader.vue';

export default {
  data() {
    return {
      title: 'Vue Boolpress',
    };
  },

  components: { AppHeader },
};
</script>

<template>
  <AppHeader :title="title" />
  <main class="container">
    <router-view />
  </main>
</template>

<style lang="scss"></style>
