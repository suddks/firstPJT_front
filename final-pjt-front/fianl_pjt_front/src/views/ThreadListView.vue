<template>
    <div class="bg-dark">
    <div class="cotainer">
    <div class="accordion" id="accordionPanelsStayOpenExample" v-if="reviewDetail">
    <div class="accordion-item">
        <h2 class="accordion-header">
            <!-- <img src="@/images/snowball_1.png" alt="snowball_1" class="custom-image"> -->
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                <!-- 원본화면 -->
                <div class="review-area" v-show="!isUpdateOpen">
                    <div class="avatar-container mb-3">
                        <Avatar image="/src/images/profile.jpg" shape="circle" />
                        {{ reviewDetail.user_name }}
                    </div>
                    <div class="text-container mb-2">
                        <a class="mb-2" href="#">{{ reviewDetail.movie_name }}</a>
                        <strong class="mb-2">{{ reviewDetail.title }}</strong>
                        <p>{{ reviewDetail.content }}</p>
                    </div>
                    <div class="button-container mb-2">
                        <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
                            <button type="button" class="btn btn-primary fs-20" @click="clickUpdate">게시물수정</button>
                            <button type="button" class="btn btn-primary fs-20" @click="threadCreate">타래작성</button>
                        </div>
                    </div>
                </div>
                <!-- 편집화면 -->
                <div class="review-form-area" v-show="isUpdateOpen">
                    <div class="avatar-container mb-3">
                        <Avatar image="/src/images/profile.jpg" shape="circle" />
                        {{ reviewDetail.user_name }}
                    </div>
                    <form @submit.prevent="reviewUpdate">
                        <div class="text-container mb-2">
                            <div class="input-group mb-3">
                                <label for="title" class="col-form-label">제목</label>
                                <input type="text" id="title" v-model.trim="formTitle">
                            </div>
                            <div class="input-group mb-3">
                                <label for="content" class="form-label">내용</label>
                                <textarea type="text" id="content" cols="30" rows="10" v-model.trim="formContent"></textarea>
                            </div>
                        </div>
                    <div class="button-container">
                        <button type="submit" class="btn btn-primary fs-20">제출</button>
                    </div>
                    </form>
                </div>
            </button>
        </h2>
    </div>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
        <div class="accordion-body">
            <div class="thread-container" v-for="thread in threadList">
                <div class="accordion-content">
                    <div class="avatar-container mb-3">
                        <Avatar image="/src/images/profile.jpg" shape="circle" />
                        {{ thread.user_name }}
                    </div>
                    <div class="text-container mb-2">
                        <strong class="mb-2">{{ thread.title }}</strong>
                        <p>{{ thread.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
</div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCounterStore } from '../stores/counter';
import axios from 'axios';
import Avatar from 'primevue/avatar';

const route = useRoute()
const router = useRouter()
const store = useCounterStore()
const reviewId = ref(route.params.reviewId)
const reviewDetail = ref(null)
const userId = ref(null)
const threadList = ref([])
const isUpdateOpen = ref(false)
const isModalOpen = ref(false)

const formTitle = ref('')
const formContent = ref('')

onMounted(() => {
    axios({
        method: 'get',
        url: `${store.Django_URL}/api/v1/community/reviews/${reviewId.value}/`
    })
    .then((response) => {
        reviewDetail.value = response.data
        threadList.value = response.data.threads
        userId.value = response.data.user
    })
})

// 수정버튼 누르면 로그인 상태 점검&수정 폼 보이기
const clickUpdate = function(){

    if (store.isLogin && store.userId === userId.value) {
        formTitle.value = reviewDetail.value.title
        formContent.value = reviewDetail.value.content
        isUpdateOpen.value = true
    } else if (store.isLogin && store.userId != userId.value) {
        window.alert('작성자만 수정이 가능합니다.')
    } else if (!store.isLogin) {
        window.alert('로그인이 필요합니다.')
        router.push({ name: 'LoginView' })
    }
    }

// submit하면 리뷰 업데이트 
const reviewUpdate = function(){
    axios({
            method : 'put',
            url : `${store.Django_URL}/api/v1/community/reviews/${reviewId.value}/`,
            data : {
                title : formTitle.value,
                content : formContent.value,
                movie : reviewDetail.value.movie,
                user : reviewDetail.value.user

            }   
        })
        .then((response)=>{
            isUpdateOpen.value = false
            reviewDetail.value.title = formTitle.value
            reviewDetail.value.content = formContent.value
            formTitle.value = null
            formContent.value = null
        })
        .catch((error)=>{
            console.log(error)
        })
}


// submit하면 스레드 작성
const threadCreate = function(){
    if (store.isLogin && store.userId != userId.value) {
        router.push({name: 'CreateThread', params: { reviewId: reviewId.value }  })
    } else if (store.isLogin && store.userId === userId.value) {
        window.alert('내가 작성한 글에는 타래 작성이 불가합니다.')
    } else if (!store.isLogin) {
        window.alert('로그인이 필요합니다.')
        router.push({ name: 'LoginView' })
    }  
}
</script>

<style scoped>

.custom-image {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }

.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .accordion {
    width: 90%;
    margin: auto;
  }

  .accordion-button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .avatar-container {
    margin-right: 10px;
  }

  .text-container {
    display: flex;
    flex-direction: column;
  }

  .bg-dark {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  #panelsStayOpen-collapseOne {
    background-color: whitesmoke;
  }
</style>