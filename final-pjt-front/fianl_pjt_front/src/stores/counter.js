import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import axios from 'axios'

export const useCounterStore = defineStore('counter', () => {
  const router = useRouter()
  const API_KEY = import.meta.env.VITE_API_KEY
  const TMDB_BASE_URL = 'https://api.themoviedb.org/3/movie'
  const language = 'ko'
  const region = 'KR'
  const Django_URL = 'http://127.0.0.1:8000'
  const movieInfo = ref([])
  const searchResults = ref([])
  const DjangoList = ref([])
  const token = ref(null)
  const user = ref(null)
  const userId = ref(null)

  
  const isLogin = computed(() => {
    if (token.value === null) {
      return false
    } else {
      return true
    }
  })

  // const getData = function(){
  //   for (let page=1; page<6; page++){
  //     axios({
  //       method : 'get',
  //       url : `${TMDB_BASE_URL}/now_playing?api_key=${API_KEY}&language=${language}&region=${region}&page=${page}`
  //     })
  //     .then((response) => {
  //       movieInfo.value = response.data.results
  //       console.log(movieInfo.value)
  //       console.log(movieInfo.value.length)
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //     })

  //   }
   
  // }

  const getData = function () {
    let promise = Promise.resolve()
  
    for (let page = 1; page <= 6; page++) {
      promise = promise.then(() => {
        return axios
          .get(`${TMDB_BASE_URL}/now_playing`, {
            params: {
              api_key: API_KEY,
              language: language,
              region: region,
              page: page,
            },
          })
          .then((response) => {
            console.log(response.data)
            const movies = response.data.results
            console.log(`Page ${page} movies:`, movies)
  
            // 각 페이지의 영화 정보를 데이터베이스에 저장
            const moviePromises = movies.map((movie) => {
              return axios.post(`${Django_URL}/api/v1/movies/`, {
                title: movie.title,
                overview: movie.overview,
                poster_path: movie.poster_path,
                release_date: movie.release_date,
                movieId: movie.id,
                vote_average: movie.vote_average,
                vote_count: movie.vote_count
              });
            });
  
            return Promise.all(moviePromises).then(() => {
              console.log(`Page ${page} movies 저장 완료`);
            })
          })
          .catch((error) => {
            console.error(error)
          })
      })
    }
  
    promise.catch((error) => {
      console.error(error);
    });
  };
  
  const signUp = function(userInfo){
    const { username, password1, password2 } = userInfo
    axios({
      method: 'post',
      url: `${Django_URL}/accounts/signup/`,
      data: {
        username, password1, password2
      }
    })
    .then((response) => {
      window.alert('회원가입이 완료되었습니다.')
      router.push({name: 'MainPage'})
    })
    .catch((error) => {
      window.alert('회원가입 실패!')
    })
  }

     

  const getUserId = function(){
    axios({
      method: 'get',
      url: `${Django_URL}/accounts/user/`,
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then((response) => {
      userId.value = response.data.pk
      console.log('userId:')
      console.log(userId.value)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  const logIn = function(userInfo){
    const { username, password } = userInfo
    axios({
      method: 'post',
      url: `${Django_URL}/accounts/login/`,
      data: {
        username, password
      }
    })
    .then((response) => {
      router.push({name: 'MainPage'})
      token.value = response.data.key
      user.value = username
      getUserId()
    })
    .catch((error) => {
      window.alert('로그인 실패!')
    })
  }

  const logOut = function(){
    axios({
      method: 'post',
      url: `${Django_URL}/accounts/logout/`
    })
    .then((response) => {
      router.push({name: 'MainPage'})
      token.value = null
      user.value = null
      userId.value = null
    })
    .catch((error) => {
      window.alert('로그아웃이 실패했습니다!')
    })
  }

  const changePassword = function(userInfo){
    const { old_password, new_password1, new_password2 } = userInfo
    axios({
      method: 'post',
      url: `${Django_URL}/accounts/password/change/`,
      data: {
        old_password, new_password1, new_password2
      },
      headers: {
        Authorization: `Token ${token.value}`
      }
    })
    .then((response) => {
      router.push({name: 'MainPage'})
      window.alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.')
      token.value = null
      user.value = null
    })
    .catch((error) => {
      window.alert('비밀번호 변경 실패!')
    })
  }


 
  const search = function(movieTitle){
    axios({
      method: 'get',
      url: `${Django_URL}/api/v1/movies/${movieTitle}/`
    })
    .then((response) => {
      searchResults.value = response.data
      router.push({name: 'search'})
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return { API_KEY, TMDB_BASE_URL, language, region, getData, Django_URL, movieInfo, signUp, logIn, isLogin, token, user, logOut, changePassword, search, searchResults, getUserId, userId, DjangoList,  }
}, { persist: true })
