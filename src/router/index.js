import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Blog from '../views/Blog.vue'
import Guestbook from '../views/Guestbook.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { title: 'DaZiDian - 春風若有憐花意，可否許我再少年？' }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: { title: '关于我 - DaZiDian' }
  },
  {
    path: '/works',
    name: 'Works',
    beforeEnter() {
      window.location.href = 'https://github.com/DaZiDian'
    }
  },
  {
    path: '/blog',
    name: 'Blog',
    component: Blog,
    meta: { title: '文章 - DaZiDian' }
  },
  {
    path: '/guestbook',
    name: 'Guestbook',
    component: Guestbook,
    meta: { title: '留言板 - DaZiDian' }
  },
  {
    path: '/shop',
    name: 'Shops',
    component: Shop,
    meta: { title: '商铺 - DaZiDian' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'DaZiDian - Z1D1anWeb'
  next()
})

export default router

