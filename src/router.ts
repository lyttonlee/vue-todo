import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'active',
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'welcome',
      component: () => import('./views/Welcome.vue'),
    },
    {
      path: '/todo',
      component: () => import('./views/Todo.vue'),
      redirect: '/todo/today',
      children: [
        {
          path: '/todo/today',
          name: 'Today',
          component: () => import('./views/Today.vue'),
          meta: {
            icon: 'icon-jintian',
          },
        },
        {
          path: '/todo/tomorrow',
          name: 'Tomorrow',
          component: () => import('./views/Tomorrow.vue'),
          meta: {
            icon: 'icon-mingtian',
          },
        },
        {
          path: '/todo/statistical',
          name: 'Statistics',
          component: () => import('./views/Count.vue'),
          meta: {
            icon: 'icon-tongji5',
          },
        },
      ],
    },
  ],
});
