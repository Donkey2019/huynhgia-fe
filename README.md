# HuynhGia Farm - Quản lý nhập xuất nông trại

## 📋 Mô tả dự án
Hệ thống quản lý nhập xuất cho nông trại nông nghiệp hữu cơ Huỳnh Gia. Ứng dụng web giúp theo dõi và quản lý các hoạt động nhập hàng (import) và xuất hàng (export) của nông trại.

## ✨ Tính năng chính

### 🔐 Hệ thống đăng nhập
- **Simulated Login**: Hệ thống đăng nhập mô phỏng với localStorage
- **User Session**: Lưu trữ thông tin người dùng trong session
- **Access Control**: Chỉ cho phép lưu dữ liệu khi đã đăng nhập
- **User Notes**: Tự động thêm thông tin người dùng vào ghi chú

### 📥 Quản lý nhập hàng (Import)
- **Import Form**: Form nhập liệu thống nhất cho tất cả loại hàng
- **Supplier Selection**: Dropdown chọn nhà cung cấp từ API `/suppliers`
- **Category Management**: Phân loại hàng hóa theo danh mục
- **User Integration**: Tự động thêm thông tin người dùng vào ghi chú

### 📤 Quản lý xuất hàng (Export)
- **Export Form**: Form xuất hàng thống nhất cho tất cả loại hàng
- **Buyer Selection**: Dropdown chọn người mua từ API `/shoppers`
- **Order Reference**: Trường "inOrder" với giá trị mặc định động
- **Category Management**: Phân loại hàng xuất theo danh mục

### 📊 Báo cáo và thống kê (Report)
- **Monthly Comparison**: So sánh nhập/xuất theo tháng
- **Revenue Tracking**: Theo dõi doanh thu
- **Interactive Charts**: Biểu đồ tương tác sử dụng Chart.js
- **Detailed Tables**: Bảng chi tiết import/export theo tháng
- **Tab Navigation**: Chuyển đổi giữa báo cáo tổng quan và chi tiết

### 🏠 Trang chủ
- **Image Slider**: Hiển thị hình ảnh nông trại với auto-slide
- **Responsive Design**: Tương thích với mọi thiết bị
- **Modern UI**: Giao diện hiện đại với gradient và shadow effects

