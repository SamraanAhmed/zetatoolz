# 🚀 VPS Deployment Guide - Zeta Tools

## Complete Guide to Deploy on VPS with Admin Panel Working

This guide will help you deploy the Zeta Tools B2B platform on any VPS (Virtual Private Server) with full admin functionality, including product uploads from any computer.

---

## 📋 Prerequisites

### What You Need:
- ✅ VPS with Ubuntu 20.04+ or similar Linux distribution
- ✅ Root or sudo access
- ✅ Domain name (optional, but recommended)
- ✅ 1GB+ RAM, 10GB+ storage



## 🎯 Quick Deployment (15 Minutes)

### Step 1: Connect to Your VPS

```bash
# From your local computer, SSH into VPS
ssh root@your-server-ip

# Or with a user account
ssh username@your-server-ip
```

### Step 2: Install Node.js and npm

```bash
# Update system packages
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x (LTS)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Verify installation
node --version  # Should show v20.x.x
npm --version   # Should show 10.x.x
```

### Step 3: Install Git

```bash
# Install Git
sudo apt install -y git

# Verify
git --version
```

### Step 4: Clone Your Project

**Option A: From GitHub (Recommended)**
```bash
# If your code is on GitHub
cd /var/www  # or wherever you want to deploy
sudo mkdir -p /var/www
cd /var/www

# Clone your repository
sudo git clone https://github.com/YOUR-USERNAME/zetatoolz.git
cd zetatoolz
```

**Option B: Upload via SFTP/SCP**
```bash
# From your local computer (Windows), use WinSCP or FileZilla
# Upload the zetatoolz folder to: /var/www/zetatoolz

# Or use SCP from command line:
scp -r e:\Synix\zetatoolz root@your-server-ip:/var/www/
```

**Option C: Direct Transfer (if codes is on your computer)**
```bash
# On your Windows computer, compress the folder first
# Then upload using any FTP client to /var/www/
```

### Step 5: Install Dependencies

```bash
# Navigate to project folder
cd /var/www/zetatoolz

# Install dependencies
sudo npm install

# This will take 2-3 minutes
```

### Step 6: Build the Application

```bash
# Build for production
sudo npm run build

# You should see "✓ Compiled successfully"
```

### Step 7: Test the Application

```bash
# Start the server
sudo npm start

# Server should start on port 3000
# Test in browser: http://your-server-ip:3000
```

**🎉 If you can access the site, the deployment works!**

Press `Ctrl+C` to stop, then continue to set up for production...

---

## 🔒 Production Setup (Recommended)

### Install PM2 (Process Manager)

PM2 keeps your app running 24/7, restarts on crashes, and manages logs.

```bash
# Install PM2 globally
sudo npm install -g pm2

# Start your application with PM2
cd /var/www/zetatoolz
pm2 start npm --name "zetatoolz" -- start

# Save PM2 configuration
pm2 save

# Set PM2 to start on server reboot
pm2 startup
# Follow the command it shows you
```

### Common PM2 Commands

```bash
# View all running apps
pm2 list

# View logs
pm2 logs zetatoolz

# Restart app
pm2 restart zetatoolz

# Stop app
pm2 stop zetatoolz

# Monitor resources
pm2 monit
```

---

## 🌐 Setup Nginx (Reverse Proxy)

Nginx allows you to:
- Run on port 80 (standard HTTP)
- Add SSL certificate (HTTPS)
- Use domain name instead of IP:3000

### Install Nginx

```bash
# Install Nginx
sudo apt install -y nginx

# Check if running
sudo systemctl status nginx
```

### Configure Nginx

```bash
# Create configuration file
sudo nano /etc/nginx/sites-available/zetatoolz
```

**Paste this configuration:**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Change this!
    
    # Or use IP if no domain
    # server_name your-server-ip;

    client_max_body_size 50M;  # Allow large image uploads

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

**Save and exit:** `Ctrl+X`, then `Y`, then `Enter`

### Enable the Configuration

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/zetatoolz /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Should show "syntax is ok"

# Restart Nginx
sudo systemctl restart nginx
```

**🎉 Now access your site at:** `http://your-domain.com` or `http://your-server-ip`

---

## 🔐 Add SSL Certificate (HTTPS)

### Using Let's Encrypt (Free & Automatic)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Follow the prompts:
# - Enter your email
# - Agree to terms
# - Choose to redirect HTTP to HTTPS (recommended)
```

**Certificate auto-renews every 90 days!**

**🎉 Now access at:** `https://your-domain.com`

---

## 🔥 Firewall Setup (Security)

```bash
# Allow SSH (important!)
sudo ufw allow 22/tcp

# Allow HTTP & HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## 🛠️ File Permissions (Important for Admin Panel)

The admin panel needs to write files. Set proper permissions:

```bash
cd /var/www/zetatoolz

# Make data directory writable
sudo chmod -R 755 app/data
sudo chown -R www-data:www-data app/data

# Make images directory writable
sudo chmod -R 755 public/images
sudo chown -R www-data:www-data public/images

# Create backups directory
sudo mkdir -p app/data/backups
sudo chmod -R 755 app/data/backups
```

**Note:** If you're still having permission issues:
```bash
# More permissive (use with caution)
sudo chmod -R 777 app/data
sudo chmod -R 777 public/images
```

---

## 🔐 Change Admin Password

**IMPORTANT:** Change the default admin password!

```bash
# Edit admin page
sudo nano /var/www/zetatoolz/app/admin/page.js
```

Find line ~65 (search for `admin123`):
```javascript
const ADMIN_PASSWORD = 'admin123';  // ← Change this!
```

Change to something secure:
```javascript
const ADMIN_PASSWORD = 'your-secure-password-here';
```

**Save:** `Ctrl+X`, then `Y`, then `Enter`

**Rebuild and restart:**
```bash
cd /var/www/zetatoolz
sudo npm run build
pm2 restart zetatoolz
```

---

## 📱 Access Admin Panel

### From Any Computer:

1. **Open browser:** `https://your-domain.com/admin` or `http://your-server-ip/admin`
2. **Enter password:** Your new secure password
3. **Start uploading products!** ✅

