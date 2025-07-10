<template>
  <div class="import-container">
    <div class="import-tabs">
      <button :class="['import-tab', { active: tab === 'feed' }]" @click="tab = 'feed'">Thức ăn</button>
      <button :class="['import-tab', { active: tab === 'breeder' }]" @click="tab = 'breeder'">Cây, Con giống</button>
      <button :class="['import-tab', { active: tab === 'fertilizer' }]" @click="tab = 'fertilizer'">Phân, Thuốc, Vi chất</button>
      <button :class="['import-tab', { active: tab === 'materials' }]" @click="tab = 'materials'">Nguyên vật liệu</button>
    </div>
    <div class="import-content">
      <div v-if="tab === 'feed'" class="food-grid">
        <div v-for="food in foods" :key="food.name" class="food-card" style="cursor:pointer" @click="openAddForm(food)">
          <img :src="food.img" :alt="food.name" class="food-img" />
          <div class="food-label">{{ food.name }}</div>
        </div>
      </div>
      <div v-else-if="tab === 'breeder'" class="food-grid">
        <div v-for="item in breeders" :key="item.name" class="food-card" style="cursor:pointer" @click="openAddForm(item)">
          <img :src="item.img" :alt="item.name" class="food-img" />
          <div class="food-label">{{ item.name }}</div>
        </div>
      </div>
      <div v-else-if="tab === 'fertilizer'" class="food-grid">
        <div v-for="item in medicines" :key="item.name" class="food-card" style="cursor:pointer" @click="openAddForm(item)">
          <img :src="item.img" :alt="item.name" class="food-img" />
          <div class="food-label">{{ item.name }}</div>
        </div>
      </div>
      <div v-else-if="tab === 'materials'" class="food-grid">
        <div v-for="item in materials" :key="item.name" class="food-card" style="cursor:pointer" @click="openAddForm(item)">
          <img :src="item.img" :alt="item.name" class="food-img" />
          <div class="food-label">{{ item.name }}</div>
        </div>
      </div>
      <div v-else class="other-tab-content">
        <p>Chức năng sẽ cập nhật sau.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import config from '../config';
import thucanchode from '../resources/food/thucanchode.jpg';
import thucanchobode from '../resources/food/thucanchobode.jpg';
import thucanchocathit from '../resources/food/thucanchocathit.jpg';
import thucanchocacanh from '../resources/food/thucanchocacanh.png';
import catap from '../resources/food/catap.jpg';
import hembia from '../resources/food/hembia.jpg';
import Badau from '../resources/food/Badau.jpg';
import lua from '../resources/food/lua.jpg';
import tamcam from '../resources/food/tamcam.jpg';
import dudu from '../resources/food/dudu.jpg';
import bido from '../resources/food/bido.jpg';
import cacloaikhac from '../resources/food/cacloaikhac.jpg';
import bo from '../resources/import/breeder/bo.jpg';
import cacanh from '../resources/import/breeder/cacanh.jpg';
import cagiong from '../resources/import/breeder/cagiong.jpg';
import degiong from '../resources/import/breeder/degiong.jpg';
import gavitcon from '../resources/import/breeder/gavitcon.jpg';
import trungde from '../resources/import/breeder/trungde.jpg';
import conde from '../resources/import/breeder/conde.jpg';
import caygiong from '../resources/import/breeder/caygiong.jpg';
import phanvoco from '../resources/import/medicine/phanvoco.jpg';
import phandam from '../resources/import/medicine/phandam.jpg';
import thuocdietkhuan from '../resources/import/medicine/thuocdietkhuan.jpg';
import khoanviluong from '../resources/import/medicine/khoanviluong.jpg';
import daliem from '../resources/import/medicine/daliem.jpg';
import thuocdietve from '../resources/import/medicine/thuocdietve.jpg';
import thuocdietchuoc from '../resources/import/medicine/thuocdietchuoc.jpg';
import thuoctruco from '../resources/import/medicine/thuoctruco.jpg';
import thuocdietnoingoaikisinh from '../resources/import/medicine/thuocdietnoingoaikisinh.jpg';
import batchuongde from '../resources/import/material/batchuongde.jpg';
import batlotchuong from '../resources/import/material/batlotchuong.jpg';
import luoirao from '../resources/import/material/luoirao.jpg';
import luoilamchuong from '../resources/import/material/luoilamchuong.jpg';
import thietbidien from '../resources/import/material/thietbidien.jpg';
import thietbinuoc from '../resources/import/material/thietbinuoc.jpg';
import veoca from '../resources/import/material/veoca.jpg';
import catda from '../resources/import/material/catda.jpg';
import gachxaynha from '../resources/import/material/gachxaynha.jpg';
import tamlotsan from '../resources/import/material/tamlotsan.jpg';
import vatlieukhac from '../resources/import/material/vatlieukhac.jpg';

