# 📦 Deployment Package - Zeta Tools B2B Platform

## For VPS Administrator / Client

This document contains everything needed to deploy the Zeta Tools B2B e-commerce platform with full admin functionality.

---

## 📋 What You're Getting

A complete B2B e-commerce platform with:
- ✅ Product catalog with 4-tier hierarchy (Categories → Subcategories → Sub-subcategories → Products)
- ✅ Admin panel to manage products from any computer
- ✅ Multi-image upload support
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Search and filter functionality
- ✅ Shopping cart and quote request system

---

## 🎯 Quick Deploy (5-10 Minutes)

### Step 1: Upload Code to VPS

**Option A: Clone from GitHub**
```bash
cd /var/www
sudo git clone YOUR-GITHUB-URL zetatoolz
```

**Option B: Upload via SFTP**
- Use FileZilla, WinSCP, or similar
- Upload the entire `zetatoolz` folder to `/var/www/zetatoolz`

### Step 2: Install & Deploy

```bash
# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs git

# Go to project folder
cd /var/www/zetatoolz

# Install dependencies
sudo npm install

# Build the application
sudo npm run build

# Install process manager
sudo npm install -g pm2

# Start the application
pm2 start npm --name "zetatoolz" -- start
pm2 save
pm2 startup  # Follow the command it shows

# Set permissions (IMPORTANT for admin uploads)
sudo chmod -R 777 app/data
sudo chmod -R 777 public/images
```

### Step 3: Access Your Site

**Website:** `http://YOUR-SERVER-IP:3000`  
**Admin Panel:** `http://YOUR-SERVER-IP:3000/admin`  
**Default Password:** `admin123` (⚠️ **CHANGE THIS!**)

---

## 🔐 Security: Change Admin Password

**CRITICAL:** Change the default password before going live!

```bash
sudo nano /var/www/zetatoolz/app/admin/page.js
```

Find line ~65 and change:
```javascript
const ADMIN_PASSWORD = 'admin123';  // ← Change this to a secure password
```

Then rebuild:
```bash
cd /var/www/zetatoolz
sudo npm run build
pm2 restart zetatoolz
```

---

## 🌐 Optional: Add Domain & SSL

If you want to use a custom domain name (recommended):

### 1. Install Nginx
```bash
sudo apt install -y nginx
```

### 2. Configure Nginx
```bash
sudo nano /etc/nginx/sites-available/zetatoolz
```

Paste this (replace `your-domain.com`):
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

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/zetatoolz /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Add Free SSL Certificate
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

### 4. Enable Firewall
```bash
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

**Now access at:** `https://your-domain.com` 🎉

---

## 📱 How to Use Admin Panel

### Accessing Admin:
1. Go to: `http://YOUR-SERVER-IP:3000/admin` or `https://your-domain.com/admin`
2. Enter the admin password
3. Start managing your catalog!

### What You Can Do:
- ✅ Add/Edit/Delete Categories
- ✅ Add/Edit/Delete Subcategories  
- ✅ Add/Edit/Delete Sub-subcategories
- ✅ Add/Edit/Delete Products
- ✅ Upload multiple product images
- ✅ Add product variants (colors, sizes, etc.)
- ✅ Manage product details and specifications

### Upload from Any Computer:
The admin can log in from **any computer anywhere** and upload products - images and data will save to the VPS server.

---

## 🔄 Updating the Application

When there are code updates:

```bash
# SSH into your VPS
ssh username@your-server-ip

# Navigate to project
cd /var/www/zetatoolz

# Pull latest code (if using Git)
sudo git pull

# Or re-upload files via SFTP

# Reinstall dependencies (if needed)
sudo npm install

# Rebuild
sudo npm run build

# Restart
pm2 restart zetatoolz

# Check status
pm2 logs zetatoolz
```

---

## 💾 Automatic Backups (Recommended)

Create automatic daily backups:

```bash
# Create backup script
sudo nano /var/www/zetatoolz/backup.sh
```

Paste this:
```bash
#!/bin/bash
DATE=$(date +%Y-%m-%d-%H%M)
BACKUP_DIR="/var/backups/zetatoolz"
mkdir -p $BACKUP_DIR
cp /var/www/zetatoolz/app/data/data.json $BACKUP_DIR/data-$DATE.json
find $BACKUP_DIR -name "data-*.json" -mtime +30 -delete
echo "Backup completed: $DATE"
```

