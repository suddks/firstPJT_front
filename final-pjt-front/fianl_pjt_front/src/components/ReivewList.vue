<template>
    <div>
        <h2>작성된 리뷰 리스트 출력 </h2>
        <div class="container">
            <div class="image-container" v-for="review in reviews">
                <img :src="getRandomImage().path" :alt="getRandomImage().alt" @click="goThread(review.id)">
            </div>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios'
import {onMounted, ref} from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
const router = useRouter()
const imageArray = [
  { path: "src/images/snowball_1.png", alt: "snowball_1" },
  { path: "src/images/snowball_2.png", alt: "snowball_2" },
  { path: "src/images/snowball_3.png", alt: "snowball_3" },
  { path: "src/images/snowball_4.png", alt: "snowball_4" },
  { path: "src/images/snowball_5.png", alt: "snowball_5" },
  { path: "src/images/snowball_6.png", alt: "snowball_6" },
  { path: "src/images/snowball_7.png", alt: "snowball_7" },
  { path: "src/images/snowball_8.png", alt: "snowball_8" }
]


const goThread = function (reviewId) {
  router.push({ name: 'ThreadListPage', params: { reviewId } })
}

const getRandomImage = function () {
  const randomIndex = Math.floor(Math.random() * imageArray.length)
  return imageArray[randomIndex]
}

const store = useCounterStore()
const reviews = ref([])

onMounted(()=>{
    showReivews()
})

const showReivews = function(){
    axios({
        method : 'get',
        url : `${store.Django_URL}/api/v1/community/reviews/`
    })
    .then((response) =>{
        console.log('전체 데이터 확인')
        console.log(response.data)
        reviews.value = response.data
    })
    .catch((error)=>{
        console.log(error)
    })
}
</script>

<style  scoped>
.image-container {
    display: inline-block;
}

.container {
  display: flex;
  flex-direction: row; /* 자식 요소들을 가로로 정렬 */
  justify-content: center; /* 자식 요소들을 중앙에 정렬 */
  flex-wrap: wrap;
}


img {
  width: 200px;
  height: 200px;
}
</style>