const tab = ref('feed');

const tabDisplayNames = {
  feed: 'Thức ăn',
  breeder: 'Cây, Con giống',
  fertilizer: 'Phân, Thuốc, Vi chất',
  materials: 'Nguyên vật liệu'
};

const foods = [
  { name: 'Thức ăn cho dê', img: thucanchode, link: '/import/feed/de' },
  { name: 'Thức ăn cho bò', img: thucanchobode, link: '/import/feed/bo' },
  { name: 'Thức ăn cho cá thịt', img: thucanchocathit, link: '/import/feed/cathit' },
  { name: 'Thức ăn cho cá cảnh', img: thucanchocacanh, link: '/import/feed/cacanh' },
  { name: 'Cá tạp', img: catap, link: '/import/feed/catap' },
  { name: 'Hèm bia', img: hembia, link: '/import/feed/hembia' },
  { name: 'Bã đậu', img: Badau, link: '/import/feed/badau' },
  { name: 'Lúa', img: lua, link: '/import/feed/lua' },
  { name: 'Tấm cám', img: tamcam, link: '/import/feed/tamcam' },
  { name: 'Đu đủ', img: dudu, link: '/import/feed/dudu' },
  { name: 'Bí đỏ', img: bido, link: '/import/feed/bido' },
  { name: 'Các loại khác', img: cacloaikhac, link: '/import/feed/khac' },
];

const breeders = [
  { name: 'Bò giống', img: bo, link: '/import/breeder/bo' },
  { name: 'Cá cảnh', img: cacanh, link: '/import/breeder/cacanh' },
  { name: 'Cá giống', img: cagiong, link: '/import/breeder/cagiong' },
  { name: 'Dê giống', img: degiong, link: '/import/breeder/degiong' },
  { name: 'Gà, Vịt giống', img: gavitcon, link: '/import/breeder/gavitcon' },
  { name: 'Trứng dế', img: trungde, link: '/import/breeder/trungde' },
  { name: 'Con dế giống', img: conde, link: '/import/breeder/conde' },
  { name: 'Cây giống', img: caygiong, link: '/import/breeder/caygiong' },
];

const medicines = [
  { name: 'Thuốc diệt khuẩn', img: thuocdietkhuan, link: '/import/medicine/thuocdietkhuan' },
  { name: 'Khoán vi lượng', img: khoanviluong, link: '/import/medicine/khoanviluong' },
  { name: 'Đá liếm', img: daliem, link: '/import/medicine/daliem' },
  { name: 'Thuốc diệt côn trùng', img: thuocdietve, link: '/import/medicine/thuocdietve' },
  { name: 'Thuốc diệt chuột', img: thuocdietchuoc, link: '/import/medicine/thuocdietchuoc' },
  { name: 'Thuốc trừ cỏ', img: thuoctruco, link: '/import/medicine/thuoctruco' },
  { name: 'Thuốc diệt nội ngoại ký sinh', img: thuocdietnoingoaikisinh, link: '/import/medicine/thuocdietnoingoaikisinh' },
  { name: 'Phân đạm', img: phandam, link: '/import/medicine/phandam' },
  { name: 'Phân vô cơ', img: phanvoco, link: '/import/medicine/phanvoco' },
];

