<template>
  <div class="import-detail-container">
    <!-- Loại hàng và Tên hàng selection -->
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label>Loại hàng:</label>
        <select v-model="selectedType" @change="onTypeChange">
          <option value="" disabled>Chọn loại hàng</option>
          <option v-for="type in types" :key="type">{{ type }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Tên hàng:</label>
        <select v-model="selectedName" @change="onNameChange">
          <option value="" disabled>Chọn tên hàng</option>
          <option v-for="item in filteredItems" :key="item.name">{{ item.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Ngày nhập:</label>
        <input type="date" v-model="date" required />
      </div>
      <div class="form-group">
        <label>Số lượng nhập:</label>
        <input type="number" v-model.number="quantity" min="1" required />
      </div>
      <div class="form-group">
        <label>Đơn giá nhập (VND):</label>
        <input type="text"
               :value="formatCurrency(importPrice)"
               @input="onImportPriceInput($event.target.value)"
               inputmode="numeric"
               required />
      </div>
      <div class="form-group">
        <label>Nhà cung cấp:</label>
        <select v-model="supplier" required>
          <option value="" disabled>Chọn nhà cung cấp</option>
          <option v-for="s in suppliers" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Tổng tiền (VND):</label>
        <input type="text" :value="formatCurrency(total)" readonly />
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
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import config from '../config.js';

const route = useRoute();
const itemType = route.params.type;
const itemName = route.params.name;

// Dữ liệu import-prices
const importItems = ref([]);
const types = ref([]);
const selectedType = ref('');
const selectedName = ref('');
const filteredItems = computed(() => importItems.value.filter(i => i.type === selectedType.value));

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const date = ref(todayStr());
const quantity = ref(1);
const importPrice = ref(1000);
const supplier = ref('');
const note = ref(`${itemName} số lượng 1`);
const message = ref('');
const suppliers = ref([]);

const total = computed(() => importPrice.value * quantity.value);

function formatCurrency(val) {
  if (typeof val === 'object' && val.value !== undefined) val = val.value;
  if (val === null || val === undefined || isNaN(val)) return '';
  return Number(val).toLocaleString('vi-VN');
}

function onImportPriceInput(val) {
  // Loại bỏ ký tự không phải số
  const numeric = val.replace(/[^\d]/g, '');
  importPrice.value = numeric ? parseInt(numeric, 10) : 0;
}

onMounted(async () => {
  try {
    const res = await fetch(`${config.EXPORT_API_URL}/suppliers`);
    suppliers.value = await res.json();
  } catch (e) {
    suppliers.value = [];
  }
  // Lấy dữ liệu import-prices
  try {
    const res = await fetch(`${config.EXPORT_API_URL}/import-prices`);
    const data = await res.json();
    importItems.value = data;
    types.value = [...new Set(data.map(i => i.type))];
    // Nếu có params truyền vào thì tự động chọn
    if (itemType && types.value.includes(itemType)) {
      selectedType.value = itemType;
      // Lọc các item cùng loại
      const itemsOfType = data.filter(i => i.type === itemType);
      // Tìm theo tên
      const found = itemsOfType.find(i => i.name === itemName);
      if (found) {
        selectedName.value = found.name;
        importPrice.value = found.importPrice;
        note.value = found.note || `${found.name} số lượng ${quantity.value}`;
      } else if (itemsOfType.length > 0) {
        // Nếu không tìm thấy đúng tên, chọn mặc định là item đầu tiên của loại
        selectedName.value = itemsOfType[0].name;
        importPrice.value = itemsOfType[0].importPrice;
        note.value = itemsOfType[0].note || `${itemsOfType[0].name} số lượng ${quantity.value}`;
      }
    } else if (types.value.length > 0) {
      // Nếu không có params, không chọn mặc định
      selectedType.value = '';
      selectedName.value = '';
    }
  } catch (e) {
    importItems.value = [];
    types.value = [];
  }
});

// Khi đổi loại hàng
function onTypeChange() {
  selectedName.value = '';
}

// Khi đổi tên hàng
function onNameChange() {
  const found = importItems.value.find(i => i.type === selectedType.value && i.name === selectedName.value);
  if (found) {
    importPrice.value = found.importPrice;
    note.value = found.note || `${found.name} số lượng ${quantity.value}`;
  }
}

// Tự động cập nhật ghi chú khi đổi số lượng hoặc tên hàng
watch([quantity, selectedName], () => {
  const found = importItems.value.find(i => i.type === selectedType.value && i.name === selectedName.value);
  if (found) {
    note.value = found.note || `${found.name} số lượng ${quantity.value}`;
  } else if (selectedName.value) {
    note.value = `${selectedName.value} số lượng ${quantity.value}`;
  }
});

async function handleSubmit() {
  const payload = {
    type: itemType,
    subtype: itemName,
    name: itemName,
    importPrice: importPrice.value,
    quantity: quantity.value,
    date: date.value,
    supplier: supplier.value,
    total: total.value,
    note: note.value || null,
  };
  try {
    const res = await fetch(`${config.EXPORT_API_URL}/imports`, {
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
.import-detail-container {
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
input, textarea, select {
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