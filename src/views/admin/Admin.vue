<template>
  <div class="import-container">
    <div class="import-tabs">
      <router-link to="/admin/attendance" :class="['import-tab']" exact-active-class="active">Chấm công</router-link>
      <router-link to="/admin/staff" :class="['import-tab']" exact-active-class="active">Nhân viên</router-link>
      <router-link to="/admin/report" :class="['import-tab']" exact-active-class="active">Báo cáo</router-link>
    </div>
    <div class="import-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Admin'
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
  text-decoration: none;
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
@media (max-width: 600px) {
  .import-tabs {
    gap: 0.5rem;
    padding: 0.1rem 0.1rem 0 0.1rem;
  }
  .import-tab {
    font-size: 0.85rem;
    padding: 0.1rem 0.2rem;
  }
}
</style> 