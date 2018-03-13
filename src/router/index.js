import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Tab from '@/components/Tab'
import Tabs from '@/components/Tabs'
import PageTransition from '@/components/pageTransition.vue';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ps',
      component: PageTransition,
      children: [
        {
          path: '/tab',
          name: 'Tab',
          component: Tab
        },
        {
          path: '/tabs',
          name: 'Tabs',
          component: Tabs
        }
      ]
    },
    
  ]
})
