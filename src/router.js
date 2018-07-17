import Vue from 'vue'
import Router from 'vue-router'
// import store from '@/store'


Vue.use(Router)

const routerOptions = [
  {
    path: '/',
    component: 'Home'
  },
  {
    path: '/invoice',
    component: 'Invoice'
  },
  {
    path: '/getdata',
    component: 'GetData'
  },
  {
    path: '/signup',
    component: 'SignUp'
  },
  {
    path: '/signin',
    component: 'Signin'
  },
  {
    path: '/login',
    component: 'Login'
  },
  {
    path: '/instock',
    component: 'InStock'
  },
  {
    path: '/barcode',
    component: 'Barcode'
    // beforeRouteEnter: checkBarcode
  },
  {
    path: '/test',
    component: 'Test'
  }
  ,
  {
    path: '/test2',
    component: 'Test2'
  }
]

// function checkBarcode(to, from, next) {
//   // eslint-disable-next-line
//   console.log('Check')
//   if (!this.$store.getters.getBarcodePrintLists) {
//     next()  // they are not authorized, so redirect to login
   
//   } else {
//     next('/') // we are authorized, continue on to the requested route
//  }
// }

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
