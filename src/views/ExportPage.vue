<template>
  <div class="export-container">
    <div class="export-tabs">
      <button :class="['export-tab', { active: tab === 'animals' }]" @click="tab = 'animals'">Vật nuôi</button>
      <button :class="['export-tab', { active: tab === 'plants' }]" @click="tab = 'plants'">Cây, trái</button>
      <button :class="['export-tab', { active: tab === 'fertilizer' }]" @click="tab = 'fertilizer'">Phân hữu cơ</button>
    </div>
    <div class="export-content">
      <div v-if="tab === 'animals'" class="animal-grid">
        <router-link v-for="animal in animals" :key="animal.name" :to="animal.link" class="animal-card">
          <img :src="animal.img" :alt="animal.name" class="animal-img" />
          <div class="animal-label">{{ animal.name }}</div>
        </router-link>
      </div>
      <div v-else-if="tab === 'plants'" class="fruit-grid">
        <router-link v-for="fruit in fruits" :key="fruit.name" :to="fruit.link" class="animal-card">
          <img :src="fruit.img" :alt="fruit.name" class="animal-img" />
          <div class="animal-label">{{ fruit.name }}</div>
        </router-link>
      </div>
      <div v-else-if="tab === 'fertilizer'" class="fertilizer-grid">
        <router-link v-for="fertilizer in fertilizers" :key="fertilizer.name" :to="fertilizer.link" class="animal-card">
          <img :src="fertilizer.img" :alt="fertilizer.name" class="animal-img" />
          <div class="animal-label">{{ fertilizer.name }}</div>
        </router-link>
      </div>
      <div v-else class="other-tab-content">
        <p>Chức năng sẽ cập nhật sau.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import bo from '../resources/export/bo.jpg';
import de from '../resources/export/de.jpg';
import conde from '../resources/export/conde.jpg';
import trunde from '../resources/export/trunde.jpg';
import cacanhle from '../resources/export/cacanhle.jpg';
import cacanhtheodon from '../resources/export/cacanhtheodon.jpg';
import gavit from '../resources/export/gavit.jpg';
import giunque from '../resources/export/giunque.jpg';
import vatnuoikhac from '../resources/export/vatnuoikhac.jpg';
import chuoisap from '../resources/export/fruit/chuoisap.jpg';
import duauongnuoc from '../resources/export/fruit/duauongnuoc.jpg';
import duakho from '../resources/export/fruit/duakho.jpg';
import buoidaxanh from '../resources/export/fruit/buoidaxanh.jpg';
import mit from '../resources/export/fruit/mit.jpg';
import xoaixanh from '../resources/export/fruit/xoaixanh.jpg';
import vusualoren from '../resources/export/fruit/vusualoren.jpg';
import chanhtac from '../resources/export/fruit/chanhtac.jpg';
import chuoisapgiong from '../resources/export/fruit/chuoisapgiong.jpg';
import caymia from '../resources/export/fruit/caymia.jpg';
import buoidaxanhgiong from '../resources/export/fruit/buoidaxanhgiong.jpg';
import fruitkhac from '../resources/export/fruit/cacloaikhac.jpg';
import phantrunque from '../resources/export/fertilizer/phantrunque.jpg';
import phande from '../resources/export/fertilizer/phande.jpg';
import phanbo from '../resources/export/fertilizer/phanbo.jpg';
import damca from '../resources/export/fertilizer/damca.jpg';
import phanu from '../resources/export/fertilizer/phanu.jpg';

const tab = ref('animals');
const animals = [
  { name: 'Con dế', img: conde, link: '/export/form/Vật nuôi/Con dế' },
  { name: 'Trứng dế', img: trunde, link: '/export/form/Vật nuôi/Trứng dế' },
  { name: 'Cá cảnh lẻ', img: cacanhle, link: '/export/form/Vật nuôi/Cá cảnh lẻ' },
  { name: 'Cá cảnh theo đơn', img: cacanhtheodon, link: '/export/form/Vật nuôi/Cá cảnh theo đơn' },
  { name: 'Dê', img: de, link: '/export/form/Vật nuôi/Dê' },
  { name: 'Bò', img: bo, link: '/export/form/Vật nuôi/Bò' },
  { name: 'Gà, vịt', img: gavit, link: '/export/form/Vật nuôi/Gà, vịt' },
  { name: 'Giun quế', img: giunque, link: '/export/form/Vật nuôi/Giun quế' },
  { name: 'Vật nuôi khác', img: vatnuoikhac, link: '/export/form/Vật nuôi/Vật nuôi khác' },
];

