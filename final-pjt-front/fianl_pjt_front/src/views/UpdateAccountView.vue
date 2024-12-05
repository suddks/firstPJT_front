<template>
    <div class="bg-dark">
    <div class="container">
    <div class="card text-center shadow p-3 mb-5 bg-body-tertiary rounded">
        <div class="card-body">
            <h5 class="card-title">Change your password</h5>
            <form @submit.prevent="changePassword" class="input-group-container">
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi bi-unlock-fill"></i>
                    </span>
                    <input type="password" class="form-control" placeholder="이전 비밀번호" aria-label="username" aria-describedby="basic-addon1" v-model.trim="old_password">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi bi-lock-fill"></i>
                    </span>
                    <input type="password" class="form-control" placeholder="새 비밀번호" aria-label="password1" aria-describedby="passwordHelpInline" v-model.trim="new_password1">
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1">
                        <i class="bi bi-lock-fill"></i>
                    </span>
                    <input type="password" class="form-control" placeholder="비밀번호 확인" aria-label="passoword2" aria-describedby="passwordHelpInline" v-model.trim="new_password2">
                </div>
                <button class="btn btn-dark" type="submit">비밀번호 변경</button>
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

    const old_password = ref(null)
    const new_password1 = ref(null)
    const new_password2 = ref(null)

    const changePassword = function(){
        const userInfo = {
            old_password: old_password.value,
            new_password1: new_password1.value,
            new_password2: new_password2.value
        }
        store.changePassword(userInfo)
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