<template>
    <div class="bg-dark">
    <div class="container">
    <div class="card text-center shadow p-3 mb-5 bg-body-tertiary rounded">
        <div class="card-body">
            <h5 class="card-title">Log in to your account</h5>
            <form @submit.prevent="logIn" class="input-group-container">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi bi-person-fill"></i>
                    </span>
                    <input type="text" class="form-control" placeholder="닉네임" aria-label="username" aria-describedby="basic-addon1" v-model.trim="username">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi bi-lock-fill"></i>
                    </span>
                    <input type="password" class="form-control" placeholder="비밀번호" aria-label="password1" aria-describedby="passwordHelpInline" v-model.trim="password">
                </div>
                <button class="btn btn-dark" type="submit">로그인</button>
            </form>
        </div>
        <div class="card-footer text-body-secondary"></div>
    </div>
    </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { useCounterStore } from '@/stores/counter.js'

    const store = useCounterStore()

    const username = ref(null)
    const password = ref(null)

    const logIn = function(){
        const userInfo = {
            username: username.value,
            password: password.value
        }
        store.logIn(userInfo)
    }
</script>

<style  scoped>
.card {
    width: 30%;
    height: 450px;
    margin-top: 200px;
}

.container {
    display: flex;
    justify-content: center;
}

.card-footer {
    height: 12%;
}

.card-title {
    margin-top: 7%;
    margin-bottom: 13%;
}

.input-group {
    width: 90%;
}

.input-group-container {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

button {
    position: relative;
    top: 50px;
}

.bg-dark {
    height: 100vh;
}
</style>