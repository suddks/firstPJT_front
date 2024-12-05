<template>
    <div class="results_container">
        <div class="results_info">
            <h1 style="color:lightcoral"><strong>Results</strong></h1>
        <hr>
        <div v-if="store.searchResults.length > 0">
            <div v-for="info in store.searchResults">
                <div class="card" @click="goDetail(info.id)">
                    
                    <img :src="poster_base_URL + info.poster_path" alt="poster image">
                </div>
            </div>
        </div>
        <div v-else>
            <h2><strong>검색 결과가 없습니다.</strong></h2>
        </div>
       

        </div>
       
    </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter.js'
import { useRouter } from 'vue-router';

const store = useCounterStore()
const router = useRouter()
const poster_base_URL = 'https://image.tmdb.org/t/p/w500/'

const goDetail = function(movieId) {
  router.push({ name: 'MovieDetail', params: { movieId }})
}
</script>

<style scoped>

.results_container{
    justify-content: center;
    gap : 20px;
    display: flex;
    background-color: black;
    color: white;
    text-align: center;
    padding: 20px;
    height: 100vh;
    margin: 0;

}
</style>