<template>
  <div class="youtube-search">
    <h2><strong>Search on YouTube!</strong></h2>
    <div class="search-bar">
      <label for="search"></label>
      <input type="text" id="search" v-model="movie">
      <button @click="submit" class="search-button">검색</button>
    </div>
    <ul class="youtube-card-list">
      <li><YoutubeCard v-for="item in items.slice(0, 3)" :key="item.id" :item="item" /></li>
    </ul>
  </div>
</template>

<script setup>
import YoutubeCard from '@/components/YoutubeCard.vue'
import { ref } from 'vue'
import axios from 'axios'
const YOUTUBE_API_KEY = import.meta.env.VITE_APP_KEY 
const YOUTUBE_API_URL = 'https://www.googleapis.com/youtube/v3/search/'

const params = {
    key: YOUTUBE_API_KEY,
    part: 'snippet',
    type: 'video',
    q: '',
  }

  const movie = ref('')
  const items = ref([])
  
  const get_list = () => {
    axios.get(YOUTUBE_API_URL, { params })
      .then((response) => {
        console.log(response.data)
        items.value = response.data.items
        console.log(items.value)
      })
      .catch((error) => {
        console.error(error);
      })
  }
  
  const submit = () => {
    params.q = movie.value;
    get_list();
  }



</script>

<style scoped>
#search{
  border-radius: 10px;
}
.youtube-search {
  text-align: center;
  margin: 20px;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

label {
  color: white;
  font-size: 16px;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 200px;
}

.search-button {
  background-color: rgb(236, 94, 94);
  border-radius: 10px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

.youtube-card-list {
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>