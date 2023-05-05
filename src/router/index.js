import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../pages/HomePage.vue';
import ContactPage from '../pages/ContactPage.vue';
import PostDetailPage from '../pages/PostDetailPage.vue';
import CategoryPostsPage from '../pages/CategoryPostsPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';

const router = createRouter({
  history: createWebHistory(),
  linkActiveClass: 'active',
  linkExactActiveClass: '',
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactPage,
    },
    {
      path: '/posts/:slug',
      name: 'post-detail',
      component: PostDetailPage,
    },
    {
      path: '/category/:category_id/posts',
      name: 'category-posts',
      component: CategoryPostsPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundPage,
    },
  ],
});

export { router };
