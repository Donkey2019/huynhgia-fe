<template>
    <div class="home-card">
      <div style="text-align: left; margin-bottom: 1.5rem; font-style: italic; font-weight: 500;">
        <h2 style="margin: 0;">Chào Mừng đến với</h2>
        <h1 style="margin: 0;">Trang Trại Nông Nghiệp Hữu Cơ Huỳnh Gia</h1>
      </div>
      <div class="slider-wrapper">
        
        <img :src="images[currentIndex]" alt="Panner" class="slider-img" />
        
        <div class="slider-indicators">
          <span v-for="(img, idx) in images" :key="idx" :class="['indicator', { active: idx === currentIndex }]"></span>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import img1 from '../resources/homepaner1.jpg';
import img2 from '../resources/homepaner2.jpg';
import img3 from '../resources/homepaner3.jpg';
import img4 from '../resources/homepaner4.jpg';
import img5 from '../resources/homepaner5.jpg';

const images = [img1, img2, img3, img4, img5];
const currentIndex = ref(0);
let interval = null;

function nextSlide() {
  currentIndex.value = (currentIndex.value + 1) % images.length;
}

onMounted(() => {
  interval = setInterval(nextSlide, 3500);
});
onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style scoped>
.home-card {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  padding: 0.2rem 0.1rem;
  width: 100%;
  max-width: 100vw;
  box-sizing: border-box;
  min-height: calc(95vh - 90px);
  overflow-y: auto;
  margin: 0;
}
.slider-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 0.5rem;
  height: calc(95vh - 200px);
  min-height: 285px;
  max-height: 800px;
  width: 100%;
}
.slider-img {
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 8px #0001;
  width: 86vw;
  max-width: 97vw;
  height: 100%;
  object-fit: cover;
  display: block;
  margin: 0 auto;
}

.slider-indicators {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
}
.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #ccc;
  cursor: pointer;
  transition: background 0.2s;
  border: 2px solid #fff;
}
.indicator.active {
  background: #4caf50;
}
.home-card h1, .home-card h2 {
  color: #256029;
  /* Deep green for harmony with the background */
  text-shadow: 0 2px 8px #e0ffe880;
}
@media (max-width: 1200px) {
  .slider-wrapper {
    height: calc(95vh - 180px);
    min-height: 266px;
  }
  .slider-img {
    width: 94vw;
    max-width: 97vw;
  }
  .home-card {
    padding: 0.5rem 0.1rem;
  }
}
@media (max-width: 800px) {
  .slider-wrapper {
    height: calc(95vh - 160px);
    min-height: 238px;
  }
  .slider-img {
    width: 98vw;
    max-width: 98vw;
    height: 100%;
  }
  .home-card {
    padding: 0.4rem 0.05rem;
    border-radius: 8px;
  }
}
@media (max-width: 600px) {
  .slider-wrapper {
    height: calc(95vh - 140px);
    min-height: 190px;
    max-height: 380px;
  }
  .slider-img {
    width: 99vw;
    max-width: 99vw;
    height: 100%;
    border-radius: 0;
  }
  .home-card {
    padding: 0.1rem 0;
    border-radius: 0;
    box-shadow: none;
  }
  .slider-wrapper {
    margin-bottom: 0.2rem;
  }
  .home-card h1, .home-card h2 {
    font-size: 1.1rem;
  }
}
</style>