### Features That Work:
- ✅ Add/Edit/Delete Categories
- ✅ Add/Edit/Delete Products
- ✅ Upload images from your client's computer
- ✅ Real-time updates
- ✅ Multi-image uploads

---

## 🔄 Updating Your Application

When you make changes to code:

```bash
# Connect to VPS
ssh root@your-server-ip

# Go to project folder
cd /var/www/zetatoolz

# Pull latest changes (if using Git)
sudo git pull

# Or re-upload files via SFTP

# Reinstall dependencies (if package.json changed)
sudo npm install

# Rebuild
sudo npm run build

# Restart
pm2 restart zetatoolz

# Check logs
pm2 logs zetatoolz
```

---

## 💾 Backup Strategy

### Automated Daily Backup

Create a backup script:

```bash
# Create backup script
sudo nano /var/www/zetatoolz/backup.sh
```

**Paste this:**
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d-%H%M)
BACKUP_DIR="/var/backups/zetatoolz"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup data.json
cp /var/www/zetatoolz/app/data/data.json $BACKUP_DIR/data-$DATE.json

# Backup images (optional, can be large)
# tar -czf $BACKUP_DIR/images-$DATE.tar.gz /var/www/zetatoolz/public/images/

# Keep only last 30 days
find $BACKUP_DIR -name "data-*.json" -mtime +30 -delete

echo "Backup completed: $DATE"
```

**Make executable:**
```bash
sudo chmod +x /var/www/zetatoolz/backup.sh
```

**Schedule daily backup (runs at 2 AM):**
```bash
# Open crontab
sudo crontab -e

# Add this line at the end:
0 2 * * * /var/www/zetatoolz/backup.sh >> /var/log/zetatoolz-backup.log 2>&1
```

**Manual backup:**
```bash
sudo /var/www/zetatoolz/backup.sh
```

---

## 🐛 Troubleshooting

### Site Not Loading

```bash
# Check if app is running
pm2 list

# Check logs
pm2 logs zetatoolz

# Check Nginx
sudo systemctl status nginx
sudo nginx -t

# Check ports
sudo netstat -tulpn | grep :3000
```

### Admin Can't Upload Images

```bash
# Fix permissions
cd /var/www/zetatoolz
sudo chmod -R 777 public/images
sudo chmod -R 777 app/data

# Check disk space
df -h

# Check logs
pm2 logs zetatoolz
```

### Port 3000 Already in Use

```bash
# Find what's using it
sudo lsof -i :3000

# Kill the process
sudo kill -9 <PID>

# Restart PM2
pm2 restart zetatoolz
```

### After Server Reboot

```bash
# PM2 should auto-start, but if not:
pm2 resurrect

# Or manually start
cd /var/www/zetatoolz
pm2 start npm --name "zetatoolz" -- start
```

---

## 📊 Monitoring

### Check Application Health

```bash
# View running processes
pm2 list

# View resource usage
pm2 monit

# View logs in real-time
pm2 logs zetatoolz --lines 100

# View error logs only
pm2 logs zetatoolz --err

# Check disk usage
df -h

# Check memory
free -m
```

### Check Website Response

```bash
# Test from server
curl http://localhost:3000

# Test admin API
curl http://localhost:3000/api/admin/data
```

---

## 🎨 Optional: Setup Custom Domain

1. **Buy a domain** (Namecheap, GoDaddy, Google Domains, etc.)

2. **Point domain to VPS:**
   - Add A Record: `@` → `your-server-ip`
   - Add A Record: `www` → `your-server-ip`

3. **Update Nginx config:**
   ```bash
   sudo nano /etc/nginx/sites-available/zetatoolz
   ```
   
   Update `server_name`:
   ```nginx
   server_name yourdomain.com www.yourdomain.com;
   ```

4. **Get SSL:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

---

## ✅ Final Checklist

Before giving to your client:

- [ ] VPS is running and accessible
- [ ] Application builds successfully
- [ ] PM2 is managing the process
- [ ] Nginx is configured (if using)
- [ ] SSL certificate is installed (if using domain)
- [ ] Admin password is changed
- [ ] File permissions are correct
- [ ] Backup script is scheduled
- [ ] Firewall is configured
- [ ] Admin panel tested (upload a product)
- [ ] Frontend tested (view uploaded product)

---

## 📞 Support Commands Quick Reference

```bash
# View application status
pm2 list

# View logs
pm2 logs zetatoolz

# Restart application
pm2 restart zetatoolz

# Rebuild after code changes
cd /var/www/zetatoolz && sudo npm run build && pm2 restart zetatoolz

# Check backup
ls -lh /var/backups/zetatoolz/

# Check disk space
df -h

# Check memory
free -m
```

---

## 🎉 Success!

Your client can now:
1. Access the website from anywhere
2. Login to admin panel from their computer
3. Upload products with images
4. Manage the entire catalog
5. Everything persists across server restarts

**Admin URL:** `https://your-domain.com/admin` or `http://your-server-ip/admin`

---

## 💡 Tips for Your Client

1. **Bookmark the admin URL**
2. **Keep admin password secure**
3. **Upload high-quality images** (system will handle them)
4. **Use descriptive product names**
5. **Regularly backup** (automatic, but manual backups are good too)

---

**That's it! You're deployed and ready to go! 🚀**

For questions or issues, check the logs: `pm2 logs zetatoolz`