Make executable:
```bash
sudo chmod +x /var/www/zetatoolz/backup.sh
```

Schedule daily (2 AM):
```bash
sudo crontab -e
# Add this line:
0 2 * * * /var/www/zetatoolz/backup.sh >> /var/log/zetatoolz-backup.log 2>&1
```

---

## 🐛 Troubleshooting

### Site not loading?
```bash
pm2 list              # Check if running
pm2 logs zetatoolz    # Check for errors
pm2 restart zetatoolz # Restart
```

### Can't upload images?
```bash
sudo chmod -R 777 /var/www/zetatoolz/public/images
sudo chmod -R 777 /var/www/zetatoolz/app/data
```

### Server rebooted?
PM2 auto-starts the app. If not:
```bash
pm2 resurrect
```

---

## 📖 Full Documentation

Included in the deployment package:

1. **DEPLOY_TO_VPS.md** - Quick 5-minute deployment guide
2. **VPS_DEPLOYMENT_GUIDE.md** - Complete detailed guide with all options
3. **DEPLOYMENT_CHECKLIST.md** - Step-by-step checklist to verify everything
4. **README.md** - Full project documentation

---

## ✅ Deployment Checklist

Quick verification before going live:

- [ ] Application is running (`pm2 list`)
- [ ] Can access website
- [ ] Can access admin panel
- [ ] Admin password changed from default
- [ ] Can log in to admin
- [ ] Can upload a test product with images
- [ ] Test product displays on frontend
- [ ] Images display correctly
- [ ] File permissions set correctly
- [ ] (Optional) Domain configured
- [ ] (Optional) SSL certificate installed
- [ ] (Optional) Backups configured

---

## 📞 Support Commands

```bash
# Application Status
pm2 list
pm2 logs zetatoolz
pm2 restart zetatoolz

# System Status
df -h                  # Disk space
free -m                # Memory usage
sudo systemctl status nginx   # Nginx status

# Backups
ls -lh /var/backups/zetatoolz/
```

---

## 🎯 What's Included

```
zetatoolz/
├── app/                           # Application code
│   ├── admin/                     # Admin panel
│   ├── api/                       # API routes
│   ├── components/                # React components
│   └── data/
│       └── data.json              # Product database (file-based)
├── public/
│   └── images/                    # Product images (auto-organized)
├── DEPLOY_TO_VPS.md              # Quick deployment guide
├── VPS_DEPLOYMENT_GUIDE.md       # Detailed deployment guide
├── DEPLOYMENT_CHECKLIST.md       # Deployment checklist
└── README.md                      # Project documentation
```

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Website is accessible from anywhere  
✅ Admin panel works from any computer  
✅ Can upload products with images  
✅ Images appear on frontend  
✅ Changes persist across server reboots  
✅ (Optional) HTTPS is working  
✅ (Optional) Backups are configured  

---

## 💡 Important Notes

1. **File Storage:** This application uses the VPS filesystem to store images and data. This is why it requires VPS hosting (won't work on Vercel/Netlify without modifications).

2. **Admin Access:** The admin can log in from any computer worldwide. Images uploaded will be stored on the VPS server.

3. **Backups:** Regular backups of `app/data/data.json` and `public/images/` are recommended.

4. **Scaling:** This setup efficiently handles 1,000-5,000 products. For larger catalogs, contact for optimization strategies.

---

## 🆘 Need Help?

**Common Issues:**
- Can't access site → Check PM2 logs: `pm2 logs zetatoolz`
- Can't upload → Check permissions: `sudo chmod -R 777 app/data public/images`
- After reboot → PM2 should auto-start: `pm2 list`

**For detailed troubleshooting:** See `VPS_DEPLOYMENT_GUIDE.md` section "Troubleshooting"

---

## 📝 Deployment Information

Fill this out for reference:

**VPS Provider:** ___________________________  
**Server IP:** ___________________________  
**Domain Name:** ___________________________ (if applicable)  
**Admin URL:** ___________________________  
**Admin Password:** ___________ (keep secure!)  
**SSH Username:** ___________________________  
**Deployment Date:** ___________________________  
**Deployed By:** ___________________________  

---

**🚀 Ready to Deploy!**

Follow the "Quick Deploy" steps above, and you'll be live in 5-10 minutes!

For questions or issues, refer to the included documentation files.

**Good luck! 🎉**
