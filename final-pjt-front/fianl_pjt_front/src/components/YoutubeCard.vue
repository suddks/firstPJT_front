<template>
    <div>
      <div class="youtube-card">
        <a :href="'https://www.youtube.com/watch?v=' + item.id.videoId" target="_blank">
          <img :src="item.snippet.thumbnails.medium.url" alt="Video Thumbnail" />
        </a>
        <p class="video-title">{{ item.snippet.title }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from 'vue'

  
  const props = defineProps({
    item: Object,
  })

  </script>
  
  <style scoped>
 .youtube-card {
  border: 1px solid black;
  margin-bottom: 10px;
  text-align: center;
}

.youtube-card img {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.video-title {
  margin: 10px 0;
  font-size: 16px;
  color: white;
}
  </style>
  
