import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TopicsView from '../views/TopicsView.vue'
Vue.use(VueRouter)

const routes = [
  {
    path:'/login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path:'/',
    component:HomeView,
    children:[
      {
        path:'',
        name:'home',
        component:TopicsView,
      },
      {
        path:'/:tab',
        component:TopicsView,
        props:true
      }
    ]
  },
  {
    path:'/topic/create',
    component: () => import('../views/CreateTopic.vue')
  },
  {
    path: '/topic/:topicId',
    // 路由懒加载
    component: () => import('../views/TopicView.vue'),
    props: true
  },
  {
    path:'/user/:loginname',
    component: () => import('../views/UserView.vue'),
    props: true
  },
  {
    path: '/my/message',
    component: () => import('../views/MessageView.vue')
  }
  
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
