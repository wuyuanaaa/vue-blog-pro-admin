import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    hidden: true,
    redirect: '/dashboard'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login'),
    hidden: true,
    meta: {
      title: '登陆'
    }
  },
  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/index',
    children: [
      {
        path: 'index',
        name: 'Dashboard',
        component: () => import('@/views/dashboard'),
        meta: {
          title: '概览'
        }
      }
    ]
  },
  {
    path: '/articles',
    component: Layout,
    redirect: '/article/list',
    children: [
      {
        path: 'list',
        name: 'ArticlesList',
        component: () => import('@/views/article/list'),
        meta: {
          title: '文章'
        }
      },
      {
        path: 'create',
        name: 'ArticleCreate',
        component: () => import('@/views/article/create'),
        hidden: true,
        meta: {
          title: '新文章'
        }
      },
      {
        path: 'edit/:id',
        name: 'ArticleEdit',
        props: true,
        component: () => import('@/views/article/edit'),
        hidden: true,
        meta: {
          title: '编辑文章'
        }
      }
    ]
  },
  {
    path: '/tags',
    component: Layout,
    redirect: '/tags/index',
    meta: {
      title: '标签'
    },
    children: [
      {
        path: 'index',
        name: 'Tags',
        component: () => import('@/views/tags'),
        meta: {
          title: '标签'
        }
      }
    ]
  },
  {
    path: '/comments',
    component: Layout,
    redirect: '/comments/list',
    meta: {
      title: '评论'
    },
    children: [
      {
        path: 'list',
        name: 'CommentList',
        component: () => import('@/views/comment/list'),
        meta: {
          title: '评论'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
