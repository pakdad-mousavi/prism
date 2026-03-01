import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/dashboard/Dashboard.vue';
import CommandCenter from '../views/dashboard/CommandCenter.vue';
import Missions from '../views/dashboard/Missions.vue';

export const router = createRouter({
  history: import.meta.env.PROD ? createMemoryHistory() : createWebHistory(),
  routes: [
    { path: '/', component: () => import('../views/main/LoadingScreenView.vue') },
    {
      path: '/dashboard',
      component: Dashboard,
      children: [
        {
          path: 'command-center',
          component: CommandCenter,
        },
        {
          path: 'missions',
          component: Missions,
        },
      ],
    },
  ],
});