## 🛠 Công nghệ sử dụng
- **[Vue.js 3](https://vuejs.org/)** (Composition API)
- **[Vite](https://vitejs.dev/)** (Build tool & dev server)
- **[Vue Router](https://router.vuejs.org/)** (Client-side routing)
- **[Chart.js](https://www.chartjs.org/)** (Data visualization)
- **Fetch API** (HTTP client)
- **CSS3** (Styling với modern features)
- **Docker** (Containerization)
- **Nginx** (Web server)

## 📋 Yêu cầu môi trường
- **Node.js** >= 16
- **npm** >= 8
- **Docker** >= 20.10 (cho deployment)

## 🚀 Cài đặt và chạy

### Phương pháp 1: Development (Khuyến nghị cho dev)
1. **Clone source code:**
   ```bash
   git clone <repo-url>
   cd huynhgia-fe
   ```

2. **Cài đặt dependencies:**
   ```bash
   npm install
   ```

3. **Chạy development server:**
   ```bash
   npm run dev
   ```
   Ứng dụng sẽ chạy tại [http://localhost:5173](http://localhost:5173)

### Phương pháp 2: Docker Deployment (Khuyến nghị cho production)
1. **Build và chạy với Docker Compose:**
   ```bash
   docker-compose up -d
   ```
   Ứng dụng sẽ chạy tại [http://localhost](http://localhost)

2. **Hoặc build và chạy với Docker trực tiếp:**
   ```bash
   docker build -t huynhgia-fe .
   docker run -d -p 80:80 --name huynhgia-frontend huynhgia-fe
   ```

## ⚙️ Cấu hình

### Backend API
- **File cấu hình:** `src/config.js`
- **Mặc định:**
  ```js
  export default {
    EXPORT_API_URL: 'http://localhost:8080/api',
  };
  ```
- **Cập nhật:** Sửa giá trị `EXPORT_API_URL` cho phù hợp với backend

### Docker Configuration
- **Port mặc định:** 80
- **Environment:** Production
- **Logs:** Mount tại `./logs`
- **Network:** Bridge network

## 📁 Cấu trúc project

```
huynhgia-fe/
├── src/
│   ├── views/                 # Vue components
│   │   ├── Home.vue          # Trang chủ với slider
│   │   ├── ImportItemForm.vue # Form nhập hàng
│   │   ├── ExportItemForm.vue # Form xuất hàng
│   │   ├── ImportPage.vue    # Trang quản lý nhập
│   │   ├── ExportPage.vue    # Trang quản lý xuất
│   │   └── Report.vue        # Trang báo cáo
│   ├── router/
│   │   └── index.js          # Vue Router config
│   ├── resources/            # Static assets
│   │   ├── export/          # Hình ảnh xuất hàng
│   │   ├── import/          # Hình ảnh nhập hàng
│   │   ├── food/            # Hình ảnh thực phẩm
│   │   └── homepaner/       # Hình ảnh trang chủ
│   ├── App.vue              # Root component
│   ├── main.js              # Entry point
│   └── config.js            # API configuration
├── Dockerfile               # Docker build config
├── docker-compose.yml       # Docker Compose config
├── nginx.conf              # Nginx configuration
├── .dockerignore           # Docker ignore rules
├── README-Docker.md        # Docker deployment guide
├── index.html              # HTML template
├── package.json            # Dependencies & scripts
├── vite.config.mjs         # Vite configuration
└── README.md               # Project documentation
```

## 🔧 Build Production

### Local Build
```bash
npm run build
```

### Docker Build
```bash
docker build -t huynhgia-fe .
```

## 📊 Tính năng báo cáo

### Dashboard Overview
- **Monthly Summary:** Tổng quan nhập/xuất theo tháng
- **Revenue Chart:** Biểu đồ doanh thu
- **Comparison Chart:** So sánh nhập vs xuất

### Detailed Reports
- **Import Orders:** Danh sách đơn nhập theo tháng
- **Export Orders:** Danh sách đơn xuất theo tháng
- **Filter by Date:** Lọc theo khoảng thời gian

## 🔐 Bảo mật

### User Authentication
- **Session Management:** Quản lý phiên đăng nhập
- **Access Control:** Kiểm soát quyền truy cập
- **Data Validation:** Xác thực dữ liệu đầu vào

### Security Headers
- **X-Frame-Options:** Chống clickjacking
- **X-XSS-Protection:** Chống XSS attacks
- **Content-Security-Policy:** Policy bảo mật nội dung

## 🐳 Docker Deployment

### Quick Start
```bash
# Deploy với Docker Compose
docker-compose up -d

# Kiểm tra logs
docker-compose logs -f

# Dừng service
docker-compose down
```

### Production Deployment
```bash
# Build và deploy
docker-compose -f docker-compose.yml up -d

# Update application
git pull
docker-compose build --no-cache
docker-compose up -d
```

Xem chi tiết hướng dẫn Docker tại [README-Docker.md](./README-Docker.md)

## 🐛 Troubleshooting

### Development Issues
- **Port conflicts:** Kiểm tra port 5173 có đang được sử dụng
- **API connection:** Kiểm tra backend server có đang chạy
- **Dependencies:** Chạy `npm install` để cài đặt lại dependencies
- **Build errors:** Xóa node_modules và cài đặt lại: `rm -rf node_modules && npm install`

### Docker Issues
- **Port conflicts:** Kiểm tra port 80 có đang được sử dụng
- **Build errors:** Xóa cache và rebuild: `docker-compose build --no-cache`
- **Container logs:** `docker-compose logs huynhgia-fe`

## 📞 Hỗ trợ

### Liên hệ
- **Developer:** [Your Name]
- **Email:** [your.email@example.com]
- **Project Repository:** [GitHub URL]

### Báo cáo lỗi
- Tạo issue trên GitHub repository
- Mô tả chi tiết lỗi và steps to reproduce
- Đính kèm screenshots nếu cần

## 📄 License
[Your License] - Xem file LICENSE để biết thêm chi tiết

---

**HuynhGia Farm Management System** - Hệ thống quản lý nông trại nông nghiệp hữu cơ
