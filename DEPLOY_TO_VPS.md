# 🚀 Deploy to VPS - Quick Start

## ⚡ 5-Minute Deployment

Got a VPS? Deploy in 5 minutes! Full admin panel working.

---

## What You Need:
- VPS with Ubuntu/Debian (1GB RAM+)
- SSH access
- That's it!

---

## 🎯 Quick Commands

Connect to your VPS and run these commands:

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git

# 2. Upload your code or clone from Git
# Option A: Clone from GitHub
cd /var/www
sudo git clone https://github.com/YOUR-USERNAME/zetatoolz.git
cd zetatoolz

# Option B: Upload via SFTP to /var/www/zetatoolz

# 3. Install & Build
sudo npm install
sudo npm run build

# 4. Install PM2 and start
sudo npm install -g pm2
pm2 start npm --name "zetatoolz" -- start
pm2 save
pm2 startup  # Follow the command it shows

# 5. Set file permissions
sudo chmod -R 777 app/data
sudo chmod -R 777 public/images
```

**🎉 Done! Access at:** `http://your-server-ip:3000`

---

## 🌐 Add Domain + SSL (Optional)

```bash
# Install Nginx
sudo apt install -y nginx

# Create config
sudo nano /etc/nginx/sites-available/zetatoolz
```

Paste this (change `your-domain.com`):

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;
    client_max_body_size 50M;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable and restart
sudo ln -s /etc/nginx/sites-available/zetatoolz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx

# Add SSL (Free)
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Setup firewall
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

**🎉 Access at:** `https://your-domain.com`

---

## 🔐 IMPORTANT: Change Admin Password!

```bash
# Edit admin file
sudo nano /var/www/zetatoolz/app/admin/page.js

# Find line ~65 and change 'admin123' to your password
# Save: Ctrl+X, Y, Enter

# Rebuild
cd /var/www/zetatoolz
sudo npm run build
pm2 restart zetatoolz
```

---

## 📱 Admin Panel Access

**URL:** `http://your-server-ip:3000/admin` or `https://your-domain.com/admin`

**Features:**
- ✅ Upload products from any computer
- ✅ Add/edit/delete categories
- ✅ Multi-image uploads
- ✅ Works from anywhere worldwide

---

## 🔄 Update Code

```bash
ssh root@your-server-ip
cd /var/www/zetatoolz
sudo git pull  # or re-upload files
sudo npm install
sudo npm run build
pm2 restart zetatoolz
```

---

## 🐛 Troubleshooting

**Site not loading?**
```bash
pm2 logs zetatoolz  # Check errors
pm2 restart zetatoolz  # Restart
```

**Can't upload images?**
```bash
sudo chmod -R 777 /var/www/zetatoolz/public/images
sudo chmod -R 777 /var/www/zetatoolz/app/data
```

**After server reboot?**
```bash
pm2 resurrect  # PM2 auto-starts, but if not
```

---

## 📚 Full Guide

For complete instructions with Nginx, SSL, backups, and monitoring:

**Read:** [VPS_DEPLOYMENT_GUIDE.md](./VPS_DEPLOYMENT_GUIDE.md)

---

## ✅ What Works

- ✅ Full website functionality
- ✅ Admin panel from any computer
- ✅ Client can upload products
- ✅ Images persist forever
- ✅ Data persists across reboots
- ✅ Auto-restarts on crashes
- ✅ Production-ready

---

**That's it! Deploy and go! 🚀**
