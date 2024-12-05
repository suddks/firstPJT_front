<template>
  <div class="text-center bg-dark vh-100">
    <hr>
    <h1>타래 작성 폼 </h1>
    <hr>
    <div class="form-container mx-auto">
      <form @submit.prevent="threadSave">
        <div class="form-floating mb-3">
          <input type="text" class="form-control" id="floatingInput" placeholder="" v-model.trim="threadTitle">
          <label for="floatingInput">제목</label>
        </div>
        <div class="form-floating">
          <textarea class="form-control" placeholder="" id="floatingTextarea2" style="height: 100px" v-model.trim="threadContent"></textarea>
          <label for="floatingTextarea2">내용</label>
        </div>
        <button type="submit" class="btn btn-secondary">제출</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';
import axios from 'axios';

const route = useRoute()
const router = useRouter()
const store = useCounterStore()

const reviewId = ref(route.params.reviewId)
const threadTitle = ref('')
const threadContent = ref('')

const threadSave = function(){
  console.log(reviewId.value)
  axios({
    method: 'post',
    url: `${store.Django_URL}/api/v1/community/reviews/${reviewId.value}/threads/`,
    data: {
      title: threadTitle.value,
      content: threadContent.value,
      user: store.userId,
      review: reviewId.value
    }
  })
  .then((response) => {
    console.log('타래 작성 완료')
    router.push({ name: 'ThreadListPage', params: { reviewId: reviewId.value } })
  })
  .catch((error) => {
    console.log('타래 작성 실패!')
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