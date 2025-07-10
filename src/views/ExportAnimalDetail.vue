<template>
  <div class="animal-detail-container">
    <h2>Xuất {{ animalName }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Ngày xuất:</label>
        <input type="date" v-model="date" required />
      </div>
      <div class="form-group">
        <label>Số lượng xuất:</label>
        <input type="number" v-model.number="quantity" min="1" required />
      </div>
      <div class="form-group">
        <label>Đơn giá xuất (VND):</label>
        <input type="number" v-model.number="price" min="0" required />
      </div>
      <div class="form-group">
        <label>Ghi chú:</label>
        <textarea v-model="note" maxlength="1000" placeholder="Ghi chú (tối đa 1000 ký tự)"></textarea>
      </div>
      <button type="submit">Lưu</button>
    </form>
    <div v-if="message" class="message">{{ message }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import config from '../config.js';

const route = useRoute();
const animalName = route.params.animal;

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const date = ref(todayStr());
const quantity = ref(1);
const price = ref(10000);
const note = ref('');
const message = ref('');

async function handleSubmit() {
  const payload = {
    animal: animalName,
    date: date.value,
    quantity: quantity.value,
    price: price.value,
    note: note.value || null,
  };
  try {
    const res = await fetch(config.EXPORT_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      message.value = 'Lưu thành công!';
    } else {
      message.value = 'Có lỗi khi lưu.';
    }
  } catch (e) {
    message.value = 'Không thể kết nối máy chủ.';
  }
}
</script>

<style scoped>
.animal-detail-container {
  max-width: 500px;
  margin: 2rem auto;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  padding: 2rem 1.5rem;
}
.form-group {
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
}
label {
  font-weight: 500;
  margin-bottom: 0.3rem;
}
input, textarea {
  padding: 0.5rem;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 1rem;
  font-family: inherit;
}
textarea {
  min-height: 80px;
  resize: vertical;
}
button[type="submit"] {
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 0.7rem 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 500;
  margin-top: 0.5rem;
  transition: background 0.2s;
}
button[type="submit"]:hover {
  background: #125ea7;
}
.message {
  margin-top: 1rem;
  color: #256029;
  font-weight: 500;
}
</style> 