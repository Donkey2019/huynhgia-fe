<template>
  <div class="report-container">
    <h1>Báo Cáo Nhập Xuất</h1>
    
    <!-- Tổng quan -->
    <div class="overview-cards">
      <div class="card">
        <h3>Tổng Doanh Thu</h3>
        <div class="amount">{{ formatCurrency(totalRevenue) }}</div>
      </div>
      <div class="card">
        <h3>Tổng Chi Phí Nhập</h3>
        <div class="amount">{{ formatCurrency(totalImport) }}</div>
      </div>
      <div class="card">
        <h3>Lợi Nhuận</h3>
        <div class="amount" :class="{ positive: totalProfit > 0, negative: totalProfit < 0 }">
          {{ formatCurrency(totalProfit) }}
        </div>
      </div>
      <div class="card">
        <h3>Tỷ Lệ Lợi Nhuận</h3>
        <div class="amount" :class="{ positive: profitRate > 0, negative: profitRate < 0 }">
          {{ profitRate.toFixed(1) }}%
        </div>
      </div>
    </div>

    <!-- Bộ lọc thời gian -->
    <div class="filter-section">
      <div class="filter-group">
        <label>Từ tháng:</label>
        <input type="month" v-model="startMonth" @change="loadData" />
      </div>
      <div class="filter-group">
        <label>Đến tháng:</label>
        <input type="month" v-model="endMonth" @change="loadData" />
      </div>
    </div>

    <!-- Biểu đồ so sánh nhập xuất -->
    <div class="chart-section">
      <h2>Biểu Đồ Nhập Xuất Theo Tháng</h2>
      <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>

    <!-- Bảng chi tiết -->
    <div class="table-section">
      <h2>Chi Tiết Theo Tháng</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Tháng</th>
              <th>Doanh Thu</th>
              <th>Chi Phí Nhập</th>
              <th>Lợi Nhuận</th>
              <th>Tỷ Lệ Lợi Nhuận</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="month in monthlyData" :key="month.month">
              <td>{{ formatMonth(month.month) }}</td>
              <td>{{ formatCurrency(month.revenue) }}</td>
              <td>{{ formatCurrency(month.import) }}</td>
              <td :class="{ positive: month.profit > 0, negative: month.profit < 0 }">
                {{ formatCurrency(month.profit) }}
              </td>
              <td :class="{ positive: month.profitRate > 0, negative: month.profitRate < 0 }">
                {{ month.profitRate.toFixed(1) }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Danh sách đơn hàng -->
    <div class="orders-section">
      <div class="orders-tabs">
        <button 
          :class="['tab-button', { active: activeTab === 'imports' }]" 
          @click="activeTab = 'imports'"
        >
          Đơn Hàng Nhập ({{ filteredImports.length }})
        </button>
        <button 
          :class="['tab-button', { active: activeTab === 'exports' }]" 
          @click="activeTab = 'exports'"
        >
          Đơn Hàng Xuất ({{ filteredExports.length }})
        </button>
      </div>

      <!-- Danh sách đơn hàng nhập -->
      <div v-if="activeTab === 'imports'" class="orders-list">
        <h3>Đơn Hàng Nhập - {{ formatMonthRange() }}</h3>
        <div class="orders-table-container">
          <table class="orders-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Loại Hàng</th>
                <th>Tên Hàng</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Tổng Tiền</th>
                <th>Nhà Cung Cấp</th>
                <th>Người Nhập</th>
                <th>Ghi Chú</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredImports" :key="item.id">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatCurrency(item.importPrice) }}</td>
                <td>{{ formatCurrency(item.total) }}</td>
                <td>{{ getSupplierName(item.supplier) }}</td>
                <td>{{ item.importer || 'N/A' }}</td>
                <td class="note-cell">{{ item.note || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Danh sách đơn hàng xuất -->
      <div v-if="activeTab === 'exports'" class="orders-list">
        <h3>Đơn Hàng Xuất - {{ formatMonthRange() }}</h3>
        <div class="orders-table-container">
          <table class="orders-table">
            <thead>
              <tr>
                <th>Ngày</th>
                <th>Loại Hàng</th>
                <th>Tên Hàng</th>
                <th>Số Lượng</th>
                <th>Đơn Giá</th>
                <th>Tổng Tiền</th>
                <th>Người Mua</th>
                <th>Người Xuất</th>
                <th>Đơn Hàng</th>
                <th>Ghi Chú</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredExports" :key="item.id">
                <td>{{ formatDate(item.date) }}</td>
                <td>{{ item.type }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.quantity }}</td>
                <td>{{ formatCurrency(item.exportPrice) }}</td>
                <td>{{ formatCurrency(item.total) }}</td>
                <td>{{ getShopperName(item.shopper) }}</td>
                <td>{{ item.exporter || 'N/A' }}</td>
                <td>{{ item.inOrder || 'N/A' }}</td>
                <td class="note-cell">{{ item.note || 'N/A' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="loading">
      <div class="spinner"></div>
      <p>Đang tải dữ liệu...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import config from '../config.js';

const loading = ref(false);
const startMonth = ref('');
const endMonth = ref('');
const imports = ref([]);
const exports = ref([]);
const suppliers = ref([]);
const shoppers = ref([]);
const chartCanvas = ref(null);
const activeTab = ref('imports');
let chart = null;

// Khởi tạo thời gian mặc định (6 tháng gần nhất)
function initDefaultDateRange() {
  const now = new Date();
  const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
  
  startMonth.value = sixMonthsAgo.toISOString().slice(0, 7);
  endMonth.value = now.toISOString().slice(0, 7);
}

// Tính toán dữ liệu theo tháng
const monthlyData = computed(() => {
  const data = {};
  
  // Xử lý dữ liệu xuất (doanh thu)
  exports.value.forEach(item => {
    const month = item.date.slice(0, 7);
    if (!data[month]) {
      data[month] = { revenue: 0, import: 0, month };
    }
    data[month].revenue += item.total || 0;
  });
  
  // Xử lý dữ liệu nhập (chi phí)
  imports.value.forEach(item => {
    const month = item.date.slice(0, 7);
    if (!data[month]) {
      data[month] = { revenue: 0, import: 0, month };
    }
    data[month].import += item.total || 0;
  });
  
  // Tính lợi nhuận và tỷ lệ
  return Object.values(data)
    .map(item => ({
      ...item,
      profit: item.revenue - item.import,
      profitRate: item.revenue > 0 ? ((item.revenue - item.import) / item.revenue) * 100 : 0
    }))
    .sort((a, b) => a.month.localeCompare(b.month));
});

// Tính tổng
const totalRevenue = computed(() => 
  monthlyData.value.reduce((sum, item) => sum + item.revenue, 0)
);

const totalImport = computed(() => 
  monthlyData.value.reduce((sum, item) => sum + item.import, 0)
);

const totalProfit = computed(() => totalRevenue.value - totalImport.value);

const profitRate = computed(() => 
  totalRevenue.value > 0 ? (totalProfit.value / totalRevenue.value) * 100 : 0
);

// Format functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

function formatMonth(monthStr) {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('vi-VN', { 
    year: 'numeric', 
    month: 'long' 
  });
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('vi-VN');
}

function formatMonthRange() {
  if (!startMonth.value || !endMonth.value) return '';
  return `${formatMonth(startMonth.value)} - ${formatMonth(endMonth.value)}`;
}

function getSupplierName(supplierId) {
  if (!supplierId) return 'N/A';
  const supplier = suppliers.value.find(s => s.id === supplierId);
  return supplier ? supplier.name : 'N/A';
}

function getShopperName(shopperId) {
  if (!shopperId) return 'N/A';
  const shopper = shoppers.value.find(s => s.id === shopperId);
  return shopper ? shopper.name : 'N/A';
}

// Computed cho filtered data
const filteredImports = computed(() => imports.value);
const filteredExports = computed(() => exports.value);

// Load data
async function loadData() {
  if (!startMonth.value || !endMonth.value) return;
  
  loading.value = true;
  try {
    // Load imports
    const importRes = await fetch(`${config.EXPORT_API_URL}/imports`);
    imports.value = await importRes.json();
    
    // Load exports
    const exportRes = await fetch(`${config.EXPORT_API_URL}/exports`);
    exports.value = await exportRes.json();
    
    // Load suppliers
    const supplierRes = await fetch(`${config.EXPORT_API_URL}/suppliers`);
    suppliers.value = await supplierRes.json();
    
    // Load shoppers
    const shopperRes = await fetch(`${config.EXPORT_API_URL}/shoppers`);
    shoppers.value = await shopperRes.json();
    
    // Filter data by date range
    imports.value = imports.value.filter(item => 
      item.date >= startMonth.value + '-01' && 
      item.date <= endMonth.value + '-31'
    );
    
    exports.value = exports.value.filter(item => 
      item.date >= startMonth.value + '-01' && 
      item.date <= endMonth.value + '-31'
    );
    
    // Update chart
    updateChart();
  } catch (error) {
    console.error('Error loading data:', error);
  } finally {
    loading.value = false;
  }
}

// Update chart
function updateChart() {
  if (!chartCanvas.value) return;
  
  const ctx = chartCanvas.value.getContext('2d');
  
  if (chart) {
    chart.destroy();
  }
  
  const labels = monthlyData.value.map(item => formatMonth(item.month));
  const revenueData = monthlyData.value.map(item => item.revenue);
  const importData = monthlyData.value.map(item => item.import);
  const profitData = monthlyData.value.map(item => item.profit);
  
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [
        {
          label: 'Doanh Thu',
          data: revenueData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Chi Phí Nhập',
          data: importData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        },
        {
          label: 'Lợi Nhuận',
          data: profitData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return new Intl.NumberFormat('vi-VN', {
                style: 'currency',
                currency: 'VND',
                notation: 'compact'
              }).format(value);
            }
          }
        }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
            }
          }
        }
      }
    }
  });
}

