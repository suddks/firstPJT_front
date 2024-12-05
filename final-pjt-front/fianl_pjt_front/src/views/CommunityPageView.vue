<template>
    <div class="bg-dark">
      <div class="title-container">
        <h1 class="item-1">Community</h1>
      </div>
      <ReviewList />

    </div>
</template>

<script setup>
import ReviewList from '@/components/ReivewList.vue' 

</script>

<style scoped>
.bg-dark {
    height: 100vh;
}

h1 {
  color: white;
}

@import url(https://fonts.googleapis.com/css?family=Open+Sans:600);

body { 
  font-family: 'Open Sans', 'sans-serif';
  color: #cecece;
  background: #222;
  overflow: hidden;
}
.item-1{
	animation-name: anim-1;
}
.item-1 {
	position: absolute;
  display: block;
  
  width: 60%;
  
  font-size: 2em;
  animation: anim-1 20s ease-in-out 1 forwards;
}


@keyframes anim-1 {
	0%, 8.3% { left: -100%; opacity: 0; }
  8.3%,25% { left: 43%; opacity: 1; }
  /* 33.33%, 100% { left: 110%; opacity: 0; } */
}
</style>