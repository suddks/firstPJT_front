<template>
  <div class="detail-container">
    <div class="detail-info">
      <p class="detail-title">{{ detailInfo.title }}</p>
      <div class="detail-image">
        <img :src="poster_base_URL + detailInfo.poster_path" alt="poster image">
      </div>
      <p class="detail-overview">줄거리: {{ detailInfo.overview }}</p>
      <p class="detail-release-date">개봉일: {{ detailInfo.release_date }}</p>
      <p class="detail-vote-average">평점:{{detailInfo.vote_average }}</p>
      <p class="detail-vote-count">투표수:{{ detailInfo.vote_count }}</p>
      <button v-if="text" @click="makeReview" class="detail-button">입소문내기</button>
    </div>
    <div class="youtube-search">
      <YoutubeList />
    </div>
  </div>
</template>



<script setup>
import YoutubeList from '@/components/YoutubeList.vue'
import {useRoute} from 'vue-router'
import {onMounted, ref} from 'vue'
import axios from 'axios'
import { useCounterStore } from '@/stores/counter'
import router from '../router';
const store = useCounterStore()
const route = useRoute()
const movieId = route.params.movieId
const detailInfo = ref('')
const text = ref(false)
const poster_base_URL = 'https://image.tmdb.org/t/p/w500/'
console.log(movieId)
console.log('detail page data')
console.log(text.value)

onMounted(()=>{
  ShowDetail()
})
const ShowDetail = function() {
  axios({
    method : 'get',
    url : `${store.Django_URL}/api/v1/movies/${movieId}`
  })
  .then((response)=>{
    console.log(response.data)
    detailInfo.value = response.data
    text.value = true
  })
  .catch((error)=>{
    console.log(error)
  })
}

const makeReview = function(){
  router.push({name: 'CreateReview', params : {movieId:detailInfo.value.id}, query:{movieTitle : detailInfo.value.title}} )
 
}

</script>


<style  scoped>
 .detail-container {
  justify-content: center;
  gap: 20px;
  display: flex;
  background-color: black;
  color: white;
  text-align: center;
  padding: 20px;
  margin: 0;
  min-height: 100vh; /* 변경된 부분 */
  box-sizing: border-box; /* 변경된 부분 */
}


  .detail-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: left;
    width: 100%;
    max-width: 400px;
    margin-right : 120px
  
  }

  .detail-title {
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 15px;
    margin-top: 15px;
  }

  .detail-image img {
    width: 100%;
    max-width: 300px;
    height: auto;
    margin-bottom: 20px;
  }

  .detail-overview,
  .detail-release-date,
  .detail-runtime {
    margin-bottom: 10px;
  }

  .detail-button {
    background-color: rgb(236, 94, 94);
    border-radius: 10px;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
  }

  .youtube-search {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    max-width: 400px;
    margin-left: 20px;
    margin-right: 120px;
  }

  .search-bar {
    display: flex;
    gap: 10px;
    margin-top: 10px;
  }

  .search-bar label {
    flex: 1;
    max-width: 80px;
  }

  .search-bar input {
    flex: 3;
    padding: 5px;
  }

  .search-bar button {
    flex: 1;
    padding: 5px;
    cursor: pointer;
  }

</style>