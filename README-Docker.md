# Hướng dẫn Deploy với Docker trên Windows

## Yêu cầu hệ thống
- Docker Desktop for Windows
- Windows 10/11 (64-bit)
- WSL2 (Windows Subsystem for Linux 2) - Khuyến nghị

## Cài đặt Docker Desktop

### 1. Tải và cài đặt Docker Desktop
- Tải từ: https://www.docker.com/products/docker-desktop/
- Chạy installer và làm theo hướng dẫn
- Restart máy tính sau khi cài đặt

### 2. Cấu hình Docker Desktop
- Mở Docker Desktop
- Vào Settings > General
- Đảm bảo "Use the WSL 2 based engine" được bật
- Apply & Restart

## Cách deploy

### 1. Build và chạy với Docker Compose (Khuyến nghị)

```powershell
# Build và chạy container
docker-compose up -d

# Xem logs
docker-compose logs -f

# Dừng container
docker-compose down
```

### 2. Build và chạy với Docker trực tiếp

```powershell
# Build image
docker build -t huynhgia-fe .

# Chạy container
docker run -d -p 80:80 --name huynhgia-frontend huynhgia-fe

# Xem logs
docker logs -f huynhgia-frontend

# Dừng container
docker stop huynhgia-frontend
docker rm huynhgia-frontend
```

## Truy cập ứng dụng

Sau khi deploy thành công, truy cập ứng dụng tại:
- **Local**: http://localhost
- **Production**: http://your-domain.com

## Cấu hình

### Port
- Mặc định: Port 80
- Có thể thay đổi trong `docker-compose.yml`:
  ```yaml
  ports:
    - "8080:80"  # Thay đổi port host từ 80 thành 8080
  ```

### Environment Variables
- `NODE_ENV`: Môi trường (production/development)

### Volumes
- `./logs:/var/log/nginx`: Mount logs nginx ra host

## Troubleshooting

### Kiểm tra Docker Desktop
```powershell
# Kiểm tra Docker version
docker --version

# Kiểm tra Docker info
docker info

# Kiểm tra container status
docker ps
docker-compose ps
```

### Xem logs
```powershell
docker logs huynhgia-frontend
docker-compose logs huynhgia-fe
```

### Vào container để debug
```powershell
docker exec -it huynhgia-frontend sh
```

### Rebuild image
```powershell
docker-compose build --no-cache
docker-compose up -d
```

### Lỗi thường gặp trên Windows

#### 1. Port 80 đã được sử dụng
```powershell
# Kiểm tra process sử dụng port 80
netstat -ano | findstr :80

# Dừng service (nếu cần)
net stop w3svc
```

#### 2. WSL2 không hoạt động
```powershell
# Enable WSL2
wsl --set-default-version 2

# Restart Docker Desktop
```

#### 3. Permission denied
```powershell
# Chạy PowerShell as Administrator
# Hoặc thêm user vào docker-users group
```

## Production Deployment

### 1. Với Docker Compose
```powershell
# Deploy
docker-compose -f docker-compose.yml up -d

# Update
git pull
docker-compose build --no-cache
docker-compose up -d
```

### 2. Với Docker Swarm
```powershell
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml huynhgia

# Scale service
docker service scale huynhgia_huynhgia-fe=3
```

## Monitoring

### Health Check
```powershell
curl -f http://localhost/ || exit 1
```

### Resource Usage
```powershell
docker stats huynhgia-frontend
```

## Backup và Restore

### Backup
```powershell
# Backup logs
docker cp huynhgia-frontend:/var/log/nginx ./backup/logs

# Backup image
docker save huynhgia-fe > huynhgia-fe-backup.tar
```

### Restore
```powershell
# Restore image
docker load < huynhgia-fe-backup.tar

# Restore logs
docker cp ./backup/logs huynhgia-frontend:/var/log/nginx
```

## Performance Tips cho Windows

### 1. Tối ưu WSL2
- Tăng memory limit trong Docker Desktop settings
- Enable "Use the WSL 2 based engine"

### 2. Tối ưu build
```powershell
# Sử dụng BuildKit
$env:DOCKER_BUILDKIT=1
docker-compose build
```

### 3. Volume performance
- Sử dụng WSL2 backend thay vì Hyper-V
- Mount volumes trong WSL2 filesystem

## Security

### Windows Defender
- Thêm thư mục project vào Windows Defender exclusions
- Hoặc tạm thời disable real-time protection khi build

### Firewall
- Cho phép Docker Desktop qua Windows Firewall
- Mở port 80 nếu cần thiết

## Development Workflow

### 1. Development với Docker
```powershell
# Build development image
docker build -t huynhgia-fe:dev .

# Chạy với volume mount
docker run -d -p 3000:80 -v ${PWD}:/app huynhgia-fe:dev
```

### 2. Hot reload
```powershell
# Sử dụng docker-compose.override.yml cho development
# Mount source code và enable hot reload
```

## Troubleshooting Commands

### Kiểm tra system
```powershell
# Docker status
docker version
docker info

# System resources
Get-Process | Where-Object {$_.ProcessName -like "*docker*"}

# Network
netstat -ano | findstr :80
```

### Cleanup
```powershell
# Remove unused containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything unused
docker system prune -a
``` 