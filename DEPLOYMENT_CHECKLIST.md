# ✅ VPS Deployment Checklist

Use this checklist when deploying to ensure everything works perfectly.

---

## 📋 Pre-Deployment

- [ ] Code is tested locally (`npm run dev` works)
- [ ] All products display correctly
- [ ] Admin panel tested (can add/edit/delete products)
- [ ] Images upload successfully in development
- [ ] No console errors in browser
- [ ] Build completes successfully (`npm run build`)

---

## 🖥️ VPS Setup

- [ ] VPS is accessible via SSH
- [ ] VPS has at least 1GB RAM
- [ ] VPS has at least 10GB storage
- [ ] You have root or sudo access
- [ ] (Optional) Domain name is purchased and DNS configured

---

## 📦 Installation Steps

- [ ] Node.js 20.x installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Code uploaded to `/var/www/zetatoolz`
- [ ] Dependencies installed (`npm install` completed)
- [ ] Build successful (`npm run build` no errors)
- [ ] PM2 installed globally (`pm2 --version`)

---

## 🚀 Application Deployment

- [ ] App started with PM2 (`pm2 start npm --name "zetatoolz" -- start`)
- [ ] App shows in PM2 list (`pm2 list`)
- [ ] PM2 configuration saved (`pm2 save`)
- [ ] PM2 startup configured (`pm2 startup` command run)
- [ ] Can access site at `http://server-ip:3000`

---

## 🔐 File Permissions

- [ ] `app/data/` is writable (`chmod -R 777 app/data`)
- [ ] `public/images/` is writable (`chmod -R 777 public/images`)
- [ ] Backups directory created (`mkdir -p app/data/backups`)
- [ ] Test file write: Can create a category in admin panel

---

## 🌐 Web Server (Nginx) - Optional but Recommended

- [ ] Nginx installed (`nginx -v`)
- [ ] Nginx config file created (`/etc/nginx/sites-available/zetatoolz`)
- [ ] Server name updated (domain or IP)
- [ ] `client_max_body_size 50M;` set (for large image uploads)
- [ ] Config symlinked (`/etc/nginx/sites-enabled/zetatoolz`)
- [ ] Config tested (`sudo nginx -t`)
- [ ] Nginx restarted (`sudo systemctl restart nginx`)
- [ ] Can access site at `http://server-ip` (port 80)

---

## 🔒 SSL Certificate - Optional but Recommended

- [ ] Certbot installed
- [ ] SSL certificate generated (`certbot --nginx -d domain.com`)
- [ ] Certificate obtained successfully
- [ ] HTTPS redirect working
- [ ] Can access site at `https://domain.com`
- [ ] Certificate auto-renewal configured

---

## 🔥 Firewall

- [ ] UFW firewall enabled
- [ ] Port 22 (SSH) allowed
- [ ] Port 80 (HTTP) allowed
- [ ] Port 443 (HTTPS) allowed
- [ ] Can still SSH after enabling firewall
- [ ] Firewall status checked (`sudo ufw status`)

---

## 🔐 Security

- [ ] Admin password changed from default `admin123`
- [ ] Admin password file updated (`app/admin/page.js`)
- [ ] App rebuilt after password change
- [ ] PM2 restarted after rebuild
- [ ] Can log in with new password
- [ ] Old password doesn't work

---

## 🧪 Admin Panel Testing

- [ ] Can access admin at `/admin`
- [ ] Password authentication works
- [ ] Can add a new category
- [ ] Can add a new subcategory
- [ ] Can add a new sub-subcategory
- [ ] Can add a new product
- [ ] Can upload product images (multiple)
- [ ] Images appear in admin preview
- [ ] Can edit product details
- [ ] Can delete a product
- [ ] Product deletion removes images from filesystem

---

## 🎨 Frontend Testing

- [ ] Homepage loads correctly
- [ ] Navigation menu shows categories
- [ ] Can browse to subcategories
- [ ] Products display with images
- [ ] Product detail page works
- [ ] Image gallery/zoom works
- [ ] Search functionality works
- [ ] Cart functionality works
- [ ] "Request Quote" works
- [ ] Footer links work
- [ ] Mobile responsive layout works

---

## 💾 Backup Configuration

- [ ] Backup script created (`/var/www/zetatoolz/backup.sh`)
- [ ] Backup script is executable (`chmod +x backup.sh`)
- [ ] Manual backup tested (`sudo ./backup.sh`)
- [ ] Backup directory exists (`/var/backups/zetatoolz/`)
- [ ] Cron job configured for daily backups
- [ ] Backup includes `data.json`
- [ ] (Optional) Backup includes images

---

## 📊 Monitoring Setup

- [ ] Can view PM2 list (`pm2 list`)
- [ ] Can view logs (`pm2 logs zetatoolz`)
- [ ] Can restart app (`pm2 restart zetatoolz`)
- [ ] No errors in PM2 logs
- [ ] No errors in Nginx logs (`/var/log/nginx/error.log`)
- [ ] Disk space adequate (`df -h`)
- [ ] Memory usage acceptable (`free -m`)

---

## 🔄 Post-Reboot Test

- [ ] Server rebooted (`sudo reboot`)
- [ ] PM2 auto-started after reboot
- [ ] App accessible after reboot
- [ ] Nginx auto-started after reboot
- [ ] Can still access admin panel
- [ ] Can still upload products

---

## 📱 Client Access Test

**Test from a different computer/network:**

- [ ] Can access website from external network
- [ ] Homepage loads correctly
- [ ] Can browse products
- [ ] Can access admin panel
- [ ] Can log in to admin
- [ ] Can upload product from client's computer
- [ ] Uploaded product appears on frontend
- [ ] Images display correctly
- [ ] No console errors

---

## 📖 Documentation

- [ ] Admin URL documented
- [ ] Admin password shared securely (not in plain text!)
- [ ] VPS access credentials documented
- [ ] PM2 commands documented
- [ ] Backup process documented
- [ ] Update process documented
- [ ] Troubleshooting steps shared

---

## 🎉 Final Verification

- [ ] Website URL: ___________________________
- [ ] Admin URL: ___________________________
- [ ] Admin password: __________ (secure location)
- [ ] VPS IP: ___________________________
- [ ] SSH access: username@_______________
- [ ] Domain (if any): ___________________________
- [ ] SSL enabled: Yes ☐ / No ☐
- [ ] Backups configured: Yes ☐ / No ☐
- [ ] Client tested: Yes ☐ / No ☐

---

## 📞 Emergency Contacts

**Server Provider:** ___________________________  
**Support Email:** ___________________________  
**DNS Provider:** ___________________________  

---

## 🆘 Quick Commands Reference

```bash
# Check application status
pm2 list

# View logs
pm2 logs zetatoolz

# Restart application
pm2 restart zetatoolz

# Stop application
pm2 stop zetatoolz

# Check Nginx status
sudo systemctl status nginx

# Restart Nginx
sudo systemctl restart nginx

# Check disk space
df -h

# Check memory
free -m

# Manual backup
cd /var/www/zetatoolz && sudo ./backup.sh

# Update application
cd /var/www/zetatoolz
sudo git pull
sudo npm install
sudo npm run build
pm2 restart zetatoolz
```

---

## ✅ All Done!

When all checkboxes are checked, your deployment is complete and production-ready!

**Date Deployed:** ___________________  
**Deployed By:** ___________________  
**Client Name:** ___________________

---

**🎉 Congratulations! Your B2B platform is live! 🚀**
