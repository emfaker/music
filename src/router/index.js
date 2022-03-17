import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      showHeader: true,
      showFooter: true,
      tabId: 1, //标签栏id
      scrollPosition: { x: 0, y: 0 }  //滚动距离
    },
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      showHeader: true,
      showFooter: true,
      tabId: 1 //标签栏id
    },
    component: () => import('../views/Search.vue'),
  },
  {
    path: '/song_list',
    name: 'SongList',
    meta: {
      showHeader: true,
      showFooter: false,
      tabId: 2, //标签栏id
      scrollPosition: { x: 0, y: 0 }  //滚动距离
    },
    component: () => import('../views/SongList.vue'),
  },
  {
    path: '/singer',
    name: 'Singer',
    meta: {
      showHeader: true,
      showFooter: false,
      tabId: 3, //标签栏id
      scrollPosition: { x: 0, y: 0 }  //滚动距离
    },
    component: () => import('../views/Singer.vue'),
  },
  {
    path: '/mv',
    name: 'MV',
    meta: {
      showHeader: true,
      showFooter: true,
      tabId: 4, //标签栏id
      scrollPosition: { x: 0, y: 0 }  //滚动距离
    },
    component: () => import('../views/Mv.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      showHeader: false,
      showFooter: false
    },
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    meta: {
      showHeader: false,
      showFooter: false
    },
    component: () => import('../views/Register.vue'),
  },
  {
    path: '/playlistdetail',
    name: 'playListdetail',
    meta: {
      showHeader: true,
      showFooter: true,
      tabId: 2, //标签栏id
    },
    component: () => import('../views/PlayListDetail.vue'),
  },
  {
    path: '/singer_detail',
    name: 'singerDetail',
    meta: {
      showHeader: true,
      showFooter: true,
      tabId: 3, //标签栏id
    },
    component: () => import('../views/SingerDetail.vue'),
    props: true
  },
  {
    path: '/me',
    name: 'me',
    redirect: '/me/songCollection',
    meta: {
      showHeader: true,
      showFooter: true,
      tabId: 5, //标签栏id
      scrollPosition: { x: 0, y: 0 }  //滚动距离
    },
    children: [
      {
        path: '/me/songCollection',
        name: 'songCollection',
        meta: {
          showHeader: true,
          showFooter: true,
          tabId: 5,
          childTab: 1, //标签栏id
          scrollPosition: { x: 0, y: 0 }  //滚动距离
        },
        component: () => import('../views/Me/SongCollection.vue'),
      },
      {
        path: '/me/SongListCollection',
        name: 'songListCollection',
        meta: {
          showHeader: true,
          showFooter: true,
          tabId: 5,
          childTab: 2, //标签栏id
          scrollPosition: { x: 0, y: 0 }  //滚动距离
        },
        component: () => import('../views/Me/SongListCollection.vue'),
      }
    ],
    component: () => import('../views/Me.vue'),
  },
  {
    path: '/song_detail',
    name: 'songDetail',
    meta: {
      showHeader: false,
      showFooter: false
    },
    component: () => import('../views/SongDetail.vue'),
  },
  {
    path: '/mvDetail',
    name: 'MvDetail',
    meta: {
      showHeader: true,
      showFooter: false,
      tabId: 4, //标签栏id
    },
    component: () => import('../views/MvDetail.vue'),
  },
]

const router = new VueRouter({
  // mode: 'history',
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
