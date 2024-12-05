<template>
  <div class="bg-black">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container d-flex justify-content-between align-items-center"> 
      
        <div>
          <RouterLink class="navbar-brand" :to="{ name: 'MainPage' }">My Movie</RouterLink>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <RouterLink v-if="!store.token" :to="{ name: 'LoginView' }">Login</RouterLink>
                <RouterLink v-else :to="{ name: 'MainPage' }">Home</RouterLink>
                
                
              </li>
              <li class="nav-item">
                <RouterLink v-if="!store.token" :to="{ name: 'SignupView' }">Signup</RouterLink>
                <a v-else href="#" @click="logOut">Logout</a>
              </li>
              <li class="nav-item" v-if="store.token">
                <RouterLink :to="{ name: 'UpdateAccountView' }">Password</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink :to="{ name: 'CommunityPage' }">Community</RouterLink>
              </li>
              <li class="nav-item" v-if="store.token">
                <p><strong>{{ store.user}}</strong>님 환영합니다!</p>
              </li> 
            </ul>
          </div>
        </div>

        <div class="bg-black">
          <form @submit.prevent="search" class="d-flex">
            <input class="form-control me-2" type="text" placeholder="검색어 입력" v-model.trim="searchText" />
            <button class="btn btn-outline-light" type="submit">검색</button>
          </form>
        </div>
      </div>
    </nav>
  </div>

  <RouterView/>
</template>


<script setup>
import { RouterView, RouterLink } from 'vue-router';
import { ref } from 'vue';
import { useCounterStore } from '@/stores/counter.js'
import MainPageView from '@/views/MainPageView.vue'

const store = useCounterStore()
const searchText = ref(null)

const logOut = function(){
  store.logOut()
}

const changePassword = function(){
  store.changePassword()
}

const search = function(){
    store.search(searchText.value)
    searchText.value = ''
}
</script>

<style scoped>


.nav-item>p{  
  color : lightcoral;
  font-size: 18px;
  font-weight: 200px;
  margin-top: 18px

}
.nav-item>a{
  color : white;
  font-size: 18px;
  font-weight: 200px;
}
.navbar-brand{
  margin-top : 20px;
  margin-left : 15px;
  font-size: 37px;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}
.navbar {
  height: 100px; 
}

.navbar-nav {
  display: flex;
  align-items: center;
}

.nav-item {
  margin-right: 15px; 
}
</style>
