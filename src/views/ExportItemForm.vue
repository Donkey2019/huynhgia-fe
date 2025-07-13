<template>
  <div class="export-detail-container">
    <!-- Modal đăng nhập -->
    <div v-if="isLoginModalOpen" class="login-modal-backdrop">
      <div class="login-modal">
        <h3>Đăng nhập</h3>
        <input v-model="loginName" placeholder="Nhập tên hoặc email" />
        <div v-if="loginError" class="login-error">{{ loginError }}</div>
        <button @click="handleLogin">Đăng nhập</button>
      </div>
    </div>
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
        <label>Ngày xuất:</label>
        <input type="date" v-model="date" required />
      </div>
      <div class="form-group">
        <label>Số lượng xuất:</label>
        <input type="number" v-model.number="quantity" min="1" required />
      </div>
      <div class="form-group">
        <label>Đơn giá xuất (VND):</label>
        <input type="text"
               :value="formatCurrency(price)"
               @input="onPriceInput($event.target.value)"
               inputmode="numeric"
               required />
      </div>
      <div class="form-group">
        <label>Tổng tiền (VND):</label>
        <input type="text" :value="formatCurrency(total)" readonly />
      </div>
      <div class="form-group">
        <label>Người mua:</label>
        <select v-model="shopper" required>
          <option value="" disabled>Chọn người mua</option>
          <option v-for="s in shoppers" :key="s.id" :value="s.id">{{ s.name }}</option>
        </select>
      </div>
      <div class="form-group">
        <label>Thuộc đơn hàng:</label>
        <input type="text" v-model="inOrder" maxlength="100" :placeholder="defaultInOrder" />
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

// Thêm state cho đăng nhập giả lập
const isLoginModalOpen = ref(false);
const userInfo = ref(null);
const loginName = ref('');
const loginError = ref('');

function checkLogin() {
  const user = localStorage.getItem('userInfo');
  if (user) {
    try {
      userInfo.value = JSON.parse(user);
    } catch {
      userInfo.value = null;
    }
  } else {
    userInfo.value = null;
  }
}

function openLoginModal() {
  isLoginModalOpen.value = true;
  loginName.value = '';
  loginError.value = '';
}

function handleLogin() {
  if (!loginName.value.trim()) {
    loginError.value = 'Vui lòng nhập tên hoặc email.';
    return;
  }
  const info = { name: loginName.value.trim() };
  localStorage.setItem('userInfo', JSON.stringify(info));
  userInfo.value = info;
  isLoginModalOpen.value = false;
}

// Dữ liệu export-prices
const exportItems = ref([]);
const types = ref([]);
const selectedType = ref('');
const selectedName = ref('');
const filteredItems = computed(() => exportItems.value.filter(i => i.type === selectedType.value));

function todayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

const date = ref(todayStr());
const quantity = ref(1);
const price = ref(10000);
const shopper = ref('');
const inOrder = ref('');
const note = ref(`${itemName} số lượng 1`);
const message = ref('');
const shoppers = ref([]);

// Computed để tạo giá trị mặc định cho inOrder
const defaultInOrder = computed(() => {
  if (shopper.value && date.value) {
    const selectedShopper = shoppers.value.find(s => s.id === shopper.value);
    const shopperName = selectedShopper ? selectedShopper.name : '';
    return `${shopperName} Ngày xuất ${date.value}`;
  }
  return '';
});

const total = computed(() => price.value * quantity.value);

function formatCurrency(val) {
  if (typeof val === 'object' && val.value !== undefined) val = val.value;
  if (val === null || val === undefined || isNaN(val)) return '';
  return Number(val).toLocaleString('vi-VN');
}

function onPriceInput(val) {
  // Loại bỏ ký tự không phải số
  const numeric = val.replace(/[^\d]/g, '');
  price.value = numeric ? parseInt(numeric, 10) : 0;
}

onMounted(async () => {
  checkLogin();
  // Lấy dữ liệu shoppers
  try {
    const res = await fetch(`${config.EXPORT_API_URL}/shoppers`);
    shoppers.value = await res.json();
  } catch (e) {
    shoppers.value = [];
  }
  // Lấy dữ liệu export-prices
  try {
    const res = await fetch(`${config.EXPORT_API_URL}/export-prices`);
    const data = await res.json();
    exportItems.value = data;
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
        price.value = found.exportPrice;
        note.value = found.note || `${found.name} số lượng ${quantity.value}`;
      } else if (itemsOfType.length > 0) {
        // Nếu không tìm thấy đúng tên, chọn mặc định là item đầu tiên của loại
        selectedName.value = itemsOfType[0].name;
        price.value = itemsOfType[0].exportPrice;
        note.value = itemsOfType[0].note || `${itemsOfType[0].name} số lượng ${quantity.value}`;
      }
    } else if (types.value.length > 0) {
      // Nếu không có params, không chọn mặc định
      selectedType.value = '';
      selectedName.value = '';
    }
  } catch (e) {
    exportItems.value = [];
    types.value = [];
  }
});

// Khi đổi loại hàng
function onTypeChange() {
  selectedName.value = '';
}

// Khi đổi tên hàng
function onNameChange() {
  const found = exportItems.value.find(i => i.type === selectedType.value && i.name === selectedName.value);
  if (found) {
    price.value = found.exportPrice;
    note.value = found.note || `${found.name} số lượng ${quantity.value}`;
  }
}

// Tự động cập nhật ghi chú khi đổi số lượng hoặc tên hàng
watch([quantity, selectedName], () => {
  const found = exportItems.value.find(i => i.type === selectedType.value && i.name === selectedName.value);
  if (found) {
    note.value = found.note || `${found.name} số lượng ${quantity.value}`;
  } else if (selectedName.value) {
    note.value = `${selectedName.value} số lượng ${quantity.value}`;
  }
});

// Tự động cập nhật inOrder khi đổi người mua hoặc ngày xuất
watch([shopper, date], () => {
  if (!inOrder.value) {
    // Chỉ cập nhật nếu inOrder chưa được nhập thủ công
    inOrder.value = defaultInOrder.value;
  }
});

async function handleSubmit() {
  checkLogin();
  if (!userInfo.value) {
    openLoginModal();
    message.value = 'Bạn cần đăng nhập để lưu thông tin.';
    return;
  }
  // Thêm thông tin user vào ghi chú
  let noteWithUser = note.value || '';
  if (userInfo.value && userInfo.value.name) {
    noteWithUser += `\nĐược thêm bởi: ${userInfo.value.name}`;
  }
  const payload = {
    type: itemType,
    subtype: itemName,
    name: itemName,
    exportPrice: price.value,
    quantity: quantity.value,
    date: date.value,
    shopper: shopper.value,
    inOrder: inOrder.value || defaultInOrder.value || null,
    total: total.value,
    note: noteWithUser,
    exporter: userInfo.value ? userInfo.value.name : null,
  };
  try {
    const res = await fetch(`${config.EXPORT_API_URL}/exports`, {
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
.export-detail-container {
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
.login-modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.3);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-modal {
  background: #fff;
  padding: 2rem 1.5rem;
  border-radius: 10px;
  box-shadow: 0 4px 24px #0002;
  min-width: 320px;
  max-width: 90vw;
  text-align: center;
}
.login-modal input {
  width: 90%;
  padding: 0.5rem;
  margin: 1rem 0 0.5rem 0;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 1rem;
}
.login-modal button {
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
.login-modal button:hover {
  background: #125ea7;
}
.login-error {
  color: #d32f2f;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
</style> 