const materials = [
  { name: 'Bạt chuồng dế', img: batchuongde, link: '/import/material/batchuongde' },
  { name: 'Bạt lót chuồng', img: batlotchuong, link: '/import/material/batlotchuong' },
  { name: 'Lưới rào', img: luoirao, link: '/import/material/luoirao' },
  { name: 'Lưới làm chuồng', img: luoilamchuong, link: '/import/material/luoilamchuong' },
  { name: 'Thiết bị điện', img: thietbidien, link: '/import/material/thietbidien' },
  { name: 'Thiết bị nước', img: thietbinuoc, link: '/import/material/thietbinuoc' },
  { name: 'Vèo cá', img: veoca, link: '/import/material/veoca' },
  { name: 'Cát đá', img: catda, link: '/import/material/catda' },
  { name: 'Gạch xây nhà', img: gachxaynha, link: '/import/material/gachxaynha' },
  { name: 'Tấm lót sàn', img: tamlotsan, link: '/import/material/tamlotsan' },
  { name: 'Vật liệu khác', img: vatlieukhac, link: '/import/material/vatlieukhac' },
];

const router = useRouter();

function openAddForm(item) {
  console.log("item : ", item)
  const typeDisplay = tabDisplayNames[tab.value] || tab.value;
  router.push({
    path: `/import/form/${encodeURIComponent(typeDisplay)}/${encodeURIComponent(item?.name || '')}`
  });
}
</script>

<style scoped>
.import-container {
  max-width: 1100px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  padding: 2rem 1rem;
}
.import-tabs {
  display: flex;
  gap: 2.5rem;
  margin-bottom: 1.2rem;
  justify-content: flex-start;
  border-bottom: 2px solid #256029;
  background: #e8f5e8;
  padding: 0.2rem 0.5rem 0 0.5rem;
}
.import-tab {
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
.import-tab.active {
  border-bottom: 2px solid #256029;
  color: #fff;
  background: linear-gradient(135deg, #256029 0%, #4a7c59 100%);
  font-weight: 600;
}
.import-tab:hover {
  color: #fff;
  background: #4a7c59;
}
.import-content {
  margin-top: 0.5rem;
}
.food-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  align-items: flex-start;
  justify-content: flex-start;
}
.food-card {
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
.food-card:hover {
  box-shadow: 0 4px 16px #0002;
  transform: translateY(-4px) scale(1.03);
}
.food-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
  display: block;
}
.food-label {
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
.other-tab-content {
  text-align: left;
  color: #888;
  font-style: italic;
  padding: 2rem 0.5rem;
}
.add-btn {
  margin-bottom: 1rem;
  background: #1976d2;
  color: #fff;
  border: none;
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
}
.import-btn {
  margin-top: 0.5rem;
  background: #43a047;
  color: #fff;
  border: none;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.95rem;
}
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 1000;
}
.modal-form {
  position: fixed;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  z-index: 1001;
  min-width: 320px;
  box-shadow: 0 4px 24px #0002;
}
.modal-form label {
  display: block;
  margin-top: 1rem;
  font-weight: 500;
}
.modal-form input, .modal-form textarea, .modal-form select {
  width: 100%;
  padding: 0.4rem;
  margin-top: 0.3rem;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.modal-form button {
  margin-top: 1.2rem;
  margin-right: 0.7rem;
}
@media (max-width: 600px) {
  .import-tabs {
    gap: 0.5rem;
    padding: 0.1rem 0.1rem 0 0.1rem;
  }
  .import-tab {
    font-size: 0.85rem;
    padding: 0.1rem 0.2rem;
  }
  .food-img {
    height: 75px;
    max-width: 110px;
    object-fit: contain;
  }
  .food-label {
    font-size: 0.7rem;
    padding: 0.15rem 0.05rem;
  }
  .food-card {
    min-width: 100px;
    max-width: 120px;
    margin: 0 auto;
  }
  .food-grid {
    gap: 0.7rem;
  }
}
</style>