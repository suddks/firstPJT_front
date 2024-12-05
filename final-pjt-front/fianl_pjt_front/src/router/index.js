import { createRouter, createWebHistory } from 'vue-router'
import { useCounterStore } from '../stores/counter'

import MainPageView from '@/views/MainPageView.vue'
import CommunityPageView from '@/views/CommunityPageView.vue'
import CreateReviewView from '@/views/CreateReviewView.vue'
import MovieDetailView from '@/views/MovieDetailView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import UpdateAccountView from '@/views/UpdateAccountView.vue'
import SearchResultView from '@/views/SearchResultView.vue'
import ThreadListView from '@/views/ThreadListView.vue'
import CreateThreadView from '@/views/CreateThreadView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    
    {
      path : '/',
      name : 'MainPage',
      component : MainPageView
    },

    {
      path : '/:movieId',
      name : 'MovieDetail',
      component : MovieDetailView
    },
    {
      path : '/community',
      name : 'CommunityPage',
      component : CommunityPageView
    },
    {
      path : '/community/thread/:reviewId',
      name : 'ThreadListPage',
      component : ThreadListView
    },
    {
      path : '/create_review/:movieId',
      name : 'CreateReview',
      component : CreateReviewView
    },
    {
      path : '/create_thread/:reviewId',
      name : 'CreateThread',
      component : CreateThreadView
    },
    {
      path : '/login',
      name : 'LoginView',
      component : LoginView
    },
    {
      path : '/signup',
      name : 'SignupView',
      component : SignupView
    },
    {
      path : '/update_account',
      name : 'UpdateAccountView',
      component : UpdateAccountView
    },
    {
      path : '/search_result',
      name : 'search',
      component : SearchResultView
    },
  

  ]
})

router.beforeEach((to, from) => {
  const store = useCounterStore()
  if (to.name === 'CreateReview' && !store.isLogin) {
    window.alert('로그인이 필요합니다.')
    return { name: 'LoginView' }
  }
})

export default router
