import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Books from '@/components/Books'

Vue.use(VueRouter)

let router = new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    }
  ]
})

export default router