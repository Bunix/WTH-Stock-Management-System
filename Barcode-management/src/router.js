import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const routerOptions = [
  {
    path: '/signup',
    component: 'SignUp'
  },
  {
    path: '/signin',
    component: 'Signin'
  },
  {
    path: '/',
    component: 'Home'
  }
]

const routes = routerOptions.map(route => {
  return {
    path: route.path,
    component: () => import (`@/components/${route.component}.vue`)
  }
})

export default new Router({
  mode: 'history',
  routes
})

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'helloworld',
//       component: HelloWorld
//     },
//     {
//       path: '/test',
//       name: 'test',
//       component: Test
//     }
//   ]
// })