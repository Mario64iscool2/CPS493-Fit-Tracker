import { userRef } from '@/viewmodel/usersession'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

router.beforeEach((to,from,next) => {
  const session = userRef();
  if(((to.path ==='/admin') && !session.value.admin))
  {
    next('/');
    return;
  }
  next();
})

export default router
