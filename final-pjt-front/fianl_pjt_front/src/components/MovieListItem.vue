<template>
  <div class="card position-relative" @click="goDetail">
    <img style="width:100%; height:auto; border-bottom-left-radius: 0;" class="d-block w-100 card-img-top img-fluid" :src="poster_base_URL + info.poster_path" alt="poster image">
    <div class="overlay"></div>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const poster_base_URL = 'https://image.tmdb.org/t/p/w500/'

const props = defineProps({
  info: Object,
})


const goDetail = function() {
  router.push({ name: 'MovieDetail', params: { movieId : props.info.id}})
}
</script>

<style scoped>
.card {
  position: relative;
  overflow: hidden;
  border: none;
  border-radius: 10px;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* 반투명한 검은 배경 */
  opacity: 0;
  transition: opacity 0.3s ease;
}

.card:hover .overlay {
  opacity: 1;
}

</style>
