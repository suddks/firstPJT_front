<template>
    <div class="text-center bg-dark">
        <hr>
        <h1>영화리뷰 작성 폼 </h1>
        <hr>
        <div class="form-container mx-auto">
        <form @submit.prevent="goCommunity">
        <div class="form-floating mb-5">
            <input type="text" class="form-control" id="floatingInput" placeholder="" :value="movieTitle">
            <label for="floatingInputValue">입소문 낼 영화</label> 
            </div>
            <div class="form-floating mb-5">
            <input type="text" class="form-control" id="floatingInput" placeholder="" v-model.trim="title">
            <label for="floatingInput">제목</label> 
            </div>
            <div class="form-floating">
            <textarea class="form-control" placeholder="" id="floatingTextarea2" style="height: 100px" v-model.trim="content"></textarea>
            <label for="floatingTextarea2">내용</label>
            </div>
            <button type="submit" class="btn btn-secondary mt-5">제출</button>
        </form>
        </div>
    </div>
    </template>
    
    <script setup>
    import {onMounted, ref} from 'vue'
    import { useRouter, useRoute } from 'vue-router'
    import axios from 'axios'
    import {useCounterStore} from '@/stores/counter'
    const store = useCounterStore()
    const router = useRouter()
    const route = useRoute()
    const title = ref('')
    const content = ref('')
    const movieId = route.params.movieId
    const movieTitle = route.query.movieTitle
    
    onMounted(()=>{
        console.log(route.params.movieId)
        store.getUserId()
        console.log(store.userId)
    })
    
    
    const goCommunity = function(){
      
        axios({
            method : 'post',
            url : `${store.Django_URL}/api/v1/movies/${movieId}/reviews/`,
           
            data : {
                title : title.value,
                content : content.value,
                movie : movieId,
                user : store.userId  
            },
    
        })
        .then((response) =>{
            console.log(response.data)
            router.push({name :'CommunityPage'})
    
        })
        .catch((error)=>{
            console.log(error)
            console.log(movieId)
            console.log(store.userId)
            
        }) 
     
    
    }
    </script>
    
    <style scoped>
    .form-container {
      width: 70%;
      margin-top: 100px;
    }
    
    .text-center {
      height: 100vh;
    }
    
    h1 {
      color: white;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    
    hr {
      color: white;
    }
    </style>