onMounted(() => {
  initDefaultDateRange();
  loadData();
});
</script>

<style scoped>
.report-container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 12px;
  box-shadow: 0 4px 24px #0002;
  border: 1px solid #dee2e6;
}

.report-container h1 {
  color: #256029;
  margin-bottom: 2rem;
  text-align: center;
}

.overview-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.card h3 {
  color: #495057;
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.card .amount {
  font-size: 1.5rem;
  font-weight: bold;
  color: #256029;
}

.card .amount.positive {
  color: #28a745;
}

.card .amount.negative {
  color: #dc3545;
}

.filter-section {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 500;
  color: #495057;
}

.filter-group input {
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 1rem;
}

.chart-section {
  margin-bottom: 2rem;
}

.chart-section h2 {
  color: #256029;
  margin-bottom: 1rem;
}

.chart-container {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table-section h2 {
  color: #256029;
  margin-bottom: 1rem;
}

.table-container {
  overflow-x: auto;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 10px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px #0001;
}

th, td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  background: #256029;
  color: #fff;
  font-weight: 600;
}

tr:hover {
  background: #f8f9fa;
}

.positive {
  color: #28a745;
  font-weight: 600;
}

.negative {
  color: #dc3545;
  font-weight: 600;
}

.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  color: #6c757d;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #256029;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .report-container {
    padding: 1rem;
    margin: 1rem;
  }
  
  .overview-cards {
    grid-template-columns: 1fr;
  }
  
  .filter-section {
    flex-direction: column;
    gap: 1rem;
  }
  
  .table-container {
    font-size: 0.9rem;
  }
  
  th, td {
    padding: 0.5rem;
  }
}

