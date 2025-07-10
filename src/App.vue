<template>
  <div>
    <nav class="main-navbar">
      <div class="brand-block">
        <div class="logo-container">
          <img src="/src/resources/logo.png" alt="Huynh Gia Logo" class="logo-img" />
        </div>
        <div class="navbar-slogan">
          <div class="line-1">Nơi ta sống cuộc đời ta thích ...</div>
          <div class="line-2"> ... Nơi ta yêu công việc ta làm</div>
        </div>
      </div>
      <div class="nav-tabs">
        <router-link to="/home" class="nav-tab" exact-active-class="active">Trang chủ</router-link>
        <router-link to="/about" class="nav-tab" exact-active-class="active">Giới thiệu</router-link>
        <router-link to="/import" class="nav-tab" exact-active-class="active">Nhập hàng</router-link>
        <router-link to="/export" class="nav-tab" exact-active-class="active">Xuất hàng</router-link>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>

.main-navbar {
  display: flex;
  align-items: center;
  background: linear-gradient(135deg, #1a4d2e 0%, #2d5a3d 100%);
  padding: 0.5rem 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  min-height: 80px;
  gap: 2rem;
  justify-content: space-between;
}
.brand-block {
  display: flex;
  align-items: center;
  gap: clamp(0.7rem, 1.5vw, 1.2rem);
  min-width: 0;
  white-space: nowrap;
}
.logo-container {
  display: flex;
  align-items: center;
}
.logo-img {
  height: clamp(40px, 7vw, 64px);
  width: auto;
  object-fit: contain;
  background: #fff;
  border-radius: 12px;
  padding: 6px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border: 2px solid #e8f5e8;
}
.navbar-slogan {
  font-size: clamp(1rem, 2vw, 1.25rem);
  font-style: italic;
  font-weight: 600;
  color: #e8f5e8;
  letter-spacing: 0.5px;
  line-height: 1.2;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.navbar-slogan .line-2 {
  color: #c2e5c2;
  margin-left: 2em; /* hoặc padding-left: 2em; */
}
.nav-tabs {
  display: flex;
  gap: clamp(0.5rem, 2vw, 2rem);
  justify-content: flex-end;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
}
.nav-tab {
  font-size: clamp(1rem, 2vw, 1.25rem);
  padding: clamp(0.3rem, 1vw, 0.6rem) clamp(0.6rem, 2vw, 1rem);
  font-weight: 500;
  color: #e8f5e8;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.nav-tab:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border-color: #4a7c59;
  transform: translateY(-1px);
}
.nav-tab.active {
  background: linear-gradient(135deg, #4a7c59 0%, #5a8c69 100%);
  color: #ffffff;
  border-color: #6b9c79;
  box-shadow: 0 4px 12px rgba(74, 124, 89, 0.3);
}

/* Responsive: luôn giữ slogan, logo, tabs cùng hàng, không xuống dòng */
@media (max-width: 900px) {
  .main-navbar {
    flex-direction: row;
    align-items: center;
    gap: clamp(0.3rem, 1vw, 1rem);
    padding: 0.5rem 1rem;
  }
  .brand-block {
    flex-direction: row;
    align-items: center;
    gap: clamp(0.3rem, 1vw, 1.2rem);
  }
  .nav-tabs {
    justify-content: flex-end;
    width: auto;
  }
  .navbar-slogan {
    font-size: clamp(0.95rem, 1.5vw, 1.1rem);
  }
}
@media (max-width: 600px) {
  .main-navbar {
    padding: 0.5rem 0.2rem;
    gap: clamp(0.2rem, 1vw, 0.5rem);
  }
  .nav-tab {
    font-size: 0.8rem;
    padding: 0.1rem 0.2rem;
    min-width: unset;
    max-width: 70px;
  }
  .navbar-slogan {
    display: none;
  }
  .navbar-slogan .line-2 {
    font-size: clamp(0.8rem, 1vw, 0.95rem);
  }
}
</style>