const fruits = [
  { name: 'Chuối sáp', img: chuoisap, link: '/export/form/Cây, trái/Chuối sáp' },
  { name: 'Dừa uống nước', img: duauongnuoc, link: '/export/form/Cây, trái/Dừa uống nước' },
  { name: 'Dừa khô', img: duakho, link: '/export/form/Cây, trái/Dừa khô' },
  { name: 'Bưởi da xanh', img: buoidaxanh, link: '/export/form/Cây, trái/Bưởi da xanh' },
  { name: 'Mít', img: mit, link: '/export/form/Cây, trái/Mít' },
  { name: 'Xoài xanh', img: xoaixanh, link: '/export/form/Cây, trái/Xoài xanh' },
  { name: 'Vú sữa', img: vusualoren, link: '/export/form/Cây, trái/Vú sữa' },
  { name: 'Chanh, tắc', img: chanhtac, link: '/export/form/Cây, trái/Chanh, tắc' },
  { name: 'Chuối sáp giống', img: chuoisapgiong, link: '/export/form/Cây, trái/Chuối sáp giống' },
  { name: 'Cây mía', img: caymia, link: '/export/form/Cây, trái/Cây mía' },
  { name: 'Bưởi da xanh giống', img: buoidaxanhgiong, link: '/export/form/Cây, trái/Bưởi da xanh giống' },
  { name: 'Các loại khác', img: fruitkhac, link: '/export/form/Cây, trái/Các loại khác' },
];

const fertilizers = [
  { name: 'Phân trùn quế', img: phantrunque, link: '/export/form/Phân hữu cơ/Phân trùn quế' },
  { name: 'Phân dê', img: phande, link: '/export/form/Phân hữu cơ/Phân dê' },
  { name: 'Phân bò khô', img: phanbo, link: '/export/form/Phân hữu cơ/Phân bò khô' },
  { name: 'Đạm cá', img: damca, link: '/export/form/Phân hữu cơ/Đạm cá' },
  { name: 'Phân ủ', img: phanu, link: '/export/form/Phân hữu cơ/Phân ủ' },
];
</script>

<style scoped>
.export-container {
  max-width: 1100px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  padding: 2rem 1rem;
}
.export-tabs {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 1.2rem;
  justify-content: flex-start;
  border-bottom: 2px solid #256029;
  background: #e8f5e8;
  padding: 0.2rem 0.5rem 0 0.5rem;
}
.export-tab {
  background: none;
  border: none;
  border-radius: 0;
  padding: 0.2rem 0.5rem;
  font-size: 1.15rem;
  cursor: pointer;
  color: #256029;
  font-family: inherit;
  font-weight: 500;
  outline: none;
  box-shadow: none;
  transition: color 0.2s, border-bottom 0.2s, background 0.2s;
  margin-bottom: -2px;
}
.export-tab.active {
  border-bottom: 2px solid #256029;
  color: #fff;
  background: linear-gradient(135deg, #256029 0%, #4a7c59 100%);
  font-weight: 600;
}
.export-tab:hover {
  color: #fff;
  background: #4a7c59;
}
.export-content {
  margin-top: 0.5rem;
}
.animal-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
}
.animal-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  width: 180px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px #0001;
  background: #f8fafc;
  transition: box-shadow 0.2s, transform 0.2s;
  position: relative;
}
.animal-card:hover {
  box-shadow: 0 4px 16px #0002;
  transform: translateY(-4px) scale(1.03);
}
.animal-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}
.animal-label {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(37, 96, 41, 0.85);
  color: #fff;
  font-size: 1.05rem;
  font-weight: 500;
  text-align: center;
  padding: 0.5rem 0.2rem;
  letter-spacing: 0.5px;
}
.fruit-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
}
.fertilizer-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
}
.other-tab-content {
  text-align: left;
  color: #888;
  font-style: italic;
  padding: 2rem 0.5rem;
}
@media (max-width: 600px) {
  .export-tabs {
    gap: 0.5rem;
    padding: 0.1rem 0.1rem 0 0.1rem;
  }
  .export-tab {
    font-size: 0.8rem;
    padding: 0.1rem 0.2rem;
    min-width: unset;
    max-width: 70px;
  }
  .animal-img {
    height: 75px;
    max-width: 110px;
    object-fit: contain;
  }
  .animal-label {
    font-size: 0.7rem;
    padding: 0.15rem 0.05rem;
  }
  .animal-card {
    min-width: 100px;
    max-width: 120px;
    margin: 0 auto;
  }
  .animal-grid, .fruit-grid, .fertilizer-grid {
    gap: 0.7rem;
  }
}
</style>