.orders-section {
  margin-top: 3rem;
}

.orders-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tab-button {
  background: none;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 500;
  color: #6c757d;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.tab-button:hover {
  color: #256029;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 6px;
}

.tab-button.active {
  color: #256029;
  border-bottom-color: #256029;
  background: linear-gradient(135deg, #e8f5e8 0%, #d4edda 100%);
  border-radius: 6px;
}

.orders-list h3 {
  color: #256029;
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
}

.orders-table-container {
  overflow-x: auto;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border-radius: 10px;
  border: 1px solid #dee2e6;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
}

.orders-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 0.9rem;
}

.orders-table th {
  background: #256029;
  color: #fff;
  font-weight: 600;
  padding: 0.75rem;
  text-align: left;
  white-space: nowrap;
}

.orders-table td {
  padding: 0.75rem;
  border-bottom: 1px solid #dee2e6;
  vertical-align: top;
}

.orders-table tr:hover {
  background: #f8f9fa;
}

.note-cell {
  max-width: 200px;
  word-wrap: break-word;
  white-space: normal;
}

@media (max-width: 768px) {
  .orders-tabs {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .tab-button {
    padding: 0.75rem 1rem;
    font-size: 0.9rem;
  }
  
  .orders-table {
    font-size: 0.8rem;
  }
  
  .orders-table th,
  .orders-table td {
    padding: 0.5rem;
  }
}
</style> 