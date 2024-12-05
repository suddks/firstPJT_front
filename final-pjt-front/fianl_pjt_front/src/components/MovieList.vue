<template>

  <div class="bg">
    <h1 style="margin-left : 70px; line-height: 90px; color: lightcoral; font-size: 40px;" class="title"><strong>Today's Movies</strong></h1>
    <hr>
    <div class="row justify-content-center">
      <RecommendMovie v-for="item in sortedArray.slice(0, 10)" :key="item.id" :item="item" class="col-md-3 mb-4" style="margin-left : 30px; padding-left :0px; padding-right: 0px;"/>
    </div>
    <hr>
    <h1 style="margin-left : 70px; line-height: 80px; color: lightcoral; font-size: 40px;" class="title"><strong>Now Playing</strong></h1>
    <div class="row justify-content-center ">
      <MovieListItem v-for="info in movies.slice(0,10)" :key="info.id" :info="info" class="col-md-2 mb-4" style="margin-left:10px; padding-left:0px; padding-right: 0px;" />
    </div>
    <h1 style="margin-left : 70px; line-height: 90px; color: lightcoral; font-size: 40px;" class="title"><strong>TOP 10</strong></h1>
    <div class="row justify-content-center">
      <HighScoreMovieListItem v-for="highitem in HighScoreArray.slice(0, 10)" :key="highitem.id" :highitem="highitem" class="col-md-2 mb-4" style="margin-left : 30px; padding-left :0px; padding-right: 0px;"/>
    </div>
    <h1 style="margin-left : 70px; line-height: 90px; color: lightcoral; font-size: 40px;" class="title"><strong>투표수 많은 순</strong></h1>
    <div class="row justify-content-center">
      <HighVoteMovieListItem v-for="highvote in HighVoteArray.slice(0, 10)" :key="highvote.id" :highvote="highvote" class="col-md-2 mb-4" style="margin-left : 30px; padding-left :0px; padding-right: 0px;"/>
    </div>
  </div>
</template>

  <script setup>
  import HighVoteMovieListItem from '@/components/HighVoteMovieListItem.vue'
  import HighScoreMovieListItem from '@/components/HighScoreMovieListItem.vue'
  import MovieListItem from '@/components/MovieListItem.vue'
  import { useCounterStore } from '@/stores/counter'
  import axios from 'axios'
  import { ref, onMounted, computed} from 'vue' 
  import RecommendMovie from '@/components/RecommendMovie.vue'
  //import { onMounted } from 'vue'
  const movies = ref([])
  const store = useCounterStore()


const getInfoFromDjango = function(){
    axios({
      method : 'get',
      url : `${store.Django_URL}/api/v1/movies/`
    })
    .then((response)=>{
      console.log(response.data)
      movies.value = response.data
      console.log(movies.value)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
 // 스레드 많은 순으로 정렬
  const sortedArray = computed(()=>{
    return movies.value.toSorted((a,b)=>b.thread_count - a.thread_count)
  })

  //평점 높은 순으로 정렬
  const HighScoreArray = computed(()=>{
    return movies.value.toSorted((a,b)=>b.vote_average - a.vote_average)
  })
 
  //투표 수 많은 순으로 정렬
  const HighVoteArray = computed(()=>{
    return movies.value.toSorted((a,b)=>b.vote_count - a.vote_count)
  })

    onMounted(()=>{
      getInfoFromDjango()
  })


    // onMounted(()=>{
    //   goDjango()
      
    // })

  </script>
  
  <style scoped>
 
  .bg{
    background-color: black;
  }

   h1{
    color : white;
    background-color: black;
   }
  </style>
  